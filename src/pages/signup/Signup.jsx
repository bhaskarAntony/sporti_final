import React from 'react'
import { Link } from 'react-router-dom'
import './style.css'

function Signup() {
  return (
    <div className='container signup login p-3 p-md-5'>
        <div className="card shadow">
            <h1 className="fs-3">New Member Account </h1>
            <div className="form-group mt-3">
                <label htmlFor="">username</label>
                <input type="text" placeholder='Username' className="p-3 form-control" />
            </div>
            <div className="row">
              <div className="col-6">
              <div className="form-group mt-3">
                <label htmlFor="">Designation </label>
                <input type="text" placeholder='Type Your Designation' className="p-3 form-control" />
            </div>
              </div>
              <div className="col-6">
              <div className="form-group mt-3">
                <label htmlFor="">Unit</label>
                <input type="text" placeholder='Unit' className="p-3 form-control" />
            </div>
              </div>
            </div>
            <div className="form-group mt-3">
                <label htmlFor="">Email address</label>
                <input type="email" placeholder='Type Your Email' className="p-3 form-control" />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="">Phone number</label>
                <input type="text" placeholder='Type Your Phone Number' className="p-3 form-control" />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="">create password</label>
                <input type="password" placeholder='create password' className="p-3 form-control" />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="">confirm password</label>
                <input type="password" placeholder='confirm password' className="p-3 form-control" />
            </div>
            <div className="form-group mt-3">
                <label htmlFor="">Working Status</label>
                <select name="" id="" className="form-control p-3">
                <option value="A" selected>Presently Employed </option>
                <option value="A+">Retired </option>
              </select>
            </div>
            <div className="form-group mt-3">
                <label htmlFor="">KGID NO</label>
                <input type="password" placeholder='Enter KGID NO' className="p-3 form-control" />
            </div>
           <div className="mt-3">
            <label htmlFor="" className='form-label'>Gender</label>
           <div className="d-flex">
         <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name='gender' id="inlineCheckbox1" value="option1"/>
            <label class="form-check-label" for="inlineCheckbox1">Male</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio"  name='gender' id="inlineCheckbox2" value="option2"/>
            <label class="form-check-label" for="inlineCheckbox2">Female</label>
          </div>
          <div class="form-check form-check-inline">
            <input class="form-check-input" type="radio" name='gender' id="inlineCheckbox2" value="option2"/>
            <label class="form-check-label" for="inlineCheckbox2">Other</label>
          </div>
         </div>
           </div>
         <div className="row">
          <div className="col-6">
          <div className="form-group mt-3">
                <label htmlFor="">Date Of Birth</label>
                <input type="date"  className="p-3 form-control" />
            </div>
          </div>
          <div className="col-6">
          <div className="form-group mt-3">
                <label htmlFor="">Blood Group</label>
                <select name="" id="" className="form-control p-3">
                <option value="A" selected>A</option>
                <option value="A+">A+</option>
                <option value="A-">A-</option>
                <option value="B+">B+</option>
                <option value="B-">B-</option>
                <option value="O+">O+</option>
                <option value="O-">O-</option>
              </select>

            </div>
          </div>
         </div>
           <div className="row">
            <div className="col-6">
            <div className="form-group mt-3">
                <label htmlFor="">Region/State</label>
              <select name="" id="" className="form-control p-3">
                <option value="">Karnataka</option>
                <option value="">Tamilu nadu</option>
                <option value="">Kerala</option>
                <option value="">Telangana</option>
                <option value="">Andra Pradesh</option>
                <option value="">Maharastra</option>
              </select>
            </div>
            </div>
            <div className="col-6">
            <div className="form-group mt-3">
                <label htmlFor="">Gender</label>
              <select name="" id="" className="form-control p-3">
                <option value="">Male</option>
                <option value="">Female</option>
                <option value="">Other</option>
              </select>
            </div>
            </div>
       
           </div>
            <div class="form-check mt-3">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
            <label class="form-check-label" for="flexCheckDefault">
               Accept Sporti Terms of Services
            </label>
            </div>
            <div class="form-check mt-3">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"/>
            <label class="form-check-label" for="flexCheckDefault">
               Accept Sporti privacy policy
            </label>
            </div>
          
            <Link to={'/signup'} className="btn btn-primary mt-3 p-3">Create account</Link>
            <span className="fs-6 mt-3">have you already account? <a href="/login">Login</a></span>
        </div>
    </div>
  )
}

export default Signup