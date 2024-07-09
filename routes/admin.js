const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Admin = require('../models/AdminModel'); // Ensure correct path to Admin model
require('dotenv').config();

// Use a secure environment variable for the JWT secret key
const jwtSecret = 'e3b3729e788f5122c5ac3b5046064dd33f0f85ec8615884a43e2e699739796af';

router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    console.log('Login attempt with:', username, password);

    try {
        // Validate required fields
        if (!username || !password) {
            return res.status(400).json({ message: 'Missing required fields' });
        }

        // Find the admin user in the database
        const admin = await Admin.findOne({ username });

        if (!admin) {
            console.log('Admin not found');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Check if password matches (using bcrypt)
        const passwordMatch = await bcrypt.compare(password, admin.password);
        if (!passwordMatch) {
            console.log('Password does not match');
            return res.status(401).json({ message: 'Invalid credentials' });
        }

        // Generate JWT token with a secure secret key and reasonable expiration time
        const token = jwt.sign(
            { username: admin.username, _id: admin._id },
            jwtSecret,
            { expiresIn: '30m' }
        );

        // Send successful login response with the token
        res.json({ token });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
});



// // Function to hash password before updating in MongoDB
// async function hashPassword(password) {
//     const saltRounds = 10;
//     const hashedPassword = await bcrypt.hash(password, saltRounds);
//     return hashedPassword;
// }

// // Example usage to update password for admin 'admin'
// async function updateAdminPassword() {
//     try {
//         const newPassword = 'password123'; // New password to update
//         const hashedPassword = await hashPassword(newPassword);

//         // Update the password in MongoDB
//         const admin = await Admin.findOneAndUpdate(
//             { username: 'admin' },
//             { $set: { password: hashedPassword } },
//             { new: true } // Return updated document
//         );

//         console.log('Admin password updated successfully:', admin);
//     } catch (error) {
//         console.error('Error updating admin password:', error);
//     }
// }

// // Call the function to update the password
// updateAdminPassword();

module.exports = router;