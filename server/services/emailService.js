const nodemailer = require('nodemailer');

// Helper function to get inquiry type labels
const getInquiryTypeLabel = (type) => {
  const labels = {
    'spare-parts': 'Spare Parts Inquiry',
    'engine-parts': 'Engine Parts & Oil',
    'brake-system': 'Brake System Parts',
    'electrical': 'Lights & Electrical',
    'wheels-tyres': 'Wheels & Tyres',
    'filters': 'Filters & Air Systems',
    'suspension': 'Suspension & Steering',
    'tools-equipment': 'Tools & Equipment',
    'installation': 'Installation Service',
    'warranty': 'Warranty & Returns',
    'bulk-order': 'Bulk Order Inquiry',
    'technical-support': 'Technical Support',
    'general': 'General Inquiry'
  };
  return labels[type] || type;
};

// Create transporter
const createTransporter = () => {
  return nodemailer.createTransporter({
    service: 'gmail', // You can change this to your email provider
    auth: {
      user: process.env.EMAIL_USER, // Your email
      pass: process.env.EMAIL_PASS  // Your app password
    }
  });
};

// Send contact form notification email
const sendContactNotification = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.ADMIN_EMAIL || process.env.EMAIL_USER, // Your email to receive notifications
      subject: `New Contact Form Submission - ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🚗 Tushar Automobiles</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">New Contact Form Submission</p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #dc2626; margin-top: 0;">Contact Details</h2>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin-bottom: 20px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <table style="width: 100%; border-collapse: collapse;">
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151; width: 30%;">Name:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${contactData.name}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Email:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">
                    <a href="mailto:${contactData.email}" style="color: #dc2626; text-decoration: none;">${contactData.email}</a>
                  </td>
                </tr>
                ${contactData.phone ? `
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Phone:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">
                    <a href="tel:${contactData.phone}" style="color: #dc2626; text-decoration: none;">${contactData.phone}</a>
                  </td>
                </tr>
                ` : ''}
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Subject:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">${contactData.subject}</td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; font-weight: bold; color: #374151;">Inquiry Type:</td>
                  <td style="padding: 10px 0; border-bottom: 1px solid #e5e7eb; color: #6b7280;">
                    <span style="background: #fef2f2; color: #dc2626; padding: 4px 8px; border-radius: 4px; font-size: 12px;">
                      ${getInquiryTypeLabel(contactData.inquiryType)}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td style="padding: 10px 0; font-weight: bold; color: #374151; vertical-align: top;">Message:</td>
                  <td style="padding: 10px 0; color: #6b7280; line-height: 1.6;">${contactData.message.replace(/\n/g, '<br>')}</td>
                </tr>
              </table>
            </div>
            
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 15px; margin-top: 20px;">
              <p style="margin: 0; color: #dc2626; font-size: 14px;">
                <strong>📅 Submitted:</strong> ${new Date().toLocaleString('en-IN', { 
                  timeZone: 'Asia/Kolkata',
                  year: 'numeric',
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </p>
            </div>
            
            <div style="text-align: center; margin-top: 30px;">
              <a href="mailto:${contactData.email}" 
                 style="background: #dc2626; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; font-weight: bold; display: inline-block;">
                Reply to Customer
              </a>
            </div>
          </div>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 0 0 10px 10px; text-align: center; color: #6b7280; font-size: 12px;">
            <p style="margin: 0;">This email was sent from your Tushar Automobiles website contact form.</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Contact notification email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending contact notification email:', error);
    throw error;
  }
};

// Send auto-reply to customer
const sendAutoReply = async (contactData) => {
  try {
    const transporter = createTransporter();
    
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: contactData.email,
      subject: `Thank you for contacting Tushar Automobiles - ${contactData.subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 10px;">
          <div style="background: linear-gradient(135deg, #dc2626, #ef4444); color: white; padding: 20px; border-radius: 10px 10px 0 0; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">🚗 Tushar Automobiles</h1>
            <p style="margin: 5px 0 0 0; opacity: 0.9;">Thank you for reaching out!</p>
          </div>
          
          <div style="padding: 30px; background: #f9fafb;">
            <h2 style="color: #dc2626; margin-top: 0;">Dear ${contactData.name},</h2>
            
            <p style="color: #374151; line-height: 1.6; margin-bottom: 20px;">
              Thank you for contacting <strong>Tushar Automobiles</strong>. We have received your inquiry and our team will get back to you within <strong>24 hours</strong>.
            </p>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #dc2626; margin-top: 0;">Your Message Summary:</h3>
              <p style="color: #6b7280; margin: 10px 0;"><strong>Subject:</strong> ${contactData.subject}</p>
              <p style="color: #6b7280; margin: 10px 0;"><strong>Inquiry Type:</strong> ${getInquiryTypeLabel(contactData.inquiryType)}</p>
              <p style="color: #6b7280; margin: 10px 0;"><strong>Submitted:</strong> ${new Date().toLocaleString('en-IN', { 
                timeZone: 'Asia/Kolkata',
                year: 'numeric',
                month: 'long', 
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
              })}</p>
            </div>
            
            <div style="background: #fef2f2; border: 1px solid #fecaca; border-radius: 8px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #dc2626; margin-top: 0;">🚗 Why Choose Tushar Automobiles?</h3>
              <ul style="color: #374151; line-height: 1.6; margin: 0; padding-left: 20px;">
                <li><strong>Genuine Spare Parts:</strong> Original & OEM quality parts for all vehicle brands</li>
                <li><strong>Expert Guidance:</strong> Technical support to find the right parts for your vehicle</li>
                <li><strong>Competitive Pricing:</strong> Best prices on engine oil, brake parts, filters & more</li>
                <li><strong>Quick Delivery:</strong> Fast shipping across Uttar Pradesh & India</li>
                <li><strong>Wide Range:</strong> From Maruti to Hyundai, Tata to Mahindra - we have it all</li>
                <li><strong>Installation Support:</strong> Professional installation services available</li>
              </ul>
            </div>
            
            <div style="background: white; padding: 20px; border-radius: 8px; margin: 20px 0; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              <h3 style="color: #dc2626; margin-top: 0;">📞 Contact Information</h3>
              <p style="color: #374151; margin: 5px 0;">
                <strong>Phone:</strong> <a href="tel:+919719167530" style="color: #dc2626; text-decoration: none;">+91 97191 67530</a>
              </p>
              <p style="color: #374151; margin: 5px 0;">
                <strong>Email:</strong> <a href="mailto:info@tusharautomobiles.com" style="color: #dc2626; text-decoration: none;">info@tusharautomobiles.com</a>
              </p>
              <p style="color: #374151; margin: 5px 0;">
                <strong>Address:</strong> Bulandshahr Stand, Siyana, Uttar Pradesh 203001
              </p>
            </div>
            
            <p style="color: #6b7280; font-size: 14px; margin-top: 30px;">
              If you have any urgent queries, feel free to call us directly at <a href="tel:+919719167530" style="color: #dc2626; text-decoration: none;">+91 97191 67530</a>.
            </p>
          </div>
          
          <div style="background: #f3f4f6; padding: 15px; border-radius: 0 0 10px 10px; text-align: center; color: #6b7280; font-size: 12px;">
            <p style="margin: 0;">This is an automated response. Please do not reply to this email.</p>
          </div>
        </div>
      `
    };

    const result = await transporter.sendMail(mailOptions);
    console.log('Auto-reply email sent:', result.messageId);
    return { success: true, messageId: result.messageId };
    
  } catch (error) {
    console.error('Error sending auto-reply email:', error);
    throw error;
  }
};

module.exports = {
  sendContactNotification,
  sendAutoReply
};