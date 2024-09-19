// AdditionalDetailsForm.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { Dropdown } from 'react-bootstrap';
import SuccessPopup from '../../components/popups/SuccessPopup';

const AdditionalDetailsForm = () => {
    const { id } = useParams();
    const [formData, setFormData] = useState({
        name: '',
        officialNumber: '',
        email: '',
        officialAddress: '',
        residentialAddress: '',
        designation: '',
        unit: '',
        gender: '',
        kgidNo: '',
        workingStatus: '',
        dateOfBirth: '',
        bloodGroup: '',
        areaOfInterest: '',
        profilePhoto: '',
        policeId: '',
        requestLetter: '',
        isMembershipAgreed: false
    });
    const [showmodal, setShowModal] = useState(false)
    const [desc, setDesc] = useState(null)
    const [title, setTitle] = useState(null)
  

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        const newValue = type === 'checkbox' ? checked : value;
        setFormData({ ...formData, [name]: newValue });
    };

    const navigate = useNavigate()
    const handleSubmit = async (e) => {
        e.preventDefault();
        // try {
        //     await axios.post(`http://localhost:5000/api/membership/submit-application/${id}`, formData);
        //     alert('Membership application submitted successfully');
        //     // navigate(`/admin/${id}`)
          
        // } catch (error) {
        //     console.error('Application submission error:', error);
        //     alert('Error submitting membership application');
        // }
        openModal('Your application has Submitted', 'verification is pending once verfication is done you will get confirmation  to registered email. The verification of application may take around 48 to 72 hours. Once membership is verified you will receive an email with the payment link. (application number must be generated for this) ')
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
        <div className="container p-2 p-md-5">
            <h2>Personal Details Form</h2>
            <form onSubmit={handleSubmit}>
                <div className="row">
                    <div className="col-md-6">
                        <div className="mb-3">
                            <label className="form-label">Name:</label>
                            <input type="text" className="form-control" name="name" value={formData.name} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Designation:</label>
                            <input type="text" className="form-control" name="designation" value={formData.designation} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Unit:</label>
                            <input type="text" className="form-control" name="unit" value={formData.unit} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Cadre:</label>
                            <input type="text" className="form-control" name="unit" value={formData.unit} onChange={handleChange} />
                        </div>
                        <div className="mb-3">
                        <label className="form-label">KGID No:</label>
                        <input type="text" className="form-control" name="kgidNo" value={formData.kgidNo} onChange={handleChange} />
                    </div>

                    <div className="mb-3">
                        <label className="form-label">Working Status:</label>
                       

                        <Dropdown>
                            <Dropdown.Toggle  className='bg-light text-dark border-secondary'>
                                {formData.workingStatus ? formData.workingStatus : 'Select Working Status'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleChange({ target: { name: 'workingStatus', value: 'Serving' } })}>Serving</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleChange({ target: { name: 'workingStatus', value: 'Retired' } })}>Retired</Dropdown.Item>
                              
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className="mb-3">
                            <label className="form-label">Contact Number:</label>
                            <input type="text" className="form-control" name="officialNumber" value={formData.officialNumber} onChange={handleChange} />
                        </div>


                        <div className="mb-3">
                            <label className="form-label">Email:</label>
                            <input type="email" className="form-control" name="email" value={formData.email} onChange={handleChange} />
                        </div>



                      
                      
                       
                      
                      
                    </div>
                    <div className="col-md-6">
                      
                       
                        <div className="">
                   <div className="row">
                    
                    <div className="mb-3">
                        <label className="form-label">Gender:</label>
                        <Dropdown>
                            <Dropdown.Toggle  className='bg-light text-dark border-secondary'>
                                {formData.gender ? formData.gender : 'Select Gender'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleChange({ target: { name: 'gender', value: 'male' } })}>Male</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleChange({ target: { name: 'gender', value: 'female' } })}>Female</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleChange({ target: { name: 'gender', value: 'other' } })}>Other</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>

                    <div className="col-12 col-md-6">
                    <div className="mb-3">
                        <label className="form-label">Date of Birth:</label>
                        <input type="date" className="form-control" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleChange} />
                    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="mb-3">
    <label className="form-label">Blood Group:</label>
    <Dropdown>
        <Dropdown.Toggle className='bg-light text-dark border-secondary'>
            {formData.bloodGroup ? formData.bloodGroup : 'Select Blood Group'}
        </Dropdown.Toggle>
        <Dropdown.Menu>
            <Dropdown.Item onClick={() => handleChange({ target: { name: 'bloodGroup', value: 'A+' } })}>A+</Dropdown.Item>
            <Dropdown.Item onClick={() => handleChange({ target: { name: 'bloodGroup', value: 'A-' } })}>A-</Dropdown.Item>
            <Dropdown.Item onClick={() => handleChange({ target: { name: 'bloodGroup', value: 'B+' } })}>B+</Dropdown.Item>
            <Dropdown.Item onClick={() => handleChange({ target: { name: 'bloodGroup', value: 'B-' } })}>B-</Dropdown.Item>
            <Dropdown.Item onClick={() => handleChange({ target: { name: 'bloodGroup', value: 'AB+' } })}>AB+</Dropdown.Item>
            <Dropdown.Item onClick={() => handleChange({ target: { name: 'bloodGroup', value: 'AB-' } })}>AB-</Dropdown.Item>
            <Dropdown.Item onClick={() => handleChange({ target: { name: 'bloodGroup', value: 'O+' } })}>O+</Dropdown.Item>
            <Dropdown.Item onClick={() => handleChange({ target: { name: 'bloodGroup', value: 'O-' } })}>O-</Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>
</div>
                    </div>

                    <div className="mb-3">
                            <label className="form-label">Official Address:</label>
                           
                            <textarea className="form-control w-100" name="officialAddress" value={formData.officialAddress} onChange={handleChange}  cols="30" rows="5"></textarea>
                        </div>

                        <div className="mb-3">
                            <label className="form-label">Residential Address:</label>
                         
                            <textarea className="form-control w-100"name="residentialAddress" value={formData.residentialAddress} onChange={handleChange} cols="30" rows="5"></textarea>
                        </div>
                    <div className="col-md-6">
                    <div className="mb-3">
                       

                    <label className="form-label">Area of Interest (Sports):</label>
                        <Dropdown>
                            <Dropdown.Toggle  className='bg-light text-dark border-secondary'>
                                {formData.gender ? formData.gender : 'Select Interested Sports'}
                            </Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item onClick={() => handleChange({ target: { name: 'areaOfInterest', value: 'Badminton' } })}>Badminton</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleChange({ target: { name: 'areaOfInterest', value: 'Table Tennis' } })}>Table Tennis</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleChange({ target: { name: 'areaOfInterest', value: 'Billiards' } })}>Billiards</Dropdown.Item>
                                <Dropdown.Item onClick={() => handleChange({ target: { name: 'areaOfInterest', value: 'Hockey' } })}>Hockey</Dropdown.Item>
                              
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    </div>


                    <div className="col-md-6">
                    <div className="mb-3">
        <label className="form-label">Profile Photo:</label>
        <input type="file" className="form-control" name="profilePhoto" onChange={handleChange} />
    </div>
                    </div>
                    <div className="col-md-6">
                    <div className="mb-3">
                    <label className="form-label">Police ID:</label>
                    <input type="file" className="form-control" name="policeId" onChange={handleChange} />
                </div>
                    </div>

                    <div className="col-md-6">
    <div className="mb-3">
        <label className="form-label">Request Letter:</label>
        <input type="file" className="form-control" name="requestLetter" onChange={handleChange} />
    </div>
</div>

                   </div>
  
   
   
    
</div>


                    </div>
                </div>
                <div className="form-group mt-3">
                    <p className="fs-6">
                    <b>Membership policy:</b>
                    <ul>
                  <li>Lifetime Membership charges are Rs.10000 which is non-refundable.</li>
                <li>Membership is non-transferable.</li>
                <li>Only members and their guests have access to SPORTI facilities.</li>	
               <li>Membership is confirmed only after completion of the verification of application by SPORTI personnel, followed by the payment. Members are eligible to use the services and facilities of SPORTI only after this process.</li>
                <li>Membership is subject to the terms and conditions outlined in the policy, and SPORTI reserves the right to modify these terms at its discretion.</li>
               <li>Membership can be terminated at any point of time if SPORTI rules are violated.</li>
                    </ul>

              

             <div className="alert alert-warning">
                <h1 className="alert-heading">Note</h1>
             The verification of application may take around 48 to 72 hours. Once membership is verified you will receive an email with the payment link. (application number must be generated for this) 
             </div>

                    </p>
                </div>
                <div className="mb-3 form-check form-switch">
                <input type="checkbox" className='form-check-input' name="isMembershipAgreed" checked={formData.isMembershipAgreed} onChange={handleChange} />
                    <label className='form-check-label'>
                       
                        I agree to the membership terms and conditions
                    </label>
                </div>
                <button type="submit" className="btn btn-primary">Submit Application</button>
            </form>

            <SuccessPopup show={showmodal} close={handleClose} title={title} desc={desc}/>
        </div>
    );
};

export default AdditionalDetailsForm;
