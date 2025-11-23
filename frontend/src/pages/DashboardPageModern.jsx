import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Menu, X, TrendingUp, TrendingDown, AlertTriangle, 
  Leaf, Droplets, Wind, Sun, Activity, BarChart3,
  Download, Share2, Settings, Bell
} from 'lucide-react';
import MapView3D from '../components/MapView3D';
import { LineChart, Line, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const DashboardPageModern = () => {
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const handleRegionSelect = async (regionData) => {
    setLoading(true);
    setSelectedRegion(regionData);

    try {
      const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      const response = await fetch(`${apiUrl}/api/analyze`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          region: regionData.name,
          coordinates: regionData.coordinates
        })
      });

      const data = await response.json();
      setAnalysisData(data);
    } catch (err) {
      // Mock data fallback
      setAnalysisData({
        id: Date.now(),
        region: regionData.name,
        ndviTrend: [
          { month: 'Jan', value: 0.72, rainfall: 45 },
          { month: 'Feb', value: 0.68, rainfall: 38 },
          { month: 'Mar', value: 0.61, rainfall: 32 },
          { month: 'Apr', value: 0.54, rainfall: 28 },
          { month: 'May', value: 0.58, rainfall: 35 },
          { month: 'Jun', value: 0.62, rainfall: 42 }
        ],
        degradationScore: 0.35,
        soilHealth: 0.62,
        waterAvailability: 0.48,
        biodiversity: 0.55,
        carbonSequestration: 2.4,
        aiSummary: `Analysis of ${regionData.name} reveals moderate land degradation with declining vegetation health. The region shows a 25% decrease in NDVI over the past year, primarily due to reduced rainfall and soil erosion. Recommended interventions include contour farming, native species reforestation, and water conservation systems.`,
        recommendations: [
          { priority: 'high', action: 'Implement contour farming to reduce soil erosion', impact: 'High' },
          { priority: 'high', action: 'Plant drought-tolerant native species', impact: 'Medium' },
          { priority: 'medium', action: 'Establish water conservation systems', impact: 'High' },
          { priority: 'low', action: 'Monitor soil moisture levels regularly', impact: 'Medium' }
        ],
        coordinates: regionData.coordinates,
        createdAt: new Date().toISOString()
      });
    } finally {
      setLoading(false);
    }
  };

  // Radar chart data
  const radarData = analysisData ? [
    { metric: 'Vegetation', value: (1 - analysisData.degradationScore) * 100 },
    { metric: 'Soil Health', value: analysisData.soilHealth * 100 },
    { metric: 'Water', value: analysisData.waterAvailability * 100 },
    { metric: 'Biodiversity', value: analysisData.biodiversity * 100 },
    { metric: 'Carbon', value: (analysisData.carbonSequestration / 5) * 100 }
  ] : [];

  return (
    <div className="h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex overflow-hidden">
      {/* Mobile Backdrop */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            className="fixed inset-0 bg-black/50 z-20 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            className="fixed md:relative w-80 h-full bg-white shadow-2xl border-r border-gray-200 flex flex-col z-30 md:z-20"
            initial={{ x: -320 }}
            animate={{ x: 0 }}
            exit={{ x: -320 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Sidebar Header */}
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <span className="text-3xl">🌱</span>
                  <h2 className="text-xl font-bold text-forest-700">ReGenLens</h2>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5 text-gray-500" />
                </button>
              </div>
              <p className="text-sm text-gray-600">AI-Powered Land Restoration Intelligence</p>
            </div>

            {/* Quick Stats */}
            <div className="p-6 border-b border-gray-200">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Quick Stats</h3>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gradient-to-br from-forest-50 to-forest-100 rounded-xl p-3">
                  <Leaf className="w-5 h-5 text-forest-600 mb-1" />
                  <div className="text-2xl font-bold text-forest-700">5</div>
                  <div className="text-xs text-forest-600">Regions</div>
                </div>
                <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-3">
                  <Activity className="w-5 h-5 text-blue-600 mb-1" />
                  <div className="text-2xl font-bold text-blue-700">12</div>
                  <div className="text-xs text-blue-600">Analyses</div>
                </div>
              </div>
            </div>

            {/* Recent Analyses */}
            <div className="flex-1 overflow-y-auto p-6">
              <h3 className="text-sm font-semibold text-gray-700 mb-3">Recent Analyses</h3>
              <div className="space-y-2">
                {[1, 2, 3].map((i) => (
                  <div
                    key={i}
                    className="p-3 bg-gray-50 hover:bg-gray-100 rounded-lg cursor-pointer transition-colors"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="text-sm font-medium text-gray-900">Region {i}</div>
                        <div className="text-xs text-gray-500 mt-1">2 days ago</div>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sidebar Footer */}
            <div className="p-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <button className="flex-1 px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors text-sm font-medium">
                  New Analysis
                </button>
                <button className="p-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors">
                  <Settings className="w-5 h-5 text-gray-600" />
                </button>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white/80 backdrop-blur-md shadow-sm border-b border-gray-200 px-3 sm:px-6 py-3 sm:py-4 z-10">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
              {!sidebarOpen && (
                <button
                  onClick={() => setSidebarOpen(true)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0"
                >
                  <Menu className="w-5 h-5 sm:w-6 sm:h-6 text-gray-600" />
                </button>
              )}
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-2xl font-bold text-gray-900 truncate">Dashboard</h1>
                <p className="text-xs sm:text-sm text-gray-500 truncate">
                  {selectedRegion ? `Analyzing: ${selectedRegion.name}` : 'Select a region'}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 flex-shrink-0">
              <button className="p-2 hover:bg-gray-100 rounded-lg transition-colors relative">
                <Bell className="w-4 h-4 sm:w-5 sm:h-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </button>
              <button className="hidden sm:flex px-4 py-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors text-sm font-medium items-center space-x-2">
                <Download className="w-4 h-4" />
                <span>Export</span>
              </button>
              <button className="sm:hidden p-2 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors">
                <Download className="w-4 h-4" />
              </button>
            </div>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Map Section */}
          <div className="flex-1 relative">
            <MapView3D
              onRegionSelect={handleRegionSelect}
              selectedRegion={selectedRegion}
              loading={loading}
            />
          </div>

          {/* Insights Panel */}
          <AnimatePresence>
            {analysisData && (
              <motion.div
                className="fixed md:relative w-full md:w-[420px] lg:w-[480px] h-full bg-white shadow-2xl border-l border-gray-200 overflow-hidden flex flex-col z-20"
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25 }}
              >
                {/* Panel Header */}
                <div className="p-6 border-b border-gray-200 bg-gradient-to-r from-forest-600 to-forest-700 text-white">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h2 className="text-xl font-bold mb-1">{analysisData.region}</h2>
                      <p className="text-sm text-forest-100">Analysis Results</p>
                    </div>
                    <button
                      onClick={() => setAnalysisData(null)}
                      className="p-2 hover:bg-white/20 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {/* Key Metrics */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Key Metrics</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        </div>
                        <div className="text-2xl font-bold text-red-700">
                          {(analysisData.degradationScore * 100).toFixed(0)}%
                        </div>
                        <div className="text-xs text-red-600 font-medium">Degradation</div>
                      </div>

                      <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Leaf className="w-5 h-5 text-green-600" />
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        </div>
                        <div className="text-2xl font-bold text-green-700">
                          {(analysisData.soilHealth * 100).toFixed(0)}%
                        </div>
                        <div className="text-xs text-green-600 font-medium">Soil Health</div>
                      </div>

                      <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Droplets className="w-5 h-5 text-blue-600" />
                        </div>
                        <div className="text-2xl font-bold text-blue-700">
                          {(analysisData.waterAvailability * 100).toFixed(0)}%
                        </div>
                        <div className="text-xs text-blue-600 font-medium">Water Avail.</div>
                      </div>

                      <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                        <div className="flex items-center justify-between mb-2">
                          <Wind className="w-5 h-5 text-purple-600" />
                        </div>
                        <div className="text-2xl font-bold text-purple-700">
                          {analysisData.carbonSequestration}t
                        </div>
                        <div className="text-xs text-purple-600 font-medium">Carbon/ha</div>
                      </div>
                    </div>
                  </div>

                  {/* NDVI Trend Chart */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Vegetation Trend (NDVI)</h3>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <ResponsiveContainer width="100%" height={180}>
                        <AreaChart data={analysisData.ndviTrend}>
                          <defs>
                            <linearGradient id="colorNDVI" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#059669" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#059669" stopOpacity={0} />
                            </linearGradient>
                          </defs>
                          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                          <XAxis dataKey="month" tick={{ fontSize: 12 }} stroke="#6b7280" />
                          <YAxis tick={{ fontSize: 12 }} stroke="#6b7280" />
                          <Tooltip
                            contentStyle={{
                              backgroundColor: 'white',
                              border: '1px solid #e5e7eb',
                              borderRadius: '8px',
                              fontSize: '12px'
                            }}
                          />
                          <Area
                            type="monotone"
                            dataKey="value"
                            stroke="#059669"
                            strokeWidth={2}
                            fillOpacity={1}
                            fill="url(#colorNDVI)"
                          />
                        </AreaChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* Health Radar */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Ecosystem Health</h3>
                    <div className="bg-gray-50 rounded-xl p-4">
                      <ResponsiveContainer width="100%" height={200}>
                        <RadarChart data={radarData}>
                          <PolarGrid stroke="#e5e7eb" />
                          <PolarAngleAxis dataKey="metric" tick={{ fontSize: 11 }} />
                          <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fontSize: 10 }} />
                          <Radar
                            name="Health"
                            dataKey="value"
                            stroke="#059669"
                            fill="#059669"
                            fillOpacity={0.6}
                          />
                        </RadarChart>
                      </ResponsiveContainer>
                    </div>
                  </div>

                  {/* AI Summary */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-center">
                      <span className="mr-2">🤖</span>
                      AI Analysis
                    </h3>
                    <div className="bg-gradient-to-br from-forest-50 to-earth-50 rounded-xl p-4 border border-forest-200">
                      <p className="text-sm text-gray-700 leading-relaxed">{analysisData.aiSummary}</p>
                    </div>
                  </div>

                  {/* Recommendations */}
                  <div>
                    <h3 className="text-sm font-semibold text-gray-700 mb-3">Recommended Actions</h3>
                    <div className="space-y-2">
                      {analysisData.recommendations.map((rec, idx) => (
                        <div
                          key={idx}
                          className="bg-white border border-gray-200 rounded-lg p-3 hover:shadow-md transition-shadow"
                        >
                          <div className="flex items-start space-x-3">
                            <div
                              className={`w-2 h-2 rounded-full mt-1.5 ${
                                rec.priority === 'high'
                                  ? 'bg-red-500'
                                  : rec.priority === 'medium'
                                  ? 'bg-yellow-500'
                                  : 'bg-green-500'
                              }`}
                            />
                            <div className="flex-1">
                              <p className="text-sm text-gray-900">{rec.action}</p>
                              <div className="flex items-center space-x-2 mt-1">
                                <span className="text-xs text-gray-500">Impact:</span>
                                <span className="text-xs font-medium text-forest-600">{rec.impact}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex gap-2">
                    <button className="flex-1 px-4 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors text-sm font-medium flex items-center justify-center space-x-2">
                      <Download className="w-4 h-4" />
                      <span>Download Report</span>
                    </button>
                    <button className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default DashboardPageModern;
