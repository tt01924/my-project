require('dotenv').config();

const express = require('express');
const cors = require('cors');
const { Resend } = require('resend');
const app = express();
const port = process.env.PORT || 4000;

// Initialize Resend with API key
const resend = new Resend(process.env.RESEND_API_KEY);

// Configure CORS to allow requests from your frontend domains
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://toddtaylor.solutions',
    'https://www.toddtaylor.solutions',
    'https://wessvex.solutions',
    'https://www.wessvex.solutions'
  ],
  methods: ['GET', 'POST'],
  credentials: true
})); // Allows react app to fetch from this backend
app.use(express.json()); //For parsing JSON POST bodies

// Routes
app.use('/images', express.static('images'));

app.get('/', (req, res) => {
  res.send('Welcome to my portfolio API');
});

// Contact form endpoint
app.post('/contact', async (req, res) => {
  try {
    const { name, email, mobile, subject, message } = req.body;

    // Validate required fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ 
        success: false, 
        error: 'Missing required fields' 
      });
    }

    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: 'Contact Form <onboarding@resend.dev>',
      to: [process.env.EMAIL_USER],
      subject: `Contact Form: ${subject}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile || 'Not provided'}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
      replyTo: email
    });

    if (error) {
      console.error('Resend error:', error);
      return res.status(500).json({ success: false, error: error.message });
    }

    console.log('Email sent successfully:', data);
    res.json({ success: true, message: 'Email sent successfully' });

  } catch (err) {
    console.error('Contact form error:', err);
    res.status(500).json({ success: false, error: 'Failed to send email' });
  }
});

app.listen(port, () => {
  console.log(`API running at http://localhost:${port}`);
});