// backend/models/Property.js

const mongoose = require('mongoose');

const propertySchema = new mongoose.Schema({
    // Corresponds to your 'title' (e.g., "1 Bedroom", "Studio Apartment")
    title: {
        type: String,
        required: [true, 'Please add a property title'],
        trim: true,
        maxlength: [100, 'Title cannot be more than 100 characters']
    },
    // Corresponds to your 'features[].desc' (e.g., "Cozy bedroom ideal for singles or couples.")
    description: {
        type: String,
        required: [true, 'Please add a description'],
        maxlength: [500, 'Description cannot be more than 500 characters']
    },
    // Corresponds to your 'price' (e.g., "From ₦200,000 monthly"). We'll store it as a number.
    price: {
        type: Number,
        required: [true, 'Please add a price'],
        min: [0, 'Price cannot be negative']
    },
    // We'll infer 'durationMonths' as 1 for all your "monthly" listings.
    // If you plan to have 'quarterly' or 'yearly' rentals, we'd need to adjust this.
    durationMonths: {
        type: Number,
        default: 1, // Defaulting to 1 month for "monthly" listings
        min: [1, 'Duration must be at least 1 month']
    },
    // We can extract bedrooms from the 'title' if it's consistent (e.g., "1 Bedroom")
    bedrooms: {
        type: Number,
        default: 0, // Default to 0 for studio or if not explicitly in title
        min: 0
    },
    // Corresponds to your 'image' field (will be an array to match 'images' property in the schema)
    images: {
        type: [String], // Array of image URLs/paths
        required: true,
        validate: {
            validator: function(v) {
                return v && v.length > 0; // Ensure at least one image URL is present
            },
            message: 'A property must have at least one image.'
        }
    },
    // Corresponds to the 'features[].title' (e.g., "Free Wi-Fi", "Air Conditioning")
    amenities: [String],
    createdAt: {
        type: Date,
        default: Date.now
    }
}, {
    // --- ADD THIS CONFIGURATION BLOCK ---
    collection: 'Properties' // Explicitly tell Mongoose the collection name
        // --- END OF ADDITION ---
});

module.exports = mongoose.model('Property', propertySchema);