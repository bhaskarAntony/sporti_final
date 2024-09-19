import React, { useState } from 'react';
import axios from 'axios';
import SuccessPopup from '../popups/SuccessPopup';
import { useDialog } from '../popups/DialogContext';
import Loading from '../popups/Loading';

function Feedback({sporti}) {
  const [formData, setFormData] = useState({
    username: '',
    sporti: sporti,
    message: '',
    subject:'',
    email:''
  });
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const { openDialog } = useDialog();

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can perform any client-side validation here before submitting
    setLoading(true);
    axios.post('https://sporti-backend-live-p00l.onrender.com/api/submit/feedback', formData)
      .then(response => {
        setLoading(false)
        openDialog('Success', 'Form submitted successfully', false);
      })
      .catch(error => {
        setLoading(false)
        openDialog('Error', `Form submission failed: ${error.message}`, true);
      });
  };
  if(loading){
    return <Loading/>
  }

  return (
    <div className="row mt-4">
      <div className="col-md-8 offset-md-2">
        <div className="contact-from p-3">
          <form onSubmit={handleSubmit}>
            <div className="row">
              <div className="col-12 col-md-6">
                <div className="from-group mt-3">
                  <input
                    type="text"
                    name="username"
                    placeholder="OFFICER'S NAME"
                    value={formData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12 col-md-6">
                <div className="from-group mt-3">
                  <input
                    type="email"
                    name="email"
                    placeholder="EMAIL ADDRESS"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>
              {/* <div className="col-12 col-md-6">
                <div className="from-group mt-3">
                 

                  <select
                   name="sporti"
                   value={formData.sporti}
                   onChange={handleChange}
                   className='form-select' id="">
                    <option value="sporti1">SPORTI1</option>
                    <option value="sporti2">SPORTI2</option>
                   </select>
                </div>
              </div> */}
              <div className="col-12 col-md-6">
                <div className="from-group mt-3">
                  <input
                    type="text"
                    name="subject"
                    placeholder="SUBJECT"
                    value={formData.subject}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="col-12">
                <div className="from-group mt-3">
                  <textarea
                    name="message"
                    cols="30"
                    rows="10"
                    placeholder="MESSAGE"
                    value={formData.message}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="form-group mt-4 text-center">
                <button type="submit" className="blue-btn">
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    
    </div>
  );
}

export default Feedback;
