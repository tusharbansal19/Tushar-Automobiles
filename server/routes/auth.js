const express = require('express');
const router = express.Router();
const { 
  signup, 
  login, 
  getProfile, 
  updateProfile, 
  changePassword 
} = require('../controllers/authController');
const { 
  validateSignup, 
  validateLogin, 
  validateProfileUpdate, 
  validatePasswordChange 
} = require('../middleware/validation');
const { authenticateToken } = require('../middleware/auth');

// Public routes
router.post('/signup', validateSignup, signup);
router.post('/login', validateLogin, login);

// Protected routes (require authentication)
router.get('/profile', authenticateToken, getProfile);
router.put('/profile', authenticateToken, validateProfileUpdate, updateProfile);
router.put('/change-password', authenticateToken, validatePasswordChange, changePassword);

// Logout (client-side token removal, but we can track it server-side if needed)
router.post('/logout', authenticateToken, (req, res) => {
  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

module.exports = router;
