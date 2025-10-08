import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const Navbar = ({ variant = 'default' }) => {
  const navigate = useNavigate();
  const { user, signOut, isDemo } = useAuthStore();

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Different navbar variants
  const renderNavigation = () => {
    if (user) {
      // Authenticated user navbar
      return (
        <div className="flex items-center space-x-4">
          <Link
            to="/dashboard"
            className="text-gray-700 hover:text-forest-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Dashboard
          </Link>
          <div className="relative group">
            <button className="flex items-center space-x-1 text-gray-700 hover:text-forest-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              <span>{user.email?.split('@')[0] || 'User'}</span>
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* Dropdown Menu */}
            <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
              <Link
                to="/profile"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Profile Settings
              </Link>
              <Link
                to="/dashboard"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                My Analyses
              </Link>
              <div className="border-t border-gray-100"></div>
              <button
                onClick={handleSignOut}
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      );
    } else {
      // Guest user navbar
      return (
        <div className="flex items-center space-x-4">
          <Link
            to="/"
            className="text-gray-700 hover:text-forest-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Home
          </Link>
          <Link
            to="/about"
            className="text-gray-700 hover:text-forest-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            About
          </Link>
          {isDemo && (
            <span className="bg-earth-100 text-earth-800 px-3 py-1 rounded-full text-xs font-medium">
              Demo Mode
            </span>
          )}
          <Link
            to="/login"
            className="text-gray-700 hover:text-forest-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
          >
            Login
          </Link>
          <Link
            to="/signup"
            className="bg-forest-500 hover:bg-forest-600 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors shadow-md hover:shadow-lg"
          >
            Sign Up
          </Link>
        </div>
      );
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b-2 border-forest-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 cursor-pointer"
            onClick={() => navigate('/')}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <span className="text-2xl">🌱</span>
            <h1 className="text-2xl font-bold text-forest-700">ReGenLens</h1>
            <span className="text-sm text-earth-600 hidden sm:block">
              {isDemo ? 'Demo Mode' : 'Land Restoration Intelligence'}
            </span>
          </motion.div>
          
          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            {renderNavigation()}
          </motion.div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;