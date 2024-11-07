import React from 'react'
import logo from './assets/images/main_logo.jpg'
import { Link } from 'react-router-dom'

function NoFound() {
  return (
    <section className="container-fluid p-3 p-md-5 notfound">
       <div className="row">
        <div className="col-md-5 m-auto text-center">
        <img src={logo} alt="logo"  className='w-75'/>
        <h1 className="fs-1 mt-4">WEB SITE  CURRENTLY</h1>
        <h1 className="fs-1 fw-bold fw-bold">UNDER MAINTAINANCE</h1>
        <Link to='/' className="blue-btn px-3">GO BACK</Link>
        </div>
       </div>
    </section>
  )
}

export default NoFound