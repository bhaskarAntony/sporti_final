import React, { useState } from 'react'
import Hero from '../../components/carousel/Hero'
import './style.css'
import About from '../../components/about/About'
import { Link } from 'react-router-dom'
import Recents from '../../components/Recents/Recents'
import { useLanguage } from '../../context/LangaugeContext'
import Benefits from '../../data/Benefits'
import Video from '../../admin/components/videos/Video.jsx'
import { Helmet } from 'react-helmet';

const roomBookingFAQs = [
    {
        question: "How can I book a room?",
        answer: "You can book a room by visiting our website and selecting the 'Book Now' option. Alternatively, you can call our reservation desk at [reservation phone number]."
    },
    {
        question: "What types of rooms do you offer?",
        answer: "We offer a variety of room types to suit different needs, including standard rooms, deluxe rooms, suites, and family rooms."
    },
    {
        question: "What amenities are included with the room?",
        answer: "Our rooms come with standard amenities such as complimentary Wi-Fi, air conditioning, TV, and toiletries. Additional amenities may vary depending on the room type."
    },
    {
        question: "Can I cancel or modify my booking?",
        answer: "Yes, you can cancel or modify your booking by contacting our reservation desk at least 24 hours before your scheduled arrival."
    },
    {
        question: "Is breakfast included in the room rate?",
        answer: "It depends on the room package you select. Some packages include complimentary breakfast, while others may offer it as an optional add-on."
    },
    {
        question: "Do you offer discounts for group bookings?",
        answer: "Yes, we offer discounts for group bookings. Please contact our reservation desk for more information on group rates and discounts."
    },
    {
        question: "What is your check-in/check-out policy?",
        answer: "Our standard check-in time is [check-in time], and check-out time is [check-out time]. Early check-in and late check-out may be available upon request, subject to availability and additional charges."
    },
    {
        question: "Do you have parking facilities?",
        answer: "Yes, we offer complimentary parking facilities for guests. Please let us know in advance if you require parking space."
    },
    {
        question: "Are pets allowed in the rooms?",
        answer: "We have limited pet-friendly rooms available. Please inform us in advance if you plan to bring your pet, as additional charges and restrictions may apply."
    },
    {
        question: "How can I contact the front desk for assistance?",
        answer: "You can contact our front desk 24/7 for assistance by dialing [front desk phone number] or visiting the reception area."
    }
];

const fontSizeClasses = [
    'fs-1', 'fs-2', 'fs-3', 'fs-4', 'fs-5', 'fs-6'
  ];
  
  function Home() {
    const [fontSizeIndex, setFontSizeIndex] = useState(3); // Default to 'fs-4'
    const [isHighContrast, setIsHighContrast] = useState(false);
    const isAuthenticated = true;
    const { isKannada } = useLanguage();
  
    const increaseFontSize = () => {
      if (fontSizeIndex > 0) {
        setFontSizeIndex(prevIndex => prevIndex - 1);
      }
    };
  
    const decreaseFontSize = () => {
      if (fontSizeIndex < fontSizeClasses.length - 1) {
        setFontSizeIndex(prevIndex => prevIndex + 1);
      }
    };
  
    const toggleHighContrast = () => {
      setIsHighContrast(prevState => !prevState);
    };
  
    const fontSizeClass = fontSizeClasses[fontSizeIndex];
    const highContrastClass = isHighContrast ? 'high-contrast' : '';
  
    return (
      <div>
      <Helmet>
                <title>SPORTI - Senior Police Officers Research and Training Institute</title>
                <meta name="description" content="SPORTI - Senior Police Officers Research and Training Institute offers comprehensive services including training, accommodation, event hosting, dining, gym facilities, and sports like badminton, table tennis, billiards, and hockey for Karnataka's police officials."/>
                <meta name="keywords" content="SPORTI, SPORTI MESS, sporti mess, SPORTI mess, Senior Police Officers Research and Training Institute, Karnataka Police, police training, sporti accommodation, sporti rooms, sporti conference facilities, sporti event hosting, sporti event hall, sporti dining, sporti gym, sporti badminton, sporti table tennis, sporti billiards, sporti hockey, sporti Bengaluru, SPORTI accommodation, SPORTI rooms, SPORTI conference facilities, SPORTI event hosting, SPORTI event hall, SPORTI dining, SPORTI gym, SPORTI badminton, SPORTI table tennis, SPORTI billiards, SPORTI hockey, SPORTI Bengaluru"/>
                <meta name="author" content="SPORTI" />
                <meta name="robots" content="index, follow" />
            </Helmet>
        <Hero />
        <marquee behavior="scroll" direction="left" scrollamount="10" className='d-block p-1 text-white bg-danger'>
          {
            isKannada?(<span><b>ಹಕ್ಕು ನಿರಾಕರಣೆ:</b> ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳಿಗೆ ಮಾತ್ರ ಸ್ಪೋರ್ಟಿ ಈವೆಂಟ್‌ಗಳನ್ನು ಪ್ರವೇಶಿಸಬಹುದು</span>):(
              <span><b>Disclaimer:</b> SPORTI events accessible for Senior Police Officers.</span>
            )
          }
          </marquee>
        <Recents />
        <About />
        <Video/>
        {/* <Video content="d" sporti="SPORTI-2"/> */}
      </div> 
    );
  }
  
  export default Home;