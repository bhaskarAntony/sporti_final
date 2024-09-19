import React, { useEffect, useState } from 'react';
import './style.css';
import roomsdata from '../../data/rooms';
import { useParams } from 'react-router-dom';

function RoomView() {
    const { id, SportiId } = useParams();
    const [room, setRoom] = useState(null);
    const [checkInDate, setCheckInDate] = useState('');
    const [checkOutDate, setCheckOutDate] = useState('');
    const [guests, setGuests] = useState(1);
    const [selectedRooms, setSelectedRooms] = useState([]);
    const [showOffcanvas, setShowOffcanvas] = useState(false); // Initialize state for offcanvas visibility
    const [showPopup, setShowPopup] = useState(false); // Initialize state for popup visibility
    const [guestInfo, setGuestInfo] = useState({
        name: '',
        email: '',
        mobile: ''
    });

    useEffect(() => {
        const selectedRoom = roomsdata.find(item => item.id == id);
        setRoom(selectedRoom);
    }, [id]);

    const handleCheckAvailability = () => {
        // Perform availability check based on check-in, check-out dates, and number of guests
        // You can add your logic here to check if the selected rooms are available for booking
        // For demonstration purposes, let's assume the rooms are available
        console.log('Selected Rooms:', selectedRooms);
        setShowOffcanvas(true); // Show offcanvas after checking availability
    };

    const handleRoomClick = (roomNumber) => {
        const isBooked = room.goundfloor.booked.includes(roomNumber) || room.firstFloor.booked.includes(roomNumber);
        if (!isBooked) {
            const roomDetails = {
                roomNumber: roomNumber,
                guests: guests,
                checkInDate: checkInDate,
                checkOutDate: checkOutDate
            };
            setSelectedRooms([...selectedRooms, roomDetails]); // Add room details to selected rooms
            console.log(room);
        }
    };

    const handleBookNow = () => {
        // Handle booking confirmation and show popup
        setShowPopup(true);
    };

    const handleGuestInfoChange = (e) => {
        const { name, value } = e.target;
        setGuestInfo({ ...guestInfo, [name]: value });
    };

    const handleConfirmBooking = () => {
        // Handle confirmation of booking with guest information
        console.log('Booking confirmed with guest information:', guestInfo);
        // You can add further logic here, like sending the booking details to a server
        // Reset the guest information form
        setGuestInfo({
            name: '',
            email: '',
            mobile: ''
        });
        // Close the popup modal
        setShowPopup(false);
    };

    return (
        <div className='room-container'>
            <div className="room-banner text-center d-flex align-items-center justify-content-center flex-column">
                <h1 className='display-3 fw-bold'>Stay with us</h1>
             
            </div>
            <div className="room-book-card">
                <div className="row align-item-center">
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label htmlFor="checkInDate" className="form-label">Check-in Date</label>
                            <div className="input-group mt-2">
                                <span className="input-group-text" id="basic-addon1"><i className="bi bi-calendar2-week fs-4 text-primary"></i></span>
                                <input type="date" className="form-control" id='checkInDate' value={checkInDate} onChange={(e) => setCheckInDate(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label htmlFor="checkOutDate" className="form-label">Check-out Date</label>
                            <div className="input-group mt-2">
                                <span className="input-group-text" id="basic-addon1"><i className="bi bi-calendar2-week fs-4 text-primary"></i></span>
                                <input type="date" className="form-control" id='checkOutDate' value={checkOutDate} onChange={(e) => setCheckOutDate(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <label htmlFor="guests" className="form-label">No. Of Guests</label>
                            <div className="input-group mt-2">
                                <span className="input-group-text" id="basic-addon1"><i className="bi-people-fill fs-4 text-primary"></i></span>
                                <input type="number" className="form-control" id='guests' value={guests} onChange={(e) => setGuests(e.target.value)} />
                            </div>
                        </div>
                    </div>
                    <div className="col-12 col-md-3">
                        <div className="form-group">
                            <button className="btn btn-primary w-100 d-flex align-items-center justify-content-between" 
                            data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
                            >Check Availability <i className="bi bi-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            <div className="rooms-categories p-3 p-md-4">
                <div className="row">
                    <div className="col-12 col-md-6">
                        <div className="rview-right">
                            {room && (
                                <>
                                    <img src={room.image} alt={room.title} className="w-100 rounded-4 big" />
                                    <div className="row mt-4 small-images">
                                        {/* Additional images of the room */}
                                        <div className="col-12 col-md-6">
                                            <img src="https://www.home-designing.com/wp-content/uploads/2015/03/tufted-headboard.jpg" alt="" className="w-100 rounded-3" />
                                        </div>
                                        <div className="col-12 col-md-6">
                                            <img src="https://www.home-designing.com/wp-content/uploads/2015/03/tufted-headboard.jpg" alt="" className="w-100 rounded-3" />
                                        </div>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="rview-right">
                            {room && (
                                <>
                                    <div className="r-card">
                                        <span className="r-tag">Ground Floor</span>
                                        {room.goundfloor && room.goundfloor.rooms.map((roomNumber) => (
                                            <button
                                                key={roomNumber}
                                                className={`room-btn ${
                                                    room.goundfloor.booked.includes(roomNumber)
                                                        ? "booked"
                                                        : room.goundfloor.vip.includes(roomNumber)
                                                            ? "vip"
                                                            : "available"
                                                    } ${selectedRooms.some(selectedRoom => selectedRoom.roomNumber === roomNumber) ? "selected" : ""}`}
                                                onClick={() => handleRoomClick(roomNumber)}
                                                disabled={room.goundfloor.booked.includes(roomNumber)} // Disable booking for booked rooms
                                            >
                                                Room {roomNumber}
                                            </button>
                                        ))}
                                    </div>
                                    <div className="r-card">
                                        <span className="r-tag">First Floor</span>
                                        {room.firstFloor && room.firstFloor.rooms.map((roomNumber) => (
                                            <button
                                                key={roomNumber}
                                                className={`room-btn ${
                                                    room.firstFloor.booked.includes(roomNumber)
                                                        ? "booked"
                                                        : room.firstFloor.vip.includes(roomNumber)
                                                            ? "vip"
                                                            : "available"
                                                    } ${selectedRooms.some(selectedRoom => selectedRoom.roomNumber === roomNumber) ? "selected" : ""}`}
                                                onClick={() => handleRoomClick(roomNumber)}
                                                disabled={room.firstFloor.booked.includes(roomNumber)} // Disable booking for booked rooms
                                            >
                                                Room {roomNumber}
                                            </button>
                                        ))}
                                    </div>
                                </>
                            )}
                              <button className="btn btn-primary w-100 p-3 d-flex align-items-center justify-content-between" 
                            data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample"
                            >Check Availability <i className="bi bi-arrow-right"></i></button>
                        </div>
                    </div>
                </div>
            </div>
            {/* Offcanvas for displaying booked room details */}
             <div className="offcanvas offcanvas-bottom" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
                    <div className="offcanvas-header">
                        <h5 className="offcanvas-title" id="offcanvasExampleLabel">Booked Room Details</h5>
                        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                    </div>
                    <div className="offcanvas-body">
                        <ul>
                            {/* Display booked room details here */}
                            {selectedRooms.map((room, index) => (
                                <li key={index} className='room-selected'>
                                    <span className='d-flex justify-content-between'><span>Room Number:</span> {room.roomNumber}</span>
                                    <span className='d-flex justify-content-between'><span>Check-in Date:</span> {room.checkInDate}</span>
                                    <span className='d-flex justify-content-between'><span>Check-out Date:</span> {room.checkOutDate}</span>
                                    <span className='d-flex justify-content-between'><span>No. of Guests:</span> {room.guests}</span>
                                </li>
                            ))}
                        </ul>
                        <button className="btn btn-primary"data-bs-toggle="modal" data-bs-target="#exampleModal">Book Now</button>
                    </div>
                </div>
            {/* Popup modal for entering guest information */}
            <div  class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">Guest Information</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <div className="form-group">
                                    <label htmlFor="name">Name</label>
                                    <input type="text" className="form-control" id="name" name="name" value={guestInfo.name} onChange={handleGuestInfoChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="email">Email</label>
                                    <input type="email" className="form-control" id="email" name="email" value={guestInfo.email} onChange={handleGuestInfoChange} />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="mobile">Mobile</label>
                                    <input type="text" className="form-control" id="mobile" name="mobile" value={guestInfo.mobile} onChange={handleGuestInfoChange} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary w-100" onClick={handleConfirmBooking}>Confirm Booking</button>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    );
}

export default RoomView;
