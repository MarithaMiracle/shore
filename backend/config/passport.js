// Add this to the file where you configure your Passport Google Strategy
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require('../models/user'); // Your Mongoose User model

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.CALLBACK_URL,
    // *** ADD THIS LINE FOR DEPLOYED ENVIRONMENTS LIKE RENDER ***
    proxy: true
}, async(accessToken, refreshToken, profile, done) => {
    try {
        const userEmail = profile.emails && profile.emails.length > 0 ? profile.emails[0].value.toLowerCase() : null;

        let user = await User.findOne({ googleId: profile.id });

        if (user) {
            return done(null, user);
        }

        if (userEmail) {
            user = await User.findOne({ email: userEmail });

            if (user) {
                user.googleId = profile.id;
                user.name = user.name || profile.displayName;
                await user.save();
                return done(null, user);
            }
        }

        const newUser = new User({
            googleId: profile.id,
            email: userEmail,
            name: profile.displayName,
        });
        await newUser.save();
        done(null, newUser);

    } catch (error) {
        console.error("Passport Google Strategy error:", error);
        done(error, null);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async(id, done) => {
    try {
        const user = await User.findById(id);
        done(null, user);
    } catch (err) {
        done(err, null);
    }
});