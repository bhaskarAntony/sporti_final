import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AlertContext from '../../context/AlertContext.jsx';
import { Check, User, Briefcase, Phone, CalendarCheck, CalendarX, Clock, MapPin, Users, Mail } from 'lucide-react';

const GuestConfirmBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { setSuccess, setError } = useContext(AlertContext);

  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(0);

  useEffect(() => {
    if (!location.state) {
      navigate('/');
      return;
    }

    setBookingData(location.state);

    if (location.state.formData.checkIn && location.state.formData.checkOut) {
      const checkInDate = new Date(location.state.formData.checkIn);
      const checkOutDate = new Date(location.state.formData.checkOut);
      const diffTime = Math.abs(checkOutDate - checkInDate);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNumberOfDays(diffDays);
    }
  }, [location.state, navigate]);

  const handleSubmit = async () => {
    setLoading(true);

    try {
      const dataToSubmit = {
        checkIn: bookingData.formData.checkIn,
        checkOut: bookingData.formData.checkOut,
        sporti: bookingData.formData.sporti,
        roomType: bookingData.formData.roomType,
        bookingFor: bookingData.formData.bookingFor,
        relation: bookingData.formData.relation,
        totalCost: bookingData.formData.totalCost,
        occupantDetails: {
          name: bookingData.occupantDetails.name,
          phoneNumber: bookingData.occupantDetails.phoneNumber,
          gender: bookingData.occupantDetails.gender,
          location: bookingData.occupantDetails.location,
          email: bookingData.occupantDetails.email,
        },
        officerDetails: {
          name: bookingData.officerDetails.name,
          designation: bookingData.officerDetails.designation,
          phoneNumber: bookingData.officerDetails.phoneNumber,
          email: bookingData.officerDetails.email,
        },
      };

      const response = await axios.post('https://nn-z4al.onrender.com/api/guest/room', dataToSubmit);

      if (response.data.success) {
        setSuccess(`Booking request submitted! Your application number is ${response.data.booking.applicationNumber}. Check status at /check-booking-status.`);
        navigate('/', {
          state: { applicationNumber: response.data.booking.applicationNumber },
        });
      } else {
        setError(response.data.message || 'Failed to create booking');
      }
    } catch (error) {
      console.error('Booking error:', error);
      setError(error.response?.data?.message || 'An error occurred while processing your booking');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    };
    return new Date(dateString).toLocaleString('en-US', options);
  };

  if (!bookingData) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading booking details...</p>
      </Container>
    );
  }

  return (
    <Container className="p-3 p-md-5 bg-light" fluid>
      <h2 className="mb-4">Confirm Your Booking Request</h2>
      <hr />
      <Row>
        <Col lg={12} className="position-sticky top-0">
          <Card className="shadow-sm rounded-0">
            <Card.Header className="bg-main text-white rounded-0">
              <h5 className="fs-5 m-0">Booking Confirmation</h5>
            </Card.Header>
            <Card.Body>
              <div className="row">
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-journal-check mx-2 small text-danger"></i>Booking Type
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">Room</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-building small text-success mx-2"></i>Building
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{bookingData.formData.sporti}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="small mb-0 fw-bold text-main">
                      <i className="bi bi-house small text-primary mx-2"></i>Room Type
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{bookingData.formData.roomType}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-calendar-check small text-success mx-2"></i>Check In
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{formatDate(bookingData.formData.checkIn)}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-calendar-x small text-danger mx-2"></i>Check Out
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{formatDate(bookingData.formData.checkOut)}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-clock small text-primary mx-2"></i>Duration
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{numberOfDays} day(s)</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-person-check small text-success mx-2"></i>Booking For
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{bookingData.formData.bookingFor}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-people small text-primary mx-2"></i>Relation
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{bookingData.formData.relation}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-person small text-success mx-2"></i>Occupant Name
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{bookingData.occupantDetails.name}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-gender-ambiguous small text-primary mx-2"></i>Occupant Gender
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{bookingData.occupantDetails.gender}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-telephone small text-success mx-2"></i>Occupant Phone
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{bookingData.occupantDetails.phoneNumber}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-envelope small text-primary mx-2"></i>Occupant Email
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{bookingData.occupantDetails.email}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-geo-alt small text-primary mx-2"></i>Occupant Location
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{bookingData.occupantDetails.location}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-person-badge small text-success mx-2"></i>Officer Name
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{bookingData.officerDetails.name}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-briefcase small text-primary mx-2"></i>Officer Designation
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{bookingData.officerDetails.designation}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-gender-ambiguous small text-success mx-2"></i>Officer Gender                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{bookingData.officerDetails.gender}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-telephone small text-primary mx-2"></i>Officer Phone                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{bookingData.officerDetails.phoneNumber}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-envelope small text-success mx-2"></i>Officer Email
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">{bookingData.officerDetails.email}</p>
                  </div>
                </div>
                <div className="col-md-3 col-6 mb-2">
                  <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold">
                      <i className="bi bi-currency-rupee small text-success mx-2"></i>Total Cost
                    </p>
                    <hr />
                    <p className="small mb-0 text-muted text-end">₹0 (Pending Room Assignment)</p>
                  </div>
                </div>
                <div className="col-md-6 mt-4">
                  <div className="d-flex align-items-end justify-content-end gap-1 flex-wrap h-100">
                    <Button
                      onClick={handleSubmit}
                      disabled={loading}
                      className="btn blue-btn border-0 m-0 rounded-1 p-2"
                    >
                      {loading ? (
                        <>
                          <Spinner animation="border" size="sm" className="me-2" />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Check size={20} className="me-2" />
                          Submit Booking Request
                        </>
                      )}
                    </Button>
                    <Button
                      variant="danger"
                      className="px-4"
                      onClick={() => navigate(-1)}
                      disabled={loading}
                    >
                      Back
                    </Button>
                  </div>
                </div>
              </div>
              <hr />
              <div className="p-3 rounded alert alert-warning rounded-0">
                <h6 className="mb-3">Important Notes</h6>
                <ul className="small mb-0">
                  <li>Your booking request requires admin approval.</li>
                  <li>A room and pricing will be assigned upon approval.</li>
                  <li>You will receive an application number to track your booking status at /check-booking-status.</li>
                  <li>Payments are to be made at the venue during check-in using digital, cheque, or DD.</li>
                  <li>Cancellation is allowed up to 24 hours before check-in.</li>
                  <li>Please carry a valid ID proof during check-in.</li>
                </ul>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GuestConfirmBooking;