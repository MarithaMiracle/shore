const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user'); // Your Mongoose User model

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL, // Ensure this matches your backend route and Google Console setup
}, async(accessToken, refreshToken, profile, done) => {
    try {
        const userEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value.toLowerCase() : null;

        // 1. Check if a user already exists with this Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
            // User found by Google ID, so they've authenticated with Google before.
            return done(null, user);
        }

        // 2. If no user found by Google ID, check if an account exists with this email
        // This handles cases where a user might have first signed up with email/password
        // and is now trying to log in/link with Google.
        if (userEmail) { // Only proceed if Google provided an email
            user = await User.findOne({ email: userEmail });

            if (user) {
                // An account with this email exists!
                // We should link this existing account with the Google ID.
                user.googleId = profile.id; // Link the Google ID
                user.name = user.name || profile.displayName; // Optionally update name if it's empty
                await user.save();
                return done(null, user);
            }
        }

        // 3. If no existing user found by Google ID or email, create a new user
        // This will create a brand new user document, primarily linked via Google.
        const newUser = new User({
            googleId: profile.id,
            email: userEmail, // Store the normalized email
            name: profile.displayName,
            // password field will be undefined/null, as this is a Google-only signup
        });
        await newUser.save();
        done(null, newUser);

    } catch (error) {
        console.error("Passport Google Strategy error:", error);
        done(error, null); // Pass the error to Passport
    }
}));

// Serialize user: Stores user ID in the session (for session-based authentication)
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserialize user: Retrieves user from ID stored in the session
passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});