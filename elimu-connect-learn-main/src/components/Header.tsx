import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faChevronDown, 
  faSearch, 
  faBars, 
  faTimes,
  faBook,
  faInfoCircle,
  faBriefcase,
  faGraduationCap,
  faPhone,
  faUser
} from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import coursesData from '@/data/courses.json';

interface HeaderProps {
  showCourseSearch?: boolean;
  showHeroSection?: boolean;
}

const Header: React.FC<HeaderProps> = ({ showCourseSearch = true, showHeroSection = true }) => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isExploreOpen, setIsExploreOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const exploreRef = useRef<HTMLDivElement>(null);

  // Scroll detection for sticky navbar shadow effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close explore dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (exploreRef.current && !exploreRef.current.contains(event.target as Node)) {
        setIsExploreOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Manage body class for dropdown
  useEffect(() => {
    if (isExploreOpen) {
      document.body.classList.add('dropdown-open');
    } else {
      document.body.classList.remove('dropdown-open');
    }
    
    return () => {
      document.body.classList.remove('dropdown-open');
    };
  }, [isExploreOpen]);

  // Manage body scroll lock for mobile menu
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // ESC key listener for mobile menu
  useEffect(() => {
    const handleEscKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('keydown', handleEscKey);
    return () => document.removeEventListener('keydown', handleEscKey);
  }, [isMobileMenuOpen]);

  // Explore dropdown links
  const exploreLinks = [
    { label: 'Courses', path: '/courses', icon: faBook },
    { label: 'About Us', path: '/about', icon: faInfoCircle },
    { label: 'Opportunities', path: '/opportunities', icon: faBriefcase },
    { label: 'Learn Beyond', path: '/courses', icon: faGraduationCap },
    { label: 'Contact Us', path: '/about', icon: faPhone }
  ];

  // Handle search functionality
  const handleSearch = (query: string) => {
    if (!query.trim()) return;

    const course = coursesData.find(c => 
      c.title.toLowerCase().includes(query.toLowerCase()) ||
      c.category.toLowerCase().includes(query.toLowerCase())
    );

    if (course) {
      navigate(`/course/${course.id}`);
    } else {
      navigate('/courses#request-course');
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSearch(searchQuery);
  };

  const handleSearchKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchQuery);
    }
  };

  return (
    <>
      {/* Main Header - Enhanced with sticky behavior and scroll effects */}
      <header 
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
          isScrolled 
            ? 'bg-white/90 backdrop-blur-md border-b border-gray-200 shadow-lg dark:bg-gray-900/90 dark:border-gray-700' 
            : 'bg-white/80 backdrop-blur-sm border-b border-gray-100 dark:bg-gray-900/80 dark:border-gray-800'
        }`}
        style={{ overflow: 'visible' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between px-4 py-3" style={{ overflow: 'visible' }}>
          
          {/* Left: Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="flex items-center">
              <img 
                src="/logo.png" 
                alt="Elimu Space" 
                className="h-8 md:h-10 w-auto"
              />
            </Link>
          </div>

          {/* Center: Explore + Search - Hidden on mobile */}
          <div className="hidden md:flex flex-1 items-center justify-center max-w-2xl mx-8" style={{ overflow: 'visible' }}>
            <div className="flex items-center w-full" style={{ overflow: 'visible' }}>
              
              {/* Explore Dropdown */}
              <div className="relative mr-4" ref={exploreRef}>
                <button
                  onClick={() => {
                    console.log('Explore clicked, current state:', isExploreOpen);
                    setIsExploreOpen(!isExploreOpen);
                  }}
                  className="flex items-center text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium"
                >
                  Explore
                  <FontAwesomeIcon 
                    icon={faChevronDown} 
                    className={`ml-1 w-3 h-3 transition-transform duration-200 ${
                      isExploreOpen ? 'rotate-180' : ''
                    }`} 
                  />
                </button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {isExploreOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -10, scale: 0.95 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                      className="absolute top-full left-0 mt-3 w-80 bg-white rounded-xl shadow-2xl border border-gray-200 py-3 z-[9999] dark:bg-gray-800 dark:border-gray-700"
                    >
                      {exploreLinks.map((link, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            to={link.path}
                            className="flex items-center px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200 border-b border-gray-100 last:border-b-0 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-green-400"
                            onClick={() => setIsExploreOpen(false)}
                          >
                            <FontAwesomeIcon icon={link.icon} className="w-5 h-5 mr-4 text-green-500" />
                            <span className="font-medium">{link.label}</span>
                          </Link>
                        </motion.div>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Search Bar */}
              <form onSubmit={handleSearchSubmit} className="flex-1">
                <div className="flex items-center bg-white border border-gray-200 rounded-full px-4 py-2 shadow-sm focus-within:ring-2 focus-within:ring-green-500 w-full dark:bg-gray-800 dark:border-gray-600">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={handleSearchKeyDown}
                    placeholder="What do you want to learn?"
                    className="flex-1 outline-none text-gray-700 placeholder-gray-400 dark:text-gray-200 dark:placeholder-gray-400"
                  />
                  <button
                    type="submit"
                    className="ml-2 w-8 h-8 bg-green-600 text-white rounded-full flex items-center justify-center hover:bg-green-700 transition-colors duration-200"
                  >
                    <FontAwesomeIcon icon={faSearch} className="w-4 h-4" />
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Right: Auth Buttons - Hidden on mobile */}
          <div className="hidden md:flex flex-shrink-0 items-center space-x-4">
            {isAuthenticated ? (
              <div className="flex items-center space-x-4">
                <Link
                  to="/dashboard"
                  className="text-gray-700 hover:text-green-600 transition-colors duration-200 font-medium dark:text-gray-200 dark:hover:text-green-400"
                >
                  Dashboard
                </Link>
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-green-500 to-orange-500 flex items-center justify-center">
                  {user?.profile_image ? (
                    <img
                      src={user.profile_image}
                      alt={user.full_name || user?.username}
                      className="w-full h-full rounded-full object-cover"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-white" />
                  )}
                </div>
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-green-600 hover:text-green-700 font-medium transition-colors duration-200 dark:text-green-400 dark:hover:text-green-300"
                >
                  Log In
                </Link>
                <Link
                  to="/register"
                  className="bg-green-600 text-white px-4 py-2 rounded-full font-medium hover:bg-green-700 transition-colors duration-200"
                >
                  Join for Free
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <motion.button
            className="md:hidden p-2 text-gray-700 hover:text-green-600 focus:outline-none transition-colors duration-200 dark:text-gray-200 dark:hover:text-green-400"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <motion.div
              initial={false}
              animate={isMobileMenuOpen ? { rotate: 180 } : { rotate: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              {isMobileMenuOpen ? (
                <X size={28} className="text-gray-700 dark:text-gray-200" />
              ) : (
                <Menu size={28} className="text-gray-700 dark:text-gray-200" />
              )}
            </motion.div>
          </motion.button>
        </div>

        {/* Mobile Menu Overlay */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <>
              {/* Backdrop */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
                onClick={() => setIsMobileMenuOpen(false)}
              />
              
              {/* Slide-in Menu Panel */}
              <motion.div
                key="mobile-menu"
                initial={{ x: '100%', opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: '100%', opacity: 0 }}
                transition={{ 
                  type: 'spring', 
                  stiffness: 80, 
                  damping: 15,
                  duration: 0.4
                }}
                className="fixed top-0 right-0 w-3/4 sm:w-2/3 h-full bg-white shadow-2xl z-50 flex flex-col justify-center p-8 md:hidden dark:bg-gray-900"
                id="mobile-menu"
              >
                {/* Menu Header */}
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="absolute top-8 right-8"
                >
                  <motion.button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 text-gray-500 hover:text-gray-700 transition-colors dark:text-gray-400 dark:hover:text-gray-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    aria-label="Close menu"
                  >
                    <X size={24} />
                  </motion.button>
                </motion.div>

                {/* Navigation Links */}
                <div className="space-y-6">
                  {[
                    { label: 'Home', path: '/' },
                    { label: 'Courses', path: '/courses' },
                    { label: 'Opportunities', path: '/opportunities' },
                    { label: 'About Us', path: '/about' },
                  ].map(({ label, path }, index) => (
                    <motion.div
                      key={path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.2 }}
                    >
                      <Link
                        to={path}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block text-lg font-semibold text-gray-800 hover:text-green-600 transition-colors duration-200 dark:text-gray-200 dark:hover:text-green-400"
                      >
                        {label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className="mt-10"
                >
                  <motion.button
                    onClick={() => {
                      navigate('/register');
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors duration-200 shadow-md"
                    whileHover={{ 
                      scale: 1.02,
                      boxShadow: "0 10px 25px -5px rgba(34, 197, 94, 0.3)"
                    }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Join for Free
                  </motion.button>
                </motion.div>

                {/* Auth Links for authenticated users */}
                {isAuthenticated && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="mt-6 space-y-4"
                  >
                    <Link
                      to="/dashboard"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="block text-center text-gray-600 hover:text-green-600 transition-colors duration-200 dark:text-gray-400 dark:hover:text-green-400"
                    >
                      Dashboard
                    </Link>
                  </motion.div>
                )}
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </header>

      {/* Course Search Section (only on homepage) */}
      {showCourseSearch && location.pathname === '/' && (
        <div className="bg-gradient-to-r from-green-50 to-orange-50 py-8 dark:from-gray-800 dark:to-gray-700">
          <div className="max-w-4xl mx-auto px-6">
            <div className="text-center mb-6">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
                Find your course. <span className="text-green-600 dark:text-green-400">Start learning today.</span>
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Discover courses designed for Tanzanian learners and entrepreneurs
              </p>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fadeIn {
          animation: fadeIn 0.2s ease-out;
        }

        .dropdown-menu {
          position: absolute !important;
          top: 100% !important;
          left: 0 !important;
          z-index: 9999 !important;
          min-width: 320px;
          max-height: 400px;
          overflow-y: auto;
          box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
          border-radius: 12px;
          background: white;
          border: 1px solid #e5e7eb;
          margin-top: 12px !important;
        }

        /* Ensure dropdown container allows overflow */
        .relative {
          overflow: visible !important;
        }

        /* Ensure dropdown is not cut off by viewport */
        @media (max-width: 768px) {
          .dropdown-menu {
            left: auto !important;
            right: 0 !important;
            transform: translateX(0) !important;
            width: 90vw !important;
            max-width: 320px !important;
          }
        }

        /* Prevent body scroll when dropdown is open */
        body.dropdown-open {
          overflow: hidden;
        }

        /* Mobile menu styles */
        @media (max-width: 768px) {
          .mobile-menu-panel {
            backdrop-filter: blur(8px);
          }
        }

        /* Global styles to ensure dropdown visibility */
        * {
          box-sizing: border-box;
        }

        /* Ensure header and its children allow overflow */
        header, header * {
          overflow: visible !important;
        }

        /* Specific fix for dropdown positioning */
        .dropdown-menu {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
        }

        /* Enhanced scroll behavior */
        html {
          scroll-behavior: smooth;
        }

        /* Add padding to body to account for fixed header */
        body {
          padding-top: 0;
        }

        /* Ensure content doesn't hide behind fixed header */
        main {
          padding-top: 80px;
        }
      `}</style>
    </>
  );
};

export default Header;