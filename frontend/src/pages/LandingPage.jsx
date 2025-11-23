import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../store/authStore';

const LandingPage = () => {
  const navigate = useNavigate();
  const { markAsVisited, setDemoMode } = useAuthStore();

  const handleGetStarted = () => {
    markAsVisited();
    navigate('/dashboard');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 to-forest-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <motion.div
            className="text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <motion.div
              className="flex justify-center mb-6"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <span className="text-8xl">🌱</span>
            </motion.div>
            
            <h1 className="text-5xl md:text-7xl font-bold text-forest-700 mb-6">
              ReGen<span className="text-earth-600">Lens</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
              AI-powered land restoration intelligence for a sustainable future
            </p>
            
            <motion.p
              className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Analyze vegetation health, detect land degradation, and get AI-powered 
              recommendations for effective land restoration strategies.
            </motion.p>

            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <button
                onClick={handleGetStarted}
                className="bg-forest-500 hover:bg-forest-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                🚀 Get Started
              </button>
              
              <button
                onClick={handleGetStarted}
                className="bg-earth-500 hover:bg-earth-600 text-white px-8 py-4 rounded-lg text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
              >
                🗺️ Try Interactive Demo
              </button>
            </motion.div>
          </motion.div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10">
          <motion.div
            className="absolute top-20 left-10 w-32 h-32 bg-forest-200 rounded-full opacity-20"
            animate={{ y: [0, -20, 0] }}
            transition={{ duration: 4, repeat: Infinity }}
          />
          <motion.div
            className="absolute top-40 right-10 w-24 h-24 bg-earth-200 rounded-full opacity-20"
            animate={{ y: [0, 20, 0] }}
            transition={{ duration: 3, repeat: Infinity, delay: 1 }}
          />
          <motion.div
            className="absolute bottom-20 left-1/4 w-20 h-20 bg-forest-300 rounded-full opacity-30"
            animate={{ y: [0, -15, 0] }}
            transition={{ duration: 5, repeat: Infinity, delay: 2 }}
          />
        </div>
      </div>

      {/* Features Section */}
      <motion.section
        className="py-20 bg-white"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-800 mb-16">
            Powerful Features for Land Restoration
          </h2>
          
          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">NDVI Analysis</h3>
              <p className="text-gray-600">
                Real-time vegetation health monitoring using satellite data and advanced analytics.
              </p>
            </motion.div>
            
            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">🤖</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Insights</h3>
              <p className="text-gray-600">
                Get intelligent recommendations for restoration strategies based on your land data.
              </p>
            </motion.div>
            
            <motion.div
              className="text-center p-6"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
            >
              <div className="text-4xl mb-4">🗺️</div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Interactive Maps</h3>
              <p className="text-gray-600">
                Explore detailed maps with degradation hotspots and restoration opportunities.
              </p>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="py-20 bg-gradient-to-r from-forest-500 to-earth-500"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Ready to Transform Your Land?
          </h2>
          <p className="text-xl text-white/90 mb-8">
            Use ReGenLens to restore ecosystems and monitor land health.
          </p>
          <button
            onClick={handleGetStarted}
            className="bg-white text-forest-600 px-8 py-4 rounded-lg text-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg"
          >
            Get Started Today
          </button>
        </div>
      </motion.section>
    </div>
  );
};

export default LandingPage;