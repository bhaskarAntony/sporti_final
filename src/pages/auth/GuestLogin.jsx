import React, { useState, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { Users } from 'lucide-react';
import AuthContext from '../../context/AuthContext.jsx';
import AlertContext from '../../context/AlertContext.jsx';

const GuestLogin = () => {
  const [referenceCode, setReferenceCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [memberDetails, setMemberDetails] = useState(null);
  
  const { guestLogin } = useContext(AuthContext);
  const { setSuccess } = useContext(AlertContext);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!referenceCode) {
      setError('Please enter a reference code');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await guestLogin(referenceCode);
      
      if (result.success) {
        setSuccess('Reference code verified!');
        setMemberDetails(result.member);
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };
  
  const handleProceed = () => {
    // Store member details in localStorage to be used in the guest booking form
    localStorage.setItem('referredBy', JSON.stringify(memberDetails));
    navigate('/guest-booking');
  };
  
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <Users size={40} color="#0056b3" />
                <h2 className="mt-2 mb-4">Guest Login</h2>
                <p className="text-muted">
                  Enter the reference code provided by a SPORTI Club member to proceed with your booking.
                </p>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              {memberDetails ? (
                <div>
                  <Alert variant="success">
                    Reference code verified successfully!
                  </Alert>
                  
                  <div className="mb-4">
                    <h5>Member Details:</h5>
                    <p className="mb-1"><strong>Name:</strong> {memberDetails.name}</p>
                    <p className="mb-1"><strong>Designation:</strong> {memberDetails.designation}</p>
                    <p className="mb-0"><strong>Reference Code:</strong> {memberDetails.referenceCode}</p>
                  </div>
                  
                  <Button
                    variant="primary"
                    onClick={handleProceed}
                    className="w-100 mb-3"
                  >
                    Proceed to Booking
                  </Button>
                </div>
              ) : (
                <Form onSubmit={handleSubmit}>
                  <Form.Group className="mb-4">
                    <Form.Label>Reference Code</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter member reference code"
                      value={referenceCode}
                      onChange={(e) => setReferenceCode(e.target.value)}
                      required
                    />
                    <Form.Text className="text-muted">
                      This code was provided by the SPORTI Club member who referred you.
                    </Form.Text>
                  </Form.Group>
                  
                  <Button
                    variant="primary"
                    type="submit"
                    className="w-100 mb-3"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                          className="me-2"
                        />
                        Verifying...
                      </>
                    ) : (
                      'Verify Code'
                    )}
                  </Button>
                </Form>
              )}
              
              <div className="text-center mt-3">
                <p className="mb-0">
                  Are you a member?{' '}
                  <Link to="/login" className="text-decoration-none">
                    Member Login
                  </Link>
                </p>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GuestLogin;