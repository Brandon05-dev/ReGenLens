import express from 'express';
import { generateRecommendations } from '../utils/claude.js';
import { analyzeSatelliteData, getEnvironmentalContext } from '../utils/gisMock.js';
import { storeAnalysis } from '../supabaseClient.js';

const router = express.Router();

/**
 * POST /api/analyze
 * Analyze a region for land degradation and generate AI recommendations
 */
router.post('/analyze', async (req, res) => {
  try {
    const { region, coordinates } = req.body;
    
    // Validate input
    if (!region || !coordinates || typeof coordinates.lat !== 'number' || typeof coordinates.lng !== 'number') {
      return res.status(400).json({
        error: 'Invalid input. Please provide region name and valid coordinates (lat, lng).'
      });
    }
    
    console.log(`🔍 Starting analysis for ${region} at (${coordinates.lat}, ${coordinates.lng})`);
    
    // Step 1: Analyze satellite data (mock implementation)
    const satelliteData = await analyzeSatelliteData(coordinates, region);
    
    // Step 2: Get environmental context
    const environmentalContext = getEnvironmentalContext(coordinates, region);
    
    // Step 3: Generate AI recommendations using Claude
    const aiSummary = await generateRecommendations(
      region,
      satelliteData.ndviTrend,
      satelliteData.degradationScore,
      coordinates
    );
    
    // Step 4: Prepare analysis result
    const analysisResult = {
      region,
      coordinates,
      ndviTrend: satelliteData.ndviTrend,
      degradationScore: satelliteData.degradationScore,
      aiSummary,
      metadata: {
        dataQuality: satelliteData.dataQuality,
        cloudCover: satelliteData.cloudCover,
        lastImageDate: satelliteData.lastImageDate,
        satelliteSource: satelliteData.satelliteSource,
        confidence: satelliteData.confidence,
        climateZone: environmentalContext.climateZone,
        avgRainfall: environmentalContext.avgRainfall,
        primaryThreats: environmentalContext.primaryThreats
      },
      analysisDate: new Date().toISOString()
    };
    
    // Step 5: Store in database
    try {
      const storedAnalysis = await storeAnalysis(analysisResult);
      analysisResult.id = storedAnalysis.id;
      console.log(`✅ Analysis completed and stored for ${region}`);
    } catch (storageError) {
      console.warn('⚠️  Failed to store analysis, but continuing with result:', storageError.message);
    }
    
    // Step 6: Return results
    res.json(analysisResult);
    
  } catch (error) {
    console.error('❌ Analysis error:', error);
    res.status(500).json({
      error: 'Failed to complete analysis',
      message: error.message,
      region: req.body?.region || 'unknown'
    });
  }
});

/**
 * GET /api/analyze/history/:region
 * Get historical analysis data for a region
 */
router.get('/history/:region', async (req, res) => {
  try {
    const { region } = req.params;
    
    if (!region) {
      return res.status(400).json({
        error: 'Region parameter is required'
      });
    }
    
    console.log(`📊 Retrieving analysis history for ${region}`);
    
    // This would fetch from database in real implementation
    // For now, return mock historical data
    const mockHistory = [
      {
        id: 'hist_1',
        region,
        analysisDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString(),
        degradationScore: 0.15,
        summary: 'Previous analysis showed moderate degradation risk'
      },
      {
        id: 'hist_2',
        region,
        analysisDate: new Date(Date.now() - 90 * 24 * 60 * 60 * 1000).toISOString(),
        degradationScore: 0.12,
        summary: 'Earlier analysis indicated improving conditions'
      }
    ];
    
    res.json({
      region,
      history: mockHistory,
      totalAnalyses: mockHistory.length
    });
    
  } catch (error) {
    console.error('❌ History retrieval error:', error);
    res.status(500).json({
      error: 'Failed to retrieve analysis history',
      message: error.message
    });
  }
});

/**
 * GET /api/analyze/regions
 * Get list of available regions with sample data
 */
router.get('/regions', (req, res) => {
  const sampleRegions = [
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
  
  res.json({
    regions: sampleRegions,
    total: sampleRegions.length
  });
});

export default router;