import React from 'react';
import { Modal, Button, Form, Alert, Spinner } from 'react-bootstrap';

const RoomModal = ({
  show,
  onHide,
  booking,
  availableRooms,
  selectedRoomId,
  setSelectedRoomId,
  onUpdateStatus,
  statusLoading,
  roomsLoading,
  isNonMember = false,
  formatDate,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Assign Room</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {booking && (
          <>
            <p>
              <strong>{isNonMember ? 'Application No.' : 'Booking ID'}:</strong>{' '}
              {isNonMember ? booking.applicationNumber || 'N/A' : booking._id}
              <br />
              <strong>Room Type:</strong> {booking.roomType}
              <br />
              <strong>Check-In:</strong> {formatDate(booking.checkIn)}
              <br />
              <strong>Check-Out:</strong> {formatDate(booking.checkOut)}
              <br />
              <strong>Location:</strong> {booking.sporti}
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
                <Form.Select value={selectedRoomId} onChange={(e) => setSelectedRoomId(e.target.value)}>
                  <option value="">Select a room</option>
                  {availableRooms.map((room) => (
                    <option key={room._id} value={room._id}>
                      {room.roomNumber} ({room.category}, Floor {room.floor}, ₹
                      {(
                        (booking.bookingFor === 'Self' ||
                        (booking.bookingFor === 'Guest' && booking.relation === 'Batchmate')
                          ? room.price.member
                          : room.price.guest
                        ) || 0
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
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={() => onUpdateStatus('confirmed')}
          disabled={statusLoading || !selectedRoomId || roomsLoading}
        >
          {statusLoading ? 'Processing...' : 'Assign and Confirm'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default RoomModal;