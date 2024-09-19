import React from 'react'
import menu from '../../data/foods'

function Food() {
  return (
    <div className='food-container p-3 p-md-5 bg-light'>
 <div className="text-center">
      <div className="btn-tag">Rooms</div>
      </div>
      <h1 className="banner-heading display-3 fw-bold text-center">Explore our <br />Food Ordering services</h1>

      <div className="food-categories">
                {menu.map((item, index) => (
                    <div className="menu-item text-center" key={index} >
                        <img src={item.image} alt="" className='mb-3' />
                        <div className="menu-info">
                            <p className="fs-4">{item.title}</p>
                        </div>
                    </div>
                ))}
            </div>
    </div>
  )
}

export default Food