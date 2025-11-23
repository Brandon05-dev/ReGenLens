import React, { useState, useRef, useEffect } from 'react';
import Map, { Source, Layer, Marker, Popup, NavigationControl, GeolocateControl, ScaleControl } from 'react-map-gl';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, MapPin, X, Layers, Mountain, Satellite } from 'lucide-react';
import 'mapbox-gl/dist/mapbox-gl.css';

// Mapbox token from environment variable
const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN || 'pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

// Check if using default token
const isUsingDefaultToken = !import.meta.env.VITE_MAPBOX_TOKEN;

// Sample regions with degradation data
const SAMPLE_REGIONS = [
  {
    id: 1,
    name: "Sahel Region, Mali",
    coordinates: { lat: 16.0, lng: -2.0 },
    degradationLevel: "severe",
    ndvi: 0.25,
    description: "Semi-arid region experiencing desertification"
  },
  {
    id: 2,
    name: "Northern Cape, South Africa",
    coordinates: { lat: -29.0, lng: 21.0 },
    degradationLevel: "high",
    ndvi: 0.35,
    description: "Karoo region with overgrazing impacts"
  },
  {
    id: 3,
    name: "Machakos County, Kenya",
    coordinates: { lat: -1.5177, lng: 37.2634 },
    degradationLevel: "high",
    ndvi: 0.40,
    description: "Semi-arid region with soil erosion"
  },
  {
    id: 4,
    name: "Upper East Region, Ghana",
    coordinates: { lat: 10.9, lng: -0.9 },
    degradationLevel: "moderate",
    ndvi: 0.55,
    description: "Savanna region with seasonal drought"
  },
  {
    id: 5,
    name: "Maradi Region, Niger",
    coordinates: { lat: 13.5, lng: 7.1 },
    degradationLevel: "severe",
    ndvi: 0.22,
    description: "Sahel region with extreme desertification"
  }
];

const MapView3D = ({ onRegionSelect, selectedRegion, loading }) => {
  const mapRef = useRef();
  const [viewState, setViewState] = useState({
    longitude: 20.0,
    latitude: 0.0,
    zoom: 3,
    pitch: 60,  // Increased for more dramatic 3D effect
    bearing: 0
  });

  const [mapStyle, setMapStyle] = useState('satellite');
  const [showTerrain, setShowTerrain] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredRegion, setHoveredRegion] = useState(null);
  const [popupInfo, setPopupInfo] = useState(null);

  // Map style options
  const mapStyles = {
    satellite: 'mapbox://styles/mapbox/satellite-streets-v12',
    terrain: 'mapbox://styles/mapbox/outdoors-v12',
    dark: 'mapbox://styles/mapbox/dark-v11',
    light: 'mapbox://styles/mapbox/light-v11'
  };

  // Initialize 3D terrain when map loads
  useEffect(() => {
    if (mapRef.current && showTerrain) {
      const map = mapRef.current.getMap();
      map.on('load', () => {
        map.addSource('mapbox-dem', {
          type: 'raster-dem',
          url: 'mapbox://mapbox.mapbox-terrain-dem-v1',
          tileSize: 512,
          maxzoom: 14
        });
        // Increased exaggeration for more dramatic 3D terrain
        map.setTerrain({ source: 'mapbox-dem', exaggeration: 2.0 });
      });
    }
  }, [showTerrain]);

  // Fly to selected region
  useEffect(() => {
    if (selectedRegion && mapRef.current) {
      mapRef.current.flyTo({
        center: [selectedRegion.coordinates.lng, selectedRegion.coordinates.lat],
        zoom: 11,
        pitch: 65,  // More dramatic angle when zooming to region
        bearing: 30,  // Slight rotation for better 3D view
        duration: 2000
      });
    }
  }, [selectedRegion]);

  const handleMarkerClick = (region) => {
    if (!loading) {
      onRegionSelect(region);
      setPopupInfo(region);
    }
  };

  const getMarkerColor = (level) => {
    const colors = {
      low: '#22c55e',
      moderate: '#f59e0b',
      high: '#ef4444',
      severe: '#991b1b'
    };
    return colors[level] || colors.moderate;
  };

  return (
    <div className="relative h-full w-full">
      {/* Setup Banner for Default Token */}
      {isUsingDefaultToken && (
        <motion.div
          className="absolute top-20 left-1/2 transform -translate-x-1/2 z-20 max-w-md"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-xl shadow-2xl p-4">
            <div className="flex items-start space-x-3">
              <div className="text-3xl">🗺️</div>
              <div className="flex-1">
                <h3 className="font-bold text-lg mb-1">Get Full 3D Experience!</h3>
                <p className="text-sm text-blue-100 mb-2">
                  Add your free Mapbox token for enhanced 3D terrain and satellite imagery.
                </p>
                <a
                  href="https://account.mapbox.com/auth/signup/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-blue-50 transition-colors"
                >
                  Get Free Token (2 min) →
                </a>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* Map Controls Overlay */}
      <div className="absolute top-4 left-4 z-10 space-y-2">
        {/* Map Style Selector */}
        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-2"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="flex gap-2">
            <button
              onClick={() => setMapStyle('satellite')}
              className={`p-2 rounded-lg transition-all ${
                mapStyle === 'satellite'
                  ? 'bg-forest-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Satellite View"
            >
              <Satellite className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMapStyle('terrain')}
              className={`p-2 rounded-lg transition-all ${
                mapStyle === 'terrain'
                  ? 'bg-forest-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Terrain View"
            >
              <Mountain className="w-5 h-5" />
            </button>
            <button
              onClick={() => setMapStyle('dark')}
              className={`p-2 rounded-lg transition-all ${
                mapStyle === 'dark'
                  ? 'bg-forest-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
              title="Dark Mode"
            >
              <Layers className="w-5 h-5" />
            </button>
          </div>
        </motion.div>

        {/* 3D Terrain Toggle */}
        <motion.div
          className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
        >
          <label className="flex items-center space-x-2 cursor-pointer">
            <input
              type="checkbox"
              checked={showTerrain}
              onChange={(e) => setShowTerrain(e.target.checked)}
              className="w-4 h-4 text-forest-600 rounded focus:ring-forest-500"
            />
            <span className="text-sm font-medium text-gray-700">3D Terrain</span>
          </label>
        </motion.div>
      </div>

      {/* Search Bar */}
      <motion.div
        className="absolute top-4 right-4 z-10 w-80"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search regions in Africa..."
            className="w-full pl-10 pr-10 py-3 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-forest-500 text-sm"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </motion.div>

      {/* Legend */}
      <motion.div
        className="absolute bottom-4 left-4 z-10 bg-white/95 backdrop-blur-sm rounded-xl shadow-lg p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <h4 className="font-semibold text-sm mb-3 text-gray-900">Degradation Risk</h4>
        <div className="space-y-2">
          {[
            { level: 'Low', color: '#22c55e' },
            { level: 'Moderate', color: '#f59e0b' },
            { level: 'High', color: '#ef4444' },
            { level: 'Severe', color: '#991b1b' }
          ].map(({ level, color }) => (
            <div key={level} className="flex items-center space-x-2">
              <div
                className="w-4 h-4 rounded-full shadow-sm"
                style={{ backgroundColor: color }}
              />
              <span className="text-xs text-gray-700">{level}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Stats Overlay */}
      <motion.div
        className="absolute top-4 left-1/2 transform -translate-x-1/2 z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <div className="bg-white/95 backdrop-blur-sm rounded-xl shadow-lg px-6 py-3">
          <div className="flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-forest-700">{SAMPLE_REGIONS.length}</div>
              <div className="text-xs text-gray-600">Regions</div>
            </div>
            <div className="h-8 w-px bg-gray-300" />
            <div className="text-center">
              <div className="text-2xl font-bold text-earth-600">54</div>
              <div className="text-xs text-gray-600">Countries</div>
            </div>
            <div className="h-8 w-px bg-gray-300" />
            <div className="text-center">
              <div className="text-2xl font-bold text-sage-600">30M+</div>
              <div className="text-xs text-gray-600">km² Monitored</div>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Mapbox Map */}
      <Map
        ref={mapRef}
        {...viewState}
        onMove={(evt) => setViewState(evt.viewState)}
        mapStyle={mapStyles[mapStyle]}
        mapboxAccessToken={MAPBOX_TOKEN}
        style={{ width: '100%', height: '100%' }}
        terrain={showTerrain ? { source: 'mapbox-dem', exaggeration: 2.0 } : undefined}
        onClick={(e) => {
          if (!loading && e.features && e.features.length === 0) {
            // Clicked on map, not on a marker
            const { lng, lat } = e.lngLat;
            const region = {
              id: Date.now(),
              name: `${lat.toFixed(2)}°, ${lng.toFixed(2)}°`,
              coordinates: { lat, lng },
              degradationLevel: 'moderate',
              ndvi: 0.45,
              description: 'Custom selected location'
            };
            onRegionSelect(region);
          }
        }}
      >
        {/* Navigation Controls */}
        <NavigationControl position="bottom-right" />
        <GeolocateControl position="bottom-right" />
        <ScaleControl />

        {/* Region Markers */}
        {SAMPLE_REGIONS.map((region) => (
          <Marker
            key={region.id}
            longitude={region.coordinates.lng}
            latitude={region.coordinates.lat}
            anchor="center"
            onClick={(e) => {
              e.originalEvent.stopPropagation();
              handleMarkerClick(region);
            }}
          >
            <motion.div
              className="cursor-pointer"
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
              onMouseEnter={() => setHoveredRegion(region)}
              onMouseLeave={() => setHoveredRegion(null)}
            >
              <div
                className="w-8 h-8 rounded-full border-4 border-white shadow-lg flex items-center justify-center text-white font-bold text-xs"
                style={{ backgroundColor: getMarkerColor(region.degradationLevel) }}
              >
                !
              </div>
              {hoveredRegion?.id === region.id && (
                <motion.div
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 bg-white rounded-lg shadow-xl p-2 whitespace-nowrap"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                >
                  <div className="text-xs font-semibold text-gray-900">{region.name}</div>
                  <div className="text-xs text-gray-600">NDVI: {region.ndvi}</div>
                </motion.div>
              )}
            </motion.div>
          </Marker>
        ))}

        {/* Selected Region Marker */}
        {selectedRegion && (
          <Marker
            longitude={selectedRegion.coordinates.lng}
            latitude={selectedRegion.coordinates.lat}
            anchor="center"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <div className="w-10 h-10 rounded-full border-4 border-white bg-blue-500 shadow-xl flex items-center justify-center text-white font-bold">
                ✓
              </div>
            </motion.div>
          </Marker>
        )}

        {/* Popup */}
        {popupInfo && (
          <Popup
            longitude={popupInfo.coordinates.lng}
            latitude={popupInfo.coordinates.lat}
            anchor="bottom"
            onClose={() => setPopupInfo(null)}
            closeButton={true}
            closeOnClick={false}
            className="custom-popup"
          >
            <div className="p-2">
              <h3 className="font-semibold text-forest-700 mb-1">{popupInfo.name}</h3>
              <p className="text-xs text-gray-600 mb-2">{popupInfo.description}</p>
              <div className="flex items-center justify-between text-xs">
                <span className="text-gray-500">NDVI:</span>
                <span className="font-semibold">{popupInfo.ndvi}</span>
              </div>
              <div className="flex items-center justify-between text-xs mt-1">
                <span className="text-gray-500">Risk:</span>
                <span
                  className="px-2 py-0.5 rounded-full text-white text-xs font-medium"
                  style={{ backgroundColor: getMarkerColor(popupInfo.degradationLevel) }}
                >
                  {popupInfo.degradationLevel.toUpperCase()}
                </span>
              </div>
            </div>
          </Popup>
        )}
      </Map>

      {/* Loading Overlay */}
      <AnimatePresence>
        {loading && (
          <motion.div
            className="absolute inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-20"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="bg-white rounded-2xl p-6 shadow-2xl flex items-center space-x-4">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-forest-600 border-t-transparent" />
              <span className="text-forest-700 font-semibold">Analyzing region...</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MapView3D;
