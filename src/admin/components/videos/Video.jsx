import React from 'react'
import './style.css'
import sporti1video from './sporti_1.mp4'
import sporti2video from './sporti_2.mp4'
import { Link } from 'react-router-dom'

function Video({content, sporti}) {
  return (
    <section className="container-fluid p-3 p-md-5  video-section">
        <div className="row">
            <div className="col-md-6">
              <div className="video-container p-2">
              <video src={sporti1video} autoPlay controls muted loop className='w-100 mb-3 rounded bg-secondary'></video>
              </div>
            </div>
            <div className="col-md-6 mt-3  text-light">
                <h1 className='f1'>SPORTI-1</h1>
                <p className="f5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde perspiciatis ipsam velit nobis, commodi aliquam dolores dignissimos earum mollitia, minus enim ratione nihil dolore veritatis est consectetur asperiores nam eos!</p>
                <Link to='/watch/video/sporti1' className="main-btn px-4">SPORTI-1 Services</Link>
            </div>
        </div>
        <div className="devider"></div>

        <div className="row">
        <div className="col-md-6 mt-3  text-light">
                <h1 className='f1'>SPORTI-2</h1>
                <p className="f5">Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde perspiciatis ipsam velit nobis, commodi aliquam dolores dignissimos earum mollitia, minus enim ratione nihil dolore veritatis est consectetur asperiores nam eos!</p>
                <Link to='/watch/video/sporti2' className="main-btn px-4">SPORTI-1 Services</Link>
            </div>
            <div className="col-md-6">
              <div className="video-container p-2 mt-3">
              <video src={sporti2video} controls muted autoPlay loop className='w-100 rounded bg-secondary'></video>
              </div>
            </div>
           
        </div>
    </section>
  )
}

export default Video