# ReGenLens 🌱
## AI-Powered Land Restoration Intelligence Platform

ReGenLens is a comprehensive web application that helps visualize land degradation and generates AI-driven recommendations for regeneration. Built for NGOs, farmers, government agencies, and environmental organizations.

![ReGenLens Platform](https://img.shields.io/badge/Status-Production%20Ready-green)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20Supabase%20%7C%20Claude%20AI-blue)

## 🌟 Features

- **Interactive Map Analysis**: Click anywhere on the map to analyze land degradation
- **NDVI Trend Visualization**: Real-time satellite data analysis with trend charts
- **AI-Powered Recommendations**: Claude AI generates actionable restoration advice
- **Region Comparison**: Compare degradation across multiple areas
- **Report Generation**: Download comprehensive analysis reports
- **Historical Tracking**: Monitor restoration progress over time
- **Responsive Design**: Works seamlessly on desktop and mobile

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ installed
- Supabase account (optional - works with mock data)
- Anthropic API key for Claude AI (optional - falls back to mock responses)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Brandon05-dev/ReGenLens.git
   cd ReGenLens
   ```

2. **Install all dependencies**
   ```bash
   npm run install:all
   ```

3. **Set up environment variables**
   ```bash
   # Backend configuration
   cd backend
   cp .env.example .env
   # Edit .env with your API keys (optional for demo)
   ```

4. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

This will start:
- Frontend at `http://localhost:5173`
- Backend at `http://localhost:5000`

## 🏗️ Project Structure

```
regenlens/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── MapView.jsx          # Interactive Leaflet map
│   │   │   ├── InsightsPanel.jsx    # Analysis results panel
│   │   │   └── NDVIChart.jsx        # NDVI trend visualization
│   │   ├── App.jsx                  # Main application component
│   │   └── index.css                # Tailwind CSS styles
│   ├── package.json
│   └── vite.config.js
├── backend/                  # Node.js + Express backend
│   ├── routes/
│   │   └── analyze.js               # Analysis API endpoints
│   ├── utils/
│   │   ├── claude.js                # Claude AI integration
│   │   └── gisMock.js               # Mock satellite data
│   ├── supabaseClient.js            # Database client
│   ├── server.js                    # Express server
│   └── package.json
├── package.json              # Root package.json
└── README.md
```

## 🗺️ Usage Guide

### 1. Analyze a Region

1. **Select a Region**: Click anywhere on the interactive map or choose a pre-marked degradation hotspot
2. **View Analysis**: The insights panel will show:
   - NDVI vegetation trends over time
   - Degradation severity score
   - AI-generated restoration recommendations
3. **Download Report**: Export analysis data as JSON for further use

### 2. Sample Regions

The platform includes pre-configured regions with known degradation issues:

- **Machakos County, Kenya** - Soil erosion and drought stress
- **Rajasthan Desert, India** - Desert expansion
- **Sahel Region, Niger** - Desertification and overgrazing
- **São Paulo Farmland, Brazil** - Agricultural intensification
- **Inner Mongolia, China** - Grassland degradation

### 3. Understanding NDVI Data

- **NDVI Range**: 0.0 to 1.0 (higher = healthier vegetation)
- **Healthy**: 0.7-1.0 (green zones)
- **Moderate**: 0.5-0.7 (yellow zones)
- **Degraded**: 0.0-0.5 (red zones)

## 🔧 Configuration

### Environment Variables

#### Backend (.env)

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# Claude AI Configuration
ANTHROPIC_API_KEY=your_anthropic_api_key

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

### Database Setup (Supabase)

Create the analyses table in your Supabase dashboard:

```sql
CREATE TABLE analyses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  region TEXT NOT NULL,
  coordinates JSONB NOT NULL,
  ndvi_trend JSONB NOT NULL,
  degradation_score NUMERIC NOT NULL,
  ai_summary TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for performance
CREATE INDEX idx_analyses_region ON analyses(region);
CREATE INDEX idx_analyses_created_at ON analyses(created_at);
```

## 🧪 API Documentation

### Core Endpoints

#### POST `/api/analyze`

Analyze a region for land degradation.

**Request:**
```json
{
  "region": "Machakos, Kenya",
  "coordinates": {
    "lat": -1.5177,
    "lng": 37.2634
  }
}
```

**Response:**
```json
{
  "region": "Machakos, Kenya",
  "coordinates": { "lat": -1.5177, "lng": 37.2634 },
  "ndviTrend": [0.72, 0.68, 0.61, 0.54],
  "degradationScore": 0.25,
  "aiSummary": "Vegetation decline analysis and restoration recommendations...",
  "metadata": {
    "dataQuality": "high",
    "confidence": 92,
    "climateZone": "semi-arid"
  }
}
```

#### GET `/api/regions`

Get list of sample regions with degradation data.

#### GET `/api/health`

Server health check and configuration status.

## 🛠️ Development

### Frontend Development

```bash
cd frontend
npm run dev     # Start development server
npm run build   # Build for production
npm run preview # Preview production build
```

### Backend Development

```bash
cd backend
npm run dev     # Start with nodemon
npm start       # Start production server
```

### Tech Stack Details

#### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Leaflet** - Interactive maps
- **React-Leaflet** - React components for Leaflet
- **Recharts** - Data visualization
- **Framer Motion** - Smooth animations
- **Lucide React** - Beautiful icons

#### Backend
- **Node.js** - JavaScript runtime
- **Express** - Web framework
- **Supabase** - Database and authentication
- **Anthropic SDK** - Claude AI integration
- **Winston** - Logging
- **Helmet** - Security middleware
- **CORS** - Cross-origin resource sharing

## 🌍 Deployment

### Frontend (Vercel/Netlify)

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```

2. Deploy the `dist` folder to your preferred hosting service.

### Backend (Railway/Heroku/VPS)

1. Set environment variables on your hosting platform
2. Deploy the `backend` folder
3. Ensure the database is properly configured

### Environment-Specific Configurations

- **Development**: Uses localhost URLs and detailed logging
- **Production**: Optimized builds, security headers, rate limiting

## 🔍 Features in Detail

### AI-Powered Analysis

The platform integrates with Claude AI to provide:
- **Contextual Recommendations**: Based on region-specific factors
- **Actionable Insights**: Practical restoration techniques
- **Scientific Backing**: Evidence-based suggestions
- **Local Adaptation**: Considers climate and terrain

### Satellite Data Integration

Currently uses mock data that simulates:
- **NDVI Trends**: Normalized Difference Vegetation Index
- **Temporal Analysis**: Multi-year vegetation changes
- **Spatial Patterns**: Regional degradation hotspots
- **Data Quality Metrics**: Confidence and cloud coverage

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **Anthropic** for Claude AI capabilities
- **Supabase** for database and authentication services
- **OpenStreetMap** contributors for map data
- **Sentinel-2** satellite program for inspiration
- **Land restoration community** for domain expertise

## 📞 Support

- **Documentation**: Check this README and inline code comments
- **Issues**: Report bugs via GitHub Issues
- **Discussions**: Use GitHub Discussions for questions

---

**Built with ❤️ for land restoration and environmental conservation**

*ReGenLens - Regenerating landscapes through AI-powered intelligence*