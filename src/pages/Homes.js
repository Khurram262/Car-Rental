import React, { useEffect, useState } from 'react';
import { Row, Col, Typography, Card, Button } from 'antd';
import './Homes.css'; // Custom CSS for animations and styling
import DefaultLayout from '../components/DefaultLayout';
import NewBackground from './assets/pic.png'; // Updated image path
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Correct import statement

const { Title, Paragraph } = Typography;

const Home = () => {
  const [recommendations, setRecommendations] = useState([]);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/recommendations');
        console.log('API response:', response.data); // Log API response
        setRecommendations(response.data);
      } catch (error) {
        console.error('Error fetching recommendations:', error);
      }
    };

    fetchRecommendations();
  }, []);

  const handleContactUs = () => {
    // Example of handling contact us
    window.location.href = '/'; // You may replace this with your actual contact page
  };

  const handleBookNow = (carId) => {
    console.log(`Booking car with ID ${carId} now!`);
    // Redirect to booking page
    navigate(`/booking/${carId}`); // Correct path interpolation
  };

  return (
    <DefaultLayout>
      <div className="home-container">
        <div className="cover-image">
          <div className="content-container">
            <Title level={1} className="main-title">RENT & RIDE <br /> <span className="sub-title">With Us</span></Title>
            <Button type="primary" className="contact-button" onClick={handleContactUs}>Book now</Button>
          </div>
          <img src={NewBackground} alt="Car" className="cover-image-right" />
        </div>

        <div className="why-choose-us">
          <Title level={2} className="section-title">Why Choose Our Car Rental Services?</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8}>
              <Card hoverable className="feature-card">
                <Title level={4} className="feature-title">Affordable Prices</Title>
                <Paragraph>We offer the best prices in the market.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card hoverable className="feature-card">
                <Title level={4} className="feature-title">Wide Range of Cars</Title>
                <Paragraph>Choose from a wide variety of cars to suit your needs.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card hoverable className="feature-card">
                <Title level={4} className="feature-title">24/7 Support</Title>
                <Paragraph>Our support team is available 24/7 to assist you.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card hoverable className="feature-card">
                <Title level={4} className="feature-title">Easy Booking</Title>
                <Paragraph>Convenient online booking system.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card hoverable className="feature-card">
                <Title level={4} className="feature-title">Flexible Rentals</Title>
                <Paragraph>Flexible rental terms to suit your schedule.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card hoverable className="feature-card">
                <Title level={4} className="feature-title">Quality Vehicles</Title>
                <Paragraph>All vehicles are well-maintained and high-quality.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card hoverable className="feature-card">
                <Title level={4} className="feature-title">GPS Included</Title>
                <Paragraph>All our vehicles come with GPS included.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card hoverable className="feature-card">
                <Title level={4} className="feature-title">Insurance Coverage</Title>
                <Paragraph>Comprehensive insurance coverage for all rentals.</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card hoverable className="feature-card">
                <Title level={4} className="feature-title">Roadside Assistance</Title>
                <Paragraph>24/7 roadside assistance for peace of mind.</Paragraph>
              </Card>
            </Col>
          </Row>
        </div> 

        <Title level={2} className="section-title">Recommendations Cars</Title>
     
        <Row gutter={[16, 16]}>
  {recommendations.map((car, index) => (
    <Col xs={24} sm={12} lg={8} key={car._id || index}>
      <Card hoverable className="recommendation-card">
        <img src={car.image} alt={car.name} className="car-image" />
        <Title level={4} className="car-title">{car.name}</Title>
        <Paragraph>{car.description}</Paragraph>
        <Paragraph>Rent per day: PKR {car.rentPerDay}</Paragraph>
        <Button type="primary" onClick={() => handleBookNow(car._id)}>Book now</Button>
      </Card>
    </Col>
  ))}
</Row>

        <div className="customer-reviews">
          <Title level={2} className="section-title">Customer Reviews</Title>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} lg={8}>
              <Card hoverable className="review-card">
                <Paragraph>"Great service and affordable prices. Highly recommend!"</Paragraph>
                <Paragraph>- John Doe</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card hoverable className="review-card">
                <Paragraph>"Wide range of cars to choose from. Will rent again!"</Paragraph>
                <Paragraph>- Jane Smith</Paragraph>
              </Card>
            </Col>
            <Col xs={24} sm={12} lg={8}>
              <Card hoverable className="review-card">
                <Paragraph>"Excellent customer support. 24/7 assistance is a lifesaver!"</Paragraph>
                <Paragraph>- Bob Johnson</Paragraph>
              </Card>
            </Col>
          </Row>
        </div>

        <div className="popular-brands">
          <Title level={2} className="section-title">Most Popular Car Brands We Rent</Title>
          <div className="brands-container">
            <img src="https://www.freeiconspng.com/thumbs/honda-logo-png/honda-logo-png-picture-20.png" alt="Honda" className="brand-logo" />
            <img src="https://pngimg.com/d/car_logo_PNG1665.png" alt="Toyota" className="brand-logo" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSAlOwIvIzcEv2B_CpUiEurJD5ewtaAUnWJVQ&s" alt="Suzuki" className="brand-logo" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQo8gTUCq9PQr6fmhC_-HZkac1hhpjcqmauoQ&s" alt="Kia" className="brand-logo" />
            <img src="https://logowik.com/content/uploads/images/hyundai1362.jpg" alt="Hyundai" className="brand-logo" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3jLdiRIffyVvYjJSgZqFzc73YJSfqcRbR6Q&s" alt="Audi" className="brand-logo" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQvewSrFPCk7tmV4wu5Wue3ZLO8y5LsU2R1aw&s" alt="Nissan" className="brand-logo" />
          </div>
        </div>

        <div className="location-map">
          <Title level={2} className="section-title">Our Location</Title>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d13610.333337720308!2d74.31418299841314!3d31.520369299058763!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919042a407c887d%3A0x816c8e9d3e9abf36!2sLahore%2C%20Punjab%2C%20Pakistan!5e0!3m2!1sen!2s!4v1623844292830!5m2!1sen!2s"
            width="100%"
            height="450"
            allowFullScreen=""
            loading="lazy"
            title="Lahore Location"
            className="map-iframe"
          ></iframe>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Home;
