import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import FooterRedesign from '@/components/FooterRedesign';
import CoursesHero from '@/components/modern/CoursesHero';
import CategoryFilter from '@/components/modern/CategoryFilter';
import FeaturedCourses from '@/components/modern/FeaturedCourses';
import AllCoursesGrid from '@/components/modern/AllCoursesGrid';
import RequestCourseCTA from '@/components/modern/RequestCourseCTA';
import HamburgerMenu from '@/components/ui/HamburgerMenu';
import MobileNav from '@/components/ui/MobileNav';

const CoursesPage: React.FC = () => {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Course", path: "/courses" },
    { label: "Opportunity", path: "/opportunities" },
    { label: "About Us", path: "/about" }
  ];

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="w-full max-w-full overflow-x-hidden">
      {/* Sticky Navbar with backdrop blur */}
      <nav className="bg-[#F5F5F5]/95 backdrop-blur-md text-[#0D3B66] sticky top-0 z-50 shadow-lg border-b border-gray-200/50">
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
                  <span className={`absolute left-1/2 -translate-x-1/2 bottom-[-4px] h-[2px]
                                 bg-[#0D3B66] transition-all duration-300 ease-out ${
                                   isActive(item.path) ? 'w-full bg-[#F97316]' : 'w-0 group-hover:w-full'
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
            <button className="p-2 text-[#0D3B66] hover:text-[#0A2A4A] transition-colors duration-200 hidden md:block" aria-label="Notifications">
              <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#0D3B66] hover:text-[#0A2A4A] transition-colors duration-200 hidden md:block" aria-label="User Account">
              <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
            </button>
            <Link
              to="/register"
              className="hidden md:inline-block"
              style={{
                padding: '10px 24px',
                background: '#0D3B66',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#0A2A4A';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#0D3B66';
                e.currentTarget.style.transform = 'translateY(0)';
              }}
            >
              Register
            </Link>

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

      {/* New Course Page Sections */}
      <CoursesHero />
      <CategoryFilter />
      <FeaturedCourses />
      <AllCoursesGrid />
      <RequestCourseCTA />

      {/* Reuse existing Footer */}
      <FooterRedesign />
    </div>
  );
};

export default CoursesPage;
