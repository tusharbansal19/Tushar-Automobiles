const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  brand: {
    type: String,
    default: "Generic"
  },
  category: {
    type: String,
    required: true,
    enum: [
      "Engine",
      "Brakes",
      "Suspension",
      "Body",
      "Lighting",
      "Oils",
      "Electrical",
      "Cooling",
      "Transmission",
      "Accessories"
    ]
  },

  description: {
    type: String,
    required: true,
    maxlength: 300
  },
  car: {
    type: {
      type: String,
      required: true
    },
    company: {
      type: String,
      required: true
    },
    model: {
      type: String,
      required: true
    }
  },
  price: {
    type: Number,
    required: true,
    min: 0
  },
  stock: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    default: 0
  },
  images: [{
    data: Buffer,
    contentType: String,
    filename: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model("Item", itemSchema);