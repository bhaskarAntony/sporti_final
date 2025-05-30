import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Badge, Button, Spinner } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { User, Calendar, Clock, MapPin } from 'lucide-react';
import axios from 'axios';
import AuthContext from '../../context/AuthContext.jsx';
import AlertContext from '../../context/AlertContext.jsx';

const MyGuests = () => {
  const { user } = useContext(AuthContext);
  const { setError } = useContext(AlertContext);
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState([]);
  
  useEffect(() => {
    const fetchGuests = async () => {
      try {
        const response = await axios.get('https://nn-z4al.onrender.com/api/guests/my-guests');
        if (response.data.success) {
          setGuests(response.data.guests);
        }
      } catch (error) {
        console.error('Error fetching guests:', error);
        setError('Failed to fetch your guests');
      } finally {
        setLoading(false);
      }
    };
    
    fetchGuests();
  }, [setError]);
  
  const getStatusBadge = (status) => {
    switch (status) {
      case 'approved':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'danger';
      default:
        return 'secondary';
    }
  };
  
  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" variant="primary" />
        <p className="mt-3">Loading your guests...</p>
      </Container>
    );
  }
  
  return (
    <Container className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">My Guests</h2>
        <Link to="/guest-booking">
          <Button variant="primary">
            Add Guest Booking
          </Button>
        </Link>
      </div>
      
      {guests.length === 0 ? (
        <Card className="text-center py-5">
          <Card.Body>
            <h4>No guests found</h4>
            <p className="text-muted">You haven't made any guest bookings yet.</p>
            <Link to="/guest-booking">
              <Button variant="primary">Book for a Guest</Button>
            </Link>
          </Card.Body>
        </Card>
      ) : (
        <Row>
          {guests.map((guest) => (
            <Col key={guest._id} md={6} lg={4} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Header className="bg-white">
                  <div className="d-flex justify-content-between align-items-center">
                    <h5 className="mb-0">{guest.name}</h5>
                    <Badge bg={getStatusBadge(guest.status)}>
                      {guest.status}
                    </Badge>
                  </div>
                </Card.Header>
                
                <Card.Body>
                  <div className="mb-3">
                    <div className="d-flex align-items-center mb-2">
                      <User size={18} className="me-2 text-primary" />
                      <small>
                        <strong>Relationship:</strong> {guest.relationship}
                      </small>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <Calendar size={18} className="me-2 text-primary" />
                      <small>
                        <strong>Age:</strong> {guest.age}
                      </small>
                    </div>
                    <div className="d-flex align-items-center mb-2">
                      <MapPin size={18} className="me-2 text-primary" />
                      <small>
                        <strong>Phone:</strong> {guest.phoneNumber}
                      </small>
                    </div>
                  </div>
                  
                  <div>
                    <strong>Interests:</strong>
                    <div className="mt-2">
                      {guest.interests.map((interest, index) => (
                        <Badge key={index} bg="info" className="me-2 mb-2">
                          {interest}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </Card.Body>
                
                <Card.Footer className="bg-white">
                  <Link to={`/guest/${guest._id}`}>
                    <Button variant="outline-primary" size="sm" className="w-100">
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

export default MyGuests;