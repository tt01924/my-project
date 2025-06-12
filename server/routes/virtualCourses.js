const express = require('express');
const router = express.Router();
const virtualCourses = require('../data/virtualCourses');

router.get('/', (req, res) => {
    res.json(virtualCourses);
});

module.exports = router;
