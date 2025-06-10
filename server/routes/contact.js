const express = require('express');
const router = express.Router();

router.post('/', (req, res) => {
  const { name, email, reason, message } = req.body;
  console.log('Contact form submitted:', { name, email, reason, message });

  // TODO: send email or store in DB
  res.json({ success: true, message: "Message received!" });
});

module.exports = router;
