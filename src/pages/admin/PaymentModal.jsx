import React from 'react';
import { Modal, Button, Alert } from 'react-bootstrap';

const PaymentModal = ({ show, onHide, booking, onUpdatePaymentStatus, statusLoading, isNonMember }) => {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Update Payment Status</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {booking && (
          <>
            <p>
              <strong>Application Number:</strong> {booking.applicationNumber}
            </p>
            <p>
              <strong>Occupant:</strong> {booking.occupantDetails.name}
            </p>
            <p>
              <strong>Total Cost:</strong> ₹{booking.totalCost.toLocaleString('en-IN')}
            </p>
            <p>
              <strong>Current Payment Status:</strong> {booking.paymentStatus}
            </p>
            {booking.paymentStatus === 'paid' ? (
              <Alert variant="info">Payment has already been marked as received.</Alert>
            ) : (
              <Alert variant="warning">Mark the payment as received for this booking?</Alert>
            )}
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide} disabled={statusLoading}>
          Cancel
        </Button>
        <Button
          variant="primary"
          onClick={onUpdatePaymentStatus}
          disabled={statusLoading || booking?.paymentStatus === 'paid'}
        >
          {statusLoading ? 'Processing...' : 'Mark as Paid'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;