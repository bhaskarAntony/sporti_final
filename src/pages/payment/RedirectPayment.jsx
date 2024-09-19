import React from 'react'
import { useNavigate } from 'react-router-dom'

function RedirectPayment() {
    const navigate = useNavigate()
    const goToHome = () =>{
        navigate('/')
    }
  return (
    <section className="container-fluid p3 p-md-5">
        <div className="row">
            <div className="col-md-5 m-auto">
                <div className="card p-3 bg-success">
                    <h1 className='text-light text-center'>Payment is Successfull</h1>
                    <h4 className="text-warning text-center mt-4">Thank you</h4>

                    <button className='btn btn-light text-success mt-4 p-3 fs-5' onClick={goToHome}>Go back to home</button>
                </div>
            </div>
        </div>
    </section>
  )
}

export default RedirectPayment