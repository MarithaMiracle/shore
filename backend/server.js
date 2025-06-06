const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const passport = require('passport');
const session = require('express-session');
const MongoStore = require('connect-mongo');
require('dotenv').config();
require('./config/passport');

const app = express();

// Middleware

app.use(cors({
    origin: 'https://shore-maritha.vercel.app',
    credentials: true,
}));

app.use(express.json());

app.use(session({
    secret: process.env.SESSION_SECRET || 'fallback-secret',
    resave: false,
    saveUninitialized: false,
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
    cookie: {
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
        maxAge: 24 * 60 * 60 * 1000,
    },
}));

app.use(passport.initialize());
app.use(passport.session());

// Routes
const authRoutes = require('./routes/authRoutes');
const propertyRoutes = require('./routes/propertyRoutes');

app.use('/auth', authRoutes);
app.use('/api/properties', propertyRoutes);

// Connect to MongoDB with SSL/TLS options
mongoose.connect(process.env.MONGO_URI, {
        // useNewUrlParser and useUnifiedTopology are deprecated and no longer needed.
        // They are now the default behavior in MongoDB Node.js Driver v4.0.0+
        ssl: true,
        tlsAllowInvalidCertificates: false, // Ensure valid certs in production!
        serverSelectionTimeoutMS: 30000,
    })
    .then(() => {
        console.log('Connected to MongoDB Atlas successfully');
        app.listen(5000, () => console.log('Server running on port 5000'));
    })
    .catch(err => console.error('MongoDB connection error:', err));