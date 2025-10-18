import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "animate.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell, faSearch, faStar, faChartLine } from "@fortawesome/free-solid-svg-icons";
import RegisterButton from "./RegisterButton";
import CourseSearchSection from "./CourseSearchSection";
import { useAuth } from "@/contexts/AuthContext";
import HamburgerMenu from "./ui/HamburgerMenu";
import MobileNav from "./ui/MobileNav";

interface HeaderHeroProps {
  showCourseSearch?: boolean;
  showHeroSection?: boolean;
}

const HeaderHero: React.FC<HeaderHeroProps> = ({ showCourseSearch = true, showHeroSection = true }) => {
  const { user, isAuthenticated } = useAuth();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation links based on auth status
  const navLinks = isAuthenticated
    ? [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Course", path: "/courses" },
        { label: "Opportunity", path: "/opportunities" },
        { label: "About Us", path: "/about" }
      ]
    : [
        { label: "Home", path: "/" },
        { label: "Course", path: "/courses" },
        { label: "Opportunity", path: "/opportunities" },
        { label: "About Us", path: "/about" }
      ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <header className={`bg-[#F5F5F5] text-[#0D3B66] flex flex-col relative overflow-visible ${showHeroSection ? 'min-h-screen pb-24 md:pb-32' : ''}`}>
      {/* Navbar - Sticky with backdrop blur */}
      <nav className="sticky top-0 z-50 bg-[#F5F5F5]/95 backdrop-blur-md shadow-md border-b border-gray-200/50">
        <div className="container d-flex justify-content-between align-items-center py-3">
        {/* Logo */}
        <div className="d-flex align-items-center">
          <Link to="/" style={{ textDecoration: 'none' }}>
            <img 
              src="/logo.png" 
              alt="Elimu Space" 
              className="h-20 w-auto"
            />
          </Link>
        </div>

        {/* Nav Menu */}
        <ul className="d-none d-md-flex gap-4 list-unstyled mb-0">
          {navLinks.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className={`relative group cursor-pointer font-bold transition-all duration-300 ease-out
                           hover:-translate-y-[2px] hover:scale-105 hover:text-[#0A2A4A] ${
                             isActive(item.path) ? 'text-[#F97316]' : 'text-[#0D3B66]'
                           }`}
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                {item.label}
                {/* Animated underline */}
                <span className={`absolute left-1/2 -translate-x-1/2 bottom-[-4px] h-[2px]
                               transition-all duration-300 ease-out ${
                                 isActive(item.path) ? 'w-full bg-[#F97316]' : 'w-0 bg-[#0D3B66] group-hover:w-full'
                               }`}></span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Right Side Buttons */}
        <div className="d-flex align-items-center gap-3">
          {/* Desktop Icons */}
          <button className="p-2 text-[#0D3B66] hover:text-[#0A2A4A] transition-colors duration-200 hidden md:block" aria-label="Search">
            <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
          </button>
          {isAuthenticated && (
            <Link 
              to="/dashboard" 
              className="p-2 text-[#0D3B66] hover:text-[#0A2A4A] transition-colors duration-200 hidden md:block" 
              aria-label="Notifications"
            >
              <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
            </Link>
          )}
          {isAuthenticated ? (
            <Link 
              to="/dashboard" 
              className="p-2 text-[#0D3B66] hover:text-[#0A2A4A] transition-colors duration-200 items-center gap-2 hidden md:flex" 
              aria-label="User Account"
              title={user?.full_name || user?.username}
            >
              <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
              <span className="text-sm font-semibold d-none d-lg-inline">{user?.full_name || user?.username}</span>
            </Link>
          ) : (
            <Link 
              to="/login" 
              className="p-2 text-[#0D3B66] hover:text-[#0A2A4A] transition-colors duration-200 hidden md:block" 
              aria-label="User Account"
            >
              <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
            </Link>
          )}
          <div className="hidden md:block">
            {!isAuthenticated && <RegisterButton />}
          </div>

          {/* Mobile Hamburger Menu - visible only on small screens */}
          <div className="lg:hidden">
            <HamburgerMenu 
              isOpen={mobileMenuOpen} 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            />
          </div>
        </div>
        </div>
      </nav>

      {/* Mobile Navigation Menu */}
      <MobileNav 
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
      />

      {/* Hero Section - Only show if showHeroSection is true */}
      {showHeroSection && (
        <>
          <div className="container flex flex-column flex-md-row align-items-center justify-content-between py-5 position-relative">
            {/* Hero Text */}
            <div className="text-start animate__animated animate__fadeInLeft">
              <p className="uppercase tracking-wide text-sm mb-2 text-[#043b6d] opacity-80">E-learning Platform</p>
              <h1 className="fw-bold text-3xl md:text-5xl mb-3 leading-tight text-[#377ec1]">
               Learn industry relevant skills, <br/>get verified assessments,<br/>and access real career opportunities.
              </h1>
              <p className="text-[#0D3B66] opacity-70 mb-4">
                From Learning to Earning
 
              </p>
              <div className="d-flex gap-3">
                <button className="btn fw-bold px-4 py-2 rounded shadow text-white" style={{ backgroundColor: '#0D3B66', border: 'none' }}>
                  Watch
                </button>
                <button className="btn px-4 py-2 rounded" style={{ backgroundColor: 'transparent', border: '2px solid #0D3B66', color: '#0D3B66' }}>
                  Learn More
                </button>
              </div>
            </div>
  
            {/* Hero Banner Image */}
            <div className="mt-54 mt-md-2 animate__animated animate__fadeInRight position-relative">
              <div className="w-[300px] h-[400px] overflow-hidden floating-animation">
                <img 
                  src="/gallery/banner-img.png" 
                  alt="Elimu Space Learning Platform" 
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Stats */}
              <div className="position-absolute top-1 end-59  bg-white text-[#0D3B66] rounded-lg shadow p-2 px-3 small animate__animated animate__fadeInUp" style={{ boxShadow: '0 4px 12px rgba(13, 59, 102, 0.15)' }}>
                <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-500" /> 80.9% <br />
                <span className="text-xs opacity-70"><strong><b>positive feedback</b></strong></span>
              </div>
              <div className="position-absolute bottom-4 start-4 bg-white text-[#0D3B66] rounded-lg shadow p-2 px-3 small animate__animated animate__fadeInUp" style={{ boxShadow: '0 4px 12px rgba(13, 59, 102, 0.15)' }}>
                <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 text-green-500" /> 90% <br />
                <span className="text-xs opacity-70"><strong><b>simple learn method</b></strong></span>
              </div>
            </div>
          </div>

          {/* Course Search Section - Overlapping (only on homepage) */}
          {showCourseSearch && <CourseSearchSection />}
        </>
      )}
      
      {/* Floating Animation Styles */}
      <style>{`
        .floating-animation {
          animation: floating 3s ease-in-out infinite;
        }
        
        @keyframes floating {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-15px);
          }
        }
        
        .floating-animation:hover {
          animation-duration: 1.7s;
        }
      `}</style>
    </header>
  );
};

export default HeaderHero;
