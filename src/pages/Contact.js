import React, { useState } from 'react';
import { Form, Input, Button, Select, notification } from 'antd';
import styled from 'styled-components';
import DefaultLayout from '../components/DefaultLayout';

const { TextArea } = Input;
const { Option } = Select;

const ContactContainer = styled.div`
  max-width: 600px;
  margin: 0 auto;
  padding: 40px;
  background-color: #fff;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
  font-size: 24px;
  color: #001529;
`;

const StyledFormItem = styled(Form.Item)`
  .ant-form-item-label > label {
    color: #001529;
    font-weight: bold;
  }

  .ant-input,
  .ant-input-textarea {
    border-radius: 4px;
  }
`;

const StyledButton = styled(Button)`
  width: 100%;
  background-color: #1890ff;
  border-color: #1890ff;

  &:hover {
    background-color: #40a9ff;
    border-color: #40a9ff;
  }
`;

const Contact = () => {
  const [form] = Form.useForm();
  const [submitting, setSubmitting] = useState(false);

  const onFinish = async (values) => {
    setSubmitting(true);
    try {
      console.log('Submitting form data:', values);
      const response = await fetch('http://localhost:5000/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const text = await response.text();
        try {
          const errorData = JSON.parse(text);
          throw new Error(errorData.message || 'Network response was not ok');
        } catch (e) {
          throw new Error(text);
        }
      }

      notification.success({
        message: 'Message Sent',
        description: 'Your message has been sent successfully!',
      });
      form.resetFields();
    } catch (error) {
      console.error('Error during form submission:', error);
      notification.error({
        message: 'Submission Failed',
        description: `There was an issue sending your message. Please try again later. Error: ${error.message}`,
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <DefaultLayout>
      <ContactContainer>
        <Title>Contact Us</Title>
        <Form
          form={form}
          layout="vertical"
          onFinish={onFinish}
        >
          <StyledFormItem
            name="name"
            label="Name"
            rules={[{ required: true, message: 'Please enter your name' }]}
          >
            <Input placeholder="Your Name" />
          </StyledFormItem>
          <StyledFormItem
            name="email"
            label="Email"
            rules={[
              { required: true, message: 'Please enter your email' },
              { type: 'email', message: 'Please enter a valid email' },
            ]}
          >
            <Input placeholder="Your Email" />
          </StyledFormItem>
          <StyledFormItem
            name="contactNumber"
            label="Contact Number"
            rules={[{ required: true, message: 'Please enter your contact number' }]}
          >
            <Input placeholder="Your Contact Number" />
          </StyledFormItem>
          <StyledFormItem
            name="car"
            label="Select Car"
            rules={[{ required: true, message: 'Please select a car' }]}
          >
            <Select placeholder="Select a car">
              <Option value="Honda Civic">Honda Civic</Option>
              <Option value="Toyota Corolla">Toyota Corolla</Option>
              <Option value="Audi A6">Audi A6</Option>
              <Option value="Suzuki Mehran">Suzuki Mehran</Option>
              <Option value="Honda City">Honda City</Option>
              <Option value="Nissan Dayz">Nissan Dayz</Option>
            </Select>
          </StyledFormItem>
          <StyledFormItem
            name="message"
            label="Your Requirement Details"
            rules={[{ required: true, message: 'Please enter your message' }]}
          >
            <TextArea rows={4} placeholder="Your Message" />
          </StyledFormItem>
          <StyledFormItem>
            <StyledButton type="primary" htmlType="submit" loading={submitting}>
              Send Message
            </StyledButton>
          </StyledFormItem>
        </Form>
      </ContactContainer>
    </DefaultLayout>
  );
};

export default Contact;
