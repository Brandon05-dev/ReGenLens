import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { motion } from 'framer-motion';

const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { isLoaded, isSignedIn } = useUser();
  const location = useLocation();

  if (!isLoaded) {
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

  if (requireAuth && !isSignedIn) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (!requireAuth && isSignedIn) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

export default ProtectedRoute;