// Test script for contact API
const testContactAPI = async () => {
  const testData = {
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    phone: "9876543210",
    subject: "Brake pads for Maruti Swift 2018",
    message: "I need brake pads for my 2018 Maruti Swift VDI. The current pads are worn out and making noise. Please let me know the price and availability of genuine brake pads. Also, do you provide installation service?",
    inquiryType: "brake-system"
  };

  try {
    console.log('🧪 Testing Contact API...');
    console.log('📤 Sending test data:', testData);

    const response = await fetch('http://localhost:4000/api/contact/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(testData)
    });

    const result = await response.json();

    console.log('📥 Response status:', response.status);
    console.log('📥 Response data:', result);

    if (result.success) {
      console.log('✅ Contact API test successful!');
      console.log('📧 Email notifications should be sent if configured');
    } else {
      console.log('❌ Contact API test failed:', result.message);
    }

  } catch (error) {
    console.error('❌ Error testing contact API:', error.message);
    console.log('💡 Make sure the server is running on http://localhost:4000');
  }
};

// Run the test
testContactAPI();