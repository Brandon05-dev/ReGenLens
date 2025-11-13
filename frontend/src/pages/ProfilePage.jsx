import React from 'react';
import { motion } from 'framer-motion';
import { useUser, UserProfile } from '@clerk/clerk-react';
import Navbar from '../components/Navbar';

const ProfilePage = () => {
  const { user, isLoaded } = useUser();

  if (!isLoaded) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-earth-50 to-forest-50">
        <Navbar />
        <div className="flex items-center justify-center h-96">
          <div className="text-forest-700 font-medium">Loading profile...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-earth-50 to-forest-50">
      <Navbar />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-xl overflow-hidden"
        >
          {/* Header */}
          <div className="bg-gradient-to-r from-forest-600 to-earth-600 px-8 py-6">
            <div className="flex items-center space-x-4">
              <span className="text-4xl">👤</span>
              <div>
                <h1 className="text-2xl font-bold text-white">
                  Welcome, {user?.firstName || 'User'}!
                </h1>
                <p className="text-forest-100">
                  Manage your account settings and preferences
                </p>
              </div>
            </div>
          </div>

          {/* User Profile Component */}
          <div className="p-8">
            <UserProfile 
              appearance={{
                elements: {
                  rootBox: "w-full",
                  card: "shadow-none"
                }
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProfilePage;
