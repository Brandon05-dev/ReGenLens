import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MapView from '../components/MapView';
import InsightsPanel from '../components/InsightsPanel';
import useAuthStore from '../store/authStore';

const DemoPage = () => {
  const { isDemo } = useAuthStore();
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegionSelect = async (regionData) => {
    setLoading(true);
    setError(null);
    setSelectedRegion(regionData);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    try {
      // Always use mock data in demo mode
      const mockData = {
        region: regionData.name,
        ndviTrend: [0.72, 0.68, 0.61, 0.54],
        degradationScore: 0.25,
        aiSummary: `[DEMO] Vegetation in ${regionData.name} has declined by 25% since 2022 due to soil erosion and climate stress. Recommended actions: 1) Implement contour farming to reduce erosion, 2) Plant drought-tolerant native species, 3) Establish water conservation systems like check dams.`,
        coordinates: regionData.coordinates,
        createdAt: new Date().toISOString(),
        isDemo: true
      };
      
      setAnalysisData(mockData);
    } catch (err) {
      setError('Demo analysis failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const clearSelection = () => {
    setSelectedRegion(null);
    setAnalysisData(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 to-forest-50">
      {/* Demo Banner */}
      <motion.div
        className="bg-gradient-to-r from-earth-500 to-forest-500 text-white px-4 py-3 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex items-center justify-center space-x-2">
          <span className="text-lg">🧪</span>
          <span className="font-medium">
            You're viewing ReGenLens in Demo Mode - Sign up for full access to save analyses and unlock premium features
          </span>
        </div>
      </motion.div>

      {/* Navigation Header */}
      <nav className="bg-white shadow-lg border-b-2 border-forest-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <motion.div 
              className="flex items-center space-x-2"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="text-2xl">🌱</span>
              <h1 className="text-2xl font-bold text-forest-700">ReGenLens</h1>
              <span className="text-sm text-earth-600 hidden sm:block">
                Demo Mode
              </span>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => window.location.href = '/login'}
                className="btn-secondary text-sm"
              >
                Login
              </button>
              <button 
                onClick={() => window.location.href = '/signup'}
                className="btn-primary text-sm"
              >
                Sign Up for Full Access
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-8rem)]">
        {/* Map Section */}
        <motion.div 
          className="flex-1 relative"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <MapView 
            onRegionSelect={handleRegionSelect}
            selectedRegion={selectedRegion}
            loading={loading}
            isDemo={true}
          />
          
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-[1000]">
              <div className="bg-white rounded-lg p-6 shadow-xl flex items-center space-x-3">
                <div className="spinner"></div>
                <span className="text-forest-700 font-medium">
                  Generating demo analysis...
                </span>
              </div>
            </div>
          )}

          {/* Demo Watermark */}
          <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 shadow-lg z-[500]">
            <span className="text-sm text-gray-600 font-medium">
              🧪 Demo Mode - Sample Data Only
            </span>
          </div>
        </motion.div>

        {/* Insights Panel */}
        <motion.div 
          className="w-full lg:w-96 bg-white shadow-xl border-l border-gray-200 overflow-hidden"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <InsightsPanel 
            analysisData={analysisData}
            selectedRegion={selectedRegion}
            loading={loading}
            error={error}
            onClearSelection={clearSelection}
            isDemo={true}
          />
        </motion.div>
      </div>

      {/* Status Bar */}
      <div className="bg-forest-700 text-white px-4 py-2 text-xs flex justify-between items-center">
        <span>
          {selectedRegion ? `Demo: ${selectedRegion.name}` : 'Click on a region to see demo analysis'}
        </span>
        <span className="opacity-75">
          ReGenLens Demo | Ready to upgrade? Sign up for full access
        </span>
      </div>

      {/* Upgrade CTA Floating Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 1 }}
      >
        <button
          onClick={() => window.location.href = '/signup'}
          className="bg-gradient-to-r from-earth-500 to-forest-500 hover:from-earth-600 hover:to-forest-600 text-white px-6 py-3 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
        >
          <span>🚀</span>
          <span className="font-semibold">Upgrade Now</span>
        </button>
      </motion.div>
    </div>
  );
};

export default DemoPage;