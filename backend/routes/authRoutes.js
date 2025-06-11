// backend/routes/authRoutes.js
const express = require('express');
const passport = require('passport');
const authController = require('../controllers/authController');

const router = express.Router();

// --- POST /auth/register - Register a new user with email/password ---
router.post('/register', authController.register);

// --- POST /auth/login - Email/password login ---
router.post('/login', authController.login);

// --- OTP Routes (re-affirming their presence if not already in your file) ---
router.post('/request-otp', authController.requestOtp);
router.post('/verify-otp', authController.verifyOtp);

// --- MODIFIED: POST /auth/forgot-password - Now initiates OTP-based password reset ---
router.post('/forgot-password', authController.forgotPassword); // This now calls the updated controller function

// --- NEW: POST /auth/reset-password-otp - Handles OTP-based password reset ---
router.post('/reset-password-otp', authController.resetPasswordWithOtp); // New route for your ResetPasswordWithOtp.jsx form

// --- Google Auth Routes (unchanged) ---
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    authController.googleAuthCallback
);

// --- Your existing /auth/request-set-password and /auth/set-password/:token (for Google users) ---
router.post('/request-set-password', authController.requestSetPassword);
router.post('/set-password/:token', authController.setNewPassword);

// --- Old /auth/reset-password/:token (if you were using link-based reset) ---
// You will likely REMOVE or COMMENT OUT this route if you are ONLY using OTP for password reset.
// If you want to keep it as an alternative, ensure its controller function is distinct from the OTP flow.
// router.patch('/reset-password/:token', authController.resetPassword);

module.exports = router;