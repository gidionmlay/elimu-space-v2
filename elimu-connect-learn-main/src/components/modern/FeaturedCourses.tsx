import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUsers, faArrowRight, faBook } from '@fortawesome/free-solid-svg-icons';

interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  instructorAvatar: string;
  thumbnail: string;
  rating: number;
  totalRatings: number;
  students: number;
  duration: string;
  lessons: number;
  price: number;
  originalPrice?: number;
  category: string;
  level: string;
  isBestseller?: boolean;
}

const FeaturedCourses: React.FC = () => {
  const courses: Course[] = [
    {
      id: '1',
      title: 'Complete Web Development Bootcamp 2025',
      description: 'Master HTML, CSS, JavaScript, React, Node.js and MongoDB. Build 10+ real-world projects and launch your tech career in Tanzania.',
      instructor: 'Sarah Mwalimu',
      instructorAvatar: '',
      thumbnail: '',
      rating: 4.9,
      totalRatings: 1243,
      students: 3456,
      duration: '12 weeks',
      lessons: 185,
      price: 150000,
      originalPrice: 200000,
      category: 'Technology',
      level: 'Beginner',
      isBestseller: true
    },
    {
      id: '2',
      title: 'Entrepreneurship for Tanzanian Youth',
      description: 'Learn to start and scale your business in Tanzania. From idea validation to funding, marketing and growth strategies.',
      instructor: 'John Kinyua',
      instructorAvatar: '',
      thumbnail: '',
      rating: 4.8,
      totalRatings: 892,
      students: 2145,
      duration: '8 weeks',
      lessons: 95,
      price: 80000,
      category: 'Business',
      level: 'Beginner',
      isBestseller: true
    },
    {
      id: '3',
      title: 'Digital Marketing Mastery',
      description: 'Master social media marketing, SEO, content creation, email marketing and analytics to grow your business online.',
      instructor: 'Grace Mollel',
      instructorAvatar: '',
      thumbnail: '',
      rating: 4.9,
      totalRatings: 1567,
      students: 4234,
      duration: '10 weeks',
      lessons: 120,
      price: 120000,
      originalPrice: 180000,
      category: 'Marketing',
      level: 'Intermediate'
    }
  ];

  return (
    <section style={{
      padding: '80px 20px',
      background: '#F9FAFB'
    }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '48px',
          flexWrap: 'wrap',
          gap: '16px'
        }}>
          <div>
            <h2 style={{
              fontSize: '40px',
              fontWeight: '800',
              color: '#111827',
              marginBottom: '8px',
              letterSpacing: '-0.01em'
            }}>
              Featured Courses
            </h2>
            <p style={{
              fontSize: '16px',
              color: '#6B7280',
              marginTop: '8px'
            }}>
              Top-rated courses handpicked by our experts
            </p>
          </div>
          <a
            href="/courses/featured"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              color: '#F97316',
              fontWeight: '600',
              fontSize: '15px',
              textDecoration: 'none',
              transition: 'gap 0.3s ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.gap = '12px'}
            onMouseLeave={(e) => e.currentTarget.style.gap = '8px'}
          >
            View All Featured
            <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
          </a>
        </div>

        {/* Courses Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))',
          gap: '32px'
        }}>
          {courses.map(course => (
            <article
              key={course.id}
              style={{
                background: 'white',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                display: 'flex',
                flexDirection: 'column'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 16px 32px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
              }}
            >
              {/* Thumbnail */}
              <div style={{
                position: 'relative',
                height: '220px',
                background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                overflow: 'hidden'
              }}>
                <div style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'white',
                  fontSize: '64px',
                  fontWeight: '900',
                  opacity: 0.2
                }}>
                  {course.title.charAt(0)}
                </div>

                {/* Badges */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  left: '16px',
                  display: 'flex',
                  gap: '8px',
                  flexWrap: 'wrap'
                }}>
                  {course.isBestseller && (
                    <span style={{
                      padding: '6px 12px',
                      background: '#F59E0B',
                      color: 'white',
                      borderRadius: '6px',
                      fontSize: '12px',
                      fontWeight: '700',
                      textTransform: 'uppercase',
                      letterSpacing: '0.5px'
                    }}>
                      Bestseller
                    </span>
                  )}
                  <span style={{
                    padding: '6px 12px',
                    background: '#F97316',
                    color: 'white',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>
                    {course.category}
                  </span>
                </div>

                {/* Level Badge */}
                <div style={{
                  position: 'absolute',
                  top: '16px',
                  right: '16px',
                  padding: '6px 12px',
                  background: 'rgba(0, 0, 0, 0.7)',
                  backdropFilter: 'blur(8px)',
                  color: 'white',
                  borderRadius: '6px',
                  fontSize: '12px',
                  fontWeight: '600'
                }}>
                  {course.level}
                </div>
              </div>

              {/* Content */}
              <div style={{ padding: '24px', flex: 1, display: 'flex', flexDirection: 'column' }}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: '700',
                  color: '#111827',
                  marginBottom: '12px',
                  lineHeight: '1.4',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden'
                }}>
                  {course.title}
                </h3>

                <p style={{
                  fontSize: '14px',
                  color: '#6B7280',
                  lineHeight: '1.6',
                  marginBottom: '16px',
                  display: '-webkit-box',
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  flex: 1
                }}>
                  {course.description}
                </p>

                {/* Instructor */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  marginBottom: '16px',
                  paddingBottom: '16px',
                  borderBottom: '1px solid #E5E7EB'
                }}>
                  <div style={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    background: '#F3F4F6',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '14px',
                    fontWeight: '600',
                    color: '#F97316'
                  }}>
                    {course.instructor.charAt(0)}
                  </div>
                  <span style={{
                    fontSize: '14px',
                    color: '#6B7280',
                    fontWeight: '500'
                  }}>
                    {course.instructor}
                  </span>
                </div>

                {/* Stats */}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '16px',
                  marginBottom: '20px',
                  fontSize: '13px',
                  color: '#6B7280'
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FontAwesomeIcon icon={faStar} className="w-4 h-4" style={{ color: '#F59E0B' }} />
                    <span style={{ fontWeight: '600', color: '#111827' }}>{course.rating}</span>
                    <span>({course.totalRatings.toLocaleString()})</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
                    <span>{(course.students / 1000).toFixed(1)}k</span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <FontAwesomeIcon icon={faBook} className="w-4 h-4" />
                    <span>{course.lessons} lessons</span>
                  </div>
                </div>

                {/* Price + CTA */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid #E5E7EB'
                }}>
                  <div>
                    <div style={{
                      fontSize: '26px',
                      fontWeight: '800',
                      color: '#F97316',
                      lineHeight: '1'
                    }}>
                      TSh {(course.price / 1000).toFixed(0)}k
                    </div>
                    {course.originalPrice && (
                      <div style={{
                        fontSize: '14px',
                        color: '#9CA3AF',
                        textDecoration: 'line-through',
                        marginTop: '4px'
                      }}>
                        TSh {(course.originalPrice / 1000).toFixed(0)}k
                      </div>
                    )}
                  </div>

                  <button style={{
                    padding: '12px 24px',
                    background: '#F97316',
                    color: 'white',
                    border: 'none',
                    borderRadius: '8px',
                    fontSize: '14px',
                    fontWeight: '600',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease',
                    whiteSpace: 'nowrap'
                  }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#EA580C'}
                    onMouseLeave={(e) => e.currentTarget.style.background = '#F97316'}
                  >
                    Enroll Now
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .container > div:last-child {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  );
};

export default FeaturedCourses;
