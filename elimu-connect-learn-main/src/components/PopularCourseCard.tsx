import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faUsers } from '@fortawesome/free-solid-svg-icons';

interface PopularCourseCardProps {
  title: string;
  instructor: string;
  lessons: number;
  students: number;
  imageText?: string;
}

const PopularCourseCard: React.FC<PopularCourseCardProps> = ({
  title,
  instructor,
  lessons,
  students,
  imageText = "Image",
}) => {
  return (
    <div
      className="bg-white rounded-xl shadow-md overflow-hidden
                 transition-all duration-300 ease-out
                 hover:-translate-y-2 hover:shadow-xl
                 flex-shrink-0 w-full"
    >
      {/* Image Placeholder */}
      <div className="bg-gray-200 h-40 flex items-center justify-center">
        <span className="text-gray-500 font-medium">{imageText}</span>
      </div>

      {/* Card Content */}
      <div className="p-4">
        {/* Instructor Section */}
        <div className="flex items-center gap-2 mb-3">
          <div className="w-10 h-10 rounded-full bg-gray-300" />
          <span className="text-sm font-medium text-gray-700">{instructor}</span>
        </div>

        {/* Course Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-3 line-clamp-2">
          {title}
        </h3>

        {/* Meta Row */}
        <div className="flex items-center justify-between text-sm text-gray-600 mb-3">
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faBook} className="w-4 h-4 text-blue-600" />
            {lessons} lessons
          </span>
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faUsers} className="w-4 h-4 text-green-600" />
            {students} students
          </span>
        </div>

        {/* Price */}
        <div className="text-xl font-bold text-green-600">Free</div>
      </div>
    </div>
  );
};

export default PopularCourseCard;
