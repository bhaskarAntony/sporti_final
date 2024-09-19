import React, { useState, useEffect } from 'react';
import servicesData from '../../data/services';
import './style.css';
import { Link, useParams } from 'react-router-dom';
import ImagePopup from '../../components/popups/ImagePopup';
import Loading from '../../components/popups/Loading';
import { useLanguage } from '../../context/LangaugeContext';
import sporti1Menu from '../../components/documents/SPORTI1_menu_n.pdf'
import sporti2Menu from '../../components/documents/sporti2_menu.pdf'
import sporti1banner from '../../assets/images/banners/sporti1_banner.jpg'
import sporti2banner from '../../assets/images/banners/sporti2_banner.jpg'

function Services() {
  const { sporti } = useParams(); // Destructure sporti from useParams()
  console.log(sporti);
  
  const [service, setService] = useState(null); // Initialize service state with null
  const [showmodal, setShowModal] = useState(false)
  const [image, setImage] = useState(null)
  const [title, setTitle] = useState(null)
  const {isKannada} = useLanguage()

  useEffect(() => {
    // Fetch and set service based on sporti parameter
    setService(servicesData[sporti]);
  }, [sporti]); // Trigger effect whenever sporti changes

  if (!service) {
    return <Loading/>; // Render loading indicator while data is being fetched
  }


  const handleClose = ()=>{
    setShowModal(false)
  }
  const openModal = (url, name)=>{
    setShowModal(true)
    setImage(url)
    setTitle(name)
  }
 

  return (
    <div className='services'>
      <div className={`contact-banner `}>
        <img src={service.title== 'SPORTI-1'?(sporti1banner):(sporti2banner)} alt="sporti" className="w-100 sporti-banner" />


      </div>
      <div className="skew-container">
                <div className="skew-left">
                    <h1 className="fs-2 fw-bold">{isKannada ? 'ಸೇವೆಗಳು' : 'SERVICES'}</h1>
                </div>
                <div className="skew-right d-flex align-items-center">
                <h1 className="fs-2 fw-bold title">{isKannada?(service.title_kn):(service.title)}</h1>
                </div>
            </div>
                    <div className="row p-2 p-md-5">
                        <div className="col-md-4 m-auto">
                           
                        </div>
                    </div>

      <div className="container bg-white p-2 py-5">
        <div className="text-center mb-5">
          <i className="bi bi-stars fs-2 text-warning"></i>
          <h1 className="fs-2 fw-bold title">{isKannada?(service.title_kn):(service.title)}</h1>
          <span className="fs-6 subtitle d-block">{service.subtitle}</span>
        </div>
        <div className="row mt-4">
          <div className="col-12 col-md-8">
            {service.services.map((item, index) => (
              <div className={`row p-3 rounded-3 mb-4 align-items-center ${index % 2 === 0 ? 'order-1' : 'order-2'}`} key={index}>
                <div className="col-12 col-md-3">
                  <img src={item.image} alt="" className="w-100 mb-3 rounded" onClick={()=>openModal(item.image, item.title_en)} />
                </div>
                <div className="col-12 col-md-9">
                  <h1 className="fs-4 title fw-bold">{isKannada ?(item.title_kn):(item.title)}</h1>
                  <p className="mt-2 lead gray-text">{isKannada ?(item.desc_kn):(item.desc)}</p>
                  {
                    item.title =="In-house Restaurant" || item.title =="Dining"?(
                      <a href={sporti == "sporti1"?sporti1Menu:sporti2Menu} className="blue-btn rounded-5" download={sporti == "sporti1"?sporti1Menu:sporti2Menu}>
                      {isKannada ? 'ಡೌನ್‌ಲೋಡ್ ಮಾಡಿ' : 'Download Menu'}
                    </a>
                    ):(null)
                  }
                  {
                    item.isBook ? (
                    //   <Link to={`/services/book/${item.title.trim('-')}`} className='blue-btn rounded-5'>
                    //   Book Now
                    // </Link>
                     <Link to={item.link} className='blue-btn rounded-5'>
                     {isKannada?'ಬುಕ್ ಮಾಡಿ':'Book Now'}
                   </Link>
                    ):(null)
                  }
                   <hr />
                </div>
               
              </div>
            ))}
          </div>
          <div className="col-12 col-md-4">
            <div className="all-services">
              <div className="row">
                {service.services.map((item, index) => (
                  <div className="col-6" key={index}>
                    <div className="service-card">
                      <img src={item.image} alt="" className="w-100 h-100" onClick={()=>openModal(item.image, item.title_en)} />
                      <div className="service-info text-center">
                        <span className="fs-6 text-white">{item.title_en}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ImagePopup show={showmodal} close={handleClose} url={image} title={title}/>
    </div>
  );
}

export default Services;
