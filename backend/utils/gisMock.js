/**
 * Mock GIS and satellite data utilities
 * Simulates NDVI data and degradation analysis for demonstration
 */

/**
 * Generate mock NDVI trend data for a region
 * @param {Object} coordinates - Lat/lng coordinates
 * @param {string} region - Region name for context
 * @returns {Array} - Array of NDVI values representing trend over time
 */
export function generateMockNDVI(coordinates, region) {
  const lat = coordinates.lat;
  const lng = coordinates.lng;
  
  // Base NDVI influenced by geographical factors
  let baseNDVI = 0.7; // Default healthy vegetation
  
  // Adjust base NDVI based on latitude (climate zones)
  if (Math.abs(lat) > 60) {
    baseNDVI = 0.4; // Arctic/Antarctic regions
  } else if (Math.abs(lat) > 40) {
    baseNDVI = 0.6; // Temperate regions
  } else if (Math.abs(lat) < 23.5) {
    // Tropical regions - vary by longitude and known patterns
    if (lng > -20 && lng < 50 && lat > -35 && lat < 35) {
      // Africa/Middle East - potential desertification
      baseNDVI = 0.5;
    } else {
      baseNDVI = 0.8; // Tropical forests
    }
  }
  
  // Regional adjustments based on known degradation patterns
  const regionLower = region.toLowerCase();
  if (regionLower.includes('sahel') || regionLower.includes('desert') || regionLower.includes('rajasthan')) {
    baseNDVI = 0.3;
  } else if (regionLower.includes('machakos') || regionLower.includes('kenya')) {
    baseNDVI = 0.6;
  } else if (regionLower.includes('brazil') || regionLower.includes('amazon')) {
    baseNDVI = 0.8;
  } else if (regionLower.includes('mongolia') || regionLower.includes('grassland')) {
    baseNDVI = 0.5;
  }
  
  // Generate 4-year trend with realistic degradation patterns
  const trend = [];
  let currentNDVI = baseNDVI;
  
  // Add some randomness but maintain realistic trends
  const degradationRate = 0.02 + Math.random() * 0.06; // 2-8% decline per year
  const seasonalVariation = 0.05; // 5% seasonal variation
  
  for (let year = 0; year < 4; year++) {
    // Apply degradation trend
    if (year > 0) {
      currentNDVI -= degradationRate * (1 + Math.random() * 0.5);
    }
    
    // Add seasonal/random variation
    const variation = (Math.random() - 0.5) * seasonalVariation;
    let yearNDVI = Math.max(0.1, Math.min(1.0, currentNDVI + variation));
    
    // Round to 3 decimal places
    trend.push(Math.round(yearNDVI * 1000) / 1000);
  }
  
  console.log(`🛰️  Generated NDVI trend for ${region}:`, trend);
  return trend;
}

/**
 * Calculate degradation score from NDVI trend
 * @param {Array} ndviTrend - Array of NDVI values
 * @returns {number} - Degradation score between 0 and 1
 */
export function calculateDegradationScore(ndviTrend) {
  if (!ndviTrend || ndviTrend.length < 2) {
    return 0.3; // Default moderate risk
  }
  
  const firstValue = ndviTrend[0];
  const lastValue = ndviTrend[ndviTrend.length - 1];
  
  // Calculate percentage decline
  const decline = (firstValue - lastValue) / firstValue;
  
  // Convert to degradation score (0 = no degradation, 1 = complete degradation)
  const degradationScore = Math.max(0, Math.min(1, decline));
  
  console.log(`📊 Calculated degradation score: ${(degradationScore * 100).toFixed(1)}%`);
  return Math.round(degradationScore * 1000) / 1000; // Round to 3 decimal places
}

/**
 * Simulate satellite data analysis with realistic processing time
 * @param {Object} coordinates - Lat/lng coordinates
 * @param {string} region - Region name
 * @returns {Promise<Object>} - Mock satellite analysis results
 */
export async function analyzeSatelliteData(coordinates, region) {
  console.log(`🛰️  Analyzing satellite data for ${region}...`);
  
  // Simulate processing time
  await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
  
  const ndviTrend = generateMockNDVI(coordinates, region);
  const degradationScore = calculateDegradationScore(ndviTrend);
  
  // Additional mock metadata
  const analysis = {
    ndviTrend,
    degradationScore,
    dataQuality: 'high',
    cloudCover: Math.round(Math.random() * 30), // 0-30% cloud cover
    lastImageDate: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
    satelliteSource: 'Sentinel-2 (simulated)',
    resolution: '10m',
    confidence: Math.round((0.8 + Math.random() * 0.2) * 100) // 80-100% confidence
  };
  
  console.log(`✅ Satellite analysis complete for ${region}`);
  return analysis;
}

/**
 * Get regional environmental context
 * @param {Object} coordinates - Lat/lng coordinates
 * @param {string} region - Region name
 * @returns {Object} - Environmental context data
 */
export function getEnvironmentalContext(coordinates, region) {
  const lat = coordinates.lat;
  const lng = coordinates.lng;
  
  // Determine climate zone
  let climateZone = 'temperate';
  let avgRainfall = 800; // mm per year
  let primaryThreats = ['soil erosion', 'climate variability'];
  
  if (Math.abs(lat) < 23.5) {
    climateZone = 'tropical';
    avgRainfall = 1200;
  } else if (Math.abs(lat) > 40) {
    climateZone = 'temperate';
    avgRainfall = 600;
  }
  
  // Regional specific adjustments
  const regionLower = region.toLowerCase();
  if (regionLower.includes('sahel') || regionLower.includes('desert')) {
    climateZone = 'arid';
    avgRainfall = 200;
    primaryThreats = ['desertification', 'drought', 'overgrazing'];
  } else if (regionLower.includes('kenya') || regionLower.includes('machakos')) {
    climateZone = 'semi-arid';
    avgRainfall = 500;
    primaryThreats = ['soil erosion', 'drought', 'deforestation'];
  }
  
  return {
    climateZone,
    avgRainfall,
    primaryThreats,
    soilType: 'mixed', // Simplified
    elevation: Math.round(Math.random() * 2000), // 0-2000m
    landUse: 'agriculture/pastoral' // Simplified
  };
}