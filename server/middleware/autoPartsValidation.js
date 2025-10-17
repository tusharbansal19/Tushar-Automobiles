const { body, query, validationResult } = require('express-validator');

// Validation rules for creating auto parts
const createAutoPartValidation = [
  body('title')
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  
  body('brand')
    .notEmpty()
    .withMessage('Brand is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Brand must be between 2 and 50 characters'),
  
  body('category')
    .notEmpty()
    .withMessage('Category is required')
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters'),
  
  body('vehicleType')
    .notEmpty()
    .withMessage('Vehicle type is required'),
  
  body('vehicleName')
    .notEmpty()
    .withMessage('Vehicle name is required'),
  
  body('company')
    .notEmpty()
    .withMessage('Company is required'),
  
  body('model')
    .notEmpty()
    .withMessage('Model is required'),
  
  body('fuelType')
    .notEmpty()
    .withMessage('Fuel type is required'),
  
  body('transmission')
    .notEmpty()
    .withMessage('Transmission is required'),
  
  body('price')
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('discountedPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Discounted price must be a positive number'),
  
  body('partNumber')
    .notEmpty()
    .withMessage('Part number is required')
    .isLength({ min: 3, max: 50 })
    .withMessage('Part number must be between 3 and 50 characters'),
  
  body('stockStatus')
    .optional()
    .isIn(['in-stock', 'out-of-stock', 'pre-order', 'limited-stock'])
    .withMessage('Stock status must be one of: in-stock, out-of-stock, pre-order, limited-stock'),
  
  body('reviews')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Reviews must be a non-negative integer')
];

// Validation rules for updating auto parts
const updateAutoPartValidation = [
  body('title')
    .optional()
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters'),
  
  body('brand')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Brand must be between 2 and 50 characters'),
  
  body('category')
    .optional()
    .isLength({ min: 2, max: 50 })
    .withMessage('Category must be between 2 and 50 characters'),
  
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number'),
  
  body('discountedPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Discounted price must be a positive number'),
  
  body('stockStatus')
    .optional()
    .isIn(['in-stock', 'out-of-stock', 'pre-order', 'limited-stock'])
    .withMessage('Stock status must be one of: in-stock, out-of-stock, pre-order, limited-stock'),
  
  body('reviews')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Reviews must be a non-negative integer')
];

// Validation rules for query parameters
const queryValidation = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('Page must be a positive integer'),
  
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100'),
  
  query('minPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Minimum price must be a positive number'),
  
  query('maxPrice')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Maximum price must be a positive number'),
  
  query('sortBy')
    .optional()
    .isIn(['title', 'price', 'discountedPrice', 'reviews', 'createdAt', 'updatedAt'])
    .withMessage('Sort by must be one of: title, price, discountedPrice, reviews, createdAt, updatedAt'),
  
  query('sortOrder')
    .optional()
    .isIn(['asc', 'desc'])
    .withMessage('Sort order must be either asc or desc')
];

// Middleware to handle validation errors
const handleValidationErrors = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array()
    });
  }
  next();
};

module.exports = {
  createAutoPartValidation,
  updateAutoPartValidation,
  queryValidation,
  handleValidationErrors
};