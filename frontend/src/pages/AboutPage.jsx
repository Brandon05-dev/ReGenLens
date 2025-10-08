import React from 'react';
import { motion } from 'framer-motion';
import Navbar from '../components/Navbar';

const AboutPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 to-forest-50">
      <Navbar />
      
      <div className="max-w-4xl mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="bg-white rounded-2xl shadow-xl p-8"
        >
          <div className="text-center mb-8">
            <span className="text-6xl mb-4 block">🌱</span>
            <h1 className="text-4xl font-bold text-forest-700 mb-4">About ReGenLens</h1>
            <p className="text-xl text-gray-600">
              AI-powered land restoration intelligence for a sustainable future
            </p>
          </div>

          <div className="prose prose-lg max-w-none">
            <div className="grid md:grid-cols-2 gap-8 mb-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h3>
                <p className="text-gray-600">
                  To accelerate global land restoration efforts through intelligent 
                  data analysis and AI-powered insights. We believe that technology 
                  can help us restore degraded ecosystems more effectively and efficiently.
                </p>
              </div>
              <div>
                <h3 className="text-2xl font-semibold text-gray-800 mb-4">Technology</h3>
                <p className="text-gray-600">
                  We combine satellite imagery, NDVI analysis, and machine learning 
                  to provide actionable restoration recommendations tailored to 
                  specific geographic and environmental conditions.
                </p>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Key Features</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">📊</div>
                  <h4 className="font-semibold text-gray-800 mb-2">NDVI Analysis</h4>
                  <p className="text-sm text-gray-600">
                    Real-time vegetation health monitoring using satellite data
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">🤖</div>
                  <h4 className="font-semibold text-gray-800 mb-2">AI Insights</h4>
                  <p className="text-sm text-gray-600">
                    Intelligent recommendations for restoration strategies
                  </p>
                </div>
                <div className="text-center p-4">
                  <div className="text-3xl mb-2">🗺️</div>
                  <h4 className="font-semibold text-gray-800 mb-2">Interactive Maps</h4>
                  <p className="text-sm text-gray-600">
                    Explore detailed maps with degradation hotspots
                  </p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-200 pt-8 text-center">
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Get Started Today</h3>
              <p className="text-gray-600 mb-6">
                Join thousands of land managers using ReGenLens to restore ecosystems worldwide.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={() => window.location.href = '/demo'}
                  className="bg-forest-500 hover:bg-forest-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Try Demo
                </button>
                <button
                  onClick={() => window.location.href = '/signup'}
                  className="bg-earth-500 hover:bg-earth-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
                >
                  Sign Up Free
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AboutPage;