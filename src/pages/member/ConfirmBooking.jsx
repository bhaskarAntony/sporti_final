import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Alert, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext.jsx';
import AlertContext from '../../context/AlertContext.jsx';
import {
  Check, User, Briefcase, Phone, CalendarCheck, CalendarX, Clock, MapPin, BedDouble, Hash, Users
} from 'lucide-react';

const ConfirmBooking = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { user, token } = useContext(AuthContext);
  const { setSuccess, setError } = useContext(AlertContext);

  const [loading, setLoading] = useState(false);
  const [bookingData, setBookingData] = useState(null);
  const [numberOfDays, setNumberOfDays] = useState(0);

  useEffect(() => {
    if (!location.state) {
      navigate('/dashboard');
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
      const dataToSubmit = { ...bookingData.formData, occupantDetails: bookingData.occupantDetails };
      if (!user) {
        dataToSubmit.officerDetails = bookingData.officerDetails;
      }

      const endpoint = 'https://nn-z4al.onrender.com/api/bookings/room';

      const response = await axios.post(endpoint, dataToSubmit, {
        headers: { Authorization: `Bearer ${token}` }
      });

      if (response.data.success) {
        setSuccess(response.data.message);
        navigate('/my-bookings');
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
      // hour: '2-digit',
      // minute: '2-digit'
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
      <h2 className="mb-4">Confirm Your Booking</h2>
      <hr />
      <Row>
        <Col lg={12} className='position-sticky top-0'>
          <Card className="shadow-sm rounded-0">
            <Card.Header className="bg-main text-white rounded-0">
              <h5 className="fs-5 m-0">Booking Confirmation</h5>
            </Card.Header>
            <Card.Body>
             <div className="row">
              <div className="col-md-3 col-6 mb-2">
                 <div className="card border p-2 h-100">
                <p className="text-main small mb-0  fw-bold"><i class="bi bi-journal-check mx-2 small text-danger"></i>Booking Type</p>
                 <hr />
                <p className="small mb-0 text-muted  text-end">Room</p>
              </div>
              </div>
              <div className="col-md-3 col-6 mb-2">
                 <div className="card border p-2 h-100">
                <p className="text-main small mb-0  fw-bold"><i class="bi bi-building small text-success mx-2"></i>Building</p>
                 <hr />
                <p className="small mb-0 text-muted  text-end">{bookingData.formData.sporti}</p>
              </div>
              </div>
              <div className="col-md-3 col-6 mb-2">
                 <div className="card border p-2 h-100">
                <p className="small mb-0 fw-bold text-main"> <i class="bi bi-house small text-primary mx-2"></i>Room Type</p>
                 <hr />
                <p className="small mb-0 text-muted  text-end">{bookingData.formData.roomType}</p>
              </div>
              </div>
               {bookingData.formData.roomId && bookingData.selectedRoom && (
                <>
                 <div className="col-md-3 col-6 mb-2">
                   <div className="card border p-2 h-100">
                    <p className="text-main small mb-0 fw-bold"><i class="bi bi-1-square mx-2 text-success small"></i>Room No.</p>
                     <hr />
                    <p className="small mb-0 text-muted  text-end">{bookingData.selectedRoom.roomNumber}</p>
                  </div>
                 </div>
                 {/* <div className="col-md-3 col-6">
                  <div className="card border p-2">
                    <p className="small mb-0">FLOOR</p>
                    <p className="small mb-0">{bookingData.selectedRoom.floor}</p>
                  </div>
                 </div> */}
                 <div className="col-md-3 col-6 mb-2">
                    <div className="card border p-2  h-100">
                <p className="text-main small mb-0  fw-bold "> <i class="bi bi-calendar-check small text-success mx-2"></i>Check In</p>
                 <hr />
                <p className="small mb-0 text-muted  text-end">{formatDate(bookingData.formData.checkIn)}</p>
              </div>
                 </div>

                 <div className="col-md-3 col-6 mb-2">
                   <div className="card border p-2  h-100">
                <p className="text-main small mb-0  fw-bold"> <i class="bi bi-calendar-x small text-danger mx-2"></i>Check Out</p>
                 <hr />
                <p className="small mb-0 text-muted  text-end">{formatDate(bookingData.formData.checkOut)}</p>
              </div>
                 </div>

                 <div className="col-md-3 col-6 mb-2">
                    <div className="card border p-2  h-100">
                <p className="text-main small mb-0  fw-bold"> <i class="bi bi-clock small text-primary mx-2"></i>Duration</p>
                <hr />
                <p className="small mb-0 text-muted  text-end">{numberOfDays} day(s)</p>
              </div>
                 </div>
                 <div className="col-md-3 col-6 mb-2">
                    <div className="card border p-2  h-100">
                <p className="text-main small mb-0  fw-bold"> <i class="bi bi-person-check small text-success mx-2"></i>Booking For</p>
                <hr />
                <p className="small mb-0 text-muted  text-end">{bookingData.formData.bookingFor}</p>
              </div>
                 </div>
                 {/* <div className="col-md-6">
                   <div className="card border p-2">
                <p className="small mb-0">RELATION</p>
                <p className="small mb-0">{bookingData.formData.relation}</p>
              </div>
                 </div> */}
                 {/* <div className="col-md-">
                   <div className="card border p-2">
                <p className="small mb-0">OCCUPANT NAME</p>
                <p className="small mb-0">{bookingData.occupantDetails.name}</p>
              </div>
                 </div>
                 <div className="col-md-3 col-6">
                   <div className="card border p-2">
                <p className="small mb-0">OCCUPANT GENDER</p>
                <p className="small mb-0">{bookingData.occupantDetails.gender}</p>
              </div>
                 </div>

                 <div className="col-md-3 col-6">
                   <div className="card border p-2">
                <p className="small mb-0">OCCUPANT PHONE</p>
                <p className="small mb-0">{bookingData.occupantDetails.phoneNumber}</p>
              </div>
                 </div>
                 <div className="col-md-3 col-6">
                    <div className="card border p-2">
                <p className="small mb-0">OCCUPANT LOCATION</p>
                <p className="small mb-0">{bookingData.occupantDetails.location}</p>
              </div>
                 </div> */}

                   {/* {!user && bookingData.officerDetails && (
                <>
                 <div className="col-md-3 col-6">
                   <div className="card border p-2">
                    <p className="small mb-0">OFFICER NAME</p>
                    <p className="small mb-0">{bookingData.officerDetails.name}</p>
                  </div>
                 </div>
                 
                 
                  <div className="col-md-3 col-6">
                    <div className="card border p-2">
                    <p className="small mb-0">OFFICER GENDER</p>
                    <p className="small mb-0">{bookingData.officerDetails.gender}</p>
                  </div>
                  </div>

                  <div className="col-md-3 col-6">
                     <div className="card border p-2">
                    <p className="small mb-0">OFFICER PHONE</p>
                    <p className="small mb-0">{bookingData.officerDetails.phoneNumber}</p>
                  </div>
                  </div>
                 
                </>
              )} */}
                  
                <div className="col-md-3 col-6">
                    <div className="card border p-2 h-100">
                    <p className="small mb-0 fw-bold text-main"><i class="bi bi-currency-rupee small text-success mx-2"></i> Price/Day</p>
                    <hr />
                    <p className="small mb-0  text-muted text-end">
                      ₹{(bookingData.formData.bookingFor === 'Self' || bookingData.formData.relation === 'Batchmate' ? bookingData.selectedRoom.price.member : bookingData.selectedRoom.price.guest).toLocaleString()}
                    </p>
                  </div>
                </div>
                </>
              )}

               {bookingData.formData.roomId && (
                <>
                 <div className="col-md-3 col-6">
                   <div className="card border p-2 h-100">
                    <p className="small mb-0 fw-bold text-main"><i class="bi bi-currency-rupee small text-success mx-2"></i> Total</p>
                    <hr />
                    <p className="small mb-0 text-muted  text-end">₹ {bookingData.formData.totalCost.toLocaleString()} /-</p>
                  </div>
                 </div>
                </>
              )}
              <div className="col-md-6 mt-4">
                 <div className="d-flex align-items-end justify-content-end gap-1 flex-wrap h-100 ">
                <Button
                  onClick={handleSubmit}
                  disabled={loading}
                  className="blue-btn border-0 m-0 rounded-1 p-2"
                >
                  {loading ? (
                    <>
                      <Spinner animation="border" size="sm" className="me-2" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Check size={20} className="me-2" />
                      Confirm Booking
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
                  <li>Payments are to be made at the venue during check-in. complete your payment using Digital, cheque or DD</li>
                  <li>Cancellation is allowed up to 24 hours before check-in.</li>
                  {/* <li>Guest bookings {bookingData.formData.bookingFor === 'Guest' && bookingData.formData.relation !== 'Batchmate' ? 'require admin approval and room assignment.' : 'for Batchmates are confirmed immediately.'}</li> */}
                  {!bookingData.formData.roomId && (
                    <li>Pricing will be confirmed after a room is assigned by the admin.</li>
                  )}
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

export default ConfirmBooking;