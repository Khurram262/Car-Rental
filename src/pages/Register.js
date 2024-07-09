import React from 'react';
import { Form, Input, Button, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { userRegister } from '../redux/actions/userActions';
import backgroundImage from './assets/car.jpg'; // Import the image file correctly
import './Login.css'; 

const { Title, Text } = Typography;

function Register() {
    const dispatch = useDispatch();

    const onFinish = (values) => {
        dispatch(userRegister(values));
        console.log(values);
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
                backgroundImage: `url(${backgroundImage})`, // Use the imported background image
                backgroundSize: 'cover',
                backgroundPosition: 'center',
            }}
        >
            <div 
                className="login-form"
                style={{ 
                    padding: '20px',
                    border: '1px solid #ffffff', // Change border color to white
                    borderRadius: '5px',
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', // Slightly darker background color
                    position: 'relative',
                    width: '100%',
                    maxWidth: '400px',
                }}
            >
                <Title level={3} style={{ marginBottom: '20px', textAlign: 'center', color: '#ffffff' }}>Register</Title>
                <Form layout="vertical" onFinish={onFinish}>
                    <Form.Item name='email' label={<span style={{ color: '#ffffff' }}>Email</span>} rules={[
                        { type: 'email', message: 'Please enter a valid email!' },
                        { required: true, message: 'Please input your email!' },
                    ]}>
                        <Input style={{ borderRadius: '5px', color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                    </Form.Item>
                    <Form.Item name='username' label={<span style={{ color: '#ffffff' }}>Username</span>} rules={[{ required: true, message: 'Please input your username!' }]}>
                        <Input style={{ borderRadius: '5px', color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                    </Form.Item>
                    <Form.Item name='password' label={<span style={{ color: '#ffffff' }}>Password</span>} rules={[{ required: true, message: 'Please input your password!' }]}>
                        <Input.Password style={{ borderRadius: '5px', color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                    </Form.Item>
                    <Form.Item name='cpassword' label={<span style={{ color: '#ffffff' }}>Confirm password</span>} dependencies={['password']} rules={[
                        { required: true, message: 'Please confirm your password!' },
                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (!value || getFieldValue('password') === value) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(new Error('The two passwords do not match!'));
                            },
                        }),
                    ]}>
                        <Input.Password style={{ borderRadius: '5px', color: '#ffffff', backgroundColor: 'rgba(255, 255, 255, 0.1)' }} />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" style={{ width: '100%', background: '#1890ff', borderColor: '#1890ff' }}>Register</Button>
                    </Form.Item>
                </Form>
                <div style={{ textAlign: 'center' }}>
                    <Text style={{ color: '#ffffff' }}>Already have an account?</Text>{' '}
                    <a href="/login" style={{ color: 'white' }}>Login now!</a>
                </div>
            </div>
        </div>
    );
}

export default Register;
