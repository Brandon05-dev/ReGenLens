import React from 'react';
import { motion } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import {
  SignedIn,
  SignedOut,
  SignInButton,
  SignUpButton,
  UserButton,
} from '@clerk/clerk-react';
import useAuthStore from '../store/authStore';

const Navbar = ({ variant = 'default' }) => {
  const navigate = useNavigate();
  const { isDemo } = useAuthStore();

  const renderNavigation = () => {
    return (
      <div className="flex items-center space-x-4">
        <Link
          to="/"
          className="text-gray-700 hover:text-forest-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Home
        </Link>
        <Link
          to="/dashboard"
          className="text-gray-700 hover:text-forest-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
        >
          Dashboard
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
        
        <SignedOut>
          <SignInButton>
            <button className="text-gray-700 hover:text-forest-600 px-3 py-2 rounded-md text-sm font-medium transition-colors">
              Sign In
            </button>
          </SignInButton>
          <SignUpButton>
            <button className="bg-forest-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-forest-700 transition-colors">
              Sign Up
            </button>
          </SignUpButton>
        </SignedOut>
        <SignedIn>
          <UserButton />
        </SignedIn>
      </div>
    );
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