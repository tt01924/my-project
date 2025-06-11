const express = require('express');
const router = express.Router();
const aboutMe = require('../data/aboutMe');

router.get('/', (req, res) => {
    res.json(aboutMe);
});

module.exports = router