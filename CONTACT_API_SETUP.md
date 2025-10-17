# Contact API Setup Guide

## 📧 Email Configuration

To enable email notifications when someone submits a contact form, you need to configure your email settings.

### 1. Gmail Setup (Recommended)

1. **Enable 2-Factor Authentication** on your Gmail account
2. **Generate App Password**:
   - Go to Google Account settings
   - Security → 2-Step Verification → App passwords
   - Generate a new app password for "Mail"
   - Copy the 16-character password

3. **Update Environment Variables** in `server/.env`:
```env
# Replace with your actual email credentials
EMAIL_USER=your-email@gmail.com
EMAIL_PASS=your-16-character-app-password
ADMIN_EMAIL=your-email@gmail.com
```

### 2. Other Email Providers

For other email providers, update the transporter configuration in `server/services/emailService.js`:

```javascript
// For Outlook/Hotmail
service: 'hotmail'

// For Yahoo
service: 'yahoo'

// For custom SMTP
host: 'your-smtp-server.com',
port: 587,
secure: false, // true for 465, false for other ports
```

## 🚀 API Endpoints

### Submit Contact Form
```
POST /api/contact/submit
```

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "9876543210", // Optional
  "subject": "Inquiry about brake pads",
  "message": "I need brake pads for my Maruti Swift 2018 model.",
  "inquiryType": "product" // Optional: general, product, service, complaint, suggestion
}
```

**Response:**
```json
{
  "success": true,
  "message": "Thank you for your message! We will get back to you within 24 hours.",
  "data": {
    "id": "contact_id",
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Inquiry about brake pads",
    "inquiryType": "product",
    "submittedAt": "2024-01-15T10:30:00.000Z"
  }
}
```

### Admin Endpoints (Require Authentication)

#### Get All Contacts
```
GET /api/contact?page=1&limit=10&status=new&inquiryType=product
```

#### Get Contact by ID
```
GET /api/contact/:id
```

#### Update Contact Status
```
PUT /api/contact/:id/status
```
```json
{
  "status": "resolved",
  "adminNotes": "Issue resolved via phone call"
}
```

#### Get Contact Statistics
```
GET /api/contact/stats
```

## 📧 Email Features

### 1. Admin Notification Email
When a contact form is submitted, you'll receive a detailed email with:
- Customer contact information
- Message details
- Inquiry type and timestamp
- Direct reply button

### 2. Customer Auto-Reply
Customers automatically receive a confirmation email with:
- Thank you message
- Submission summary
- Your contact information
- Business highlights

## 🔧 Testing the API

### Using curl:
```bash
curl -X POST http://localhost:4000/api/contact/submit \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Customer",
    "email": "test@example.com",
    "subject": "Test inquiry",
    "message": "This is a test message from the contact form.",
    "inquiryType": "general"
  }'
```

### Using JavaScript (Frontend):
```javascript
const submitContact = async (formData) => {
  try {
    const response = await fetch('http://localhost:4000/api/contact/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData)
    });
    
    const result = await response.json();
    
    if (result.success) {
      alert('Message sent successfully!');
    } else {
      alert('Error: ' + result.message);
    }
  } catch (error) {
    console.error('Error:', error);
    alert('Failed to send message');
  }
};
```

## 🛡️ Security Features

- **Input Validation**: All fields are validated for proper format and length
- **Rate Limiting**: Prevents spam submissions
- **Email Sanitization**: Prevents email injection attacks
- **CORS Protection**: Only allows requests from your frontend domain

## 📊 Database Schema

The contact form data is stored in MongoDB with the following structure:

```javascript
{
  name: String (required, max 100 chars),
  email: String (required, valid email),
  phone: String (optional, 10 digits),
  subject: String (required, max 200 chars),
  message: String (required, max 1000 chars),
  inquiryType: String (enum: general, product, service, complaint, suggestion),
  status: String (enum: new, in-progress, resolved, closed),
  priority: String (enum: low, medium, high, urgent),
  adminNotes: String (optional),
  respondedAt: Date,
  respondedBy: ObjectId (User reference),
  createdAt: Date,
  updatedAt: Date
}
```

## 🚨 Troubleshooting

### Email Not Sending
1. Check your email credentials in `.env`
2. Ensure 2FA is enabled and app password is correct
3. Check server logs for email errors
4. Verify Gmail "Less secure app access" is disabled (use app password instead)

### CORS Issues
1. Make sure `FRONTEND_URL` in `.env` matches your frontend URL
2. Check that the frontend is making requests to the correct API URL

### Validation Errors
1. Ensure all required fields are provided
2. Check field length limits
3. Verify email format is valid
4. Phone number should be exactly 10 digits

## 📞 Contact Information Template

Update the email templates in `server/services/emailService.js` with your actual business information:

- **Phone**: +91 97191 67530
- **Email**: info@tusharautomobiles.com
- **Address**: Bulandshahr Stand, Siyana, Uttar Pradesh 203001

## 🎯 Next Steps

1. Configure your email credentials
2. Test the API endpoint
3. Integrate with your frontend contact form
4. Set up admin dashboard to manage contacts
5. Configure email templates with your branding

The API is now ready to handle contact form submissions and send you email notifications!