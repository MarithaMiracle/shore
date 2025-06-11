// backend/controllers/authController.js

const User = require('../models/user');
const Otp = require('../models/otp'); // Make sure you have this model defined
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const crypto = require('crypto'); // Used for old token generation, keeping for full context of password resets if needed

// --- Helper function to generate a 4-digit OTP ---
const generateOTP = () => {
    return Math.floor(1000 + Math.random() * 9000).toString(); // 4-digit number as string
};

// --- Helper function to send emails using Nodemailer ---
const sendEmail = async(options) => {
    // 1) Create a transporter using environment variables
    const transporter = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        secure: process.env.EMAIL_PORT == 465, // Use 'true' for 465 (SSL), 'false' for others (like 587 STARTTLS)
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS,
        },
        // Optional: for self-signed certificates or development (e.g., with Mailtrap)
        // tls: {
        //   rejectUnauthorized: false
        // }
    });

    // 2) Define the email options
    const mailOptions = {
        from: `Estatify <${process.env.EMAIL_FROM}>`, // Sender address from .env
        to: options.email, // List of receivers
        subject: options.subject, // Subject line
        html: options.html, // HTML body
        text: options.text, // Plain text body for email clients that don't support HTML
    };

    // 3) Send the email
    await transporter.sendMail(mailOptions);
};

// --- POST /auth/register - Register a new user with email/password ---
// This function does NOT use OTP for registration, as per your instruction.
// It creates the user and logs them in immediately by returning a token.
exports.register = async(req, res) => {
    const { name, email, password } = req.body;

    // Basic validation
    if (!name || !email || !password) {
        return res.status(400).json({ message: 'All fields are required.' });
    }
    if (password.length < 6) {
        return res.status(400).json({ message: 'Password must be at least 6 characters long.' });
    }

    try {
        let user = await User.findOne({ email: email.toLowerCase() });

        if (user) {
            // Check if the user already exists via password registration or Google
            if (user.password) {
                return res.status(409).json({
                    message: 'An account already exists with this email. Please log in, or use a different email to register.',
                    action: 'LOGIN_EXISTING_EMAIL_PASSWORD'
                });
            } else if (user.googleId) {
                return res.status(409).json({
                    message: 'An account already exists for this email through Google. Do you want to sign in with Google or set a password for this account?',
                    action: 'GOOGLE_AUTH_EXISTING_EMAIL_NO_PASSWORD'
                });
            }
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        // Create new user
        const newUser = new User({
            name,
            email: email.toLowerCase(),
            password // Mongoose pre-save hook will hash this
        });

        await newUser.save();

        // Generate JWT token for immediate login after registration
        const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        // Respond with success message, token, and user info
        res.status(201).json({
            message: 'Registration successful!',
            token,
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email,
                isVerified: newUser.isVerified // Include verification status
                    // Do NOT include password or sensitive info here
            }
        });

    } catch (err) {
        console.error("Registration error:", err);
        res.status(500).json({ message: 'Server error during registration. Please try again.' });
    }
};

// --- POST /auth/login - User login with email/password ---
exports.login = async(req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required.' });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user || !user.password) { // Check if user exists and has a password (not just Google user)
            return res.status(401).json({ message: 'Invalid credentials or account created via Google. Please check your email and password or sign in with Google.' });
        }

        // Compare provided password with hashed password in database
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials.' });
        }

        // Generate JWT token
        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

        // Respond with token and user info
        res.status(200).json({
            message: 'Logged in successfully!',
            token,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                isVerified: user.isVerified
            }
        });

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: 'Server error during login.' });
    }
};

// --- GET /auth/google/callback - Google OAuth callback ---
exports.googleAuthCallback = (req, res) => {
    // This is handled by Passport.js. If authentication is successful,
    // Passport adds the user to req.user.
    if (!req.user) {
        res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=${encodeURIComponent('Google login failed. Please try again.')}`);

    }

    // Generate JWT token for the Google-authenticated user
    const token = jwt.sign({ id: req.user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });

    // Redirect to a frontend page, passing the token (e.g., in query params or local storage post-redirect)
    // For production, you might set a cookie or redirect to a page that handles token storage securely.
    // Example: Redirect with token in a way frontend can retrieve it securely (e.g., local storage/cookie set by frontend after parsing URL)
    res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify(userForFrontend))}`);

};


// --- POST /auth/request-otp - Request an OTP for various purposes (e.g., password reset, email verification) ---
exports.requestOtp = async(req, res) => {
    const { email, purpose } = req.body; // 'purpose' is crucial (e.g., 'password_reset', 'email_verification')

    if (!email || !purpose) {
        return res.status(400).json({ message: 'Email and purpose are required.' });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            // Always send a generic success message for security to prevent email enumeration
            return res.status(200).json({ message: 'If an account with that email exists, an OTP has been sent.' });
        }

        const otpCode = generateOTP();
        const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // OTP valid for 10 minutes

        // Save or update OTP in the database
        await Otp.findOneAndUpdate({ email: email.toLowerCase(), purpose }, { otp: otpCode, expiresAt, createdAt: Date.now() }, { upsert: true, new: true, setDefaultsOnInsert: true } // upsert: create if not found, new: return updated doc
        );

        // Customize email content based on purpose
        const emailSubject = purpose === 'password_reset' ? 'Estatify Password Reset OTP' : 'Estatify Verification OTP';
        const emailText = purpose === 'password_reset' ?
            `Your OTP for password reset is: ${otpCode}\n\nThis OTP is valid for 10 minutes.` :
            `Your verification OTP is: ${otpCode}\n\nThis OTP is valid for 10 minutes.`;
        const emailHtml = purpose === 'password_reset' ?
            `<p>Your One-Time Password (OTP) for Estatify password reset is: <strong>${otpCode}</strong></p><p>This OTP is valid for 10 minutes. Please enter it in the app to reset your password.</p>` :
            `<p>Your One-Time Password (OTP) for Estatify verification is: <strong>${otpCode}</strong></p><p>This OTP is valid for 10 minutes. Please enter it in the app.</p>`;

        try {
            await sendEmail({
                email: user.email,
                subject: emailSubject,
                text: emailText,
                html: emailHtml
            });
            res.status(200).json({ message: 'OTP sent successfully!' });
        } catch (emailError) {
            console.error('Email sending error (requestOtp):', emailError);
            // Optionally, remove the OTP if email sending failed to prevent stale OTPs
            await Otp.deleteOne({ email: email.toLowerCase(), purpose });
            return res.status(500).json({ message: 'There was an error sending the OTP. Please try again later.' });
        }

    } catch (err) {
        console.error('Request OTP controller error:', err);
        res.status(500).json({ message: 'Server error during OTP request.' });
    }
};

// --- POST /auth/verify-otp - Verify an OTP ---
exports.verifyOtp = async(req, res) => {
    const { email, otp, purpose } = req.body;

    if (!email || !otp || !purpose) {
        return res.status(400).json({ message: 'Email, OTP, and purpose are required.' });
    }

    try {
        const storedOtp = await Otp.findOne({ email: email.toLowerCase(), purpose });

        if (!storedOtp) {
            return res.status(400).json({ message: 'Invalid or expired OTP. Please request a new one.' });
        }

        // Check if OTP has expired
        if (storedOtp.expiresAt < Date.now()) {
            await Otp.deleteOne({ _id: storedOtp._id }); // Clean up expired OTP
            return res.status(400).json({ message: 'OTP has expired. Please request a new one.' });
        }

        // Check if OTP matches
        if (storedOtp.otp !== otp) {
            return res.status(400).json({ message: 'Invalid OTP.' });
        }

        // OTP is valid! Delete it from the database after successful verification
        await Otp.deleteOne({ _id: storedOtp._id });

        // Special handling for email verification (if you enable it later for registration)
        if (purpose === 'email_verification') {
            const user = await User.findOne({ email: email.toLowerCase() });
            if (user && !user.isVerified) {
                user.isVerified = true;
                await user.save();
                // Optionally generate token and send user if this completes a registration flow
                const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRES_IN });
                return res.status(200).json({ message: 'Email verified successfully and user logged in!', token, user });
            } else if (user && user.isVerified) {
                return res.status(200).json({ message: 'Email already verified.' });
            }
        }

        // For other purposes like 'password_reset', simply confirm OTP success.
        // The actual password reset is handled by `resetPasswordWithOtp` function.
        res.status(200).json({ message: 'OTP verified successfully!' });

    } catch (err) {
        console.error('Verify OTP controller error:', err);
        res.status(500).json({ message: 'Server error during OTP verification.' });
    }
};

// --- POST /auth/forgot-password - Initiates OTP-based password reset ---
// This function now uses the requestOtp logic with 'password_reset' purpose.
exports.forgotPassword = async(req, res, next) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            // For security, always send a generic success message even if email not found
            return res.status(200).json({ message: 'If an account with that email exists, an OTP has been sent to it.' });
        }

        // Set the purpose in the request body for the requestOtp function
        // and then call requestOtp. This effectively redirects the handling.
        req.body.purpose = 'password_reset';

        // Pass control to the requestOtp handler.
        // If requestOtp handles its own response, this `forgotPassword` function
        // will effectively end here, forwarding `requestOtp`'s response.
        return exports.requestOtp(req, res); // Call and return to let requestOtp handle the response

    } catch (err) {
        console.error("Forgot password controller error:", err);
        res.status(500).json({ message: 'Server error. Please try again later.' });
    }
};

// --- POST /auth/reset-password-otp - Resets password using an OTP ---
exports.resetPasswordWithOtp = async(req, res, next) => {
    const { email, otp, newPassword } = req.body;

    if (!email || !otp || !newPassword) {
        return res.status(400).json({ message: 'Email, OTP, and new password are required.' });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });
        if (!user) {
            return res.status(400).json({ message: 'User not found.' });
        }

        // --- Verify the OTP using the existing verifyOtp logic ---
        // We need to simulate a response object for verifyOtp to write to,
        // as it's designed as an Express middleware/controller function.
        const dummyRes = {
            statusCode: 200, // Default to 200 for internal consistency
            body: {},
            status: function(code) { this.statusCode = code; return this; },
            json: function(data) { this.body = data; return this; }
        };

        // Temporarily set req.body for verifyOtp call as it expects 'purpose'
        const originalReqBody = {...req.body }; // Store original req.body if needed
        req.body = { email, otp, purpose: 'password_reset' };

        await exports.verifyOtp(req, dummyRes); // Call verifyOtp internally

        // Restore original req.body after verifyOtp call
        req.body = originalReqBody;

        // Check the status code from the dummy response to see if verifyOtp was successful
        if (dummyRes.statusCode !== 200) {
            return res.status(dummyRes.statusCode).json({ message: dummyRes.body.message });
        }

        // If OTP is verified successfully (statusCode is 200), proceed to update password
        user.password = newPassword; // Mongoose pre-save hook will hash this
        user.passwordChangedAt = Date.now(); // Optional: track password change time

        // Clean up any old password reset tokens if you were using a link-based system before
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;

        await user.save(); // Save the user with the new hashed password

        res.status(200).json({ message: 'Password has been reset successfully!' });

    } catch (err) {
        console.error("Reset password with OTP controller error:", err);
        res.status(500).json({ message: 'Server error during password reset.' });
    }
};


// --- POST /auth/request-set-password (for Google-only users to set a password) ---
// This function sends a password reset link, NOT an OTP, as it's for setting an *initial* password.
exports.requestSetPassword = async(req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'Email is required.' });
    }

    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        // Only allow setting a password for users who don't have one (e.g., Google users)
        if (!user || user.password) {
            return res.status(400).json({ message: 'User not found or already has a password set.' });
        }

        // Generate a unique token for password setting
        const resetToken = crypto.randomBytes(32).toString('hex');
        const passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
        const passwordResetExpires = Date.now() + 3600000; // 1 hour

        user.passwordResetToken = passwordResetToken;
        user.passwordResetExpires = passwordResetExpires;
        await user.save();

        const resetURL = `${req.protocol}://${req.get('host')}/set-password/${resetToken}`; // Adjust domain for production
        const emailText = `You are receiving this because you (or someone else) have requested to set a password for your account.\n\nPlease go to this link to set your password: ${resetURL}\n\nThis link will expire in one hour. If you did not request this, please ignore this email.`;
        const emailHtml = `<p>You are receiving this because you (or someone else) have requested to set a password for your account.</p><p>Please click this link to set your password: <a href="${resetURL}">${resetURL}</a></p><p>This link will expire in one hour. If you did not request this, please ignore this email.</p>`;

        try {
            await sendEmail({
                email: user.email,
                subject: 'Estatify Set Your Password',
                text: emailText,
                html: emailHtml
            });

            res.status(200).json({ message: 'Password setup link sent to your email!' });
        } catch (emailError) {
            user.passwordResetToken = undefined;
            user.passwordResetExpires = undefined;
            await user.save();
            console.error('Email sending error (requestSetPassword):', emailError);
            return res.status(500).json({ message: 'There was an error sending the email. Please try again later.' });
        }

    } catch (err) {
        console.error("Request set password error:", err);
        res.status(500).json({ message: 'Server error.' });
    }
};

// --- POST /auth/set-password/:token (for Google-only users to set a password via link) ---
exports.setNewPassword = async(req, res) => {
    const { token } = req.params;
    const { newPassword } = req.body;

    if (!newPassword || newPassword.length < 6) {
        return res.status(400).json({ message: 'New password must be at least 6 characters long.' });
    }

    try {
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() } // Token must not be expired
        });

        if (!user) {
            return res.status(400).json({ message: 'Invalid or expired token.' });
        }

        user.password = newPassword; // Mongoose pre-save hook will hash this
        user.passwordResetToken = undefined; // Clear the token fields
        user.passwordResetExpires = undefined;
        await user.save();

        res.status(200).json({ message: 'Password has been set successfully!' });

    } catch (err) {
        console.error("Set new password error:", err);
        res.status(500).json({ message: 'Server error during password setting.' });
    }
};