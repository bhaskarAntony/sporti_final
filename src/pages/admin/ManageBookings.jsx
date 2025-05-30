import React, { useState, useEffect, useContext } from 'react';
import { Container, Row, Col, Card, Table, Button, Form, Badge, Spinner, Modal, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Filter, Eye, CheckCircle, XCircle, DollarSign, BedDouble, LogIn, LogOut } from 'lucide-react';
import axios from 'axios';
import AlertContext from '../../context/AlertContext.jsx';
import AuthContext from '../../context/AuthContext.jsx';

const ManageBookings = () => {
  const { setSuccess, setError } = useContext(AlertContext);
  const { token } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [bookings, setBookings] = useState([]);
  const [currentBooking, setCurrentBooking] = useState(null);
  const [showStatusModal, setShowStatusModal] = useState(false);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showRoomModal, setShowRoomModal] = useState(false);
  const [statusRemark, setStatusRemark] = useState('');
  const [statusLoading, setStatusLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [selectedRoomId, setSelectedRoomId] = useState('');
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [isMemberBookings, setIsMemberBookings] = useState(true); // Toggle for member/non-member

  const [filters, setFilters] = useState({
    status: '',
    bookingType: '',
    startDate: '',
    endDate: '',
  });

  const [totalBookings, setTotalBookings] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchBookings();
  }, [filters, currentPage, isMemberBookings]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = { ...filters, isMember: isMemberBookings };
      const response = await axios.get('https://nn-z4al.onrender.com/api/bookings', {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setBookings(response.data.bookings);
        setTotalBookings(response.data.count);
      }
    } catch (error) {
      console.error('Error fetching bookings:', error);
      setError(`Failed to fetch ${isMemberBookings ? 'member' : 'non-member'} bookings`);
    } finally {
      setLoading(false);
    }
  };

  const fetchAvailableRooms = async (booking) => {
    setRoomsLoading(true);
    try {
      const response = await axios.get('https://nn-z4al.onrender.com/api/rooms/available', {
        params: {
          sporti: booking.sporti,
          category: booking.roomType,
          checkIn: booking.checkIn,
          checkOut: booking.checkOut,
        },
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setAvailableRooms(response.data.rooms);
        if (response.data.rooms.length === 0) {
          setError('No rooms available for the selected criteria');
        }
      } else {
        setError(response.data.message || 'Failed to fetch available rooms');
      }
    } catch (error) {
      console.error('Error fetching rooms:', error);
      setError('Failed to fetch available rooms');
    } finally {
      setRoomsLoading(false);
    }
  };

  const calculateTotalCost = (booking, room) => {
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const numberOfNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const pricePerNight = booking.bookingFor === 'Self' || (booking.bookingFor === 'Guest' && booking.relation === 'Batchmate') ? room.price.member : room.price.guest;
    return pricePerNight * numberOfNights;
  };

  const handleFilterChange = e => {
    const { name, value } = e.target;
    setFilters(prev => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      status: '',
      bookingType: '',
      startDate: '',
      endDate: '',
    });
    setCurrentPage(1);
  };

  const toggleMemberBookings = () => {
    setIsMemberBookings(prev => !prev);
    setCurrentPage(1);
  };

  const openStatusModal = booking => {
    setCurrentBooking(booking);
    setShowStatusModal(true);
    if (booking.bookingType === 'room' && !booking.roomId) {
      fetchAvailableRooms(booking);
    }
  };

  const openPaymentModal = booking => {
    setCurrentBooking(booking);
    setShowPaymentModal(true);
  };

  const openRoomModal = booking => {
    setCurrentBooking(booking);
    setShowRoomModal(true);
    fetchAvailableRooms(booking);
  };

  const updateBookingStatus = async status => {
    if (!currentBooking) return;

    setStatusLoading(true);
    try {
      let payload = { status, remarks: statusRemark };
      let newTotalCost = currentBooking.totalCost;

      if (status === 'confirmed' && currentBooking.bookingType === 'room' && !currentBooking.roomId) {
        if (!selectedRoomId) {
          setError('Please select a room');
          setStatusLoading(false);
          return;
        }
        const selectedRoom = availableRooms.find(room => room._id === selectedRoomId);
        if (!selectedRoom) {
          setError('Selected room not found');
          setStatusLoading(false);
          return;
        }
        newTotalCost = calculateTotalCost(currentBooking, selectedRoom);
        payload.roomId = selectedRoomId;
        payload.totalCost = newTotalCost;
      }

      const response = await axios.put(
        `https://nn-z4al.onrender.com/api/bookings/${currentBooking._id}/status`,
        payload,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccess(`Booking ${status} successfully`);
        setBookings(prev =>
          prev.map(booking =>
            booking._id === currentBooking._id
              ? {
                  ...booking,
                  status,
                  roomId: payload.roomId || booking.roomId,
                  totalCost: payload.totalCost || booking.totalCost,
                  roomNumber: payload.roomId ? availableRooms.find(room => room._id === payload.roomId)?.roomNumber : booking.roomNumber,
                }
              : booking
          )
        );
        setShowStatusModal(false);
        setShowRoomModal(false);
        setStatusRemark('');
        setSelectedRoomId('');
        setAvailableRooms([]);
      }
    } catch (error) {
      console.error('Error updating booking status:', error);
      setError(error.response?.data?.message || 'Failed to update booking status');
    } finally {
      setStatusLoading(false);
    }
  };

  const updatePaymentStatus = async () => {
    if (!currentBooking) return;

    setStatusLoading(true);
    try {
      const response = await axios.put(
        `https://nn-z4al.onrender.com/api/bookings/${currentBooking._id}/payment`,
        { paymentStatus: 'paid' },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccess('Payment marked as received');
        setBookings(prev =>
          prev.map(booking =>
            booking._id === currentBooking._id ? { ...booking, paymentStatus: 'paid' } : booking
          )
        );
        setShowPaymentModal(false);
      }
    } catch (error) {
      console.error('Error updating payment status:', error);
      setError(error.response?.data?.message || 'Failed to update payment status');
    } finally {
      setStatusLoading(false);
    }
  };

  const handleCheckIn = async () => {
    if (!currentBooking) return;

    setStatusLoading(true);
    try {
      const response = await axios.put(
        `https://nn-z4al.onrender.com/api/bookings/${currentBooking._id}/checkin`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccess('Booking checked-in successfully');
        setBookings(prev =>
          prev.map(booking =>
            booking._id === currentBooking._id ? { ...booking, status: 'completed' } : booking
          )
        );
        setShowStatusModal(false);
      }
    } catch (error) {
      console.error('Error checking in:', error);
      setError(error.response?.data?.message || 'Failed to check-in');
    } finally {
      setStatusLoading(false);
    }
  };

  const handleCheckOut = async () => {
    if (!currentBooking) return;

    setStatusLoading(true);
    try {
      const response = await axios.put(
        `https://nn-z4al.onrender.com/api/bookings/${currentBooking._id}/checkout`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccess('Booking checked-out successfully');
        setBookings(prev =>
          prev.map(booking =>
            booking._id === currentBooking._id ? { ...booking, status: 'completed' } : booking
          )
        );
        setShowStatusModal(false);
      }
    } catch (error) {
      console.error('Error checking out:', error);
      setError(error.response?.data?.message || 'Failed to check-out');
    } finally {
      setStatusLoading(false);
    }
  };

  const formatDate = dateString => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadge = status => {
    switch (status) {
      case 'confirmed': return 'success';
      case 'pending': return 'warning';
      case 'rejected': return 'danger';
      case 'cancelled': return 'secondary';
      case 'completed': return 'info';
      default: return 'secondary';
    }
  };

  return (
    <Container fluid className="py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Manage {isMemberBookings ? 'Member' : 'Non-Member'} Bookings</h2>
        <div>
         
          <Button variant="outline-secondary" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
      </div>
      <Card className="shadow-sm mb-3">
       <Card.Header>
        <h5 className="mb-0">
            <Filter size={18} className="me-2" />
            Filter Bookings
          </h5>
       </Card.Header>
        <Card.Body>
          <Row>
            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select name="status" value={filters.status} onChange={handleFilterChange}>
                  <option value="">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="confirmed">Confirmed</option>
                  <option value="rejected">Rejected</option>
                  <option value="cancelled">Cancelled</option>
                  <option value="completed">Completed</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>Booking Type</Form.Label>
                <Form.Select name="bookingType" value={filters.bookingType} onChange={handleFilterChange}>
                  <option value="">All Types</option>
                  <option value="room">Room</option>
                  <option value="service">Service</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>Start Date</Form.Label>
                <Form.Control type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
              </Form.Group>
            </Col>
            <Col md={3} className="mb-3">
              <Form.Group>
                <Form.Label>End Date</Form.Label>
                <Form.Control
                  type="date"
                  name="endDate"
                  value={filters.endDate}
                  onChange={handleFilterChange}
                  min={filters.startDate}
                />
              </Form.Group>
            </Col>
          </Row>
        </Card.Body>
      </Card>
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          {loading ? (
            <div className="text-center py-4">
              <Spinner animation="border" variant="primary" />
              <p className="mt-2">Loading bookings...</p>
            </div>
          ) : bookings.length === 0 ? (
            <Alert variant="info" className="m-3">
              No {isMemberBookings ? 'member' : 'non-member'} bookings found for the selected filters.
            </Alert>
          ) : (
            <>
              <Table responsive hover className="align-middle mb-0">
                <thead>
                  <tr>
                    <th>Booking ID</th>
                    <th>Type</th>
                    <th>{isMemberBookings ? 'Member' : 'Occupant'}</th>
                    <th>Booking For</th>
                    <th>Relation</th>
                    <th>Check-In</th>
                    <th>Check-Out</th>
                    <th>Room</th>
                    <th>Status</th>
                    <th>Payment</th>
                    <th>Amount</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map(booking => (
                    <tr key={booking._id}>
                      <td>{booking._id}</td>
                      <td>
                        <Badge bg={booking.bookingType === 'room' ? 'info' : 'success'}>{booking.bookingType}</Badge>
                      </td>
                      <td>{isMemberBookings ? booking.userId?.name || 'N/A' : booking.occupantDetails?.name || 'N/A'}</td>
                      <td>
                        {booking.bookingFor}
                        {booking.guestId && <Badge bg="success" className="ms-1">Guest</Badge>}
                      </td>
                      <td>{booking.relation || '-'}</td>
                      <td>{formatDate(booking.checkIn)}</td>
                      <td>{formatDate(booking.checkOut)}</td>
                      <td>{booking.roomId ? booking.roomId.roomNumber || 'Assigned' : 'Not Assigned'}</td>
                      <td>
                        <Badge bg={getStatusBadge(booking.status)}>{booking.status}</Badge>
                      </td>
                      <td>
                        <Badge bg={booking.paymentStatus === 'paid' ? 'success' : 'warning'}>
                          {booking.paymentStatus}
                        </Badge>
                      </td>
                      <td>₹{booking.totalCost.toLocaleString()}</td>
                      <td>
                        <div className="d-flex gap-2">
                          {/* <Link to={`/booking/${booking._id}`}>
                            <Button variant="outline-primary" size="sm">
                              <Eye size={16} />
                            </Button>
                          </Link> */}
                          {(booking.status === 'pending' || booking.status === 'confirmed') && (
                            <>
                              {booking.bookingType === 'room' && !booking.roomId && (
                                <Button variant="outline-info" size="sm" onClick={() => openRoomModal(booking)}>
                                  <BedDouble size={16} />
                                </Button>
                              )}
                              {/* <Button variant="outline-success" size="sm" onClick={() => openStatusModal(booking)}>
                                <CheckCircle size={16} />
                              </Button>
                              <Button variant="outline-danger" size="sm" onClick={() => openStatusModal(booking)}>
                                <XCircle size={16} />
                              </Button> */}
                            </>
                          )}
                          {(booking.status === 'confirmed' || booking.status === 'completed') && booking.paymentStatus === 'pending' && (
                            <Button variant="outline-warning" size="sm" onClick={() => openPaymentModal(booking)}>
                              <DollarSign size={16} />
                            </Button>
                          )}
                          {booking.status === 'confirmed' && (
                            <Button
                              variant="outline-success"
                              size="sm"
                              onClick={() => {
                                setCurrentBooking(booking);
                                handleCheckIn();
                              }}
                            >
                              <LogIn size={16} />
                            </Button>
                          )}
                          {booking.status === 'completed' && booking.roomId && (
                            <Button
                              variant="outline-danger"
                              size="sm"
                              onClick={() => {
                                setCurrentBooking(booking);
                                handleCheckOut();
                              }}
                            >
                              <LogOut size={16} />
                            </Button>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </>
          )}
        </Card.Body>
      </Card>
      <Modal show={showStatusModal} onHide={() => setShowStatusModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Update Booking Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentBooking && (
            <>
              <p>
                <strong>Booking ID:</strong> {currentBooking._id}
                <br />
                <strong>{isMemberBookings ? 'Member' : 'Occupant'}:</strong> {isMemberBookings ? currentBooking.userId?.name || 'N/A' : currentBooking.occupantDetails?.name || 'N/A'}
                <br />
                <strong>Type:</strong> {currentBooking.bookingType}
                <br />
                <strong>Current Status:</strong> {currentBooking.status}
                <br />
                {currentBooking.bookingType === 'room' && !currentBooking.roomId && (
                  <>
                    <strong>Room:</strong> Not Assigned
                  </>
                )}
              </p>
              <Form.Group className="mb-3">
                <Form.Label>Remarks (Optional)</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={statusRemark}
                  onChange={e => setStatusRemark(e.target.value)}
                  placeholder="Add any remarks about this status change"
                />
              </Form.Group>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowStatusModal(false)}>
            Cancel
          </Button>
          <Button
            variant="success"
            onClick={() => updateBookingStatus('confirmed')}
            disabled={statusLoading || (currentBooking?.bookingType === 'room' && !currentBooking?.roomId && !selectedRoomId)}
          >
            {statusLoading ? 'Processing...' : 'Confirm Booking'}
          </Button>
          <Button
            variant="danger"
            onClick={() => updateBookingStatus('rejected')}
            disabled={statusLoading}
          >
            {statusLoading ? 'Processing...' : 'Reject Booking'}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showRoomModal} onHide={() => setShowRoomModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentBooking && (
            <>
              <p>
                <strong>Booking ID:</strong> {currentBooking._id}
                <br />
                <strong>Room Type:</strong> {currentBooking.roomType}
                <br />
                <strong>Check-In:</strong> {formatDate(currentBooking.checkIn)}
                <br />
                <strong>Check-Out:</strong> {formatDate(currentBooking.checkOut)}
                <br />
                <strong>Location:</strong> {currentBooking.sporti}
              </p>
              {roomsLoading ? (
                <div className="text-center py-3">
                  <Spinner animation="border" variant="primary" />
                  <p className="mt-2">Loading available rooms...</p>
                </div>
              ) : availableRooms.length === 0 ? (
                <Alert variant="warning">No available rooms found for the selected criteria.</Alert>
              ) : (
                <Form.Group className="mb-3">
                  <Form.Label>Select Room</Form.Label>
                  <Form.Select value={selectedRoomId} onChange={e => setSelectedRoomId(e.target.value)}>
                    <option value="">Select a room</option>
                    {availableRooms.map(room => (
                      <option key={room._id} value={room._id}>
                        {room.roomNumber} ({room.category}, Floor {room.floor}, ₹
                        {(currentBooking.bookingFor === 'Self' || (currentBooking.bookingFor === 'Guest' && currentBooking.relation === 'Batchmate')
                          ? room.price.member
                          : room.price.guest
                        ).toLocaleString()}
                        /night)
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              )}
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowRoomModal(false)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={() => updateBookingStatus('confirmed')}
            disabled={statusLoading || !selectedRoomId || roomsLoading}
          >
            {statusLoading ? 'Processing...' : 'Assign and Confirm'}
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal show={showPaymentModal} onHide={() => setShowPaymentModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Mark Payment as Received</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentBooking && (
            <>
              <p>
                <strong>Booking ID:</strong> {currentBooking._id}
                <br />
                <strong>{isMemberBookings ? 'Member' : 'Occupant'}:</strong> {isMemberBookings ? currentBooking.userId?.name || 'N/A' : currentBooking.occupantDetails?.name || 'N/A'}
                <br />
                <strong>Amount:</strong> ₹{currentBooking.totalCost.toLocaleString()}
              </p>
              <Alert variant="info">
                <DollarSign size={18} className="me-2" />
                Confirm that payment has been received for this booking.
              </Alert>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowPaymentModal(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={updatePaymentStatus} disabled={statusLoading}>
            {statusLoading ? 'Processing...' : 'Confirm Payment'}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageBookings;