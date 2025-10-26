const { body } = require('express-validator');

// User registration validation
const validateSignup = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
    // Temporarily removed complex password requirements for testing
    // .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    // .withMessage('Password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('phone')
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be 10 digits')
];

// User login validation
const validateLogin = [
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('password')
    .notEmpty()
    .withMessage('Password is required')
];

// Profile update validation
const validateProfileUpdate = [
  body('name')
    .optional()
    .trim()
    .isLength({ min: 2, max: 50 })
    .withMessage('Name must be between 2 and 50 characters'),
  
  body('phone')
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be 10 digits'),
  
  body('address.street')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Street address cannot exceed 200 characters'),
  
  body('address.city')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('City cannot exceed 50 characters'),
  
  body('address.state')
    .optional()
    .trim()
    .isLength({ max: 50 })
    .withMessage('State cannot exceed 50 characters'),
  
  body('address.zipCode')
    .optional()
    .matches(/^[0-9]{6}$/)
    .withMessage('ZIP code must be 6 digits')
];

// Password change validation
const validatePasswordChange = [
  body('currentPassword')
    .notEmpty()
    .withMessage('Current password is required'),
  
  body('newPassword')
    .isLength({ min: 6 })
    .withMessage('New password must be at least 6 characters long')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
    .withMessage('New password must contain at least one uppercase letter, one lowercase letter, and one number'),
  
  body('confirmPassword')
    .custom((value, { req }) => {
      if (value !== req.body.newPassword) {
        throw new Error('Password confirmation does not match new password');
      }
      return true;
    })
];

// Product validation
const validateProduct = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Product name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Product name must be between 2 and 100 characters'),
  
  body('description')
    .trim()
    .notEmpty()
    .withMessage('Product description is required')
    .isLength({ max: 2000 })
    .withMessage('Description cannot exceed 2000 characters'),
  
  body('sku')
    .trim()
    .notEmpty()
    .withMessage('SKU is required')
    .isLength({ min: 3, max: 20 })
    .withMessage('SKU must be between 3 and 20 characters'),
  
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isIn(['engine-oil', 'brake-parts', 'filters', 'lights', 'wheels', 'suspension', 'tools', 'accessories'])
    .withMessage('Invalid category'),
  
  body('brand')
    .trim()
    .notEmpty()
    .withMessage('Brand is required'),
  
  body('price.regular')
    .isFloat({ min: 0 })
    .withMessage('Regular price must be a positive number'),
  
  body('price.sale')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Sale price must be a positive number'),
  
  body('inventory.quantity')
    .isInt({ min: 0 })
    .withMessage('Quantity must be a non-negative integer')
];

// Contact form validation
const validateContact = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters'),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Please provide a valid email address')
    .normalizeEmail(),
  
  body('phone')
    .optional()
    .matches(/^[0-9]{10}$/)
    .withMessage('Phone number must be 10 digits'),
  
  body('subject')
    .trim()
    .notEmpty()
    .withMessage('Subject is required')
    .isLength({ min: 5, max: 200 })
    .withMessage('Subject must be between 5 and 200 characters'),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 1000 })
    .withMessage('Message must be between 10 and 1000 characters'),
  
  body('inquiryType')
    .optional()
    .isIn([
      'spare-parts', 
      'engine-parts', 
      'brake-system', 
      'electrical', 
      'wheels-tyres', 
      'filters', 
      'suspension', 
      'tools-equipment', 
      'installation', 
      'warranty', 
      'bulk-order', 
      'technical-support', 
      'general'
    ])
    .withMessage('Invalid inquiry type')
];

module.exports = {
  validateSignup,
  validateLogin,
  validateProfileUpdate,
  validatePasswordChange,
  validateProduct,
  validateContact
};