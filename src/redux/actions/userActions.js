/* eslint-disable no-unused-vars */
import { message } from "antd";
import axios from "axios";

export const userLogin = (reqobj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        const response = await axios.post('http://localhost:5000/api/users/login', reqobj);
        localStorage.setItem('user', JSON.stringify(response.data));
        
        dispatch({ type: 'LOADING', payload: false });
        message.success('Login successful');
        window.location.href = '/';
    } catch (error) {
        console.error("Login Error:", error);
        if (error.response && error.response.data) {
            message.error('Error: ' + error.response.data.error);
        } else {
            message.error('Error: Something went wrong');
        }
        dispatch({ type: 'LOADING', payload: false });
    }
};

export const userRegister = (reqobj) => async (dispatch) => {
    dispatch({ type: 'LOADING', payload: true });
    try {
        const response = await axios.post('http://localhost:5000/api/users/register', reqobj);
        dispatch({ type: 'LOADING', payload: false });
        message.success('Registration successful');
        window.location.href = '/login';
    } catch (error) {
        console.error("Registration Error:", error);
        if (error.response && error.response.data) {
            message.error('Error: ' + error.response.data.error);
        } else {
            message.error('Error: Something went wrong');
        }
        dispatch({ type: 'LOADING', payload: false });
    }
};
