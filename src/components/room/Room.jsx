import React from 'react'
import roomsdata from '../../data/rooms'

function Room() {
  return (
    <div className='room-container p-3 p-md-5'>
         <div className="text-center">
      <div className="btn-tag">Rooms</div>
      </div>
      <h1 className="banner-heading display-3 fw-bold text-center">Explore our <br />Room booking services</h1>

      <div className="rooms-categories p-3 p-md-4">
            <h1 className="fs-1 fw-bold py-4">Room Sections</h1>
            <div className="rooms-inner">
                {
                    roomsdata.map((item, index)=>(
                        <div className="room-card">
                            <img src={item.image} alt="" className="w-100" />
                            <div className="room-info">
                                <a href={`/roomview/${item.id}`} className="btn-primary btn px-3">Book Now</a>
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