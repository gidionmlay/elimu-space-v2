import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUsers, faBook, faFilter, faTimes, faFire, faClock, faMoneyBillWave, faGem } from '@fortawesome/free-solid-svg-icons';
import ModernDropdown from '@/components/ModernDropdown';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  rating: number;
  students: number;
  lessons: number;
  price: number;
  isFree: boolean;
  category: string;
  level: string;
  duration: string;
}

const AllCoursesGrid: React.FC = () => {
  const [showFilters, setShowFilters] = useState(false);
  const [selectedLevel, setSelectedLevel] = useState<string[]>([]);
  const [selectedPrice, setSelectedPrice] = useState('all');
  const [sortBy, setSortBy] = useState('popular');

  const courses: Course[] = [
    {
      id: '4',
      title: 'Python Programming for Beginners',
      description: 'Start your coding journey with Python. Learn programming fundamentals and build practical projects.',
      instructor: 'David Mushi',
      rating: 4.7,
      students: 1890,
      lessons: 75,
      price: 95000,
      isFree: false,
      category: 'Technology',
      level: 'Beginner',
      duration: '8 weeks'
    },
    {
      id: '5',
      title: 'Graphic Design Fundamentals',
      description: 'Master design principles, typography, color theory and create stunning visuals using industry-standard tools.',
      instructor: 'Amina Hassan',
      rating: 4.8,
      students: 2340,
      lessons: 65,
      price: 0,
      isFree: true,
      category: 'Design',
      level: 'Beginner',
      duration: '6 weeks'
    },
    {
      id: '6',
      title: 'Financial Literacy for Youth',
      description: 'Build a strong financial foundation. Learn budgeting, saving, investing and money management skills.',
      instructor: 'James Nyerere',
      rating: 4.9,
      students: 3120,
      lessons: 45,
      price: 0,
      isFree: true,
      category: 'Finance',
      level: 'Beginner',
      duration: '4 weeks'
    },
    {
      id: '7',
      title: 'Data Science with Python',
      description: 'Learn data analysis, visualization, machine learning and AI. Work with real-world datasets.',
      instructor: 'Dr. Sarah Kimani',
      rating: 4.8,
      students: 1567,
      lessons: 120,
      price: 180000,
      isFree: false,
      category: 'Technology',
      level: 'Advanced',
      duration: '14 weeks'
    },
    {
      id: '8',
      title: 'Social Media Content Creation',
      description: 'Create engaging content for Instagram, TikTok, YouTube. Master video editing and storytelling.',
      instructor: 'Lucy Masanja',
      rating: 4.6,
      students: 2890,
      lessons: 55,
      price: 65000,
      isFree: false,
      category: 'Marketing',
      level: 'Intermediate',
      duration: '5 weeks'
    },
    {
      id: '9',
      title: 'Agriculture & Modern Farming',
      description: 'Learn sustainable farming techniques, crop management and agricultural business practices.',
      instructor: 'Joseph Mduma',
      rating: 4.7,
      students: 1234,
      lessons: 50,
      price: 0,
      isFree: true,
      category: 'Agriculture',
      level: 'Beginner',
      duration: '6 weeks'
    }
  ];

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
                <article
                  key={course.id}
                  style={{
                    background: 'white',
                    border: '1px solid #E5E7EB',
                    borderRadius: '12px',
                    overflow: 'hidden',
                    transition: 'all 0.3s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = '#F97316';
                    e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 115, 22, 0.12)';
                    e.currentTarget.style.transform = 'translateY(-4px)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#E5E7EB';
                    e.currentTarget.style.boxShadow = 'none';
                    e.currentTarget.style.transform = 'translateY(0)';
                  }}
                >
                  {/* Thumbnail */}
                  <div style={{
                    height: '180px',
                    background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                    position: 'relative',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '48px',
                    fontWeight: '900',
                    opacity: 0.9
                  }}>
                    {course.title.charAt(0)}
                    {course.isFree && (
                      <span style={{
                        position: 'absolute',
                        top: '12px',
                        left: '12px',
                        background: '#10B981',
                        color: 'white',
                        padding: '4px 12px',
                        borderRadius: '6px',
                        fontSize: '12px',
                        fontWeight: '700'
                      }}>
                        FREE
                      </span>
                    )}
                    <span style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      background: 'rgba(0, 0, 0, 0.6)',
                      color: 'white',
                      padding: '4px 10px',
                      borderRadius: '6px',
                      fontSize: '11px',
                      fontWeight: '600'
                    }}>
                      {course.level}
                    </span>
                  </div>

                  {/* Content */}
                  <div style={{ padding: '20px' }}>
                    <h3 style={{
                      fontSize: '17px',
                      fontWeight: '700',
                      color: '#111827',
                      marginBottom: '8px',
                      lineHeight: '1.4',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {course.title}
                    </h3>

                    <p style={{
                      fontSize: '13px',
                      color: '#6B7280',
                      marginBottom: '12px',
                      lineHeight: '1.5',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}>
                      {course.description}
                    </p>

                    <div style={{
                      fontSize: '13px',
                      color: '#6B7280',
                      marginBottom: '12px'
                    }}>
                      by {course.instructor}
                    </div>

                    {/* Stats */}
                    <div style={{
                      display: 'flex',
                      gap: '16px',
                      marginBottom: '16px',
                      fontSize: '13px',
                      color: '#6B7280'
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FontAwesomeIcon icon={faStar} style={{ width: '14px', height: '14px', color: '#F59E0B' }} />
                        <span style={{ fontWeight: '600', color: '#111827' }}>{course.rating}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FontAwesomeIcon icon={faUsers} style={{ width: '14px', height: '14px' }} />
                        <span>{course.students.toLocaleString()}</span>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                        <FontAwesomeIcon icon={faBook} style={{ width: '14px', height: '14px' }} />
                        <span>{course.lessons}</span>
                      </div>
                    </div>

                    {/* Price */}
                    <div style={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingTop: '16px',
                      borderTop: '1px solid #E5E7EB'
                    }}>
                      <div style={{
                        fontSize: '22px',
                        fontWeight: '800',
                        color: course.isFree ? '#10B981' : '#F97316'
                      }}>
                        {course.isFree ? 'Free' : `TSh ${(course.price / 1000).toFixed(0)}k`}
                      </div>
                      <button style={{
                        padding: '8px 16px',
                        background: '#F97316',
                        color: 'white',
                        border: 'none',
                        borderRadius: '6px',
                        fontSize: '13px',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background 0.3s ease'
                      }}
                        onMouseEnter={(e) => e.currentTarget.style.background = '#EA580C'}
                        onMouseLeave={(e) => e.currentTarget.style.background = '#F97316'}
                      >
                        Enroll
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllCoursesGrid;
