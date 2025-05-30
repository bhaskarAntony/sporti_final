import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner, Alert } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Phone, FileText } from 'lucide-react';
import axios from 'axios';
import GuestAuthContext from '../../context/GuestAuthContext';
import AlertContext from '../../context/AlertContext';
import { CurrencyRupeeSharp } from '@mui/icons-material';

const GuestBookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { guest, token, isGuestAuthenticated } = useContext(GuestAuthContext);
  const { setError } = useContext(AlertContext);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(null);

  // useEffect(() => {
  //   if (!isGuestAuthenticated) {
  //     navigate('/guest/login');
  //   }
  // }, [isGuestAuthenticated, navigate]);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        const response = await axios.get(`https://nn-z4al.onrender.com/api/auth/guest/bookings/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (response.data.success) {
          setBooking(response.data.booking);
        }
      } catch (error) {
        console.error('Error fetching guest booking details:', error);
        setError('Failed to fetch booking details');
      } finally {
        setLoading(false);
      }
    };

    if (isGuestAuthenticated) {
      fetchBookingDetails();
    }
  }, [id, token, setError, isGuestAuthenticated]);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  const getStatusBadge = (status) => {
    const variants = {
      confirmed: 'success',
      pending: 'warning',
      rejected: 'danger',
      cancelled: 'secondary',
      completed: 'info',
    };
    return variants[status] || 'secondary';
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading booking details...</p>
      </Container>
    );
  }

  if (!booking) {
    return (
      <Container className="py-5">
        <Alert variant="danger">Booking not found</Alert>
      </Container>
    );
  }

  return (
    <Container className="p-3 p-md-5 bg-light" fluid>
      {booking.status === 'confirmed' && booking.paymentStatus === 'pending' && (
        <Alert variant="warning">
          <h6 className="mb-2 fw-bold">Payment Instructions</h6>
          <hr />
          <p className="mb-0">
            Please make the payment at the venue during check-in. The total amount to be paid is ₹{booking.totalCost}.
          </p>
        </Alert>
      )}
      <br />
      <Row>
        <Col lg={8}>
          <Card className="shadow-sm mb-4 border-0 rounded-0">
            <Card.Header className="bg-main text-white p-2">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Booking Details</h5>
                <Badge bg={getStatusBadge(booking.status)} className="text-uppercase">
                  {booking.status}
                </Badge>
              </div>
            </Card.Header>
            <Card.Body>
              <Row className="mb-4">
                <Col md={6}>
                  <h6 className="text-muted mb-3">Booking Information</h6>
                  <p className="mb-2">
                    <strong>Booking ID:</strong> {booking.bookingId}
                  </p>
                  <p className="mb-2">
                    <strong>Application No:</strong> {booking.applicationNo}
                  </p>
                  <p className="mb-2">
                    <strong>Type:</strong>{' '}
                    <Badge bg="info">{booking.bookingType}</Badge>
                  </p>
                  <p className="mb-2">
                    <strong>Booking For:</strong>{' '}
                    <Badge bg="primary">Guest</Badge>
                  </p>
                </Col>
                <Col md={6}>
                  <h6 className="text-muted mb-3">Dates & Location</h6>
                  <p className="mb-2">
                    <Calendar size={16} className="me-2 text-primary" />
                    <strong>Check-in:</strong> {formatDate(booking.checkIn)}
                  </p>
                  <p className="mb-2">
                    <Clock size={16} className="me-2 text-primary" />
                    <strong>Check-out:</strong> {formatDate(booking.checkOut)}
                  </p>
                  <p className="mb-2">
                    <MapPin size={16} className="me-2 text-primary" />
                    <strong>Location:</strong>{' '}
                    {booking.bookingType === 'room' ? booking.roomId?.sporti : booking.serviceId?.sporti}
                  </p>
                </Col>
              </Row>

              {booking.bookingType === 'room' && (
                <div className="mb-4">
                  <h6 className="text-muted mb-3">Room Details</h6>
                  <Row>
                    <Col md={6}>
                      <p className="mb-2">
                        <strong>Room Number:</strong> {booking.roomId?.roomNumber}
                      </p>
                      <p className="mb-2">
                        <strong>Category:</strong> {booking.roomId?.category}
                      </p>
                      <p className="mb-2">
                        <strong>Floor:</strong> {booking.roomId?.floor}
                      </p>
                    </Col>
                    <Col md={6}>
                      <p className="mb-2">
                        <strong>Facilities:</strong>
                      </p>
                      <ul className="list-unstyled">
                        {booking.roomId?.facilities.map((facility, index) => (
                          <li key={index} className="mb-1">
                            • {facility}
                          </li>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                </div>
              )}

              {booking.bookingType === 'service' && (
                <div className="mb-4">
                  <h6 className="text-muted mb-3">Service Details</h6>
                  <Row>
                    <Col md={6}>
                      <p className="mb-2">
                        <strong>Service Name:</strong> {booking.serviceId?.name}
                      </p>
                      <p className="mb-2">
                        <strong>Type:</strong> {booking.serviceId?.type}
                      </p>
                      <p className="mb-2">
                        <strong>Capacity:</strong> {booking.serviceId?.capacity} people
                      </p>
                    </Col>
                    <Col md={6}>
                      <h6 className="text-muted mb-3">Facilities</h6>
                      <hr />
                      <ul className="list-unstyled">
                        {booking.serviceId?.facilities.map((facility, index) => (
                          <li key={index} className="mb-1">
                            • {facility}
                          </li>
                        ))}
                      </ul>
                    </Col>
                  </Row>
                </div>
              )}

              <div className="border-top pt-4">
                <Row>
                  <Col md={12}>
                    <h6 className="text-muted mb-3 fw-bold">Payment Information</h6>
                    <hr />
                    <p className="mb-2 fs-3">
                      <CurrencyRupeeSharp size={16} className="me-2 text-success" />
                      <strong>Total Cost:</strong> ₹{booking.totalCost}
                    </p>
                    {booking.paymentStatus === 'paid' ? (
                      <Alert variant="success" className="mb-0 p-1 px-3">
                        <strong>Payment Status:</strong> Payment Completed
                      </Alert>
                    ) : (
                      <Alert variant="warning" className="mb-0">
                        <strong>Payment Status:</strong> Please Complete your Payment
                      </Alert>
                    )}
                    <br />
                    <hr />
                  </Col>
                  <Col md={12}>
                    <h6 className="text-muted mb-3 fw-bold mt-3">Additional Information</h6>
                    <hr />
                    {booking.remarks && (
                      <p className="mb-2">
                        <FileText size={16} className="me-2 text-primary" />
                        <strong>Remarks:</strong> {booking.remarks}
                      </p>
                    )}
                  </Col>
                </Row>
              </div>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={4}>
          <div className="card p-3 border-0 rounded-0">
            <div className="text-center mb-4">
              <div className="user-profile-img-wrapper mx-auto">
                <div className="user-profile-img-placeholder">
                  <img
                    src="https://t3.ftcdn.net/jpg/05/16/27/58/360_F_516275801_f3Fsp17x6HQK0xQgDQEELoTuERO4SsWV.jpg"
                    alt=""
                    width={100}
                    height={100}
                    className="rounded-circle border border-3 p-2"
                  />
                </div>
              </div>
              <h4 className="mt-3 fw-bold">Guest</h4>
              <p className="text-muted mb-0">Guest User</p>
            </div>
            <div className="user-profile-info">
              <div className="d-flex align-items-center mb-3">
                <Phone size={20} className="me-2" />
                <span>{guest?.phoneNumber}</span>
              </div>
              <div className="d-grid gap-2 mt-3">
                <Button
                  className="blue-btn m-0 rounded-1 border-0 w-100"
                  onClick={() => navigate('/guest/bookings')}
                >
                  Back to My Bookings
                </Button>
                {booking.status === 'pending' && (
                  <Button
                    className="btn btn-danger m-0 rounded-1 w-100 border-0"
                    onClick={() => {
                      // Handle cancellation (implement as needed)
                      setError('Cancellation not implemented yet');
                    }}
                  >
                    Cancel Booking
                  </Button>
                )}
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default GuestBookingDetails;