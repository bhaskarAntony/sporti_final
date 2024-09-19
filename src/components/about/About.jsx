import React from 'react'
import { useLanguage } from '../../context/LangaugeContext'
import about from '../../data/AboutSection';

function About() {
    const {isKannada} = useLanguage();
  return (
    <div className='about-container p-3 px-md-5  py-1'>
        <div className="row align-items-center">
            <div className="col-12 col-md-6">
                <div className="about-left mb-3">
                    <p className="">{isKannada?about.tag_ka:about.tag_en}</p>
                <h1 className=" fw-bold title">{isKannada?about.heading_ka:about.heading_en}</h1>
                <p className=" gray-text">{isKannada?about.desc_ka:about.desc_en}</p>
                </div>
                <div className="btns d-flex flex-wrap gap-3 mt-3"> 
                    <a href='/about' className="main-btn">  {isKannada ? 'ಇನ್ನಷ್ಟು ತಿಳಿಯಿರಿ' : 'Know More'}</a>
                    {/* <a href='/services' className="btn-outline text-dark">Our services</a> */}
                </div>
            </div>
            <div className="col-12 col-md-6 mb-3">
                <div className="about-right  d-flex align-items-center justify-content-center">
                    <img src="./images/aboutus/smwaus_1.jpg" alt=""  className='w-75'/>
                </div>
            </div>
        </div>
    </div>
  )
}

export default About