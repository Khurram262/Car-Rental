import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCars } from '../redux/actions/carsActions';
import { Col, Row, Card, Button } from 'antd';
import Spinner from '../components/Spinner';
import { Link } from 'react-router-dom';
import DefaultLayout from '../components/DefaultLayout';
import './Home.css'; // Import custom CSS for styling

const Home = () => {
    const { cars } = useSelector(state => state.carsReducer);
    const { loading } = useSelector(state => state.alertsReducer);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(getAllCars());
    }, [dispatch]);

    return (
        <DefaultLayout>
            <div className="home-container">
                <Row gutter={[16, 16]} justify="center">
                    {loading ? (
                        <Spinner />
                    ) : (
                        cars.map((car, index) => (
                            <Col key={car._id} xs={24} sm={12} md={8} lg={6}>
                                <Card
                                    className="car-card"
                                    hoverable
                                    cover={<img alt={car.name} src={car.image} className="card-img" />}
                                >
                                    <div className="card-content">
                                        <h3 className="card-title">{car.name}</h3>
                                        <p className="card-description">Rent per day: PKR {car.rentPerDay}</p>
                                        <Button type="primary" className="book-now-button">
                                            <Link to={`/booking/${car._id}`}>Book now</Link>
                                        </Button>
                                    </div>
                                </Card>
                            </Col>
                        ))
                    )}
                </Row>
            </div>
        </DefaultLayout>
    );
}

export default Home;
