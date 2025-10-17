const axios = require('axios');

const BASE_URL = 'http://localhost:4000/api/items';

// Test data
const testItem = {
  name: "Premium Engine Oil 5W-30",
  brand: "Mobil 1",
  category: "Oils",
  description: "High-performance synthetic motor oil for modern engines. Provides excellent protection and performance.",
  price: 45.99,
  stock: 25,
  discount: 10,
  images: [
    { url: "https://example.com/oil1.jpg" },
    { url: "https://example.com/oil2.jpg" }
  ]
};

async function testItemsAPI() {
  try {
    console.log('🧪 Testing Items API...\n');

    // Test 1: Create a new item
    console.log('1. Creating new item...');
    const createResponse = await axios.post(BASE_URL, testItem);
    console.log('✅ Item created:', createResponse.data.data.item.name);
    const itemId = createResponse.data.data.item._id;

    // Test 2: Get all items
    console.log('\n2. Getting all items...');
    const getAllResponse = await axios.get(BASE_URL);
    console.log('✅ Total items:', getAllResponse.data.data.items.length);

    // Test 3: Get single item
    console.log('\n3. Getting single item...');
    const getOneResponse = await axios.get(`${BASE_URL}/${itemId}`);
    console.log('✅ Item retrieved:', getOneResponse.data.data.item.name);

    // Test 4: Update item
    console.log('\n4. Updating item...');
    const updateData = { price: 39.99, stock: 30 };
    const updateResponse = await axios.put(`${BASE_URL}/${itemId}`, updateData);
    console.log('✅ Item updated. New price:', updateResponse.data.data.item.price);

    // Test 5: Get items by category
    console.log('\n5. Getting items by category (Oils)...');
    const categoryResponse = await axios.get(`${BASE_URL}/category/Oils`);
    console.log('✅ Items in Oils category:', categoryResponse.data.data.items.length);

    // Test 6: Search items
    console.log('\n6. Searching items...');
    const searchResponse = await axios.get(`${BASE_URL}?search=engine`);
    console.log('✅ Search results:', searchResponse.data.data.items.length);

    // Test 7: Delete item
    console.log('\n7. Deleting item...');
    const deleteResponse = await axios.delete(`${BASE_URL}/${itemId}`);
    console.log('✅ Item deleted:', deleteResponse.data.message);

    console.log('\n🎉 All tests passed!');

  } catch (error) {
    console.error('❌ Test failed:', error.response?.data || error.message);
  }
}

// Run tests
testItemsAPI();