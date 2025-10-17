const Item = require('../models/itemModel');

// Get all items
const getAllItems = async (req, res) => {
  try {
    const { 
      page = 1, 
      limit = 10, 
      category, 
      brand, 
      search 
    } = req.query;

    // Build filter object
    const filter = {};
    if (category) filter.category = category;
    if (brand) filter.brand = new RegExp(brand, 'i');
    if (search) {
      filter.$or = [
        { name: new RegExp(search, 'i') },
        { description: new RegExp(search, 'i') }
      ];
    }

    const skip = (parseInt(page) - 1) * parseInt(limit);
    
    const [items, total] = await Promise.all([
      Item.find(filter)
        .skip(skip)
        .limit(parseInt(limit))
        .sort({ createdAt: -1 }),
      Item.countDocuments(filter)
    ]);

    const totalPages = Math.ceil(total / parseInt(limit));

    res.json({
      success: true,
      data: {
        items,
        pagination: {
          currentPage: parseInt(page),
          totalPages,
          totalItems: total,
          hasNextPage: parseInt(page) < totalPages,
          hasPrevPage: parseInt(page) > 1
        }
      }
    });

  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get single item by ID
const getItemById = async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      data: { item }
    });

  } catch (error) {
    console.error('Get item error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Create new item
const createItem = async (req, res) => {
  try {
    const { name, brand, category, description, price, stock, discount, images } = req.body;

    // Validation
    if (!name || !category || !description || price === undefined) {
      return res.status(400).json({
        success: false,
        message: 'Name, category, description, and price are required'
      });
    }

    if (price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price cannot be negative'
      });
    }

    if (description.length > 300) {
      return res.status(400).json({
        success: false,
        message: 'Description cannot exceed 300 characters'
      });
    }

    const item = new Item({
      name: name.trim(),
      brand: brand || "Generic",
      category,
      description: description.trim(),
      price: parseFloat(price),
      stock: stock || 0,
      discount: discount || 0,
      images: images || []
    });

    await item.save();

    res.status(201).json({
      success: true,
      message: 'Item created successfully',
      data: { item }
    });

  } catch (error) {
    console.error('Create item error:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Update item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
    const updateData = req.body;

    // Validate price if provided
    if (updateData.price !== undefined && updateData.price < 0) {
      return res.status(400).json({
        success: false,
        message: 'Price cannot be negative'
      });
    }

    // Validate description length if provided
    if (updateData.description && updateData.description.length > 300) {
      return res.status(400).json({
        success: false,
        message: 'Description cannot exceed 300 characters'
      });
    }

    const item = await Item.findByIdAndUpdate(
      id,
      updateData,
      { new: true, runValidators: true }
    );

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item updated successfully',
      data: { item }
    });

  } catch (error) {
    console.error('Update item error:', error);
    
    if (error.name === 'ValidationError') {
      const validationErrors = Object.values(error.errors).map(err => ({
        field: err.path,
        message: err.message
      }));
      
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: validationErrors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  try {
    const item = await Item.findByIdAndDelete(req.params.id);

    if (!item) {
      return res.status(404).json({
        success: false,
        message: 'Item not found'
      });
    }

    res.json({
      success: true,
      message: 'Item deleted successfully'
    });

  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};

// Get items by category
const getItemsByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const items = await Item.find({ category }).sort({ createdAt: -1 });

    res.json({
      success: true,
      data: { items }
    });

  } catch (error) {
    console.error('Get items by category error:', error);
    res.status(500).json({
      success: false,
      message: 'Internal server error'
    });
  }
};
module.
exports = {
  getAllItems,
  getItemById,
  createItem,
  updateItem,
  deleteItem,
  getItemsByCategory
};