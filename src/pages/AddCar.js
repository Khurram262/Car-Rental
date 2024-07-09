import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Col, Form, Input, InputNumber, Row } from 'antd';
import Spinner from '../components/Spinner';
import { addCar } from '../redux/actions/carsActions';
import './AddCar.css';

function AddCar() {
  const dispatch = useDispatch();
  const { loading } = useSelector(state => state.alertsReducer);

  const onFinish = (values) => {
    values.bookedTimeSlots = [];
    dispatch(addCar(values));
    console.log('Success:', values);
  };

  return (
    <div className="add-car-container">
      {loading && <Spinner />}
      <header className="add-car-header">
        <h1 className="add-car-title">Add Car</h1>
      </header>

      <Row justify="center" style={{ marginTop: '3rem', padding: '0 1rem' }}>
        <Col lg={12} sm={24}>
          <Form
            className="p-2"
            layout="vertical"
            onFinish={onFinish}
            style={{
              backgroundColor: '#f0f2f5',
              padding: '2rem',
              borderRadius: '8px',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          >
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
              <Input style={{ borderRadius: '4px' }} />
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
              <Input style={{ borderRadius: '4px' }} />
            </Form.Item>

            <Form.Item
              label="Tarif per Day"
              name="rentPerDay"
              rules={[
                {
                  required: true,
                  message: 'Please input the tarif per day!',
                },
              ]}
            >
              <InputNumber style={{ width: '100%' }} min={0} step={0.01} />
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
              <InputNumber style={{ width: '100%' }} min={0} />
            </Form.Item>

            <Form.Item
              label="Fuel Type"
              name="fuelType"
              rules={[
                {
                  required: true,
                  message: 'Please input the fuel type!',
                },
              ]}
            >
              <Input style={{ borderRadius: '4px' }} />
            </Form.Item>

            <Form.Item>
              <div style={{ textAlign: 'right' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{ backgroundColor: '#1890ff', border: 'none' }}
                >
                  Add Car
                </Button>
              </div>
            </Form.Item>
          </Form>
        </Col>
      </Row>

      <footer className="add-car-footer">
        <div className="add-car-footer-content">
          <p>&copy; {new Date().getFullYear()} Car Rental. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default AddCar;
