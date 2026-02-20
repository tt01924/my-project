require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 4000;

// Configure CORS to allow requests from your frontend domains
app.use(cors({
  origin: [
    'http://localhost:3000',
    'https://toddtaylor.solutions',
    'https://www.toddtaylor.solutions'
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
  
  app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
  });