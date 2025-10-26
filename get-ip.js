const https = require('https');

const getPublicIP = () => {
  return new Promise((resolve, reject) => {
    https.get('https://api.ipify.org?format=json', (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const result = JSON.parse(data);
          resolve(result.ip);
        } catch (error) {
          reject(error);
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
};

const main = async () => {
  try {
    console.log('🔍 Getting your public IP address...');
    const ip = await getPublicIP();
    console.log(`📍 Your current public IP: ${ip}`);
    console.log('\n🔧 To fix MongoDB Atlas connection:');
    console.log('1. Go to https://cloud.mongodb.com/');
    console.log('2. Select your project and cluster');
    console.log('3. Go to "Network Access" in the left sidebar');
    console.log('4. Click "Add IP Address"');
    console.log(`5. Add this IP: ${ip}`);
    console.log('6. Or add 0.0.0.0/0 to allow all IPs (development only)');
    console.log('7. Wait 2-3 minutes for changes to take effect');
    console.log('8. Restart your server');
  } catch (error) {
    console.error('❌ Failed to get IP address:', error.message);
    console.log('\n🔧 Alternative: Add 0.0.0.0/0 to MongoDB Atlas Network Access');
    console.log('This allows all IPs (use only for development)');
  }
};

main();