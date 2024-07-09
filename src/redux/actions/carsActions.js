import { message } from 'antd';
import axios from 'axios';

export const getAllCars = () => async (dispatch) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    const response = await axios.get('http://localhost:5000/api/cars/getallcars');
    dispatch({ type: 'GET_ALL_CARS', payload: response.data });
  } catch (error) {
    console.error('Error fetching cars:', error);
    message.error('An error occurred while fetching cars.');
  } finally {
    dispatch({ type: 'LOADING', payload: false });
  }
};

const handleCarOperation = async (dispatch, operation, reqObj, successMessage, redirectPath) => {
  dispatch({ type: 'LOADING', payload: true });

  try {
    await axios.post(`http://localhost:5000/api/cars/${operation}`, reqObj);
    message.success(successMessage);
    setTimeout(() => {
      window.location.href = redirectPath;
    }, 200);
  } catch (error) {
    console.error(`Error ${operation} car:`, error);
    message.error(`An error occurred while ${operation} the car.`);
  } finally {
    dispatch({ type: 'LOADING', payload: false });
  }
};

export const addCar = (reqObj) => async (dispatch) => {
  await handleCarOperation(dispatch, 'addcar', reqObj, 'New car added successfully', '/adminhome');
};

export const editCar = (reqObj) => async (dispatch) => {
  await handleCarOperation(dispatch, 'editcar', reqObj, 'Car details updated successfully', '/adminhome');
};

export const deleteCar = (reqObj) => async (dispatch) => {
  await handleCarOperation(dispatch, 'deletecar', reqObj, 'Car deleted successfully', '/');
};
