const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto'); // We need Node.js's crypto module for secure token generation

const userSchema = new mongoose.Schema({
    // googleId: This field will be present for users who signed up via Google.
    // It's unique for Google users, but `sparse: true` allows multiple documents
    // to have `null` or `undefined` values, which is necessary for email/password-only users.
    googleId: {
        type: String,
        unique: true,
        sparse: true // Crucial: allows multiple documents to have a null/undefined googleId
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true, // Store emails in lowercase for consistency
        trim: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    // password: This field will only be present for users who register with email and password,
    // or Google users who choose to set a password later. It is not required initially.
    password: {
        type: String,
        // We do not set 'required: true' here as Google users won't have a password initially.
        // Password hashing will occur in the pre-save hook.
    },
    // Fields for password reset and set password functionality
    passwordResetToken: String, // Stores the hashed version of the reset token
    passwordResetExpires: Date, // Stores the expiry date of the reset token
}, { timestamps: true });

// --- Mongoose Middleware: Pre-save hook to hash password ---
// This middleware runs *before* a user document is saved.
userSchema.pre('save', async function(next) {
    // Only hash the password if it's been modified (or is new) AND it actually exists.
    // This prevents re-hashing an already hashed password or trying to hash an empty password field.
    if (!this.isModified('password') || !this.password) {
        return next();
    }
    try {
        const salt = await bcrypt.genSalt(10); // Generate a salt for hashing
        this.password = await bcrypt.hash(this.password, salt); // Hash the password
        next();
    } catch (err) {
        next(err); // Pass any error to the next middleware
    }
});

// --- Mongoose Instance Method: comparePassword ---
// This method is called on a user document to compare a candidate password (from login)
// with the hashed password stored in the database.
userSchema.methods.comparePassword = async function(candidatePassword) {
    // If the user document doesn't have a password field (e.g., Google-only user),
    // then comparison should fail.
    if (!this.password) {
        return false;
    }
    return bcrypt.compare(candidatePassword, this.password);
};

// --- Mongoose Instance Method: generatePasswordResetToken ---
// This method generates a unique token for password reset/set password flows.
// It stores a HASHED version of the token in the database and returns the UNHASHED version
// to be sent via email.
userSchema.methods.generatePasswordResetToken = function() {
    // 1. Generate a random, unhashed token (what we send to the user)
    const resetToken = crypto.randomBytes(32).toString('hex');

    // 2. Hash the token for storage in the database
    // We hash it to prevent exposing the raw token if the database is compromised.
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // 3. Set the expiry time for the token (e.g., 1 hour from now)
    this.passwordResetExpires = Date.now() + 3600000; // 3600000 milliseconds = 1 hour

    // 4. Return the unhashed token to be sent to the user's email
    return resetToken;
};

module.exports = mongoose.model('User', userSchema);