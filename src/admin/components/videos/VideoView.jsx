import React from 'react'
import { useParams } from 'react-router-dom'
import './style.css'

function VideoView() {
    const {sporti} = useParams();

  return (
    <div className='p-3 bg-dark'>
       <video src={ sporti == "sporti1"?"https://firebasestorage.googleapis.com/v0/b/sporti-2e307.appspot.com/o/sporti%20videos%2Fsporti_1%20(1).mp4?alt=media&token=65f28e6b-12a2-4f0b-b028-503adc534f0a":"https://firebasestorage.googleapis.com/v0/b/sporti-2e307.appspot.com/o/sporti%20videos%2FSporti_2%20(1).mp4?alt=media&token=c6cf3351-c63a-4958-aa39-7ee8dcad01a2"} controls autoPlay loop className='video-view'></video>
    </div>
  )
}

export default VideoView