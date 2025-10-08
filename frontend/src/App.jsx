import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import useAuthStore from './store/authStore';

// Pages
import LandingPage from './pages/LandingPage';
import WelcomeBackPage from './pages/WelcomeBackPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import DashboardPage from './pages/DashboardPage';
import DemoPage from './pages/DemoPage';
import AboutPage from './pages/AboutPage';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';
import OnboardingModal from './components/OnboardingModal';

function App() {
  const { initialize, user, hasVisited, loading } = useAuthStore();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Initialize auth on app start
  useEffect(() => {
    initialize();
  }, [initialize]);

  // Show onboarding for new authenticated users
  useEffect(() => {
    if (user && !localStorage.getItem('onboarding-completed')) {
      setShowOnboarding(true);
    }
  }, [user]);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('onboarding-completed', 'true');
  };

  // Show loading screen while initializing
  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-earth-50 to-forest-50 flex items-center justify-center">
        <motion.div
          className="bg-white rounded-2xl shadow-2xl p-8 text-center"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="mb-4">
            <span className="text-4xl">🌱</span>
          </div>
          <div className="flex items-center justify-center space-x-3">
            <div className="spinner"></div>
            <span className="text-forest-700 font-medium">
              Loading ReGenLens...
            </span>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Home Route - Smart routing based on user state */}
          <Route 
            path="/" 
            element={
              user ? (
                <Navigate to="/dashboard" replace />
              ) : hasVisited ? (
                <WelcomeBackPage />
              ) : (
                <LandingPage />
              )
            } 
          />

          {/* Authentication Routes */}
          <Route 
            path="/login" 
            element={
              <ProtectedRoute requireAuth={false}>
                <LoginPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/signup" 
            element={
              <ProtectedRoute requireAuth={false}>
                <SignUpPage />
              </ProtectedRoute>
            } 
          />

          {/* Protected Routes */}
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute requireAuth={true}>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />

          {/* Demo Route */}
          <Route path="/demo" element={<DemoPage />} />

          {/* About Page */}
          <Route path="/about" element={<AboutPage />} />

          {/* Catch all - redirect to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>

        {/* Onboarding Modal */}
        <OnboardingModal 
          isOpen={showOnboarding}
          onClose={handleOnboardingComplete}
        />
      </div>
    </Router>
  );
}

export default App;