// RegistrationForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import SuccessPopup from '../../components/popups/SuccessPopup';

const Registration = () => {
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        name: '',
        email: ''
    });
    const [showmodal, setShowModal] = useState(false)
    const [desc, setDesc] = useState(null)
    const [title, setTitle] = useState(null)

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };
    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        // try {
        //     const response = await axios.post('http://localhost:5000/api/auth/register', formData);
        //     console.log(response.data);
        //     // Redirect or show success message
        //     alert('success')
        //     navigate(`/additional-details/${response.data.userId}`)
        // } catch (error) {
        //     console.error('Registration error:', error);
        //     // Show error message to user
        //     alert('error')
        // }
        openModal('Success', 'membership account is created please fill personal details')
        // navigate(`/additional-details/123`)
    };
    const handleClose = ()=>{
        setShowModal(false)
      }
      const openModal = (title, desc)=>{
        setShowModal(true)
        setDesc(desc)
        setTitle(title)
      }

    return (
        <div className="container-fluid p-3 p-md-5 bg-light">
       <div className="row bg-white p-3 shadow-sm">
        <div className="col-12 col-md-6">
            <img src="./images/aboutus/smwaus_1.jpg" alt="" className="w-100" />
        </div>
        <div className="col-12 col-md-6">
        <div className="card w-100">
                    <div className="card-body">
                        <h2 className="text-center mb-4">New Membership Registration</h2>
                        <form onSubmit={handleSubmit}>
                           <div className="row">
                           <div className="mb-3">
                                <label className="form-label">Username:</label>
                                <input type="text" className="form-control" name="username" value={formData.username} onChange={handleChange} />
                            </div>
                          <div className="col-12 col-md-6">
                          <div className="mb-3">
                                <label className="form-label">Create Password:</label>
                                <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
                            </div>
                          </div>
                          <div className="col-12 col-md-6">
                          <div className="mb-3">
                                <label className="form-label">Confirm Password:</label>
                                <input type="password" className="form-control" name="password" value={formData.password} onChange={handleChange} />
                            </div>
                          </div>
                            <div className="mb-3">
                                <label className="form-label">Name:</label>
                                <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                            </div>
                            <div className="mb-3">
                                <label className="form-label">Email:</label>
                                <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                            </div>
                            <span className="span">Already have an membership account <Link to='/registration'>Login</Link></span>
                            <button type="submit" className="btn btn-primary btn-block mt-3 p-3 w-100">Create Account</button>
                           </div>
                        </form>
                    </div>
                </div>
        </div>
       </div>
        
        <SuccessPopup show={showmodal} close={handleClose} title={title} desc={desc} next={true}/>
    </div>
    );
};

export default Registration;
