import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Spinner, Modal } from 'react-bootstrap';
import { Search, Plus, Eye, Lock, Unlock } from 'lucide-react';
import axios from 'axios';
import AlertContext from '../../context/AlertContext.jsx';

const ManageServices = () => {
  const { setSuccess, setError } = useContext(AlertContext);
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    sporti: '',
    type: ''
  });
  
  const [newService, setNewService] = useState({
    name: '',
    type: '',
    sporti: '',
    capacity: 0,
    price: {
      member: 0,
      guest: 0
    },
    facilities: [],
    description: ''
  });
  
  useEffect(() => {
    fetchServices();
  }, []);
  
  const fetchServices = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://nn-z4al.onrender.com/api/services');
      if (response.data.success) {
        setServices(response.data.services);
      }
    } catch (error) {
      console.error('Error fetching services:', error);
      setError('Failed to fetch services');
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('price.')) {
      const priceType = name.split('.')[1];
      setNewService(prev => ({
        ...prev,
        price: {
          ...prev.price,
          [priceType]: parseInt(value)
        }
      }));
    } else {
      setNewService(prev => ({
        ...prev,
        [name]: value
      }));
    }
  };
  
  const handleFacilityChange = (e) => {
    const { checked, value } = e.target;
    if (checked) {
      setNewService(prev => ({
        ...prev,
        facilities: [...prev.facilities, value]
      }));
    } else {
      setNewService(prev => ({
        ...prev,
        facilities: prev.facilities.filter(f => f !== value)
      }));
    }
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    
    try {
      const response = await axios.post('https://nn-z4al.onrender.com/api/services', newService);
      if (response.data.success) {
        setSuccess('Service created successfully');
        setServices(prev => [...prev, response.data.service]);
        setShowAddModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error creating service:', error);
      setError(error.response?.data?.message || 'Failed to create service');
    } finally {
      setFormLoading(false);
    }
  };
  
  const toggleServiceAvailability = async (serviceId, isAvailable) => {
    try {
      const response = await axios.put(`/api/services/${serviceId}/toggle`);
      if (response.data.success) {
        setSuccess(`Service ${isAvailable ? 'disabled' : 'enabled'} successfully`);
        setServices(prev => 
          prev.map(service => 
            service._id === serviceId 
              ? { ...service, isAvailable: !isAvailable }
              : service
          )
        );
      }
    } catch (error) {
      console.error('Error toggling service availability:', error);
      setError('Failed to update service status');
    }
  };
  
  const resetForm = () => {
    setNewService({
      name: '',
      type: '',
      sporti: '',
      capacity: 0,
      price: {
        member: 0,
        guest: 0
      },
      facilities: [],
      description: ''
    });
  };
  
  const filteredServices = services.filter(service => {
    const matchesSearch = 
      service.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      service.type.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilters = 
      (!filters.sporti || service.sporti === filters.sporti) &&
      (!filters.type || service.type === filters.type);
    
    return matchesSearch && matchesFilters;
  });
  
  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Manage Services</h2>
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          <Plus size={18} className="me-2" />
          Add New Service
        </Button>
      </div>
      
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={6} className="mb-3 mb-md-0">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search services..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Row>
                <Col>
                  <Form.Select
                    value={filters.sporti}
                    onChange={(e) => setFilters({ ...filters, sporti: e.target.value })}
                  >
                    <option value="">All Locations</option>
                    <option value="SPORTI-1">SPORTI-1</option>
                    <option value="SPORTI-2">SPORTI-2</option>
                  </Form.Select>
                </Col>
                <Col>
                  <Form.Select
                    value={filters.type}
                    onChange={(e) => setFilters({ ...filters, type: e.target.value })}
                  >
                    <option value="">All Types</option>
                    <option value="Conference Room">Conference Room</option>
                    <option value="Main Function Hall">Main Function Hall</option>
                    <option value="Barbeque Area">Barbeque Area</option>
                    <option value="Training Room">Training Room</option>
                  </Form.Select>
                </Col>
              </Row>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading services...</p>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No services found</p>
            </div>
          ) : (
            <Table responsive hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Type</th>
                  <th>Location</th>
                  <th>Capacity</th>
                  <th>Price (Member)</th>
                  <th>Price (Guest)</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredServices.map((service) => (
                  <tr key={service._id}>
                    <td>{service.name}</td>
                    <td>
                      <Badge bg="info">{service.type}</Badge>
                    </td>
                    <td>{service.sporti}</td>
                    <td>{service.capacity} people</td>
                    <td>₹{service.price.member}</td>
                    <td>₹{service.price.guest}</td>
                    <td>
                      <Badge bg={service.isAvailable ? 'success' : 'danger'}>
                        {service.isAvailable ? 'Available' : 'Unavailable'}
                      </Badge>
                    </td>
                    <td>
                      <div className="d-flex gap-2">
                        <Button
                          variant="outline-primary"
                          size="sm"
                        >
                          <Eye size={16} />
                        </Button>
                        <Button
                          variant={service.isAvailable ? 'outline-danger' : 'outline-success'}
                          size="sm"
                          onClick={() => toggleServiceAvailability(service._id, service.isAvailable)}
                        >
                          {service.isAvailable ? <Lock size={16} /> : <Unlock size={16} />}
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Service</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={newService.name}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Type</Form.Label>
                  <Form.Select
                    name="type"
                    value={newService.type}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Type</option>
                    <option value="Conference Room">Conference Room</option>
                    <option value="Main Function Hall">Main Function Hall</option>
                    <option value="Barbeque Area">Barbeque Area</option>
                    <option value="Training Room">Training Room</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location</Form.Label>
                  <Form.Select
                    name="sporti"
                    value={newService.sporti}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Location</option>
                    <option value="SPORTI-1">SPORTI-1</option>
                    <option value="SPORTI-2">SPORTI-2</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Capacity</Form.Label>
                  <Form.Control
                    type="number"
                    name="capacity"
                    value={newService.capacity}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Member Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price.member"
                    value={newService.price.member}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Guest Price</Form.Label>
                  <Form.Control
                    type="number"
                    name="price.guest"
                    value={newService.price.guest}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            
            <Form.Group className="mb-3">
              <Form.Label>Facilities</Form.Label>
              <div>
                <Form.Check
                  inline
                  type="checkbox"
                  label="Sound System"
                  value="Sound System"
                  checked={newService.facilities.includes('Sound System')}
                  onChange={handleFacilityChange}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Projector"
                  value="Projector"
                  checked={newService.facilities.includes('Projector')}
                  onChange={handleFacilityChange}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Catering Area"
                  value="Catering Area"
                  checked={newService.facilities.includes('Catering Area')}
                  onChange={handleFacilityChange}
                />
                <Form.Check
                  inline
                  type="checkbox"
                  label="Air Conditioning"
                  value="Air Conditioning"
                  checked={newService.facilities.includes('Air Conditioning')}
                  onChange={handleFacilityChange}
                />
              </div>
            </Form.Group>
            
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={newService.description}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={formLoading}>
              {formLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Creating...
                </>
              ) : (
                'Create Service'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ManageServices;