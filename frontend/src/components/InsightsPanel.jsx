import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Download, MapPin, Calendar, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';
import NDVIChart from './NDVIChart';

const InsightsPanel = ({ analysisData, selectedRegion, loading, error, onClearSelection, isDemo = false, isDashboard = false }) => {
  
  const handleDownloadReport = () => {
    if (!analysisData) return;
    
    // Create downloadable report
    const reportData = {
      region: analysisData.region,
      analysisDate: new Date().toLocaleDateString(),
      coordinates: analysisData.coordinates,
      ndviTrend: analysisData.ndviTrend,
      degradationScore: analysisData.degradationScore,
      recommendations: analysisData.aiSummary,
      generatedBy: 'ReGenLens AI Platform'
    };
    
    const dataStr = JSON.stringify(reportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `regenlens-report-${analysisData.region.replace(/[^a-zA-Z0-9]/g, '-')}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  const getDegradationLevel = (score) => {
    if (score < 0.1) return { level: 'Low', color: 'text-green-600', bg: 'bg-green-100', icon: CheckCircle };
    if (score < 0.25) return { level: 'Moderate', color: 'text-yellow-600', bg: 'bg-yellow-100', icon: AlertTriangle };
    if (score < 0.5) return { level: 'High', color: 'text-orange-600', bg: 'bg-orange-100', icon: TrendingDown };
    return { level: 'Severe', color: 'text-red-600', bg: 'bg-red-100', icon: AlertTriangle };
  };

  if (!selectedRegion && !analysisData) {
    return (
      <div className="h-full flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-forest-700">Analysis Panel</h2>
          <p className="text-sm text-gray-600 mt-1">
            {isDemo ? 'Try our demo - Select a region to see sample analysis' : 'Select a region on the map to begin analysis'}
          </p>
          {isDemo && (
            <div className="mt-2 bg-earth-100 text-earth-800 px-3 py-2 rounded-lg text-xs">
              🧪 Demo Mode - Sample data only
            </div>
          )}
        </div>

        {/* Empty State */}
        <div className="flex-1 flex items-center justify-center p-6">
          <motion.div 
            className="text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-6xl mb-4">🌍</div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              Start Your Analysis
            </h3>
            <p className="text-sm text-gray-500 mb-4 max-w-xs">
              Click anywhere on the map or select a pre-marked region to analyze 
              land degradation patterns and receive AI-powered restoration recommendations.
            </p>
            <div className="text-xs text-gray-400">
              💡 Tip: Look for the colored markers indicating known degradation hotspots
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="p-4 border-b border-gray-200 bg-gradient-to-r from-forest-50 to-earth-50">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-forest-700">
            {isDemo ? 'Demo Analysis' : 'Regional Analysis'}
          </h2>
          {selectedRegion && (
            <button
              onClick={onClearSelection}
              className="text-xs text-gray-500 hover:text-gray-700 px-2 py-1 rounded hover:bg-gray-100"
            >
              Clear
            </button>
          )}
        </div>
        
        {selectedRegion && (
          <div className="mt-2 flex items-center space-x-2 text-sm text-gray-600">
            <MapPin size={14} />
            <span className="font-medium">{selectedRegion.name}</span>
            {isDemo && (
              <span className="bg-earth-200 text-earth-800 px-2 py-1 rounded-full text-xs font-medium">
                Demo
              </span>
            )}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto">
        <AnimatePresence mode="wait">
          {loading && (
            <motion.div 
              key="loading"
              className="p-6 flex items-center justify-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="text-center">
                <div className="spinner mx-auto mb-3"></div>
                <p className="text-sm text-gray-600">
                  Analyzing satellite data and generating AI recommendations...
                </p>
              </div>
            </motion.div>
          )}

          {error && (
            <motion.div 
              key="error"
              className="p-4 m-4 bg-red-50 border border-red-200 rounded-lg"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="flex items-center space-x-2 text-red-700">
                <AlertTriangle size={18} />
                <span className="font-medium">Analysis Error</span>
              </div>
              <p className="text-sm text-red-600 mt-1">{error}</p>
              <p className="text-xs text-red-500 mt-2">
                Showing mock data for demonstration purposes.
              </p>
            </motion.div>
          )}

          {analysisData && (
            <motion.div 
              key="analysis"
              className="space-y-4 p-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* Region Summary */}
              <div className="bg-white rounded-lg p-4 shadow-sm border">
                <h3 className="font-semibold text-forest-700 mb-3">
                  📍 Region Overview
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Region:</span>
                    <span className="font-medium">{analysisData.region}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Coordinates:</span>
                    <span className="font-mono text-xs">
                      {analysisData.coordinates?.lat?.toFixed(4)}, {analysisData.coordinates?.lng?.toFixed(4)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Analysis Date:</span>
                    <span>{new Date().toLocaleDateString()}</span>
                  </div>
                </div>
              </div>

              {/* Degradation Score */}
              {analysisData.degradationScore !== undefined && (
                <div className="bg-white rounded-lg p-4 shadow-sm border">
                  <h3 className="font-semibold text-forest-700 mb-3">
                    ⚠️ Degradation Assessment
                  </h3>
                  {(() => {
                    const degradation = getDegradationLevel(analysisData.degradationScore);
                    const IconComponent = degradation.icon;
                    return (
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <IconComponent size={18} className={degradation.color} />
                            <span className="font-medium">Severity Level</span>
                          </div>
                          <span className={`px-3 py-1 rounded-full text-sm font-medium ${degradation.bg} ${degradation.color}`}>
                            {degradation.level}
                          </span>
                        </div>
                        
                        <div className="bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full ${
                              analysisData.degradationScore < 0.1 ? 'bg-green-500' :
                              analysisData.degradationScore < 0.25 ? 'bg-yellow-500' :
                              analysisData.degradationScore < 0.5 ? 'bg-orange-500' : 'bg-red-500'
                            }`}
                            style={{ width: `${Math.min(analysisData.degradationScore * 100, 100)}%` }}
                          ></div>
                        </div>
                        
                        <p className="text-xs text-gray-600">
                          Degradation Score: {(analysisData.degradationScore * 100).toFixed(1)}%
                        </p>
                      </div>
                    );
                  })()}
                </div>
              )}

              {/* NDVI Chart */}
              {analysisData.ndviTrend && (
                <NDVIChart 
                  data={analysisData.ndviTrend} 
                  region={analysisData.region} 
                />
              )}

              {/* AI Recommendations */}
              {analysisData.aiSummary && (
                <motion.div 
                  className="bg-gradient-to-br from-blue-50 to-forest-50 rounded-lg p-4 border border-blue-200"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                >
                  <h3 className="font-semibold text-forest-700 mb-3 flex items-center space-x-2">
                    <span>🤖</span>
                    <span>AI Restoration Recommendations</span>
                  </h3>
                  <div className="text-sm text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {analysisData.aiSummary}
                  </div>
                  
                  <div className="mt-3 pt-3 border-t border-blue-200">
                    <p className="text-xs text-blue-600 italic">
                      Generated by Claude AI • Based on NDVI trends and regional patterns
                    </p>
                  </div>
                </motion.div>
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                <button
                  onClick={handleDownloadReport}
                  className="w-full btn-primary flex items-center justify-center space-x-2"
                >
                  <Download size={16} />
                  <span>Download Analysis Report</span>
                </button>
                
                <button className="w-full btn-secondary flex items-center justify-center space-x-2">
                  <Calendar size={16} />
                  <span>Schedule Follow-up Analysis</span>
                </button>
              </div>

              {/* Metadata */}
              <div className="text-xs text-gray-500 bg-gray-50 rounded-lg p-3">
                <div className="flex items-center justify-between">
                  <span>Report ID: {Date.now().toString(36)}</span>
                  <span>ReGenLens v1.0</span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default InsightsPanel;