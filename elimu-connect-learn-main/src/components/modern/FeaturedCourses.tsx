import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUsers, faArrowRight, faBook } from '@fortawesome/free-solid-svg-icons';
import CourseCard, { Course } from '@/components/CourseCard';
import coursesData from '@/data/courses.json';
import { formatPrice } from '@/utils/formatPrice';

const FeaturedCourses: React.FC = () => {
  // Get featured courses from the data
  const courses: Course[] = coursesData.filter(course => course.isFeatured);

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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <CourseCard 
              key={course.id}
              course={course} 
              variant="featured"
              showInstructor={true}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .container > div:last-child {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .container > div:last-child {
            gap: 1rem !important;
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

export default FeaturedCourses;
