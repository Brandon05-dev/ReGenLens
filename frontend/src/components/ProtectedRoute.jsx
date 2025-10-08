import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import useAuthStore from '../store/authStore';
import { motion } from 'framer-motion';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { user, loading } = useAuthStore();
  const location = useLocation();

  // Show loading spinner while checking auth
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-earth-50 to-forest-50 flex items-center justify-center">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4">
            <span className="text-4xl">🌱</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <div className="spinner"></div>
            <span className="text-forest-700 font-medium">
              Loading ReGenLens...
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  // If route requires authentication but user is not logged in
  if (requireAuth && !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If route doesn't require authentication but user is logged in (e.g., login/signup pages)
  if (!requireAuth && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;