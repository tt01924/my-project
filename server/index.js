require('dotenv').config();

const express = require('express');
const cors = require('cors');
const app = express();
const port = 4000;

app.use(cors()); // Allows react app to fetch from this backend
app.use(express.json()); //For parsing JSON POST bodies

// Routes
app.use('/education', require('./routes/education'));
app.use('/work', require('./routes/work'));
app.use('/contact', require('./routes/contact'));
app.use('/images', express.static('images'));

  app.get('/', (req, res) => {
    res.send('Welcome to my portfolio API');
  });
  
  app.listen(port, () => {
    console.log(`API running at http://localhost:${port}`);
  });