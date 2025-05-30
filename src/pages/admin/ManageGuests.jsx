import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Spinner, Modal } from 'react-bootstrap';
import { Search, Eye, CheckCircle, XCircle } from 'lucide-react';
import axios from 'axios';
import AlertContext from '../../context/AlertContext.jsx';

const ManageGuests = () => {
  const { setSuccess, setError } = useContext(AlertContext);
  const [loading, setLoading] = useState(true);
  const [guests, setGuests] = useState([]);
  const [currentGuest, setCurrentGuest] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [statusLoading, setStatusLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    status: ''
  });
  
  useEffect(() => {
    fetchGuests();
  }, []);
  
  const fetchGuests = async () => {
    setLoading(true);
    try {
      const response = await axios.get('/api/guests');
      if (response.data.success) {
        setGuests(response.data.guests);
      }
    } catch (error) {
      console.error('Error fetching guests:', error);
      setError('Failed to fetch guests');
    } finally {
      setLoading(false);
    }
  };
  
  const openStatusModal = (guest) => {
    setCurrentGuest(guest);
    setShowStatusModal(true);
  };
  
  const updateGuestStatus = async (status) => {
    if (!currentGuest) return;
    
    setStatusLoading(true);
    try {
      const response = await axios.put(`/api/guests/${currentGuest._id}/status`, { status });
      
      if (response.data.success) {
        setSuccess(`Guest ${status} successfully`);
        setGuests(prev => 
          prev.map(guest => 
            guest._id === currentGuest._id 
              ? { ...guest, status }
              : guest
          )
        );
        setShowStatusModal(false);
      }
    } catch (error) {
      console.error('Error updating guest status:', error);
      setError('Failed to update guest status');
    } finally {
      setStatusLoading(false);
    }
  };
  
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
  
  const filteredGuests = guests.filter(guest => {
    const matchesSearch = 
      guest.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      guest.phoneNumber.includes(searchTerm);
    
    const matchesStatus = !filters.status || guest.status === filters.status;
    
    return matchesSearch && matchesStatus;
  });
  
  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Manage Guests</h2>
      </div>
      
      <Card className="shadow-sm mb-4">
        <Card.Body>
          <Row>
            <Col md={6} className="mb-3 mb-md-0">
              <Form.Group>
                <Form.Control
                  type="text"
                  placeholder="Search guests..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
              >
                <option value="">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="approved">Approved</option>
                <option value="rejected">Rejected</option>
              </Form.Select>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading guests...</p>
            </div>
          ) : filteredGuests.length === 0 ? (
            <div className="text-center py-5">
              <p className="text-muted">No guests found</p>
            </div>
          ) : (
            <Table responsive hover className="align-middle mb-0">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone</th>
                  <th>Relationship</th>
                  <th>Referred By</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredGuests.map((guest) => (
                  <tr key={guest._id}>
                    <td>{guest.name}</td>
                    <td>{guest.email}</td>
                    <td>{guest.phoneNumber}</td>
                    <td>{guest.relationship}</td>
                    <td>
                      {guest.referredBy?.name}
                      <br />
                      <small className="text-muted">{guest.referredBy?.referenceCode}</small>
                    </td>
                    <td>
                      <Badge bg={getStatusBadge(guest.status)}>
                        {guest.status}
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
                        {guest.status === 'pending' && (
                          <>
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => openStatusModal(guest)}
                            >
                              <CheckCircle size={16} />
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => openStatusModal(guest)}
                            >
                              <XCircle size={16} />
                            </Button>
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
      
      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Guest Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentGuest && (
            <>
              <p>
                <strong>Guest Name:</strong> {currentGuest.name}<br />
                <strong>Email:</strong> {currentGuest.email}<br />
                <strong>Phone:</strong> {currentGuest.phoneNumber}<br />
                <strong>Relationship:</strong> {currentGuest.relationship}<br />
                <strong>Current Status:</strong> {currentGuest.status}
              </p>
              
              <p>Are you sure you want to update this guest's status?</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={() => updateGuestStatus('approved')}
            disabled={statusLoading}
          >
            {statusLoading ? 'Processing...' : 'Approve Guest'}
          </Button>
          <Button
            variant="danger"
            onClick={() => updateGuestStatus('rejected')}
            disabled={statusLoading}
          >
            {statusLoading ? 'Processing...' : 'Reject Guest'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageGuests;