const bcrypt = require('bcrypt'); // Using bcrypt, not bcryptjs as per your original file
const jwt = require('jsonwebtoken');
const crypto = require('crypto'); // For generating secure tokens
const User = require('../models/user'); // Your Mongoose User model
const sendEmail = require('../utils/sendEmail'); // You'll need to create this utility file

const JWT_SECRET = process.env.JWT_SECRET;

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
                return res.status(409).json({ // 409 Conflict is more semantically correct than 400 Bad Request
                    message: 'An account already exists with this email. Please log in, or use a different email to register.',
                    action: 'LOGIN_EXISTING_EMAIL_PASSWORD' // Hint for frontend
                });
            } else if (user.googleId) {
                // Scenario 2: User exists via Google Auth, but no password set for direct login
                return res.status(409).json({
                    message: 'An account already exists for this email through Google. Do you want to sign in with Google or set a password for this account?',
                    action: 'GOOGLE_AUTH_EXISTING_EMAIL_NO_PASSWORD' // Hint for frontend
                });
            }
            // Fallback for any other existing user without a password field (should ideally not happen with a clean schema)
            return res.status(409).json({ message: 'User with this email already exists.' });
        }

        // Scenario 3: No user found with this email, proceed with new email/password registration
        const newUser = new User({
            name,
            email: email.toLowerCase(), // Store normalized email
            password // The User model's pre-save hook will hash this before saving
        });

        await newUser.save();

        const token = jwt.sign({ id: newUser._id, email: newUser.email, name: newUser.name },
            JWT_SECRET, { expiresIn: '1h' }
        );

        res.status(201).json({ // Use 201 Created for successful resource creation
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
        const user = await User.findOne({ email: email.toLowerCase() }); // Normalize email for lookup

        if (!user) {
            // For security, always return generic message
            return res.status(401).json({ message: 'Invalid email or password.' });
        }

        // Scenario 1: User exists via Google Auth, no password (cannot log in with email/password)
        if (!user.password && user.googleId) {
            return res.status(401).json({
                message: 'This account was registered through Google. Please sign in with Google.',
                action: 'REQUIRES_GOOGLE_AUTH' // Hint for frontend
            });
        }
        // Scenario 2: User has a password, compare it
        else if (user.password) {
            const isMatch = await user.comparePassword(password); // Using instance method from User model

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
        }
        // Scenario 3: User exists but has neither a password nor googleId (data inconsistency edge case)
        else {
            return res.status(500).json({ message: 'Account setup incomplete. Please contact support.' });
        }

    } catch (err) {
        console.error("Login error:", err);
        res.status(500).json({ message: 'Server error during login.' });
    }
};

// --- Google Auth Callback Handler ---
// This function is called by your Passport.js Google strategy's callback.
// It handles creating a new user or linking Google ID to an existing email.
exports.googleAuthCallback = async(req, res) => {
    try {
        // req.user is populated by Passport.js after successful Google authentication
        const user = req.user;

        // Generate JWT token for the authenticated user
        const token = jwt.sign({ id: user._id, email: user.email, name: user.name },
            JWT_SECRET, { expiresIn: '1h' }
        );

        // Prepare the user object to be sent to the frontend
        // It's good practice to send only necessary info, not the entire Mongoose object
        const userForFrontend = {
            id: user._id,
            name: user.name,
            email: user.email,
            // Include any other non-sensitive user properties your frontend needs
        };

        // Redirect to your frontend success page, passing token and user info
        // Frontend will extract this from the URL (e.g., query parameters or fragment)
        res.redirect(`${process.env.FRONTEND_URL}/auth/success?token=${token}&user=${encodeURIComponent(JSON.stringify(userForFrontend))}`);
        //                                                 ^ NOW SENDING AS 'user' PARAMETER
        //                                                   ^ JSON.stringify() to convert object to string
        //                                                                   ^ encodeURIComponent for safety in URL

    } catch (err) {
        console.error("Google Auth callback error:", err);
        res.redirect(`${process.env.FRONTEND_URL}/auth/error?message=${encodeURIComponent('Google login failed. Please try again.')}`); // Also encode error message
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
            // For security, do not reveal if email exists or not.
            return res.status(200).json({ message: 'If an account exists, a password set link has been sent to your email.' });
        }

        // If the user already has a password and is not a Google-only account,
        // they should use the forgot password flow.
        if (user.password && !user.googleId) {
            return res.status(400).json({
                message: 'This account is registered with an email and password. Please use the "Forgot Password" option if you need to reset it.',
                action: 'USE_FORGOT_PASSWORD' // Hint for frontend
            });
        }
        // If they have a googleId and no password, or both (linked accounts), proceed.

        // Generate a password reset/set token (using the method in your User model)
        const resetToken = user.generatePasswordResetToken();
        await user.save(); // This saves the hashed token and its expiry to the database

        const resetURL = `${process.env.FRONTEND_URL}/set-password/${resetToken}`; // Your frontend's password set page

        try {
            await sendEmail({
                to: user.email,
                subject: 'Set Your Password for Your Account',
                text: `You are receiving this because you (or someone else) have requested to set a password for your account. Please click on this link to set your password: ${resetURL}\n\nThis link will expire in 1 hour.`
            });
            res.status(200).json({ message: 'Password set link sent to your email.' });
        } catch (emailError) {
            // If email sending fails, clear the token so they can try again
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
        // Hash the incoming token to compare with the stored hashed token
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() } // Check if token exists and is not expired
        });

        if (!user) {
            return res.status(400).json({ message: 'Password set token is invalid or has expired.' });
        }

        // Set the new password and clear token fields
        user.password = password; // The User model's pre-save hook will hash this
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        // Optionally, log the user in immediately after setting password
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
            // Crucial for security: Always return a generic success message
            // regardless of whether the email exists or not, to prevent email enumeration.
            return res.status(200).json({ message: 'If an account with that email exists, a password reset link has been sent.' });
        }

        // If the user is only a Google user (no password set), direct them to the "set password" flow
        if (!user.password && user.googleId) {
            return res.status(400).json({
                message: 'This account was registered through Google. Please sign in with Google or use the "Set Password" option.',
                action: 'REQUIRES_GOOGLE_AUTH_OR_SET_PASSWORD'
            });
        }

        // Generate a password reset token (using the method in your User model)
        const resetToken = user.generatePasswordResetToken();
        await user.save(); // This saves the hashed token and its expiry to the database

        const resetURL = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`; // Your frontend's password reset page

        try {
            await sendEmail({
                to: user.email,
                subject: 'Password Reset Request',
                text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\nPlease click on this link to reset your password: ${resetURL}\n\nThis link will expire in 1 hour.\n\nIf you did not request this, please ignore this email and your password will remain unchanged.`
            });
            res.status(200).json({ message: 'Password reset link sent to your email.' });
        } catch (emailError) {
            // If email sending fails, clear the token so they can try again
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
    const { password } = req.body; // New password

    if (!password || password.length < 6) {
        return res.status(400).json({ message: 'Password is required and must be at least 6 characters long.' });
    }

    try {
        // Hash the incoming token to compare with the stored hashed token
        const hashedToken = crypto.createHash('sha256').update(token).digest('hex');

        const user = await User.findOne({
            passwordResetToken: hashedToken,
            passwordResetExpires: { $gt: Date.now() } // Check if token exists and is not expired
        });

        if (!user) {
            return res.status(400).json({ message: 'Password reset token is invalid or has expired.' });
        }

        // Update user's password and clear reset token fields
        user.password = password; // The User model's pre-save hook will hash this
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save();

        // Optionally, log the user in immediately after password reset
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