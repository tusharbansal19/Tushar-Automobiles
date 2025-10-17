// Simple CORS test script
const testCORS = async () => {
  try {
    console.log('🧪 Testing CORS configuration...\n');
    
    // Test 1: Server health check
    console.log('1. Testing server health...');
    const healthResponse = await fetch('http://localhost:4000/');
    const healthData = await healthResponse.json();
    console.log('✅ Server health:', healthData.message);
    
    // Test 2: CORS preflight for login endpoint
    console.log('\n2. Testing CORS preflight...');
    const preflightResponse = await fetch('http://localhost:4000/api/auth/login', {
      method: 'OPTIONS',
      headers: {
        'Origin': 'http://localhost:3000',
        'Access-Control-Request-Method': 'POST',
        'Access-Control-Request-Headers': 'Content-Type'
      }
    });
    
    console.log('✅ Preflight status:', preflightResponse.status);
    console.log('✅ CORS headers received:');
    const corsHeaders = {};
    preflightResponse.headers.forEach((value, key) => {
      if (key.toLowerCase().includes('access-control')) {
        corsHeaders[key] = value;
      }
    });
    console.log(corsHeaders);
    
    // Test 3: Actual login request
    console.log('\n3. Testing actual login request...');
    const loginResponse = await fetch('http://localhost:4000/api/auth/login', {
      method: 'POST',
      mode: 'cors',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'http://localhost:3000'
      },
      body: JSON.stringify({
        email: 'customer@test.com',
        password: 'Customer@123'
      })
    });
    
    const loginData = await loginResponse.json();
    console.log('✅ Login response status:', loginResponse.status);
    console.log('✅ Login response:', loginData.success ? 'SUCCESS' : 'FAILED');
    console.log('✅ Message:', loginData.message);
    
    if (loginResponse.status === 200 && loginData.success) {
      console.log('\n🎉 CORS is working correctly!');
      console.log('✅ Frontend should be able to authenticate successfully.');
    } else {
      console.log('\n❌ There might be an issue with authentication.');
      console.log('💡 Check if the test user exists in the database.');
    }
    
  } catch (error) {
    console.error('\n❌ CORS test failed:', error.message);
    console.log('\n🔍 Troubleshooting steps:');
    console.log('1. Make sure the server is running on port 4000');
    console.log('2. Check if MongoDB is connected');
    console.log('3. Verify the test user exists in the database');
    console.log('4. Run: npm run server:dev');
  }
};

// Check if we're in Node.js environment
if (typeof window === 'undefined') {
  // Node.js - need to import fetch
  const { fetch } = require('undici');
  global.fetch = fetch;
}

testCORS();