// src/ConferenceHallBook.js

import React, { useState } from 'react';
import axios from 'axios';
import { Dropdown } from 'react-bootstrap';

const ConferenceHallBook = () => {
    const [formData, setFormData] = useState({
        user: '',
        conferenceHall: '',
        bookingType: '',
        checkIn: '',
        checkOut: ''
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData)
        try {
            const res = await axios.post('http://localhost:5000/api/confrenceHall', formData);
            console.log(res.data);
            // Handle success, maybe show a confirmation message
        } catch (error) {
            console.error('Error:', error);
            // Handle error
        }
    };

    const handleSelectConferenceHall = (hall) => {
        setFormData({ ...formData, conferenceHall: hall });
    };

    return (
     <div className="container-fluid">
        <div className="contact-banner">
    <div className="skew-container">
        <div className="skew-left">
            <h1 className="fs-2 fw-bold">Conference Hall</h1>
        </div>
        <div className="skew-right d-flex align-items-center">
        <h1 className="fs-2 fw-bold"></h1>
        </div>
    </div>
   </div>
        <div className="row  p-3 p-md-5">
            <div className="col-md-6 offset-md-4">
            <div className='card shadow'>
            {/* <h2>Conference Hall Booking</h2> */}
            <form onSubmit={handleSubmit}>
                <div className='form-group mt-3'>
                    <label className='form-label'>Username</label>
                    <input type="text" name="user" className='form-control' value={formData.user} onChange={handleChange} />
                </div>
                <div className='form-group mt-3'>
                    <label className='form-label'>Conference Hall:</label>
                    <Dropdown>
                        <Dropdown.Toggle variant="primary" className='w-100 bg-transparent text-start text-black border-secondary rounded-1'>
                            {formData.conferenceHall ? formData.conferenceHall : 'Select Conference Hall'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item onClick={() => handleSelectConferenceHall('Hall A')}>Hall A</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSelectConferenceHall('Hall B')}>Hall B</Dropdown.Item>
                            <Dropdown.Item onClick={() => handleSelectConferenceHall('Hall C')}>Hall C</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className='form-group mt-3'>
                    <label className='form-label'>Booking Type:</label>
                    <input type="text" name="bookingType" className='form-control' value={formData.bookingType} onChange={handleChange} />
                </div>
                <div className='form-group mt-3'>
                    <label className='form-label'>Check In:</label>
                    <input type="datetime-local" className='form-control' name="checkIn" value={formData.checkIn} onChange={handleChange} />
                </div>
                <div className='form-group mt-3'>
                    <label className='form-label'>Check Out:</label>
                    <input type="datetime-local" className='form-control' name="checkOut" value={formData.checkOut} onChange={handleChange} />
                </div>
                <button type="submit" className='btn btn-primary w-100 mt-3 p-3'>Book Conference Hall</button>
            </form>
        </div>
            </div>
        </div>
     </div>
    );
};

export default ConferenceHallBook;
