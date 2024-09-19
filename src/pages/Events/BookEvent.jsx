import React from 'react';
import './style.css';
import '../Rooms/style.css';
import events from '../../data/event';
import { Link } from 'react-router-dom';

function BookEvent() {
    const eventData = {
        venue: '',
        eventDate: '',
        numberOfDays: 1
    };

    const handleChange = (event) => {
        const { id, value } = event.target;
        eventData[id] = value;
    };

    const handleSubmit = () => {
        // Handle form submission
        console.log('Event data:', eventData);
    };

    return (
        <div className='room-container bg-light'>
            <div className="event-banner text-center d-flex align-items-center justify-content-center flex-column">
                <h1 className='display-3 fw-bold'>Event Booking</h1>
               
            </div>
           


            <div className="event-categories p-3 p-md-4">
                <h1 className="fs-1 fw-bold py-4">Available Events</h1>
                <hr />
                <div className="row">
                   {
                    events.map((eventItem, eventIndex)=>(
                        <div className="col-12 col-md-4 mb-3" key={eventIndex}>
                        <div className="event-card p-3 rounded-4 h-100">
                            <div className="event-card-top">
                                <img src={eventItem.image} alt={eventItem.venue} className='w-100 mb-2 rounded-4'/>
                            </div>
                            <div className="event-card-body d-flex justify-content-between mb-3">
                                <span className="fw-bold fs-3">{eventItem.venue}</span>
                                <span className="fw-bold fs-3">&#8377;{eventItem.Price}</span>
                            </div>
                            <div className="event card-footer d-flex justify-content-between">
                                <span className="fs-5">{eventItem.date}</span>
                                <Link to={`/eventView/${eventItem.id}`} className="btn btn-primary rounded-pill">Book Now</Link>
                            </div>
                        </div>
                    </div>
                    ))
                   }
                </div>
            </div>
        </div>
    );
}

export default BookEvent;
