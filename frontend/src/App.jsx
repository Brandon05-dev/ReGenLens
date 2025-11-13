import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import useAuthStore from './store/authStore';

// Pages
import LandingPage from './pages/LandingPage';
import WelcomeBackPage from './pages/WelcomeBackPage';
import DashboardPage from './pages/DashboardPage';
import DemoPage from './pages/DemoPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';

// Components
import Navbar from './components/Navbar';
import OnboardingModal from './components/OnboardingModal';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  const { user, isLoaded } = useUser();
  const { hasVisited, setUser } = useAuthStore();
  const [showOnboarding, setShowOnboarding] = useState(false);

  // Sync Clerk user with local store
  useEffect(() => {
    if (isLoaded && user) {
      setUser(user);
    }
  }, [user, isLoaded, setUser]);

  // Show onboarding for first-time users on dashboard
  useEffect(() => {
    if (!localStorage.getItem('onboarding-completed')) {
      const currentPath = window.location.pathname;
      if (currentPath === '/dashboard') {
        setShowOnboarding(true);
      }
    }
  }, []);

  const handleOnboardingComplete = () => {
    setShowOnboarding(false);
    localStorage.setItem('onboarding-completed', 'true');
  };

  return (
    <Router>
      <div className="min-h-screen">
        <Routes>
          {/* Home Route */}
          <Route 
            path="/" 
            element={
              hasVisited ? (
                <WelcomeBackPage />
              ) : (
                <LandingPage />
              )
            } 
          />

          {/* Dashboard Route - now open to all */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Demo Route */}
          <Route path="/demo" element={<DemoPage />} />

          {/* About Page */}
          <Route path="/about" element={<AboutPage />} />

          {/* Profile Page - Protected Route */}
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute requireAuth={true}>
                <ProfilePage />
              </ProtectedRoute>
            } 
          />

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