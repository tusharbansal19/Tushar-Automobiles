const express = require('express');
const router = express.Router();
const {
  getAllAutoParts,
  getAutoPartById,
  getFilterOptions,
  createAutoPart,
  updateAutoPart,
  deleteAutoPart,
  seedDummyData
} = require('../controllers/autoPartsController');

const {
  createAutoPartValidation,
  updateAutoPartValidation,
  queryValidation,
  handleValidationErrors
} = require('../middleware/autoPartsValidation');

// Public routes
router.get('/', queryValidation, handleValidationErrors, getAllAutoParts);
router.get('/filters', getFilterOptions);
router.get('/:id', getAutoPartById);

// Admin routes (you can add authentication middleware here)
router.post('/', createAutoPartValidation, handleValidationErrors, createAutoPart);
router.put('/:id', updateAutoPartValidation, handleValidationErrors, updateAutoPart);
router.delete('/:id', deleteAutoPart);

// Seed route (for development/testing)
router.post('/seed', seedDummyData);

module.exports = router;