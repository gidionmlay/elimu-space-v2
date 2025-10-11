/**
 * Student Card Component
 * Displays student information and progress for instructor
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUser,
  faCalendar,
  faChartLine,
  faCheckCircle,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { CourseStudent } from '@/types';
import { Progress } from '@/components/ui/progress';

interface StudentCardProps {
  student: CourseStudent;
  showCourse?: boolean;
}

const StudentCard: React.FC<StudentCardProps> = ({ student, showCourse = false }) => {
  const {
    student_name,
    student_email,
    student_profile_image,
    enrollment_date,
    progress,
    status,
    last_activity,
    average_score,
  } = student;

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'text-green-600 bg-green-100';
      case 'in_progress':
        return 'text-blue-600 bg-blue-100';
      case 'enrolled':
        return 'text-gray-600 bg-gray-100';
      case 'dropped':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusLabel = (status: string) => {
    return status.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getTimeSinceActivity = (dateString: string) => {
    const now = new Date();
    const activityDate = new Date(dateString);
    const diffMs = now.getTime() - activityDate.getTime();
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'Today';
    if (diffDays === 1) return 'Yesterday';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    return `${Math.floor(diffDays / 30)} months ago`;
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-5">
      {/* Header */}
      <div className="flex items-start gap-4 mb-4">
        {/* Avatar */}
        <div className="w-14 h-14 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center flex-shrink-0 overflow-hidden">
          {student_profile_image ? (
            <img
              src={student_profile_image}
              alt={student_name}
              className="w-full h-full object-cover"
            />
          ) : (
            <FontAwesomeIcon icon={faUser} className="w-6 h-6 text-white" />
          )}
        </div>

        {/* Info */}
        <div className="flex-1 min-w-0">
          <h4 className="font-bold text-gray-800 truncate">{student_name}</h4>
          <p className="text-sm text-gray-500 truncate">{student_email}</p>
          <div className="mt-1">
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(status)}`}>
              {getStatusLabel(status)}
            </span>
          </div>
        </div>
      </div>

      {/* Progress */}
      <div className="mb-4">
        <div className="flex items-center justify-between text-sm mb-2">
          <span className="text-gray-600 flex items-center gap-1">
            <FontAwesomeIcon icon={faChartLine} className="w-4 h-4" />
            Progress
          </span>
          <span className="font-semibold text-gray-800">{Number(progress || 0)}%</span>
        </div>
        <Progress value={Number(progress || 0)} className="h-2" />
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-3 mb-4">
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <FontAwesomeIcon icon={faCalendar} className="w-3 h-3" />
            <span className="text-xs">Enrolled</span>
          </div>
          <p className="text-xs font-semibold text-gray-800">{formatDate(enrollment_date)}</p>
        </div>
        <div className="bg-gray-50 rounded-lg p-3">
          <div className="flex items-center gap-2 text-gray-600 mb-1">
            <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
            <span className="text-xs">Last Activity</span>
          </div>
          <p className="text-xs font-semibold text-gray-800">{getTimeSinceActivity(last_activity)}</p>
        </div>
      </div>

      {/* Average Score */}
      {average_score !== undefined && average_score !== null && (
        <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
          <span className="text-sm text-blue-700 font-medium">Average Score</span>
          <span className="text-lg font-bold text-blue-700">{Number(average_score || 0)}%</span>
        </div>
      )}

      {/* Completed Badge */}
      {status === 'completed' && (
        <div className="mt-3 flex items-center justify-center gap-2 text-green-600 text-sm font-medium">
          <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4" />
          <span>Course Completed</span>
        </div>
      )}
    </div>
  );
};

export default StudentCard;

