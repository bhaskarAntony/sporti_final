import { CSVLink } from 'react-csv';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Button, Modal } from 'react-bootstrap';
import './style.css';

const BookingsDownload = ({ bookings }) => {
  const [filteredData, setFilteredData] = useState([]);
  const [selectedFilter, setSelectedFilter] = useState('daily'); // 'daily', 'weekly', 'monthly'
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0]); // For day selection
  const [selectedMonth, setSelectedMonth] = useState(new Date().toISOString().slice(0, 7)); // For month selection
  const [selectedWeek, setSelectedWeek] = useState(new Date().toISOString().split("T")[0]); // For week selection
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    filterBookings();
  }, [selectedFilter, selectedDate, selectedMonth, selectedWeek, bookings]);

  const headers = [
    { label: "Username", key: "username" },
    { label: "Email", key: "email" },
    { label: "Officer Designation", key: "officerDesignation" },
    { label: "Officer Cadre", key: "officerCadre" },
    { label: "Phone Number", key: "phoneNumber" },
    { label: "Application No", key: "applicationNo" },
    { label: "Sport", key: "sporti" },
    { label: "Service Name", key: "serviceName" },
    { label: "Check-In Date", key: "checkIn" },
    { label: "Check-Out Date", key: "checkOut" },
    { label: "Service Type", key: "serviceType" },
    { label: "Room Type", key: "roomType" },
    { label: "No. of Guests", key: "noGuests" },
    { label: "Payment Status", key: "paymentStatus" },
    { label: "Total Cost", key: "totalCost" },
    { label: "Status", key: "status" },
    { label: "Rejection Reason", key: "rejectionReason" },
    { label: "Selected Room Number", key: "selectedRoomNumber" },
    { label: "Payment Status", key: "paymentStatus" },
  ];

  const filterBookings = () => {
    let filtered = [];

    if (selectedFilter === 'daily') {
      filtered = bookings.filter((booking) => 
        booking.serviceName === "Room Booking" &&
        moment(booking.checkIn).isSame(moment(selectedDate), 'day')
      );
    } else if (selectedFilter === 'weekly') {
      filtered = bookings.filter((booking) => 
        booking.serviceName === "Room Booking" &&
        moment(booking.checkIn).isSame(moment(selectedWeek), 'week')
      );
    } else if (selectedFilter === 'monthly') {
      filtered = bookings.filter((booking) => 
        booking.serviceName === "Room Booking" &&
        moment(booking.checkIn).isSame(moment(selectedMonth), 'month')
      );
    }

    setFilteredData(filtered);
  };

  const handleFilterChange = (event) => {
    setSelectedFilter(event.target.value);
  };

  return (
    <Fragment>
   <center className="p-3">
   <button className="main-btn" onClick={handleShow}>Download booking data</button>
   </center>
      <Modal show={show} onHide={handleClose} className='rounded-0 p-3 p-md-5'>
        <Modal.Header closeButton className='py-0'>
          <Modal.Title>Download Booking Data</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className='form-group mt-3'>
            <label className='text-secondary'>Filter Bookings by</label>
            <select value={selectedFilter} onChange={handleFilterChange} className='form-select'>
              <option value="daily">Daily</option>
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>

          {selectedFilter === 'daily' && (
            <div className='form-group mt-3'>
              <label className='text-secondary'>Select Day</label>
              <input
                type="date"
                className="form-control"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
              />
            </div>
          )}

          {selectedFilter === 'weekly' && (
            <div className='form-group mt-3'>
              <label className='text-secondary'>Select Week Start Date</label>
              <input
                type="date"
                className="form-control"
                value={selectedWeek}
                onChange={(e) => setSelectedWeek(e.target.value)}
              />
            </div>
          )}

          {selectedFilter === 'monthly' && (
            <div className='form-group mt-3'>
              <label className='text-secondary'>Select Month</label>
              <input
                type="month"
                className="form-control"
                value={selectedMonth}
                onChange={(e) => setSelectedMonth(e.target.value)}
              />
            </div>
          )}
        </Modal.Body>
        <Modal.Footer className='py-0'>
         
          <CSVLink 
            data={filteredData}
            headers={headers}
            filename={`booking_data_${selectedFilter}.csv`}
            className="main-btn w-100 rounded-0"
          >
            <i className="bi bi-download"></i> Download {selectedFilter} Data
          </CSVLink>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
};

export default BookingsDownload;
