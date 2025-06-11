// backend/models/otp.js
const mongoose = require('mongoose');

const otpSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        // Ensure unique email for active OTPs to prevent multiple active OTPs for the same user
        // We'll handle this uniqueness with an index and expiration in the controller
    },
    otp: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
        // This index will automatically delete the OTP document after 10 minutes (600 seconds)
        // This is crucial for managing OTP expiry directly in the database
        expires: 60 * 10 // OTP expires in 10 minutes (adjust as needed)
    },
    // Optional: A field to indicate the purpose of the OTP (e.g., 'registration', 'password_reset', '2fa')
    // This helps if you use OTPs for multiple flows and want to differentiate them.
    purpose: {
        type: String,
        enum: ['registration', 'password_reset', '2fa', 'email_verification'],
        default: 'email_verification'
    }
}, {
    timestamps: false // We are managing `createdAt` and `expires` manually
});

// Create a unique index on email to ensure only one active OTP per email at a time
// and expire it based on `createdAt`.
otpSchema.index({ email: 1, purpose: 1, createdAt: 1 }, {
    unique: true,
    expireAfterSeconds: 0 // `expires` option on `createdAt` handles actual expiry
});

const OTP = mongoose.model('OTP', otpSchema);

module.exports = OTP;