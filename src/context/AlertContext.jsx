import React, { createContext, useState } from 'react';
import { toast } from 'react-toastify';

const AlertContext = createContext();

export const AlertProvider = ({ children }) => {
  // Set success alert
  const setSuccess = (message) => {
    toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };
  
  // Set error alert
  const setError = (message) => {
    toast.error(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };
  
  // Set info alert
  const setInfo = (message) => {
    toast.info(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };
  
  // Set warning alert
  const setWarning = (message) => {
    toast.warning(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true
    });
  };
  
  return (
    <AlertContext.Provider value={{ 
      setSuccess, 
      setError, 
      setInfo, 
      setWarning 
    }}>
      {children}
    </AlertContext.Provider>
  );
};

export default AlertContext;