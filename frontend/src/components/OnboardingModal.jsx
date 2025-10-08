import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const OnboardingModal = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const steps = [
    {
      title: "Welcome to ReGenLens",
      content: "Your AI-powered partner for land restoration. We analyze vegetation health and provide intelligent recommendations for sustainable land management.",
      icon: "🌱",
      action: "Get Started"
    },
    {
      title: "Analyze Land Health",
      content: "Click on any region in the map to analyze vegetation trends, degradation scores, and get AI-powered insights for restoration strategies.",
      icon: "🗺️",
      action: "Next"
    },
    {
      title: "Save & Track Progress",
      content: "Save your analyses, track restoration progress over time, and access your dashboard to manage all your land restoration projects.",
      icon: "📊",
      action: "Start Exploring"
    }
  ];

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      onClose();
    }
  };

  const handlePrevious = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSkip = () => {
    onClose();
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        {/* Backdrop */}
        <motion.div
          className="absolute inset-0 bg-black bg-opacity-50 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        />

        {/* Modal */}
        <motion.div
          className="relative bg-white rounded-2xl shadow-2xl max-w-md w-full mx-4 overflow-hidden"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.3 }}
        >
          {/* Progress Bar */}
          <div className="h-1 bg-gray-200">
            <motion.div
              className="h-full bg-gradient-to-r from-forest-500 to-earth-500"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>

          {/* Content */}
          <div className="p-8">
            {/* Step Indicator */}
            <div className="flex justify-center mb-6">
              <div className="flex space-x-2">
                {[1, 2, 3].map((step) => (
                  <div
                    key={step}
                    className={`w-2 h-2 rounded-full transition-colors duration-300 ${
                      step <= currentStep ? 'bg-forest-500' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Icon */}
            <motion.div
              className="text-center mb-6"
              key={currentStep}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              <span className="text-6xl block mb-4">{steps[currentStep - 1].icon}</span>
              
              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {steps[currentStep - 1].title}
              </h2>
              
              {/* Content */}
              <p className="text-gray-600 text-center leading-relaxed">
                {steps[currentStep - 1].content}
              </p>
            </motion.div>

            {/* Actions */}
            <div className="flex justify-between items-center mt-8">
              <button
                onClick={handleSkip}
                className="text-gray-500 hover:text-gray-700 text-sm font-medium transition-colors"
              >
                Skip tour
              </button>

              <div className="flex space-x-3">
                {currentStep > 1 && (
                  <button
                    onClick={handlePrevious}
                    className="px-4 py-2 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition-colors"
                  >
                    Previous
                  </button>
                )}
                
                <button
                  onClick={handleNext}
                  className="px-6 py-2 bg-gradient-to-r from-forest-500 to-earth-500 hover:from-forest-600 hover:to-earth-600 text-white rounded-lg font-medium transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  {steps[currentStep - 1].action}
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default OnboardingModal;