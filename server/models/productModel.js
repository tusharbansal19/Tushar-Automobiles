const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Product name is required'],
    trim: true,
    maxlength: [100, 'Product name cannot exceed 100 characters']
  },
  description: {
    type: String,
    required: [true, 'Product description is required'],
    maxlength: [2000, 'Description cannot exceed 2000 characters']
  },
  shortDescription: {
    type: String,
    maxlength: [500, 'Short description cannot exceed 500 characters']
  },
  sku: {
    type: String,
    required: [true, 'SKU is required'],
    unique: true,
    uppercase: true,
    trim: true
  },
  category: {
    type: String,
    required: [true, 'Category is required'],
    enum: [
      'engine-oil',
      'brake-parts',
      'filters',
      'lights',
      'wheels',
      'suspension',
      'tools',
      'accessories'
    ]
  },
  subcategory: {
    type: String,
    trim: true
  },
  brand: {
    type: String,
    required: [true, 'Brand is required'],
    trim: true
  },
  model: {
    type: String,
    trim: true
  },
  price: {
    regular: {
      type: Number,
      required: [true, 'Regular price is required'],
      min: [0, 'Price cannot be negative']
    },
    sale: {
      type: Number,
      min: [0, 'Sale price cannot be negative'],
      validate: {
        validator: function(value) {
          return !value || value < this.price.regular;
        },
        message: 'Sale price must be less than regular price'
      }
    }
  },
  images: [{
    url: {
      type: String,
      required: true
    },
    alt: String,
    isPrimary: {
      type: Boolean,
      default: false
    }
  }],
  specifications: {
    type: Map,
    of: String
  },
  compatibility: [{
    make: String,
    model: String,
    year: {
      from: Number,
      to: Number
    },
    engine: String
  }],
  inventory: {
    quantity: {
      type: Number,
      required: [true, 'Quantity is required'],
      min: [0, 'Quantity cannot be negative'],
      default: 0
    },
    lowStockThreshold: {
      type: Number,
      default: 10
    },
    trackInventory: {
      type: Boolean,
      default: true
    }
  },
  dimensions: {
    length: Number,
    width: Number,
    height: Number,
    weight: Number,
    unit: {
      type: String,
      enum: ['cm', 'inch'],
      default: 'cm'
    }
  },
  shipping: {
    weight: Number,
    freeShipping: {
      type: Boolean,
      default: false
    },
    shippingClass: {
      type: String,
      enum: ['standard', 'heavy', 'fragile'],
      default: 'standard'
    }
  },
  seo: {
    metaTitle: String,
    metaDescription: String,
    keywords: [String]
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'discontinued'],
    default: 'active'
  },
  featured: {
    type: Boolean,
    default: false
  },
  tags: [String],
  reviews: [{
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5
    },
    comment: String,
    verified: {
      type: Boolean,
      default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  }],
  averageRating: {
    type: Number,
    default: 0,
    min: 0,
    max: 5
  },
  totalReviews: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

// Indexes for better performance
productSchema.index({ name: 'text', description: 'text' });
productSchema.index({ category: 1, status: 1 });
productSchema.index({ brand: 1 });
productSchema.index({ sku: 1 });
productSchema.index({ 'price.regular': 1 });
productSchema.index({ featured: 1, status: 1 });
productSchema.index({ createdAt: -1 });

// Virtual for current price
productSchema.virtual('currentPrice').get(function() {
  return this.price.sale || this.price.regular;
});

// Virtual for discount percentage
productSchema.virtual('discountPercentage').get(function() {
  if (this.price.sale && this.price.sale < this.price.regular) {
    return Math.round(((this.price.regular - this.price.sale) / this.price.regular) * 100);
  }
  return 0;
});

// Virtual for stock status
productSchema.virtual('stockStatus').get(function() {
  if (!this.inventory.trackInventory) return 'in-stock';
  if (this.inventory.quantity === 0) return 'out-of-stock';
  if (this.inventory.quantity <= this.inventory.lowStockThreshold) return 'low-stock';
  return 'in-stock';
});

// Update average rating when reviews change
productSchema.methods.updateRating = function() {
  if (this.reviews.length === 0) {
    this.averageRating = 0;
    this.totalReviews = 0;
  } else {
    const totalRating = this.reviews.reduce((sum, review) => sum + review.rating, 0);
    this.averageRating = Math.round((totalRating / this.reviews.length) * 10) / 10;
    this.totalReviews = this.reviews.length;
  }
  return this.save();
};

// Static methods
productSchema.statics.findByCategory = function(category) {
  return this.find({ category, status: 'active' });
};

productSchema.statics.findFeatured = function() {
  return this.find({ featured: true, status: 'active' });
};

productSchema.statics.findInStock = function() {
  return this.find({ 
    status: 'active',
    $or: [
      { 'inventory.trackInventory': false },
      { 'inventory.quantity': { $gt: 0 } }
    ]
  });
};

const Product = mongoose.model('Product', productSchema);

module.exports = Product;