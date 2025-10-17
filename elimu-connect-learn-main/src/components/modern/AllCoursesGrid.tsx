import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUsers, faBook, faFilter, faTimes, faFire, faClock, faMoneyBillWave, faGem } from '@fortawesome/free-solid-svg-icons';
import ModernDropdown from '@/components/ModernDropdown';
import CourseCard, { Course } from '@/components/CourseCard';
import coursesData from '@/data/courses.json';
import { formatPrice } from '@/utils/formatPrice';

const AllCoursesGrid: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  // Use all courses from the data
  const courses: Course[] = coursesData;

  const toggleLevel = (level: string) => {
    setSelectedLevel(prev =>
      prev.includes(level) ? prev.filter(l => l !== level) : [...prev, level]
    );
  };

  const sortOptions = [
    { value: 'popular', label: 'Most Popular', icon: <FontAwesomeIcon icon={faFire} className="w-4 h-4 text-red-600" />, description: 'Trending courses' },
    { value: 'rating', label: 'Highest Rated', icon: <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-500" />, description: 'Top-rated courses' },
    { value: 'newest', label: 'Newest', icon: <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-blue-600" />, description: 'Recently added' },
    { value: 'price-low', label: 'Price: Low to High', icon: <FontAwesomeIcon icon={faMoneyBillWave} className="w-4 h-4 text-green-600" />, description: 'Budget-friendly first' },
    { value: 'price-high', label: 'Price: High to Low', icon: <FontAwesomeIcon icon={faGem} className="w-4 h-4 text-purple-600" />, description: 'Premium first' }
  ];

  return (
    <section style={{ padding: '80px 20px', background: 'white' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header with Filter Toggle */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '32px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <h2 style={{
            fontSize: '32px',
            fontWeight: '800',
            color: '#111827'
          }}>
            All Courses ({courses.length})
          </h2>

          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            {/* Sort Dropdown */}
            <ModernDropdown
              options={sortOptions}
              value={sortBy}
              onChange={setSortBy}
              placeholder="Sort by"
              width={220}
            />

            {/* Filter Toggle Button */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: showFilters ? '#F97316' : 'white',
                color: showFilters ? 'white' : '#111827',
                border: `1px solid ${showFilters ? '#F97316' : '#E5E7EB'}`,
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
            >
              <FontAwesomeIcon icon={faFilter} className="w-4 h-4" />
              Filters
            </button>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '32px' }}>
          {/* Sidebar Filters */}
          <aside style={{
            flex: '0 0 280px',
            display: showFilters ? 'block' : 'none'
          }}>
            <div style={{
              background: '#F9FAFB',
              borderRadius: '12px',
              padding: '24px',
              position: 'sticky',
              top: '100px'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '20px'
              }}>
                <h3 style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#111827'
                }}>
                  Filters
                </h3>
                {(selectedLevel.length > 0 || selectedPrice !== 'all') && (
                  <button
                    onClick={() => {
                      setSelectedLevel([]);
                      setSelectedPrice('all');
                    }}
                    style={{
                      fontSize: '13px',
                      color: '#F97316',
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: '600'
                    }}
                  >
                    Clear All
                  </button>
                )}
              </div>

              {/* Level Filter */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '12px'
                }}>
                  Level
                </h4>
                {['Beginner', 'Intermediate', 'Advanced'].map(level => (
                  <label
                    key={level}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#6B7280'
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedLevel.includes(level)}
                      onChange={() => toggleLevel(level)}
                      style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: '#F97316'
                      }}
                    />
                    {level}
                  </label>
                ))}
              </div>

              {/* Price Filter */}
              <div style={{ marginBottom: '24px' }}>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '12px'
                }}>
                  Price
                </h4>
                {[
                  { value: 'all', label: 'All Courses' },
                  { value: 'free', label: 'Free' },
                  { value: 'paid', label: 'Paid' }
                ].map(option => (
                  <label
                    key={option.value}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#6B7280'
                    }}
                  >
                    <input
                      type="radio"
                      name="price"
                      value={option.value}
                      checked={selectedPrice === option.value}
                      onChange={(e) => setSelectedPrice(e.target.value)}
                      style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: '#F97316'
                      }}
                    />
                    {option.label}
                  </label>
                ))}
              </div>

              {/* Duration Filter */}
              <div>
                <h4 style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '12px'
                }}>
                  Duration
                </h4>
                {['0-4 weeks', '4-8 weeks', '8-12 weeks', '12+ weeks'].map(duration => (
                  <label
                    key={duration}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      marginBottom: '10px',
                      cursor: 'pointer',
                      fontSize: '14px',
                      color: '#6B7280'
                    }}
                  >
                    <input
                      type="checkbox"
                      style={{
                        width: '18px',
                        height: '18px',
                        cursor: 'pointer',
                        accentColor: '#F97316'
                      }}
                    />
                    {duration}
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Courses Grid */}
          <div style={{ flex: 1 }}>
            <div style={{
              display: 'grid',
              gridTemplateColumns: showFilters ? 'repeat(auto-fill, minmax(300px, 1fr))' : 'repeat(auto-fill, minmax(340px, 1fr))',
              gap: '24px'
            }}>
              {courses.map(course => (
                <CourseCard 
                  key={course.id}
                  course={course} 
                  variant="compact"
                  showInstructor={true}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
      
      {/* Responsive Styles */}
      <style>{`
        @media (max-width: 1024px) {
          .container > div:last-child {
            flex-direction: column !important;
            gap: 2rem !important;
          }
          
          .container > div:last-child > aside {
            flex: none !important;
            position: static !important;
            width: 100% !important;
          }
        }
        
        @media (max-width: 768px) {
          .container > div:last-child > div:last-child > div {
            grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)) !important;
            gap: 1rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .container > div:last-child > div:last-child > div {
            grid-template-columns: 1fr !important;
            gap: 0.75rem !important;
          }
        }
        
        /* Animation for section */
        section {
          animation: fadeIn 0.8s ease-out;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </section>
  );
};

export default AllCoursesGrid;
