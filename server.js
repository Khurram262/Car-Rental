const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;
const db = require('./db'); 

const carsRoute = require('./routes/carsRoutes');
const usersRoute = require('./routes/usersRoutes');
const bookingsRoute = require('./routes/bookingsRoutes');
const recommendationsRoute = require('./routes/recommendationsRoutes');
const analyticsRoute = require('./routes/analytics'); 
const adminRouter = require('./routes/admin'); 

require('dotenv').config();

app.use(cors());
app.use(express.json()); 
app.use(express.urlencoded({ extended: true })); 
app.use(express.static("public"));
  

app.get('/Contact', (req, res) => {
    res.send('Welcome to the homepage');
});

app.use('/api/cars', carsRoute);
app.use('/api/users', usersRoute);
app.use('/api/bookings', bookingsRoute);
app.use('/api/recommendations', recommendationsRoute);
app.use('/api/analytics', analyticsRoute);
app.use('/api/admin', adminRouter);



app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
  });

app.post('/api/contact', (req, res) => {
    const { name, email, contactNumber, car, message } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'khurrambsse78@gmail.com', 
            pass: 'fhdd oxzx lhkc rlai'
            
        }
    });

    const mailOptions = {
        from: email,
        to: 'khurramimran908@gmail.com', 
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nContact Number: ${contactNumber}\nCar: ${car}\n\nMessage:\n${message}`
    };


    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).send(error.toString());
        }
        res.status(200).send('Message sent successfully');
    });
});

app.listen(port, () => console.log(`Node.js server started on port ${port}`));
