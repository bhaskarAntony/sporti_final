import React from 'react'
import logo from './assets/images/main_logo.jpg'
import { Link } from 'react-router-dom'

function NoFound() {
  return (
    <section className="container-fluid p-3 p-md-5 notfound">
       <div className="row">
        <div className="col-md-5 m-auto text-center">
        <img src={logo} alt="logo"  className='w-75'/>
        <h1 className="fs-1 mt-4">Website under Maintainance</h1>
        <p className='fs-5'>Please contact SPORTI helpline</p>
        <p className='fs-5'>SPORTI1: +91 8277945903</p>
        <p className='fs-5'>SPORTI2: +91 8022942634</p>
        <p className='fs-5'>or send Email: digksrp@gmail.com</p>
        <Link to='/' className="blue-btn px-3">GO BACK</Link>
        </div>
       </div>
    </section>
  )
}

export default NoFound