// backend/controllers/authController.js
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/user');
const OTP = require('../models/otp'); // New: Import OTP model
const sendEmail = require('../utils/sendEmail');

const JWT_SECRET = process.env.JWT_SECRET;

// --- Helper function to generate a numeric OTP ---
// This is a simple 6-digit OTP generator.
const generateOTP = () => {
    // Generate a random 6-digit number, ensuring it's always 6 digits
    return Math.floor(100000 + Math.random() * 900000).toString();
};

// --- NEW: Request OTP Function ---
// This function will generate and send an OTP to a user's email for a specific purpose.
exports.requestOtp = async(req, res) => {
    const { email, purpose } = req.body; // 'purpose' could be 'registration', 'password_reset', '2fa', 'email_verification'

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    // Optional: Add rate limiting here to prevent spamming OTP requests
    // Example (requires a rate-limiting middleware, e.g., 'express-rate-limit' configured in server.js/authRoutes.js)
    // If you add this middleware to the route, you don't need manual logic here.
    // E.g., apply `rateLimitMiddleware` to `router.post('/request-otp', rateLimitMiddleware, authController.requestOtp);`

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            // Security best practice: Always send a generic success message
            // to prevent email enumeration, even if the user doesn't exist.
            // This prevents attackers from knowing which emails are registered.
            console.log(`OTP request for non-existent or inactive user: ${email}`);
            return res.status(200).json({ message: 'If an account exists, an OTP has been sent to your email.' });
        }

        // --- OTP Generation and Storage ---
        const otpCode = generateOTP();

        // Optional: Remove any existing active OTPs for this user and purpose
        // This ensures a user only has one valid OTP at a time for a given action.
        await OTP.deleteMany({ email: user.email, purpose: purpose });

        const newOtp = new OTP({
            email: user.email,
            otp: otpCode,
            purpose: purpose || 'email_verification' // Default purpose if not provided
        });
        await newOtp.save();

        // --- Send OTP Email ---
        const emailSubject = `Your Estatify OTP for ${purpose.replace(/_/g, ' ').toLowerCase()}`;
        const emailText = `Your One-Time Password (OTP) for Estatify is: ${otpCode}\n\nThis OTP is valid for 10 minutes. Do not share this code with anyone.`;
        const emailHtml = `
            <p>Your One-Time Password (OTP) for Estatify is:</p>
            <h2 style="color: #0c878c; font-size: 24px; font-weight: bold;">${otpCode}</h2>
            <p>This OTP is valid for 10 minutes.</p>
            <p>Do not share this code with anyone.</p>
            <br>
            <p>Estatify Team</p>
        `;

        await sendEmail({
            to: user.email,
            subject: emailSubject,
            text: emailText,
            html: emailHtml,
        });

        res.status(200).json({ message: 'OTP sent successfully to your email.' });

    } catch (err) {
        console.error("Error requesting OTP:", err);
        res.status(500).json({ message: 'Server error requesting OTP.' });
    }
};

// --- NEW: Verify OTP Function ---
exports.verifyOtp = async(req, res) => {
    const { email, otp, purpose } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ message: 'Email and OTP are required.' });
    }

    try {
        // Find the latest OTP for the given email and purpose
        const foundOtp = await OTP.findOne({
            email: email.toLowerCase(),
            purpose: purpose || 'email_verification',
            // createdAt: { $gt: new Date(Date.now() - 10 * 60 * 1000) } // Check if it's within expiry window (TTL index handles this primarily)
        }).sort({ createdAt: -1 }); // Get the most recent OTP if multiple exist (though unique index prevents this for same purpose)

        if (!foundOtp) {
            return res.status(400).json({ message: 'Invalid or expired OTP.' });
        }

        // Compare the provided OTP with the stored OTP
        if (foundOtp.otp !== otp) {
            // Optional: Increment failed attempt counter on the user or OTP document
            // To prevent brute-force attacks on OTPs
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        // If OTP is valid and matches, remove it from the database to prevent reuse
        await OTP.deleteOne({ _id: foundOtp._id });

        // If you need to return user data or a JWT after successful OTP verification (e.g., for 2FA login)
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(404).json({ message: 'User not found after OTP verification.' });
        }

        // For successful verification, you might typically log them in or mark their email as verified
        // Depending on the 'purpose', you would do different things here.
        // For example, if purpose was 'email_verification', you'd update user.isVerified = true;
        // If purpose was '2fa', you'd generate a new JWT and send it back.

        const token = jwt.sign({ id: user._id, email: user.email, name: user.name },
            JWT_SECRET, { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'OTP verified successfully!',
            token, // Only include token if this is for a login/2FA flow
            user: { id: user._id, name: user.name, email: user.email } // Only include user if needed
        });

    } catch (err) {
        console.error("Error verifying OTP:", err);
        res.status(500).json({ message: 'Server error verifying OTP.' });
    }
};

// --- Existing Authentication Functions (no changes needed for now) ---

// --- POST /auth/register - Create a new user with email/password ---
exports.register = async(req, res) => {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required' });
    }
    if (password.length < 6) { // Example password strength
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    try {
        // Normalize email to lowercase for consistent lookup
        let user = await User.findOne({ email: email.toLowerCase() });

        if (user) {
            // User already exists
            if (user.password) {
                // Scenario 1: User exists with email/password
                return res.status(409).json({
                    message: 'An account already exists with this email. Please log in, or use a different email to register.',
                    action: 'LOGIN_EXISTING_EMAIL_PASSWORD'
                });
            } else if (user.googleId) {
                // Scenario 2: User exists via Google Auth, but no password set for direct login
                return res.status(409).json({
                    message: 'An account already exists for this email through Google. Do you want to sign in with Google or set a password for this account?',
                    action: 'GOOGLE_AUTH_EXISTING_EMAIL_NO_PASSWORD'
                });
            }
            // Fallback for any other existing user without a password field
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        // Scenario 3: No user found with this email, proceed with new email/password registration
        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name },
            JWT_SECRET, { expiresIn: '1h' }
        );

        res.status(201).json({
            message: 'Registration successful! You are now logged in.',
            token,
            user: { id: newUser._id, name: newUser.name, email: newUser.email },
        });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: 'Server error during registration' });
    }
};

// --- POST /auth/login - Email/password login ---
exports.login = async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        if (!user.password && user.googleId) {
            return res.status(401).json({
                message: 'This account was registered through Google. Please sign in with Google.',
                action: 'REQUIRES_GOOGLE_AUTH'
            });
        } else if (user.password) {
            const isMatch = await user.comparePassword(password);

            if (!isMatch) {
                return res.status(401).json({ message: 'Invalid email or password.' });
            }

            const token = jwt.sign({ id: user._id, email: user.email, name: user.name },
                JWT_SECRET, { expiresIn: '1h' }
            );

            res.status(200).json({
                message: 'Login successful!',
                token,
                user: { id: user._id, name: user.name, email: user.email },
            });
        } else {
            return res.status(500).json({ message: 'Account setup incomplete. Please contact support.' });
        }

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: 'Server error during login.' });
    }
};

// --- Google Auth Callback Handler ---
exports.googleAuthCallback = async(req, res) => {
    try {
        const user = req.user;

        const token = jwt.sign({ id: user._id, email: user.email, name: user.name },
            JWT_SECRET, { expiresIn: '1h' }
        );

        const userForFrontend = {
            id: user._id,
            name: user.name,
            email: user.email,
        };

        res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify(userForFrontend))}`);

    } catch (err) {
        console.error("Google Auth callback error:", err);
        res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=${encodeURIComponent('Google login failed. Please try again.')}`);
    }
};

// --- POST /auth/request-set-password - For Google Auth users to set a password ---
exports.requestSetPassword = async(req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(200).json({ message: 'If an account exists, a password set link has been sent to your email.' });
        }

        if (user.password && !user.googleId) {
            return res.status(400).json({
                message: 'This account is registered with an email and password. Please use the "Forgot Password" option if you need to reset it.',
                action: 'USE_FORGOT_PASSWORD'
            });
        }

        const resetToken = user.generatePasswordResetToken();
        await user.save();

        const resetURL = `${process.env.FRONTEND_URL}/set-password/${resetToken}`;

        try {
            await sendEmail({
                to: user.email,
                subject: 'Set Your Password for Your Account',
                text: `You are receiving this because you (or someone else) have requested to set a password for your account. Please click on this link to set your password: ${resetURL}\n\nThis link will expire in 1 hour.`
            });
            res.status(200).json({ message: 'Password set link sent to your email.' });
        } catch (emailError) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save();
            console.error('Error sending password set email:', emailError);
            return res.status(500).json({ message: 'Error sending password set email. Please try again later.' });
        }

    } catch (err) {
        console.error("Request set password error:", err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// --- POST /auth/set-password/:token - Handles setting the password for Google Auth users ---
exports.setNewPassword = async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Password is required and must be at least 6 characters long.' });
    }

    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Password set token is invalid or has expired.' });
        }

        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        const authToken = jwt.sign({ id: user._id, email: user.email, name: user.name },
            JWT_SECRET, { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Password set successfully! You can now log in with your email and new password.',
            token: authToken,
            user: { id: user._id, name: user.name, email: user.email },
        });

    } catch (err) {
        console.error("Set password error:", err);
        res.status(500).json({ message: 'Server error setting password.' });
    }
};


// --- POST /auth/forgot-password - Initiates the password reset process ---
exports.forgotPassword = async(req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            return res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
        }

        if (!user.password && user.googleId) {
            return res.status(400).json({
                message: 'This account was registered through Google. Please sign in with Google or use the "Set Password" option.',
                action: 'REQUIRES_GOOGLE_AUTH_OR_SET_PASSWORD'
            });
        }

        const resetToken = user.generatePasswordResetToken();
        await user.save();

        const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;

        try {
            await sendEmail({
                to: user.email,
                subject: 'Password Reset Request',
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account. Please click on this link to reset your password: ${resetURL}\n\nThis link will expire in 1 hour.\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`
            });
            res.status(200).json({ message: 'Password reset link sent to your email.' });
        } catch (emailError) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save();
            console.error('Error sending password reset email:', emailError);
            return res.status(500).json({ message: 'Error sending password reset email. Please try again later.' });
        }

    } catch (err) {
        console.error("Forgot password error:", err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// --- PATCH /auth/reset-password/:token - Handles the actual password reset ---
exports.resetPassword = async(req, res) => {
    const { token } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Password is required and must be at least 6 characters long.' });
    }

    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() }
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
        }

        user.password = password;
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        const authToken = jwt.sign({ id: user._id, email: user.email, name: user.name },
            JWT_SECRET, { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Password reset successfully! You can now log in with your new password.',
            token: authToken,
            user: { id: user._id, name: user.name, email: user.email },
        });

    } catch (err) {
        console.error("Reset password error:", err);
        res.status(500).json({ message: 'Server error resetting password.' });
    }
};