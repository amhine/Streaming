import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProtectedRoute = () => {
    const { currentUser } = useAuth();

    if (!currentUser) {
        // Redirect to login if not authenticated
        return <Navigate to="/login" replace />;
    }

    // Render the protected content (children or Outlet)
    return <Outlet />;
};
