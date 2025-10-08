import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config();

// Initialize Supabase client
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.warn('⚠️  Supabase credentials not found. Some features will use mock data.');
}

export const supabase = supabaseUrl && supabaseKey 
  ? createClient(supabaseUrl, supabaseKey)
  : null;

/**
 * Store analysis result in Supabase database
 * @param {Object} analysisData - The analysis data to store
 * @returns {Promise<Object>} - The stored data with ID
 */
export async function storeAnalysis(analysisData) {
  if (!supabase) {
    console.log('📝 Mock storage: Analysis would be stored in database');
    return {
      id: `mock_${Date.now()}`,
      ...analysisData,
      created_at: new Date().toISOString()
    };
  }

  try {
    const { data, error } = await supabase
      .from('analyses')
      .insert([
        {
          region: analysisData.region,
          coordinates: analysisData.coordinates,
          ndvi_trend: analysisData.ndviTrend,
          degradation_score: analysisData.degradationScore,
          ai_summary: analysisData.aiSummary
        }
      ])
      .select()
      .single();

    if (error) {
      throw error;
    }

    console.log('✅ Analysis stored successfully:', data.id);
    return data;
  } catch (error) {
    console.error('❌ Error storing analysis:', error.message);
    throw error;
  }
}

/**
 * Retrieve analysis history for a region
 * @param {string} region - The region name
 * @returns {Promise<Array>} - Array of historical analyses
 */
export async function getAnalysisHistory(region) {
  if (!supabase) {
    console.log('📊 Mock data: Would retrieve analysis history');
    return [];
  }

  try {
    const { data, error } = await supabase
      .from('analyses')
      .select('*')
      .eq('region', region)
      .order('created_at', { ascending: false })
      .limit(10);

    if (error) {
      throw error;
    }

    return data || [];
  } catch (error) {
    console.error('❌ Error retrieving analysis history:', error.message);
    throw error;
  }
}

/**
 * Initialize database tables
 * This creates the analyses table if it doesn't exist
 */
export async function initializeDatabase() {
  if (!supabase) {
    console.log('🔧 Skipping database initialization (no Supabase connection)');
    return;
  }

  try {
    // Check if table exists by trying to select from it
    const { data, error } = await supabase
      .from('analyses')
      .select('id')
      .limit(1);

    if (error) {
      console.log('📋 Database table needs to be created manually in Supabase dashboard');
      console.log('💡 Use this SQL to create the analyses table:');
      console.log(`
CREATE TABLE analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  region TEXT NOT NULL,
  coordinates JSONB NOT NULL,
  ndvi_trend JSONB NOT NULL,
  degradation_score NUMERIC NOT NULL,
  ai_summary TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index for faster queries
CREATE INDEX idx_analyses_region ON analyses(region);
CREATE INDEX idx_analyses_created_at ON analyses(created_at);
      `);
    } else {
      console.log('✅ Database connection verified');
    }
  } catch (error) {
    console.error('❌ Database initialization error:', error.message);
  }
}