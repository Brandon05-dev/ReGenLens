import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, GeoJSON } from 'react-leaflet';
import L from 'leaflet';
import { motion } from 'framer-motion';
import { Search, MapPin, X } from 'lucide-react';

// Fix for default markers in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// East Africa bounds for constraining the map and search
const EAST_AFRICA_BOUNDS = [
  [-12, 28], // Southwest coordinates (lat, lng)
  [18, 52]   // Northeast coordinates (lat, lng)
];

// East Africa center coordinates
const EAST_AFRICA_CENTER = [0.0236, 37.9062]; // Approximate center of East Africa

// Simple East Africa outline for visual context
const EAST_AFRICA_OUTLINE = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "East Africa Region"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [28, 18],    // Northwest
          [52, 18],    // Northeast  
          [52, -12],   // Southeast
          [28, -12],   // Southwest
          [28, 18]     // Close polygon
        ]]
      }
    }
  ]
};

// Popular search suggestions for East Africa
const SEARCH_SUGGESTIONS = [
  'Nairobi, Kenya', 'Dar es Salaam, Tanzania', 'Kampala, Uganda', 'Addis Ababa, Ethiopia',
  'Kigali, Rwanda', 'Arusha, Tanzania', 'Mombasa, Kenya', 'Dodoma, Tanzania',
  'Kisumu, Kenya', 'Mwanza, Tanzania', 'Jinja, Uganda', 'Bahir Dar, Ethiopia'
];

// Sample regions with known degradation issues in East Africa
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
    name: "Dodoma Region, Tanzania",
    coordinates: { lat: -6.1630, lng: 35.7516 },
    country: "Tanzania",
    degradationLevel: "moderate",
    description: "Central plateau with seasonal drought impacts"
  },
  {
    id: 3,
    name: "Karamoja Region, Uganda",
    coordinates: { lat: 2.6689, lng: 34.2975 },
    country: "Uganda",
    degradationLevel: "high",
    description: "Semi-arid pastoralist region with overgrazing"
  },
  {
    id: 4,
    name: "Afar Region, Ethiopia",
    coordinates: { lat: 11.7943, lng: 40.9819 },
    country: "Ethiopia",
    degradationLevel: "severe",
    description: "Desert region with extreme degradation and salinity"
  },
  {
    id: 5,
    name: "Eastern Province, Rwanda",
    coordinates: { lat: -2.0469, lng: 30.3167 },
    country: "Rwanda",
    degradationLevel: "moderate",
    description: "Hillside farming with erosion challenges"
  },
  {
    id: 6,
    name: "Northern Kenya",
    coordinates: { lat: 3.5000, lng: 37.0000 },
    country: "Kenya",
    degradationLevel: "severe",
    description: "Arid pastoralist lands with severe degradation"
  },
  {
    id: 7,
    name: "Somali Region, Ethiopia",
    coordinates: { lat: 6.5000, lng: 44.0000 },
    country: "Ethiopia",
    degradationLevel: "severe",
    description: "Pastoral region affected by drought and overgrazing"
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
function MapClickHandler({ onRegionSelect, loading, isWithinEastAfrica }) {
  useMapEvents({
    click: (e) => {
      if (loading) return;
      
      const { lat, lng } = e.latlng;
      
      // Check if click is within East Africa bounds
      if (!isWithinEastAfrica(lat, lng)) {
        return; // Ignore clicks outside East Africa
      }
      
      // Find closest sample region or create a generic one
      let selectedRegion = SAMPLE_REGIONS.find(region => {
        const distance = Math.sqrt(
          Math.pow(region.coordinates.lat - lat, 2) + 
          Math.pow(region.coordinates.lng - lng, 2)
        );
        return distance < 2; // Within ~2 degrees (smaller radius for East Africa)
      });

      if (!selectedRegion) {
        // Determine likely country based on coordinates
        let country = "East Africa";
        if (lat >= -4.7 && lat <= 5.0 && lng >= 33.9 && lng <= 41.9) country = "Kenya";
        else if (lat >= -11.7 && lat <= -0.95 && lng >= 29.3 && lng <= 40.4) country = "Tanzania";
        else if (lat >= -1.5 && lat <= 4.2 && lng >= 29.6 && lng <= 35.0) country = "Uganda";
        else if (lat >= 3.4 && lat <= 14.9 && lng >= 32.9 && lng <= 47.8) country = "Ethiopia";
        else if (lat >= -2.8 && lat <= -1.0 && lng >= 28.9 && lng <= 30.9) country = "Rwanda";
        
        selectedRegion = {
          id: Date.now(),
          name: `${lat >= 0 ? 'N' : 'S'}${Math.abs(lat).toFixed(2)}°, ${lng >= 0 ? 'E' : 'W'}${Math.abs(lng).toFixed(2)}°`,
          coordinates: { lat, lng },
          country: country,
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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchMarker, setSearchMarker] = useState(null);

  // Center map on selected region
  useEffect(() => {
    if (selectedRegion && mapRef.current) {
      mapRef.current.setView(
        [selectedRegion.coordinates.lat, selectedRegion.coordinates.lng],
        8
      );
    }
  }, [selectedRegion]);

  // Debounced search function
  useEffect(() => {
    if (searchQuery.length < 3) {
      setSearchResults([]);
      setShowSearchResults(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      searchLocation(searchQuery);
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Function to check if coordinates are within East Africa bounds
  const isWithinEastAfrica = (lat, lng) => {
    return lat >= EAST_AFRICA_BOUNDS[0][0] && 
           lat <= EAST_AFRICA_BOUNDS[1][0] && 
           lng >= EAST_AFRICA_BOUNDS[0][1] && 
           lng <= EAST_AFRICA_BOUNDS[1][1];
  };

  // Search for locations using Nominatim API
  const searchLocation = async (query) => {
    setIsSearching(true);
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?` +
        `q=${encodeURIComponent(query)}&` +
        `format=json&` +
        `limit=10&` +
        `countrycodes=ke,tz,ug,et,rw,bi,so,dj,er,ss&` +
        `addressdetails=1&` +
        `bounded=1&` +
        `viewbox=${EAST_AFRICA_BOUNDS[0][1]},${EAST_AFRICA_BOUNDS[1][0]},${EAST_AFRICA_BOUNDS[1][1]},${EAST_AFRICA_BOUNDS[0][0]}`
      );
      
      const data = await response.json();
      
      // Filter results to East Africa region and format them
      const filteredResults = data
        .filter(result => {
          const lat = parseFloat(result.lat);
          const lng = parseFloat(result.lon);
          return isWithinEastAfrica(lat, lng);
        })
        .map(result => ({
          id: result.place_id,
          name: result.display_name,
          lat: parseFloat(result.lat),
          lng: parseFloat(result.lon),
          type: result.type,
          country: result.address?.country || 'Unknown'
        }))
        .slice(0, 5); // Limit to 5 results
      
      setSearchResults(filteredResults);
      setShowSearchResults(filteredResults.length > 0);
    } catch (error) {
      console.error('Search error:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  // Handle search result selection
  const handleSearchResultSelect = (result) => {
    if (mapRef.current) {
      mapRef.current.setView([result.lat, result.lng], 10);
    }
    
    // Set search marker for temporary display
    setSearchMarker({
      lat: result.lat,
      lng: result.lng,
      name: result.name.split(',')[0]
    });
    
    // Create a region object for the selected location
    const region = {
      id: Date.now(),
      name: result.name.split(',')[0], // Take first part of the name
      coordinates: { lat: result.lat, lng: result.lng },
      country: result.country,
      degradationLevel: "moderate", // Default level
      description: `Selected location: ${result.name}`
    };
    
    onRegionSelect(region);
    setSearchQuery('');
    setShowSearchResults(false);
    
    // Clear search marker after 3 seconds
    setTimeout(() => {
      setSearchMarker(null);
    }, 3000);
  };

  // Clear search
  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
  };

  // Handle keyboard navigation in search
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && searchResults.length > 0) {
      handleSearchResultSelect(searchResults[0]);
    } else if (e.key === 'Escape') {
      clearSearch();
    }
  };

  return (
    <div className="relative h-full w-full">
      {/* Search Bar */}
      <motion.div 
        className="absolute top-4 right-4 z-[1000] w-80"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search cities, regions, or coordinates in East Africa..."
              className="w-full pl-10 pr-10 py-3 bg-white rounded-lg shadow-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-sm"
            />
            {searchQuery && (
              <button
                onClick={clearSearch}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
          
          {/* Search Results & Suggestions Dropdown */}
          {(showSearchResults || (searchQuery.length === 0 && searchQuery !== '')) && (
            <motion.div
              className="absolute top-full mt-2 w-full bg-white rounded-lg shadow-lg border border-gray-200 max-h-60 overflow-y-auto"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              {isSearching ? (
                <div className="p-3 text-center text-gray-500 text-sm">
                  Searching East Africa...
                </div>
              ) : searchResults.length > 0 ? (
                <div className="py-1">
                  {searchResults.map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleSearchResultSelect(result)}
                      className="w-full px-4 py-3 text-left hover:bg-gray-50 border-b border-gray-100 last:border-b-0 focus:outline-none focus:bg-gray-50"
                    >
                      <div className="flex items-start space-x-2">
                        <MapPin className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <div className="text-sm font-medium text-gray-900 truncate">
                            {result.name.split(',')[0]}
                          </div>
                          <div className="text-xs text-gray-500 truncate">
                            {result.country} • {result.type}
                          </div>
                        </div>
                      </div>
                    </button>
                  ))}
                </div>
              ) : searchQuery.length >= 3 ? (
                <div className="p-3 text-center text-gray-500 text-sm">
                  No results found in East Africa
                </div>
              ) : null}
            </motion.div>
          )}
        </div>
      </motion.div>

      {/* Map Instructions */}
      <motion.div 
        className="absolute top-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4 max-w-sm"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <h3 className="font-semibold text-forest-700 mb-2">
          🗺️ East Africa Analysis
        </h3>
        <p className="text-sm text-gray-600">
          Search for locations or click anywhere on the East Africa map to analyze land degradation 
          and receive AI-powered restoration recommendations.
        </p>
      </motion.div>

      {/* Legend & Info */}
      <motion.div 
        className="absolute bottom-4 left-4 z-[1000] bg-white rounded-lg shadow-lg p-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <h4 className="font-semibold text-sm mb-2">Land Degradation Risk</h4>
        <div className="space-y-1 text-xs mb-3">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-500"></div>
            <span>Low Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
            <span>Moderate Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-500"></div>
            <span>High Risk</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-800"></div>
            <span>Severe Risk</span>
          </div>
        </div>
        <div className="text-xs text-gray-500 border-t pt-2">
          <div className="flex items-center space-x-1 mb-1">
            <span className="text-green-600">---</span>
            <span>East Africa Region</span>
          </div>
          <div>Covering: Kenya, Tanzania, Uganda, Ethiopia, Rwanda, Burundi</div>
        </div>
      </motion.div>

      <MapContainer
        center={EAST_AFRICA_CENTER}
        zoom={5}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        className="z-0"
        maxBounds={EAST_AFRICA_BOUNDS}
        maxBoundsViscosity={1.0}
        minZoom={4}
        maxZoom={18}
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
          opacity={0.6}
        />

        {/* East Africa region outline */}
        <GeoJSON
          data={EAST_AFRICA_OUTLINE}
          style={{
            fillColor: 'transparent',
            fillOpacity: 0,
            color: '#22c55e',
            weight: 2,
            opacity: 0.7,
            dashArray: '5, 5'
          }}
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

        {/* Search result marker (temporary) */}
        {searchMarker && (
          <Marker
            position={[searchMarker.lat, searchMarker.lng]}
            icon={L.divIcon({
              className: 'search-marker',
              html: `
                <div style="
                  background-color: #10b981;
                  width: 25px;
                  height: 25px;
                  border-radius: 50%;
                  border: 3px solid white;
                  box-shadow: 0 3px 10px rgba(0,0,0,0.3);
                  display: flex;
                  align-items: center;
                  justify-content: center;
                  font-weight: bold;
                  color: white;
                  font-size: 10px;
                  animation: bounce 1s infinite;
                ">
                  📍
                </div>
                <style>
                  @keyframes bounce {
                    0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
                    40% { transform: translateY(-5px); }
                    60% { transform: translateY(-3px); }
                  }
                </style>
              `,
              iconSize: [31, 31],
              iconAnchor: [15.5, 15.5]
            })}
          >
            <Popup>
              <div className="p-2">
                <h3 className="font-semibold text-green-700">Search Result</h3>
                <p className="text-sm">{searchMarker.name}</p>
              </div>
            </Popup>
          </Marker>
        )}

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
        <MapClickHandler 
          onRegionSelect={onRegionSelect} 
          loading={loading} 
          isWithinEastAfrica={isWithinEastAfrica}
        />
      </MapContainer>
    </div>
  );
};

export default MapView;