import React from 'react'
import { useParams } from 'react-router-dom'
import './style.css'

function VideoView() {
    const {sporti} = useParams();

  return (
    <div className='p-3 bg-dark'>
       <video src={ sporti == "sporti1"?"https://firebasestorage.googleapis.com/v0/b/sporti-2e307.appspot.com/o/sporti%20videos%2FSporti_1.mp4?alt=media&token=2d8a24b3-012f-45e5-bdf2-58740e41825b":"https://firebasestorage.googleapis.com/v0/b/sporti-2e307.appspot.com/o/sporti%20videos%2Fsporti_2.mp4?alt=media&token=ded22e20-dcc1-45da-909c-6574320de9a0"} controls autoPlay loop className='video-view'></video>
    </div>
  )
}

export default VideoView