require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const { seedAutoPartsData } = require('./services/autoPartsSeeder');

// Import routes
const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');
const itemRoutes = require('./routes/items');
const autoPartsRoutes = require('./routes/autoParts');

const app = express();
const PORT = process.env.PORT || 4000;

// Connect to MongoDB and seed data
const initializeDatabase = async () => {
  try {
    await connectDB();
    console.log('🔄 Initializing auto parts database...');
    await seedAutoPartsData();
  } catch (error) {
    console.error('❌ Database initialization failed:', error.message);
  }
};

initializeDatabase();

// Enhanced CORS configuration
app.use(cors({
  origin: [
    'http://localhost:3000',
    'http://localhost:3001',
    'http://127.0.0.1:3000',
    'http://127.0.0.1:3001',
    process.env.FRONTEND_URL || 'http://localhost:3000'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
  optionsSuccessStatus: 200
}));

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Handle preflight requests
app.options('*', (req, res) => {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'];
  const origin = allowedOrigins.includes(req.headers.origin) ? req.headers.origin : 'http://localhost:3001';
  
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, X-Requested-With');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.sendStatus(200);
});

// Additional CORS headers middleware with debugging
app.use((req, res, next) => {
  const allowedOrigins = ['http://localhost:3000', 'http://localhost:3001', 'http://127.0.0.1:3000', 'http://127.0.0.1:3001'];
  const origin = allowedOrigins.includes(req.headers.origin) ? req.headers.origin : 'http://localhost:3001';
  
  console.log(`CORS Debug - Origin: ${origin}, Method: ${req.method}, Path: ${req.path}`);
  
  res.header('Access-Control-Allow-Origin', origin);
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  // Handle preflight requests here as well
  if (req.method === 'OPTIONS') {
    console.log('Handling OPTIONS preflight request');
    return res.sendStatus(200);
  }
  
  next();
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/auto-parts', autoPartsRoutes);

// Contact routes
const contactRoutes = require('./routes/contact');
app.use('/api/contact', contactRoutes);

// Health check endpoint
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Tushar Automobiles API is running',
    version: '1.0.0',
    timestamp: new Date().toISOString()
  });
});

// API info endpoint
app.get('/api', (req, res) => {
  res.json({
    success: true,
    message: 'Tushar Automobiles API',
    version: '1.0.0',
    endpoints: {
      auth: '/api/auth',
      products: '/api/products',
      items: '/api/items',
      autoParts: '/api/auto-parts',
      contact: '/api/contact'
    },
    documentation: 'https://your-api-docs-url.com'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Global error handler
app.use((error, req, res, next) => {
  console.error('Global error handler:', error);

  res.status(error.status || 500).json({
    success: false,
    message: error.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack })
  });
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received. Shutting down gracefully...');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('SIGINT received. Shutting down gracefully...');
  process.exit(0);
});

app.listen(PORT, () => {
  
  console.log(`🌐 Server running on: http://localhost:${PORT}`);
  console.log(`📚 API Documentation: http://localhost:${PORT}/api`);

 
});
