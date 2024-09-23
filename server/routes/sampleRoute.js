const express = require('express');
const router = express.Router();

// GET request
router.get('/sample', (req, res) => {
    res.json({ message: 'Sample GET request' });
});

// POST request
router.post('/sample', (req, res) => {
    const data = req.body;
    res.json({ message: 'Sample POST request', data });
});

module.exports = router;
