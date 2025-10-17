import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { 
  faStar, 
  faUsers, 
  faBook, 
  faClock, 
  faCertificate, 
  faCheckCircle, 
  faArrowLeft,
  faPlay,
  faDownload,
  faShare
} from '@fortawesome/free-solid-svg-icons';
import coursesData from '@/data/courses.json';
import { Course } from '@/components/CourseCard';
import { formatPrice } from '@/utils/formatPrice';

const CourseDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  
  // Find the course by ID
  const course: Course | undefined = coursesData.find(c => c.id === id);

  if (!course) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Course Not Found</h1>
          <p className="text-gray-600 mb-8">The course you're looking for doesn't exist.</p>
          <Link 
            to="/courses"
            className="bg-[#F97316] hover:bg-[#EA580C] text-white font-bold px-8 py-3 rounded-lg transition-all duration-300"
          >
            Browse All Courses
          </Link>
        </div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <Link 
            to="/courses"
            className="inline-flex items-center gap-2 text-[#F97316] hover:text-[#EA580C] transition-colors duration-200 mb-4"
          >
            <FontAwesomeIcon icon={faArrowLeft} className="w-4 h-4" />
            Back to Courses
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Course Info */}
            <div className="flex-1 animate-fadeInUp">
              <div className="flex flex-wrap gap-2 mb-4">
                {course.isBestseller && (
                  <span className="px-3 py-1 bg-[#F59E0B] text-white text-sm font-bold rounded-full">
                    Bestseller
                  </span>
                )}
                <span className="px-3 py-1 bg-[#F97316] text-white text-sm font-semibold rounded-full">
                  {course.category}
                </span>
                <span className="px-3 py-1 bg-gray-200 text-gray-700 text-sm font-semibold rounded-full">
                  {course.level}
                </span>
              </div>
              
              <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
                {course.title}
              </h1>
              
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                {course.description}
              </p>
              
              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faStar} className="w-5 h-5 text-[#F59E0B]" />
                  <span className="font-semibold text-gray-900">{course.rating}</span>
                  <span className="text-gray-600">({course.totalRatings.toLocaleString()} reviews)</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faUsers} className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">{(course.students / 1000).toFixed(1)}k students</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faBook} className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">{course.lessons} lessons</span>
                </div>
                <div className="flex items-center gap-2">
                  <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-gray-600" />
                  <span className="text-gray-600">{course.duration}</span>
                </div>
              </div>
              
              {/* Instructor */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-[#F97316] rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {course.instructor.charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Instructor</p>
                  <p className="text-gray-600">{course.instructor}</p>
                </div>
              </div>
            </div>
            
            {/* Course Card */}
            <div className="lg:w-80 animate-fadeInUp">
              <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
                {/* Course Thumbnail */}
                <div className="relative mb-4">
                  <div className="aspect-video bg-gradient-to-br from-[#F97316] to-[#EA580C] rounded-lg flex items-center justify-center">
                    {course.thumbnail ? (
                      <img 
                        src={course.thumbnail} 
                        alt={course.title}
                        className="w-full h-full object-cover rounded-lg"
                      />
                    ) : (
                      <span className="text-white text-6xl font-bold opacity-20">
                        {course.title.charAt(0)}
                      </span>
                    )}
                  </div>
                  <button className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-30 rounded-lg opacity-0 hover:opacity-100 transition-opacity duration-200">
                    <FontAwesomeIcon icon={faPlay} className="w-8 h-8 text-white" />
                  </button>
                </div>
                
                {/* Price */}
                <div className="text-center mb-6">
                  <div className="text-3xl font-bold text-[#F97316] mb-2">
                    {formatPrice(course.price)}
                  </div>
                  <div className="text-sm text-gray-600">
                    {course.sessions}
                  </div>
                </div>
                
                {/* CTA Buttons */}
                <div className="space-y-3">
                  <button className="w-full bg-[#F97316] hover:bg-[#EA580C] text-white font-bold py-3 px-6 rounded-lg transition-all duration-300 hover:scale-105">
                    Enroll Now
                  </button>
                  <div className="flex gap-2">
                    <button className="flex-1 border border-gray-300 hover:border-[#F97316] text-gray-700 hover:text-[#F97316] font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <FontAwesomeIcon icon={faShare} className="w-4 h-4" />
                      Share
                    </button>
                    <button className="flex-1 border border-gray-300 hover:border-[#F97316] text-gray-700 hover:text-[#F97316] font-semibold py-2 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-2">
                      <FontAwesomeIcon icon={faDownload} className="w-4 h-4" />
                      Save
                    </button>
                  </div>
                </div>
                
                {/* Course Includes */}
                <div className="mt-6 pt-6 border-t border-gray-200">
                  <h3 className="font-semibold text-gray-900 mb-3">This course includes:</h3>
                  <ul className="space-y-2 text-sm text-gray-600">
                    <li className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-green-500" />
                      {course.sessions}
                    </li>
                    <li className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-green-500" />
                      {course.assessment}
                    </li>
                    <li className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCertificate} className="w-4 h-4 text-green-500" />
                      {course.certification}
                    </li>
                    <li className="flex items-center gap-2">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-green-500" />
                      Lifetime access
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Course Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl">
          {/* What You'll Learn */}
          <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">What You'll Learn</h2>
            <div className="grid md:grid-cols-2 gap-4">
              {course.whatYouWillLearn.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5 text-green-500 mt-1 flex-shrink-0" />
                  <span className="text-gray-700">{item}</span>
                </div>
              ))}
            </div>
          </section>
          
          {/* Course Description */}
          <section className="bg-white rounded-lg shadow-sm p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">About This Course</h2>
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-6">
                {course.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Course Details</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Duration:</strong> {course.duration}</li>
                    <li><strong>Sessions:</strong> {course.sessions}</li>
                    <li><strong>Level:</strong> {course.level}</li>
                    <li><strong>Category:</strong> {course.category}</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">Assessment & Certification</h3>
                  <ul className="space-y-2 text-gray-700">
                    <li><strong>Assessment:</strong> {course.assessment}</li>
                    <li><strong>Certificate:</strong> {course.certification}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
          
          {/* Course Outcome */}
          <section className="bg-gradient-to-r from-[#F97316] to-[#EA580C] rounded-lg p-8 text-white">
            <h2 className="text-2xl font-bold mb-4">Course Outcome</h2>
            <p className="text-lg leading-relaxed">
              {course.outcome}
            </p>
          </section>
        </div>
      </div>
      
      {/* Custom Styles */}
      <style>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out;
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
        
        @media (max-width: 1024px) {
          .lg\\:w-80 {
            width: 100% !important;
          }
        }
        
        @media (max-width: 768px) {
          .container > div:last-child {
            flex-direction: column !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </div>
  );
};

export default CourseDetailPage;
