import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn } from 'lucide-react';
import OtpInput from 'react-otp-input';
import GuestAuthContext from '../context/GuestAuthContext.jsx';
import logo from '../assets/images/main_logo.jpg';

const GuestLogin = () => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [step, setStep] = useState('phone'); // 'phone' or 'otp'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const { initiateGuestLogin, verifyGuestOTP, isGuestAuthenticated } = useContext(GuestAuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (isGuestAuthenticated) {
      navigate('/guest/bookings');
    }
  }, [isGuestAuthenticated, navigate]);

  const handlePhoneSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!phoneNumber) {
      setError('Please enter your phone number');
      return;
    }

    setLoading(true);

    try {
      const result = await initiateGuestLogin(phoneNumber);

      if (result.success) {
        setSuccessMessage('OTP sent to your phone number');
        setStep('otp');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Initiate guest login error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (!otp || otp.length !== 6) {
      setError('Please enter a valid 6-digit OTP');
      return;
    }

    setLoading(true);

    try {
      const result = await verifyGuestOTP(phoneNumber, otp);

      if (result.success) {
        setSuccessMessage('Guest login successful!');
        navigate('/guest/bookings');
      } else {
        setError(result.message);
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
      console.error('Verify OTP error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="p-3 p-md-5 bg-light" fluid>
      <Row className="justify-content-center">
        <Col md={6} lg={5}>
          <Card className="shadow-sm border-0">
            <Card.Body className="p-4">
              {/* <div className="gap-2 mb-4 d-flex align-items-center">
                <img src={logo} alt="sporti karnataka police" width={70} />
                <h1 className="fs-5 mt-2 fw-bold">Senior Police officer's Research and Training Institute</h1>
              </div>
              <hr /> */}
              <h1 className="fs-5 fw-bold text-center">GUEST LOGIN</h1>
              <hr />

              {error && <Alert variant="danger">{error}</Alert>}
              {successMessage && <Alert variant="success">{successMessage}</Alert>}

              {step === 'phone' ? (
                <Form onSubmit={handlePhoneSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Mobile number <span className="text-danger">*</span></Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter your Mobile number"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                      required
                    />
                  </Form.Group>
                  <p className="mb-1">
                    Are you a member?{' '}
                    <Link to="/login" className="text-decoration-none">
                      Member Login
                    </Link>
                  </p>
                  <Button
                    type="submit"
                    className="w-100 mb-3 mt-2 blue-btn border-0 p-2 rounded-1"
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
                        Sending OTP...
                      </>
                    ) : (
                      'Send OTP'
                    )}
                  </Button>
                </Form>
              ) : (
                <Form onSubmit={handleOtpSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>OTP <span className="text-danger">*</span></Form.Label>
                    <OtpInput
                      value={otp}
                      onChange={setOtp}
                      numInputs={6}
                      renderSeparator={<span>-</span>}
                      renderInput={(props) => <input {...props} />}
                      inputStyle={{
                        width: '2.5rem',
                        height: '2.5rem',
                        margin: '0 0.5rem',
                        fontSize: '1.2rem',
                        borderRadius: '4px',
                        border: '1px solid #ced4da',
                        textAlign: 'center',
                      }}
                      containerStyle={{ justifyContent: 'center' }}
                      inputType="tel"
                      shouldAutoFocus
                    />
                  </Form.Group>
                  <p className="mb-1">
                    Are you a member?{' '}
                    <Link to="/login" className="text-decoration-none">
                      Member Login
                    </Link>
                  </p>
                  <Button
                    type="submit"
                    className="w-100 mb-3 mt-2 blue-btn border-0 p-2 rounded-1"
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
                        Verifying OTP...
                      </>
                    ) : (
                      'Verify OTP'
                    )}
                  </Button>
                  <Button
                    variant="link"
                    className="w-100"
                    onClick={() => {
                      setStep('phone');
                      setOtp('');
                      setSuccessMessage('');
                    }}
                  >
                    Change Phone Number
                  </Button>
                </Form>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GuestLogin;