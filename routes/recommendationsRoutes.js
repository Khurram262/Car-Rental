// src/routes/recommendationsRoutes.js

const express = require('express');
const router = express.Router();
const Car = require('../models/carModel');

// Route to get car recommendations
router.get('/', async (req, res) => {
  try {
    // Fetch recommendations from the database
    const recommendations = await Car.find().sort({ rating: -1 }).limit(5);
    res.json(recommendations);
  } catch (error) {
    console.error('Error fetching recommendations:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
