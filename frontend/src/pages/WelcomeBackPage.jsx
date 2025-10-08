import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const WelcomeBackPage = () => {
  const navigate = useNavigate();
  const { setDemoMode } = useAuthStore();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleContinueAsGuest = () => {
    setDemoMode(true);
    navigate('/demo');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 to-forest-50 flex items-center justify-center">
      <motion.div
        className="max-w-md w-full mx-4"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
          <motion.div
            className="mb-6"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <span className="text-6xl">🌱</span>
          </motion.div>
          
          <h1 className="text-3xl font-bold text-forest-700 mb-2">
            Welcome Back!
          </h1>
          
          <p className="text-gray-600 mb-8">
            We're glad to see you return to ReGenLens. 
            How would you like to continue?
          </p>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <button
              onClick={handleLogin}
              className="w-full bg-forest-500 hover:bg-forest-600 text-white py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
            >
              🔐 Log In to Continue
            </button>
            
            <button
              onClick={handleContinueAsGuest}
              className="w-full bg-earth-200 hover:bg-earth-300 text-earth-800 py-3 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105"
            >
              👤 Continue as Guest
            </button>
          </motion.div>

          <motion.div
            className="mt-6 pt-6 border-t border-gray-200"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <p className="text-sm text-gray-500">
              New to ReGenLens?{' '}
              <button
                onClick={() => navigate('/signup')}
                className="text-forest-600 hover:text-forest-700 font-medium"
              >
                Create an account
              </button>
            </p>
          </motion.div>
        </div>

        {/* Background decoration */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <motion.div
            className="absolute top-1/4 left-10 w-20 h-20 bg-forest-200 rounded-full opacity-20"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          />
          <motion.div
            className="absolute bottom-1/4 right-10 w-16 h-16 bg-earth-200 rounded-full opacity-20"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 4, repeat: Infinity, delay: 1 }}
          />
        </div>
      </motion.div>
    </div>
  );
};

export default WelcomeBackPage;