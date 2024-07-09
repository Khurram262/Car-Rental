import axios from 'axios';
import { message } from 'antd';

const LOADING = 'LOADING';
const BOOK_CAR_SUCCESS = 'BOOK_CAR_SUCCESS';
const GET_ALL_BOOKINGS = 'GET_ALL_BOOKINGS';

// Action creators
export const bookCar = (bookingDetails) => async (dispatch) => {
    dispatch({ type: LOADING, payload: true });

    try {
        const response = await axios.post('http://localhost:5000/api/bookings/bookcar', bookingDetails);
        dispatch({ type: LOADING, payload: false });
        message.success('Your car booked successfully');
        dispatch({ type: BOOK_CAR_SUCCESS, payload: response.data });
    } catch (error) {
        console.error('Error booking car:', error);
        dispatch({ type: LOADING, payload: false });
        handleErrorMessage(error);
    }
};

export const getAllBookings = () => async (dispatch) => {
    dispatch({ type: LOADING, payload: true });

    try {
        const response = await axios.get('http://localhost:5000/api/bookings/getallbookings');
        dispatch({ type: GET_ALL_BOOKINGS, payload: response.data });
        dispatch({ type: LOADING, payload: false });
    } catch (error) {
        console.error('Error fetching bookings:', error);
        handleErrorMessage(error);
        dispatch({ type: LOADING, payload: false });
    }
};

const handleErrorMessage = (error) => {
    if (error.response) {
        console.error('Error Response Data:', error.response.data);
        const errorMessage = getErrorResponseMessage(error.response.data);
        message.error(`Error: ${error.response.status} - ${errorMessage}`);
    } else if (error.request) {
        console.error('Error Request:', error.request);
        message.error('No response received from server');
    } else {
        console.error('Error Message:', error.message);
        message.error('Error in booking request');
    }
};

const getErrorResponseMessage = (data) => {
    if (typeof data === 'string') {
        return data;
    } else if (data && typeof data.message === 'string') {
        return data.message;
    } else if (data && typeof data.details === 'string') {
        return data.details;
    } else if (data && typeof data === 'object') {
        try {
            return JSON.stringify(data);
        } catch (err) {
            console.error('Error parsing response data', err);
            return 'An unexpected error occurred';
        }
    } else {
        return 'An unexpected error occurred';
    }
};

const REMOVE_BOOKING_REQUEST = 'REMOVE_BOOKING_REQUEST';
const REMOVE_BOOKING_SUCCESS = 'REMOVE_BOOKING_SUCCESS';
const REMOVE_BOOKING_FAILURE = 'REMOVE_BOOKING_FAILURE';

const REMOVE_TIMESLOTS_REQUEST = 'REMOVE_TIMESLOTS_REQUEST';
const REMOVE_TIMESLOTS_SUCCESS = 'REMOVE_TIMESLOTS_SUCCESS';
const REMOVE_TIMESLOTS_FAILURE = 'REMOVE_TIMESLOTS_FAILURE';

export const removeBooking = (carId) => async (dispatch) => {
  dispatch({ type: REMOVE_BOOKING_REQUEST });
  try {
    await axios.delete(`http://localhost:5000/api/bookings/remove/car/${carId}`);
    dispatch({ type: REMOVE_BOOKING_SUCCESS, payload: carId });
    message.success('Booking removed successfully');
  } catch (error) {
    dispatch({ type: REMOVE_BOOKING_FAILURE, payload: error });
    console.error('Error removing booking:', error);
    handleErrorMessage(error);
  }
};

export const removeTimeSlots = (carId) => async (dispatch) => {
  dispatch({ type: REMOVE_TIMESLOTS_REQUEST });
  try {
    const timeslotResponse = await axios.delete(`http://localhost:5000/api/timeslots/remove/car/${carId}`);
    if (timeslotResponse.status === 200) {
      dispatch({ type: REMOVE_TIMESLOTS_SUCCESS, payload: carId });
      message.success('Time slots removed successfully');
    } else {
      dispatch({ type: REMOVE_TIMESLOTS_FAILURE, payload: timeslotResponse.data.message });
      message.error('Failed to remove time slots');
    }
  } catch (error) {
    dispatch({ type: REMOVE_TIMESLOTS_FAILURE, payload: error });
    console.error('Error removing time slots:', error);
    handleErrorMessage(error);
  }
};