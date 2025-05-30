import React, { useContext, useEffect } from 'react';
import { Carousel, Modal } from 'react-bootstrap';
import heroImages from '../../data/hero'
import './style.css'
import Aos from 'aos';
import { useLanguage } from '../../context/LangaugeContext';
import { Link } from 'react-router-dom';
import GuestAuthContext from '../../context/GuestAuthContext';
import AuthContext from '../../context/AuthContext.jsx';

function Hero() {
  const {isGuestAuthenticated} = useContext(GuestAuthContext);
  const {isAutenticated} = useContext(AuthContext)
  // alert(isAutenticated)
  // alert(isGuestAuthenticated)
  const [show, setShow] = React.useState(false);
  useEffect(()=>{
    Aos.init();
  }, []);
const showModal = () =>{
  setShow(true);
}
const closeModal = () =>{
  setShow(false);
}
  const {isKannada} = useLanguage();
  return (
    <div className=''>
      <Carousel className=' overflow-hidden' fade >
    {
      heroImages.map((item, index)=>(
        <Carousel.Item>
        <img
          className="d-block w-100"
          src={item.url}
          alt="slide image"
          
        />
        <Carousel.Caption className='bg-main'>
          <h3 className='fs-1 fw-bold' style={{letterSpacing:'4px', textTransform:'uppercase'}}>WELCOME TO SPORTI</h3>
          {/* <p className='fs-5  fw-bold'>{isKannada?item.description_ka:item.description_en}</p> */}
             {
              isAutenticated ==undefined || isGuestAuthenticated ==false?( <a onClick={showModal} className="btn btn-light px-5 rounded-pill" style={{width:'fit-content', border:'none', background:'#fff', borderRadius:'100px', display:'block', margin:'auto', padding:'10px 20px', textDecoration:'none', color:'#000'}}>Login</a>):(null)
             }
        </Carousel.Caption>
      </Carousel.Item>
      ))
    }

    </Carousel>

    <Modal show={show} onHide={closeModal} centered className='modal-dialog-centered p-1' size="sm">
      <Modal.Header className="text-center justify-content-center">
        {/* <Modal.Title>{isKannada?'ಸ್ಪೋರ್ಟಿ - ಹಿರಿಯ ಪೊಲೀಸ್ ಅಧಿಕಾರಿಗಳ ತರಬೇತಿ ಮತ್ತು ಸಂಶೋಧನಾ ಸಂಸ್ಥೆ':'SPORTI - Senior Police Officers Research and Training Institute'}</Modal.Title>   */}
        <Modal.Title className="text-dark text-center fs-6">LOGIN</Modal.Title>
      </Modal.Header>
      <hr />
      <Modal.Body className='d-flex flex-wrap gap-2 p-2'>
        <a href='/login' className="blue-btn">Member</a>
        <a href='/guest/book-room' className="blue-btn">non Member</a>
      </Modal.Body>

    </Modal>
</div>
  );
}

export default Hero;
