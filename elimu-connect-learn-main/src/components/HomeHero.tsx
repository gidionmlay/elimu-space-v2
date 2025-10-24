import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers, faStar, faGraduationCap, faChartLine, faCertificate } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

// Import SVG icons
import starSvg from '@/assets/svg/star.svg';
import dotSvg from '@/assets/svg/dot.svg';
import swirlSvg from '@/assets/svg/swirl.svg';
import triangleSvg from '@/assets/svg/triangle.svg';
import hexagonSvg from '@/assets/svg/hexagon.svg';
import circleSvg from '@/assets/svg/circle.svg';
import geneticSvg from '@/assets/svg/genetic-algorithm-svgrepo-com.svg';
import space1Svg from '@/assets/svg/space-1-svgrepo-com.svg';
import spaceSvg from '@/assets/svg/space-svgrepo-com.svg';

const HomeHero: React.FC = () => {
  return (
    <div className="home-hero-container">
      <section className="hero-section relative overflow-hidden flex flex-col md:flex-row items-center justify-between px-10 py-16 bg-gradient-to-br from-blue-50 via-white to-orange-50 dark:from-gray-900 dark:to-gray-800">
        
        {/* Floating SVG Background Elements */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          {/* Star icons - visible on all screens */}
          <motion.img
            src={starSvg}
            alt=""
            className="absolute top-[10%] left-[15%] w-6 md:w-8 opacity-30 dark:opacity-20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            style={{ willChange: 'transform' }}
          />
          <motion.img
            src={starSvg}
            alt=""
            className="absolute top-[25%] right-[20%] w-4 md:w-6 opacity-25 dark:opacity-15"
            animate={{ scale: [1, 1.15, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
            style={{ willChange: 'transform' }}
          />
          
          {/* Dot icons - visible on all screens */}
          <motion.img
            src={dotSvg}
            alt=""
            className="absolute top-[40%] left-[8%] w-3 md:w-4 opacity-30 dark:opacity-20"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
            style={{ willChange: 'transform' }}
          />
          <motion.img
            src={dotSvg}
            alt=""
            className="absolute bottom-[30%] right-[12%] w-4 md:w-5 opacity-25 dark:opacity-15"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
            style={{ willChange: 'transform' }}
          />
          
          {/* Swirl icons - hidden on mobile for performance */}
          <motion.img
            src={swirlSvg}
            alt=""
            className="hidden md:block absolute top-[60%] left-[25%] w-10 opacity-20 dark:opacity-10"
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
            style={{ willChange: 'transform' }}
          />
          
          {/* Triangle icons - visible on all screens */}
          <motion.img
            src={triangleSvg}
            alt=""
            className="absolute top-[15%] right-[35%] w-5 md:w-7 opacity-30 dark:opacity-20"
            animate={{ scale: [1, 1.12, 1] }}
            transition={{ duration: 4.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
            style={{ willChange: 'transform' }}
          />
          <motion.img
            src={triangleSvg}
            alt=""
            className="absolute bottom-[20%] left-[20%] w-4 md:w-6 opacity-25 dark:opacity-15"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: 'easeInOut', delay: 2.5 }}
            style={{ willChange: 'transform' }}
          />
          
          {/* Hexagon icons - hidden on mobile for performance */}
          <motion.img
            src={hexagonSvg}
            alt=""
            className="hidden md:block absolute top-[35%] right-[8%] w-8 opacity-20 dark:opacity-10"
            animate={{ scale: [1, 1.06, 1] }}
            transition={{ duration: 5.8, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
            style={{ willChange: 'transform' }}
          />
          
          {/* Circle icons - visible on all screens */}
          <motion.img
            src={circleSvg}
            alt=""
            className="absolute bottom-[45%] right-[30%] w-4 md:w-6 opacity-30 dark:opacity-20"
            animate={{ scale: [1, 1.1, 1] }}
            transition={{ duration: 4.8, repeat: Infinity, ease: 'easeInOut', delay: 1.2 }}
            style={{ willChange: 'transform' }}
          />
          
          {/* Space icons - hidden on mobile for performance */}
          <motion.img
            src={spaceSvg}
            alt=""
            className="hidden md:block absolute top-[50%] left-[5%] w-9 opacity-15 dark:opacity-8"
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2.8 }}
            style={{ willChange: 'transform' }}
          />
        </div>

        {/* Left Content */}
        <div className="md:w-1/2 space-y-6 relative z-10">
          <p className="text-green-600 font-semibold uppercase tracking-wide text-sm">From Learning to Earning</p>
          
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white leading-tight">
            Learn industry-relevant skills, get verified assessments, and access real <span className="text-orange-500">career opportunities.</span>
          </h1>

          <div className="flex items-center gap-4 mt-4 mb-6">
            <Link
              to="/courses"
              className="bg-[#1a237e] hover:bg-[#0d1429] text-white px-6 py-3 rounded-xl font-semibold shadow-md transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-blue-200"
            >
              Start A Course
            </Link>
          </div>

          {/* Stats */}
          <div className="flex items-center gap-10 pt-4">
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faUsers} className="text-green-600 text-sm" />
              </div>
              <p className="text-gray-700 font-semibold mt-2">1,235 learners</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <FontAwesomeIcon icon={faStar} className="text-yellow-600 text-sm" />
              </div>
              <p className="text-gray-700 font-semibold mt-2">4.8 rating</p>
            </div>
          </div>
      </div>

        {/* Right Image Placeholder */}
        <div className="md:w-1/2 mt-10 md:mt-0 flex justify-center relative z-10">
          {/* Additional floating SVGs for the right side - hidden on mobile for performance */}
          <div className="absolute inset-0 pointer-events-none">
            <motion.img
              src={geneticSvg}
              alt=""
              className="hidden md:block absolute top-[20%] right-[10%] w-7 opacity-15 dark:opacity-8"
              animate={{ scale: [1, 1.04, 1] }}
              transition={{ duration: 6.5, repeat: Infinity, ease: 'easeInOut', delay: 3.5 }}
              style={{ willChange: 'transform' }}
            />
            <motion.img
              src={space1Svg}
              alt=""
              className="hidden md:block absolute bottom-[15%] left-[10%] w-8 opacity-20 dark:opacity-12"
              animate={{ scale: [1, 1.07, 1] }}
              transition={{ duration: 5.2, repeat: Infinity, ease: 'easeInOut', delay: 4 }}
              style={{ willChange: 'transform' }}
            />
          </div>

          {/* Main Image with floating animation */}
          <img
            src="/src/assets/hero/hero-placeholder.png"
            alt="Hero image - Student with laptop"
            className="max-w-xs md:max-w-md rounded-lg object-cover animate-float"
            onError={(e) => {
              // Fallback placeholder if image doesn't exist
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.innerHTML = `
                  <div class="w-80 h-96 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center text-gray-400 text-center p-8 shadow-lg">
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
        </div>
    </section>

    {/* Benefits Section */}
    <section className="benefits-section bg-white py-16 px-10">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          
          {/* First Column - Launch Career */}
          <div className="benefit-card flex flex-col items-center text-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-all duration-300">
            <div className="benefit-icon-container w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 hover:scale-110 transition-transform duration-300">
              <FontAwesomeIcon 
                icon={faGraduationCap} 
                className="text-green-600 text-3xl"
                aria-label="Graduation cap icon"
              />
            </div>
            <h3 className="benefit-heading text-xl font-semibold text-gray-800 mb-2">
              Launch a new career
            </h3>
            <p className="benefit-text text-gray-600 text-base leading-relaxed">
              Start your professional journey today
            </p>
          </div>

          {/* Second Column - Gain Skills */}
          <div className="benefit-card flex flex-col items-center text-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-all duration-300">
            <div className="benefit-icon-container w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 hover:scale-110 transition-transform duration-300">
              <FontAwesomeIcon 
                icon={faChartLine} 
                className="text-green-600 text-3xl"
                aria-label="Chart line icon"
              />
            </div>
            <h3 className="benefit-heading text-xl font-semibold text-gray-800 mb-2">
              Gain in-demand skills
            </h3>
            <p className="benefit-text text-gray-600 text-base leading-relaxed">
              Learn industry-relevant technologies
            </p>
          </div>

          {/* Third Column - Earn Degree */}
          <div className="benefit-card flex flex-col items-center text-center space-y-4 p-6 rounded-lg hover:bg-gray-50 transition-all duration-300">
            <div className="benefit-icon-container w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mb-4 hover:scale-110 transition-transform duration-300">
              <FontAwesomeIcon 
                icon={faCertificate} 
                className="text-green-600 text-3xl"
                aria-label="Certificate icon"
              />
            </div>
            <h3 className="benefit-heading text-xl font-semibold text-gray-800 mb-2">
              Earn a degree
            </h3>
            <p className="benefit-text text-gray-600 text-base leading-relaxed">
              Get recognized qualifications
            </p>
          </div>

        </div>
      </div>
    </section>
    </div>
  );
};

// Add custom CSS for floating animation
const floatingStyles = `
  @keyframes float {
    0%, 100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-12px);
    }
  }
  
  .animate-float {
    animation: float 4s ease-in-out infinite;
  }
`;

// Inject styles into the document
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style');
  styleSheet.textContent = floatingStyles;
  document.head.appendChild(styleSheet);
}

export default HomeHero;
