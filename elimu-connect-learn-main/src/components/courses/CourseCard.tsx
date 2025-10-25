import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faUsers, faClock } from "@fortawesome/free-solid-svg-icons";
import { Course } from "@/types/course";
import { useNavigate } from "react-router-dom";

interface CourseCardProps {
  course: Course;
}

export default function CourseCard({ course }: CourseCardProps) {
  const navigate = useNavigate();

  const handleViewDetails = () => {
    navigate(`/course/${course.id}`, { state: { course } });
  };
  return (
    <div
      className="group bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
      style={{ transition: "all 0.3s ease" }}
      onClick={handleViewDetails}
    >
      {/* Thumbnail */}
      <div className="relative aspect-video bg-gray-200 overflow-hidden">
        {course.thumbnail ? (
          <img
            src={course.thumbnail}
            alt={course.title}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-orange-400 to-orange-600">
            <span className="text-white text-4xl font-bold">
              {course.title.charAt(0)}
            </span>
          </div>
        )}
        {course.isFeatured && (
          <div className="absolute top-3 right-3 bg-orange-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            Featured
          </div>
        )}
        {course.isFree && (
          <div className="absolute top-3 left-3 bg-blue-500 text-white text-xs px-3 py-1 rounded-full font-semibold">
            Free
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        {/* Category Badge */}
        <div className="mb-3">
          <span className="inline-block bg-orange-100 text-orange-600 text-xs px-3 py-1 rounded-full font-medium">
            {course.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-orange-600 transition-colors">
          {course.title}
        </h3>

        {/* Instructor */}
        <p className="text-sm text-gray-600 mb-3">by {course.instructor}</p>

        {/* Meta Info */}
        <div className="flex items-center gap-4 mb-4 text-sm text-gray-600">
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faStar} className="w-4 h-4 text-yellow-400" />
            <span className="font-semibold">{course.rating.toFixed(1)}</span>
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
            <span>{course.studentsCount.toLocaleString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
            <span>{course.duration}</span>
          </div>
        </div>

        {/* Level */}
        <div className="mb-4">
          <span className="text-xs text-gray-500 bg-gray-100 px-2 py-1 rounded">
            {course.level}
          </span>
        </div>

        {/* Price & Button */}
        <div className="flex items-center justify-between pt-4 border-t border-gray-200">
          <div>
            {course.isFree ? (
              <span className="text-xl font-bold text-green-600">Free</span>
            ) : (
              <span className="text-xl font-bold text-gray-800">
                TZS {course.price.toLocaleString()}
              </span>
            )}
          </div>
          <button
            onClick={(e) => { e.stopPropagation(); handleViewDetails(); }}
            className="bg-orange-500 hover:bg-orange-600 text-white px-5 py-2 rounded-lg font-semibold text-sm transition-all duration-300 hover:shadow-lg"
            aria-label={`Enroll in ${course.title}`}
          >
            View Details
          </button>
        </div>
      </div>
    </div>
  );
}
