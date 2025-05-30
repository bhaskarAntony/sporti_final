import React, { useState, useEffect, useContext } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Form,
  Badge,
  Spinner,
  Modal,
  InputGroup,
  Dropdown,
  Pagination,
} from 'react-bootstrap';
import { Search, Plus, Eye, Lock, Unlock, Edit, Trash2, Download, CheckSquare, Calendar, RefreshCcw } from 'lucide-react';
import axios from 'axios';
import AlertContext from '../../context/AlertContext.jsx';
import './style.css';

const ManageRooms = () => {
  const { setSuccess, setError } = useContext(AlertContext);
  const [loading, setLoading] = useState(true);
  const [rooms, setRooms] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showAvailabilityModal, setShowAvailabilityModal] = useState(false);
  const [currentRoom, setCurrentRoom] = useState(null);
  const [formLoading, setFormLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    sporti: '',
    category: '',
    floor: '',
    status: '',
  });
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [availabilityForm, setAvailabilityForm] = useState({
    checkIn: '',
    checkOut: '',
  });
  const [availabilityResult, setAvailabilityResult] = useState(null);

  // Room form state for add/edit
  const [roomForm, setRoomForm] = useState({
    roomNumber: '',
    category: '',
    floor: '',
    sporti: '',
    price: {
      member: 0,
      guest: 0,
    },
    facilities: [],
    description: '',
    isBlocked: false,
  });

  useEffect(() => {
    fetchRooms();
  }, []);

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://nn-z4al.onrender.com/api/rooms');
      if (response.data.success) {
        setRooms(response.data.rooms);
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError('Failed to fetch rooms');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.startsWith('price.')) {
      const priceType = name.split('.')[1];
      setRoomForm(prev => ({
        ...prev,
        price: {
          ...prev.price,
          [priceType]: parseInt(value) || 0,
        },
      }));
    } else {
      setRoomForm(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleFacilityChange = (e) => {
    const { checked, value } = e.target;
    setRoomForm(prev => ({
      ...prev,
      facilities: checked
        ? [...prev.facilities, value]
        : prev.facilities.filter(f => f !== value),
    }));
  };

  const resetForm = () => {
    setRoomForm({
      roomNumber: '',
      category: '',
      floor: '',
      sporti: '',
      price: {
        member: 0,
        guest: 0,
      },
      facilities: [],
      description: '',
      isBlocked: false,
    });
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    if (!roomForm.roomNumber || !roomForm.category || !roomForm.floor || !roomForm.sporti) {
      setError('Please fill in all required fields');
      return;
    }

    setFormLoading(true);
    try {
      const response = await axios.post('https://nn-z4al.onrender.com/api/rooms', roomForm);
      if (response.data.success) {
        setSuccess('Room created successfully');
        setRooms(prev => [...prev, response.data.room]);
        setShowAddModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error creating room:', error);
      setError(error.response?.data?.message || 'Failed to create room');
    } finally {
      setFormLoading(false);
    }
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    if (!roomForm.roomNumber || !roomForm.category || !roomForm.floor || !roomForm.sporti) {
      setError('Please fill in all required fields');
      return;
    }

    setFormLoading(true);
    try {
      const response = await axios.put(`https://nn-z4al.onrender.com/api/rooms/${currentRoom._id}`, roomForm);
      if (response.data.success) {
        setSuccess('Room updated successfully');
        setRooms(prev =>
          prev.map(r => (r._id === currentRoom._id ? response.data.room : r))
        );
        setShowEditModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Error updating room:', error);
      setError(error.response?.data?.message || 'Failed to update room');
    } finally {
      setFormLoading(false);
    }
  };

  const handleDeleteRoom = async () => {
    if (!currentRoom) return;

    setFormLoading(true);
    try {
      const response = await axios.delete(`https://nn-z4al.onrender.com/api/rooms/${currentRoom._id}`);
      if (response.data.success) {
        setSuccess('Room deleted successfully');
        setRooms(prev => prev.filter(r => r._id !== currentRoom._id));
        setShowDeleteModal(false);
      }
    } catch (error) {
      console.error('Error deleting room:', error);
      setError('Failed to delete room');
    } finally {
      setFormLoading(false);
    }
  };

  const handleBulkBlock = async (block) => {
    if (selectedRooms.length === 0) {
      setError('No rooms selected');
      return;
    }

    setFormLoading(true);
    try {
      await Promise.all(
        selectedRooms.map(id =>
          axios.put(`https://nn-z4al.onrender.com/api/rooms/${id}/block`, { isBlocked: block })
        )
      );
      setSuccess(`Selected rooms ${block ? 'blocked' : 'unblocked'} successfully`);
      setRooms(prev =>
        prev.map(r =>
          selectedRooms.includes(r._id) ? { ...r, isBlocked: block } : r
        )
      );
      setSelectedRooms([]);
    } catch (error) {
      console.error('Error toggling room block:', error);
      setError('Failed to update room status');
    } finally {
      setFormLoading(false);
    }
  };

  const handleBulkDelete = async () => {
    if (selectedRooms.length === 0) {
      setError('No rooms selected');
      return;
    }

    setFormLoading(true);
    try {
      await Promise.all(
        selectedRooms.map(id => axios.delete(`https://nn-z4al.onrender.com/api/rooms/${id}`))
      );
      setSuccess('Selected rooms deleted successfully');
      setRooms(prev => prev.filter(r => !selectedRooms.includes(r._id)));
      setSelectedRooms([]);
    } catch (error) {
      console.error('Error deleting rooms:', error);
      setError('Failed to delete some rooms');
    } finally {
      setFormLoading(false);
    }
  };

  const exportToCSV = () => {
    const headers = [
      'Room Number',
      'Category',
      'Floor',
      'Location',
      'Member Price',
      'Guest Price',
      'Status',
      'Facilities',
      'Description',
    ];
    const rows = filteredRooms.map(r => [
      r.roomNumber,
      r.category,
      r.floor,
      r.sporti,
      r.price.member,
      r.price.guest,
      r.isBlocked ? 'Blocked' : 'Available',
      r.facilities.join(';'),
      r.description.replace(/,/g, ''),
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.setAttribute('download', 'rooms_export.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const checkAvailability = async (e) => {
    e.preventDefault();
    if (!availabilityForm.checkIn || !availabilityForm.checkOut || !currentRoom) {
      setError('Please select check-in and check-out dates');
      return;
    }

    setFormLoading(true);
    try {
      const response = await axios.get('https://nn-z4al.onrender.com/api/rooms/available', {
        params: {
          roomId: currentRoom._id,
          checkIn: availabilityForm.checkIn,
          checkOut: availabilityForm.checkOut,
        },
      });
      if (response.data.success) {
        setAvailabilityResult(response.data.isAvailable ? 'Available' : 'Not Available');
      }
    } catch (error) {
      console.error('Error checking availability:', error);
      setError('Failed to check room availability');
      setAvailabilityResult('Error');
    } finally {
      setFormLoading(false);
    }
  };

  const toggleSelectRoom = (id) => {
    setSelectedRooms(prev =>
      prev.includes(id) ? prev.filter(rid => rid !== id) : [...prev, id]
    );
  };

  const toggleSelectAll = () => {
    if (selectedRooms.length === filteredRooms.length) {
      setSelectedRooms([]);
    } else {
      setSelectedRooms(filteredRooms.map(r => r._id));
    }
  };

  const openEditModal = (room) => {
    setCurrentRoom(room);
    setRoomForm({
      roomNumber: room.roomNumber,
      category: room.category,
      floor: room.floor,
      sporti: room.sporti,
      price: {
        member: room.price.member,
        guest: room.price.guest,
      },
      facilities: room.facilities,
      description: room.description,
      isBlocked: room.isBlocked,
    });
    setShowEditModal(true);
  };

  const openViewModal = (room) => {
    setCurrentRoom(room);
    setShowViewModal(true);
  };

  const openDeleteModal = (room) => {
    setCurrentRoom(room);
    setShowDeleteModal(true);
  };

  const openAvailabilityModal = (room) => {
    setCurrentRoom(room);
    setAvailabilityForm({ checkIn: '', checkOut: '' });
    setAvailabilityResult(null);
    setShowAvailabilityModal(true);
  };

  // Filter rooms
  const filteredRooms = rooms.filter(room => {
    const matchesSearch =
      room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.floor.toLowerCase().includes(searchTerm.toLowerCase()) ||
      room.sporti.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilters =
      (!filters.sporti || room.sporti === filters.sporti) &&
      (!filters.category || room.category === filters.category) &&
      (!filters.floor || room.floor === filters.floor) &&
      (!filters.status || (filters.status === 'blocked' ? room.isBlocked : !room.isBlocked));
    return matchesSearch && matchesFilters;
  });
  const toggleRoomBlock = async (roomId, isBlocked) => {
    try {
      const response = await axios.put(`https://nn-z4al.onrender.com/api/rooms/${roomId}/block`);
      if (response.data.success) {
        setSuccess(`Room ${isBlocked ? 'unblocked' : 'blocked'} successfully`);
        setRooms(prev => 
          prev.map(room => 
            room._id === roomId 
              ? { ...room, isBlocked: !isBlocked }
              : room
          )
        );
      }
    } catch (error) {
      console.error('Error toggling room block:', error);
      setError('Failed to update room status');
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentRooms = filteredRooms.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredRooms.length / itemsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const today = new Date().toISOString().slice(0, 16);

  return (
    <Container fluid className="p-3 p-md-5 manage-rooms-container">
      {/* Top Heading */}
      <div className="mb-4">
        <div className="d-flex flex-wrap align-items-center justify-content-between">
        <h1 className="display-6 fw-bold">Manage Rooms</h1>
        <Button className="blue-btn m-0 border-0" onClick={() => setShowAddModal(true)}>
                <Plus size={18} className="me-2" /> Add Room
              </Button>
        </div>
        <hr />

        <nav aria-label="breadcrumb">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item active" aria-current="page">Manage Rooms</li>
          </ol>
        </nav>
      </div>

      {/* Filters and Actions */}
      <Card className="shadow-sm mb-4 border-0 rounded-0">
        <Card.Body>
          <Row className="align-items-center">
            <Col md={3} className="mb-3 mb-md-0">
              <InputGroup>
                <InputGroup.Text><Search size={18} /></InputGroup.Text>
                <Form.Control
                  placeholder="Search by room number, category, floor, or location..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </InputGroup>
            </Col>
            <Col md={9} className="d-flex justify-content-md-end gap-2 flex-wrap">
              <Form.Select
                value={filters.sporti}
                onChange={(e) => setFilters({ ...filters, sporti: e.target.value })}
                style={{ maxWidth: '150px' }}
                className="me-2"
              >
                <option value="">All Locations</option>
                <option value="SPORTI-1">SPORTI-1</option>
                <option value="SPORTI-2">SPORTI-2</option>
              </Form.Select>
              <Form.Select
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
                style={{ maxWidth: '150px' }}
                className="me-2"
              >
                <option value="">All Categories</option>
                <option value="Standard">Standard</option>
                <option value="VIP">VIP</option>
                <option value="Family">Family</option>
              </Form.Select>
              <Form.Select
                value={filters.floor}
                onChange={(e) => setFilters({ ...filters, floor: e.target.value })}
                style={{ maxWidth: '150px' }}
                className="me-2"
              >
                <option value="">All Floors</option>
                <option value="GROUND FLOOR">Ground Floor</option>
                <option value="FIRST FLOOR">First Floor</option>
              </Form.Select>
              <Form.Select
                value={filters.status}
                onChange={(e) => setFilters({ ...filters, status: e.target.value })}
                style={{ maxWidth: '150px' }}
                className="me-2"
              >
                <option value="">All Status</option>
                <option value="available">Available</option>
                <option value="blocked">Blocked</option>
              </Form.Select>
              <Button variant="outline-secondary" onClick={fetchRooms}>
                <RefreshCcw size={18} className="me-2" /> Refresh
              </Button>
             
            </Col>
          </Row>
        </Card.Body>
      </Card>

      {/* Bulk Actions */}
      {selectedRooms.length > 0 && (
        <Card className="shadow-sm mb-4 border-0 rounded-0">
          <Card.Body className="d-flex gap-2 align-items-center">
            <span>{selectedRooms.length} room(s) selected</span>
            <Dropdown>
              <Dropdown.Toggle variant="outline-primary" id="bulk-actions">
                Bulk Actions
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => handleBulkBlock(true)}>
                  Block Rooms
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleBulkBlock(false)}>
                  Unblock Rooms
                </Dropdown.Item>
                <Dropdown.Item onClick={handleBulkDelete}>
                  Delete Rooms
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
            <Button variant="outline-success" onClick={exportToCSV}>
              <Download size={18} className="me-2" /> Export Selected
            </Button>
          </Card.Body>
        </Card>
      )}

      {/* Rooms Table */}
      <Card className="shadow-sm border-0 rounded-0">
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading rooms...</p>
            </div>
          ) : filteredRooms.length === 0 ? (
            <div className="text-center py-5">
              <img
                src="https://png.pngtree.com/png-vector/20221008/ourmid/pngtree-prohibition-sign-transparent-png-image_6291515.png"
                alt="No rooms"
                className="w-25 opacity-50"
              />
              <p className="text-muted fs-5 fw-bold">No rooms found</p>
            </div>
          ) : (
            <>
              <Table responsive hover className="align-middle mb-0">
                <thead className="bg-light">
                  <tr>
                    <th>
                      <Form.Check
                        checked={selectedRooms.length === filteredRooms.length}
                        onChange={toggleSelectAll}
                      />
                    </th>
                    <th>Room Number</th>
                    <th>Category</th>
                    <th>Floor</th>
                    <th>Location</th>
                    <th>Member Price</th>
                    <th>Guest Price</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentRooms.map((room) => (
                    <tr key={room._id}>
                      <td>
                        <Form.Check
                          checked={selectedRooms.includes(room._id)}
                          onChange={() => toggleSelectRoom(room._id)}
                        />
                      </td>
                      <td>{room.roomNumber}</td>
                      <td><Badge bg="info">{room.category}</Badge></td>
                      <td>{room.floor}</td>
                      <td>{room.sporti}</td>
                      <td>₹{room.price?.member}</td>
                      <td>₹{room.price?.guest}</td>
                      <td>
                        <Badge bg={room.isBlocked ? 'danger' : 'success'}>
                          {room.isBlocked ? 'Blocked' : 'Available'}
                        </Badge>
                      </td>
                      <td>
                        <div className="d-flex gap-2">
                          <Button
                            variant="outline-primary"
                            size="sm"
                            onClick={() => openViewModal(room)}
                            title="View Details"
                          >
                            <Eye size={16} />
                          </Button>
                          <Button
                            variant="outline-info"
                            size="sm"
                            onClick={() => openEditModal(room)}
                            title="Edit Room"
                          >
                            <Edit size={16} />
                          </Button>
                          <Button
                            variant={room.isBlocked ? 'outline-success' : 'outline-danger'}
                            size="sm"
                            onClick={() => toggleRoomBlock(room._id, room.isBlocked)}
                            title={room.isBlocked ? 'Unblock Room' : 'Block Room'}
                          >
                            {room.isBlocked ? <Unlock size={16} /> : <Lock size={16} />}
                          </Button>
                          <Button
                            variant="outline-danger"
                            size="sm"
                            onClick={() => openDeleteModal(room)}
                            title="Delete Room"
                          >
                            <Trash2 size={16} />
                          </Button>
                          <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => openAvailabilityModal(room)}
                            title="Check Availability"
                          >
                            <Calendar size={16} />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
              {/* Pagination */}
              <div className="p-3 d-flex justify-content-between align-items-center">
                <span>
                  Showing {indexOfFirstItem + 1} to {Math.min(indexOfLastItem, filteredRooms.length)} of {filteredRooms.length} rooms
                </span>
                <Pagination>
                  <Pagination.Prev
                    onClick={() => paginate(currentPage - 1)}
                    disabled={currentPage === 1}
                  />
                  {[...Array(totalPages)].map((_, i) => (
                    <Pagination.Item
                      key={i + 1}
                      active={i + 1 === currentPage}
                      onClick={() => paginate(i + 1)}
                    >
                      {i + 1}
                    </Pagination.Item>
                  ))}
                  <Pagination.Next
                    onClick={() => paginate(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  />
                </Pagination>
              </div>
            </>
          )}
        </Card.Body>
      </Card>

      {/* Add Room Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)} size="lg">
        <Form onSubmit={handleAddSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Add New Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Room Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="roomNumber"
                    value={roomForm.roomNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="category"
                    value={roomForm.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Standard">Standard</option>
                    <option value="VIP">VIP</option>
                    <option value="Family">Family</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Floor <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="floor"
                    value={roomForm.floor}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Floor</option>
                    <option value="GROUND FLOOR">Ground Floor</option>
                    <option value="FIRST FLOOR">First Floor</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="sporti"
                    value={roomForm.sporti}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Location</option>
                    <option value="SPORTI-1">SPORTI-1</option>
                    <option value="SPORTI-2">SPORTI-2</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Member Price <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    name="price.member"
                    value={roomForm.price.member}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Guest Price <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    name="price.guest"
                    value={roomForm.price.guest}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Facilities</Form.Label>
              <div>
                {['Air Conditioning', 'TV', 'Wi-Fi', 'Attached Bathroom'].map(facility => (
                  <Form.Check
                    key={facility}
                    inline
                    type="checkbox"
                    label={facility}
                    value={facility}
                    checked={roomForm.facilities.includes(facility)}
                    onChange={handleFacilityChange}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={roomForm.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <div className="alert alert-warning">
              <p className="fs-6 mb-0">
                <b>Note:</b> Ensure all required fields are filled correctly.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button className="blue-btn border-0" type="submit" disabled={formLoading}>
              {formLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Creating...
                </>
              ) : (
                'Create Room'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Edit Room Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)} size="lg">
        <Form onSubmit={handleEditSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Room</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Room Number <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="text"
                    name="roomNumber"
                    value={roomForm.roomNumber}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Category <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="category"
                    value={roomForm.category}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Category</option>
                    <option value="Standard">Standard</option>
                    <option value="VIP">VIP</option>
                    <option value="Family">Family</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Floor <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="floor"
                    value={roomForm.floor}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Floor</option>
                    <option value="GROUND FLOOR">Ground Floor</option>
                    <option value="FIRST FLOOR">First Floor</option>
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Location <span className="text-danger">*</span></Form.Label>
                  <Form.Select
                    name="sporti"
                    value={roomForm.sporti}
                    onChange={handleInputChange}
                    required
                  >
                    <option value="">Select Location</option>
                    <option value="SPORTI-1">SPORTI-1</option>
                    <option value="SPORTI-2">SPORTI-2</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Member Price <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    name="price.member"
                    value={roomForm.price.member}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3">
                  <Form.Label>Guest Price <span className="text-danger">*</span></Form.Label>
                  <Form.Control
                    type="number"
                    name="price.guest"
                    value={roomForm.price.guest}
                    onChange={handleInputChange}
                    required
                  />
                </Form.Group>
              </Col>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label>Facilities</Form.Label>
              <div>
                {['Air Conditioning', 'TV', 'Wi-Fi', 'Attached Bathroom'].map(facility => (
                  <Form.Check
                    key={facility}
                    inline
                    type="checkbox"
                    label={facility}
                    value={facility}
                    checked={roomForm.facilities.includes(facility)}
                    onChange={handleFacilityChange}
                  />
                ))}
              </div>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={roomForm.description}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select
                name="isBlocked"
                value={roomForm.isBlocked ? 'blocked' : 'available'}
                onChange={(e) =>
                  setRoomForm(prev => ({
                    ...prev,
                    isBlocked: e.target.value === 'blocked',
                  }))
                }
              >
                <option value="available">Available</option>
                <option value="blocked">Blocked</option>
              </Form.Select>
            </Form.Group>
            <div className="alert alert-warning">
              <p className="fs-6 mb-0">
                <b>Note:</b> Ensure all required fields are filled correctly.
              </p>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="danger" onClick={() => setShowEditModal(false)}>
              Cancel
            </Button>
            <Button className="blue-btn border-0" type="submit" disabled={formLoading}>
              {formLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Updating...
                </>
              ) : (
                'Update Room'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* View Room Details Modal */}
      <Modal show={showViewModal} onHide={() => setShowViewModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Room Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentRoom && (
            <div>
              <Row>
                <Col md={6}>
                  <p><strong>Room Number:</strong> {currentRoom.roomNumber}</p>
                  <p><strong>Category:</strong> {currentRoom.category}</p>
                  <p><strong>Floor:</strong> {currentRoom.floor}</p>
                  <p><strong>Location:</strong> {currentRoom.sporti}</p>
                </Col>
                <Col md={6}>
                  <p><strong>Member Price:</strong> ₹{currentRoom.price?.member}</p>
                  <p><strong>Guest Price:</strong> ₹{currentRoom.price?.guest}</p>
                  <p><strong>Status:</strong> {currentRoom.isBlocked ? 'Blocked' : 'Available'}</p>
                </Col>
              </Row>
              <hr />
              <p><strong>Facilities:</strong> {currentRoom.facilities.join(', ') || 'None'}</p>
              <p><strong>Description:</strong> {currentRoom.description || 'No description provided'}</p>
            </div>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowViewModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Delete Room Modal */}
      <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentRoom && (
            <>
              <p>Are you sure you want to delete the following room?</p>
              <p>
                <strong>Room Number:</strong> {currentRoom.roomNumber}<br />
                <strong>Location:</strong> {currentRoom.sporti}
              </p>
              <p className="text-muted small">This action cannot be undone.</p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button
            variant="danger"
            onClick={handleDeleteRoom}
            disabled={formLoading}
          >
            {formLoading ? (
              <>
                <Spinner animation="border" size="sm" className="me-2" />
                Deleting...
              </>
            ) : (
              'Delete Room'
            )}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Check Availability Modal */}
      <Modal show={showAvailabilityModal} onHide={() => setShowAvailabilityModal(false)}>
        <Form onSubmit={checkAvailability}>
          <Modal.Header closeButton>
            <Modal.Title>Check Room Availability</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentRoom && (
              <>
                <p>
                  <strong>Room Number:</strong> {currentRoom.roomNumber}<br />
                  <strong>Location:</strong> {currentRoom.sporti}
                </p>
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Check-In Date & Time</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="checkIn"
                        value={availabilityForm.checkIn}
                        onChange={(e) =>
                          setAvailabilityForm(prev => ({
                            ...prev,
                            checkIn: e.target.value,
                          }))
                        }
                        min={today}
                        required
                      />
                    </Form.Group>
                  </Col>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Check-Out Date & Time</Form.Label>
                      <Form.Control
                        type="datetime-local"
                        name="checkOut"
                        value={availabilityForm.checkOut}
                        onChange={(e) =>
                          setAvailabilityForm(prev => ({
                            ...prev,
                            checkOut: e.target.value,
                          }))
                        }
                        min={availabilityForm.checkIn || today}
                        disabled={!availabilityForm.checkIn}
                        required
                      />
                    </Form.Group>
                  </Col>
                </Row>
                {availabilityResult && (
                  <div
                    className={`alert ${
                      availabilityResult === 'Available'
                        ? 'alert-success'
                        : availabilityResult === 'Not Available'
                        ? 'alert-danger'
                        : 'alert-warning'
                    }`}
                  >
                    <strong>Availability:</strong> {availabilityResult}
                  </div>
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowAvailabilityModal(false)}>
              Cancel
            </Button>
            <Button className="blue-btn border-0" type="submit" disabled={formLoading}>
              {formLoading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Checking...
                </>
              ) : (
                'Check Availability'
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
};

export default ManageRooms;