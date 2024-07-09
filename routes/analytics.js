const express = require('express');
const router = express.Router();
const Car = require("../models/carModel");
const Booking = require("../models/bookingModel");
const User = require("../models/userModel");  

router.get('/', async (req, res) => {
  try {
    const totalRevenue = await Booking.aggregate([
      { $group: { _id: null, total: { $sum: '$totalAmount' } } }
    ]);
    const totalBookings = await Booking.countDocuments();
    const totalUsers = await User.countDocuments();
    const carsAvailable = await Car.countDocuments({ status: 'available' });

    res.json({
      totalRevenue: totalRevenue[0]?.total || 0,
      totalBookings,
      totalUsers,
      carsAvailable,
    });
  } catch (error) {
    console.error('Error fetching analytics data:', error);
    res.status(500).json({ message: 'Error fetching analytics data' });
  }
});

module.exports = router;
