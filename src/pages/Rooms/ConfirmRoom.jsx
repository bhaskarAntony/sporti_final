import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Card, Container, Row, Col, Table, Button, ListGroup, Badge, Modal } from 'react-bootstrap';
import logo from '../../assets/images/main_logo.jpg';
import './style.css';
import axios from 'axios';
import Loading from '../../components/popups/Loading';
import { useDialog } from '../../components/popups/DialogContext';
import SuccessPopup from '../../components/popups/SuccessPopup';
import { useLanguage } from '../../context/LangaugeContext';
import { toast } from 'react-toastify';

function ConfirmRoom() {
    const [isSuccess, setisSuccess] = useState(false);
    const location = useLocation();
    const { isKannada } = useLanguage();
    const [selectedLanguage, setSelectedLanguage] = useState('english');
    const [totalCost, setTotalCost] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const [showModal, setShowModal] = useState(false);
    const [desc, setDesc] = useState(null);
    const [title, setTitle] = useState(null);
    const { openDialog } = useDialog();
    const [numberOfDays, setNumberOfDays] = useState(0);
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
        totalCost: 0,
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

    useEffect(() => {
        if (location.state && location.state.data) {
            setFormData({ ...formData, ...location.state.data });
            setTotalCost(location.state.data.totalCost || 0);
            console.log(location.state.data);
        }
    }, [location.state]);

    useEffect(() => {
        const checkInDate = new Date(formData.checkIn);
        const checkOutDate = new Date(formData.checkOut);
        const diffTime = Math.abs(checkOutDate - checkInDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        setNumberOfDays(diffDays);
    }, [formData.checkIn, formData.checkOut]);

    useEffect(() => {
        setSelectedLanguage(isKannada ? 'kannada' : 'english');
    }, [isKannada]);

    const handleClose = () => {
        setShowModal(false);
        navigate('/')
    };

    const openModal = (title, desc) => {
        setShowModal(true);
        setDesc(desc);
        setTitle(title);
    };

    const translateToKannada = (text) => {
        switch (text) {
            case 'Officer\'s Name': return 'ಅಧಿಕಾರಿಗಳ ಹೆಸರು';
            case 'Designation': return 'ಹುದ್ದೆ';
            case 'Email': return 'ಇಮೇಲ್';
            case 'Phone Number': return 'ದೂರವಾಣಿ ಸಂಖ್ಯೆ';
            case 'Check In': return 'ಪರಿಶೀಲನೆ ದಿನಾಂಕ';
            case 'Check Out': return 'ಚೆಕ್-ಔಟ್ ದಿನಾಂಕ';
            case 'SPORTI': return 'SPORTI';
            case 'Booking For': return 'ಬುಕಿಂಗ್ ಯಾರಿಗಾಗಿ';
            case 'Room Type': return 'ಕೋಣೆ ಪ್ರಕಾರ';
            case 'Room Number': return 'ಕೋಣೆ ಸಂಖ್ಯೆ';
            case 'Total Cost (₹)': return 'ಒಟ್ಟು ವೆಚ್ಚ (₹)';
            case 'Apply': return 'ಸಲ್ಲಿಸಿ';
            case 'Cancel': return 'ರದ್ದುಮಾಡಿ';
            case 'Confirm Your Booking': return 'ನಿಮ್ಮ ಬುಕ್ಕಿಂಗ್ ದೃಢೀಕರಿಸಿ';
            case 'Officer Information': return 'ಅಧಿಕಾರಿ ಮಾಹಿತಿ';
            case 'Guest Details': return 'ಅತಿಥಿ ವಿವರಗಳು';
            case 'Name': return 'ಹೆಸರು';
            case 'Relationship': return 'ಸಂಬಂಧ';
            case 'Gender': return 'ಲಿಂಗ';
            case 'Age': return 'ವಯಸ್ಸು';
            case 'Mobile Number': return 'ಮೊಬೈಲ್ ಸಂಖ್ಯೆ';
            case 'Aadhaar Number': return 'ಆಧಾರ್ ಸಂಖ್ಯೆ';
            case 'Interests': return 'ಆಸಕ್ತಿಗಳು';
            case 'Booking Summary': return 'ಬುಕ್ಕಿಂಗ್ ಸಾರಾಂಶ';
            case 'No. of Days': return 'ದಿನಗಳ ಸಂಖ್ಯೆ';
            case 'Per Day Cost': return 'ಪ್ರತಿ ದಿನದ ವೆಚ್ಚ';
            case 'Instructions': return 'ಸೂಚನೆಗಳು';
            case 'Your booking request is being processed by the administrator.': return 'ನಿಮ್ಮ ಬುಕ್ಕಿಂಗ್ ವಿನಂತಿಯನ್ನು ನಿರ್ವಹಕನ ಮೂಲಕ ಸಂಸ್ಕರಿಸಲಾಗುತ್ತಿದೆ.';
            case 'You will receive an email and SMS confirmation regarding your booking.': return 'ನಿಮ್ಮ ಬುಕ್ಕಿಂಗ್ ಸಂಬಂಧಿಸಿದ ಇಮೇಲ್ ಮತ್ತು ಎಸ್‌ಎಂಎಸ್ ದೃಢೀಕರಣವನ್ನು ನೀವು ಪಡೆಯುತ್ತೀರಿ.';
            case 'It will take one working day to confirm your request.': return 'ನಿಮ್ಮ ವಿನಂತಿಯನ್ನು ದೃಢೀಕರಿಸಲು ಒಂದು ಕೆಲಸದ ದಿನ ಬೇಕಾಗುತ್ತದೆ.';
            case 'Please note your Booking ID for future reference after booking.': return 'ಬುಕ್ಕಿಂಗ್ ನಂತರ ಭವಿಷ್ಯಕ್ಕಾಗಿ ನಿಮ್ಮ ಬುಕ್ಕಿಂಗ್ ಐಡಿಯನ್ನು ಗಮನದಲ್ಲಿಟ್ಟುಕೊಳ್ಳಿ.';
            case 'Booking failed, please try again.': return 'ಬುಕ್ಕಿಂಗ್ ವಿಫಲವಾಗಿದೆ, ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.';
            default: return text;
        }
    };

    const submitForm = (e) => {
        e.preventDefault();
        setIsLoading(true);//https://sporti-backend-live-3.onrender.com
        axios.post('http://localhost:4000/api/sporti/service/room/book', formData)
            .then(response => {
                const { success } = response.data;
                if (success) {
                    setIsLoading(false);
                    // try {
                    //     // window.location.href = 'https://sporti-gov-co-in.vercel.app/booking-confirmation/10829cfd3';
                    //     // alert("booking is successfully done..!")
                    //     // setTitle("Your booking  Success.");
                    //     // setDesc("Your booking request has been sent to the administrator.")
                       
                    // } catch (error) {
                    //     toast.error(error);
                    //     console.log(error);
                    // }
                    setShowModal(true);
                    setInterval(()=>{
                    navigate('/')
                    }, 3000)
                } else {
                    setIsLoading(false);
                    toast.error('Something went wrong. Please try again later.');
                    openModal('Error', selectedLanguage === 'kannada' ? 'ಬುಕ್ಕಿಂಗ್ ವಿಫಲವಾಗಿದೆ, ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' : 'Booking failed, please try again.');
                }
            })
            .catch(error => {
                setIsLoading(false);
                toast.error('Something went wrong. Please try again later.');
                openModal('Error', selectedLanguage === 'kannada' ? 'ಬುಕ್ಕಿಂಗ್ ವಿಫಲವಾಗಿದೆ, ದಯವಿಟ್ಟು ಮತ್ತೆ ಪ್ರಯತ್ನಿಸಿ.' : 'Booking failed, please try again.');
            });
    };

    if (isLoading) {
        return <Loading />;
    }

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    };

    const perDayCost = numberOfDays > 0 ? (totalCost / numberOfDays).toFixed(2) : 0;

    return (
        <Container fluid className="bg-light p-3 p-md-5 confirm-service">
            <Row className='container w-100'>
                <Col md={12} className='m-auto'>
                    <div className="border-0 shadow-sm bg-white" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                        {/* Header Section */}
                        <Card.Header className="bg-primary text-white d-flex align-items-center gap-3" style={{ padding: '1.5rem' }}>
                            <img src={logo} alt="sporti" style={{ width: '50px', height: '50px', borderRadius: '50%' }} />
                            <h1 className="fs-4 mb-0">
                                {selectedLanguage === 'english' ? 'Confirm Your Booking' : translateToKannada('Confirm Your Booking')}
                            </h1>
                        </Card.Header>

                        <Card.Body className="p-4">
                            {/* Officer Information */}
                            <h2 className="fs-5 text-success fw-bold mb-3">
                                {selectedLanguage === 'english' ? 'Officer Information' : translateToKannada('Officer Information')}
                            </h2>
                            <ListGroup variant="flush" className="mb-4">
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>{selectedLanguage === 'english' ? 'Officer\'s Name' : translateToKannada('Officer\'s Name')}:</span>
                                    <span className="fw-bold">{formData.username}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>{selectedLanguage === 'english' ? 'Designation' : translateToKannada('Designation')}:</span>
                                    <span className="text-secondary">{formData.officerDesignation}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>{selectedLanguage === 'english' ? 'Phone Number' : translateToKannada('Phone Number')}:</span>
                                    <span className="text-secondary">{formData.phoneNumber}</span>
                                </ListGroup.Item>
                                <ListGroup.Item className="d-flex justify-content-between">
                                    <span>{selectedLanguage === 'english' ? 'Email' : translateToKannada('Email')}:</span>
                                    <span className="text-secondary">{formData.email}</span>
                                </ListGroup.Item>
                            </ListGroup>

                            {/* Guest Details (if bookingFor is Guest) */}
                            {formData.bookingFor === 'Guest' && (
                                <>
                                    <h2 className="fs-5 text-success fw-bold mb-3">
                                        {selectedLanguage === 'english' ? 'Guest Details' : translateToKannada('Guest Details')}
                                    </h2>
                                    <ListGroup variant="flush" className="mb-4">
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <span>{selectedLanguage === 'english' ? 'Name' : translateToKannada('Name')}:</span>
                                            <span className="fw-bold">{formData.guestDetails.name}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <span>{selectedLanguage === 'english' ? 'Relationship' : translateToKannada('Relationship')}:</span>
                                            <span className="text-secondary">{formData.guestDetails.relationship}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <span>{selectedLanguage === 'english' ? 'Gender' : translateToKannada('Gender')}:</span>
                                            <span className="text-secondary">{formData.guestDetails.gender}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <span>{selectedLanguage === 'english' ? 'Age' : translateToKannada('Age')}:</span>
                                            <span className="text-secondary">{formData.guestDetails.age}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <span>{selectedLanguage === 'english' ? 'Mobile Number' : translateToKannada('Mobile Number')}:</span>
                                            <span className="text-secondary">{formData.guestDetails.mobileNo}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <span>{selectedLanguage === 'english' ? 'Email' : translateToKannada('Email')}:</span>
                                            <span className="text-secondary">{formData.guestDetails.email}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <span>{selectedLanguage === 'english' ? 'Aadhaar Number' : translateToKannada('Aadhaar Number')}:</span>
                                            <span className="text-secondary">{formData.guestDetails.aadhaarNumber}</span>
                                        </ListGroup.Item>
                                        <ListGroup.Item className="d-flex justify-content-between">
                                            <span>{selectedLanguage === 'english' ? 'Interests' : translateToKannada('Interests')}:</span>
                                            <span className="text-secondary">
                                                {formData.guestDetails.interests.length > 0
                                                    ? formData.guestDetails.interests.join(', ')
                                                    : 'None'}
                                            </span>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </>
                            )}

                            {/* Booking Summary */}
                            <h2 className="fs-5 text-success fw-bold mb-3">
                                {selectedLanguage === 'english' ? 'Booking Summary' : translateToKannada('Booking Summary')}
                            </h2>
                            <Table striped bordered hover responsive className="shadow-sm">
                                <thead className="bg-primary text-white">
                                    <tr>
                                        <th>#</th>
                                        <th>{selectedLanguage === 'english' ? 'SPORTI' : translateToKannada('SPORTI')}</th>
                                        <th>{selectedLanguage === 'english' ? 'Booking For' : translateToKannada('Booking For')}</th>
                                        <th>{selectedLanguage === 'english' ? 'Room Type' : translateToKannada('Room Type')}</th>
                                        <th>{selectedLanguage === 'english' ? 'Room Number' : translateToKannada('Room Number')}</th>
                                        <th>{selectedLanguage === 'english' ? 'Check In' : translateToKannada('Check In')}</th>
                                        <th>{selectedLanguage === 'english' ? 'Check Out' : translateToKannada('Check Out')}</th>
                                        <th>{selectedLanguage === 'english' ? 'No. of Days' : translateToKannada('No. of Days')}</th>
                                        <th>{selectedLanguage === 'english' ? 'Per Day Cost' : translateToKannada('Per Day Cost')}</th>
                                        <th>{selectedLanguage === 'english' ? 'Total Cost (₹)' : translateToKannada('Total Cost (₹)')}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>1</td>
                                        <td>{formData.sporti}</td>
                                        <td>{formData.bookingFor}</td>
                                        <td>{formData.roomType}</td>
                                        <td>{formData.roomNo}</td>
                                        <td>{formatDate(formData.checkIn)}</td>
                                        <td>{formatDate(formData.checkOut)}</td>
                                        <td>{numberOfDays}</td>
                                        <td>₹{perDayCost}</td>
                                        <td>
                                            <Badge bg="success" className="fs-6">₹{totalCost}</Badge>
                                        </td>
                                    </tr>
                                </tbody>
                            </Table>

                            {/* Instructions */}
                            <h2 className="fs-5 text-danger fw-bold mt-5 mb-3">
                                {selectedLanguage === 'english' ? 'Instructions' : translateToKannada('Instructions')}
                            </h2>
                            <ListGroup as="ul" className="p-0">
                                <ListGroup.Item as="li" className="border-0 fs-6 mb-2">
                                    {selectedLanguage === 'english'
                                        ? 'Your booking request is being processed by the administrator.'
                                        : translateToKannada('Your booking request is being processed by the administrator.')}
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className="border-0 fs-6 mb-2">
                                    {selectedLanguage === 'english'
                                        ? 'You will receive an email and SMS confirmation regarding your booking.'
                                        : translateToKannada('You will receive an email and SMS confirmation regarding your booking.')}
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className="border-0 fs-6 mb-2">
                                    {selectedLanguage === 'english'
                                        ? 'It will take one working day to confirm your request.'
                                        : translateToKannada('It will take one working day to confirm your request.')}
                                </ListGroup.Item>
                                <ListGroup.Item as="li" className="border-0 fs-6 mb-2">
                                    {selectedLanguage === 'english'
                                        ? 'Please note your Booking ID for future reference after booking.'
                                        : translateToKannada('Please note your Booking ID for future reference after booking.')}
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>

                        {/* Footer Buttons */}
                        <div className="d-flex justify-content-end gap-3 p-3  align-items-center">
                            <Button
                                variant="primary"
                                onClick={submitForm}
                                style={{ borderRadius: '20px', padding: '10px 30px', fontWeight: 'bold' }}
                            >
                                {selectedLanguage === 'english' ? 'Apply' : translateToKannada('Apply')}
                            </Button>
                            <Button
                                variant="danger"
                                onClick={() => navigate('/')}
                                style={{ borderRadius: '20px', padding: '10px 30px', fontWeight: 'bold' }}
                            >
                                {selectedLanguage === 'english' ? 'Cancel' : translateToKannada('Cancel')}
                            </Button>
                        </div>
                    </div>
                </Col>
            </Row>
            {/* <SuccessPopup title={title} desc={desc} onClose={handleClose} /> */}
            <Modal show={showModal} onHide={handleClose} centered size='sm'>
        {/* <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header> */}
        <Modal.Body className='text-center'>
            <img src="https://i.gifer.com/7efs.gif" alt="" className="w-75" />
            <h1 className="fs-5 text-center">Your Booking is successfull</h1>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
        </Container>
    );
}

export default ConfirmRoom;