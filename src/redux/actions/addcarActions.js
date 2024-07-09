import axios from 'axios';
import { message } from 'antd';

export const ADD_CAR_REQUEST = 'ADD_CAR_REQUEST';
export const ADD_CAR_SUCCESS = 'ADD_CAR_SUCCESS';
export const ADD_CAR_FAILURE = 'ADD_CAR_FAILURE';

export const addCar = (carData) => async (dispatch) => {
    dispatch({ type: ADD_CAR_REQUEST });
    try {
        const response = await axios.post('http://localhost:5000/api/cars/addcar', carData);
        dispatch({ type: ADD_CAR_SUCCESS, payload: response.data });
        message.success('New car added successfully');
    } catch (error) {
        dispatch({ type: ADD_CAR_FAILURE, payload: error.message });
        message.error('Failed to add new car');
    }
};
