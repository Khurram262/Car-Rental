import React from 'react';
import { Form, Input, Button, Typography, message } from 'antd';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/actions/userActions';
import carBackground from './assets/car.jpg';
import './Login.css';

const { Title, Text } = Typography;

const Login = () => {
    const dispatch = useDispatch();

    const onFinish = async (values) => {
        try {
            await dispatch(userLogin(values));
            message.success('Login successful');
            setTimeout(() => {
                window.location.href = '/Homes';
            }, 1000); // Redirect to home page after 1 second
        } catch (error) {
            console.error('Login Error:', error);
            message.error('Invalid email or password'); // Display a generic error message
        }
    };

    return (
        <div
            className="login-container"
            style={{
                position: 'relative',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                backgroundImage: `url(${carBackground})`, // Use the imported background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div
                className="login-form"
                style={{
                    padding: '20px',
                    border: '1px solid rgba(255, 255, 255, 0.5)', // Change border color to semi-transparent white
                    borderRadius: '5px',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    position: 'relative',
                    width: '100%',
                    maxWidth: '400px',
                }}
            >
                <Title level={3} style={{ marginBottom: '20px', textAlign: 'center', color: '#ffffff' }}>
                    Login
                </Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item
                        name="email"
                        label={<span style={{ color: '#ffffff' }}>Email</span>}
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input style={{ borderRadius: '5px', color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        label={<span style={{ color: '#ffffff' }}>Password</span>}
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password style={{ borderRadius: '5px', color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%', background: '#1890ff', borderColor: '#1890ff' }}>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#ffffff' }}>Don't have an account?</Text>{' '}
                    <a href="/register" style={{ color: '#ffffff' }}>
                        Register now!
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Login;
