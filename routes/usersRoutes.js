const express = require("express");
const router = express.Router();
const User = require("../models/userModel");
const bcrypt = require('bcrypt');

// Route for user login
router.post("/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        // Find user by email
        const user = await User.findOne({ email });

        if (user) {
            // Compare hashed passwords
            const match = await bcrypt.compare(password, user.password);

            if (match) {
                res.status(200).json(user); // Return user object if passwords match
            } else {
                res.status(400).json({ error: "Invalid credentials" }); // Return error if passwords don't match
            }
        } else {
            res.status(400).json({ error: "Invalid credentials" }); // Return error if user not found
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: "Internal Server Error" }); // Return server error if something goes wrong
    }
});

// Route for user registration
router.post("/register", async (req, res) => {
    const { username, password, email } = req.body;

    try {
        // Check if the email is already registered
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already registered" });
        }

        // Hash the password before saving it to the database
        const hashedPassword = await bcrypt.hash(password, 10); // Hash password with salt rounds

        // Create a new user instance with email, username, and hashed password
        const newUser = new User({ username, password: hashedPassword, email });

        // Save the new user to the database
        await newUser.save();

        // Respond with success message
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

module.exports = router;
