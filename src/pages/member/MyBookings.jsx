import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BookOpen, Calendar, Check, Clock, MapPin, User, Verified } from 'lucide-react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext.jsx';
import AlertContext from '../../context/AlertContext.jsx';

const MyBookings = () => {
  const { user } = useContext(AuthContext);
  const { setError } = useContext(AlertContext);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://nn-z4al.onrender.com/api/bookings/my-bookings');
        if (response.data.success) {
          setBookings(response.data.bookings);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Failed to fetch your bookings');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBookings();
  }, [setError]);
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
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
  
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading your bookings...</p>
      </Container>
    );
  }
  
  return (
    <Container className="p-3 p-md-5 bg-light" fluid>
      
       <div className="d-flex justify-content-between flex-wrap gap-4 align-items-center w-100">
             <div>
                <h2 className="mb-0 fs-3">My Bookings</h2>
              </div>
              <hr />
              <div className="d-flex align-items-center justify-content-center  flex-wrap gap-2">
                <Link to="/book-room">
                  <Button className='blue-btn border-0 m-0'>
                    <Calendar size={18} className="me-2" />
                    Book Room
                  </Button>
                </Link>
                <Link to="/book-service">
                  <Button className="blue-btn border-0 m-0">
                    <BookOpen size={18} className="me-2" />
                    Book Service
                  </Button>
                </Link>
              </div>
             </div>
             <hr />
      
      {bookings.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <h4>No bookings found</h4>
            <p className="text-muted">You haven't made any bookings yet.</p>
            <Link to="/book-room">
              <Button variant="primary">Book Now</Button>
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {bookings.map((booking) => (
            <Col key={booking._id} md={6} lg={4} className="mb-4">
              <Card className={`h-100 shadow-sm border-0 rounded-1`}>
                <Card.Header className="bg-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <span  className={`text-uppercase small rounded-pill px-3 border bg-none ${booking.status === 'confirmed' ? 'border-success text-success border-1' : 'text-warning border-warning border-1'}`}>
                      <Verified size={18}/> {booking.status}
                    </span>
                    <small className="text-muted">#{booking.bookingId}</small>
                  </div>
                </Card.Header>
                
                <Card.Body>
                  <h5 className="mb-3">
                    {booking.bookingType === 'room' ? (
                      <>
                        {booking.roomId?.category} Room - {booking.roomId?.roomNumber}
                      </>
                    ) : (
                      <>{booking.serviceId?.name}</>
                    )}
                  </h5>
                  
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <Calendar size={18} className="me-2 text-primary" />
                      <small>
                        <strong>Check-in:</strong> {formatDate(booking.checkIn)}
                      </small>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <Clock size={18} className="me-2 text-primary" />
                      <small>
                        <strong>Check-out:</strong> {formatDate(booking.checkOut)}
                      </small>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <MapPin size={18} className="me-2 text-primary" />
                      <small>
                        {booking.bookingType === 'room' ? booking.roomId?.sporti : booking.serviceId?.sporti}
                      </small>
                    </div>
                    {booking.bookingFor === 'Guest' && (
                      <div className="d-flex align-items-center">
                        <User size={18} className="me-2 text-primary" />
                        <small>
                          <strong>Guest:</strong> {booking.guestId?.name}
                        </small>
                      </div>
                    )}
                  </div>
                  <hr />
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>Total Cost:</strong>
                      <h5 className="mb-0">₹{booking.totalCost}</h5>
                    </div>
                    <Badge className='rounded-pill px-3' bg={booking.paymentStatus === 'paid' ? 'success' : 'warning'}>
                      <Check size={18}/> {booking.paymentStatus}
                    </Badge>
                  </div>
                </Card.Body>
                
                <Card.Footer className="bg-white">
                  <Link to={`/booking/${booking._id}`}>
                    <Button  size="sm" className="w-100 p-2 blue-btn border-0">
                      View Details
                    </Button>
                  </Link>
                </Card.Footer>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
};

export default MyBookings;