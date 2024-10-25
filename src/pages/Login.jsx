import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useDialog } from '../components/popups/DialogContext';
import Loading from '../components/popups/Loading';
import { useLanguage } from '../context/LangaugeContext';
import DOMPurify from 'dompurify';
import logo from '../assets/images/main_logo.jpg'

function sanitizeInput(input, field) {
  // First, sanitize HTML to prevent XSS
  let sanitized = DOMPurify.sanitize(input, { USE_PROFILES: { html: true } });
  sanitized = sanitized.replace(/[^a-zA-Z0-9@._-]/g, '');
  return sanitized;
}
const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const { openDialog } = useDialog();
  const { isKannada } = useLanguage();
  const location = useLocation();
  console.log(location);;
  

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Client-side validation for max length and sanitization
    if (email.length > 30 || password.length > 30) {
      const message = isKannada ? 'ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್ವರ್ಡ್ ಅತ್ಯಂತ ಉದ್ದವಾಗಿದೆ' : 'Email or password is too long';
      const details = isKannada ? 'ದಯವಿಟ್ಟು ಕಡಿಮೆ ಉದ್ದದ ಇಮೇಲ್ ಮತ್ತು ಪಾಸ್ವರ್ಡ್ ನಮೂದಿಸಿ.' : 'Please enter shorter email and password.';
      
      openDialog(
        DOMPurify.sanitize(message),
        DOMPurify.sanitize(details),
        true
      );
      return;
    }
  
  
  
    setLoading(true);
    try {
      await login(sanitizeInput(email), sanitizeInput(password));
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      const message = isKannada ? 'ಅಮಾನ್ಯ ಇಮೇಲ್ ಅಥವಾ ಪಾಸ್ವರ್ಡ್' : 'Invalid email or password';
      const details = isKannada ? 'ದಯವಿಟ್ಟು ವಿವರಗಳನ್ನು ಪರಿಶೀಲಿಸಿ ಮತ್ತು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ.' : 'Please check the details and try again.';

      

      openDialog(
        DOMPurify.sanitize(message),
        DOMPurify.sanitize(details),
        true
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="container-fluid p-3 p-md-5">
      <div className="container card shadow">
        <div className="row align-items-center">
          <div className="col-md-6 d-flex align-items-center justify-content-center">
            <img src={logo} alt="logo" className="w-75" />
          </div>
          <div className="col-md-6">
            <form onSubmit={handleSubmit}>
              <h2>{isKannada ? 'ಲಾಗಿನ್ ಮಾಡಿ' : 'Login'}</h2>
              <div className="form-group mt-3">
                <label htmlFor="email" className="form-label">{isKannada ? 'ಇಮೇಲ್ ವಿಳಾಸ' : 'Email Address'}</label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(sanitizeInput(e.target.value))}
                  placeholder={isKannada ? 'ಇಮೇಲ್' : 'Email'}
                  className="form-control"
                  required
                  maxLength="30"
                />
              </div>
              <div className="form-group mt-3">
                <label htmlFor="password" className="form-label">{isKannada ? 'ಪಾಸ್ವರ್ಡ್' : 'Password'}</label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(sanitizeInput(e.target.value))}
                  placeholder={isKannada ? 'ಪಾಸ್ವರ್ಡ್' : 'Password'}
                  className="form-control"
                  required
                  maxLength="30"
                />
              </div>
              <button type="submit" className="blue-btn mt-3 w-100 btn-lg">{isKannada ? 'ಲಾಗಿನ್' : 'Login'}</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;