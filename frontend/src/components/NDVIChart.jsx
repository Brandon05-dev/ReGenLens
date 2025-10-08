import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Area, AreaChart } from 'recharts';
import { motion } from 'framer-motion';

const NDVIChart = ({ data, region }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-500">
        <div className="text-center">
          <div className="text-4xl mb-2">📊</div>
          <p>No NDVI data available</p>
        </div>
      </div>
    );
  }

  // Transform NDVI data for chart
  const chartData = data.map((value, index) => ({
    year: 2022 + index,
    ndvi: parseFloat(value.toFixed(3)),
    health: value > 0.7 ? 'Healthy' : value > 0.5 ? 'Moderate' : 'Degraded'
  }));

  // Calculate trend
  const firstValue = data[0];
  const lastValue = data[data.length - 1];
  const trend = lastValue > firstValue ? 'improving' : 'declining';
  const changePercent = ((lastValue - firstValue) / firstValue * 100).toFixed(1);

  // Custom tooltip
  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border">
          <p className="font-semibold">{`Year: ${label}`}</p>
          <p className="text-forest-600">
            {`NDVI: ${data.ndvi}`}
          </p>
          <p className={`text-sm ${
            data.ndvi > 0.7 ? 'text-green-600' : 
            data.ndvi > 0.5 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            Status: {data.health}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <motion.div 
      className="bg-white rounded-lg p-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-forest-700 mb-2">
          📈 NDVI Vegetation Trends
        </h3>
        <p className="text-sm text-gray-600 mb-3">
          Normalized Difference Vegetation Index over time for {region}
        </p>
        
        {/* Trend Summary */}
        <div className="flex items-center space-x-4 mb-4 p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <span className={`text-2xl ${trend === 'improving' ? '📈' : '📉'}`}>
              {trend === 'improving' ? '📈' : '📉'}
            </span>
            <div>
              <p className="text-sm font-medium">
                Trend: {trend === 'improving' ? 'Improving' : 'Declining'}
              </p>
              <p className={`text-xs ${changePercent > 0 ? 'text-green-600' : 'text-red-600'}`}>
                {changePercent > 0 ? '+' : ''}{changePercent}% change
              </p>
            </div>
          </div>
          
          <div className="flex-1">
            <div className="text-xs text-gray-500 mb-1">Current Health</div>
            <div className={`px-2 py-1 rounded-full text-xs font-medium ${
              lastValue > 0.7 ? 'bg-green-100 text-green-800' :
              lastValue > 0.5 ? 'bg-yellow-100 text-yellow-800' :
              'bg-red-100 text-red-800'
            }`}>
              {lastValue > 0.7 ? 'Healthy' : lastValue > 0.5 ? 'Moderate' : 'Degraded'}
            </div>
          </div>
        </div>
      </div>

      {/* Chart */}
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <defs>
              <linearGradient id="ndviGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#22c55e" stopOpacity={0.8}/>
                <stop offset="95%" stopColor="#22c55e" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis 
              dataKey="year" 
              stroke="#6b7280"
              fontSize={12}
            />
            <YAxis 
              domain={[0, 1]}
              stroke="#6b7280"
              fontSize={12}
              tickFormatter={(value) => value.toFixed(2)}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="ndvi"
              stroke="#16a34a"
              strokeWidth={3}
              fill="url(#ndviGradient)"
              dot={{ fill: '#16a34a', strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: '#16a34a', strokeWidth: 2, fill: '#fff' }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* NDVI Scale Reference */}
      <div className="mt-4 p-3 bg-gray-50 rounded-lg">
        <h4 className="text-sm font-semibold mb-2">NDVI Scale Reference</h4>
        <div className="grid grid-cols-3 gap-2 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded"></div>
            <span>0.0-0.5: Degraded</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded"></div>
            <span>0.5-0.7: Moderate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded"></div>
            <span>0.7-1.0: Healthy</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default NDVIChart;