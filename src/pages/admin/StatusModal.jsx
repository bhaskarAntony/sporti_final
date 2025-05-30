import React from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const StatusModal = ({
  show,
  onHide,
  booking,
  statusRemark,
  setStatusRemark,
  onUpdateStatus,
  statusLoading,
  isNonMember = false,
  formatDate,
}) => {
  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Update Booking Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {booking && (
          <>
            <p>
              <strong>{isNonMember ? 'Application No.' : 'Booking ID'}:</strong> {isNonMember ? booking.applicationNumber || 'N/A' : booking.bookingId}
              <br />
              <strong>{isNonMember ? 'Officer' : 'Member'}:</strong> {isNonMember ? booking.officerDetails?.name || 'N/A' : booking.userId?.name}
              {isNonMember && (
                <>
                  <br />
                  <strong>Occupant:</strong> {booking.occupantDetails?.name || 'N/A'}
                </>
              )}
              <br />
              <strong>Type:</strong> {booking.bookingType}
              <br />
              <strong>Current Status:</strong> {booking.status}
              <br />
              {booking.bookingType === 'room' && !booking.roomId && (
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
                onChange={(e) => setStatusRemark(e.target.value)}
                placeholder="Add any remarks about this status change"
              />
            </Form.Group>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button
          variant="success"
          onClick={() => onUpdateStatus('confirmed')}
          disabled={statusLoading || (booking?.bookingType === 'room' && !booking?.roomId)}
        >
          {statusLoading ? 'Processing...' : 'Confirm Booking'}
        </Button>
        <Button
          variant="danger"
          onClick={() => onUpdateStatus('rejected')}
          disabled={statusLoading}
        >
          {statusLoading ? 'Processing...' : 'Reject Booking'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default StatusModal;