import React from 'react';
import { Link } from 'react-router-dom';
import eventData from '../../data/event';
import './style.css';
import { useLanguage } from '../../context/LangaugeContext';

function PastEvents() {
  const {isKannada} = useLanguage();
  return (
    <div className='p-3 p-md-5'>
       <div className="row align-items-center justify-content-center">
       {
            eventData.map((eventItem, eventIndex) => (
                <div className="col-12 col-md-4 mb-3" key={eventIndex}>
                    <div className="event-card rounded-2 h-100 overflow-hidden bg-white">
                        <div className="event-card-top">
                            <img 
                              src={eventItem.image} 
                              alt={isKannada ? eventItem.kn_title : eventItem.en_title} 
                              className='w-100 mb-2'
                            />
                        </div>
                        <div className="event-card-body p-3">
                            <p className="f4">
                              {isKannada ? eventItem.kn_title : eventItem.en_title}
                            </p>
                            <Link to={`/gallery/${eventItem.id}`} className="blue-btn rounded-1">
                              {isKannada ? 'ಚಿತ್ರಗಳನ್ನು ವೀಕ್ಷಿಸಿ' : 'View Images'}
                            </Link>
                        </div>
                        <div className="event card-footer d-flex justify-content-between">
                            {/* Optional footer content */}
                        </div>
                    </div>
                </div>
            ))
       }
       </div>
    </div>
  );
}

export default PastEvents;
