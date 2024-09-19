import React from 'react'
import { useParams } from 'react-router-dom'
import sporti1video from './sporti_1.mp4'
import sporti2video from './sporti_2.mp4'

function VideoView() {
    const {sporti} = useParams()
  return (
    <div className='video-view bg-dark'>
        <video src={sporti == "sporti1"?(sporti1video):(sporti2video)} autoPlay controls loop  className='w-100' style={{background:'#0c0c0c'}}></video>
    </div>
  )
}

export default VideoView;