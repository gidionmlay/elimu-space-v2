import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faBook, faLaptop, faBriefcase, faPalette, faRocket, faSeedling, faLanguage, faGraduationCap, faMoneyBillWave, faHeart } from '@fortawesome/free-solid-svg-icons';
import ModernDropdown from '@/components/ModernDropdown';

const CoursesHero: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categoryOptions = [
    {
      value: 'all',
      label: 'All Categories',
      icon: <FontAwesomeIcon icon={faBook} className="w-4 h-4 text-blue-600" />,
      count: 150,
      description: 'Browse all available courses'
    },
    {
      value: 'technology',
      label: 'Technology & IT',
      icon: <FontAwesomeIcon icon={faLaptop} className="w-4 h-4 text-blue-600" />,
      count: 45,
      description: 'Web dev, programming, data science'
    },
    {
      value: 'business',
      label: 'Business & Entrepreneurship',
      icon: <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4 text-green-600" />,
      count: 38,
      description: 'Start and grow your business'
    },
    {
      value: 'design',
      label: 'Arts & Design',
      icon: <FontAwesomeIcon icon={faPalette} className="w-4 h-4 text-purple-600" />,
      count: 22,
      description: 'Graphics, UI/UX, creative skills'
    },
    {
      value: 'career',
      label: 'Career Development',
      icon: <FontAwesomeIcon icon={faRocket} className="w-4 h-4 text-orange-600" />,
      count: 30,
      description: 'Soft skills, leadership, CV writing'
    },
    {
      value: 'agriculture',
      label: 'Agriculture & Environment',
      icon: <FontAwesomeIcon icon={faSeedling} className="w-4 h-4 text-green-600" />,
      count: 15,
      description: 'Modern farming, sustainability'
    },
    {
      value: 'finance',
      label: 'Finance & Money',
      icon: <FontAwesomeIcon icon={faMoneyBillWave} className="w-4 h-4 text-green-600" />,
      count: 18,
      description: 'Personal finance, investment, accounting'
    },
    {
      value: 'health',
      label: 'Health & Wellness',
      icon: <FontAwesomeIcon icon={faHeart} className="w-4 h-4 text-red-600" />,
      count: 12,
      description: 'Fitness, nutrition, mental health'
    }
  ];

  const handleSearch = () => {
    console.log('Search:', searchQuery, 'Category:', selectedCategory);
    // Implement search logic
  };

  return (
    <section style={{
      background: 'linear-gradient(135deg, #FFF7ED 0%, #FFEDD5 100%)',
      padding: '100px 20px 80px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Background Elements */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
        animation: 'pulse 8s ease-in-out infinite'
      }} />

      <div style={{
        position: 'absolute',
        bottom: '-50px',
        left: '-50px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(234, 88, 12, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        {/* Page Title */}
        <div style={{
          textAlign: 'center',
          marginBottom: '48px',
          animation: 'fadeInUp 0.6s ease-out'
        }}>
          <h1 style={{
            fontSize: '56px',
            fontWeight: '900',
            color: '#111827',
            marginBottom: '16px',
            letterSpacing: '-0.02em',
            lineHeight: '1.1'
          }}>
            Explore Our Courses
          </h1>
          <p style={{
            fontSize: '20px',
            color: '#6B7280',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Transform your future with skills that connect you to jobs, entrepreneurship, and real-world opportunities
          </p>
        </div>

        {/* Search Bar Container */}
        <div style={{
          maxWidth: '950px',
          margin: '0 auto',
          display: 'flex',
          gap: '12px',
          flexWrap: 'wrap',
          justifyContent: 'center',
          animation: 'fadeInUp 0.6s ease-out 0.2s both'
        }}>
          {/* Main Search Input */}
          <div style={{
            flex: '1 1 400px',
            minWidth: '300px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              color: '#9CA3AF',
              zIndex: 1
            }}>
              <FontAwesomeIcon icon={faSearch} className="w-5 h-5" />
            </div>

            <input
              type="text"
              placeholder="Search courses, skills, or topics..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
              style={{
                width: '100%',
                padding: '18px 20px 18px 56px',
                fontSize: '16px',
                border: '2px solid #E5E7EB',
                borderRadius: '12px',
                outline: 'none',
                transition: 'all 0.3s ease',
                background: 'white',
                fontFamily: 'inherit'
              }}
              onFocus={(e) => {
                e.currentTarget.style.borderColor = '#F97316';
                e.currentTarget.style.boxShadow = '0 0 0 4px rgba(249, 115, 22, 0.1)';
              }}
              onBlur={(e) => {
                e.currentTarget.style.borderColor = '#E5E7EB';
                e.currentTarget.style.boxShadow = 'none';
              }}
            />
          </div>

          {/* Category Dropdown */}
          <div style={{ flex: '0 0 auto', minWidth: '280px', position: 'relative', zIndex: 10 }}>
            <ModernDropdown
              options={categoryOptions}
              value={selectedCategory}
              onChange={setSelectedCategory}
              placeholder="Select category"
              width={280}
            />
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            style={{
              flex: '0 0 auto',
              padding: '18px 36px',
              background: '#F97316',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)',
              whiteSpace: 'nowrap'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#EA580C';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(249, 115, 22, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#F97316';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.3)';
            }}
          >
            Search Courses
          </button>
        </div>

        {/* Quick Stats */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
          marginTop: '48px',
          flexWrap: 'wrap',
          animation: 'fadeInUp 0.6s ease-out 0.4s both'
        }}>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#F97316' }}>150+</div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>Active Courses</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#F97316' }}>5,000+</div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>Students Enrolled</div>
          </div>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontSize: '32px', fontWeight: '800', color: '#F97316' }}>50+</div>
            <div style={{ fontSize: '14px', color: '#6B7280' }}>Expert Instructors</div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }

        @media (max-width: 768px) {
          h1 {
            font-size: 36px !important;
          }

          p {
            font-size: 16px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default CoursesHero;
