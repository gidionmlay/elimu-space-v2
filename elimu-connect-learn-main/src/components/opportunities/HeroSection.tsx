import React from 'react';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen bg-gradient-to-br from-[#FDF6E3] to-blue-50 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 z-0">
        {/* Decorative dots - top left */}
        <div className="absolute top-8 left-10 w-3 h-3 bg-orange-400 rounded-full opacity-60"></div>
        <div className="absolute top-16 left-20 w-2 h-2 bg-yellow-400 rounded-full opacity-50"></div>
        <div className="absolute top-24 left-16 w-2.5 h-2.5 bg-orange-300 rounded-full opacity-40"></div>
        
        {/* Wavy line - bottom left */}
        <div className="absolute bottom-20 left-0 w-32 h-2 bg-blue-200 rounded-full opacity-30 transform rotate-12"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-32 right-20 w-4 h-4 border-2 border-blue-300 rounded-full opacity-40"></div>
        <div className="absolute bottom-32 right-16 w-3 h-3 border-2 border-orange-300 rounded-full opacity-30"></div>
      </div>

      {/* Main content container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 lg:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          
          {/* Left Column - Text Content */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Subheading */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <p className="text-sm text-blue-800 font-semibold tracking-wide uppercase">
                Start your favourite course
              </p>
            </motion.div>

            {/* Main heading */}
            <motion.h1 
              className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              Now learning from anywhere, and build your{' '}
              <span className="text-green-600 relative">
                bright career.
                <span className="absolute -bottom-2 left-0 w-full h-1 bg-green-600 opacity-30 rounded-full"></span>
              </span>
            </motion.h1>

            {/* Supporting text */}
            <motion.p 
              className="text-lg text-gray-600 max-w-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
            >
              It has survived not only five centuries but also the leap into electronic typesetting.
            </motion.p>

            {/* CTA Button */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.8 }}
            >
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold rounded-full px-6 py-3 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-200">
                Start A Course
              </button>
            </motion.div>

            {/* Play button placeholder */}
            <motion.div
              className="flex items-center gap-4 mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.0 }}
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md cursor-pointer hover:shadow-lg transition-all duration-300">
                <FontAwesomeIcon icon={faPlay} className="w-4 h-4 text-green-600 ml-1" />
              </div>
              <span className="text-gray-600 font-medium">Watch Demo</span>
            </motion.div>
          </motion.div>

          {/* Right Column - Hero Image and Stats */}
          <motion.div 
            className="relative flex justify-center lg:justify-end"
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            {/* Main hero image placeholder */}
            <div className="relative">
              <img
                src="/src/assets/hero/hero-placeholder.png"
                alt="Hero image placeholder - Student with laptop"
                className="max-w-md w-full object-contain rounded-2xl shadow-xl"
                onError={(e) => {
                  // Fallback placeholder if image doesn't exist
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.innerHTML = `
                      <div class="w-80 h-96 bg-gradient-to-br from-green-100 to-blue-100 rounded-2xl flex items-center justify-center text-gray-400 text-center p-8 shadow-xl">
                        <div>
                          <div class="w-16 h-16 bg-green-200 rounded-full flex items-center justify-center mb-4 mx-auto">
                            <svg class="w-8 h-8 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                            </svg>
                          </div>
                          <p class="text-lg font-medium">Hero Image Placeholder</p>
                          <p class="text-sm mt-2">Student with laptop</p>
                        </div>
                      </div>
                    `;
                  }
                }}
              />

              {/* Decorative stat cards */}
              {/* Courses stat card */}
              <motion.div 
                className="absolute top-8 -left-4 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.2 }}
              >
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                    </svg>
                  </div>
                  <p className="text-sm font-medium text-gray-700">1,235 Courses</p>
                </div>
              </motion.div>

              {/* Rating stat card */}
              <motion.div 
                className="absolute top-16 -right-8 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-lg shadow-lg"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 1.4 }}
              >
                <div className="flex items-center gap-2">
                  <div className="flex items-center">
                    <span className="text-lg font-bold text-gray-800">4.8</span>
                    <div className="flex ml-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-3 h-3 text-yellow-400 fill-current" viewBox="0 0 24 24">
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                        </svg>
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-gray-600 ml-1">Rating</p>
                </div>
              </motion.div>

              {/* Decorative arrows */}
              {/* Arrow pointing to courses stat */}
              <motion.div
                className="absolute top-20 left-8 w-16 h-8"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 1, delay: 1.6 }}
              >
                <svg viewBox="0 0 64 32" className="w-full h-full">
                  <path
                    d="M8 16 Q32 8 56 16"
                    stroke="#fbbf24"
                    strokeWidth="2"
                    strokeDasharray="4,4"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M52 12 L56 16 L52 20"
                    stroke="#fbbf24"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              {/* Arrow pointing to rating stat */}
              <motion.div
                className="absolute bottom-20 right-8 w-12 h-16"
                initial={{ opacity: 0, pathLength: 0 }}
                animate={{ opacity: 1, pathLength: 1 }}
                transition={{ duration: 1, delay: 1.8 }}
              >
                <svg viewBox="0 0 48 64" className="w-full h-full">
                  <path
                    d="M24 48 Q24 32 24 16"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                  />
                  <path
                    d="M20 20 L24 16 L28 20"
                    stroke="#10b981"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Additional decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-green-50/50 to-transparent pointer-events-none"></div>
    </section>
  );
};

export default HeroSection;