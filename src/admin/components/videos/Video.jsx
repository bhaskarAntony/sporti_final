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
                   <video src="https://firebasestorage.googleapis.com/v0/b/sporti-2e307.appspot.com/o/sporti%20videos%2Fsporti_1%20(1).mp4?alt=media&token=65f28e6b-12a2-4f0b-b028-503adc534f0a" className='w-100 bg-secondary' controls autoPlay muted loop></video>
                  
                   </div>
                   <h1 className="fs-3 mt-3 text-dark">SPORTI-1</h1>
                   <Link to='/view/video/sporti1' className="blue-btn m-0 rounded-pill">Watch Video</Link>
                </div>
                <div className="col-md-6">
               <div className="video-container">
               <video src="https://firebasestorage.googleapis.com/v0/b/sporti-2e307.appspot.com/o/sporti%20videos%2FSporti_2%20(1).mp4?alt=media&token=c6cf3351-c63a-4958-aa39-7ee8dcad01a2" className='w-100 bg-secondary' controls autoPlay muted loop></video>
               </div>
               <h1 className="fs-3 mt-3 text-dark">SPORTI-2</h1>
               <Link to='/view/video/sporti2' className="blue-btn rounded-pill m-0">Watch Video</Link>
                </div>
            </div>
        </section>
    </div>
  )
}

export default Video