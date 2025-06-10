const express = require('express');
const router = express.Router();
const education = require('../data/education');

router.get('/', (req, res) => {
  res.json(education);
});

module.exports = router;
