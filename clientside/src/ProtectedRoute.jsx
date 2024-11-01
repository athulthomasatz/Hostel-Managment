// src/components/ProtectedRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';  // Use your AuthContext to check for authentication

const ProtectedRoute = ({ children, isAdmin = false }) => {
  const { user } = useAuth();  // Get the current user from context
  console.log("user is admin below");
  console.log(user); // Check if user.isAdmin is correctly set

  if (!user || !user.token) {
    // If user is not authenticated, redirect to login page
    return <Navigate to="/login" replace />;
  }
  
  // If isAdmin is true, check if the user has admin rights
  if (isAdmin && !user.isAdmin) {
    // If the user is not an admin, redirect to a different page (e.g., home or error)
    return <Navigate to="/admin/dashboard" replace />; // Adjust the redirect destination as needed
  }

  // If user is authenticated, render the child components (protected content)
  return children;
};

export default ProtectedRoute; // Ensure this is the default export
