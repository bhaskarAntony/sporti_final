import React, { useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import heroImages from '../../data/hero'
import './style.css'
import Aos from 'aos';
import { useLanguage } from '../../context/LangaugeContext';
import { Link } from 'react-router-dom';

function Hero() {
  useEffect(()=>{
    Aos.init();
  }, []);

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
          <h3 className='fs-1  fw-bold'>{isKannada?item.caption_ka:item.caption_en}</h3>
          <p className='fs-5  fw-bold'>{isKannada?item.description_ka:item.description_en}</p>
          {
            item.btns?(
              <a href={item.btns.link} classname="btn btn-light px-3 rounded-pill" style={{width:'fit-content', border:'none', background:'#fff', borderRadius:'100px', display:'block', margin:'auto', padding:'10px 20px', textDecoration:'none', color:'#000'}}>Click here for Room/Service Booking</a>
            ):(null)
          }
        </Carousel.Caption>
      </Carousel.Item>
      ))
    }

    </Carousel>
    </div>
  
  );
}

export default Hero;
