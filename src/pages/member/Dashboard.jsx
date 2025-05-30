import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Button, Spinner, Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Calendar, CheckSquare, Clock, Users, Home, BookOpen, ArrowRight, Verified, User, Check, MapPin } from 'lucide-react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext.jsx';
import AlertContext from '../../context/AlertContext.jsx';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { setError } = useContext(AlertContext);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    confirmed: 0,
    upcomingBookings: []
  });
  
  useEffect(() => {
    const fetchBookings = async () => {
      try {
        const response = await axios.get('https://nn-z4al.onrender.com/api/bookings/my-bookings');
        if (response.data.success) {
          setBookings(response.data.bookings);
          
          // Calculate stats
          const total = response.data.bookings.length;
          const pending = response.data.bookings.filter(b => b.status === 'pending').length;
          const confirmed = response.data.bookings.filter(b => b.status === 'confirmed'||'completed').length;
          
          // Get upcoming bookings (confirmed bookings with future check-in dates)
          const now = new Date();
          const upcomingBookings = response.data.bookings
            .filter(b => b.status === 'confirmed' || 'completed' && new Date(b.checkIn) > now)
            .sort((a, b) => new Date(a.checkIn) - new Date(b.checkIn))
            .slice(0, 3);
          
          setStats({
            total,
            pending,
            confirmed,
            upcomingBookings
          });
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
  
  // Format date for display
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };
  
  // Get status badge variant
  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'cancelled':
        return 'danger';
      case 'completed':
        return 'info';
      default:
        return 'secondary';
    }
  };
  
  return (
    <Container className="p-3 p-md-5 bg-light" fluid>
     <div className="d-flex justify-content-between flex-wrap gap-4 align-items-center w-100">
       <div>
          <h2 className="mb-0 fs-3">Welcome {user.name}</h2>
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
      
      <Row className="mb-4">
        <Col md={4} className='mb-3'>
          <Card className="h-100 stats-card border-0 py-2 border-bottom border-5 border-primary shadow">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-info border border-2 border-primary bg-opacity-10 p-3 me-3">
                <Calendar size={24} color="#0056b3" />
              </div>
              <div>
                <h3 className="mb-0 fs-1 fw-bold">{stats.total}</h3>
                <p className="fs-5 mb-0">Total Bookings</p>
                 <small>Till Date</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className='mb-3'>
          <Card className="h-100 stats-card border-0 py-2 border-bottom border-5 border-success shadow">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-success border border-2 border-success bg-opacity-10 p-3 me-3">
                <CheckSquare size={24} color="#28a745" />
              </div>
              <div>
                <h3 className="mb-0 fs-1 fw-bold">{stats.confirmed}</h3>
                <p className="fs-5 mb-0">Confirmed Bookings</p>
                <small>Till Date</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
        
        <Col md={4} className='mb-3'>
          <Card className="h-100 stats-card border-0 py-2 border-bottom border-5 border-warning shadow">
            <Card.Body className="d-flex align-items-center">
              <div className="rounded-circle bg-warning border border-2 border-warning bg-opacity-10 p-3 me-3">
                <Clock size={24} color="#ffc107" />
              </div>
              <div>
                <h3 className="mb-0 fs-1 fw-bold">{stats.upcomingBookings?.length}</h3>
                <p className="mb-0 fs-5">Upcoming Bookings</p>
                 <small>As On Today</small>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      
      <Row>
      <Col lg={4}>
          <Card className="shadow-sm mb-4">
            <Card.Header className="bg-main text-white">
              <h5 className="mb-0">Your Profile</h5>
            </Card.Header>
            <Card.Body>
              <div className="text-center mb-4">
                <div className="rounded-circle bg-success bg-opacity-10 bg-opacity-10 d-flex align-items-center justify-content-center mx-auto mb-3" style={{ width: '80px', height: '80px' }}>
                  <Users size={40} className='text-success' />
                </div>
                <h5 className="mb-1">{user.name}</h5>
                <p className="text-muted mb-0 small">{user.designation}</p>
              </div>
              
              <hr />
              
              <div>
                <p className="mb-2"><strong>Email:</strong> {user.email}</p>
                <p className="mb-2"><strong>Phone:</strong> {user.phoneNumber}</p>
                <p className="mb-2"><strong>Reference Code:</strong> {user.referenceCode}</p>
              </div>
              
              <div className="d-grid gap-2 mt-3">
                <Link to="/profile">
                  <Button  className="blue-btn border-0 w-100 rounded-1">
                    Update Profile
                  </Button>
                </Link>
                <Link to="/my-guests">
                  <Button variant="dark" className="w-100 rounded-1">
                    <Users size={18} className="me-2" />
                    My Guests
                  </Button>
                </Link>
              </div>
            </Card.Body>
          </Card>
          
          <Card className="shadow-sm">
            <Card.Header className="bg-main text-white">
              <h5 className="mb-0">Quick Links</h5>
            </Card.Header>
            <Card.Body>
              <ul className="list-unstyled">
                <li className="mb-2">
                  <Link to="/book-room" className="text-dark">
                    <Home size={18} className="me-2" />
                    Book a Room
                  </Link>
                </li>
                <hr />
                <li className="mb-2">
                  <Link to="/book-service" className="text-dark">
                    <BookOpen size={18} className="me-2" />
                    Book a Service
                  </Link>
                </li>
                <hr />
                <li className="mb-2">
                  <Link to="/my-bookings" className="text-dark">
                    <Calendar size={18} className="me-2" />
                    My Bookings
                  </Link>
                </li>
                <hr />
                <li>
                  <Link to="/guest-booking" className=" text-dark">
                    <Users size={18} className="me-2" />
                    Guest Booking
                  </Link>
                </li>
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={8} className="mb-4">
          <Card className="shadow-sm h-100 border-0">
            <Card.Header className="bg-main text-white">
              <div className="d-flex justify-content-between align-items-center">
                <h5 className="mb-0">Upcoming Bookings</h5>
                <Link to="/my-bookings" className="text-decoration-none small text-white">
                  View All <ArrowRight size={14} />
                </Link>
              </div>
            </Card.Header>
            <Card.Body className="p-4">
              {loading ? (
                <div className="text-center py-4">
                  <Spinner animation="border" variant="primary" />
                </div>
              ) : stats.upcomingBookings.length === 0 ? (
                <div className="text-center py-4">
                  <p className="text-muted mb-0">No upcoming bookings found.</p>
                  <Link to="/book-room">
                    <Button variant="primary" size="sm" className="mt-2">
                      Book Now
                    </Button>
                  </Link>
                </div>
              ) : (
               <>
                <div className='d-none d-md-block'>
                  {stats.upcomingBookings.map((booking) => (
                    <Card key={booking._id} className={`mb-3 border-0 ${booking.status=='confirmed' ? 'border-start border-4 border-success bg-success bg-opacity-10' : 'bg-warning bg-opacity-10 border-4 border-warning border-start'}`}>
                      <Card.Body>
                        <Row>
                          <Col md={7}>
                            <div className="d-flex align-items-start">
                              <div className="me-3">
                                {booking.bookingType === 'room' ? (
                                  <Home size={24} className="text-primary" />
                                ) : (
                                  <BookOpen size={24} className="text-primary" />
                                )}
                              </div>
                              <div>
                                <h6 className="mb-1">
                                  {booking.bookingType === 'room' ? (
                                    <>{booking.roomId?.category} Room - {booking.roomId?.roomNumber}</>
                                  ) : (
                                    <>{booking.serviceId?.name}</>
                                  )}
                                </h6>
                                <div className="mb-2">
                                  <Badge bg={getStatusBadge(booking.status)} className="me-2 rounded-pill">
                                    {booking.status}
                                  </Badge>
                                  {booking.bookingFor === 'Guest' && (
                                    <Badge bg="info">Guest Booking</Badge>
                                  )}
                                </div>
                                <p className="small text-muted mb-0 d-flex flex-wrap gap-3">
                                  <span className="border small p-1 px-2 border-dark rounded-pill">
                                    <strong>Check-in:</strong> {formatDate(booking.checkIn)}
                                  </span>
                                  <span className='border small p-1 px-2 border-dark rounded-pill'>
                                    <strong>Check-out:</strong> {formatDate(booking.checkOut)}
                                  </span>
                                </p>
                              </div>
                            </div>
                          </Col>
                          <Col md={5} className="d-flex align-items-center justify-content-md-end mt-3 mt-md-0">
                            <div className="text-end">
                              <p className="mb-1"><strong>Booking ID:</strong> {booking.bookingId}</p>
                              <Link to={`/booking/${booking._id}`}>
                                <Button variant={booking.status=='confirmed'?'success':'warning' } size="sm">
                                  View Details
                                </Button>
                              </Link>
                            </div>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  ))}
                </div>
                <Row className='d-block d-md-none'>
                  {
                    stats.upcomingBookings.map((booking)=>(
                      <Col key={booking._id} md={6} lg={4} className="mb-4">
                              <Card className={`h-100 shadow border-1 rounded-1`}>
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
                    ))
                  }
                </Row>
               </>
              )}
            </Card.Body>
          </Card>
        </Col>
        
       
      </Row>
    </Container>
  );
};

export default Dashboard;