import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function Video() {
  return (
    <div>
        <section className="video container-fluid p-3 p-md-5">
            <div className="row">
                <div className="col-md-6 mb-3">
                   <div className="video-container">
                   <video src="https://firebasestorage.googleapis.com/v0/b/sporti-2e307.appspot.com/o/sporti%20videos%2FSporti_1.mp4?alt=media&token=2d8a24b3-012f-45e5-bdf2-58740e41825b" className='w-100 bg-secondary' controls autoPlay muted loop></video>
                  
                   </div>
                   <h1 className="fs-3 mt-3 text-white">SPORTI-1</h1>
                   <Link to='/view/video/sporti1' className="btn btn-light rounded-pill">Watch Video</Link>
                </div>
                <div className="col-md-6">
               <div className="video-container">
               <video src="https://firebasestorage.googleapis.com/v0/b/sporti-2e307.appspot.com/o/sporti%20videos%2Fsporti_2.mp4?alt=media&token=ded22e20-dcc1-45da-909c-6574320de9a0" className='w-100 bg-secondary' controls autoPlay muted loop></video>
               </div>
               <h1 className="fs-3 mt-3 text-white">SPORTI-2</h1>
               <Link to='/view/video/sporti2' className="btn btn-light rounded-pill">Watch Video</Link>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Video