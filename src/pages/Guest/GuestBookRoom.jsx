import React, { useState, useContext, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import AlertContext from '../../context/AlertContext.jsx';
import { BedDouble, CalendarCheck, CalendarX, MapPin, User, Phone, Briefcase, Mail } from 'lucide-react';

const GuestBookRoom = () => {
  const { setError } = useContext(AlertContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem('formData');
    return savedFormData ? JSON.parse(savedFormData) : {
      checkIn: '',
      checkOut: '',
      sporti: '',
      bookingFor: 'Guest',
      relation: 'Batchmate',
      roomType: '',
      totalCost: 0,
    };
  });
  const [officerDetails, setOfficerDetails] = useState(() => {
    const savedOfficerDetails = localStorage.getItem('officerDetails');
    return savedOfficerDetails ? JSON.parse(savedOfficerDetails) : {
      name: '',
      designation: '',
      gender: 'Male',
      phoneNumber: '',
      email: '',
    };
  });
  const [occupantDetails, setOccupantDetails] = useState(() => {
    const savedOccupantDetails = localStorage.getItem('occupantDetails');
    return savedOccupantDetails ? JSON.parse(savedOccupantDetails) : {
      name: '',
      phoneNumber: '',
      gender: 'Male',
      location: '',
      relation: 'Batchmate',
      email: '',
    };
  });

  useEffect(() => {
    localStorage.setItem('formData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('officerDetails', JSON.stringify(officerDetails));
  }, [officerDetails]);

  useEffect(() => {
    localStorage.setItem('occupantDetails', JSON.stringify(occupantDetails));
  }, [occupantDetails]);

  const allowedRoomTypes = {
    'SPORTI-1': ['Standard', 'Family', 'VIP'],
    'SPORTI-2': ['Standard', 'VIP'],
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
      ...(name === 'sporti' && value !== prev.sporti ? { roomType: '' } : {}),
    }));
  };

  const handleToggleChange = (value) => {
    setFormData((prev) => ({
      ...prev,
      bookingFor: value,
      relation: value === 'Self' ? 'Self' : 'Batchmate',
    }));
    setOccupantDetails((prev) => ({
      ...prev,
      relation: value === 'Self' ? 'Self' : 'Batchmate',
      name: '',
      phoneNumber: '',
      gender: 'Male',
      location: '',
      email: '',
    }));
  };

  const handleOfficerChange = (e) => {
    const { name, value } = e.target;
    setOfficerDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOccupantChange = (e) => {
    const { name, value } = e.target;
    setOccupantDetails((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRelationChange = (e) => {
    const { value } = e.target;
    setFormData((prev) => ({ ...prev, relation: value }));
    setOccupantDetails((prev) => ({ ...prev, relation: value }));
  };

  const validateForm = () => {
    if (!formData.checkIn || !formData.checkOut || !formData.sporti || !formData.roomType) {
      setError('Please fill in all required booking fields');
      return false;
    }
    if (!occupantDetails.name.trim()) {
      setError('Occupant name is required');
      return false;
    }
    if (!occupantDetails.phoneNumber.trim() || !/^\d{10}$/.test(occupantDetails.phoneNumber)) {
      setError('Valid 10-digit occupant phone number is required');
      return false;
    }
    if (!occupantDetails.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(occupantDetails.email)) {
      setError('Valid occupant email is required');
      return false;
    }
    if (!occupantDetails.location.trim()) {
      setError('Occupant home location is required');
      return false;
    }
    if (!officerDetails.name.trim()) {
      setError('Officer name is required');
      return false;
    }
    if (!officerDetails.designation.trim()) {
      setError('Officer designation is required');
      return false;
    }
    if (!officerDetails.phoneNumber.trim() || !/^\d{10}$/.test(officerDetails.phoneNumber)) {
      setError('Valid 10-digit officer phone number is required');
      return false;
    }
    if (!officerDetails.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(officerDetails.email)) {
      setError('Valid officer email is required');
      return false;
    }
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    if (checkInDate >= checkOutDate) {
      setError('Check-out date must be after check-in date');
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) {
      return;
    }
    setLoading(true);
    localStorage.setItem('formData', JSON.stringify(formData));
    localStorage.setItem('officerDetails', JSON.stringify(officerDetails));
    localStorage.setItem('occupantDetails', JSON.stringify(occupantDetails));
    navigate('/guest/confirm-booking', {
      state: {
        formData,
        officerDetails,
        occupantDetails,
        bookingType: 'room',
      },
    });
    setLoading(false);
  };

  const handleCancel = () => {
    localStorage.removeItem('formData');
    localStorage.removeItem('officerDetails');
    localStorage.removeItem('occupantDetails');
    navigate('/');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Container fluid className="p-3 p-md-5 bg-light">
      <h2 className="mb-4">Non-member Room Booking Request</h2>
      <hr />
      <Row>
        <Col md={6} lg={4} className="mb-4">
          <Card className="shadow-sm border-0 rounded-0 h-100">
            <Card.Header className="p-3 bg-main text-white">
              <h5 className="m-0">Officer Details</h5>
            </Card.Header>
            <Card.Body className="p-3">
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Officer Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={officerDetails.name}
                    onChange={handleOfficerChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Designation</Form.Label>
                  <Form.Control
                    type="text"
                    name="designation"
                    value={officerDetails.designation}
                    onChange={handleOfficerChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={officerDetails.email}
                    onChange={handleOfficerChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Gender</Form.Label>
                  <div>
                    <Form.Check
                      inline
                      type="radio"
                      label="Male"
                      name="gender"
                      value="Male"
                      checked={officerDetails.gender === 'Male'}
                      onChange={handleOfficerChange}
                      required
                    />
                    <Form.Check
                      inline
                      type="radio"
                      label="Female"
                      name="gender"
                      value="Female"
                      checked={officerDetails.gender === 'Female'}
                      onChange={handleOfficerChange}
                      required
                    />
                  </div>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={officerDetails.phoneNumber}
                    onChange={handleOfficerChange}
                    required
                  />
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <Card className="shadow-sm border-0 rounded-0 h-100">
            <Card.Header className="p-3 bg-main text-white">
              <h5 className="m-0">Occupant Details</h5>
            </Card.Header>
            <Card.Body className="p-3">
              <Form autoComplete="off">
                <Form.Group className="mb-3">
                  <Form.Label>Booking For</Form.Label>
                  <ToggleButtonGroup
                    type="radio"
                    name="bookingFor"
                    value={formData.bookingFor}
                    onChange={handleToggleChange}
                    className="w-100"
                  >
                    <ToggleButton
                      id="tbg-radio-1"
                      value="Self"
                      variant={formData.bookingFor === 'Self' ? 'primary' : 'outline-primary'}
                      className="w-50"
                    >
                      Self
                    </ToggleButton>
                    <ToggleButton
                      id="tbg-radio-2"
                      value="Guest"
                      variant={formData.bookingFor === 'Guest' ? 'primary' : 'outline-primary'}
                      className="w-50"
                    >
                      Guest
                    </ToggleButton>
                  </ToggleButtonGroup>
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Occupant Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={occupantDetails.name}
                    onChange={handleOccupantChange}
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={occupantDetails.email}
                    onChange={handleOccupantChange}
                    required
                  />
                </Form.Group>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Relation</Form.Label>
                      <Form.Select
                        name="relation"
                        value={formData.relation}
                        onChange={handleRelationChange}
                        required
                      >
                        {formData.bookingFor === 'Self' ? (
                          <>
                            <option value="Self">Self</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Children">Children</option>
                            <option value="Parents">Parents</option>
                          </>
                        ) : (
                          <>
                            <option value="Batchmate">Batchmate</option>
                            <option value="Friend">Friend</option>
                            <option value="Relative">Relative</option>
                            <option value="Acquaintance">Acquaintance</option>
                            <option value="Spouse">Spouse</option>
                          </>
                        )}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Gender</Form.Label>
                      <div>
                        <Form.Check
                          inline
                          type="radio"
                          label="Male"
                          name="gender"
                          value="Male"
                          checked={occupantDetails.gender === 'Male'}
                          onChange={handleOccupantChange}
                          required
                        />
                        <Form.Check
                          inline
                          type="radio"
                          label="Female"
                          name="gender"
                          value="Female"
                          checked={occupantDetails.gender === 'Female'}
                          onChange={handleOccupantChange}
                          required
                        />
                      </div>
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={occupantDetails.phoneNumber}
                        onChange={handleOccupantChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Home Location</Form.Label>
                      <Form.Control
                        type="text"
                        name="location"
                        value={occupantDetails.location}
                        onChange={handleOccupantChange}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col md={6} lg={4} className="mb-4">
          <Card className="shadow-sm border-0 rounded-0 h-100">
            <Card.Header className="p-3 bg-main text-white">
              <h5 className="m-0">Booking Details</h5>
            </Card.Header>
            <Card.Body className="p-3">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Building</Form.Label>
                      <Form.Select
                        name="sporti"
                        value={formData.sporti}
                        onChange={handleFormChange}
                        required
                      >
                        <option value="">Select Building</option>
                        <option value="SPORTI-1">SPORTI-1 (IPS Mess)</option>
                        <option value="SPORTI-2">SPORTI-2 (KSRP R&TC)</option>
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col sm={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Room Type</Form.Label>
                      <Form.Select
                        name="roomType"
                        value={formData.roomType}
                        onChange={handleFormChange}
                        required
                        disabled={!formData.sporti}
                      >
                        <option value="">Select Room Type</option>
                        {formData.sporti &&
                          allowedRoomTypes[formData.sporti]?.map((type) => (
                            <option key={type} value={type}>
                              {type}
                            </option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Check-In Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleFormChange}
                        min={today}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col xs={12}>
                    <Form.Group className="mb-3">
                      <Form.Label>Check-Out Date</Form.Label>
                      <Form.Control
                        type="date"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleFormChange}
                        min={formData.checkIn || today}
                        disabled={!formData.checkIn}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Alert variant="info" className="mb-3">
                  Your booking request will be sent for admin approval. A room will be assigned based on availability.
                </Alert>
                <hr />
                <div className="d-flex gap-2 mt-3 justify-content-end">
                  <Button
                    type="submit"
                    className="blue-btn m-0 border-0"
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Spinner animation="border" size="sm" className="me-2" />
                        Processing...
                      </>
                    ) : (
                      'Proceed to Confirm'
                    )}
                  </Button>
                  <Button variant="danger" onClick={handleCancel}>
                    Cancel
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default GuestBookRoom;