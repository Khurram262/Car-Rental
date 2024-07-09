
const Contact = require('../models/ContactModel');
const nodemailer = require('nodemailer');

// Email transporter setup for nodemailer using an app-specific password
const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: process.env.khurrambsse78,
        pass: process.env.wecywkggifwelmej

    }
});
exports.createContact = async (req, res) => {
  try {
    const { name, email, contactNumber, car, message } = req.body;
    const contact = new Contact({ name, email, contactNumber, car, message });
    await contact.save();

    const mailOptions = {
        from: email,
        to: process.env.EMAIL_USER,
        subject: `Contact Form Submission`,
        text: `Name: ${name}\nEmail: ${email}\nContact Number: ${contactNumber}\nCar: ${car}\n\nMessage:\n${message}`
    };

    await transporter.sendMail(mailOptions);
    res.status(200).json({ message: 'Message sent successfully!' });
  } catch (error) {
    console.error('Error in createContact:', error); // Log error for debugging
    res.status(500).json({ error: 'Failed to send message. Please try again later.' });
  }
};