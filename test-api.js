const fetch = require('node-fetch');

async function testAPI() {
  try {
    console.log('Testing auto-parts API...');
    
    // Test basic endpoint
    const response = await fetch('http://localhost:4000/api/auto-parts');
    const data = await response.json();
    
    console.log('Response status:', response.status);
    console.log('Response data:', JSON.stringify(data, null, 2));
    
    // Test filter options
    const filterResponse = await fetch('http://localhost:4000/api/auto-parts/filters');
    const filterData = await filterResponse.json();
    
    console.log('\nFilter options response:', JSON.stringify(filterData, null, 2));
    
  } catch (error) {
    console.error('API test failed:', error);
  }
}

testAPI();