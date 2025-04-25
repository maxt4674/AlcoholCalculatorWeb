import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './authContext';
import Forbidden from '../../pages/Forbidden';

const AdminRoute = ({ element }) => {
    const { isAuthenticated, user, loading } = useAuth();

    if (loading) {
      return <div>Loading...</div>; 
    }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if(user.userType !== 'ADMIN'){
    return <Forbidden/>;
  }

  return element;
};

export default AdminRoute;