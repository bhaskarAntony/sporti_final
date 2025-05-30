import React from 'react';
import{  Link } from 'react-router-dom';
import { Table, Badge, Button, Alert, Spinner } from 'react-bootstrap';
import { Eye, CheckCircle, XCircle, DollarSign, BedDouble, LogIn, LogOut } from 'lucide-react';

const BookingTable = ({
  bookings,
  loading,
  isNonMember = false,
  onOpenStatusModal,
  onOpenRoomModal,
  onOpenPaymentModal,
  onCheckIn,
  onCheckOut,
  formatDate,
  getStatusBadge,
}) => {
  return (
    <Table responsive hover className="align-middle mb-0">
      <thead>
        <tr>
          <th>{isNonMember ? 'Application No.' : 'Booking ID'}</th>
          <th>{isNonMember ? 'Officer' : 'Member'}</th>
          {isNonMember && <th>Occupant</th>}
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
        {loading ? (
          <tr>
            <td colSpan={isNonMember ? 12 : 11} className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3">Loading bookings...</p>
            </td>
          </tr>
        ) : bookings.length === 0 ? (
          <tr>
            <td colSpan={isNonMember ? 12 : 11}>
              <Alert variant="info" className="m-3">
                No bookings found matching the selected filters.
              </Alert>
            </td>
          </tr>
        ) : (
          bookings.map((booking) => (
            <tr key={booking._id}>
              <td>{isNonMember ? booking.applicationNumber || 'N/A' : booking.bookingId}</td>
              <td>{isNonMember ? booking.officerDetails?.name || 'N/A' : booking.userId?.name}</td>
              {isNonMember && <td>{booking.occupantDetails?.name || 'N/A'}</td>}
              <td>{booking.bookingFor}</td>
              <td>{booking.relation || '-'}</td>
              <td>{formatDate(booking.checkIn)}</td>
              <td>{formatDate(booking.checkOut)}</td>
              <td>{booking.roomId ? booking.roomNumber || 'Assigned' : 'Not Assigned'}</td>
              <td>
                <Badge bg={getStatusBadge(booking.status)} className="status-badge">
                  {booking.status}
                </Badge>
              </td>
              <td>
                <Badge bg={booking.paymentStatus === 'paid' ? 'success' : 'warning'}>
                  {booking.paymentStatus}
                </Badge>
              </td>
              <td>₹{booking.totalCost.toLocaleString()}</td>
              <td>
                <div className="d-flex gap-2">
                  <Link to={isNonMember ? `/non-member-booking/${booking._id}` : `/booking/${booking._id}`}>
                    <Button variant="outline-primary" size="sm">
                      <Eye size={16} />
                    </Button>
                  </Link>
                  {booking.status === 'pending' && (
                    <>
                      {booking.bookingType === 'room' && !booking.roomId && (
                        <Button
                          variant="outline-info"
                          size="sm"
                          onClick={() => onOpenRoomModal(booking)}
                        >
                          <BedDouble size={16} />
                        </Button>
                      )}
                      {/* <Button
                        variant="outline-success"
                        size="sm"
                        onClick={() => onOpenStatusModal(booking)}
                      >
                        <CheckCircle size={16} />
                      </Button> */}
                      {/* <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => onOpenStatusModal(booking)}
                      >
                        <XCircle size={16} />
                      </Button> */}
                    </>
                  )}
                  {booking.status === 'confirmed' && booking.paymentStatus === 'pending' && (
                    <Button
                      variant="outline-warning"
                      size="sm"
                      onClick={() => onOpenPaymentModal(booking)}
                    >
                      <DollarSign size={16} />
                    </Button>
                  )}
                  {booking.status === 'confirmed' && (
                    <Button
                      variant="outline-success"
                      size="sm"
                      onClick={() => onCheckIn(booking)}
                    >
                      <LogIn size={16} />
                    </Button>
                  )}
                  {booking.status === 'completed' && booking.roomId && (
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onCheckOut(booking)}
                    >
                      <LogOut size={16} />
                    </Button>
                  )}
                </div>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </Table>
  );
};

export default BookingTable;