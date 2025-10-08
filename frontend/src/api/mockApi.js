/**
 * Mock API utilities for frontend development and testing
 * Use this when backend is not available
 */

const MOCK_DELAY = 1500; // Simulate API delay

export const mockAnalyzeResponse = {
  region: "Sample Region",
  coordinates: { lat: -1.5177, lng: 37.2634 },
  ndviTrend: [0.72, 0.68, 0.61, 0.54],
  degradationScore: 0.25,
  aiSummary: "Vegetation in this region has declined by 25% since 2022 due to soil erosion and climate stress. Recommended actions: 1) Implement contour farming to reduce erosion, 2) Plant drought-tolerant native species, 3) Establish water conservation systems like check dams, 4) Practice rotational grazing to allow vegetation recovery.",
  metadata: {
    dataQuality: "high",
    cloudCover: 15,
    lastImageDate: "2024-10-01T00:00:00.000Z",
    satelliteSource: "Sentinel-2 (simulated)",
    confidence: 92,
    climateZone: "semi-arid",
    avgRainfall: 500,
    primaryThreats: ["soil erosion", "drought", "deforestation"]
  },
  analysisDate: new Date().toISOString()
};

export const mockRegions = [
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
  }
];

/**
 * Mock API function for region analysis
 */
export async function mockAnalyzeRegion(region, coordinates) {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, MOCK_DELAY));
  
  return {
    ...mockAnalyzeResponse,
    region,
    coordinates
  };
}

/**
 * Check if backend is available
 */
export async function checkBackendHealth() {
  try {
    const response = await fetch('http://localhost:5000/api/health');
    return response.ok;
  } catch (error) {
    return false;
  }
}