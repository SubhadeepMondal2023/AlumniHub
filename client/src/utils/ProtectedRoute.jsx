import React from 'react';
import { Navigate } from 'react-router-dom';
import Loader from '../utils/Loader.jsx';
import { useGetMyProfileQuery } from '../redux/api/authSlice.js';

const ProtectedRoute = ({ element: Component }) => {
  const { isLoading, data: userData } = useGetMyProfileQuery();

  if (isLoading) {
    return <Loader />;
  }

  if (userData?.success) {
    return <Component />;
  }

  return <Navigate to="/login" replace />;
};

export default ProtectedRoute;
