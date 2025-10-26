const mongoose = require('mongoose');

const autoPartsSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    trim: true
  },
  vehicleType: {
    type: String,
    required: true,
    trim: true
  },
  vehicleName: {
    type: String,
    required: true,
    trim: true
  },
  company: {
    type: String,
    required: true,
    trim: true
  },
  model: {
    type: String,
    required: true,
    trim: true
  },
  variant: {
    type: String,
    trim: true
  },
  fuelType: {
    type: String,
    required: true,
    trim: true
  },
  transmission: {
    type: String,
    required: true,
    trim: true
  },
  specifications: {
    type: Map,
    of: String,
    default: {}
  },
  stockStatus: {
    type: String,
    enum: ['in-stock', 'out-of-stock', 'pre-order', 'limited-stock'],
    default: 'in-stock'
  },
  reviews: {
    type: Number,
    default: 0,
    min: 0
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  discountedPrice: {
    type: Number,
    min: 0
  },
  partNumber: {
    type: String,
    required: true,
    trim: true
  },
  warranty: {
    type: String,
    trim: true
  },
  imgs: {
    thumbnails: [{
      type: String,
      trim: true
    }],
    previews: [{
      type: String,
      trim: true
    }]
  },
  isActive: {
    type: Boolean,
    default: true
  },
  tags: [{
    type: String,
    trim: true
  }]
}, {
  timestamps: true
});

// Indexes for better search performance
autoPartsSchema.index({ title: 'text', brand: 'text', category: 'text', vehicleName: 'text' });
autoPartsSchema.index({ company: 1 });
autoPartsSchema.index({ category: 1 });
autoPartsSchema.index({ vehicleType: 1 });
autoPartsSchema.index({ fuelType: 1 });
autoPartsSchema.index({ stockStatus: 1 });
autoPartsSchema.index({ price: 1 });
autoPartsSchema.index({ partNumber: 1 }, { unique: true });

// Virtual for calculating discount percentage
autoPartsSchema.virtual('discountPercentage').get(function() {
  if (this.discountedPrice && this.price > this.discountedPrice) {
    return Math.round(((this.price - this.discountedPrice) / this.price) * 100);
  }
  return 0;
});

// Ensure virtual fields are serialized
autoPartsSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('AutoParts', autoPartsSchema);