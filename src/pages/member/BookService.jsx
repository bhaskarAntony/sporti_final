import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner, ToggleButton, ToggleButtonGroup } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../../context/AuthContext.jsx';
import AlertContext from '../../context/AlertContext.jsx';

const BookService = () => {
  const { user } = useContext(AuthContext);
  const { setError } = useContext(AlertContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [servicesLoading, setServicesLoading] = useState(false);
  const [availableServices, setAvailableServices] = useState([]);
  const [formData, setFormData] = useState({
    checkIn: '',
    checkOut: '',
    sporti: '',
    serviceType: '',
    serviceId: '',
    guestCount: 1,
    totalCost: 0,
  });

  const [errors, setErrors] = useState({});
  const [selectedService, setSelectedService] = useState(null);
  const [serviceTypes, setServiceTypes] = useState([]);

  // Fetch available services
  useEffect(() => {
    const fetchAvailableServices = async () => {
      if (formData.sporti && formData.serviceType && formData.checkIn && formData.checkOut) {
        setServicesLoading(true);
        try {
          const response = await axios.get('https://nn-z4al.onrender.com/api/services/available', {
            params: {
              sporti: formData.sporti,
              type: formData.serviceType,
              checkIn: formData.checkIn,
              checkOut: formData.checkOut,
            },
          });

          if (response.data.success) {
            setAvailableServices(response.data.services);
            // Group services by type
            const uniqueTypes = [...new Set(response.data.services.map(service => service.type))].sort();
            setServiceTypes(uniqueTypes);
          }
        } catch (error) {
          console.error('Error fetching services:', error);
          setError('Failed to fetch available services');
        } finally {
          setServicesLoading(false);
        }
      }
    };

 fetchAvailableServices();
  }, [formData.sporti, formData.serviceType, formData.checkIn, formData.checkOut, setError]);

  // Calculate total cost
  useEffect(() => {
    if (selectedService && formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const timeDiff = checkOutDate - checkInDate;
      const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

      setFormData(prev => ({
        ...prev,
        totalCost: selectedService.price.member * days,
      }));
    }
  }, [selectedService, formData.checkIn, formData.checkOut]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });

    setErrors({
      ...errors,
      [name]: '',
    });

    // Reset service selection when criteria change
    if (['sporti', 'serviceType', 'checkIn', 'checkOut'].includes(name)) {
      setSelectedService(null);
      setFormData(prev => ({
        ...prev,
        serviceId: '',
        totalCost: 0,
      }));
    }
  };

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setFormData(prev => ({
      ...prev,
      serviceId: service._id,
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.checkIn) {
      newErrors.checkIn = 'Check-in date is required';
    }
    if (!formData.checkOut) {
      newErrors.checkOut = 'Check-out date is required';
    }
    if (!formData.sporti) {
      newErrors.sporti = 'SPORTI location is required';
    }
    if (!formData.serviceType) {
      newErrors.serviceType = 'Service type is required';
    }
    if (!formData.serviceId) {
      newErrors.serviceId = 'Please select a service';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    navigate('/confirm-booking', {
      state: {
        formData,
        selectedService,
        bookingType: 'service',
      },
    });
  };

  const today = new Date().toISOString().slice(0, 16);

  return (
    <Container fluid className="p-3 p-md-5 bg-light">
      <h2 className="mb-4">Book a Service</h2>
      <hr />
      <Row>
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm border-0 rounded-0 p-3">
            <Card.Body>
              <h5 className="mb-3">Booking Details</h5>
              <hr />
              <Form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Check-In Date & Time</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="checkIn"
                        value={formData.checkIn}
                        onChange={handleChange}
                        min={today}
                        required
                      />
                      {errors.checkIn && <div className="text-danger">{errors.checkIn}</div>}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Check-Out Date & Time</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="checkOut"
                        value={formData.checkOut}
                        onChange={handleChange}
                        min={formData.checkIn || today}
                        disabled={!formData.checkIn}
                        required
                      />
                      {errors.checkOut && <div className="text-danger">{errors.checkOut}</div>}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>SPORTI Location</Form.Label>
                      <Form.Select
                        name="sporti"
                        value={formData.sporti}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Location</option>
                        <option value="SPORTI-1">SPORTI-1 (Central Bangalore)</option>
                        <option value="SPORTI-2">SPORTI-2 (North Bangalore)</option>
                      </Form.Select>
                      {errors.sporti && <div className="text-danger">{errors.sporti}</div>}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Service Type</Form.Label>
                      <Form.Select
                        name="serviceType"
                        value={formData.serviceType}
                        onChange={handleChange}
                        required
                        disabled={!formData.sporti}
                      >
                        <option value="">Select Service Type</option>
                        <option value="Conference Room">Conference Room</option>
                        <option value="Main Function Hall">Main Function Hall</option>
                        <option value="Barbeque Area">Barbeque Area</option>
                        <option value="Training Room">Training Room</option>
                      </Form.Select>
                      {errors.serviceType && <div className="text-danger">{errors.serviceType}</div>}
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Number of Guests</Form.Label>
                      <Form.Control
                        type="number"
                        name="guestCount"
                        value={formData.guestCount}
                        onChange={handleChange}
                        min="1"
                        required
                      />
                    </Form.Group>
                  </div>
                </div>

                {selectedService && (
                  <Card className="bg-light p-3 mb-3">
                    <h6>Selected Service Details</h6>
                    <p className="mb-1"><strong>Name:</strong> {selectedService.name}</p>
                    <p className="mb-1"><strong>Type:</strong> {selectedService.type}</p>
                    <p className="mb-1"><strong>Capacity:</strong> {selectedService.capacity} people</p>
                    <p className="mb-0"><strong>Total Cost:</strong> ₹{formData.totalCost}</p>
                  </Card>
                )}
                <hr />
                <div className="d-flex gap-2 mt-3 justify-content-end">
                  <Button
                    type="submit"
                    className="blue-btn m-0 border-0"
                    disabled={!selectedService || loading}
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
                  <Link to="/" className="btn btn-danger">
                    Cancel
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>

        <Col lg={6}>
          <Card className="shadow-sm border-0 rounded-0 p-3">
            <Card.Body>
              <h5 className="mb-3">Select a Service</h5>
              <hr />
              {servicesLoading ? (
                <div className="text-center py-5">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-3">Loading available services...</p>
                </div>
              ) : !formData.sporti || !formData.serviceType || !formData.checkIn || !formData.checkOut ? (
                <div className="text-center p-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Home_icon_grey.png"
                    alt=""
                    className="w-50"
                  />
                  <p className="fs-5 fw-bold text-center">
                    Please select SPORTI location, service type, and dates to view available services.
                  </p>
                </div>
              ) : availableServices.length === 0 ? (
                <Alert variant="danger text-center">
                  <img
                    src="https://png.pngtree.com/png-vector/20221008/ourmid/pngtree-prohibition-sign-transparent-png-image_6291515.png"
                    alt=""
                    className="w-25"
                    style={{ opacity: '0.6' }}
                  />
                  <h1 className="fs-4 fw-bold">No Services Available</h1>
                  <p className="fs-6 text-center">
                    No services available for the selected criteria. Please try different dates or service type.
                  </p>
                </Alert>
              ) : (
                <div>
                  {serviceTypes.map(type => (
                    <div key={type} className="mb-4">
                      <h6 className="border-bottom pb-2 mb-3">{type}</h6>
                      <Row>
                        {availableServices
                          .filter(service => service.type === type)
                          .map(service => (
                            <Col key={service._id} xs={6} md={4} xl={3} className="mb-3">
                              <Card
                                className={`h-100 ${
                                  selectedService?._id === service._id ? 'border border-3 border-success' : 'border-0'
                                }`}
                                onClick={() => handleServiceSelect(service)}
                                style={{ cursor: 'pointer' }}
                              >
                                <Card.Body className="text-center p-3">
                                  <h5 className="mb-2">{service.name}</h5>
                                  <p className="mb-1 badge bg-primary">{service.type}</p>
                                  <p className="mb-1 small">
                                    <strong>Price:</strong> ₹{service.price.member}/day
                                  </p>
                                  <p className="mb-1 small">
                                    <strong>Capacity:</strong> {service.capacity} people
                                  </p>
                                </Card.Body>
                                <Card.Footer className="bg-light small">
                                  <strong>Facilities:</strong> {service.facilities.join(', ')}
                                </Card.Footer>
                              </Card>
                            </Col>
                          ))}
                      </Row>
                    </div>
                  ))}
                </div>
              )}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookService;