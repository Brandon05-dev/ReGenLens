import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MapView from './components/MapView';
import InsightsPanel from './components/InsightsPanel';

function App() {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleRegionSelect = async (regionData) => {
    setLoading(true);
    setError(null);
    setSelectedRegion(regionData);

    try {
      // Call backend API to analyze the selected region
      const response = await fetch('http://localhost:5000/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          region: regionData.name,
          coordinates: regionData.coordinates
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setAnalysisData(data);
    } catch (err) {
      console.error('Error analyzing region:', err);
      setError('Failed to analyze region. Please try again.');
      
      // Fallback to mock data if backend is not available
      setAnalysisData({
        region: regionData.name,
        ndviTrend: [0.72, 0.68, 0.61, 0.54],
        degradationScore: 0.25,
        aiSummary: `Vegetation in ${regionData.name} has declined by 25% since 2022 due to soil erosion and climate stress. Recommended actions: 1) Implement contour farming to reduce erosion, 2) Plant drought-tolerant native species, 3) Establish water conservation systems like check dams.`,
        coordinates: regionData.coordinates,
        createdAt: new Date().toISOString()
      });
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
                Land Restoration Intelligence
              </span>
            </motion.div>
            
            <div className="flex items-center space-x-4">
              <button className="btn-secondary text-sm">
                Login
              </button>
              <button className="btn-primary text-sm">
                Sign Up
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-4rem)]">
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
          />
          
          {/* Loading Overlay */}
          {loading && (
            <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-[1000]">
              <div className="bg-white rounded-lg p-6 shadow-xl flex items-center space-x-3">
                <div className="spinner"></div>
                <span className="text-forest-700 font-medium">
                  Analyzing region...
                </span>
              </div>
            </div>
          )}
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
          />
        </motion.div>
      </div>

      {/* Status Bar */}
      <div className="bg-forest-700 text-white px-4 py-2 text-xs flex justify-between items-center">
        <span>
          {selectedRegion ? `Selected: ${selectedRegion.name}` : 'Click on a region to analyze'}
        </span>
        <span className="opacity-75">
          ReGenLens v1.0 | Powered by AI
        </span>
      </div>
    </div>
  );
}

export default App;