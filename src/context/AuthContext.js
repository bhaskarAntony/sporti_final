import React, { createContext, useState, useEffect, useContext } from 'react';
import Cookies from 'js-cookie';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // const token = Cookies.get('token');
    const token = localStorage.getItem('token');
    console.log(token);
    
    console.log('token', token);
    if (token) {
      validateToken(token).then(isValid => {
        setLoading(false);
        if (isValid) {
          setIsAuthenticated(true);
        } else {
          logout();
        }
      });
    } else {
      setLoading(false);
    }
  }, [location]);

  const validateToken = async (token) => {
    try {
      const response = await axios.post(
        `https://sporti-backend-live-3.onrender.com/api/auth/validate`, 
        {}, 
        {
          headers: { Authorization: `Bearer ${token}` },  // Send token in Authorization header
          withCredentials: true
        }
      );
      console.log(response);
      setUser(response.data.data);
      setIsAuthenticated(true);
      return true
      // if (response.status === 200) {
      //   setUser(response.data.data);
      //   setIsAuthenticated(true);
      //   return true;
      // }
      // return false;
    } catch (error) {
      console.error('Token validation error:', error);
      return false;
    }
  };
  

  const login = async (email, password) => {
    console.log(process.env.REACT_APP_BACKEND_URL);//
    try {
      const response = await axios.post(`https://sporti-backend-live-3.onrender.com/api/auth/login`, { email, password }, { withCredentials: true });
      if (response.status === 200) {
        setIsAuthenticated(true);
        console.log(response.data.token);
        
        // Cookies.set('token', response.data.token)
        localStorage.removeItem('token');
        localStorage.setItem('token',response.data.token);
        setUser(response.data.user);
        console.log(response.data);
        navigate('/');
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  const logout = () => {
    // Cookies.remove('token');
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setUser(null);
    navigate('/login');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, loading, login, logout, validateToken, setIsAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);