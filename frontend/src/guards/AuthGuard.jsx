import React from 'react';
import { Navigate } from 'react-router';
import { useAuth } from '../contexts/Auth.context';

export const AuthGuard = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!user) {
    return <Navigate to='/login' replace />;
  }

  return <>{children}</>;
};
