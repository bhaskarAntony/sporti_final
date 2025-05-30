import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import AuthContext from './AuthContext.jsx';
import Spinner from 'react-bootstrap/Spinner';

const AdminRoute = ({ children }) => {
  const { user, isAuthenticated, loading } = useContext(AuthContext);
  
  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ minHeight: '80vh' }}>
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }
  
  if (!isAuthenticated || user.role !== 'admin') {
    return <Navigate to="/login" replace />;
  }
  
  return children;
};

export default AdminRoute;