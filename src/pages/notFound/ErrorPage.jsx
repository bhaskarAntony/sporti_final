import React from 'react'
import { Link } from 'react-router-dom'

function ErrorPage() {
  return (
    <div className='container-fluid p-3 p-md-5 bg-light'>
       <div className="row">
        <div className="col-md-6 offset-md-4">
        <div className="card text-center">
       <h1 className="display-1 text-danger">Error 404</h1>
        <h2>Page Not Found</h2>
        <p>The page you are looking for does not exist.</p>
        <Link to="/" className='blue-btn'>return to home page</Link>
       </div>
        </div>
       </div>
    </div>
  )
}

export default ErrorPage