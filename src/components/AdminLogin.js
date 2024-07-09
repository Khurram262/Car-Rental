import React, { useState } from 'react';
import { Form, Input, Button, message } from 'antd';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './AdminLogin.css';

const AdminLogin = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            // Validate required fields
            if (!values.username || !values.password) {
                message.error('Please enter both username and password.');
                setLoading(false);
                return;
            }
    
            // Prepare data based on API requirements
            const formattedData = {
                username: values.username,
                password: values.password
            };
    
            // Example basic authentication (replace with your actual logic)
            const response = await axios.post('http://localhost:5000/api/admin/login', formattedData);
    
            localStorage.setItem('adminToken', response.data.token);
            setLoading(false);
            message.success('Login successful');
            navigate('/adminhome');
        } catch (error) {
            setLoading(false);
            console.error('Login error:', error);
    
            if (error.response) {
                const errorMessage = error.response.data.message || 'Login failed';
                message.error(errorMessage);
            } else if (error.request) {
                message.error('Request error. Please try again.');
            } else {
                message.error('An unexpected error occurred. Please try again later.');
            }
        }
    };
    
    return (
        <div className="admin-login-container">
            <div className="admin-login-card">
                <h2 className="admin-login-title">Admin Login</h2>
                <Form
                    name="admin_login"
                    onFinish={onFinish}
                    className="admin-login-form"
                    initialValues={{ username: '', password: '' }}
                >
                    <Form.Item
                        name="username"
                        rules={[{ required: true, message: 'Please input your username!' }]}
                    >
                        <Input placeholder="Username" />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" htmlType="submit" loading={loading} block>
                            Login
                        </Button>
                    </Form.Item>
                </Form>
                <p className="admin-login-footer">Company Name &copy; 2024</p>
            </div>
        </div>
    );
};

export default AdminLogin;
