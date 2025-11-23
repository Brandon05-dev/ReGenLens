import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SignIn } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';
import { Sparkles, Shield, Zap, LogIn } from 'lucide-react';

const SignInPage = () => {
  const [showSignIn, setShowSignIn] = useState(false);
  const clerkKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
  
  // If no Clerk key, show setup message
  if (!clerkKey) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-forest-50 via-earth-50 to-sage-50 flex items-center justify-center p-8">
        <div className="max-w-2xl bg-white rounded-2xl shadow-2xl p-12 text-center">
          <span className="text-6xl mb-6 block">🔐</span>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Authentication Setup Required</h1>
          <p className="text-gray-600 mb-6">
            To use sign-in functionality, you need to configure Clerk authentication.
          </p>
          <div className="bg-forest-50 border-2 border-forest-200 rounded-lg p-6 mb-6 text-left">
            <h3 className="font-semibold text-forest-800 mb-3">Quick Setup:</h3>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Sign up at <a href="https://clerk.com" target="_blank" rel="noopener noreferrer" className="text-forest-600 hover:underline">clerk.com</a></li>
              <li>Create a new application</li>
              <li>Copy your Publishable Key</li>
              <li>Add it to <code className="bg-gray-100 px-2 py-1 rounded">frontend/.env</code></li>
              <li>Restart the dev server</li>
            </ol>
          </div>
          <div className="flex gap-4 justify-center">
            <Link
              to="/"
              className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
            >
              Back to Home
            </Link>
            <Link
              to="/dashboard"
              className="px-6 py-3 bg-forest-600 text-white rounded-lg hover:bg-forest-700 transition-colors"
            >
              Continue to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-forest-50 via-earth-50 to-sage-50 flex">
      {/* Left Side - Branding & Features */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-forest-600 to-forest-800 p-12 flex-col justify-between relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-forest-500 rounded-full opacity-10 blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-earth-400 rounded-full opacity-10 blur-3xl"></div>
        
        <div className="relative z-10">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 mb-16">
            <span className="text-5xl">🌱</span>
            <span className="text-3xl font-bold text-white">ReGenLens</span>
          </Link>

          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
              Welcome back to the future of land restoration
            </h1>
            <p className="text-xl text-forest-100 mb-12">
              Continue your journey in regenerating our planet with AI-powered insights
            </p>

            {/* Features */}
            <div className="space-y-6">
              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
              >
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                  <Sparkles className="w-6 h-6 text-earth-200" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">AI-Powered Analysis</h3>
                  <p className="text-forest-100">Get instant insights from satellite data and advanced AI models</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 }}
              >
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                  <Shield className="w-6 h-6 text-earth-200" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Secure & Private</h3>
                  <p className="text-forest-100">Your data is encrypted and protected with enterprise-grade security</p>
                </div>
              </motion.div>

              <motion.div
                className="flex items-start space-x-4"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.6 }}
              >
                <div className="bg-white/10 backdrop-blur-sm p-3 rounded-lg">
                  <Zap className="w-6 h-6 text-earth-200" />
                </div>
                <div>
                  <h3 className="text-white font-semibold text-lg mb-1">Real-Time Monitoring</h3>
                  <p className="text-forest-100">Track vegetation health and restoration progress over time</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Footer Quote */}
        <motion.div
          className="relative z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <blockquote className="text-forest-100 italic text-lg">
            "The best time to plant a tree was 20 years ago. The second best time is now."
          </blockquote>
          <p className="text-forest-200 mt-2">— Chinese Proverb</p>
        </motion.div>
      </div>

      {/* Right Side - Sign In Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <motion.div
          className="w-full max-w-md"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Mobile Logo */}
          <div className="lg:hidden text-center mb-8">
            <Link to="/" className="inline-flex items-center space-x-2">
              <span className="text-4xl">🌱</span>
              <span className="text-2xl font-bold text-forest-700">ReGenLens</span>
            </Link>
          </div>

          {!showSignIn ? (
            /* Welcome Screen with Sign In Button */
            <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
              <div className="mb-6">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome Back!</h2>
                <p className="text-gray-600">Sign in to access your ReGenLens dashboard</p>
              </div>

              <motion.button
                onClick={() => setShowSignIn(true)}
                className="w-full bg-forest-600 hover:bg-forest-700 text-white py-4 px-6 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <LogIn className="w-5 h-5" />
                Sign In
              </motion.button>

              <div className="mt-6 space-y-4">
                <p className="text-sm text-gray-600">
                  Don't have an account?{' '}
                  <Link
                    to="/sign-up"
                    className="font-semibold text-forest-600 hover:text-forest-700 transition-colors"
                  >
                    Sign up for free
                  </Link>
                </p>
                <Link
                  to="/"
                  className="inline-flex items-center text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ← Back to Home
                </Link>
              </div>
            </div>
          ) : (
            /* Sign In Component */
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="bg-white rounded-2xl shadow-2xl p-8">
                <div className="mb-6">
                  <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign in</h2>
                  <p className="text-gray-600">Welcome back! Please enter your details.</p>
                </div>

                <SignIn
                  appearance={{
                    elements: {
                      rootBox: "w-full",
                      card: "shadow-none p-0",
                      headerTitle: "hidden",
                      headerSubtitle: "hidden",
                      socialButtonsBlockButton: 
                        "bg-white border-2 border-gray-200 hover:border-forest-300 hover:bg-forest-50 text-gray-700 font-medium transition-all duration-200",
                      socialButtonsBlockButtonText: "font-medium",
                      dividerLine: "bg-gray-200",
                      dividerText: "text-gray-500",
                      formButtonPrimary: 
                        "bg-forest-600 hover:bg-forest-700 text-white font-medium py-3 transition-all duration-200 shadow-sm hover:shadow-md",
                      formFieldInput: 
                        "border-gray-300 focus:border-forest-500 focus:ring-forest-500 rounded-lg",
                      footerActionLink: "text-forest-600 hover:text-forest-700 font-medium",
                      identityPreviewText: "text-gray-700",
                      formFieldLabel: "text-gray-700 font-medium",
                    },
                  }}
                  routing="path"
                  path="/sign-in"
                  signUpUrl="/sign-up"
                  redirectUrl="/dashboard"
                />
              </div>

              {/* Additional Links */}
              <div className="mt-6 text-center space-y-4">
                <button
                  onClick={() => setShowSignIn(false)}
                  className="text-sm text-gray-500 hover:text-gray-700 transition-colors"
                >
                  ← Back
                </button>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default SignInPage;
