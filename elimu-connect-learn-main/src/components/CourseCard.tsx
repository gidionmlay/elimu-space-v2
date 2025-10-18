import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faUsers, faBook, faClock, faCertificate, faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import { formatPrice, truncateText, formatDuration } from '@/utils/formatPrice';
import { getCourseImage, getCourseImageByTitle } from '@/utils/courseImages';

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
    return {
      display: 'flex',
      flexDirection: 'column' as const,
      textDecoration: 'none',
      color: 'inherit',
    };
  };


  return (
    <Link 
      to={`/course/${course.id}`}
      style={getCardStyles()}
      className={`course-card group shadow-md hover:shadow-xl transition-all duration-300 rounded-xl overflow-hidden bg-white hover:scale-[1.02] ${className}`}
    >
      {/* Course Image */}
      <div className="relative overflow-hidden">
        <img 
          src={getCourseImage(course.id, course.thumbnail) || getCourseImageByTitle(course.title)} 
          alt={`${course.title} Course`}
          className="object-cover w-full h-56 rounded-t-xl"
          loading="lazy"
          onError={(e) => {
            console.log(`Failed to load image for course: ${course.title}`);
            e.currentTarget.style.display = 'none';
            e.currentTarget.nextElementSibling.style.display = 'flex';
          }}
        />
        {/* Fallback when image fails to load */}
        <div 
          className="w-full h-56 flex items-center justify-center bg-gradient-to-br from-orange-500 to-orange-600 text-white font-black text-6xl rounded-t-xl"
          style={{
            display: 'none',
          }}
        >
          {course.title.charAt(0)}
        </div>
      </div>

      {/* Content */}
      <div className="p-6 flex-1 flex flex-col">
        {/* Title */}
        <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
          {course.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 mb-4 line-clamp-3 flex-1">
          {truncateText(course.shortDescription, 120)}
        </p>


        {/* Instructor */}
        {showInstructor && (
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-200">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center text-sm font-semibold text-orange-600">
              {course.instructor.charAt(0)}
            </div>
            <span className="text-sm text-gray-600 font-medium">
              {course.instructor}
            </span>
          </div>
        )}

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-6 text-sm text-gray-600">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-500" />
            <span className="font-semibold text-gray-900">{course.rating}</span>
            <span>({course.totalRatings.toLocaleString()})</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
            <span>{(course.students / 1000).toFixed(1)}k</span>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faBook} className="w-4 h-4" />
            <span>{course.lessons}</span>
          </div>
        </div>


        {/* Price + CTA */}
        <div className="flex justify-between items-center pt-4 border-t border-gray-200">
          <div>
            <div className="text-2xl font-bold text-emerald-600">
              {formatPrice(course.price)}
            </div>
          </div>

          <button 
            className="group-hover:scale-105 transition-transform duration-300 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold text-sm flex items-center gap-2"
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
      `}</style>
    </Link>
  );
};

export default CourseCard;