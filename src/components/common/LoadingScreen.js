import React, { useState, useEffect } from 'react';
import logo from '../../assets/image/logo512.png';

const LoadingScreen = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        if (prevProgress >= 100) {
          return 100;
        }
        // Random increment for more natural loading feel
        const increment = Math.random() * 15 + 5;
        return Math.min(prevProgress + increment, 100);
      });
    }, 300);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="flex flex-col items-center space-y-6 px-4">
        {/* Logo Container with Animation */}
        <div className="relative">
          {/* Animated Rings */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-blue-200 dark:border-blue-900 animate-ping opacity-20"></div>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-28 h-28 rounded-full border-2 border-blue-300 dark:border-blue-800 animate-pulse"></div>
          </div>
          
          {/* Logo */}
          <div className="relative z-10 bg-white dark:bg-gray-800 rounded-full p-3 shadow-xl">
            <img 
              src={logo} 
              alt="Dockyard Logo" 
              className="w-16 h-16 object-contain animate-pulse"
            />
          </div>
        </div>

        {/* Brand Name */}
        <div className="text-center space-y-1">
          <h1 className="text-2xl font-bold text-gray-800 dark:text-white tracking-wide">
            Dockyard CRM
          </h1>
          <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">
            Ship Management System
          </p>
        </div>

        {/* Progress Bar Container */}
        <div className="w-64 max-w-md">
          {/* Progress Bar Background */}
          <div className="relative h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden shadow-inner">
            {/* Animated Progress Bar */}
            <div
              className="absolute top-0 left-0 h-full bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 dark:from-blue-600 dark:via-blue-700 dark:to-blue-800 rounded-full transition-all duration-300 ease-out shadow-lg"
              style={{ width: `${progress}%` }}
            >
              {/* Shimmer Effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30 animate-shimmer"></div>
            </div>
            
            {/* Glowing Effect on Progress Bar */}
            <div
              className="absolute top-0 left-0 h-full bg-blue-400 dark:bg-blue-500 rounded-full blur-sm opacity-50 transition-all duration-300 ease-out"
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
      </div>

      {/* Custom CSS for shimmer animation */}
      <style>{`
        @keyframes shimmer {
          0% {
            transform: translateX(-100%);
          }
          100% {
            transform: translateX(100%);
          }
        }
        .animate-shimmer {
          animation: shimmer 1.5s infinite;
        }
      `}</style>
    </div>
  );
};

export default LoadingScreen;
