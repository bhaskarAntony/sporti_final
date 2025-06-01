import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import GuestAuthContext from './GuestAuthContext';

const GuestRoute = ({ children }) => {
  const {isGuestAuthenticated} = useContext(GuestAuthContext);
  

  
  if (!isGuestAuthenticated) {
    return <Navigate to="/guest/login" replace />;
  }
  
  return children;
};

export default GuestRoute;