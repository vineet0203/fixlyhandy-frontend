// components/routes/ProtectedRoute.js
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../features/auth/hooks/useAuth';
import Loader from '../common/Loader/Loader';
import { Box, Typography, Button } from '@mui/material';

const ProtectedRoute = ({ children, requiredRoles = [], requiredPermissions = [] }) => {
  const { 
    isAuthenticated, 
    loading, 
    hasRole, 
    hasPermission,
    user,
    error 
  } = useAuth();
  const location = useLocation();

  // Add error boundary
  if (error) {
    console.error('Auth error in ProtectedRoute:', error);
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography color="error" gutterBottom>
          Authentication Error
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => window.location.href = '/auth/login'}
        >
          Go to Login
        </Button>
      </Box>
    );
  }

  if (loading) {
    return <Loader message="Checking authentication..." />;
  }

  if (!isAuthenticated) {
    console.log('User not authenticated, redirecting to login');
    return <Navigate to="/auth/login" state={{ from: location }} replace />;
  }

  // Redirect to verify if user is not verified and not on the verify page
  if (user && !user.is_verified && location.pathname !== '/verify') {
    console.log('User is not verified, redirecting to /verify');
    return <Navigate to="/verify" replace />;
  }

  // Redirect to dashboard if user is verified and on the verify page
  if (user && user.is_verified && location.pathname === '/verify') {
    console.log('User is verified, redirecting to /dashboard');
    return <Navigate to="/dashboard" replace />;
  }

  // Check roles if required
  if (requiredRoles.length > 0) {
    const hasRequiredRole = requiredRoles.some(role => {
      try {
        return hasRole(role);
      } catch (err) {
        console.error('Error checking role:', err);
        return false;
      }
    });

    if (!hasRequiredRole) {
      console.log('User missing required roles');
      return <Navigate to="/unauthorized" replace />;
    }
  }

  // Check permissions if required
  if (requiredPermissions.length > 0) {
    const hasRequiredPermission = requiredPermissions.some(permission => {
      try {
        return hasPermission(permission);
      } catch (err) {
        console.error('Error checking permission:', err);
        return false;
      }
    });

    if (!hasRequiredPermission) {
      console.log('User missing required permissions');
      return <Navigate to="/unauthorized" replace />;
    }
  }

  return children;
};

export default ProtectedRoute;