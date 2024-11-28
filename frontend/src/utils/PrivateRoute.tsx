import React from 'react';
import { Navigate } from 'react-router-dom';

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const token = localStorage.getItem('token'); // Check if the user is logged in

  if (!token) {
    return <Navigate to="/login" />; // Redirect to login if not authenticated
  }

  return <>{children}</>;
};

export default PrivateRoute;
