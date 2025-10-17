require('dotenv').config();
const mongoose = require('mongoose');
const { seedAutoPartsData } = require('./services/autoPartsSeeder');

const testSeeder = async () => {
  try {
    console.log('🧪 Testing Auto Parts Seeder...');
    
    // Connect to MongoDB
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;
    await mongoose.connect(mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    
    console.log('✅ Connected to MongoDB');
    
    // Run seeder
    // await seedAutoPartsData();
    
    console.log('🎉 Seeder test completed successfully!');
    
  } catch (error) {
    console.error('❌ Seeder test failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('🔒 Database connection closed');
    process.exit(0);
  }
};

testSeeder();