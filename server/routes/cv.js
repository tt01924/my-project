const express = require('express');
const router = express.Router();
const cv = require('../data/cv');

router.get('/', (req, res) => {
    res.json(cv);
});

module.exports = router;
