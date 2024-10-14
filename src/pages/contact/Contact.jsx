import React, { useEffect, useState } from 'react';
import './style.css';
import Feedback from '../../components/feedback/Feedback';
import { useParams } from 'react-router-dom';
import contactInfo from '../../data/contactinfo';
import Loading from '../../components/popups/Loading';
import { useLanguage } from '../../context/LangaugeContext';
import { Helmet } from 'react-helmet';

function Contact() {
  const { sporti } = useParams(); // Destructure sporti from useParams()
  const [contact, setContact] = useState(null); // Initialize contact state with null
  const { isKannada } = useLanguage();

  useEffect(() => {
    // Fetch and set contact based on sporti parameter
    setContact(contactInfo[sporti]);
  }, [sporti]); // Trigger effect whenever sporti changes

  if (!contact) {
    return <Loading />; // Render loading indicator while data is being fetched
  }

  const lang = isKannada ? 'kn' : 'en'; // Set language based on preference

  return (
    <div className='contact'>
      <Helmet>
      <title>Contact Us - SPORTI</title>
      <meta name="description" content="Get in touch with SPORTI for inquiries about our services for Senior Police Officers, events, and training programs." />
      <meta name="keywords" content="Contact SPORTI, Senior Police Officers Research and Training Institute, contact information, inquiries, police training services, Karnataka Police" />
      </Helmet>
      <div className='contact-banner'>
        <div className="skew-container">
          <div className="skew-left">
              <h1 className="fs-2 fw-bold">
             {isKannada ? 'ನಮಗೆ ಸಂಪರ್ಕಿಸಿರಿ' : 'CONTACT US'}
             </h1>
          </div>
          <div className="skew-right d-flex align-items-center">
            <h1 className="fs-2 fw-bold">{contact.title[lang]}</h1>
          </div>
        </div>
      </div>

      <div className="contact-info p-4">
        <div className="row">
          {contact.info.map((item, index) => (
            <div key={index} className={`col-12 col-md-4 contact-main-card mb-3`}>
              <div className="contact-card text-white p-3 h-100 rounded-2">
                <i className={`bi bi-${item.icon} display-2 mb-3`}></i>
                <h1 className="fs-3 fw-bold">{isKannada?(item.title.kn):(item.title.en)}</h1>
                <p className="fs-5 mt-3">{item.desc.kn?(item.desc[lang]):(item.desc)}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="contact-map">
        <iframe
          src={contact.location}
          width="100%"
          height="450"
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>

      <div className="feedback text-center p-3">
        <i className="bi bi-stars fs-2 text-warning"></i>
        <h1 className="fs-2 fw-bold">WRITE TO US</h1>
        <span className="fs-6 subtitle d-block text-center">FEEL FREE TO SEND US A MESSAGE</span>
        <Feedback sporti={sporti} />
      </div>

    
    </div>
  );
}

export default Contact;
