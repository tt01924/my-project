const express = require('express');
const router = express.Router();
const nodemailer = require('nodemailer');

// Email transporter setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

router.post('/', async (req, res) => {
  const { name, email, mobile, subject, message } = req.body;

  const mailOptions = {
    from: process.env.EMAIL_USER, // Use your verified Gmail address as sender
    to: process.env.EMAIL_USER, // My inbox
    replyTo: email, // User's email for replies
    subject: `New Contact Form Submission: ${subject}`,
    html: `
      <h3>New Contact Message</h3>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Mobile:</strong> ${mobile}</p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong><br/>${message}</p>
    `
  };

  try {
    console.log('Attempting to send email with config:', {
      user: process.env.EMAIL_USER,
      hasPassword: !!process.env.EMAIL_PASS
    });
    await transporter.sendMail(mailOptions);
    console.log('Email sent successfully!');
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (err) {
    console.error('Email failed with error:', err.message);
    console.error('Full error:', err);
    res.status(500).json({ success: false, message: "Failed to send message." });
  }
});

module.exports = router;
