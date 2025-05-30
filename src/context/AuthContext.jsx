import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AllAuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token4') || null);
  const [loading, setLoading] = useState(true);

  // Set up axios defaults
  useEffect(() => {
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      delete axios.defaults.headers.common['Authorization'];
    }
  });

  // Check if user is logged in
  useEffect(() => {
    const fetchUserData = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get('https://nn-z4al.onrender.com/api/auth/profile');
        if (response.data.success) {
          setUser(response.data.user);
        } else {
          console.warn('Profile fetch failed:', response.data.message);
          setUser(null);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error.response?.data || error.message);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [token]);

  // Initiate OTP login
  const initiateLogin = async (phoneNumber) => {
    try {
      const response = await axios.post('https://nn-z4al.onrender.com/api/auth/login', { phoneNumber });

      if (response.data.success) {
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

  // Verify OTP and complete login
  const verifyOTP = async (phoneNumber, otp) => {
    try {
      const response = await axios.post('https://nn-z4al.onrender.com/api/auth/verify-otp', { phoneNumber, otp });

      if (response.data.success) {
        const newToken = response.data.token;
        setToken(newToken);
        localStorage.setItem('token4', newToken);
        setUser(response.data.user);
        axios.defaults.headers.common['Authorization'] = `Bearer ${newToken}`;
        return { success: true, user: response.data.user };
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

  // Guest login with reference code
  const guestLogin = async (referenceCode) => {
    try {
      const response = await axios.post('https://nn-z4al.onrender.com/api/auth/verify-reference', { referenceCode });

      if (response.data.success) {
        return { success: true, member: response.data.member };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Invalid reference code. Please try again.',
      };
    }
  };

  // // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('token4');
    delete axios.defaults.headers.common['Authorization'];
  };

  // Update user profile
  const updateProfile = async (userData) => {
    try {
      const response = await axios.put('https://nn-z4al.onrender.com/api/auth/profile', userData);

      if (response.data.success) {
        setUser(response.data.user);
        return { success: true, user: response.data.user };
      } else {
        return { success: false, message: response.data.message };
      }
    } catch (error) {
      return {
        success: false,
        message: error.response?.data?.message || 'Failed to update profile. Please try again.',
      };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        initiateLogin,
        verifyOTP,
        logout,
        updateProfile,
        guestLogin,
        isAuthenticated: !!user,
        token
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;