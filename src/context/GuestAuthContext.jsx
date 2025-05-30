import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const GuestAuthContext = createContext();

export const GuestAuthProvider = ({ children }) => {
  const [guest, setGuest] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('guestToken') || null);
  const [isGuestAuthenticated, setIsGuestAuthenticated] = useState(
    localStorage.getItem('isGuestAuthenticated') === 'true'
  );
  const [loading, setLoading] = useState(true);

  // Set up axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  }, [token]);

  // Check if guest is authenticated
  useEffect(() => {
    const fetchGuestData = async () => {
      if (!token) {
        setIsGuestAuthenticated(false);
        localStorage.setItem('isGuestAuthenticated', 'false');
        setLoading(false);
        return;
      }

      try {
        // Attempt to verify token by accessing a protected guest route
        const response = await axios.post('https://nn-z4al.onrender.com/api/auth/guest/bookings', {});
        if (response.data.success) {
          setGuest(response.data.guest);
          setIsGuestAuthenticated(true);
          localStorage.setItem('isGuestAuthenticated', 'true');
        } else {
          console.warn('Guest fetch failed:', response.data.message);
          setGuest(null);
          setIsGuestAuthenticated(false);
          localStorage.setItem('isGuestAuthenticated', 'false');
        }
      } catch (error) {
        console.error('Failed to fetch guest data:', error.response?.data || error.message);
        setGuest(null);
        setIsGuestAuthenticated(false);
        localStorage.setItem('isGuestAuthenticated', 'false');
      } finally {
        setLoading(false);
      }
    };

    fetchGuestData();
  }, [token]);

  // Initiate guest OTP login
  const initiateGuestLogin = async (phoneNumber) => {
    try {
      const response = await axios.post('https://nn-z4al.onrender.com/api/auth/guest/login', { phoneNumber });

      if (response.data.success) {
        localStorage.setItem('guestPhoneNumber', phoneNumber);
        return { success: true, message: response.data.message };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to send OTP. Please try again.',
      };
    }
  };

  // Verify guest OTP and complete login
  const verifyGuestOTP = async (phoneNumber, otp) => {
    try {
      const response = await axios.post('https://nn-z4al.onrender.com/api/auth/guest/verify-otp', { phoneNumber, otp });

      if (response.data.success) {
        const newToken = response.data.token;
        setToken(newToken);
        localStorage.setItem('guestToken', newToken);
        localStorage.setItem('isGuestAuthenticated', 'true');
        setIsGuestAuthenticated(true);
        setGuest(response.data.guest);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return { success: true, guest: response.data.guest };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to verify OTP. Please try again.',
      };
    }
  };

  // Guest logout
  const logoutGuest = () => {
    setGuest(null);
    setToken(null);
    setIsGuestAuthenticated(false);
    localStorage.removeItem('guestToken');
    localStorage.removeItem('isGuestAuthenticated');
    localStorage.removeItem('guestPhoneNumber');
    delete axios.defaults.headers.common['Authorization'];
  };

  return (
    <GuestAuthContext.Provider
      value={{
        guest,
        loading,
        initiateGuestLogin,
        verifyGuestOTP,
        logoutGuest,
        isGuestAuthenticated,
        token,
      }}
    >
      {children}
    </GuestAuthContext.Provider>
  );
};

export default GuestAuthContext;