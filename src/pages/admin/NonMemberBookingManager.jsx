import React, { useState, useEffect, useContext } from 'react';
import { Container, Card } from 'react-bootstrap';
import axios from 'axios';
import AlertContext from '../../context/AlertContext.jsx';
import AuthContext from '../../context/AuthContext.jsx';
import BookingFilters from './BookingFilters.jsx';
import BookingTable from './BookingTable.jsx';
import StatusModal from './StatusModal.jsx';
import RoomModal from './RoomModal.jsx';
import PaymentModal from './PaymentModal.jsx';

const ManageNonMemberBookings = () => {
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
  const [filters, setFilters] = useState({
    status: '',
    bookingType: 'room',
    startDate: '',
    endDate: '',
  });
  const [totalBookings, setTotalBookings] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  useEffect(() => {
    fetchBookings();
  }, [filters, currentPage]);

  const fetchBookings = async () => {
    setLoading(true);
    try {
      const params = { ...filters, page: currentPage, limit: itemsPerPage };
      const response = await axios.get('https://nn-z4al.onrender.com/api/guest', {
        params,
        headers: { Authorization: `Bearer ${token}` },
      });

      if (response.data.success) {
        setBookings(response.data.bookings);
        setTotalBookings(response.data.count);
      }
    } catch (error) {
      console.error('Error fetching non-member bookings:', error);
      setError('Failed to fetch non-member bookings');
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

  const calculateTotalCost = (booking, roomId) => {
    const room = availableRooms.find((r) => r._id === roomId);
    if (!room) {
      throw new Error('Selected room not found');
    }
    const checkInDate = new Date(booking.checkIn);
    const checkOutDate = new Date(booking.checkOut);
    const diffTime = Math.abs(checkOutDate - checkInDate);
    const numberOfNights = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    const pricePerNight =
      booking.bookingFor === 'Self' || booking.relation === 'Batchmate'
        ? room.price.member
        : room.price.guest;
    return pricePerNight * numberOfNights;
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({ ...prev, [name]: value }));
    setCurrentPage(1);
  };

  const resetFilters = () => {
    setFilters({
      status: '',
      bookingType: 'room',
      startDate: '',
      endDate: '',
    });
    setCurrentPage(1);
  };

  const openStatusModal = (booking) => {
    setCurrentBooking(booking);
    setShowStatusModal(true);
    if (booking.bookingType === 'room' && !booking.roomId) {
      fetchAvailableRooms(booking);
    }
  };

  const openPaymentModal = (booking) => {
    setCurrentBooking(booking);
    setShowPaymentModal(true);
  };

  const openRoomModal = (booking) => {
    setCurrentBooking(booking);
    setShowRoomModal(true);
    fetchAvailableRooms(booking);
  };

  const updateBookingStatus = async (status) => {
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
        const selectedRoom = availableRooms.find((room) => room._id === selectedRoomId);
        if (!selectedRoom) {
          setError('Selected room not found');
          setStatusLoading(false);
          return;
        }
        newTotalCost = calculateTotalCost(currentBooking, selectedRoomId);
        payload.roomId = selectedRoomId;
        payload.totalCost = newTotalCost;
      }

      const response = await axios.put(
        `https://nn-z4al.onrender.com/api/guest/${currentBooking._id}/status`,
        payload,
        {
          params: { isNonMember: true },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccess(`Booking ${status} successfully`);
        setBookings((prev) =>
          prev.map((booking) =>
            booking._id === currentBooking._id
              ? {
                  ...booking,
                  status,
                  roomId: payload.roomId || booking.roomId,
                  totalCost: payload.totalCost || booking.totalCost,
                  roomNumber: payload.roomId
                    ? availableRooms.find((room) => room._id === payload.roomId)?.roomNumber
                    : booking.roomNumber,
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
        `https://nn-z4al.onrender.com/api/guest/${currentBooking._id}/payment`,
        { paymentStatus: 'paid' },
        {
          params: { isNonMember: true },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccess('Payment marked as received');
        setBookings((prev) =>
          prev.map((booking) =>
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

  const handleCheckIn = async (booking) => {
    setCurrentBooking(booking);
    setStatusLoading(true);
    try {
      const response = await axios.put(
        `https://nn-z4al.onrender.com/api/guest/${booking._id}/checkin`,
        {},
        {
          params: { isNonMember: true },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccess('Booking checked-in successfully');
        setBookings((prev) =>
          prev.map((b) => (b._id === booking._id ? { ...b, status: 'completed' } : b))
        );
      }
    } catch (error) {
      console.error('Error checking in:', error);
      setError(error.response?.data?.message || 'Failed to check-in');
    } finally {
      setStatusLoading(false);
    }
  };

  const handleCheckOut = async (booking) => {
    setCurrentBooking(booking);
    setStatusLoading(true);
    try {
      const response = await axios.put(
        `https://nn-z4al.onrender.com/api/guest/${booking._id}/checkout`,
        {},
        {
          params: { isNonMember: true },
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.data.success) {
        setSuccess('Booking checked-out successfully');
        setBookings((prev) =>
          prev.map((b) => (b._id === booking._id ? { ...b, status: 'completed' } : b))
        );
      }
    } catch (error) {
      console.error('Error checking out:', error);
      setError(error.response?.data?.message || 'Failed to check-out');
    } finally {
      setStatusLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case 'confirmed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'rejected':
        return 'danger';
      case 'cancelled':
        return 'secondary';
      case 'completed':
        return 'info';
      default:
        return 'secondary';
    }
  };

  return (
    <Container fluid className="py-4">
      <h2 className="mb-4">Manage Non-Member Bookings</h2>
      <BookingFilters
        filters={filters}
        onFilterChange={handleFilterChange}
        onResetFilters={resetFilters}
        isNonMember
      />
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <BookingTable
            bookings={bookings}
            loading={loading}
            isNonMember
            onOpenStatusModal={openStatusModal}
            onOpenRoomModal={openRoomModal}
            onOpenPaymentModal={openPaymentModal}
            onCheckIn={handleCheckIn}
            onCheckOut={handleCheckOut}
            formatDate={formatDate}
            getStatusBadge={getStatusBadge}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
            totalBookings={totalBookings}
            setCurrentPage={setCurrentPage}
          />
        </Card.Body>
      </Card>
      <StatusModal
        show={showStatusModal}
        onHide={() => setShowStatusModal(false)}
        booking={currentBooking}
        statusRemark={statusRemark}
        setStatusRemark={setStatusRemark}
        onUpdateStatus={updateBookingStatus}
        statusLoading={statusLoading}
        isNonMember
        formatDate={formatDate}
      />
      <RoomModal
        show={showRoomModal}
        onHide={() => setShowRoomModal(false)}
        booking={currentBooking}
        availableRooms={availableRooms}
        selectedRoomId={selectedRoomId}
        setSelectedRoomId={setSelectedRoomId}
        onUpdateStatus={updateBookingStatus}
        statusLoading={statusLoading}
        roomsLoading={roomsLoading}
        isNonMember
        formatDate={formatDate}
      />
      <PaymentModal
        show={showPaymentModal}
        onHide={() => setShowPaymentModal(false)}
        booking={currentBooking}
        onUpdatePaymentStatus={updatePaymentStatus}
        statusLoading={statusLoading}
        isNonMember
      />
    </Container>
  );
};

export default ManageNonMemberBookings;