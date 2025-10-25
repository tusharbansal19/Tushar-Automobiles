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
const { authenticateToken, requireAdmin } = require('../middleware/auth');

// GET /api/auto-parts - Get all auto parts with filtering and pagination
router.get('/', getAllAutoParts);

// GET /api/auto-parts/filters - Get filter options
router.get('/filters', getFilterOptions);

// GET /api/auto-parts/seed - Seed dummy data (for development)
router.post('/seed', seedDummyData);

// GET /api/auto-parts/:id - Get single auto part by ID
router.get('/:id', getAutoPartById);

// POST /api/auto-parts - Create new auto part (Admin only)
router.post('/', authenticateToken, requireAdmin, createAutoPart);

// PUT /api/auto-parts/:id - Update auto part (Admin only)
router.put('/:id', authenticateToken, requireAdmin, updateAutoPart);

// DELETE /api/auto-parts/:id - Delete auto part (Admin only)
router.delete('/:id', authenticateToken, requireAdmin, deleteAutoPart);

module.exports = router;