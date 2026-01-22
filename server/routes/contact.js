const express = require('express');
const router = express.Router();
const { Resend } = require('resend');

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Test GET route
router.get('/', (req, res) => {
  res.json({ message: "Contact endpoint is working! Use POST to send messages." });
});

router.post('/', async (req, res) => {
  const { name, email, mobile, subject, message } = req.body;

  // Validate required fields
  if (!name || !email || !subject || !message) {
    return res.status(400).json({ success: false, message: "Missing required fields." });
  }

  // Check if Resend API key is configured
  if (!process.env.RESEND_API_KEY) {
    console.error('Resend API key not configured!');
    return res.status(500).json({ success: false, message: "Server email not configured." });
  }

  try {
    console.log('Attempting to send email via Resend...');
    
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>', // Use Resend's default sender for testing
      to: process.env.EMAIL_USER, // Your email to receive messages
      replyTo: email, // User's email for replies
      subject: `New Contact Form Submission: ${subject}`,
      html: `
        <h3>New Contact Message</h3>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br/>${message}</p>
      `
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ success: false, message: "Failed to send message." });
    }

    console.log('Email sent successfully! ID:', data.id);
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error('Email failed with error:', err.message);
    console.error('Full error:', err);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
});

module.exports = router;
