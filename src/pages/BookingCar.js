import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Col, Divider, Row, DatePicker, Checkbox, Button, Modal, message, Form, Input, Select } from 'antd';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import DefaultLayout from '../components/DefaultLayout';
import Spinner from '../components/Spinner';
import { getAllCars } from '../redux/actions/carsActions';
import axios from 'axios';
import moment from 'moment';
import './BookingCar.css';

const { RangePicker } = DatePicker;
const stripePromise = loadStripe('pk_test_51PVEU22LuxYJD2LGxorHTvfPurndeGDupVJv31cuoSth4p2H7NlOVR6dUZsiWIp2Ky5JgXEffW0aOyytgIkAe3lP00Qq03ftAY');

const BookingCar = () => {
    const { carid } = useParams();
    const { cars } = useSelector(state => state.carsReducer);
    const { loading } = useSelector(state => state.alertsReducer);
    const [car, setCar] = useState(null);
    const dispatch = useDispatch();
    const [from, setFrom] = useState(null);
    const [to, setTo] = useState(null);
    const [totalDays, setTotalDays] = useState(0);
    const [driverRequired, setDriverRequired] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);
    const [paymentModalOpen, setPaymentModalOpen] = useState(false);
    const [bookedSlotsModalOpen, setBookedSlotsModalOpen] = useState(false);
    const [bookedTimeSlots, setBookedTimeSlots] = useState([]);

    useEffect(() => {
        if (cars.length === 0) {
            dispatch(getAllCars());
        } else {
            const selectedCar = cars.find(o => o._id === carid);
            setCar(selectedCar);
            setBookedTimeSlots(selectedCar?.bookedTimeSlots || []);
        }
    }, [cars, carid, dispatch]);

    useEffect(() => {
        if (car && totalDays > 0) {
            let amount = totalDays * car.rentPerDay;
            if (driverRequired) {
                amount += 30 * totalDays; // Assuming driver fee of 30 per day
            }
            setTotalAmount(amount);
        }
    }, [driverRequired, totalDays, car]);

    const selectedTimeSlots = (values) => {
        const [start, end] = values;
        setFrom(start);
        setTo(end);
        setTotalDays(end.diff(start, 'days') + 1);
    };

    const handleDriverRequiredChange = (e) => {
        setDriverRequired(e.target.checked);
    };

    const handleShowBookedSlots = () => {
        setBookedSlotsModalOpen(true);
    };
    
    
    const handleBooking = async () => {
        if (!from || !to) {
            return message.error('Please select booking dates');
        }
    
        // Convert to UTC to ensure consistent time zone handling
        const fromUTC = moment.utc(from);
        const toUTC = moment.utc(to);
    
        // Check for conflicts with booked time slots
        const hasConflict = bookedTimeSlots.some(slot => {
            const bookedFromUTC = moment.utc(slot.from);
            const bookedToUTC = moment.utc(slot.to);
    
            // Check if there's any overlap
            return (
                (fromUTC.isBetween(bookedFromUTC, bookedToUTC, null, '[)') ||
                toUTC.isBetween(bookedFromUTC, bookedToUTC, null, '(]')) ||
                (fromUTC.isSameOrBefore(bookedFromUTC) && toUTC.isSameOrAfter(bookedToUTC))
            );
        });
    
        if (hasConflict) {
            return message.error('The car is already booked for the selected dates.');
        }
    
        setPaymentModalOpen(true);
    };
    
    return (
        <DefaultLayout>
            {loading && <Spinner />}
            <Row justify="center" className="d-flex align-items-center" style={{ minHeight: "90vh" }}>
                <Col lg={10} sm={24} xs={24} className="p-3">
                    {car && (
                        <img src={car.image} alt={car.name} className="booking-car-img" />
                    )}
                </Col>
                <Col lg={10} sm={24} xs={24} className="p-3">
                    <Divider type="horizontal" dashed>Car Info</Divider>
                    {car && (
                        <div className="booking-car-info">
                            <p>{car.name}</p>
                            <p>{car.rentPerDay} Rent Per Day /-</p>
                            <p>{car.fuelType}</p>
                            <p>{car.capacity}</p>
                        </div>
                    )}
                    <Divider type="horizontal" dashed>Select Time Slots</Divider>
                    <RangePicker
                        showTime={{ format: 'HH:mm A' }}
                        format="YYYY-MM-DD HH:mm A"
                        onChange={selectedTimeSlots}
                    />
                    <br />
                    <Checkbox className="mt-2" onChange={handleDriverRequiredChange}>Driver Required</Checkbox>
                    <h3 className="booking-car-total">Total Amount: {totalAmount}</h3>
                    <h3 className="booking-car-total">Total Days: {totalDays}</h3>
                    <div className="booking-car-actions">
                        <Button type="primary" onClick={handleBooking}>Book Now</Button>
                    </div>
                    <Divider type="horizontal" dashed>Booked Time Slots</Divider>
                    <Button type="default" onClick={handleShowBookedSlots}>View Booked Slots</Button>
                </Col>
                <Modal
                    title="Enter Payment Details"
                    open={paymentModalOpen}
                    onCancel={() => setPaymentModalOpen(false)}
                    footer={null}
                >
                    <Elements stripe={stripePromise}>
                        <PaymentForm 
                            totalAmount={totalAmount} 
                            from={from} 
                            to={to} 
                            car={car} 
                            driverRequired={driverRequired} 
                            setPaymentModalOpen={setPaymentModalOpen} 
                        />
                    </Elements>
                </Modal>
                <Modal
                    title="Booked Time Slots"
                    open={bookedSlotsModalOpen}
                    onCancel={() => setBookedSlotsModalOpen(false)}
                    footer={null}
                >
                    <div className="booked-slots">
                        {bookedTimeSlots && bookedTimeSlots.length > 0 ? (
                            bookedTimeSlots.map((slot, index) => (
                                <div key={index} className="booked-slot">
                                    <p>{`From: ${moment(slot.from).format('MMM DD YYYY, h:mm A')}`}</p>
                                    <p>{`To: ${moment(slot.to).format('MMM DD YYYY, h:mm A')}`}</p>
                                </div>
                            ))
                        ) : (
                            <p>No booked time slots available.</p>
                        )}
                    </div>
                </Modal>
            </Row>
        </DefaultLayout>
    );
};

export default BookingCar;



const { Option } = Select;

const PaymentForm = ({ totalAmount, from, to, car, driverRequired, setPaymentModalOpen }) => {
    const stripe = useStripe();
    const elements = useElements();
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);

    const handleBooking = async () => {
        if (!car._id || !from || !to || !elements || !stripe) {
            return message.error('All fields are required');
        }

        const values = form.getFieldsValue();
        if (!values.email || !values.phone || !values.address || !values.city || !values.country || !values.name) {
            return message.error('Please fill in all fields');
        }

        setLoading(true);

        try {
            // Convert totalAmount to cents
            const totalAmountInCents = Math.round(totalAmount * 100);

            const { data } = await axios.post('/api/bookings/create-payment-intent', {
                amount: totalAmountInCents // Stripe expects amount in cents
            });

            const result = await stripe.confirmCardPayment(data.clientSecret, {
                payment_method: {
                    card: elements.getElement(CardElement),
                    billing_details: {
                        name: values.name,
                        email: values.email,
                        phone: values.phone,
                        address: {
                            line1: values.address,
                            city: values.city,
                            country: values.country
                        }
                    }
                }
            });

            if (result.error) {
                console.error('Error during payment:', result.error);
                message.error('Error during payment, please try again.');
            } else if (result.paymentIntent.status === 'succeeded') {
                const reqObj = {
                    carId: car._id,
                    userId: JSON.parse(localStorage.getItem('user'))._id,
                    startDate: from.toISOString(),
                    endDate: to.toISOString(),
                    driver: driverRequired,
                    paymentMethodId: result.paymentIntent.payment_method,
                    email: values.email,
                    phone: values.phone,
                    address: values.address,
                    city: values.city,
                    country: values.country
                };
                await axios.post('/api/bookings/bookcar', reqObj);
                message.success('Booking confirmed!');
                setPaymentModalOpen(false);
            }
        } catch (error) {
            console.error('Error booking car:', error);
            message.error('Error booking car, please try again later.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Form layout="vertical" form={form}>
            <Form.Item label="Email" name="email" rules={[{ required: true, type: 'email', message: 'Please enter a valid email' }]}>
                <Input placeholder="Email" />
            </Form.Item>
            <Form.Item label="Contact Number" name="phone" rules={[{ required: true, message: 'Please enter your contact number' }]}>
                <Input placeholder="Contact Number" />
            </Form.Item>
            <Form.Item label="Card information" name="cardInfo" rules={[{ required: true, message: 'Please enter your card information' }]}>
                <CardElement className="stripe-card-element" />
            </Form.Item>
            <Form.Item label="Cardholder name" name="name" rules={[{ required: true, message: 'Please enter the cardholder name' }]}>
                <Input placeholder="Full name on card" />
            </Form.Item>
            <Form.Item label="Country or region" name="country" rules={[{ required: true, message: 'Please select your country' }]}>
                <Select placeholder="Select Country">
                    <Option value="US">United States</Option>
                    <Option value="CA">Canada</Option>
                    <Option value="GB">United Kingdom</Option>
                    <Option value="AU">Australia</Option>
                    <Option value="PK">Pakistan</Option>
                    <Option value="IN">India</Option>
                    <Option value="OM">Oman</Option>
                    <Option value="AE">United Arab Emirates</Option>
                    <Option value="FR">France</Option>
                    <Option value="BR">Brazil</Option>
                    <Option value="NZ">New Zealand</Option>
                    {/* Add more options as needed */}
                </Select>
            </Form.Item>
            <Form.Item label="Address" name="address" rules={[{ required: true, message: 'Please enter your address' }]}>
                <Input placeholder="Address" />
            </Form.Item>
            <Form.Item label="City" name="city" rules={[{ required: true, message: 'Please enter your city' }]}>
                <Input placeholder="City" />
            </Form.Item>
            <Button type="primary" onClick={handleBooking} className="mt-2" loading={loading} disabled={loading}>
                Confirm Booking
            </Button>
        </Form>
    );
};
