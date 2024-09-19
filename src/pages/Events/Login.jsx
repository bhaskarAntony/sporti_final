import React from 'react'
import './style.css'
import { Link } from 'react-router-dom'

function Login() {
  return (
    <div className='container login'>
        <div className="card shadow">
            <h1 className="fs-3">Login to Watch</h1>
            <div className="form-group mt-3">
                <label htmlFor="">username</label>
                <input type="text" placeholder='Username' className="p-3 form-control" />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="">username</label>
                <input type="password" placeholder='password' className="p-3 form-control" />
            </div>
            <Link to={'/stream'} className="btn btn-primary mt-3 p-3">Login</Link>
        </div>
    </div>
  )
}

export default Login