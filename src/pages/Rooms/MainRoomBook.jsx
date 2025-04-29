import React, { useState, useEffect } from 'react';
import { Dropdown, Modal, Button, OverlayTrigger, Tooltip } from 'react-bootstrap';
import SuccessPopup from '../../components/popups/SuccessPopup';
import axios from 'axios';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDialog } from '../../components/popups/DialogContext';
import Loading from '../../components/popups/Loading';
import DOMPurify from 'dompurify';
import { useLanguage } from '../../context/LangaugeContext';
import { toast } from 'react-toastify';

function sanitizeInput(input, field) {
    let sanitized = DOMPurify.sanitize(input, { USE_PROFILES: { html: true } });
    if (field === 'checkIn' || field === 'checkOut') {
        return input;
    }
    if (field === 'email') {
        sanitized = sanitized.replace(/[^a-zA-Z0-9@._-]/g, '');
    } else if (field === 'phoneNumber' || field === 'age') {
        sanitized = sanitized.replace(/[^0-9]/g, '');
    } else if (field === 'aadhaarNumber') {
        sanitized = sanitized.replace(/[^0-9]/g, '');
    } else {
        sanitized = sanitized.replace(/[^a-zA-Z0-9 ]/g, '');
    }
    return sanitized;
}

function MainRoomBook() {
    const { isKannada } = useLanguage();
    const [isLoading, setIsLoading] = useState(false);
    const [roomLoading, setRoomLoading] = useState(true);
    const [rooms, setRooms] = useState([]);
    const [selectedLanguage, setSelectedLanguage] = useState('english');
    const [minCheckOutDate, setMinCheckOutDate] = useState('');
    const [totalCost, setTotalCost] = useState(0);
    const [showRoomModal, setShowRoomModal] = useState(false);

    const [formData, setFormData] = useState({
        username: '',
        officerDesignation: '',
        email: '',
        phoneNumber: '',
        checkIn: '',
        checkOut: '',
        sporti: '',
        bookingFor: 'Self',
        roomType: '',
        roomNo: '',
        guestDetails: {
            name: '',
            relationship: '',
            gender: '',
            age: '',
            mobileNo: '',
            email: '',
            aadhaarNumber: '',
            interests: []
        }
    });

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [desc, setDesc] = useState(null);
    const [title, setTitle] = useState(null);

    const location = useLocation();
    const navigate = useNavigate();
    const { openDialog } = useDialog();

    useEffect(() => {
        const savedData = localStorage.getItem('roombooking');
        if (savedData) {
            setFormData(JSON.parse(savedData));
        }
    }, []);

    useEffect(() => {
        const fetchRooms = async () => {
            setRoomLoading(true);
            try {
                // Fetch rooms based on selected room type and sporti
                const roomRes = await axios.get(`https://sporti-backend-live-p00l.onrender.com/api/available/rooms?roomType=${formData.roomType}&sporti=${formData.sporti}`);
                const roomsData = roomRes.data;

                // Fetch all bookings for the selected sporti and room type
                const bookingRes = await axios.get('https://sporti-backend-live-p00l.onrender.com/api/sporti/service/bookings');
                const bookings = bookingRes.data;

                // Filter rooms based on their booking status and availability after checkout
                const availableRooms = roomsData.filter(room => {
                    // Find all bookings for the current room
                    const roomBookings = bookings.filter(booking => booking.roomId === room._id);

                    // Check if the room is available after all current bookings
                    const isAvailable = roomBookings.every(booking => {
                        const checkInDate = new Date(formData.checkIn);
                        const checkOutDate = new Date(booking.checkOut);
                        return checkInDate > checkOutDate; // Room is available if checkIn is after all checkOuts
                    });

                    // Return true if the room is either never booked or available after all bookings
                    return !room.isBooked || isAvailable;
                });

                setRooms(availableRooms);
                setRoomLoading(false);
            } catch (error) {
                setRoomLoading(false);
                console.error(error);
            }
        };

        if (formData.roomType && formData.sporti && formData.checkIn) {
            fetchRooms();
        }
    }, [formData.roomType, formData.sporti, formData.checkIn]);

    useEffect(() => {
        localStorage.setItem('roombooking', JSON.stringify(formData));
    }, [formData]);

    useEffect(() => {
        setSelectedLanguage(isKannada ? "kannada" : "english");
    }, [isKannada]);

    useEffect(() => {
        if (formData.checkIn && formData.checkOut && formData.roomType && formData.roomNo) {
            const checkInDate = new Date(formData.checkIn);
            const checkOutDate = new Date(formData.checkOut);
            const timeDiff = checkOutDate - checkInDate;
            const days = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));

            const pricing = {
                Family: { Self: 2000, Guest: 2500 },
                VIP: { Self: 3000, Guest: 3500 },
                Standard: { Self: 1500, Guest: 2000 }
            };

            const ratePerDay = pricing[formData.roomType]?.[formData.bookingFor] || 0;
            const total = ratePerDay * days;
            setTotalCost(total);
        } else {
            setTotalCost(0);
        }
    }, [formData.checkIn, formData.checkOut, formData.roomType, formData.bookingFor, formData.roomNo]);

    const handleClose = () => {
        setShowModal(false);
    };

    const openModal = (title, desc) => {
        setShowModal(true);
        setDesc(desc);
        setTitle(title);
    };

    const handleRoomModalClose = () => {
        setShowRoomModal(false);
    };

    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: sanitizeInput(value, name)
        });
        setErrors({
            ...errors,
            [name]: ''
        });

        if (name === 'checkIn') {
            setMinCheckOutDate(value);
        }
    };

    const handleGuestDetailChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (name === 'interests') {
            setFormData(prev => ({
                ...prev,
                guestDetails: {
                    ...prev.guestDetails,
                    interests: checked
                        ? [...prev.guestDetails.interests, value]
                        : prev.guestDetails.interests.filter(i => i !== value)
                }
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                guestDetails: {
                    ...prev.guestDetails,
                    [name]: sanitizeInput(value, name)
                }
            }));
        }
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleDropdownChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value,
            roomNo: '' // Reset room selection when changing sporti or room type
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleRoomSelect = (roomNumber) => {
        setFormData({
            ...formData,
            roomNo: roomNumber
        });
        setShowRoomModal(false);
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.username.trim()) {
            newErrors.username = selectedLanguage === 'kannada' ? 'ಹೆಸರು ಅಗತ್ಯವಿದೆ' : 'Username is required';
        }
        if (!formData.email.trim()) {
            newErrors.email = selectedLanguage === 'kannada' ? 'ಇಮೇಲ್ ಅಗತ್ಯವಿದೆ' : 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = selectedLanguage === 'kannada' ? 'ಅಮಾನ್ಯ ಇಮೇಲ್ ವಿಳಾಸ' : 'Invalid email address';
        }
        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = selectedLanguage === 'kannada' ? 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ' : 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = selectedLanguage === 'kannada' ? 'ಅಮಾನ್ಯ ದೂರವಾಣಿ ಸಂಖ್ಯೆ' : 'Invalid phone number';
        }
        if (!formData.sporti) {
            newErrors.sporti = selectedLanguage === 'kannada' ? 'SPORTI ಆಯ್ಕೆ ಅಗತ್ಯವಿದೆ' : 'SPORTI selection is required';
        }
        if (!formData.officerDesignation) {
            newErrors.officerDesignation = selectedLanguage === 'kannada' ? 'ಅಧಿಕಾರಿಯ ಹುದ್ದೆ ಅಗತ್ಯವಿದೆ' : 'Officer Designation is required';
        }
        if (!formData.roomType) {
            newErrors.roomType = selectedLanguage === 'kannada' ? 'ಕೋಣೆ ಪ್ರಕಾರ ಆಯ್ಕೆ ಅಗತ್ಯವಿದೆ' : 'Room type selection is required';
        }
        if (!formData.checkIn) {
            newErrors.checkIn = selectedLanguage === 'kannada' ? 'ಪರಿಶೀಲನೆದ ದಿನಾಂಕ ಮತ್ತು ಸಮಯ ಅಗತ್ಯವಿದೆ' : 'Check-in date and time are required';
        }
        if (!formData.checkOut) {
            newErrors.checkOut = selectedLanguage === 'kannada' ? 'ಚೆಕ್-ಔಟ್ ದಿನಾಂಕ ಮತ್ತು ಸಮಯ ಅಗತ್ಯವಿದೆ' : 'Check-out date and time are required';
        }
        if (!formData.roomNo) {
            newErrors.roomNo = selectedLanguage === 'kannada' ? 'ಕೋಣೆ ಸಂಖ್ಯೆ ಆಯ್ಕೆ ಅಗತ್ಯವಿದೆ' : 'Room number selection is required';
        }

        if (formData.bookingFor === 'Guest') {
            const guest = formData.guestDetails;
            if (!guest.name.trim()) {
                newErrors.guestName = selectedLanguage === 'kannada' ? 'ಅತಿಥಿಯ ಹೆಸರು ಅಗತ್ಯವಿದೆ' : 'Guest name is required';
            }
            if (!guest.relationship) {
                newErrors.guestRelationship = selectedLanguage === 'kannada' ? 'ಸಂಬಂಧ ಆಯ್ಕೆ ಅಗತ್ಯವಿದೆ' : 'Relationship is required';
            }
            if (!guest.gender) {
                newErrors.guestGender = selectedLanguage === 'kannada' ? 'ಲಿಂಗ ಆಯ್ಕೆ ಅಗತ್ಯವಿದೆ' : 'Gender is required';
            }
            if (!guest.age) {
                newErrors.guestAge = selectedLanguage === 'kannada' ? 'ವಯಸ್ಸು ಅಗತ್ಯವಿದೆ' : 'Age is required';
            }
            if (!guest.mobileNo.trim()) {
                newErrors.guestMobileNo = selectedLanguage === 'kannada' ? 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ' : 'Mobile number is required';
            } else if (!/^\d{10}$/.test(guest.mobileNo)) {
                newErrors.guestMobileNo = selectedLanguage === 'kannada' ? 'ಅಮಾನ್ಯ ದೂರವಾಣಿ ಸಂಖ್ಯೆ' : 'Invalid mobile number';
            }
            if (!guest.email.trim()) {
                newErrors.guestEmail = selectedLanguage === 'kannada' ? 'ಇಮೇಲ್ ಅಗತ್ಯವಿದೆ' : 'Email is required';
            } else if (!/\S+@\S+\.\S+/.test(guest.email)) {
                newErrors.guestEmail = selectedLanguage === 'kannada' ? 'ಅಮಾನ್ಯ ಇಮೇಲ್ ವಿಳಾಸ' : 'Invalid email address';
            }
            if (!guest.aadhaarNumber.trim()) {
                newErrors.guestAadhaar = selectedLanguage === 'kannada' ? 'ಆಧಾರ್ ಸಂಖ್ಯೆ ಅಗತ್ಯವಿದೆ' : 'Aadhaar number is required';
            } else if (!/^\d{12}$/.test(guest.aadhaarNumber)) {
                newErrors.guestAadhaar = selectedLanguage === 'kannada' ? 'ಅಮಾನ್ಯ ಆಧಾರ್ ಸಂಖ್ಯೆ' : 'Invalid Aadhaar number';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const today = new Date().toISOString().split('T')[0];

    const renderRoomTypes = () => {
        if (formData.sporti === 'SPORTI-2') {
            return (
                <>
                    <Dropdown.Item eventKey="VIP">{selectedLanguage === 'kannada' ? 'ವಿಐಪಿ' : 'VIP'}</Dropdown.Item>
                    <Dropdown.Item eventKey="Standard">{selectedLanguage === 'kannada' ? 'ಸಾಮಾನ್ಯ' : 'Standard'}</Dropdown.Item>
                </>
            );
        } else if (formData.sporti === 'SPORTI-1') {
            return (
                <>
                    <Dropdown.Item eventKey="Family">{selectedLanguage === 'kannada' ? 'ಕುಟುಂಬ' : 'Family'}</Dropdown.Item>
                    <Dropdown.Item eventKey="VIP">{selectedLanguage === 'kannada' ? 'ವಿಐಪಿ' : 'Suite (ADGP & Above)'}</Dropdown.Item>
                    <Dropdown.Item eventKey="Standard">{selectedLanguage === 'kannada' ? 'ಸಾಮಾನ್ಯ' : 'Standard'}</Dropdown.Item>
                </>
            );
        } else {
            return null;
        }
    };

    const RoomLoader = () => {
        if (roomLoading) {
            return (
                <div className="spinner-border spinner-border-sm mt-2 text-success" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            );
        }
    };

    const renderRooms = () => {
        if (!formData.sporti || !formData.roomType || rooms.length === 0) {
            return (
                <div className="text-center text-muted">
                    {selectedLanguage === 'kannada' ? 'ಯಾವುದೇ ಕೋಣೆಗಳು ಲಭ್ಯವಿಲ್ಲ' : 'No rooms available'}
                </div>
            );
        }

        // Group rooms by floor
        const floors = [...new Set(rooms.map(room => room.floor))].sort();

        return floors.map(floor => (
            <div key={floor} className="mb-4">
                <h5 className="text-primary mb-3" style={{ borderBottom: '2px solid #007bff', paddingBottom: '5px' }}>
                    {floor}
                </h5>
               <div className="row">
               {rooms
                        .filter(room => room.floor === floor)
                        .map(room => {
                            const isAvailable = !room.isBooked;
                            const isSelected = formData.roomNo === room.roomNumber;

                            return (
                                <div key={room.roomNumber} className="col-md-3 p-3">
                                    <OverlayTrigger
                                        placement="top"
                                        overlay={
                                            <Tooltip>
                                                {isAvailable
                                                    ? (selectedLanguage === 'kannada' ? 'ಲಭ್ಯವಿದೆ - ಆಯ್ಕೆ ಮಾಡಲು ಕ್ಲಿಕ್ ಮಾಡಿ' : 'Available - Click to select')
                                                    : (selectedLanguage === 'kannada' ? 'ಬುಕ್ ಆಗಿದೆ' : 'Booked')}
                                            </Tooltip>
                                        }
                                    >
                                        <div
                                            className={`card w-100 h-100 ${isAvailable ? 'border-success' : 'border-danger'} ${isSelected ? 'border-3 shadow-lg' : ''}`}
                                            style={{
                                                backgroundColor: isAvailable ? '#e6ffe6' : '#ffe6e6',
                                                cursor: isAvailable ? 'pointer' : 'not-allowed',
                                                transition: 'transform 0.2s ease, box-shadow 0.2s ease',
                                                borderRadius: '10px',
                                                overflow: 'hidden'
                                            }}
                                            onClick={() => isAvailable && handleRoomSelect(room.roomNumber)}
                                            onMouseEnter={(e) => {
                                                if (isAvailable) {
                                                    e.currentTarget.style.transform = 'scale(1.05)';
                                                    e.currentTarget.style.boxShadow = '0 8px 16px rgba(0,0,0,0.2)';
                                                }
                                            }}
                                            onMouseLeave={(e) => {
                                                e.currentTarget.style.transform = 'scale(1)';
                                                e.currentTarget.style.boxShadow = 'none';
                                            }}
                                        >
                                            <div className="card-body text-center p-3">
                                                <h6 className="mb-1 fw-bold">{room.roomNumber}</h6>
                                                <small className={isAvailable ? 'text-success' : 'text-danger'}>
                                                    {isAvailable
                                                        ? (selectedLanguage === 'kannada' ? 'ಲಭ್ಯವಿದೆ' : 'Available')
                                                        : (selectedLanguage === 'kannada' ? 'ಬುಕ್ ಆಗಿದೆ' : 'Booked')}
                                                </small>
                                            </div>
                                            <div
                                                className="card-footer p-1"
                                                style={{
                                                    backgroundColor: isAvailable ? '#28a745' : '#dc3545',
                                                    color: 'white',
                                                    fontSize: '0.8rem'
                                                }}
                                            >
                                                {room.category}
                                            </div>
                                        </div>
                                    </OverlayTrigger>
                                </div>
                            );
                        })}
               </div>
            </div>
        ));
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }
        setIsLoading(true);
        const dataToSubmit = { ...formData, totalCost };
        axios.post('https://sporti-backend-live-3.onrender.com/api/sporti/service/room/book', dataToSubmit)
            .then(response => {
                const { success } = response.data;
                if (success) {
                    setIsLoading(false);
                    openDialog('Success', `${selectedLanguage === 'kannada' ? 'ನಿಮ್ಮ ಬುಕ್ಕಿಂಗ್ ವಿನಂತಿಯನ್ನು ನಿರ್ವಹಕನಿಗೆ ಕಳುಹಿಸಲಾಗಿದೆ.' : 'Your booking request has been sent to the administrator.'}`);
                } else {
                    setIsLoading(false);
                    openModal('Error', selectedLanguage === 'kannada' ? 'ಬುಕ್ಕಿಂಗ್ ವಿಫಲವಾಗಿದೆ, ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' : 'Booking failed, please try again.');
                }
            })
            .catch(error => {
                setIsLoading(false);
                openModal('Error', selectedLanguage === 'kannada' ? 'ಬುಕ್ಕಿಂಗ್ ವಿಫಲವಾಗಿದೆ, ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' : 'Booking failed, please try again.');
            });
    };

    if (isLoading) {
        return <Loading />;
    }

    const ConfirmDetails = () => {
        if (!validateForm()) {
            return;
        }
        if (formData.checkIn === formData.checkOut) {
            toast.error('Check-In Date and Check-Out Date should be different');
            alert('Check-In Date and Check-Out Date should be different');
            return;
        }
        navigate('/confirm/room/details', { state: { data: { ...formData, totalCost } } });
    };

    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const currentDateTime = `${year}-${month}-${day}T${hours}:${minutes}`;

    return (
        <div className='main-function-hall-booking container-fluid p-1 p-md-5 form'>
            <div className="row">
                <div className="col-md-8 mx-auto">
                    <div className="bg-white rounded shadow-sm">
                        <div className="bg-main p-3 text-center">
                            <h1 className="fs-3 text-light">{selectedLanguage === 'kannada' ? ' Room  ಬುಕ್ಕಿಂಗ್ ವೇಳಾಪಟ್ಟಿ' : 'SPORTI Room Booking Form'}</h1>
                            <div className="d-flex justify-content-end">
                                <Dropdown onSelect={(value) => setSelectedLanguage(value)} className='w-auto'>
                                    <Dropdown.Toggle variant="secondary" id="dropdown-language">
                                        {selectedLanguage === 'kannada' ? 'ಕನ್ನಡ' : 'English'}
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item eventKey="english">English</Dropdown.Item>
                                        <Dropdown.Item eventKey="kannada">ಕನ್ನಡ</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </div>
                        </div>

                        <div className="p-3">
                            <form onSubmit={submitForm}>
                                <div className="form-group mt-3">
                                    <span htmlFor="username">{selectedLanguage === 'kannada' ? 'ಹೆಸರು' : 'Officer\'s Name'}</span>
                                    <input
                                        type="text"
                                        id="username"
                                        name="username"
                                        value={formData.username}
                                        onChange={handleFormChange}
                                        placeholder={selectedLanguage === 'kannada' ? 'ನಿಮ್ಮ ಹೆಸರು ಪ್ರವೇಶಿಸಿ' : 'Enter your name'}
                                        className={`form-control ${errors.username ? 'is-invalid' : ''}`}
                                    />
                                    {errors.username && <div className="invalid-feedback">{errors.username}</div>}
                                </div>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="form-group mt-3">
                                            <span htmlFor="officerDesignation">{selectedLanguage === 'kannada' ? 'ಅಧಿಕಾರಿಯ ಹುದ್ದೆ' : 'Officer Designation'}</span>
                                            <input
                                                type="text"
                                                id="officerDesignation"
                                                name="officerDesignation"
                                                value={formData.officerDesignation}
                                                onChange={handleFormChange}
                                                placeholder={selectedLanguage === 'kannada' ? 'ಅಧಿಕಾರಿಯ ಹುದ್ದೆ ನಮೂದಿಸಿ' : 'Enter Officer Designation'}
                                                className={`form-control ${errors.officerDesignation ? 'is-invalid' : ''}`}
                                            />
                                            {errors.officerDesignation && <div className="invalid-feedback">{errors.officerDesignation}</div>}
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="form-group mt-4">
                                            <span htmlFor="bookingFor" className="form-span">
                                                {selectedLanguage === 'kannada' ? 'ಬುಕಿಂಗ್ ಯಾರಿಗಾಗಿ' : 'Booking For'}
                                            </span>
                                            <Dropdown onSelect={(value) => handleDropdownChange('bookingFor', value)} className="w-100">
                                                <Dropdown.Toggle variant="secondary" id="dropdown-bookingFor" className="w-100">
                                                    {formData.bookingFor || (selectedLanguage === 'kannada' ? 'ಆಯ್ಕೆಮಾಡಿ' : 'Select Booking Type')}
                                                </Dropdown.Toggle>
                                                <Dropdown.Menu>
                                                    <Dropdown.Item eventKey="Self">
                                                        {selectedLanguage === 'kannada' ? 'ಸ್ವತಃ' : 'Self'}
                                                    </Dropdown.Item>
                                                    <Dropdown.Item eventKey="Guest">
                                                        {selectedLanguage === 'kannada' ? 'ಅತಿಥಿ' : 'Guest'}
                                                    </Dropdown.Item>
                                                </Dropdown.Menu>
                                            </Dropdown>
                                        </div>
                                    </div>
                                </div>
                                {formData.bookingFor === 'Guest' && (
                                    <div className='bg-light p-3 border mt-4'>
                                        <h5 className="mt-4">{selectedLanguage === 'kannada' ? 'ಅತಿಥಿ ವಿವರಗಳು' : 'Guest Details'}</h5>
                                        <div className="row">
                                            <div className="col-md-6">
                                                <div className="form-group mt-3">
                                                    <span htmlFor="guestName">{selectedLanguage === 'kannada' ? 'ಹೆಸರು' : 'Name'}</span>
                                                    <input
                                                        type="text"
                                                        id="guestName"
                                                        name="name"
                                                        value={formData.guestDetails.name}
                                                        onChange={handleGuestDetailChange}
                                                        placeholder={selectedLanguage === 'kannada' ? 'ಅತಿಥಿಯ ಹೆಸರು' : 'Guest Name'}
                                                        className={`form-control ${errors.guestName ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.guestName && <div className="invalid-feedback">{errors.guestName}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mt-3">
                                                    <span htmlFor="relationship">{selectedLanguage === 'kannada' ? 'ಸಂಬಂಧ' : 'Relationship'}</span>
                                                    <Dropdown onSelect={(value) => setFormData(prev => ({ ...prev, guestDetails: { ...prev.guestDetails, relationship: value } }))}>
                                                        <Dropdown.Toggle variant="secondary" id="relationship-dropdown">
                                                            {formData.guestDetails.relationship || (selectedLanguage === 'kannada' ? 'ಆಯ್ಕೆ ಮಾಡಿ' : 'Select')}
                                                        </Dropdown.Toggle>
                                                        <Dropdown.Menu>
                                                            <Dropdown.Item eventKey="Spouse">{selectedLanguage === 'kannada' ? 'ಪತಿ/ಪತ್ನಿ' : 'Spouse'}</Dropdown.Item>
                                                            <Dropdown.Item eventKey="Child">{selectedLanguage === 'kannada' ? 'ಮಗು' : 'Child'}</Dropdown.Item>
                                                        </Dropdown.Menu>
                                                    </Dropdown>
                                                    {errors.guestRelationship && <div className="invalid-feedback">{errors.guestRelationship}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mt-3">
                                                    <span>{selectedLanguage === 'kannada' ? 'ಲಿಂಗ' : 'Gender'}</span>
                                                    <div>
                                                        <label className="me-3">
                                                            <input
                                                                type="radio"
                                                                name="gender"
                                                                value="Male"
                                                                checked={formData.guestDetails.gender === 'Male'}
                                                                onChange={handleGuestDetailChange}
                                                            /> {selectedLanguage === 'kannada' ? 'ಗಂಡು' : 'Male'}
                                                        </label>
                                                        <label>
                                                            <input
                                                                type="radio"
                                                                name="gender"
                                                                value="Female"
                                                                checked={formData.guestDetails.gender === 'Female'}
                                                                onChange={handleGuestDetailChange}
                                                            /> {selectedLanguage === 'kannada' ? 'ಹೆಣ್ಣು' : 'Female'}
                                                        </label>
                                                    </div>
                                                    {errors.guestGender && <div className="invalid-feedback">{errors.guestGender}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mt-3">
                                                    <span htmlFor="age">{selectedLanguage === 'kannada' ? 'ವಯಸ್ಸು' : 'Age'}</span>
                                                    <input
                                                        type="number"
                                                        id="age"
                                                        name="age"
                                                        value={formData.guestDetails.age}
                                                        onChange={handleGuestDetailChange}
                                                        placeholder={selectedLanguage === 'kannada' ? 'ವಯಸ್ಸು' : 'Age'}
                                                        className={`form-control ${errors.guestAge ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.guestAge && <div className="invalid-feedback">{errors.guestAge}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mt-3">
                                                    <span htmlFor="guestMobileNo">{selectedLanguage === 'kannada' ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ' : 'Mobile No'}</span>
                                                    <input
                                                        type="text"
                                                        id="guestMobileNo"
                                                        name="mobileNo"
                                                        value={formData.guestDetails.mobileNo}
                                                        onChange={handleGuestDetailChange}
                                                        placeholder={selectedLanguage === 'kannada' ? 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ' : 'Mobile Number'}
                                                        className={`form-control ${errors.guestMobileNo ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.guestMobileNo && <div className="invalid-feedback">{errors.guestMobileNo}</div>}
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="form-group mt-3">
                                                    <span htmlFor="guestEmail">{selectedLanguage === 'kannada' ? 'ಇಮೇಲ್' : 'Email ID'}</span>
                                                    <input
                                                        type="email"
                                                        id="guestEmail"
                                                        name="email"
                                                        value={formData.guestDetails.email}
                                                        onChange={handleGuestDetailChange}
                                                        placeholder={selectedLanguage === 'kannada' ? 'ಇಮೇಲ್' : 'Email ID'}
                                                        className={`form-control ${errors.guestEmail ? 'is-invalid' : ''}`}
                                                    />
                                                    {errors.guestEmail && <div className="invalid-feedback">{errors.guestEmail}</div>}
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group mt-3">
                                            <span htmlFor="aadhaarNumber">{selectedLanguage === 'kannada' ? 'ಆಧಾರ್ ಸಂಖ್ಯೆ' : 'Aadhaar Number'}</span>
                                            <input
                                                type="text"
                                                id="aadhaarNumber"
                                                name="aadhaarNumber"
                                                value={formData.guestDetails.aadhaarNumber}
                                                onChange={handleGuestDetailChange}
                                                placeholder={selectedLanguage === 'kannada' ? 'ಆಧಾರ್ ಸಂಖ್ಯೆ' : 'Aadhaar Number'}
                                                className={`form-control ${errors.guestAadhaar ? 'is-invalid' : ''}`}
                                            />
                                            {errors.guestAadhaar && <div className="invalid-feedback">{errors.guestAadhaar}</div>}
                                        </div>
                                        <div className="form-group mt-3">
                                            <span>{selectedLanguage === 'kannada' ? 'ಆಸಕ್ತಿಗಳು' : 'Interests'}</span>
                                            <div>
                                                <label className="me-3">
                                                    <input
                                                        type="checkbox"
                                                        name="interests"
                                                        value="Reading"
                                                        checked={formData.guestDetails.interests.includes('Reading')}
                                                        onChange={handleGuestDetailChange}
                                                    /> {selectedLanguage === 'kannada' ? 'ಓದುವಿಕೆ' : 'Reading'}
                                                </label>
                                                <label className="me-3">
                                                    <input
                                                        type="checkbox"
                                                        name="interests"
                                                        value="Sports"
                                                        checked={formData.guestDetails.interests.includes('Sports')}
                                                        onChange={handleGuestDetailChange}
                                                    /> {selectedLanguage === 'kannada' ? 'ಕ್ರೀಡೆ' : 'Sports'}
                                                </label>
                                                <label className="me-3">
                                                    <input
                                                        type="checkbox"
                                                        name="interests"
                                                        value="Movies"
                                                        checked={formData.guestDetails.interests.includes('Movies')}
                                                        onChange={handleGuestDetailChange}
                                                    /> {selectedLanguage === 'kannada' ? 'ಚಲನಚಿತ್ರಗಳು' : 'Movies'}
                                                </label>
                                                <label className="me-3">
                                                    <input
                                                        type="checkbox"
                                                        name="interests"
                                                        value="Music"
                                                        checked={formData.guestDetails.interests.includes('Music')}
                                                        onChange={handleGuestDetailChange}
                                                    /> {selectedLanguage === 'kannada' ? 'ಸಂಗೀತ' : 'Music'}
                                                </label>
                                                <label className="me-3">
                                                    <input
                                                        type="checkbox"
                                                        name="interests"
                                                        value="Adventure"
                                                        checked={formData.guestDetails.interests.includes('Adventure')}
                                                        onChange={handleGuestDetailChange}
                                                    /> {selectedLanguage === 'kannada' ? 'ಸಾಹಸ' : 'Adventure'}
                                                </label>
                                                <label>
                                                    <input
                                                        type="checkbox"
                                                        name="interests"
                                                        value="Others"
                                                        checked={formData.guestDetails.interests.includes('Others')}
                                                        onChange={handleGuestDetailChange}
                                                    /> {selectedLanguage === 'kannada' ? 'ಇತರೆ' : 'Others'}
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                )}
                                <div className="form-group mt-3">
                                    <span htmlFor="email">{selectedLanguage === 'kannada' ? 'ಇಮೇಲ್' : 'Email'}</span>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleFormChange}
                                        placeholder={selectedLanguage === 'kannada' ? 'ನಿಮ್ಮ ಇಮೇಲ್ ವಿಳಾಸ ನಮೂದಿಸಿ' : 'Enter your email address'}
                                        className={`form-control ${errors.email ? 'is-invalid' : ''}`}
                                    />
                                    {errors.email && <div className="invalid-feedback">{errors.email}</div>}
                                </div>
                                <div className="form-group mt-3">
                                    <span htmlFor="phoneNumber">{selectedLanguage === 'kannada' ? 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ' : 'Phone Number'}</span>
                                    <input
                                        type="text"
                                        id="phoneNumber"
                                        name="phoneNumber"
                                        value={formData.phoneNumber}
                                        onChange={handleFormChange}
                                        placeholder={selectedLanguage === 'kannada' ? 'ನಿಮ್ಮ ದೂರವಾಣಿ ಸಂಖ್ಯೆ ನಮೂದಿಸಿ' : 'Enter your phone number'}
                                        className={`form-control ${errors.phoneNumber ? 'is-invalid' : ''}`}
                                    />
                                    {errors.phoneNumber && <div className="invalid-feedback">{errors.phoneNumber}</div>}
                                </div>
                                <div className="form-group mt-3">
                                    <span htmlFor="checkIn">{selectedLanguage === 'kannada' ? 'ಪರಿಶೀಲನೆ' : 'Check-In'}</span>
                                    <input
                                        type="datetime-local"
                                        id="checkIn"
                                        name="checkIn"
                                        min={currentDateTime}
                                        value={formData.checkIn}
                                        onChange={handleFormChange}
                                        className={`form-control ${errors.checkIn ? 'is-invalid' : ''}`}
                                    />
                                    {errors.checkIn && <div className="invalid-feedback">{errors.checkIn}</div>}
                                </div>
                                <div className="form-group mt-3">
                                    <span htmlFor="checkOut">{selectedLanguage === 'kannada' ? 'ಚೆಕ್-ಔಟ್' : 'Check-Out'}</span>
                                    <input
                                        type="datetime-local"
                                        id="checkOut"
                                        name="checkOut"
                                        value={formData.checkOut}
                                        onChange={handleFormChange}
                                        min={formData.checkIn}
                                        disabled={!formData.checkIn}
                                        className={`form-control ${errors.checkOut ? 'is-invalid' : ''}`}
                                    />
                                    {errors.checkOut && <div className="invalid-feedback">{errors.checkOut}</div>}
                                </div>
                                <div className="form-group mt-3">
                                    <span htmlFor="sporti">{selectedLanguage === 'kannada' ? 'SPORTI' : 'SPORTI'}</span>
                                    <Dropdown onSelect={(value) => handleDropdownChange('sporti', value)}>
                                        <Dropdown.Toggle variant="success" id="sporti-dropdown">
                                            {formData.sporti || (selectedLanguage === 'kannada' ? 'ಆಯ್ಕೆ ಮಾಡಿ' : 'Select')}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="SPORTI-1">{selectedLanguage === 'kannada' ? 'SPORTI-1' : 'SPORTI-1'}</Dropdown.Item>
                                            <Dropdown.Item eventKey="SPORTI-2">{selectedLanguage === 'kannada' ? 'SPORTI-2' : 'SPORTI-2'}</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {errors.sporti && <div className="invalid-feedback">{errors.sporti}</div>}
                                    {RoomLoader()}
                                </div>
                                <div className="form-group mt-3">
                                    <span htmlFor="roomType">{selectedLanguage === 'kannada' ? 'ಕೋಣೆ ಪ್ರಕಾರ' : 'Room Type'}</span>
                                    <Dropdown onSelect={(value) => handleDropdownChange('roomType', value)}>
                                        <Dropdown.Toggle variant="success" id="roomType-dropdown">
                                            {formData.roomType || (selectedLanguage === 'kannada' ? 'ಆಯ್ಕೆ ಮಾಡಿ' : 'Select')}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {renderRoomTypes()}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {errors.roomType && <div className="invalid-feedback">{errors.roomType}</div>}
                                    {RoomLoader()}
                                </div>
                                <div className="mt-4">
                                    <Button
                                        variant="primary"
                                        onClick={() => setShowRoomModal(true)}
                                        disabled={!formData.sporti || !formData.roomType}
                                        style={{ backgroundColor: '#007bff', borderColor: '#007bff', borderRadius: '20px', padding: '10px 20px' }}
                                    >
                                        {selectedLanguage === 'kannada' ? 'ಕೋಣೆ ಆಯ್ಕೆಮಾಡಿ' : 'Select Room'}
                                    </Button>
                                    {formData.roomNo && (
                                        <div className="mt-2 text-success">
                                            <span>{selectedLanguage === 'kannada' ? 'ಆಯ್ಕೆ ಮಾಡಿದ ಕೋಣೆ' : 'Selected Room'}: <strong>{formData.roomNo}</strong></span>
                                        </div>
                                    )}
                                    {errors.roomNo && <div className="text-danger mt-2">{errors.roomNo}</div>}
                                </div>
                                {totalCost > 0 && formData.roomNo && (
                                    <div className="mt-3 p-3 bg-success text-white rounded" style={{ borderRadius: '15px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
                                        <h5 className="mb-0">{selectedLanguage === 'kannada' ? 'ಒಟ್ಟು ವೆಚ್ಚ' : 'Total Cost'}: ₹{totalCost}</h5>
                                    </div>
                                )}
                                <div className="col-md-12 text-center mt-4 d-flex gap-3 justify-content-end">
                                    <button
                                        type="button"
                                        className="blue-btn rounded-1 m-0"
                                        onClick={ConfirmDetails}
                                        style={{ backgroundColor: '#007bff', borderColor: '#007bff', borderRadius: '20px', padding: '10px 20px' }}
                                    >
                                        {selectedLanguage === 'english' ? 'Proceed' : 'ಸಲ್ಲಿಸಿ'}
                                    </button>
                                    <button
                                        type="button"
                                        className="btn btn-danger rounded-1 ms-2"
                                        onClick={() => navigate('/')}
                                        style={{ borderRadius: '20px', padding: '10px 20px' }}
                                    >
                                        {selectedLanguage === 'english' ? 'Cancel' : "ರದ್ದುಮಾಡಿ"}
                                    </button>
                                </div>
                            </form>
                        </div>
                        {showModal && <SuccessPopup title={title} desc={desc} onClose={handleClose} />}
                    </div>
                </div>
            </div>

            <Modal show={showRoomModal} onHide={handleRoomModalClose} size="lg">
                <Modal.Header closeButton style={{ backgroundColor: '#f8f9fa', borderBottom: '2px solid #007bff' }}>
                    <Modal.Title>{selectedLanguage === 'kannada' ? 'ಕೋಣೆ ಆಯ್ಕೆಮಾಡಿ' : 'Select a Room'}</Modal.Title>
                </Modal.Header>
                <Modal.Body style={{ maxHeight: '70vh', overflowY: 'auto', backgroundColor: '#f1f3f5' }}>
                    {renderRooms()}
                </Modal.Body>
                <Modal.Footer style={{ backgroundColor: '#f8f9fa', borderTop: '2px solid #007bff' }}>
                    <Button
                        variant="secondary"
                        onClick={handleRoomModalClose}
                        style={{ borderRadius: '20px', padding: '10px 20px' }}
                    >
                        {selectedLanguage === 'kannada' ? 'ಮುಚ್ಚಿ' : 'Close'}
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default MainRoomBook;