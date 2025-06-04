// backend/routes/propertyRoutes.js

const express = require('express');
const {
    getProperties,
    getPropertyById,
    createProperty,
    updateProperty,
    deleteProperty
} = require('../controllers/propertyController');

const router = express.Router();

// Public routes for fetching properties (including search)
router.get('/', getProperties); // GET /api/properties (for all properties, or with query params for search)
router.get('/:id', getPropertyById); // GET /api/properties/:id (for a single property)

// Private/Protected routes for managing properties (optional for now, but good to have)
// You would add middleware here later, e.g., auth middleware
// router.post('/', protect, authorize('admin'), createProperty);
// router.put('/:id', protect, authorize('admin'), updateProperty);
// router.delete('/:id', protect, authorize('admin'), deleteProperty);

// For testing purposes initially, you can uncomment these if you need to add properties via API:
router.post('/', createProperty);
// router.put('/:id', updateProperty);
// router.delete('/:id', deleteProperty);


module.exports = router;