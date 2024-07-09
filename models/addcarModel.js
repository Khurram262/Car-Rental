const mongoose = require('mongoose');

// Define the schema for adding a car
const AddCarSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    tariffPerDay: {
        type: Number,
        required: true
    },
    capacity: {
        type: Number,
        required: true
    },
    fuelType: {
        type: String,
        enum: ['Petrol', 'Diesel', 'Electric'], // Assuming limited fuel types, adjust as needed
        required: true
    },
    addedAt: {
        type: Date,
        default: Date.now
    }
});

// Create the AddCar model
const AddCar = mongoose.model('addCar', AddCarSchema);

module.exports = AddCar;
