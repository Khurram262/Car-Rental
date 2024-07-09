import React, { useEffect } from 'react';
import DefaultLayout from '../components/DefaultLayout';
import { useDispatch, useSelector } from 'react-redux';
import { getAllBookings } from '../redux/actions/BookingActions';
import { Row, Col, Card, Empty } from 'antd';
import moment from 'moment';

function UserBookings() {
  const dispatch = useDispatch();
  const { bookings } = useSelector(state => state.bookingsReducer);

  useEffect(() => {
    dispatch(getAllBookings());
  }, [dispatch]);

  return (
    <DefaultLayout>
      <h1>My Bookings</h1>
      <Row justify="center">
        <Col lg={20} sm={24}>
          {bookings.length === 0 ? (
            <Empty description="You have no bookings yet." />
          ) : (
            bookings.map(booking => (
              <Card
                key={booking._id}
                type="inner"
                className="w-100 mt-3 mb-3"
                title={`Transaction ID: ${booking.transactionId}`}
              >
                <Row className="m-2">
                  <Col lg={7} sm={24}>
                    <p>Total days: <b>{booking.totalDays}</b></p>
                    {booking.car && (
                      <>
                        <p>Rent per day: <b>{booking.car.rentPerDay}</b></p>
                        <p>Name: <b>{booking.car.name}</b></p>
                        <img src={booking.car.image} height="150" alt="Car" />
                      </>
                    )}
                    <p>Total Amount: <b>{booking.totalAmount}</b></p>
                  </Col>
                  <Col lg={10} sm={24}>
                    <p>From: <b>{booking.bookedTimeSlots && booking.bookedTimeSlots.from ? moment(booking.bookedTimeSlots.from).format('MMM DD YYYY') : 'N/A'}</b></p>
                    <p>To: <b>{booking.bookedTimeSlots && booking.bookedTimeSlots.to ? moment(booking.bookedTimeSlots.to).format('MMM DD YYYY') : 'N/A'}</b></p>
                    <p>Date of Booking: <b>{moment(booking.createdAt).format('MMM DD YYYY')}</b></p>
                  </Col>
                </Row>
              </Card>
            ))
          )}
        </Col>
      </Row>
    </DefaultLayout>
  );
}

export default UserBookings;
