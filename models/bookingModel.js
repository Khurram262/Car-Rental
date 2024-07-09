const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    car: { type: mongoose.Schema.Types.ObjectId, ref: 'Car', required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    bookedTimeSlots: {
        from: { type: Date, required: true },
        to: { type: Date, required: true }
    },
    totalDays: { type: Number, required: true }, // Corrected field name
    totalAmount: { type: Number, required: true },
    driverRequired: { type: Boolean, required: true },
    paymentStatus: { type: String, required: true },
    transactionId: { type: String, required: true },
    email: { type: String, required: true }, // Added email field
    phone: { type: String, required: true } // Added phone field
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
