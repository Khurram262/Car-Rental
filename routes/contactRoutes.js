const express = require('express');
const router = express.Router();
const contactactions = require('../actions/contactActions');

// POST route to handle contact form submission
router.post('/contact', contactactions.createContact);

module.exports = router;
