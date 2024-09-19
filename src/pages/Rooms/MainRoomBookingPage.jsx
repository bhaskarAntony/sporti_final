import React, { useState, useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import SuccessPopup from '../../components/popups/SuccessPopup';
import CryptoJS from 'crypto-js';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { useDialog } from '../../components/popups/DialogContext';
import Loading from '../../components/popups/Loading';
import { useLanguage } from '../../context/LangaugeContext';

function MainRoomBook() {
    const {iskannada} = useLanguage()
    alert(iskannada)
    const {sporti} = useParams();
    const [isLoading, setIsLoading] = useState(false)
    const [formData, setFormData] = useState({
        username: '',
        officerDesignation: '',
        officerCadre: '',
        email: '',
        phoneNumber: '',
        checkIn: '',
        checkOut: '',
        sporti: sporti,
        serviceType: '',
        serviceName:'Room Booking',
        roomType: '',
        noGuests: 1,
        totalCost: 0,
    });

    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [desc, setDesc] = useState(null);
    const [title, setTitle] = useState(null);

    useEffect(() => {
        const totalCost = calculateTotalCost();
        setFormData((prevFormData) => ({
            ...prevFormData,
            totalCost,
        }));
    }, [formData.roomType, formData.guestType, formData.noGuests]);

    const handleClose = () => {
        setShowModal(false);
    };

    const openModal = (title, desc) => {
        setShowModal(true);
        setDesc(desc);
        setTitle(title);
    };
    const navigate = useNavigate()
    const { openDialog } = useDialog();


    const handleFormChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const handleDropdownChange = (name, value) => {
        setFormData({
            ...formData,
            [name]: value
        });
        setErrors({
            ...errors,
            [name]: ''
        });
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.username.trim()) {
            newErrors.username = 'Username is required';
        }

        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Invalid email address';
        }

        if (!formData.phoneNumber.trim()) {
            newErrors.phoneNumber = 'Phone number is required';
        } else if (!/^\d{10}$/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Invalid phone number';
        }

        if (!formData.sporti) {
            newErrors.sporti = 'SPORTI selection is required';
        }

        if (!formData.roomType) {
            newErrors.roomType = 'Room type selection is required';
        }

        if (!formData.guestType) {
            newErrors.guestType = 'Guest type selection is required';
        }

        if (!formData.checkIn) {
            newErrors.checkIn = 'Check-in date and time are required';
        }

        if (!formData.checkOut) {
            newErrors.checkOut = 'Check-out date and time are required';
        }

        if (!formData.officerDesignation.trim()) {
            newErrors.officerDesignation = 'Officer Designation is required';
        }

        if (!formData.officerCadre.trim()) {
            newErrors.officerCadre = 'Officer Cadre is required';
        }

        setErrors(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const calculateTotalCost = () => {
        let roomPrice = 0;

        switch (formData.roomType) {
            case 'Family':
                if (formData.guestType === 'Officers from Karnataka') {
                    roomPrice = 1600;
                } else if (formData.guestType === 'Officers from Other States') {
                    roomPrice = 2100;
                }
                break;
            case 'Suite (ADGP & Above)':
                if (formData.guestType === 'Officers from Karnataka') {
                    roomPrice = 1300;
                } else if (formData.guestType === 'Officers from Other States') {
                    roomPrice = 1600;
                } else if (formData.guestType === 'Others') {
                    roomPrice = 2700;
                }
                break;
            case 'Standard':
                if (formData.guestType === 'Officers from Karnataka') {
                    roomPrice = 800;
                } else if (formData.guestType === 'Officers from Other States') {
                    roomPrice = 1100;
                } else if (formData.guestType === 'Others') {
                    roomPrice = 1600;
                }
                break;
            default:
                roomPrice = 0;
        }

        return roomPrice * formData.noGuests;
    };

    const renderRoomTypes = () => {
        if (formData.sporti === 'SPORTI-1') {
            return (
                <>
                    <Dropdown.Item eventKey="Family">{iskannada ? 'ಕುಟುಂಬ' : 'Family'}</Dropdown.Item>
                    <Dropdown.Item eventKey="Suite (ADGP & Above)">{iskannada ? 'ವಿಐಪಿ' : 'Suite (ADGP & Above)'}</Dropdown.Item>
                    <Dropdown.Item eventKey="Standard">{iskannada ? 'ಸಾಮಾನ್ಯ' : 'Standard'}</Dropdown.Item>
                </>
            );
        } else {
            return (
                <>
                 <Dropdown.Item eventKey="Family">{iskannada ? 'ಕುಟುಂಬ' : 'Family'}</Dropdown.Item>
                    <Dropdown.Item eventKey="Suite (ADGP & Above)">{iskannada ? 'ವಿಐಪಿ' : 'Suite (ADGP & Above)'}</Dropdown.Item>
                    <Dropdown.Item eventKey="Standard">{iskannada ? 'ಸಾಮಾನ್ಯ' : 'Standard'}</Dropdown.Item>
                </>
            );
        }
    };

    const generateHash512 = (text) => {
        const hash = CryptoJS.SHA512(text);
        return hash.toString(CryptoJS.enc.Hex);
    };

    const createPaymentForm = () => {
        const requestData = {
            K1USRID: 'K1SPOTIUSER',
            K1PWD: '39d16932b27ba15a4c77fd09f8817b2dbce0089dfd45b602fdad8881127002560c5249a77c9dce96fc88a035a1393553ca80f1196b2f89a27b701525533fc55c',
            Name: formData.username,
            AppNo: 'MD89786',
            Email: formData.email,
            Phone: formData.phoneNumber,
            ProductInfo: formData.roomType,
            AmountPaid: calculateTotalCost()
        };

        const requestDataString = `K1USRID=${requestData.K1USRID}|K1PWD=${requestData.K1PWD}|Name=${requestData.Name}|AppNo=${requestData.AppNo}|Phone=${requestData.Phone}|Email=${requestData.Email}|ProductInfo=${requestData.ProductInfo}|AmountPaid=${requestData.AmountPaid}`;

        const checksum = generateHash512(requestDataString);

        const formValue = `${requestDataString}|CheckSum=${checksum}|ReturnURL=http://localhost:58851/College/Purenewal.aspx`;

        const form = document.createElement('form');
        form.id = 'FormPost';
        form.method = 'post';
        form.action = 'https://koneportal.cmsuat.co.in:1443/SPORTI/Index/UXhBakNVanVwTFRWM3IremdWSjV5dz09';

        const input = document.createElement('input');
        input.type = 'hidden';
        input.id = 'SPORTIFormData';
        input.name = 'SPORTIFormData';
        input.value = formValue;
        form.appendChild(input);

        document.body.appendChild(form);
        form.submit();
    };

    const submitForm = (e) => {
        e.preventDefault();
        if (!validateForm()) {
            return;
        }

        axios.post('http://localhost:5000/api/sporti/service/book', formData)
        .then(response => {
            const { success, user } = response.data;
            if (success) {
                setIsLoading(false);
                openDialog('Success', `Your booking request has been sent to admin for confirmation and it takes one  working day  for the same. SMS will be sent to the registered mobile number. please note the  acknowledgement number for future  reference ${user.applicationNo} `, false);
                navigate(`/payment/${user.applicationNo}`);
            } else {
                setIsLoading(false);
                openDialog('Error', 'Your application is not confirmed. Please wait until confirmation. The application will be confirmed within 24 working hours after booking.', true);
            }
        })
        .catch((error) => {
            setIsLoading(false);
            openDialog('Error', 'Booking Error', true);
            console.error('Error submitting form:', error);
        });
    };

    if (isLoading) {
        return <Loading />;
    }


    return (
        <div className='main-function-hall-booking container-fluid p-4 p-md-5'>
            <div className="row">
                <div className="col-md-8 m-auto bg-white p-0">
                <div className="bg-main p-3 text-center">
                        <h1 className="fs-3 text-light">{iskannada ? 'SPORTI ಸೇವೆ ಬುಕ್ಕಿಂಗ್ ವೇಳಾಪಟ್ಟಿ' : 'Karnataka Government SPORTI Room Booking Form'}</h1>
                        <p className="text-light">
                            {iskannada ? 'ಈ ಫಾರಂ ಅಧಿಕಾರಿಗಳಿಗೆ ಇತರ ಸಲಹೆಗಳಿಂದ ಬಹುಮಾನಗಳನ್ನು ಪುಡಿಸುವ ಅವಕಾಶವನ್ನು ಒದಗಿಸುತ್ತದೆ.' : 'This form provides an opportunity for officers to book various rooms offered through the department.'}
                        </p>
                   {/* <div className="d-flex justify-content-end">
                   <Dropdown onSelect={(value) => setSelectedLanguage(value)} className='w-auto'>
                        <Dropdown.Toggle variant="secondary" id="dropdown-language">
                            {iskannada ? 'ಕನ್ನಡ' : 'English'}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item eventKey="english">English</Dropdown.Item>
                            <Dropdown.Item eventKey="kannada">ಕನ್ನಡ</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                   </div> */}
                    </div>
                   
                 
                  <div className="p-3">
                  <form onSubmit={submitForm}>
                        <div className="row">
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <label htmlFor="username" className="form-label">{iskannada ? 'ಬಳಕೆದಾರರ ಹೆಸರು' : 'Officers name'}</label>
                                    <input type="text" className="form-control" name="username" id="username" value={formData.username} onChange={handleFormChange} />
                                    {errors.username && <small className="text-danger">{errors.username}</small>}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <label htmlFor="officerDesignation" className="form-label">{iskannada ? 'ಹುದ್ದೆ' : 'Designation'}</label>
                                    <input type="text" className="form-control" name="officerDesignation" id="officerDesignation" value={formData.officerDesignation} onChange={handleFormChange} />
                                    {errors.officerDesignation && <small className="text-danger">{errors.officerDesignation}</small>}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <label htmlFor="officerCadre" className="form-label">{iskannada ? 'ಅಧಿಕಾರಿ ಕೇಡರ್' : 'Officer Cadre (KA/No.KA)'}</label>
                                    <input type="text" className="form-control" name="officerCadre" id="officerCadre" value={formData.officerCadre} onChange={handleFormChange} />
                                    {errors.officerCadre && <small className="text-danger">{errors.officerCadre}</small>}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <label htmlFor="email" className="form-label">{iskannada ? 'ಇಮೇಲ್' : 'Email'}</label>
                                    <input type="text" className="form-control" name="email" id="email" value={formData.email} onChange={handleFormChange} />
                                    {errors.email && <small className="text-danger">{errors.email}</small>}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <label htmlFor="phoneNumber" className="form-label">{iskannada ? 'ಫೋನ್ ನಂಬರ್' : 'Phone Number'}</label>
                                    <input type="text" className="form-control" name="phoneNumber" id="phoneNumber" value={formData.phoneNumber} onChange={handleFormChange} />
                                    {errors.phoneNumber && <small className="text-danger">{errors.phoneNumber}</small>}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <label htmlFor="checkIn" className="form-label">{iskannada ? 'ಚೆಕ್-ಇನ್' : 'Check-In'}</label>
                                    <input type="datetime-local" className="form-control" name="checkIn" id="checkIn" value={formData.checkIn} onChange={handleFormChange} />
                                    {errors.checkIn && <small className="text-danger">{errors.checkIn}</small>}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <label htmlFor="checkOut" className="form-label">{iskannada ? 'ಚೆಕ್-ಔಟ್' : 'Check-Out'}</label>
                                    <input type="datetime-local" className="form-control" name="checkOut" id="checkOut" value={formData.checkOut} onChange={handleFormChange} />
                                    {errors.checkOut && <small className="text-danger">{errors.checkOut}</small>}
                                </div>
                            </div>
                            
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <label htmlFor="sporti" className="form-label">{iskannada ? 'SPORTI' : 'SPORTI'}</label>
                                    <Dropdown onSelect={(value) => handleDropdownChange('sporti', value)}>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-sporti">
                                            {formData.sporti || (iskannada ? 'SPORTI ಆಯ್ಕೆಮಾಡಿ' : 'Select SPORTI')}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="SPORTI-1">SPORTI-1</Dropdown.Item>
                                            <Dropdown.Item eventKey="SPORTI-2">SPORTI-2</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {errors.sporti && <small className="text-danger">{errors.sporti}</small>}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <label htmlFor="roomType" className="form-label">{iskannada ? 'ಕೊಠಡಿ ಪ್ರಕಾರ' : 'Room Type'}</label>
                                    <Dropdown onSelect={(value) => handleDropdownChange('roomType', value)}>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-roomType">
                                            {formData.roomType || (iskannada ? 'ಕೊಠಡಿ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ' : 'Select Room Type')}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            {renderRoomTypes()}
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {errors.roomType && <small className="text-danger">{errors.roomType}</small>}
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <label htmlFor="guestType" className="form-label">{iskannada ? 'ಅತಿಥಿ ಪ್ರಕಾರ' : 'Guest Type'}</label>
                                    <Dropdown onSelect={(value) => handleDropdownChange('guestType', value)}>
                                        <Dropdown.Toggle variant="secondary" id="dropdown-guestType">
                                            {formData.serviceType || (iskannada ? 'ಅತಿಥಿ ಪ್ರಕಾರ ಆಯ್ಕೆಮಾಡಿ' : 'Officers Category')}
                                        </Dropdown.Toggle>
                                        <Dropdown.Menu>
                                            <Dropdown.Item eventKey="Officers from Karnataka">{iskannada ? 'ಕರ್ನಾಟಕದ ಅಧಿಕಾರಿಗಳು' : 'Officers from Karnataka'}</Dropdown.Item>
                                            <Dropdown.Item eventKey="Officers from Other States">{iskannada ? 'ಇತರೆ ರಾಜ್ಯಗಳ ಅಧಿಕಾರಿಗಳು' : 'Officers from Other States'}</Dropdown.Item>
                                            <Dropdown.Item eventKey="Others">{iskannada ? 'ಇತರೆ' : 'Others'}</Dropdown.Item>
                                        </Dropdown.Menu>
                                    </Dropdown>
                                    {errors.serviceType && <small className="text-danger">{errors.guestType}</small>}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="form-group mt-3">
                                    <label htmlFor="noGuests" className="form-label">{iskannada ? 'ಅತಿಥಿಗಳ ಸಂಖ್ಯೆ' : 'Number of Guests'}</label>
                                    <input type="number" className="form-control" name="noGuests" id="noGuests" value={formData.noGuests} onChange={handleFormChange} min="1" />
                                </div>
                            </div>
                            <div className="col-md-12">
                                <div className="form-group mt-3">
                                    <label className="form-label">{iskannada ? 'ಒಟ್ಟು ವೆಚ್ಚ (₹)' : 'Total Cost (₹)'}</label>
                                    <input type="text" className="form-control" value={formData.totalCost} readOnly />
                                </div>
                            </div>
                            <div className="col-md-12 mt-4 p-3 d-flex justify-content-end gap-2">
                            <button type="submit" className="blue-btn rounded-1 m-1">{iskannada ? 'ಸಲ್ಲಿಸು' : 'Submit'}</button>
                            <button className="btn btn-danger rounded-1 m-1" type='reset'>Cancel</button>
                            </div>
                        </div>
                    </form>
                  </div>
                </div>
            </div>

            {showModal && <SuccessPopup showModal={showModal} handleClose={handleClose} title={title} desc={desc} />}
        </div>
    );
}

export default MainRoomBook;
