/**
 * Enrolled Course Card Component
 * Displays individual enrolled course with progress
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faClock, faChartLine } from '@fortawesome/free-solid-svg-icons';
import { Progress } from '@/components/ui/progress';
import { Enrollment } from '@/types';

interface EnrolledCourseCardProps {
  enrollment: Enrollment;
}

const EnrolledCourseCard: React.FC<EnrolledCourseCardProps> = ({ enrollment }) => {
  const { course, progress, last_accessed, status } = enrollment;

  if (!course) return null;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in_progress':
        return 'text-blue-600 bg-blue-100';
      case 'enrolled':
        return 'text-gray-600 bg-gray-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'completed':
        return 'Completed';
      case 'in_progress':
        return 'In Progress';
      case 'enrolled':
        return 'Not Started';
      default:
        return status;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group">
      {/* Thumbnail */}
      <div className="relative overflow-hidden h-48">
        <img
          src={course.thumbnail || '/gallery/banner-img.png'}
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
            {getStatusLabel(status)}
          </span>
        </div>
        {Number(progress || 0) > 0 && (
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
            <div className="flex items-center justify-between text-white text-sm mb-1">
              <span>Progress</span>
              <span>{Number(progress || 0)}%</span>
            </div>
            <Progress value={Number(progress || 0)} className="h-2" />
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-[#F97316] transition-colors">
          {course.title}
        </h3>
        
        <p className="text-sm text-gray-600 mb-4 line-clamp-2">
          {course.description}
        </p>

        {/* Course Info */}
        <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faBook} className="w-4 h-4" />
            <span>{course.level}</span>
          </div>
        </div>

        {/* Last Accessed */}
        {last_accessed && (
          <p className="text-xs text-gray-400 mb-3">
            Last accessed: {new Date(last_accessed).toLocaleDateString()}
          </p>
        )}

        {/* Action Button */}
        <Link
          to={`/courses/${course.slug}`}
          className="block w-full text-center bg-[#F97316] text-white py-2.5 rounded-lg font-semibold hover:bg-[#EA580C] transition-all duration-300"
        >
          {status === 'completed' ? 'Review Course' : 'Continue Learning'}
        </Link>
      </div>
    </div>
  );
};

export default EnrolledCourseCard;

