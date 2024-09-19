import React from 'react'
import './style.css'
import gallerydata from '../../data/gallery'

function Recents() {
  return (
    <div className='recent p-3 p-md-5'>
         <div className="text-center">
      <div className="btn-tag">recent</div>
      </div>
      <h1 className="banner-heading display-3 fw-bold text-center">Explore our <br />Recent sporti activities</h1>

        <div className="row">
            <div className="col-12 col-md-4">
                <div className="recent-top shadow-sm border">
                    <h1 className="fs-2">LATEST NEWS</h1>
                </div>
                <div className="recent-card shadow border ">
                    <h1 className='fs-2 text-muted'> No News avilable</h1>
                </div>
                <div className="recent-footer bg-dark p-3 text-end">
                    <button className="btn btn-light px-4">View All</button>
                </div>
            </div>
            <div className="col-12 col-md-4">
                <div className="recent-top shadow-sm border">
                    <h1 className="fs-2">NOTICE</h1>
                </div>
                <div className="recent-card shadow border ">
                    <h1 className='fs-2 text-muted'> No News avilable</h1>
                </div>
                <div className="recent-footer bg-dark p-3 text-end">
                    <button className="btn btn-light px-4">View All</button>
                </div>
            </div>
            <div className="col-12 col-md-4">
                <div className="recent-top shadow-sm border">
                    <h1 className="fs-2">RECENT EVENTS</h1>
                </div>
                <div className="recent-card shadow border ">
                  {gallerydata.map((item, index)=>(
                    <div className='bg-light mb-3'>
                        <span className="fs-4 text-danger">{item.title}</span> <br />
                        <span className="fs-5 text-secondary">{item.title}</span>
                    </div>
                  ))}
                </div>
                <div className="recent-footer bg-dark p-3 text-end">
                    <button className="btn btn-light px-4">View All</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Recents