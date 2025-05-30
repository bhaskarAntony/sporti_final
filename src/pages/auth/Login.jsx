import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import AuthContext from '../context/AuthContext';
import AlertContext from '../context/AlertContext';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const { login, isAuthenticated } = useContext(AuthContext);
  const { setSuccess } = useContext(AlertContext);
  const navigate = useNavigate();
  
  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (isAuthenticated) {
      navigate('/admin/reports');
    }
  }, [isAuthenticated, navigate]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }
    
    setLoading(true);
    
    try {
      const result = await login(email, password);
      
      if (result.success) {
        setSuccess('Login successful!');
        
        // Redirect based on user role
        if (result.user.role === 'admin') {
          navigate('/admin');
        } else {
          navigate('/admin/reports');
        }
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
  
  return (
    <Container className="py-5">
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              <div className="text-center mb-4">
                <LogIn size={40} color="#0056b3" />
                <h2 className="mt-2 mb-4">Login to Your Account</h2>
              </div>
              
              {error && <Alert variant="danger">{error}</Alert>}
              
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </Form.Group>
                
                <Form.Group className="mb-4">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
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
                      Logging in...
                    </>
                  ) : (
                    'Login'
                  )}
                </Button>
              </Form>
              
              <div className="text-center mt-3">
                <p>
                  <Link to="/forgot-password" className="text-decoration-none">
                    Forgot password?
                  </Link>
                </p>
                <p className="mb-0">
                  Are you a guest?{' '}
                  <Link to="/guest-login" className="text-decoration-none">
                    Guest Login
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

export default Login;