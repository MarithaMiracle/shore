const express = require('express');
const passport = require('passport'); // Still needed for Google Auth middleware
const authController = require('../controllers/authController'); // Import your authController

const router = express.Router();

// --- POST /auth/register - Register a new user with email/password ---
// This route now simply calls the register function from the authController
router.post('/register', authController.register);

// --- POST /auth/login - Email/password login ---
// This route now simply calls the login function from the authController
router.post('/login', authController.login);

// --- Google Auth Routes ---
// Initiates the Google authentication process
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'] }));

// Google authentication callback
// This route now calls the googleAuthCallback function from the authController
// The `passport.authenticate` middleware will populate `req.user` which the controller uses.
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/login' }),
    authController.googleAuthCallback
);

// --- POST /auth/request-set-password - For Google Auth users to set a password ---
// This route now simply calls the requestSetPassword function from the authController
router.post('/request-set-password', authController.requestSetPassword);

// --- POST /auth/set-password/:token - Handles setting the password for Google Auth users ---
// This route now simply calls the setNewPassword function from the authController
router.post('/set-password/:token', authController.setNewPassword);

// --- POST /auth/forgot-password - Initiates the password reset process ---
// This route now simply calls the forgotPassword function from the authController
router.post('/forgot-password', authController.forgotPassword);

// --- PATCH /auth/reset-password/:token - Handles the actual password reset ---
// This route now simply calls the resetPassword function from the authController
router.patch('/reset-password/:token', authController.resetPassword);

module.exports = router;