require('dotenv').config();
const mongoose = require('mongoose');

const testConnection = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || process.env.MONGODB_URI;

    if (!mongoUri) {
      console.error('❌ MongoDB URI is not defined in environment variables');
      return;
    }

    console.log('🔌 Testing MongoDB connection...');
    console.log('📍 URI:', mongoUri.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@')); // Hide credentials

    const conn = await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    console.log('✅ MongoDB connection successful!');
    console.log(`🏠 Host: ${conn.connection.host}`);
    console.log(`📊 Database: ${conn.connection.name}`);
    console.log(`🔗 Ready State: ${conn.connection.readyState}`);

    await mongoose.connection.close();
    console.log('🔒 Connection closed');

  } catch (error) {
    console.error('❌ MongoDB connection failed:');
    console.error('📝 Error:', error.message);

    if (error.message.includes('IP')) {
      console.log('\n🔧 IP Whitelist Issue Detected:');
      console.log('1. Go to MongoDB Atlas → Network Access');
      console.log('2. Click "Add IP Address"');
      console.log('3. Add your current IP or 0.0.0.0/0 for all IPs (dev only)');
      console.log('4. Wait 2-3 minutes for changes to take effect');
    }

    if (error.message.includes('authentication')) {
      console.log('\n🔧 Authentication Issue Detected:');
      console.log('1. Check your username and password in the connection string');
      console.log('2. Ensure the database user has proper permissions');
    }
  }
};

testConnection();