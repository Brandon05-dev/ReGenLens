# ReGenLens Authentication & Access System

An advanced authentication and access system for the ReGenLens AI-powered land restoration dashboard.

## 🚀 Features

### 1️⃣ Public Mode (Guest/New Visitors)
- **Landing Page**: Hero section with short description
- **Try Demo Button**: Loads mock NDVI map data (read-only)
- **Sign Up CTA**: Prominent call-to-action for full access
- **Visitor Tracking**: Saves `visited=true` in localStorage

### 2️⃣ Returning Users (Not Logged In)
- **Smart Detection**: Uses localStorage to detect returning users
- **Welcome Back Page**: Personalized return experience
- **Two Options**:
  - "Log In to Continue" → Login page
  - "Continue as Guest" → Demo mode
- **Earth-tone UI**: Green, brown, and white color scheme

### 3️⃣ Authenticated Users
- **Supabase Auth**: Email/password authentication
- **Dashboard Access**: Full-featured dashboard after login/signup
- **Features**:
  - Sidebar with saved analyses
  - Interactive map with real analysis
  - AI insights panel
  - User profile management
- **Smart Navbar**: "Welcome, {user.email}" + Logout
- **Protected Routes**: Secure access to dashboard

## 🛠️ Tech Stack

- **Frontend**: React + TailwindCSS + React Router
- **Authentication**: Supabase (@supabase/supabase-js)
- **State Management**: Zustand for auth state
- **Animations**: Framer Motion
- **Session Management**: `persistSession: true`
- **Route Protection**: Custom ProtectedRoute component

## 📦 Installation

1. **Install Dependencies**:
   ```bash
   cd frontend
   npm install
   ```

2. **Environment Setup**:
   ```bash
   cp .env.example .env
   ```
   
   Update `.env` with your Supabase credentials:
   ```env
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
   VITE_API_URL=http://localhost:5000
   ```

3. **Start Development Server**:
   ```bash
   npm run dev
   ```

## 🎨 UI Components

### Smart Navbar
- **Authenticated**: Dashboard | Profile | Logout
- **Guest**: Home | About | Login | Sign Up
- **Demo Mode**: Special indicator badge

### Pages
- **LandingPage**: Hero + features + CTA
- **WelcomeBackPage**: Returning user experience
- **LoginPage**: Email/password login form
- **SignUpPage**: Registration with user details
- **DashboardPage**: Full authenticated experience
- **DemoPage**: Guest mode with sample data

### Features
- **OnboardingModal**: 3-step introduction for new users
- **ProtectedRoute**: Authentication guard
- **Sidebar**: Saved analyses and profile management
- **Demo Mode**: Watermarks and upgrade CTAs

## 🎯 User Flow

```
New Visitor → Landing Page → Sign Up → Dashboard + Onboarding
             ↓
           Try Demo → Demo Mode → Upgrade CTA
             
Returning User → Welcome Back → Login → Dashboard
                              ↓
                           Continue as Guest → Demo Mode
```

## 🔧 Configuration

### Supabase Setup
1. Create a new Supabase project
2. Enable email authentication
3. Copy project URL and anon key to `.env`
4. Optional: Set up user profiles table

### Demo Mode
- Works without Supabase configuration
- Uses mock data from `src/data/demo.json`
- All features available but marked as demo

## 🚀 Deployment

The app is configured for Netlify deployment:

1. **Build**: `npm run build`
2. **Deploy**: Connect to Netlify
3. **Environment Variables**: Set in Netlify dashboard
4. **Redirects**: Configured in `public/_redirects`

## 📱 Responsive Design

- **Mobile-first**: TailwindCSS responsive utilities
- **Breakpoints**: sm, md, lg, xl
- **Touch-friendly**: Proper button sizes and spacing
- **Adaptive**: Different layouts for mobile/desktop

## 🎨 Design System

### Colors
- **Forest**: Primary green palette (forest-50 to forest-900)
- **Earth**: Secondary brown palette (earth-50 to earth-900)
- **Neutral**: Gray shades for text and backgrounds

### Components
- **btn-primary**: Forest green buttons
- **btn-secondary**: Earth tone buttons
- **Gradients**: Earth to forest transitions
- **Shadows**: Subtle depth with shadow-lg/xl

## 🔒 Security Features

- **Route Protection**: Authentication guards
- **Session Management**: Automatic token refresh  
- **Error Handling**: Graceful auth failures
- **CSRF Protection**: Built into Supabase
- **Secure Storage**: Token storage in httpOnly cookies

## 🧪 Demo Features

- **Sample Data**: Realistic NDVI analysis results
- **Mock Regions**: Pre-defined areas for testing
- **Upgrade CTAs**: Conversion-focused elements
- **Watermarks**: Clear demo indicators
- **Full Functionality**: All features accessible

## 📊 Analytics Ready

- **User Journey Tracking**: Landing → Demo → Signup
- **Conversion Funnels**: Track signup rates
- **Feature Usage**: Dashboard interaction metrics
- **Demo Engagement**: Time spent in demo mode

## 🎯 Next Steps

1. **A/B Testing**: Landing page variations
2. **Email Integration**: Welcome sequences
3. **Social Auth**: Google/GitHub login
4. **Team Features**: Organization management
5. **Premium Tiers**: Feature gating

---

Built with ❤️ for sustainable land restoration.