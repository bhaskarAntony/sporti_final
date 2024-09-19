import React, { useState } from 'react'
import './style.css'
import servicesData from '../../data/services'

const data = [
    {
        image:'building',
        title:'Room Booking',
        desc:'Indulge in our laundry services, diverse dining options, and exciting recreational facilities.'
    },
    {
        image:'basket3-fill',
        title:'Food Order',
        desc:'Savor a variety of delicious cuisines prepared by our talented chefs.'
    },
    {
        image:'calendar-event',
        title:'Events Booking',
        desc:'Stay active and entertained with our state-of-the-art amenities.'
    }
]
function Services() {
  
  return (
    <div className='services-container container-fluid p-3 p-md-5 '>
      <div className="feedback text-center p-3">
   <i class="bi bi-stars fs-2 text-warning"></i>
   <h1 className="fs-2 fw-bold title">SERVICES</h1>
   <span className="fs-6 subtitle d-block">Explore sporti services</span>
   </div>

      <div className="row">
        {
            data.map((item, index)=>(
                <div className="col-12 col-md-4 mb-3">
                    <div className="services-card text-center p-2 bg-white mb-4 h-100">
                       <i className={`bi bi-${item.image} display-2 mb-3 d-block`}></i>
                        <h1 className="fs-4 title fw-bold">{item.title}</h1>
                        <p className="fs-6 text-secondary">{item.desc}</p>
                    </div>
                </div>
            ))
        }
      </div>

    
    </div>
  )
}

export default Services