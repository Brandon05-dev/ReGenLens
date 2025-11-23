import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import useAuthStore from './store/authStore';

// Pages
import LandingPage from './pages/LandingPage';
import WelcomeBackPage from './pages/WelcomeBackPage';
import DashboardPage from './pages/DashboardPage';
import DashboardPageModern from './pages/DashboardPageModern';
import DemoPage from './pages/DemoPage';
import AboutPage from './pages/AboutPage';
import ProfilePage from './pages/ProfilePage';
import SignInPage from './pages/SignInPage';
import SignUpPage2 from './pages/SignUpPage2';

// Components
import OnboardingModal from './components/OnboardingModal';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  // Make Clerk optional - use try/catch to handle when ClerkProvider is not available
  let user = null;
  let isLoaded = true;
  
  try {
    const clerkUser = useUser();
    user = clerkUser.user;
    isLoaded = clerkUser.isLoaded;
  } catch (e) {
    // Clerk not available, continue without auth
    console.log('Running without Clerk authentication');
  }

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
            element={<LandingPage />} 
          />

          {/* Auth Routes */}
          <Route path="/sign-in/*" element={<SignInPage />} />
          <Route path="/sign-up/*" element={<SignUpPage2 />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardPageModern />} />
          <Route path="/dashboard/classic" element={<DashboardPage />} />

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