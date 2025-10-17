import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUsers, faBook, faClock, faCertificate, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { formatPrice, truncateText, formatDuration } from '@/utils/formatPrice';

export interface Course {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  whatYouWillLearn: string[];
  duration: string;
  sessions: string;
  assessment: string;
  certification: string;
  price: number;
  outcome: string;
  category: string;
  level: string;
  rating: number;
  totalRatings: number;
  students: number;
  lessons: number;
  instructor: string;
  thumbnail: string;
  isBestseller?: boolean;
  isFeatured?: boolean;
}

interface CourseCardProps {
  course: Course;
  variant?: 'default' | 'featured' | 'compact';
  showInstructor?: boolean;
  className?: string;
}

const CourseCard: React.FC<CourseCardProps> = ({ 
  course, 
  variant = 'default', 
  showInstructor = true,
  className = ''
}) => {

  const getCardStyles = () => {
    const baseStyles = {
      background: 'white',
      borderRadius: variant === 'compact' ? '12px' : '16px',
      overflow: 'hidden',
      boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      display: 'flex',
      flexDirection: 'column' as const,
      textDecoration: 'none',
      color: 'inherit',
      border: '1px solid #f3f4f6'
    };

    switch (variant) {
      case 'featured':
        return {
          ...baseStyles,
          boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)',
          border: '1px solid #F97316'
        };
      case 'compact':
        return {
          ...baseStyles,
          borderRadius: '12px',
          boxShadow: '0 1px 4px rgba(0, 0, 0, 0.06)'
        };
      default:
        return baseStyles;
    }
  };

  const getThumbnailHeight = () => {
    switch (variant) {
      case 'featured': return '220px';
      case 'compact': return '160px';
      default: return '200px';
    }
  };

  const getPaddingSize = () => {
    switch (variant) {
      case 'featured': return '24px';
      case 'compact': return '16px';
      default: return '20px';
    }
  };

  return (
    <Link 
      to={`/course/${course.id}`}
      style={getCardStyles()}
      className={`course-card group hover:-translate-y-1 hover:shadow-lg transition-all duration-300 ${className}`}
    >
      {/* Thumbnail */}
      <div style={{
        position: 'relative',
        height: getThumbnailHeight(),
        background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        {/* Course Image or Fallback */}
        {course.thumbnail ? (
          <img 
            src={course.thumbnail} 
            alt={course.title}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        ) : (
          <div style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'white',
            fontSize: variant === 'compact' ? '48px' : '64px',
            fontWeight: '900',
            opacity: 0.2
          }}>
            {course.title.charAt(0)}
          </div>
        )}

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
      <div style={{ 
        padding: getPaddingSize(), 
        flex: 1, 
        display: 'flex', 
        flexDirection: 'column' 
      }}>
        {/* Title */}
        <h3 style={{
          fontSize: variant === 'compact' ? '16px' : '20px',
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

        {/* Description */}
        <p style={{
          fontSize: variant === 'compact' ? '13px' : '14px',
          color: '#6B7280',
          lineHeight: '1.6',
          marginBottom: '16px',
          display: '-webkit-box',
          WebkitLineClamp: variant === 'compact' ? 2 : 3,
          WebkitBoxOrient: 'vertical',
          overflow: 'hidden',
          flex: 1
        }}>
          {truncateText(course.shortDescription, 120)}
        </p>

        {/* What You'll Learn Preview */}
        {variant !== 'compact' && (
          <div style={{ marginBottom: '16px' }}>
            <h4 style={{
              fontSize: '13px',
              fontWeight: '600',
              color: '#111827',
              marginBottom: '8px'
            }}>
              What You'll Learn:
            </h4>
            <ul style={{
              fontSize: '12px',
              color: '#6B7280',
              paddingLeft: '16px',
              margin: 0
            }}>
              {course.whatYouWillLearn.slice(0, 2).map((item, index) => (
                <li key={index} style={{ marginBottom: '4px' }}>
                  {item}
                </li>
              ))}
              {course.whatYouWillLearn.length > 2 && (
                <li style={{ color: '#F97316', fontWeight: '500' }}>
                  +{course.whatYouWillLearn.length - 2} more skills
                </li>
              )}
            </ul>
          </div>
        )}

        {/* Instructor */}
        {showInstructor && (
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
        )}

        {/* Stats */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: variant === 'compact' ? 'repeat(2, 1fr)' : 'repeat(3, 1fr)',
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
          {variant !== 'compact' && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FontAwesomeIcon icon={faBook} className="w-4 h-4" />
              <span>{course.lessons} lessons</span>
            </div>
          )}
        </div>

        {/* Duration & Certification */}
        {variant !== 'compact' && (
          <div style={{
            display: 'flex',
            gap: '16px',
            marginBottom: '16px',
            fontSize: '12px',
            color: '#6B7280'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
              <span>{formatDuration(course.duration)}</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FontAwesomeIcon icon={faCertificate} className="w-3 h-3" />
              <span>Certificate</span>
            </div>
          </div>
        )}

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
              fontSize: variant === 'compact' ? '18px' : '22px',
              fontWeight: '700',
              color: '#059669',
              lineHeight: '1'
            }}>
              {formatPrice(course.price)}
            </div>
            {variant !== 'compact' && (
              <div style={{
                fontSize: '12px',
                color: '#6B7280',
                marginTop: '4px'
              }}>
                {formatDuration(course.duration)}
              </div>
            )}
          </div>

          <button 
            className="group-hover:scale-105 transition-transform duration-300"
            style={{
              padding: variant === 'compact' ? '8px 16px' : '12px 24px',
              background: '#2563eb',
              color: 'white',
              border: 'none',
              borderRadius: '8px',
              fontSize: variant === 'compact' ? '12px' : '14px',
              fontWeight: '600',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
            onMouseEnter={(e) => e.currentTarget.style.background = '#1d4ed8'}
            onMouseLeave={(e) => e.currentTarget.style.background = '#2563eb'}
          >
            View Details
            <FontAwesomeIcon 
              icon={faArrowRight} 
              className="w-3 h-3 group-hover:translate-x-1 transition-transform duration-300" 
            />
          </button>
        </div>
      </div>
      
      {/* Responsive Styles */}
      <style>{`
        .course-card {
          animation: fadeInUp 0.6s ease-out;
        }
        
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
        
        /* Mobile optimizations */
        @media (max-width: 640px) {
          .course-card {
            margin-bottom: 1rem;
            border-radius: 12px !important;
          }
          
          .course-card h3 {
            font-size: 16px !important;
            line-height: 1.3 !important;
          }
          
          .course-card p {
            font-size: 13px !important;
            line-height: 1.5 !important;
          }
        }
        
        /* Tablet optimizations */
        @media (min-width: 641px) and (max-width: 1024px) {
          .course-card {
            margin-bottom: 1.5rem;
          }
        }
        
        /* Ensure proper text truncation */
        .course-card h3,
        .course-card p {
          word-wrap: break-word;
          overflow-wrap: break-word;
        }
      `}</style>
    </Link>
  );
};

export default CourseCard;