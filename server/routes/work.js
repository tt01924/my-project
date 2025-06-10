const express = require('express');
const router = express.Router();
const workProjects = require('../data/work')

router.get('/', (req, res) => {
  res.json(workProjects);
});

module.exports = router;
