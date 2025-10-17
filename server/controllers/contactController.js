const Contact = require('../models/contactModel');
const { sendContactNotification, sendAutoReply } = require('../services/emailService');

// Submit contact form
const submitContact = async (req, res) => {
  try {
    const { name, email, phone, subject, message, inquiryType } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please fill in all required fields (name, email, subject, message)'
      });
    }

    // Create contact entry
    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone ? phone.trim() : undefined,
      subject: subject.trim(),
      message: message.trim(),
      inquiryType: inquiryType || 'general'
    };

    // Save to database
    const contact = new Contact(contactData);
    await contact.save();

    // Send notification email to admin (you)
    try {
      await sendContactNotification(contactData);
      console.log('✅ Admin notification email sent successfully');
    } catch (emailError) {
      console.error('❌ Failed to send admin notification email:', emailError.message);
      // Don't fail the request if email fails, just log it
    }

    // Send auto-reply to customer
    try {
      await sendAutoReply(contactData);
      console.log('✅ Auto-reply email sent successfully');
    } catch (emailError) {
      console.error('❌ Failed to send auto-reply email:', emailError.message);
      // Don't fail the request if email fails, just log it
    }

    res.status(201).json({
      success: true,
      message: 'Thank you for your message! We will get back to you within 24 hours.',
      data: {
        id: contact._id,
        name: contact.name,
        email: contact.email,
        subject: contact.subject,
        inquiryType: contact.inquiryType,
        submittedAt: contact.createdAt
      }
    });

  } catch (error) {
    console.error('Contact submission error:', error);
    
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors
      });
    }

    res.status(500).json({
      success: false,
      message: 'Something went wrong. Please try again later.'
    });
  }
};

// Get all contacts (Admin only)
const getAllContacts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const status = req.query.status;
    const inquiryType = req.query.inquiryType;
    const skip = (page - 1) * limit;

    // Build filter
    const filter = {};
    if (status) filter.status = status;
    if (inquiryType) filter.inquiryType = inquiryType;

    // Get contacts with pagination
    const contacts = await Contact.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .populate('respondedBy', 'name email');

    const total = await Contact.countDocuments(filter);

    res.json({
      success: true,
      data: contacts,
      pagination: {
        current: page,
        pages: Math.ceil(total / limit),
        total,
        hasNext: page < Math.ceil(total / limit),
        hasPrev: page > 1
      }
    });

  } catch (error) {
    console.error('Get contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contacts'
    });
  }
};

// Get contact by ID (Admin only)
const getContactById = async (req, res) => {
  try {
    const contact = await Contact.findById(req.params.id)
      .populate('respondedBy', 'name email');

    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    res.json({
      success: true,
      data: contact
    });

  } catch (error) {
    console.error('Get contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch contact'
    });
  }
};

// Update contact status (Admin only)
const updateContactStatus = async (req, res) => {
  try {
    const { status, adminNotes } = req.body;
    const contactId = req.params.id;

    const contact = await Contact.findById(contactId);
    if (!contact) {
      return res.status(404).json({
        success: false,
        message: 'Contact not found'
      });
    }

    // Update contact
    contact.status = status || contact.status;
    if (adminNotes) contact.adminNotes = adminNotes;
    
    if (status === 'resolved' && !contact.respondedAt) {
      contact.respondedAt = new Date();
      contact.respondedBy = req.user?.id; // Assuming auth middleware sets req.user
    }

    await contact.save();

    res.json({
      success: true,
      message: 'Contact status updated successfully',
      data: contact
    });

  } catch (error) {
    console.error('Update contact error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update contact'
    });
  }
};

// Get contact statistics (Admin only)
const getContactStats = async (req, res) => {
  try {
    const stats = await Contact.getStats();
    
    const totalContacts = await Contact.countDocuments();
    const todayContacts = await Contact.countDocuments({
      createdAt: {
        $gte: new Date(new Date().setHours(0, 0, 0, 0))
      }
    });

    const recentContacts = await Contact.find()
      .sort({ createdAt: -1 })
      .limit(5)
      .select('name email subject inquiryType status createdAt');

    res.json({
      success: true,
      data: {
        total: totalContacts,
        today: todayContacts,
        byStatus: stats,
        recent: recentContacts
      }
    });

  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch statistics'
    });
  }
};

module.exports = {
  submitContact,
  getAllContacts,
  getContactById,
  updateContactStatus,
  getContactStats
};