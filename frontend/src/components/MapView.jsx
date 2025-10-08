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

// Africa bounds for constraining the map and search
const AFRICA_BOUNDS = [
  [-35, -20], // Southwest coordinates (lat, lng)
  [38, 52]    // Northeast coordinates (lat, lng)
];

// Africa center coordinates
const AFRICA_CENTER = [0.0, 20.0]; // Approximate center of Africa

// Simple Africa outline for visual context
const AFRICA_OUTLINE = {
  "type": "FeatureCollection",
  "features": [
    {
      "type": "Feature",
      "properties": {
        "name": "Africa Continent"
      },
      "geometry": {
        "type": "Polygon",
        "coordinates": [[
          [-20, 38],   // Northwest
          [52, 38],    // Northeast  
          [52, -35],   // Southeast
          [-20, -35],  // Southwest
          [-20, 38]    // Close polygon
        ]]
      }
    }
  ]
};

// Popular search suggestions for Africa
const SEARCH_SUGGESTIONS = [
  'Lagos, Nigeria', 'Cairo, Egypt', 'Kinshasa, DR Congo', 'Johannesburg, South Africa',
  'Nairobi, Kenya', 'Casablanca, Morocco', 'Addis Ababa, Ethiopia', 'Dar es Salaam, Tanzania',
  'Cape Town, South Africa', 'Accra, Ghana', 'Algiers, Algeria', 'Kampala, Uganda'
];

// Sample regions with known degradation issues across Africa
const SAMPLE_REGIONS = [
  {
    id: 1,
    name: "Sahel Region, Mali",
    coordinates: { lat: 16.0, lng: -2.0 },
    country: "Mali",
    degradationLevel: "severe",
    description: "Semi-arid region experiencing desertification and soil erosion"
  },
  {
    id: 2,
    name: "Northern Cape, South Africa",
    coordinates: { lat: -29.0, lng: 21.0 },
    country: "South Africa",
    degradationLevel: "high",
    description: "Karoo region with overgrazing and drought impacts"
  },
  {
    id: 3,
    name: "Machakos County, Kenya",
    coordinates: { lat: -1.5177, lng: 37.2634 },
    country: "Kenya",
    degradationLevel: "high",
    description: "Semi-arid region experiencing severe soil erosion"
  },
  {
    id: 4,
    name: "Upper East Region, Ghana",
    coordinates: { lat: 10.9, lng: -0.9 },
    country: "Ghana",
    degradationLevel: "moderate",
    description: "Savanna region with seasonal drought challenges"
  },
  {
    id: 5,
    name: "Maradi Region, Niger",
    coordinates: { lat: 13.5, lng: 7.1 },
    country: "Niger",
    degradationLevel: "severe",
    description: "Sahel region with extreme desertification"
  },
  {
    id: 6,
    name: "Kasai Region, DR Congo",
    coordinates: { lat: -6.2, lng: 23.6 },
    country: "DR Congo",
    degradationLevel: "moderate",
    description: "Deforestation and mining-related land degradation"
  },
  {
    id: 7,
    name: "Afar Region, Ethiopia",
    coordinates: { lat: 11.7943, lng: 40.9819 },
    country: "Ethiopia",
    degradationLevel: "severe",
    description: "Desert region with extreme degradation and salinity"
  },
  {
    id: 8,
    name: "Karamoja Region, Uganda",
    coordinates: { lat: 2.6689, lng: 34.2975 },
    country: "Uganda",
    degradationLevel: "high",
    description: "Semi-arid pastoralist region with overgrazing"
  },
  {
    id: 9,
    name: "Middle Atlas, Morocco",
    coordinates: { lat: 33.0, lng: -5.0 },
    country: "Morocco",
    degradationLevel: "moderate",
    description: "Mountain region with erosion from intensive agriculture"
  },
  {
    id: 10,
    name: "Ouaddaï Region, Chad",
    coordinates: { lat: 14.0, lng: 21.0 },
    country: "Chad",
    degradationLevel: "high",
    description: "Sahel transition zone with severe degradation"
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
function MapClickHandler({ onRegionSelect, loading, isWithinAfrica }) {
  useMapEvents({
    click: (e) => {
      if (loading) return;
      
      const { lat, lng } = e.latlng;
      
      // Check if click is within Africa bounds
      if (!isWithinAfrica(lat, lng)) {
        return; // Ignore clicks outside Africa
      }
      
      // Find closest sample region or create a generic one
      let selectedRegion = SAMPLE_REGIONS.find(region => {
        const distance = Math.sqrt(
          Math.pow(region.coordinates.lat - lat, 2) + 
          Math.pow(region.coordinates.lng - lng, 2)
        );
        return distance < 5; // Within ~5 degrees (larger radius for full Africa)
      });

      if (!selectedRegion) {
        // Determine likely country based on coordinates
        let country = "Africa";
        if (lat >= -4.7 && lat <= 5.0 && lng >= 33.9 && lng <= 41.9) country = "Kenya";
        else if (lat >= -11.7 && lat <= -0.95 && lng >= 29.3 && lng <= 40.4) country = "Tanzania";
        else if (lat >= -1.5 && lat <= 4.2 && lng >= 29.6 && lng <= 35.0) country = "Uganda";
        else if (lat >= 3.4 && lat <= 14.9 && lng >= 32.9 && lng <= 47.8) country = "Ethiopia";
        else if (lat >= 22.0 && lat <= 31.7 && lng >= -17.1 && lng <= 11.9) country = "Algeria";
        else if (lat >= 30.0 && lat <= 31.7 && lng >= 24.7 && lng <= 36.9) country = "Egypt";
        else if (lat >= -35.0 && lat <= -22.1 && lng >= 16.5 && lng <= 32.9) country = "South Africa";
        else if (lat >= 4.0 && lat <= 13.9 && lng >= 2.2 && lng <= 14.6) country = "Nigeria";
        else if (lat >= -26.9 && lat <= -9.4 && lng >= 11.7 && lng <= 29.4) country = "Angola";
        else if (lat >= 31.0 && lat <= 37.5 && lng >= -13.2 && lng <= -1.0) country = "Morocco";
        
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

  // Function to check if coordinates are within Africa bounds
  const isWithinAfrica = (lat, lng) => {
    return lat >= AFRICA_BOUNDS[0][0] && 
           lat <= AFRICA_BOUNDS[1][0] && 
           lng >= AFRICA_BOUNDS[0][1] && 
           lng <= AFRICA_BOUNDS[1][1];
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
        `countrycodes=dz,ao,bj,bw,bf,bi,cm,cv,cf,td,km,cg,cd,dj,eg,gq,er,sz,et,ga,gm,gh,gn,gw,ci,ke,ls,lr,ly,mg,mw,ml,mr,mu,ma,mz,na,ne,ng,rw,st,sn,sc,sl,so,za,ss,sd,tz,tg,tn,ug,zm,zw&` +
        `addressdetails=1&` +
        `bounded=1&` +
        `viewbox=${AFRICA_BOUNDS[0][1]},${AFRICA_BOUNDS[1][0]},${AFRICA_BOUNDS[1][1]},${AFRICA_BOUNDS[0][0]}`
      );
      
      const data = await response.json();
      
      // Filter results to Africa region and format them
      const filteredResults = data
        .filter(result => {
          const lat = parseFloat(result.lat);
          const lng = parseFloat(result.lon);
          return isWithinAfrica(lat, lng);
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
              placeholder="Search cities, regions, or coordinates in Africa..."
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
                  Searching Africa...
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
                  No results found in Africa
                </div>
              ) : null}
            </motion.div>
          )}
        </div>
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
            <span>Africa Continent</span>
          </div>
          <div>Covering: All 54 African countries</div>
        </div>
      </motion.div>

      <MapContainer
        center={AFRICA_CENTER}
        zoom={3}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
        className="z-0"
        maxBounds={AFRICA_BOUNDS}
        maxBoundsViscosity={1.0}
        minZoom={2}
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

        {/* Africa continent outline */}
        <GeoJSON
          data={AFRICA_OUTLINE}
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
          isWithinAfrica={isWithinAfrica}
        />
      </MapContainer>
    </div>
  );
};

export default MapView;