const express = require('express');
const router = express.Router();
const {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  getContactStats
} = require('../controllers/contactController');
const { authenticateToken, requireAdmin } = require('../middleware/auth');
const { validateContact } = require('../middleware/validation');

// Public routes
router.post('/submit', validateContact, submitContact);

// Admin routes (protected)
router.get('/', authenticateToken, requireAdmin, getAllContacts);
router.get('/stats', authenticateToken, requireAdmin, getContactStats);
router.get('/:id', authenticateToken, requireAdmin, getContactById);
router.put('/:id/status', authenticateToken, requireAdmin, updateContactStatus);

module.exports = router;