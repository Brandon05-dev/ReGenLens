import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Claude AI client
const anthropic = process.env.ANTHROPIC_API_KEY 
  ? new Anthropic({
      apiKey: process.env.ANTHROPIC_API_KEY,
    })
  : null;

/**
 * Generate AI-powered land restoration recommendations using Claude
 * @param {string} region - The region name
 * @param {Array} ndviTrend - Array of NDVI values over time
 * @param {number} degradationScore - Calculated degradation score (0-1)
 * @param {Object} coordinates - Lat/lng coordinates
 * @returns {Promise<string>} - AI-generated recommendations
 */
export async function generateRecommendations(region, ndviTrend, degradationScore, coordinates) {
  if (!anthropic) {
    console.log('🤖 Mock AI: Generating fallback recommendations');
    return generateMockRecommendations(region, ndviTrend, degradationScore);
  }

  try {
    const prompt = createAnalysisPrompt(region, ndviTrend, degradationScore, coordinates);
    
    console.log('🤖 Calling Claude AI for recommendations...');
    
    const message = await anthropic.messages.create({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 300,
      messages: [
        {
          role: 'user',
          content: prompt
        }
      ]
    });

    const aiSummary = message.content[0].text;
    console.log('✅ AI recommendations generated successfully');
    
    return aiSummary;
  } catch (error) {
    console.error('❌ Claude AI Error:', error.message);
    console.log('🔄 Falling back to mock recommendations');
    return generateMockRecommendations(region, ndviTrend, degradationScore);
  }
}

/**
 * Create a detailed prompt for Claude AI analysis
 */
function createAnalysisPrompt(region, ndviTrend, degradationScore, coordinates) {
  const trendDescription = describeTrend(ndviTrend);
  const severityLevel = getSeverityLevel(degradationScore);
  
  return `As a land restoration expert, analyze this satellite data for ${region}:

VEGETATION DATA:
- Location: ${region} (${coordinates.lat?.toFixed(4)}, ${coordinates.lng?.toFixed(4)})
- NDVI Trend (2022-2025): ${ndviTrend.join(' → ')}
- Trend Analysis: ${trendDescription}
- Degradation Score: ${(degradationScore * 100).toFixed(1)}% (${severityLevel})

ANALYSIS REQUIREMENTS:
1. Briefly explain what the NDVI trend indicates about vegetation health
2. Identify likely causes of degradation based on the pattern and region
3. Provide 3-4 specific, actionable restoration recommendations
4. Consider local climate, terrain, and typical land use patterns

FORMAT: Provide a concise summary in under 150 words, focusing on practical restoration actions that landowners or organizations can implement.

Response should be professional yet accessible, avoiding technical jargon.`;
}

/**
 * Analyze NDVI trend pattern
 */
function describeTrend(ndviTrend) {
  if (ndviTrend.length < 2) return 'insufficient data';
  
  const first = ndviTrend[0];
  const last = ndviTrend[ndviTrend.length - 1];
  const change = ((last - first) / first * 100);
  
  if (change > 10) return 'improving vegetation health';
  if (change > -10) return 'stable vegetation with minor fluctuations';
  if (change > -25) return 'moderate vegetation decline';
  return 'severe vegetation degradation';
}

/**
 * Get severity level description
 */
function getSeverityLevel(score) {
  if (score < 0.1) return 'Low Risk';
  if (score < 0.25) return 'Moderate Risk';
  if (score < 0.5) return 'High Risk';
  return 'Severe Risk';
}

/**
 * Generate mock recommendations when Claude AI is not available
 */
function generateMockRecommendations(region, ndviTrend, degradationScore) {
  const templates = [
    `Vegetation analysis for ${region} shows ${(degradationScore * 100).toFixed(1)}% degradation risk. The NDVI trend from ${ndviTrend[0]?.toFixed(2)} to ${ndviTrend[ndviTrend.length - 1]?.toFixed(2)} indicates declining plant health.

RECOMMENDED ACTIONS:
1. **Soil Conservation**: Implement contour farming and terracing to prevent erosion
2. **Vegetation Restoration**: Plant native drought-resistant species suited to local conditions  
3. **Water Management**: Install rainwater harvesting systems and improve irrigation efficiency
4. **Sustainable Practices**: Adopt rotational grazing and reduce overuse of degraded areas

These interventions can help restore vegetation cover and improve long-term land productivity.`,

    `The ${region} area exhibits ${(degradationScore * 100).toFixed(1)}% degradation with declining NDVI values. This pattern suggests environmental stress requiring immediate intervention.

RESTORATION STRATEGY:
1. **Erosion Control**: Establish windbreaks and plant ground cover to stabilize soil
2. **Nutrient Management**: Apply organic matter and practice sustainable fertilization
3. **Water Conservation**: Create retention ponds and implement drip irrigation
4. **Community Engagement**: Train local farmers in regenerative agriculture techniques

Early action can reverse degradation trends and restore ecosystem health within 2-3 years.`
  ];

  const selectedTemplate = templates[Math.floor(Math.random() * templates.length)];
  console.log('📝 Generated mock AI recommendations');
  
  return selectedTemplate;
}