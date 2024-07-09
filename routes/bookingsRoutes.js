const express = require("express");
const router = express.Router();
const Booking = require("../models/bookingModel");
const Car = require("../models/carModel");
const User = require("../models/userModel");  // Import User model

const stripe = require('stripe')('sk_test_51PVEU22LuxYJD2LG19D5Ex1DylmLfkxfiHs6iuijXDdfUtND2AbBLSvTFnsQdHWx9BO8ILPESPdSsFtZj2Lx0zMl00bKK4B4rw');
require('dotenv').config();

// Route to create payment intent
router.post('/create-payment-intent', async (req, res) => {
    try {
        const { amount } = req.body;
        const roundedAmount = Math.round(amount);

        const paymentIntent = await stripe.paymentIntents.create({
            amount: roundedAmount,
            currency: 'usd',
        });

        res.status(200).send({
            clientSecret: paymentIntent.client_secret
        });
    } catch (error) {
        console.error('Error creating payment intent:', error);
        res.status(500).send({ error: 'Error creating payment intent' });
    }
});

router.post('/bookcar', async (req, res) => {
    try {
        const {
            carId,
            userId,
            startDate,
            endDate,
            driver,
            paymentMethodId,
            email,
            phone,
            address,
            city,
            country
        } = req.body;

        // Validate input data
        if (!carId || !userId || !startDate || !endDate || !paymentMethodId || !email || !phone) {
            return res.status(400).send({ error: 'Invalid input data' });
        }

        // Fetch car details
        const car = await Car.findById(carId);
        if (!car) {
            return res.status(404).send({ error: 'Car not found' });
        }

        // Calculate total days and amount
        const totalDays = calculateTotalDays(startDate, endDate);
        const totalAmount = calculateTotalAmount(totalDays, car.rentPerDay);
        const roundedTotalAmount = Math.round(totalAmount * 100);

        // Create payment intent with Stripe
        const paymentIntent = await stripe.paymentIntents.create({
            amount: roundedTotalAmount,
            currency: 'usd',
        });

        // Save booking details to database
        const newBooking = new Booking({
            car: carId,
            user: userId,
            bookedTimeSlots: { from: startDate, to: endDate },
            totalDays: totalDays,
            totalAmount: totalAmount,
            driverRequired: driver,
            paymentStatus: paymentIntent.status,
            transactionId: paymentIntent.id,
            email: email,
            phone: phone,
            address: address,
            city: city,
            country: country
        });

        await newBooking.save();

        // Update the car's booked time slots
        car.bookedTimeSlots.push({ from: startDate, to: endDate });
        await car.save();

        // Respond with success
        res.status(201).send({ success: true, booking: newBooking });
    } catch (error) {
        console.error('Error booking a car:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});


// Function to calculate total days between two dates
function calculateTotalDays(startDate, endDate) {
    const start = new Date(startDate);
    const end = new Date(endDate);
    const diffTime = Math.abs(end - start);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
}

// Function to calculate total amount based on days and price per day
function calculateTotalAmount(totalDays, pricePerDay) {
    return totalDays * pricePerDay;
}
router.get('/getallbookings', async (req, res) => {
    try {
        const bookings = await Booking.find()
            .populate('car')
            .populate('user', 'email phone'); // Ensure this line includes 'email' and 'phone'
        res.send(bookings);
    } catch (error) {
        console.error('Error fetching bookings:', error);
        res.status(500).send({ error: 'Internal Server Error' });
    }
});



// DELETE endpoint to remove bookings for a car
router.delete('/remove/booking/:carId', async (req, res) => {
    const carId = req.params.carId;

    try {
        // Remove bookings for the car
        const result = await Booking.deleteMany({ car: carId });

        if (result.deletedCount > 0) {
            res.status(200).json({ message: 'Bookings removed successfully' });
        } else {
            res.status(404).json({ error: 'No bookings found for the car' });
        }
    } catch (error) {
        console.error('Error removing bookings:', error);
        res.status(500).json({ error: 'Failed to remove bookings' });
    }
});
router.delete('/remove/timeslots/:carId', async (req, res) => {
    const carId = req.params.carId;

    try {
        const car = await Car.findById(carId);
        if (car) {
            car.bookedTimeSlots = []; // Clear booked time slots array
            await car.save();
            res.status(200).json({ message: 'Booked time slots removed successfully' });
        } else {
            res.status(404).json({ error: 'Car not found' });
        }
    } catch (error) {
        console.error('Error removing booked time slots:', error);
        res.status(500).json({ error: 'Failed to remove booked time slots' });
    }
});

// Function to check if a time slot is associated with a specific car's booking
function slotIsAssociatedWithBooking(slot, carId) {
    if (!slot || !slot.car) {
        return false; // Handle null or undefined slot or slot.car
    }
    return slot.car.toString() === carId.toString();
}

module.exports = router;