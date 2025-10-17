const express = require('express');
const {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemsByCategory
} = require('../controllers/itemController');

const router = express.Router();

// GET /api/items - Get all items with filtering and pagination
router.get('/', getAllItems);

// GET /api/items/category/:category - Get items by category
router.get('/category/:category', getItemsByCategory);

// GET /api/items/:id - Get single item
router.get('/:id', getItemById);

// POST /api/items - Create new item
router.post('/', createItem);

// PUT /api/items/:id - Update item
router.put('/:id', updateItem);

// DELETE /api/items/:id - Delete item
router.delete('/:id', deleteItem);

module.exports = router;