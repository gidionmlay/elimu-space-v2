import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBell, faSearch } from '@fortawesome/free-solid-svg-icons';
import FooterRedesign from '@/components/FooterRedesign';
import CoursesHero from '@/components/modern/CoursesHero';
import CategoryFilter from '@/components/modern/CategoryFilter';
import FeaturedCourses from '@/components/modern/FeaturedCourses';
import AllCoursesGrid from '@/components/modern/AllCoursesGrid';
import RequestCourseCTA from '@/components/modern/RequestCourseCTA';

const CoursesPage: React.FC = () => {
  const navLinks = [
    { label: "Home", path: "/" },
    { label: "Course", path: "/courses" },
    { label: "Opportunity", path: "/opportunity" },
    { label: "About Us", path: "/about" }
  ];

  return (
    <>
      {/* Reuse existing Header - just the nav part */}
      <nav className="bg-[#F5F5F5] text-[#0D3B66] sticky top-0 z-50 shadow-lg">
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
                  className="relative group cursor-pointer font-bold text-[#0D3B66]
                             transition-all duration-300 ease-out
                             hover:-translate-y-[2px] hover:scale-105 hover:text-[#0A2A4A]"
                  style={{ textDecoration: 'none', display: 'inline-block' }}
                >
                  {item.label}
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-[-4px] w-0 h-[2px]
                                 bg-[#0D3B66] transition-all duration-300 ease-out
                                 group-hover:w-full"></span>
                </Link>
              </li>
            ))}
          </ul>

          {/* Right Side Buttons */}
          <div className="d-flex align-items-center gap-3">
            <button className="p-2 text-[#0D3B66] hover:text-[#0A2A4A] transition-colors duration-200" aria-label="Search">
              <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#0D3B66] hover:text-[#0A2A4A] transition-colors duration-200" aria-label="Notifications">
              <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#0D3B66] hover:text-[#0A2A4A] transition-colors duration-200" aria-label="User Account">
              <FontAwesomeIcon icon={faUser} className="w-5 h-5" />
            </button>
            <Link
              to="/register"
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
                display: 'inline-block'
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
          </div>
        </div>
      </nav>

      {/* New Course Page Sections */}
      <CoursesHero />
      <CategoryFilter />
      <FeaturedCourses />
      <AllCoursesGrid />
      <RequestCourseCTA />

      {/* Reuse existing Footer */}
      <FooterRedesign />
    </>
  );
};

export default CoursesPage;
