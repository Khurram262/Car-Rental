import React from 'react';
import { Button, Dropdown, Menu } from 'antd';
import { UserOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import './DefaultLayout.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { faCar, faSignOutAlt, faUser } from '@fortawesome/free-solid-svg-icons';
import logo from './imgs.png';

const { Item } = Menu;

const DefaultLayout = (props) => {
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    window.location.href = '/login';
  };

  const menu = (
    <Menu>
      <Item key="1" icon={<FontAwesomeIcon icon={faUser} />}>
        <Link to="/Homes">Homes</Link>
      </Item>
      <Item key="2" icon={<FontAwesomeIcon icon={faCar} />}>
        <Link to="/">Car</Link>
      </Item>
      <Item key="3" icon={<FontAwesomeIcon icon={faCar} />}>
        <Link to="/Userbookings">My Bookings</Link>
      </Item>
      <Item key="4" icon={<FontAwesomeIcon icon={faCar} />}>
        <Link to="/Contact">Contact Us</Link>
      </Item>
      <Item key="5" icon={<FontAwesomeIcon icon={faCar} />}>
        <Link to="/login">login</Link>
      </Item>
      <Item key="6" onClick={handleLogout} style={{ color: '#ff4d4f' }} icon={<FontAwesomeIcon icon={faSignOutAlt} />}>
        Logout
      </Item>
    </Menu>
  );

  return (
    <div className="layout-container">
      <header className="header">
        <div className="logo-container">
          <Link to="/">
            <img
              src={logo}
              alt="Logo"
              className="logo-image"
            />
          </Link>
        </div>

        <div className="user-menu">
          <Dropdown overlay={menu} placement="bottomRight">
            <Button className="user-button" icon={<UserOutlined />} size="large">
              {user ? user.username : 'Guest'}
            </Button>
          </Dropdown>
        </div>
      </header>
      <main className="content">{props.children}</main>
      <footer className="footer">
        <div className="footer-content">
          <div className="footer-section">
            <h3>About Us</h3>
            <p>We are dedicated to providing you with the best car rental experience possible.</p>
          </div>
          <div className="footer-section">
            <h3>Contact</h3>
            <p>+1 123 456 7890</p>
            <p>info@carrentalservice.com</p>
          </div>
          <div className="footer-section">
            <h3>Follow Us</h3>
            <div className="social-icons">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faFacebook} /></a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faTwitter} /></a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FontAwesomeIcon icon={faInstagram} /></a>
            </div>
          </div>
          <div className="footer-section">
            <h3>Location</h3>
            <p>Visit us at:</p>
            <p>123 Main Street, Lahore, Pakistan</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; {new Date().getFullYear()} Car Rental. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default DefaultLayout;
