import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars, deleteCar } from '../redux/actions/carsActions';
import { Row, Col, Card, Empty, Image, Popconfirm, message, Button, Tooltip } from 'antd';
import { DeleteFilled, EditOutlined, QuestionCircleOutlined, PlusOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { BarChartOutlined, DollarCircleOutlined, UserOutlined, CarOutlined } from '@ant-design/icons';
import axios from 'axios';
import Spinner from '../components/Spinner';
import './AdminHome.css';

const { Meta } = Card;

const AdminHome = () => {
    const dispatch = useDispatch();
    const { cars, loading } = useSelector(state => state.carsReducer);
    const [analyticsData, setAnalyticsData] = useState({
        totalRevenue: 0,
        totalBookings: 0,
        totalUsers: 0,
        carsAvailable: 0,
    });

    useEffect(() => {
        dispatch(getAllCars());
        fetchAnalyticsData();
    }, [dispatch]);

    const fetchAnalyticsData = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/analytics');
            setAnalyticsData(response.data);
        } catch (error) {
            console.error('Error fetching analytics data:', error);
        }
    };

    const handleDeleteCar = (carId) => {
        dispatch(deleteCar(carId));
        message.success('Car deleted successfully');
    };

    const handleRemoveBooking = async (carId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/bookings/remove/booking/${carId}`);
            message.success(response.data.message);
            dispatch(getAllCars()); // Re-fetch cars to update UI
        } catch (error) {
            console.error('Error removing booking:', error);
            message.error('Failed to remove booking');
        }
    };

    const handleRemoveTimeSlots = async (carId) => {
        try {
            const response = await axios.delete(`http://localhost:5000/api/bookings/remove/timeslots/${carId}`);
            message.success(response.data.message);
            dispatch(getAllCars()); // Re-fetch cars to update UI
        } catch (error) {
            console.error('Error removing time slots:', error);
            message.error('Failed to remove time slots');
        }
    };

    return (
        <div className="admin-home">
            <header className="admin-header">
                <h1 className="admin-title">Admin Dashboard</h1>
                <div className="admin-actions">
                    <Link to="/addcar">
                        <Tooltip title="Add a new car">
                            <Button type="primary" shape="round" icon={<PlusOutlined />}>
                                Add Car
                            </Button>
                        </Tooltip>
                    </Link>
                    <Link to="/userbookings" className="admin-link">
                        Bookings
                    </Link>
                </div>
            </header>

            <main className="admin-content">
                <Row gutter={[16, 16]}>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="admin-analytics-card">
                            <BarChartOutlined className="admin-analytics-icon" />
                            <Meta title="Total Revenue" description={`Rs${analyticsData.totalRevenue}`} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="admin-analytics-card">
                            <DollarCircleOutlined className="admin-analytics-icon" />
                            <Meta title="Total Bookings" description={analyticsData.totalBookings} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="admin-analytics-card">
                            <UserOutlined className="admin-analytics-icon" />
                            <Meta title="Total Users" description={analyticsData.totalUsers} />
                        </Card>
                    </Col>
                    <Col xs={24} sm={12} lg={6}>
                        <Card className="admin-analytics-card">
                            <CarOutlined className="admin-analytics-icon" />
                            <Meta title="Cars Available" description={analyticsData.carsAvailable} />
                        </Card>
                    </Col>
                </Row>

                <div className="admin-car-list">
                    <h2 className="admin-car-list-title">All Cars</h2>
                    {loading ? (
                        <Spinner />
                    ) : cars.length === 0 ? (
                        <Empty
                            description="No cars found"
                            image={<Image src="https://placehold.it/200x200?text=No+Cars" alt="No Cars" />}
                        />
                    ) : (
                        <Row gutter={[16, 16]} justify="center">
                            {cars.map((car) => (
                                <Col key={car._id} xs={24} sm={12} md={8} lg={6}>
                                    <Card
                                        className="admin-car-card"
                                        hoverable
                                        cover={<img alt={car.name} src={car.image} className="admin-car-image" />}
                                        actions={[
                                            <Popconfirm
                                                key="delete"
                                                title="Are you sure you want to delete this car?"
                                                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                                                onConfirm={() => handleDeleteCar(car._id)}
                                                okText="Yes"
                                                cancelText="No"
                                            >
                                                <DeleteFilled className="admin-delete-icon" />
                                            </Popconfirm>,
                                            <Link key="edit" to={`/editcar/${car._id}`}>
                                                <EditOutlined className="admin-edit-icon" />
                                            </Link>,
                                        ]}
                                    >
                                        <Meta
                                            title={car.name}
                                            description={
                                                <div className="admin-car-meta">
                                                    <div className="admin-car-price">Rs{car.rentPerDay}/Day</div>
                                                    <div className="admin-car-buttons">
                                                        <Button
                                                            key="removeBooking"
                                                            onClick={() => handleRemoveBooking(car._id)}
                                                            type="link"
                                                            className="admin-action-button remove-booking"
                                                        >
                                                            <DeleteFilled />
                                                            Remove Booking
                                                        </Button>
                                                        <Button
                                                            key="removeTimeSlots"
                                                            onClick={() => handleRemoveTimeSlots(car._id)}
                                                            type="link"
                                                            className="admin-action-button remove-timeslots"
                                                        >
                                                            <DeleteFilled />
                                                            RemoveTimeSlots
                                                        </Button>
                                                    </div>
                                                </div>
                                            }
                                            className="admin-car-meta"
                                        />
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    )}
                </div>
            </main>

            <footer className="admin-footer">
                <div className="admin-footer-content">
                    <p>&copy; {new Date().getFullYear()} Car Rental. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default AdminHome;
