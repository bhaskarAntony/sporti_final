import React, { useState, useEffect, useContext, useMemo } from 'react';
import { Container, Row, Col, Form, Button, Card, Alert, Spinner, ToggleButton, ToggleButtonGroup, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BedDouble } from 'lucide-react';
import AuthContext from '../../context/AuthContext.jsx';
import AlertContext from '../../context/AlertContext.jsx';

const BookRoom = () => {
  const { user } = useContext(AuthContext);
  const { setError } = useContext(AlertContext);
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [roomsLoading, setRoomsLoading] = useState(false);
  const [availableRooms, setAvailableRooms] = useState([]);
  const [formData, setFormData] = useState(() => {
    const savedFormData = localStorage.getItem('bookRoomFormData');
    return savedFormData ? JSON.parse(savedFormData) : {
      checkIn: '',
      checkOut: '',
      sporti: '',
      bookingFor: 'Self',
      relation: 'Self',
      roomType: '',
      roomId: null,
      totalCost: 0,
    };
  });
  const [officerDetails, setOfficerDetails] = useState(() => {
    const savedOfficerDetails = localStorage.getItem('bookRoomOfficerDetails');
    return savedOfficerDetails ? JSON.parse(savedOfficerDetails) : {
      name: '',
      designation: '',
      gender: 'Male',
      phoneNumber: '',
    };
  });
  const [occupantDetails, setOccupantDetails] = useState(() => {
    const savedOccupantDetails = localStorage.getItem('bookRoomOccupantDetails');
    return savedOccupantDetails ? JSON.parse(savedOccupantDetails) : {
      name: '',
      phoneNumber: user?.phoneNumber || '',
      gender: 'Male',
      location: '',
      relation: 'Self',
    };
  });
  const [selectedRoom, setSelectedRoom] = useState(() => {
    const savedSelectedRoom = localStorage.getItem('bookRoomSelectedRoom');
    return savedSelectedRoom ? JSON.parse(savedSelectedRoom) : null;
  });
  const [floors, setFloors] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [showRoomModal, setShowRoomModal] = useState(false);

  useEffect(() => {
    localStorage.setItem('bookRoomFormData', JSON.stringify(formData));
  }, [formData]);

  useEffect(() => {
    localStorage.setItem('bookRoomOfficerDetails', JSON.stringify(officerDetails));
  }, [officerDetails]);

  useEffect(() => {
    localStorage.setItem('bookRoomOccupantDetails', JSON.stringify(occupantDetails));
  }, [occupantDetails]);

  useEffect(() => {
    localStorage.setItem('bookRoomSelectedRoom', JSON.stringify(selectedRoom));
  }, [selectedRoom]);

  const allowedRoomTypes = useMemo(() => {
    const isHighRank = user?.designation === 'ADGP' || user?.designation === 'DGP';
    return {
      'SPORTI-1': isHighRank ? ['Standard', 'VIP', 'Family'] : ['Standard', 'Family', 'VIP'],
      'SPORTI-2': isHighRank ? ['Standard', 'VIP'] : ['Standard'],
    };
  }, [user?.designation]);

  const isRoomSelectionAllowed = useMemo(() => {
    return user?.role === 'admin' || formData.bookingFor === 'Self' || (formData.bookingFor === 'Guest' && formData.relation === 'Batchmate');
  }, [user?.role, formData.bookingFor, formData.relation]);

  useEffect(() => {
    const fetchAvailableRooms = async () => {
      if (!formData.sporti || !formData.roomType || !formData.checkIn || !formData.checkOut || !isRoomSelectionAllowed) {
        setAvailableRooms([]);
        setFloors([]);
        setFetchError(null);
        return;
      }

      setRoomsLoading(true);
      setFetchError(null);

      try {
        const response = await axios.get('https://nn-z4al.onrender.com/api/rooms/available', {
          params: {
            sporti: formData.sporti,
            category: formData.roomType,
            checkIn: formData.checkIn,
            checkOut: formData.checkOut,
          },
        });

        if (response.data.success) {
          const validCategories = allowedRoomTypes[formData.sporti] || ['Standard'];
          const filteredRooms = response.data.rooms;

          setAvailableRooms(filteredRooms);
          const uniqueFloors = [...new Set(filteredRooms.map(room => room.floor))].sort();
          setFloors(uniqueFloors);

          if (filteredRooms.length === 0) {
            setFetchError('No rooms available for the selected criteria.');
          }

          if (selectedRoom && !filteredRooms.some(r => r._id === selectedRoom._id)) {
            setSelectedRoom(null);
            setFormData(prev => ({ ...prev, roomId: null, totalCost: 0 }));
          }
        } else {
          setFetchError(response.data.message || 'Failed to fetch rooms');
        }
      } catch (error) {
        const errorMessage = error.response?.data?.message || 'Failed to fetch available rooms';
        setFetchError(errorMessage);
        setError(errorMessage);
      } finally {
        setRoomsLoading(false);
      }
    };

    fetchAvailableRooms();
  }, [formData.sporti, formData.roomType, formData.checkIn, formData.checkOut, allowedRoomTypes, isRoomSelectionAllowed, setError, selectedRoom]);

  const calculateTotalCost = (room) => {
    if (!room || !formData.checkIn || !formData.checkOut) return 0;
    const checkInDate = new Date(formData.checkIn);
    const checkOutDate = new Date(formData.checkOut);
    const days = Math.ceil((checkOutDate - checkInDate) / (1000 * 60 * 60 * 24));
    const price = formData.bookingFor === 'Self' ? room.price.member : room.price.guest;
    return price * days;
  };

  useEffect(() => {
    setFormData(prev => ({ ...prev, totalCost: calculateTotalCost(selectedRoom) }));
  }, [selectedRoom, formData.checkIn, formData.checkOut, formData.bookingFor, formData.relation]);

  const handleFormChange = e => {
    const { name, value } = e.target;
    setFormData(prev => {
      const newFormData = {
        ...prev,
        [name]: value,
      };
      if (name === 'sporti' && value !== prev.sporti) {
        newFormData.roomType = '';
        newFormData.roomId = null;
        newFormData.totalCost = 0;
        setSelectedRoom(null);
      }
      if (name === 'roomType' && value !== prev.roomType) {
        newFormData.roomId = null;
        newFormData.totalCost = 0;
        setSelectedRoom(null);
      }
      return newFormData;
    });
  };

  const handleToggleChange = value => {
    setFormData(prev => ({
      ...prev,
      bookingFor: value,
      relation: value === 'Self' ? 'Self' : 'Batchmate',
      roomId: null,
      totalCost: 0,
    }));
    setSelectedRoom(null);
    if (value === 'Self' && user) {
      setOccupantDetails({
        name: '',
        phoneNumber: user.phoneNumber || '',
        gender: 'Male',
        location: '',
        relation: 'Self',
      });
    } else {
      setOccupantDetails({
        name: '',
        phoneNumber: '',
        gender: 'Male',
        location: '',
        relation: 'Batchmate',
      });
    }
  };

  const handleOfficerChange = e => {
    const { name, value } = e.target;
    setOfficerDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleOccupantChange = e => {
    const { name, value } = e.target;
    setOccupantDetails(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateOccupantDetails = () => {
    if (!occupantDetails.name.trim()) {
      setError('Occupant name is required');
      return false;
    }
    if (!occupantDetails.phoneNumber.trim() || !/^\d{10}$/.test(occupantDetails.phoneNumber)) {
      setError('Valid 10-digit phone number is required');
      return false;
    }
    if (!occupantDetails.location.trim()) {
      setError('Home location is required');
      return false;
    }
    return true;
  };

  const validateOfficerDetails = () => {
    if (!officerDetails.name.trim()) {
      setError('Officer name is required');
      return false;
    }
    if (!officerDetails.designation.trim()) {
      setError('Designation is required');
      return false;
    }
    if (!officerDetails.phoneNumber.trim() || !/^\d{10}$/.test(officerDetails.phoneNumber)) {
      setError('Valid 10-digit phone number is required');
      return false;
    }
    return true;
  };

  const handleRoomSelect = room => {
    setSelectedRoom(prev => {
      const isSameRoom = prev?._id === room._id;
      const newRoom = isSameRoom ? null : room;
      setFormData(prevForm => ({
        ...prevForm,
        roomId: newRoom ? newRoom._id : null,
        totalCost: newRoom ? calculateTotalCost(newRoom) : 0,
      }));
      return newRoom;
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    if (!formData.checkIn || !formData.checkOut || !formData.sporti || !formData.roomType || !formData.relation) {
      setError('Please fill in all required booking fields');
      return;
    }

    if (isRoomSelectionAllowed && !formData.roomId) {
      setError('Please select a room');
      return;
    }

    if (!validateOccupantDetails()) {
      return;
    }

    if (!user && !validateOfficerDetails()) {
      return;
    }

    setLoading(true);
    localStorage.setItem('bookRoomFormData', JSON.stringify(formData));
    localStorage.setItem('bookRoomOfficerDetails', JSON.stringify(officerDetails));
    localStorage.setItem('bookRoomOccupantDetails', JSON.stringify(occupantDetails));
    localStorage.setItem('bookRoomSelectedRoom', JSON.stringify(selectedRoom));
    navigate('/confirm-booking', {
      state: {
        formData,
        selectedRoom,
        bookingType: 'room',
        officerDetails: user ? null : officerDetails,
        occupantDetails,
      },
    });
    setLoading(false);
  };

  const handleCancel = () => {
    localStorage.removeItem('bookRoomFormData');
    localStorage.removeItem('bookRoomOfficerDetails');
    localStorage.removeItem('bookRoomOccupantDetails');
    localStorage.removeItem('bookRoomSelectedRoom');
    navigate('/');
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <Container fluid className="p-3 p-md-5 bg-light">
      <h2 className="mb-4">Room Booking</h2>
      <hr />
      <Row>
        {!user && (
          <Col lg={6} className="mb-4">
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
        )}
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm border-0 rounded-0 h-100">
            <Card.Header className="p-3 bg-main text-white">
              <h5 className="m-0">{formData.bookingFor === 'Self' ? 'Occupant Details' : 'Guest Details'}</h5>
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
                <div className="row">
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Relation</Form.Label>
                      <Form.Select
                        name="relation"
                        value={formData.relation}
                        onChange={e => {
                          handleFormChange(e);
                          handleOccupantChange(e);
                        }}
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
                          </>
                        )}
                      </Form.Select>
                    </Form.Group>
                  </div>
                  <div className="col-md-6 mt-2">
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
                  </div>
                  <div className="col-md-6">
                    <Form.Group className="mb-3">
                      <Form.Label>Phone Number</Form.Label>
                      <Form.Control
                        type="text"
                        name="phoneNumber"
                        value={occupantDetails.phoneNumber}
                        onChange={handleOccupantChange}
                        disabled={formData.bookingFor === 'Self' && user}
                        required
                      />
                    </Form.Group>
                  </div>
                  <div className="col-md-6">
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
                  </div>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
        <Col lg={6} className="mb-4">
          <Card className="shadow-sm border-0 rounded-0">
            <Card.Header className="p-3 bg-main text-white">
              <h5 className="m-0">Room Details</h5>
            </Card.Header>
            <Card.Body className="p-3">
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
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
                  <Col md={6}>
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
                          allowedRoomTypes[formData.sporti]?.map(type => (
                            <option key={type} value={type}>
                              {type} {type === 'VIP' ? '(ADGP & Above)' : ''}
                            </option>
                          ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col md={12}>
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
                  <Col md={12}>
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
                {isRoomSelectionAllowed && (
                  <Form.Group className="mb-3">
                    <Button
                      className="blue-btn m-0 border-0"
                      onClick={() => setShowRoomModal(true)}
                      disabled={!formData.sporti || !formData.roomType || !formData.checkIn || !formData.checkOut}
                    >
                      <BedDouble size={18} className="me-2" />
                      {selectedRoom?.roomNumber ? (
                        <span>{selectedRoom.roomNumber} - Room selected</span>
                      ) : (
                        'Select Room'
                      )}
                    </Button>
                  </Form.Group>
                )}
                {!isRoomSelectionAllowed && formData.bookingFor === 'Guest' && formData.relation !== 'Batchmate' && (
                  <Alert variant="info" className="mb-3">
                    Room will be assigned by the admin for this guest booking.
                  </Alert>
                )}
                {fetchError && (
                  <Alert variant="danger" className="mb-3">
                    {fetchError}
                  </Alert>
                )}
                <hr />
                <div className="d-flex gap-2 mt-3 justify-content-end">
                  <Button
                    type="submit"
                    className="blue-btn m-0 border-0"
                    disabled={(isRoomSelectionAllowed && !formData.roomId) || loading}
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
          <Modal show={showRoomModal} onHide={() => setShowRoomModal(false)} size="md" centered>
            <Modal.Header closeButton>
              <Modal.Title>Select {formData.roomType} Room</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {roomsLoading ? (
                <div className="text-center py-5">
                  <img src="https://media.tenor.com/On7kvXhzml4AAAAj/loading-gif.gif" width={60} alt="sporti" />
                  <p className="mt-3">Loading available rooms...</p>
                </div>
              ) : !isRoomSelectionAllowed ? (
                <Alert variant="info" className="text-center p-3">
                  <p className="fs-5 fw-bold">
                    Room selection is not available. Admin will assign rooms for this booking.
                  </p>
                </Alert>
              ) : !formData.sporti || !formData.roomType || !formData.checkIn || !formData.checkOut ? (
                <div className="text-center p-3">
                  <img
                    src="https://upload.wikimedia.org/wikipedia/commons/a/aa/Home_icon_grey.png"
                    alt=""
                    className="w-50"
                  />
                  <p className="fs-5 fw-bold text-center">
                    Please select SPORTI location, room type, and dates to view available rooms.
                  </p>
                </div>
              ) : fetchError ? (
                <Alert variant="danger" className="text-center">
                  <p className="fs-5 fw-bold">{fetchError}</p>
                </Alert>
              ) : availableRooms.length === 0 ? (
                <Alert variant="danger" className="text-center">
                  <img
                    src="https://png.pngtree.com/png-vector/20221008/ourmid/pngtree-prohibition-sign-transparent-png-image_6291515.png"
                    alt=""
                    className="w-25"
                    style={{ opacity: '0.6' }}
                  />
                  <h1 className="fs-4 fw-bold">No Rooms Available</h1>
                  <p className="fs-6 text-center">
                    No rooms available for the selected criteria. Please try different dates or room type.
                  </p>
                </Alert>
              ) : (
                <div className="row">
                  {floors.map(floor => (
                    <div key={floor} className="mb-4 col-md-12">
                      <h6 className="border-bottom pb-2 mb-3">{floor}</h6>
                      <Row>
                        {availableRooms
                          .filter(room => room.floor === floor)
                          .map(room => (
                            <Col key={room._id} xs={6} md={2} className="mb-3">
                              <Card
                                className={`room-card h-100 ${
                                  selectedRoom?._id === room._id ? 'border border-3 border-success' : 'border-0'
                                }`}
                                onClick={() => handleRoomSelect(room)}
                              >
                                <Card.Body className="text-center p-1">
                                  <h5 className="m-0 small">{room.roomNumber}</h5>
                                </Card.Body>
                              </Card>
                            </Col>
                          ))}
                      </Row>
                    </div>
                  ))}
                </div>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowRoomModal(false)}>
                Select
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default BookRoom;