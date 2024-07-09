import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { Button, Col, Form, Input, Row, Select } from 'antd';
import Spinner from '../../components/Spinner';
import { editCar, getAllCars } from '../../redux/actions/carsActions';
import './EditCar.css';

const { Option } = Select;

function EditCar() {
  const { cars } = useSelector(state => state.carsReducer);
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alertsReducer);
  const [car, setCar] = useState();
  const [totalCars, setTotalCars] = useState([]);
  const { carid } = useParams();

  useEffect(() => {
    if (cars.length === 0) {
      dispatch(getAllCars());
    } else {
      setTotalCars(cars);
      setCar(cars.find(o => o._id === carid));
    }
  }, [cars, carid, dispatch]);

  const onFinish = async (values) => {
    values._id = car._id;
    const response = await dispatch(editCar(values));

    if (response.success) {
      console.log('Car updated successfully!');
    } else {
      console.error('Error updating car:', response.error);
    }
  };

  const containerStyle = {
    marginTop: '3rem',
    padding: '0 1rem',
  };

  const formStyle = {
    padding: '2rem',
    border: '1px solid #ccc',
    borderRadius: '8px',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
  };

  const titleStyle = {
    textAlign: 'center',
    marginBottom: '2rem',
    color: '#1890ff',
    fontSize: '1.8rem',
    fontWeight: 'bold',
  };

  const submitStyle = {
    textAlign: 'center',
    marginTop: '2rem',
  };

  return (
    <div className="edit-car-container">
      {loading && <Spinner />}

      <header className="edit-car-header">
        <h1 className="edit-car-title">Edit Car</h1>
      </header>

      <Row justify="center" style={containerStyle}>
        <Col lg={12} sm={24}>
          {totalCars.length > 0 && (
            <Form
              initialValues={car}
              style={formStyle}
              layout="vertical"
              onFinish={onFinish}
            >
              <h1 style={titleStyle}>Edit Car</h1>

              <Form.Item
                label="Car Name"
                name="name"
                rules={[
                  {
                    required: true,
                    message: 'Please input the car name!',
                  },
                ]}
              >
                <Input placeholder="Enter car name" />
              </Form.Item>

              <Form.Item
                label="Image URL"
                name="image"
                rules={[
                  {
                    required: true,
                    message: 'Please input the image URL!',
                  },
                ]}
              >
                <Input placeholder="Enter image URL" />
              </Form.Item>

              <Form.Item
                label="Rent per Day"
                name="rentPerDay"
                rules={[
                  {
                    required: true,
                    message: 'Please input the rent per day!',
                  },
                ]}
              >
                <Input type="number" placeholder="Enter rent per day" />
              </Form.Item>

              <Form.Item
                label="Capacity"
                name="capacity"
                rules={[
                  {
                    required: true,
                    message: 'Please input the capacity!',
                  },
                ]}
              >
                <Input type="number" placeholder="Enter capacity" />
              </Form.Item>

              <Form.Item
                label="Fuel Type"
                name="fuelType"
                rules={[
                  {
                    required: true,
                    message: 'Please select the fuel type!',
                  },
                ]}
              >
                <Select placeholder="Select fuel type">
                  <Option value="Petrol">Petrol</Option>
                  <Option value="Diesel">Diesel</Option>
                  <Option value="Electric">Electric</Option>
                </Select>
              </Form.Item>

              <Form.Item style={submitStyle}>
                <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                  Edit Car
                </Button>
              </Form.Item>
            </Form>
          )}
        </Col>
      </Row>

      <footer className="edit-car-footer">
        <div className="edit-car-footer-content">
          <p>&copy; {new Date().getFullYear()} Car Rental. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default EditCar;
