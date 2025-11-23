# ReGenLens 🌱
## AI-Powered Land Restoration Intelligence Platform

ReGenLens is a comprehensive web application that helps visualize land degradation and generates AI-driven recommendations for regeneration. Built for NGOs, farmers, government agencies, and environmental organizations.

![ReGenLens Platform](https://img.shields.io/badge/Status-Production%20Ready-green)
![Tech Stack](https://img.shields.io/badge/Stack-React%20%7C%20Node.js%20%7C%20Mapbox%20%7C%20Claude%20AI-blue)

---

## 📋 Table of Contents

- [Features](#-features)
- [Quick Start](#-quick-start)
- [Setup Guide](#-setup-guide)
- [Project Structure](#-project-structure)
- [Usage](#-usage)
- [Configuration](#-configuration)
- [Deployment](#-deployment)
- [Contributing](#-contributing)

---

## 🌟 Features

### Core Features
- **🗺️ Real 3D Interactive Maps** - Mapbox-powered satellite imagery with 3D terrain
- **📊 NDVI Analysis** - Real-time vegetation health monitoring
- **🤖 AI Recommendations** - Claude AI generates actionable restoration advice
- **📈 Trend Visualization** - Historical data with interactive charts
- **📱 Fully Responsive** - Works seamlessly on mobile, tablet, and desktop
- **🔐 Authentication** - Optional Clerk integration for user management
- **💾 Data Export** - Download comprehensive analysis reports

### Advanced Features
- 3D terrain elevation with real elevation data
- 3D building extrusion when zoomed in
- Auto-rotate mode for presentations
- Multiple map styles (satellite, terrain, dark mode)
- Real-world degradation hotspots across Africa
- Ecosystem health radar charts
- AI-powered restoration recommendations

---

## 🚀 Quick Start

### Prerequisites

- **Node.js 18+** installed
- **Free Mapbox Token** (required for maps) - [Get it here](https://account.mapbox.com/auth/signup/)
- **Clerk Account** (optional for auth) - [Sign up here](https://clerk.com)
- **Anthropic API Key** (optional for AI) - [Get it here](https://console.anthropic.com/)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Brandon05-dev/ReGenLens.git
   cd ReGenLens
   ```

2. **Install dependencies**
   ```bash
   # Install all dependencies (frontend + backend)
   npm run install:all
   ```

3. **Set up environment variables**
   
   **Frontend** (`frontend/.env`):
   ```env
   # Backend API
   VITE_API_URL=http://localhost:5000

   # Mapbox (REQUIRED for maps)
   # Get your FREE token: https://account.mapbox.com/access-tokens/
   VITE_MAPBOX_TOKEN=your_mapbox_token_here

   # Clerk Authentication (OPTIONAL)
   # Get your key: https://dashboard.clerk.com
   # VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
   ```

   **Backend** (`backend/.env`):
   ```env
   # Anthropic Claude AI (OPTIONAL - uses mock data if not set)
   ANTHROPIC_API_KEY=your_anthropic_api_key

   # Server Configuration
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   ```

4. **Start the development servers**
   ```bash
   # From the root directory
   npm run dev
   ```

   This starts:
   - Frontend at `http://localhost:5173`
   - Backend at `http://localhost:5000`

---

## 🔧 Setup Guide

### 1. Get Your FREE Mapbox Token (Required - 2 minutes)

The map requires a Mapbox token to display real-world satellite imagery and 3D terrain.

1. Sign up at [mapbox.com](https://account.mapbox.com/auth/signup/) (FREE - no credit card)
2. Go to [Access Tokens](https://account.mapbox.com/access-tokens/)
3. Copy your "Default public token"
4. Add it to `frontend/.env`:
   ```env
   VITE_MAPBOX_TOKEN=pk.your_actual_token_here
   ```
5. Restart the dev server

**Free tier includes**: 50,000 map loads/month (plenty for development!)

### 2. Set Up Authentication (Optional)

If you want user authentication:

1. Sign up at [clerk.com](https://clerk.com) (FREE)
2. Create a new application
3. Copy your Publishable Key
4. Add it to `frontend/.env`:
   ```env
   VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_key_here
   ```
5. Restart the dev server

### 3. Enable AI Features (Optional)

For real AI-powered recommendations:

1. Sign up at [Anthropic](https://console.anthropic.com/)
2. Get your API key
3. Add it to `backend/.env`:
   ```env
   ANTHROPIC_API_KEY=sk-ant-your_key_here
   ```
4. Restart the backend server

**Note**: The app works with mock data if no API key is provided.

---

## 🏗️ Project Structure

```
ReGenLens/
├── frontend/                      # React + Vite frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── MapView3D.jsx     # 3D Mapbox map component
│   │   │   ├── OnboardingModal.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pages/
│   │   │   ├── LandingPage.jsx   # Home page
│   │   │   ├── DashboardPageModern.jsx  # Main dashboard
│   │   │   ├── SignInPage.jsx    # Authentication
│   │   │   └── SignUpPage2.jsx
│   │   ├── store/
│   │   │   └── authStore.js      # Zustand state management
│   │   ├── App.jsx               # Main app component
│   │   └── main.jsx              # Entry point
│   ├── .env                      # Environment variables
│   └── package.json
│
├── backend/                       # Node.js + Express backend
│   ├── routes/
│   │   └── analyze.js            # Analysis API endpoints
│   ├── utils/
│   │   ├── claude.js             # Claude AI integration
│   │   └── gisMock.js            # Mock satellite data
│   ├── server.js                 # Express server
│   ├── .env                      # Backend environment variables
│   └── package.json
│
├── package.json                   # Root package.json
└── README.md                      # This file
```

---

## 📖 Usage

### 1. Analyze a Region

1. **Open the Dashboard** - Click "Get Started" on the landing page
2. **Select a Region** - Click on any marker or anywhere on the map
3. **View Analysis** - The insights panel shows:
   - Degradation score and key metrics
   - NDVI vegetation trend chart
   - Ecosystem health radar
   - AI-generated recommendations
4. **Export Report** - Click "Download Report" to save the analysis

### 2. Pre-configured Regions

The platform includes 8 real-world degradation hotspots across Africa:

- **Sahel Region, Mali** - Severe desertification
- **Northern Cape, South Africa** - Overgrazing impacts
- **Machakos County, Kenya** - Soil erosion
- **Upper East Region, Ghana** - Seasonal drought
- **Maradi Region, Niger** - Extreme desertification
- **Ethiopian Highlands** - Erosion challenges
- **Kalahari Desert, Botswana** - Sparse vegetation
- **Lake Chad Basin** - Shrinking lake ecosystem

### 3. Map Controls

**Left Panel:**
- 🛰️ **Satellite View** - High-resolution satellite imagery
- ⛰️ **Terrain View** - Topographic map
- 🌙 **Dark Mode** - Dark themed map
- ☑️ **3D Terrain** - Toggle terrain elevation
- ☑️ **3D Buildings** - Toggle building extrusion
- ☑️ **Auto Rotate** - Automatic camera rotation

**Right Panel:**
- 🧭 **Navigation Controls** - Zoom, rotate, tilt
- 📍 **Geolocate** - Find your location
- 📏 **Scale** - Distance measurement

### 4. Understanding NDVI

- **NDVI Range**: 0.0 to 1.0 (higher = healthier vegetation)
- **Healthy**: 0.7-1.0 (dense, healthy vegetation)
- **Moderate**: 0.5-0.7 (moderate vegetation)
- **Degraded**: 0.3-0.5 (sparse vegetation)
- **Severe**: 0.0-0.3 (bare soil or desert)

---

## ⚙️ Configuration

### Frontend Environment Variables

```env
# Backend API URL
VITE_API_URL=http://localhost:5000

# App Configuration
VITE_APP_NAME=ReGenLens
VITE_APP_VERSION=1.0.0

# Mapbox (REQUIRED)
VITE_MAPBOX_TOKEN=your_mapbox_token

# Clerk Authentication (OPTIONAL)
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
```

### Backend Environment Variables

```env
# Anthropic Claude AI (OPTIONAL)
ANTHROPIC_API_KEY=your_anthropic_key

# Server Configuration
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

---

## 🚀 Deployment

### Frontend (Vercel/Netlify)

1. **Build the frontend:**
   ```bash
   cd frontend
   npm run build
   ```

2. **Deploy the `dist` folder** to Vercel or Netlify

3. **Set environment variables** in your hosting dashboard:
   - `VITE_API_URL` - Your backend URL
   - `VITE_MAPBOX_TOKEN` - Your Mapbox token
   - `VITE_CLERK_PUBLISHABLE_KEY` - (Optional) Your Clerk key

### Backend (Railway/Render/Heroku)

1. **Deploy the `backend` folder** to your hosting service

2. **Set environment variables**:
   - `ANTHROPIC_API_KEY` - (Optional) Your Anthropic key
   - `PORT` - Server port (usually auto-set)
   - `NODE_ENV` - Set to `production`
   - `FRONTEND_URL` - Your frontend URL

3. **Update frontend** `VITE_API_URL` to point to your backend URL

---

## 🛠️ Development

### Available Scripts

**Root:**
```bash
npm run install:all  # Install all dependencies
npm run dev          # Start both frontend and backend
```

**Frontend:**
```bash
cd frontend
npm run dev          # Start dev server
npm run build        # Build for production
npm run preview      # Preview production build
```

**Backend:**
```bash
cd backend
npm run dev          # Start with nodemon
npm start            # Start production server
```

### Tech Stack

**Frontend:**
- React 18 + Vite
- TailwindCSS
- Mapbox GL JS + react-map-gl
- Framer Motion
- Recharts
- Clerk (optional)
- Zustand

**Backend:**
- Node.js + Express
- Anthropic SDK (Claude AI)
- Winston (logging)
- Helmet (security)
- CORS

---

## 📱 Responsive Design

The entire application is fully responsive:

- **Mobile** (< 768px): Optimized touch interface, compact controls
- **Tablet** (768px - 1024px): Balanced layout with toggleable panels
- **Desktop** (> 1024px): Full-featured interface with all panels

Key responsive features:
- Touch-friendly map controls
- Collapsible sidebar with backdrop
- Responsive typography and spacing
- Adaptive chart sizes
- Mobile-optimized forms

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 🙏 Acknowledgments

- **Mapbox** for incredible mapping technology
- **Anthropic** for Claude AI capabilities
- **Clerk** for authentication services
- **OpenStreetMap** contributors for map data
- **Land restoration community** for domain expertise

---

## 📞 Support

- **Issues**: Report bugs via [GitHub Issues](https://github.com/Brandon05-dev/ReGenLens/issues)
- **Discussions**: Ask questions in [GitHub Discussions](https://github.com/Brandon05-dev/ReGenLens/discussions)

---

**Built with ❤️ for land restoration and environmental conservation**

*ReGenLens - Regenerating landscapes through AI-powered intelligence*
