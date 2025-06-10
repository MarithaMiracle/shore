// backend/controllers/propertyController.js

const Property = require('../models/Property'); // Import your Property model

// @desc    Get all properties (or filtered properties)
// @route   GET /api/properties
// @access  Public
exports.getProperties = async(req, res) => {
    try {
        let query = {}; // Initialize an empty query object

        // --- Debugging Logs ---
        console.log('Incoming query parameters (req.query):', req.query);

        // --- Basic Filtering Logic (Price and Duration) ---
        if (req.query.minPrice || req.query.maxPrice) {
            query.price = {};
            if (req.query.minPrice) {
                query.price.$gte = parseFloat(req.query.minPrice);
            }
            if (req.query.maxPrice) {
                query.price.$lte = parseFloat(req.query.maxPrice);
            }
        }

        if (req.query.duration) {
            query.durationMonths = parseInt(req.query.duration, 10);
        }

        // --- Add more filters as needed (e.g., bedrooms, amenities, title search) ---
        if (req.query.bedrooms) {
            query.bedrooms = parseInt(req.query.bedrooms, 10);
        }

        if (req.query.title) {
            query.title = { $regex: req.query.title, $options: 'i' };
        }

        if (req.query.amenity) {
            query.amenities = { $in: [new RegExp(req.query.amenity, 'i')] };
        }

        // --- Debugging Log ---
        console.log('Final Mongoose query object:', query);

        // Execute the query
        const properties = await Property.find(query);

        // --- Debugging Log ---
        console.log('Number of properties found in DB:', properties.length);

        res.status(200).json({
            success: true,
            count: properties.length,
            data: properties
        });
    } catch (error) {
        console.error('Error fetching properties:', error);
        res.status(500).json({ success: false, message: 'Server error fetching properties' });
    }
};

// @desc    Get single property by ID (optional, but good practice)
// @route   GET /api/properties/:id
// @access  Public
exports.getPropertyById = async(req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        res.status(200).json({ success: true, data: property });
    } catch (error) {
        console.error('Error fetching single property:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid property ID' });
        }
        res.status(500).json({ success: false, message: 'Server error fetching property' });
    }
};

// --- Optional: Add, Update, Delete Property (CRUD operations) ---
// If you want an admin to add/update/delete properties, you'd add these functions.
// For now, we'll focus on fetching and searching.

// @desc    Create new property
// @route   POST /api/properties
// @access  Private (e.g., admin or authenticated user)
exports.createProperty = async(req, res) => {
    try {
        // You might want to link the property to the user who created it:
        // req.body.user = req.user.id; // Requires authentication middleware to set req.user

        const property = await Property.create(req.body);
        res.status(201).json({ success: true, data: property });
    } catch (error) {
        console.error('Error creating property:', error);
        // Handle Mongoose validation errors
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        res.status(500).json({ success: false, message: 'Server error creating property' });
    }
};

// @desc    Update property
// @route   PUT /api/properties/:id
// @access  Private
exports.updateProperty = async(req, res) => {
    try {
        let property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        // Optional: Check if logged-in user owns the property if applicable
        // if (property.user.toString() !== req.user.id && req.user.role !== 'admin') {
        //     return res.status(401).json({ success: false, message: 'User not authorized to update this property' });
        // }

        property = await Property.findByIdAndUpdate(req.params.id, req.body, {
            new: true, // Return the updated document
            runValidators: true // Run schema validators on update
        });

        res.status(200).json({ success: true, data: property });
    } catch (error) {
        console.error('Error updating property:', error);
        if (error.name === 'ValidationError') {
            const messages = Object.values(error.errors).map(val => val.message);
            return res.status(400).json({ success: false, message: messages.join(', ') });
        }
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid property ID' });
        }
        res.status(500).json({ success: false, message: 'Server error updating property' });
    }
};

// @desc    Delete property
// @route   DELETE /api/properties/:id
// @access  Private
exports.deleteProperty = async(req, res) => {
    try {
        const property = await Property.findById(req.params.id);

        if (!property) {
            return res.status(404).json({ success: false, message: 'Property not found' });
        }

        // Optional: Check if logged-in user owns the property if applicable
        // if (property.user.toString() !== req.user.id && req.user.role !== 'admin') {
        //     return res.status(401).json({ success: false, message: 'User not authorized to delete this property' });
        // }

        await property.deleteOne(); // Use deleteOne() on the found document

        res.status(200).json({ success: true, message: 'Property removed' });
    } catch (error) {
        console.error('Error deleting property:', error);
        if (error.name === 'CastError') {
            return res.status(400).json({ success: false, message: 'Invalid property ID' });
        }
        res.status(500).json({ success: false, message: 'Server error deleting property' });
    }
};