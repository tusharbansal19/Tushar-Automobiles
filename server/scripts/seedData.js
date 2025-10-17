require('dotenv').config();
const mongoose = require('mongoose');
const User = require('../models/userModel');
const Product = require('../models/productModel');
const connectDB = require('../config/database');

const sampleProducts = [
  {
    name: "Castrol GTX 20W-50 Engine Oil",
    description: "High-quality engine oil suitable for all types of vehicles. Provides excellent protection against engine wear and deposits.",
    shortDescription: "Premium engine oil for superior engine protection",
    sku: "CAST-GTX-20W50-3L",
    category: "engine-oil",
    subcategory: "mineral-oil",
    brand: "Castrol",
    price: {
      regular: 1150,
      sale: 999
    },
    images: [
      {
        url: "/images/arrivals/3l-castrol-gtx-20w50-engine-oil-removebg-preview.png",
        alt: "Castrol GTX Engine Oil",
        isPrimary: true
      }
    ],
    specifications: {
      "Viscosity": "20W-50",
      "Volume": "3 Liters",
      "Type": "Mineral Oil",
      "API Rating": "SN/CF"
    },
    compatibility: [
      {
        make: "Maruti Suzuki",
        model: "Swift",
        year: { from: 2010, to: 2023 }
      },
      {
        make: "Hyundai",
        model: "i20",
        year: { from: 2012, to: 2023 }
      }
    ],
    inventory: {
      quantity: 50,
      lowStockThreshold: 10
    },
    featured: true,
    tags: ["engine-oil", "castrol", "premium", "protection"]
  },
  {
    name: "Mobil 1 Synthetic Engine Oil",
    description: "Advanced full synthetic engine oil that provides exceptional cleaning power, wear protection and overall performance.",
    shortDescription: "Full synthetic engine oil for maximum performance",
    sku: "MOBIL-1-5W30-4L",
    category: "engine-oil",
    subcategory: "synthetic-oil",
    brand: "Mobil",
    price: {
      regular: 2500,
      sale: 2199
    },
    images: [
      {
        url: "/images/arrivals/71Y27LKXBdL-removebg-preview.png",
        alt: "Mobil 1 Engine Oil",
        isPrimary: true
      }
    ],
    specifications: {
      "Viscosity": "5W-30",
      "Volume": "4 Liters",
      "Type": "Full Synthetic",
      "API Rating": "SN Plus"
    },
    inventory: {
      quantity: 30,
      lowStockThreshold: 5
    },
    featured: true,
    tags: ["engine-oil", "mobil", "synthetic", "performance"]
  },
  {
    name: "Brake Disc Pads Set",
    description: "High-performance brake pads designed for superior stopping power and durability. Compatible with most Indian cars.",
    shortDescription: "Premium brake pads for enhanced safety",
    sku: "BRAKE-PAD-SET-001",
    category: "brake-parts",
    subcategory: "brake-pads",
    brand: "Bosch",
    price: {
      regular: 1800,
      sale: 1599
    },
    images: [
      {
        url: "/images/arrivals/clutch-plate-500x500-removebg-preview.png",
        alt: "Brake Disc Pads",
        isPrimary: true
      }
    ],
    specifications: {
      "Material": "Ceramic",
      "Compatibility": "Front Axle",
      "Warranty": "2 Years"
    },
    inventory: {
      quantity: 25,
      lowStockThreshold: 8
    },
    featured: false,
    tags: ["brake-parts", "bosch", "safety", "ceramic"]
  },
  {
    name: "Air Filter - Universal",
    description: "High-efficiency air filter that provides excellent filtration and airflow for optimal engine performance.",
    shortDescription: "Universal air filter for better engine breathing",
    sku: "AIR-FILTER-UNI-001",
    category: "filters",
    subcategory: "air-filters",
    brand: "Mann Filter",
    price: {
      regular: 450,
      sale: 399
    },
    images: [
      {
        url: "/images/categories/categories-03.png",
        alt: "Air Filter",
        isPrimary: true
      }
    ],
    specifications: {
      "Type": "Paper Element",
      "Filtration Efficiency": "99.5%",
      "Dimensions": "Standard"
    },
    inventory: {
      quantity: 100,
      lowStockThreshold: 20
    },
    featured: false,
    tags: ["filters", "air-filter", "mann", "efficiency"]
  },
  {
    name: "LED Headlight Bulbs H4",
    description: "Super bright LED headlight bulbs with long lifespan and low power consumption. Easy plug-and-play installation.",
    shortDescription: "Bright LED headlight bulbs for better visibility",
    sku: "LED-H4-BULB-PAIR",
    category: "lights",
    subcategory: "headlights",
    brand: "Philips",
    price: {
      regular: 2200,
      sale: 1899
    },
    images: [
      {
        url: "/images/categories/categories-04.png",
        alt: "LED Headlight Bulbs",
        isPrimary: true
      }
    ],
    specifications: {
      "Type": "H4 LED",
      "Power": "36W",
      "Lumens": "8000LM",
      "Color Temperature": "6500K"
    },
    inventory: {
      quantity: 40,
      lowStockThreshold: 10
    },
    featured: true,
    tags: ["lights", "led", "headlight", "philips", "bright"]
  },
  {
    name: "Alloy Wheels 15 Inch",
    description: "Stylish alloy wheels that enhance your vehicle's appearance while providing better performance and fuel efficiency.",
    shortDescription: "Premium alloy wheels for style and performance",
    sku: "ALLOY-15-INCH-SET",
    category: "wheels",
    subcategory: "alloy-wheels",
    brand: "Enkei",
    price: {
      regular: 25000,
      sale: 22500
    },
    images: [
      {
        url: "/images/categories/categories-05.png",
        alt: "Alloy Wheels",
        isPrimary: true
      }
    ],
    specifications: {
      "Size": "15 x 6.5 inches",
      "PCD": "4x100",
      "Offset": "ET45",
      "Material": "Aluminum Alloy"
    },
    inventory: {
      quantity: 8,
      lowStockThreshold: 2
    },
    featured: true,
    tags: ["wheels", "alloy", "enkei", "performance", "style"]
  }
];

const sampleUsers = [
  {
    name: "Admin User",
    email: "admin@tusharautomobiles.com",
    password: "Admin@123",
    role: "admin",
    phone: "9719167530",
    address: {
      street: "Bulandshahr Stand",
      city: "Siyana",
      state: "Uttar Pradesh",
      zipCode: "203001",
      country: "India"
    }
  },
  {
    name: "Test Customer",
    email: "customer@test.com",
    password: "Customer@123",
    role: "customer",
    phone: "9876543210"
  }
];

async function seedData() {
  try {
    console.log('🌱 Starting data seeding...');
    
    // Connect to database
    await connectDB();
    
    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Product.deleteMany({});
    
    // Create users
    console.log('👥 Creating users...');
    const users = await User.create(sampleUsers);
    console.log(`✅ Created ${users.length} users`);
    
    // Create products
    console.log('📦 Creating products...');
    const products = await Product.create(sampleProducts);
    console.log(`✅ Created ${products.length} products`);
    
    console.log('🎉 Data seeding completed successfully!');
    console.log('\n📋 Sample Accounts:');
    console.log('Admin: admin@tusharautomobiles.com / Admin@123');
    console.log('Customer: customer@test.com / Customer@123');
    
    process.exit(0);
    
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
}

// Run seeding if this file is executed directly
if (require.main === module) {
  seedData();
}

module.exports = seedData;