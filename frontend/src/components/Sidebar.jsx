import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useAuthStore from '../store/authStore';

const Sidebar = ({ isOpen, onToggle, analysisData, onAnalysisSelect }) => {
  const { user, signOut } = useAuthStore();
  const [savedAnalyses, setSavedAnalyses] = useState([]);
  const [activeTab, setActiveTab] = useState('analyses');

  // Mock saved analyses for now
  useEffect(() => {
    setSavedAnalyses([
      {
        id: 1,
        region: 'Central Valley',
        degradationScore: 0.35,
        createdAt: '2024-01-15T10:30:00Z',
        coordinates: { lat: 36.7783, lng: -119.4179 }
      },
      {
        id: 2,
        region: 'Northern Plains',
        degradationScore: 0.22,
        createdAt: '2024-01-12T14:15:00Z',
        coordinates: { lat: 47.0527, lng: -101.0659 }
      },
      {
        id: 3,
        region: 'Southeast Coastal',
        degradationScore: 0.18,
        createdAt: '2024-01-10T09:45:00Z',
        coordinates: { lat: 31.3069, lng: -84.1557 }
      }
    ]);
  }, []);

  const handleSaveAnalysis = () => {
    if (analysisData) {
      const newAnalysis = {
        id: Date.now(),
        region: analysisData.region,
        degradationScore: analysisData.degradationScore,
        createdAt: new Date().toISOString(),
        coordinates: analysisData.coordinates,
        ...analysisData
      };
      setSavedAnalyses(prev => [newAnalysis, ...prev]);
    }
  };

  const handleSignOut = async () => {
    await signOut();
    window.location.href = '/';
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getDegradationColor = (score) => {
    if (score < 0.2) return 'text-green-600 bg-green-100';
    if (score < 0.4) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getDegradationLabel = (score) => {
    if (score < 0.2) return 'Low';
    if (score < 0.4) return 'Medium';
    return 'High';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="w-80 bg-white shadow-xl border-r border-gray-200 flex flex-col h-full"
          initial={{ x: -320, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -320, opacity: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {/* Header */}
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="text-2xl">🌱</span>
                <h2 className="text-xl font-bold text-forest-700">ReGenLens</h2>
              </div>
              <button
                onClick={onToggle}
                className="p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
              >
                <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
            </div>

            {/* User Info */}
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-10 h-10 bg-forest-500 rounded-full flex items-center justify-center text-white font-semibold">
                {user?.email?.[0]?.toUpperCase() || 'U'}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  {user?.email?.split('@')[0] || 'User'}
                </p>
                <p className="text-xs text-gray-500 truncate">
                  {user?.email || 'user@example.com'}
                </p>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <div className="flex border-b border-gray-200">
            <button
              onClick={() => setActiveTab('analyses')}
              className={`flex-1 py-3 px-4 text-sm font-medium ${
                activeTab === 'analyses'
                  ? 'text-forest-600 border-b-2 border-forest-600 bg-forest-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              📊 Analyses
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`flex-1 py-3 px-4 text-sm font-medium ${
                activeTab === 'profile'
                  ? 'text-forest-600 border-b-2 border-forest-600 bg-forest-50'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              👤 Profile
            </button>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto">
            {activeTab === 'analyses' && (
              <div className="p-4">
                {/* Current Analysis */}
                {analysisData && (
                  <div className="mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h3 className="text-sm font-semibold text-gray-900">Current Analysis</h3>
                      <button
                        onClick={handleSaveAnalysis}
                        className="px-3 py-1 bg-forest-500 text-white text-xs rounded-md hover:bg-forest-600 transition-colors"
                      >
                        Save
                      </button>
                    </div>
                    <div className="bg-forest-50 border border-forest-200 rounded-lg p-3">
                      <h4 className="font-medium text-forest-800">{analysisData.region}</h4>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-xs text-forest-600">Degradation Score</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDegradationColor(analysisData.degradationScore)}`}>
                          {getDegradationLabel(analysisData.degradationScore)}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Saved Analyses */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">
                    Saved Analyses ({savedAnalyses.length})
                  </h3>
                  <div className="space-y-2">
                    {savedAnalyses.map((analysis) => (
                      <motion.div
                        key={analysis.id}
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors"
                        onClick={() => onAnalysisSelect(analysis)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between">
                          <h4 className="font-medium text-gray-800 text-sm">{analysis.region}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getDegradationColor(analysis.degradationScore)}`}>
                            {getDegradationLabel(analysis.degradationScore)}
                          </span>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          {formatDate(analysis.createdAt)}
                        </p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="p-4">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Account Settings</h3>
                    <div className="space-y-2">
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                        Edit Profile
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                        Notification Settings
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md">
                        Data Export
                      </button>
                    </div>
                  </div>

                  <div className="border-t border-gray-200 pt-4">
                    <h3 className="text-sm font-semibold text-gray-900 mb-3">Usage Statistics</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Analyses Run:</span>
                        <span className="font-medium">{savedAnalyses.length + (analysisData ? 1 : 0)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Account Type:</span>
                        <span className="font-medium text-forest-600">Premium</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Member Since:</span>
                        <span className="font-medium">Jan 2024</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Footer */}
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center space-x-2 px-4 py-2 text-sm text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
            >
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
              <span>Sign Out</span>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Sidebar;