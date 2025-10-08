import React, { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Sample regions with known degradation issues
const SAMPLE_REGIONS = [
  {
    id: 1,
    name: "Machakos County, Kenya",
    coordinates: { lat: -1.5177, lng: 37.2634 },
    country: "Kenya",
    degradationLevel: "high",
    description: "Semi-arid region experiencing severe soil erosion"
  },
  {
    id: 2,
    name: "Rajasthan Desert, India",
    coordinates: { lat: 27.0238, lng: 74.2179 },
    country: "India",
    degradationLevel: "severe",
    description: "Desert expansion and drought stress"
  },
  {
    id: 3,
    name: "Sahel Region, Niger",
    coordinates: { lat: 13.5116, lng: 2.1254 },
    country: "Niger",
    degradationLevel: "severe",
    description: "Desertification and overgrazing"
  },
  {
    id: 4,
    name: "São Paulo Farmland, Brazil",
    coordinates: { lat: -23.5505, lng: -46.6333 },
    country: "Brazil",
    degradationLevel: "moderate",
    description: "Agricultural intensification impacts"
  },
  {
    id: 5,
    name: "Inner Mongolia, China",
    coordinates: { lat: 40.8142, lng: 111.9562 },
    country: "China",
    degradationLevel: "high",
    description: "Grassland degradation and desertification"
  }
];

// Custom icons for different degradation levels
const createCustomIcon = (level) => {
  const colors = {
    low: '#22c55e',      // green
    moderate: '#f59e0b',  // yellow
    high: '#ef4444',      // red
    severe: '#991b1b'     // dark red
  };
  
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${colors[level]};
        width: 20px;
        height: 20px;
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 10px;
      ">
        !
      </div>
    `,
    iconSize: [26, 26],
    iconAnchor: [13, 13]
  });
};

// Component to handle map clicks
function MapClickHandler({ onRegionSelect, loading }) {
  useMapEvents({
    click: (e) => {
      if (loading) return;
      
      const { lat, lng } = e.latlng;
      
      // Find closest sample region or create a generic one
      let selectedRegion = SAMPLE_REGIONS.find(region => {
        const distance = Math.sqrt(
          Math.pow(region.coordinates.lat - lat, 2) + 
          Math.pow(region.coordinates.lng - lng, 2)
        );
        return distance < 5; // Within ~5 degrees
      });

      if (!selectedRegion) {
        selectedRegion = {
          id: Date.now(),
          name: `Region ${lat.toFixed(2)}, ${lng.toFixed(2)}`,
          coordinates: { lat, lng },
          country: "Unknown",
          degradationLevel: "moderate",
          description: "User-selected region for analysis"
        };
      }

      onRegionSelect(selectedRegion);
    }
  });

  return null;
}

const MapView = ({ onRegionSelect, selectedRegion, loading }) => {
  const mapRef = useRef();

  // Center map on selected region
  useEffect(() => {
    if (selectedRegion && mapRef.current) {
      mapRef.current.setView(
        [selectedRegion.coordinates.lat, selectedRegion.coordinates.lng],
        8
      );
    }
  }, [selectedRegion]);

  return (
    <div className="relative h-full w-full">
      {/* Map Instructions */}
      <motion.div 
        className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4 max-w-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-semibold text-forest-700 mb-2">
          🗺️ Interactive Analysis
        </h3>
        <p className="text-sm text-gray-600">
          Click anywhere on the map or select a marked region to analyze land degradation 
          and receive AI-powered restoration recommendations.
        </p>
      </motion.div>

      {/* Legend */}
      <motion.div 
        className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h4 className="font-semibold text-sm mb-2">Degradation Levels</h4>
        <div className="space-y-1 text-xs">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Low</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Moderate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>High</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-800"></div>
            <span>Severe</span>
          </div>
        </div>
      </motion.div>

      <MapContainer
        center={[0, 0]}
        zoom={2}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        className="z-0"
      >
        {/* Base tile layer */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Satellite layer option */}
        <TileLayer
          attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          opacity={0.7}
        />

        {/* Sample region markers */}
        {SAMPLE_REGIONS.map((region) => (
          <Marker
            key={region.id}
            position={[region.coordinates.lat, region.coordinates.lng]}
            icon={createCustomIcon(region.degradationLevel)}
            eventHandlers={{
              click: () => !loading && onRegionSelect(region)
            }}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-forest-700">{region.name}</h3>
                <p className="text-sm text-gray-600 mt-1">{region.description}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <span className="text-xs font-medium">Risk Level:</span>
                  <span className={`text-xs px-2 py-1 rounded-full text-white ${
                    region.degradationLevel === 'low' ? 'bg-green-500' :
                    region.degradationLevel === 'moderate' ? 'bg-yellow-500' :
                    region.degradationLevel === 'high' ? 'bg-red-500' : 'bg-red-800'
                  }`}>
                    {region.degradationLevel.toUpperCase()}
                  </span>
                </div>
                <button 
                  onClick={() => onRegionSelect(region)}
                  className="mt-2 btn-primary text-xs w-full"
                  disabled={loading}
                >
                  {loading ? 'Analyzing...' : 'Analyze Region'}
                </button>
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Selected region marker */}
        {selectedRegion && (
          <Marker
            position={[selectedRegion.coordinates.lat, selectedRegion.coordinates.lng]}
            icon={L.divIcon({
              className: 'selected-marker',
              html: `
                <div style="
                  background-color: #3b82f6;
                  width: 30px;
                  height: 30px;
                  border-radius: 50%;
                  border: 4px solid white;
                  box-shadow: 0 4px 12px rgba(0,0,0,0.4);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: bold;
                  color: white;
                  font-size: 12px;
                  animation: pulse 2s infinite;
                ">
                  ✓
                </div>
                <style>
                  @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.1); }
                    100% { transform: scale(1); }
                  }
                </style>
              `,
              iconSize: [38, 38],
              iconAnchor: [19, 19]
            })}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-blue-700">Selected Region</h3>
                <p className="text-sm">{selectedRegion.name}</p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Map click handler */}
        <MapClickHandler onRegionSelect={onRegionSelect} loading={loading} />
      </MapContainer>
    </div>
  );
};

export default MapView;