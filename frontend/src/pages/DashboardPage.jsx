import React, { useState } from 'react';
import { motion } from 'framer-motion';
import MapView from '../components/MapView';
import InsightsPanel from '../components/InsightsPanel';
import Sidebar from '../components/Sidebar';

const DashboardPage = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleRegionSelect = async (regionData) => {
    setLoading(true);
    setError(null);
    setSelectedRegion(regionData);

    try {
      // Call backend API to analyze the selected region
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/analyze`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
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
        id: Date.now(),
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
    <div className="h-screen bg-gray-50 flex overflow-hidden">
      {/* Sidebar */}
      <Sidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        analysisData={analysisData}
        onAnalysisSelect={(analysis) => {
          setAnalysisData(analysis);
          setSelectedRegion({
            name: analysis.region,
            coordinates: analysis.coordinates
          });
        }}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-forest-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
              <h1 className="text-2xl font-semibold text-gray-900">Dashboard</h1>
            </div>
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-500">
                Welcome to ReGenLens
              </span>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Map Section */}
          <motion.div 
            className="flex-1 relative"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
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
            className="w-96 bg-white shadow-xl border-l border-gray-200 overflow-hidden"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <InsightsPanel 
              analysisData={analysisData}
              selectedRegion={selectedRegion}
              loading={loading}
              error={error}
              onClearSelection={clearSelection}
              isDashboard={true}
            />
          </motion.div>
        </div>

        {/* Status Bar */}
        <div className="bg-forest-700 text-white px-6 py-2 text-sm flex justify-between items-center">
          <span>
            {selectedRegion ? `Selected: ${selectedRegion.name}` : 'Click on a region to analyze'}
          </span>
          <span className="opacity-75">
            ReGenLens Dashboard
          </span>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;