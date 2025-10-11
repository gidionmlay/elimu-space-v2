/**
 * Instructor Course Card Component
 * Displays course created by instructor with stats and management options
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faChartLine,
  faMoneyBillWave,
  faEdit,
  faEye,
  faToggleOn,
  faToggleOff,
} from '@fortawesome/free-solid-svg-icons';
import { InstructorCourse } from '@/types';
import { Progress } from '@/components/ui/progress';

interface InstructorCourseCardProps {
  course: InstructorCourse;
  onEdit?: (courseId: number) => void;
  onToggleStatus?: (courseId: number, currentStatus: string) => void;
}

const InstructorCourseCard: React.FC<InstructorCourseCardProps> = ({
  course,
  onEdit,
  onToggleStatus,
}) => {
  const {
    id,
    title,
    thumbnail,
    enrollment_count,
    active_students,
    completed_students,
    average_progress,
    revenue,
    status,
    category,
  } = course;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'published':
        return 'bg-green-100 text-green-700 border-green-300';
      case 'draft':
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
      case 'archived':
        return 'bg-gray-100 text-gray-700 border-gray-300';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden">
      {/* Thumbnail */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={thumbnail || '/gallery/banner-img.png'}
          alt={title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(status)}`}>
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </span>
        </div>
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-3">
          <span className="text-white text-sm font-medium">{category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-lg font-bold text-gray-800 mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faUsers} className="w-4 h-4 text-blue-600" />
            <div>
              <p className="text-xs text-gray-500">Total Students</p>
              <p className="text-sm font-bold text-gray-800">{enrollment_count || 0}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 text-green-600" />
            <div>
              <p className="text-xs text-gray-500">Active</p>
              <p className="text-sm font-bold text-gray-800">{active_students || 0}</p>
            </div>
          </div>
        </div>

        {/* Average Progress */}
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm mb-1">
            <span className="text-gray-600">Avg. Progress</span>
            <span className="font-semibold text-gray-800">{Math.round(Number(average_progress || 0))}%</span>
          </div>
          <Progress value={Number(average_progress || 0)} className="h-2" />
        </div>

        {/* Revenue */}
        <div className="flex items-center gap-2 mb-4 p-3 bg-purple-50 rounded-lg">
          <FontAwesomeIcon icon={faMoneyBillWave} className="w-5 h-5 text-purple-600" />
          <div>
            <p className="text-xs text-purple-600">Revenue</p>
            <p className="text-lg font-bold text-purple-700">TSh {Number(revenue || 0).toLocaleString()}</p>
          </div>
        </div>

        {/* Completion Stats */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-4">
          <span>Completed: {completed_students || 0}</span>
          <span>Rate: {Number(enrollment_count || 0) > 0 ? Math.round((Number(completed_students || 0) / Number(enrollment_count || 1)) * 100) : 0}%</span>
        </div>

        {/* Actions */}
        <div className="flex gap-2">
          <Link
            to={`/courses/${course.slug || course.id}`}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white py-2 rounded-lg font-medium hover:bg-blue-700 transition-all text-sm"
          >
            <FontAwesomeIcon icon={faEye} className="w-4 h-4" />
            View
          </Link>
          {onEdit && (
            <button
              onClick={() => onEdit(id)}
              className="flex-1 flex items-center justify-center gap-2 bg-gray-600 text-white py-2 rounded-lg font-medium hover:bg-gray-700 transition-all text-sm"
            >
              <FontAwesomeIcon icon={faEdit} className="w-4 h-4" />
              Edit
            </button>
          )}
          {onToggleStatus && (
            <button
              onClick={() => onToggleStatus(id, status)}
              className={`px-4 py-2 rounded-lg font-medium transition-all text-sm ${
                status === 'published'
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200'
                  : 'bg-green-100 text-green-700 hover:bg-green-200'
              }`}
              title={status === 'published' ? 'Unpublish' : 'Publish'}
            >
              <FontAwesomeIcon icon={status === 'published' ? faToggleOff : faToggleOn} className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default InstructorCourseCard;

