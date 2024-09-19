import React from 'react'
import './style.css'
import roomsdata from '../../data/rooms'

function Room({data}) {
  return (
    <div className='room-container'>
          <div className="contact-banner about-banner">
            {/* <h1 className='fs-1 fw-bold text-center'>About us</h1>
            <p className="fs-6 text-center">
            SPORTI consists of a team of Senior Officers from various units of the Police Department. It also has a Working Committee who conduct various Conferences and Workshops to discuss the operations and functioning of the Institute. The team hosts periodic meetings every last Friday of the month for effective improvements of the Institute.
            </p> */}
             <div className="skew-container">
        <div className="skew-left">
            <h1 className="fs-2 fw-bold">Room Booking</h1>
        </div>
        <div className="skew-right d-flex align-items-center">
        <h1 className="fs-2 fw-bold text-black">{data.title}</h1>
        </div>
    </div>

           
        </div>


        <div className="rooms-categories p-3 p-md-4">
            <h1 className="fs-1 fw-bold py-4">Room Sections</h1>
            <div className="rooms-inner">
                {
                    data.rooms.map((item, index)=>(
                        <div className="room-card">
                            <img src={item.image} alt="" className="w-100" />
                            <div className="room-info">
                                <a href={`/roomview/${item.id}/${data.id}`} className="btn-primary btn px-3">Book Now</a>
                                <h1 className="fs-4">{item.title}</h1>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Room