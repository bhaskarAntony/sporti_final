import React from 'react'
import loader from '../../assets/images/images/loading.gif'

function Loading() {
  return (
    <div className='container-fluid loading'>
         <img src={loader} alt="" className="loading-img" />
    </div>
  )
}

export default Loading