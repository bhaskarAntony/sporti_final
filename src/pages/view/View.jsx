import React, { useEffect, useState } from 'react';
import './style.css';
import '../Rooms/style.css';
import { useParams } from 'react-router-dom';
import servicesData from '../../data/services';
function View() {
    const {id} = useParams()
 

    return (
      
        <>
          <div className='event-container'>
        {servicesData.map((item, index) => (
            item.id == id ? (
                <div key={index}>
                    <div className="event-view-banner bg-primary text-center d-flex align-items-center justify-content-center flex-column" style={{ backgroundImage: `url(${item.image})`, backgroundRepeat: 'no-repeat center bottom', backgroundSize: 'cover' }}>
                        <h1 className='display-3 fw-bold'>{item.title}</h1>
                    </div>
                    <div className="room-book-card">
                        <div className="row align-items-center">
                            <div className="col-12 col-md-3">
                                <div className="form-group">
                                    <label htmlFor="venue" className="form-label">{item.title}</label>
                                    <div className="input-group mt-2">
                                        <span className="input-group-text" id="basic-addon1">
                                            <i className="bi bi-calendar2-week fs-4 text-primary"></i>
                                        </span>
                                        <input type="text" className="form-control" id='venue' placeholder={item.title}  />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3">
                                <div className="form-group">
                                    <label htmlFor="eventDate" className="form-label">Date</label>
                                    <div className="input-group mt-2">
                                        <span className="input-group-text" id="basic-addon1">
                                            <i className="bi bi-calendar2-week fs-4 text-primary"></i>
                                        </span>
                                        <input type="date" className="form-control" id='eventDate' />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3">
                                <div className="form-group">
                                    <label htmlFor="numberOfDays" className="form-label">No.Of Guests</label>
                                    <div className="input-group mt-2">
                                        <span className="input-group-text" id="basic-addon1">
                                            <i className="bi-people-fill fs-4 text-primary"></i>
                                        </span>
                                        <input type="number" className="form-control" id='nuOfguests' placeholder='1' min={1} />
                                    </div>
                                </div>
                            </div>
                            <div className="col-12 col-md-3">
                                <div className="form-group">
                                    <button className="btn btn-primary w-100 d-flex align-items-center justify-content-between" data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample" aria-controls="offcanvasExample">
                                        Check Availability <i className="bi bi-arrow-right"></i>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
    
                    <div className="event-categories p-3 p-md-4">
                        <h1 className="fs-1 fw-bold py-4">About {item.title}</h1>
                        <h1 className="fs-1 fw-bold">{item.title}</h1>
                                <p className="fs-5 text-secondary">{item.desc}</p>
                    </div>
                </div>
            ) : null
        ))}
    </div>
    
        <div className="offcanvas offcanvas-bottom" tabIndex="-1" id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
            <div className="offcanvas-header">
                <h5 className="offcanvas-title" id="offcanvasExampleLabel">Estimated Cost</h5>
                <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close"></button>
            </div>
            <div className="offcanvas-body">
                <div className="event-bottom-card p-3 rounded-2 shadow">
                    <div className='d-flex mb-2 justify-content-between'>
                        <span className='fs-4 d-block fw-bold'>Service</span>
                        {/* <span className='fs-4 d-block'>{event.venue}</span> */}
                    </div>
                    <hr />
                    <div className='d-flex mb-2 justify-content-between'>
                        <span className='fs-4 d-block fw-bold'>No.Of days</span>
                        {/* <span className='fs-4 d-block'>{event.numberOfDays}</span> */}
                    </div>
                    <hr />
                    <div className='d-flex mb-2 justify-content-between'>
                        <span className='fs-4 d-block fw-bold'>Total Amount</span>
                        {/* <span className='fs-4 d-block'>{event.numberOfDays * event.price}</span> */}
                    </div>
                    <hr />
                    <div className='d-flex justify-content-between'>
                        <span className='fs-4 d-block fw-bold'>Mode Of Amount</span>
                        <span className='fs-4 d-block'>Cash</span>
                    </div>
                    <hr />
                </div>
                <div className="book-btn text-center mt-4">
                    <button className="btn btn-primary px-5 m-auto p-2 fs-4">Book Now</button>
                </div>
            </div>
        </div>
    {/* </div> */}
        </>
    );
}

export default View;
