const express = require("express");
const router = express.Router();
const Car = require("../models/carModel");

// Route to get all cars
router.get("/getallcars", async (req, res) => {
    try {
        const cars = await Car.find();
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to add a new car
router.post("/addcar", async (req, res) => {
    try {
        const newCar = new Car(req.body);
        await newCar.save();
        res.json({ message: 'Car added successfully' });
    } catch (error) {
        console.error('Error adding car:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to edit an existing car
router.post("/editcar", async (req, res) => {
    try {
        const car = await Car.findById(req.body._id);
        if (!car) {
            return res.status(404).json({ error: 'Car not found' });
        }

        car.name = req.body.name;
        car.image = req.body.image;
        car.fuelType = req.body.fuelType;
        car.rentPerDay = req.body.rentPerDay;
        car.capacity = req.body.capacity;

        await car.save();
        res.json({ message: 'Car updated successfully' });
    } catch (error) {
        console.error('Error updating car:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Route to delete a car
router.post("/deletecar", async (req, res) => {
    try {
        await Car.findByIdAndDelete(req.body.carid);
        res.json({ message: 'Car deleted successfully' });
    } catch (error) {
        console.error('Error deleting car:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
