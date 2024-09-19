import React from 'react'
import gallerydata from '../../data/gallery'
import { Link } from 'react-router-dom'
import './style.css'
import { useLanguage } from '../../context/LangaugeContext';

function Events() {
    const { isKannada } = useLanguage();
    
    return (
        <div>
            <div className="contact-banner">
                {/* Translated Static Text */}
                <div className="skew-container">
                    <div className="skew-left">
                        <h1 className="fs-2">{isKannada ? 'ಈವೆಂಟ್ಸ್ & ಗ್ಯಾಲರಿ' : 'Events & Gallery'}</h1>
                    </div>
                    <div className="skew-right d-flex align-items-center">
                        <h1 className="fs-2">{isKannada ? 'ಸ್ಪೋರ್ಟಿ' : 'SPORTI'}</h1>
                    </div>
                </div>
            </div>

            <div className="event-categories p-3 p-md-5">
                <div className="row">
                    {gallerydata.map((eventItem, eventIndex) => (
                        <div className="col-12 col-md-4 mb-3" key={eventIndex}>
                            <div className="event-card text-center rounded-2 h-100 overflow-hidden bg-white">
                                <div className="event-card-top">
                                    <img src={eventItem.image} alt={isKannada ? eventItem.kn_title : eventItem.en_title} className='w-100 mb-2'/>
                                </div>
                                <div className="event-card-body p-3">
                                    <p className="fs-4">{isKannada ? eventItem.kn_title : eventItem.en_title}</p>
                                    <Link to={`/gallery/${eventItem.id}`} className="blue-btn rounded-1">
                                        {isKannada ? 'ಚಿತ್ರಗಳನ್ನು ನೋಡಿ' : 'View Images'}
                                    </Link>
                                </div>
                                <div className="event card-footer d-flex justify-content-between">
                                    {/* Additional content if needed */}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Events
