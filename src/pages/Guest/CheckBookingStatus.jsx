import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import axios from 'axios';
import AlertContext from '../../context/AlertContext.jsx';
import { Search, Hash, BedDouble, MapPin, CalendarCheck, CalendarX, Clock, Users, DollarSign, User, Briefcase, Phone, Mail, Check } from 'lucide-react';

const CheckBookingStatus = () => {
  const { setError } = useContext(AlertContext);
  const [applicationNumber, setApplicationNumber] = useState('');
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fetchError, setFetchError] = useState(null);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!applicationNumber.trim()) {
      setError('Please enter a valid application number');
      setFetchError('Please enter a valid application number');
      return;
    }

    setLoading(true);
    setFetchError(null);
    setBooking(null);

    try {
      const response = await axios.get(`https://nn-z4al.onrender.com/api/bookings`, {
        params: { applicationNumber: applicationNumber.trim(), userId: 'null', isNonMember: true },
      });

      if (response.data.success && response.data.bookings.length > 0) {
        setBooking(response.data.bookings[0]);
      } else {
        setFetchError('Booking not found');
      }
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'An error occurred while fetching booking details';
      setFetchError(errorMessage);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  const calculateDuration = (checkIn, checkOut) => {
    const checkInDate = new Date(checkIn);
    const checkOutDate = new Date(checkOut);
    const diffTime = Math.abs(checkOutDate - checkInDate);
    return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
      case 'success':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'danger';
      case 'cancelled':
        return 'secondary';
      case 'completed':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <Container fluid className="p-3 p-md-5 bg-light">
      <h2 className="mb-4">Check Booking Status</h2>
      <hr />
      <Row className="justify-content-center">
        <Col md={6} className="mb-4">
          <Card className="shadow-sm border-0 rounded-0">
            <Card.Header className="p-3 bg-main text-white">
              <h5 className="m-0">Search Booking</h5>
            </Card.Header>
            <Card.Body className="p-3">
              <Form onSubmit={handleSearch}>
                <Form.Group className="mb-3">
                  <Form.Label>Application Number</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter 10-character application number"
                    value={applicationNumber}
                    onChange={(e) => setApplicationNumber(e.target.value.toUpperCase())}
                    maxLength={10}
                    required
                  />
                </Form.Group>
                {fetchError && <Alert variant="danger">{fetchError}</Alert>}
                <div className="d-flex justify-content-end">
                  <Button
                    type="submit"
                    className="blue-btn border-0"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search size={20} className="me-2" />
                        Search
                      </>
                    )}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      {booking && (
        <Row className="justify-content-center">
          <Col md={8} className="mb-4">
            <Card className="shadow-sm border-0 rounded-0">
              <Card.Header className="p-3 bg-main text-white">
                <h5 className="m-0">Booking Details</h5>
              </Card.Header>
              <Card.Body className="p-3">
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0"><Check name="Hash" size={16} className="me-1" />Application Number</p>
                  <p className="fs-6 mb-0">{booking.applicationNumber}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0">Status</p>
                  <p className="fs-6 mb-0">
                    <span className={`badge bg-${getStatusBadge(booking.status)}`}>
                      {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                    </span>
                  </p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0">Booking Type</p>
                  <p className="fs-6 mb-0">Room</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0"><MapPin size={16} className="me-1" /> Building</p>
                  <p className="fs-6 mb-0">{booking.sporti}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0"><BedDouble size={16} className="me-1" /> Room Type</p>
                  <p className="fs-6 mb-0">{booking.roomType}</p>
                </div>
                {booking.roomId && (
                  <>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <p className="fs-6 mb-0"><BedDouble size={16} className="me-1" /> Room Number</p>
                      <p className="fs-6 mb-0">{booking.roomId.roomNumber}</p>
                    </div>
                  </>
                )}
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0"><CalendarCheck size={16} className="me-1" /> Check-In</p>
                  <p className="fs-6 mb-0">{formatDate(booking.checkIn)}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0"><CalendarX size={16} className="me-1" /> Check-Out</p>
                  <p className="fs-6 mb-0">{formatDate(booking.checkOut)}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0"><Clock size={16} className="me-1" /> Duration</p>
                  <p className="fs-6 mb-0">{calculateDuration(booking.checkIn, booking.checkOut)} day(s)</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0"><Users size={16} className="me-1" /> Booking For</p>
                  <p className="fs-6 mb-0">{booking.bookingFor}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0">Relation</p>
                  <p className="fs-6 mb-0">{booking.relation}</p>
                </div>
                {booking.totalCost > 0 && (
                  <>
                    <hr />
                    <div className="d-flex justify-content-between">
                      <p className="fs-6 mb-0"><DollarSign size={16} className="me-1" /> Total Cost</p>
                      <p className="fs-6 mb-0">₹${booking.totalCost.toLocaleString('en-IN')}</p>
                    </div>
                  </>
                )}
                <hr />
                <h6 className="mb-3">Occupant Details</h6>
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0"><User size={16} className="me-1" /> Name</p>
                  <p className="fs-6 mb-0">{booking.occupantDetails.name}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0">Gender</p>
                  <p className="fs-6 mb-0">{booking.occupantDetails.gender}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0"><Phone size={16} className="me-1" /> Phone</p>
                  <p className="fs-6 mb-0">{booking.occupantDetails.phoneNumber}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0"><Mail size={16} className="me-1" /> Email</p>
                  <p className="fs-6 mb-0">{booking.occupantDetails.email}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0"><MapPin size={16} className="me-1" /> Location</p>
                  <p className="fs-6 mb-0">{booking.occupantDetails.location}</p>
                </div>
                <hr />
                <h6 className="mb-3">Officer Details</h6>
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0"><User size={16} className="me-1" /> Name</p>
                  <p className="fs-6 mb-0">{booking.officerDetails.name}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0"><Briefcase size={16} className="me-1" /> Designation</p>
                  <p className="fs-6 mb-0">{booking.officerDetails.designation}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0">Gender</p>
                  <p className="fs-6 mb-0">{booking.officerDetails.gender}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0"><Phone size={16} className="me-1" /> Phone</p>
                  <p className="fs-6 mb-0">{booking.officerDetails.phoneNumber}</p>
                </div>
                <hr />
                <div className="d-flex justify-content-between">
                  <p className="fs-6 mb-0"><Mail size={16} className="me-1" /> Email</p>
                  <p className="fs-6 mb-0">{booking.officerDetails.email}</p>
                </div>
                <hr />
                <Alert variant={getStatusBadge(booking.status)}>
                  {booking.status === 'pending' && 'Your booking is awaiting admin approval. Please check back later.'}
                  {booking.status === 'confirmed' && 'Your booking is confirmed. Please proceed with payment at check-in.'}
                  {booking.status === 'success' && 'Your booking is confirmed and active.'}
                  {booking.status === 'rejected' && 'Your booking request was rejected. Please contact support for details.'}
                  {booking.status === 'completed' && 'Your booking is completed.'}
                </Alert>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CheckBookingStatus;