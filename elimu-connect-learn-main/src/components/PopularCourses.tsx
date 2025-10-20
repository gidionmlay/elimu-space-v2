import React from "react";
import CourseCard, { Course } from "./CourseCard";
import coursesData from "@/data/courses.json";

const PopularCourses: React.FC = () => {
  // Get featured courses and bestsellers for popular courses
  const courses: Course[] = coursesData.filter(course => 
    course.isBestseller || course.isFeatured
  ).slice(0, 6);

  return (
    <section className="popular-courses py-16 md:py-20 bg-gradient-to-b from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 mt-10">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fadeInUp">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4 font-poppins">
            Popular Courses
          </h2>
          <p className="text-gray-600 dark:text-gray-300 text-lg max-w-2xl mx-auto font-inter">
            Top-rated courses handpicked by our experts to accelerate your learning journey
          </p>
        </div>


        {/* Courses Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="animate-fadeInUp"
              style={{
                animationDelay: `${index * 0.1}s`
              }}
            >
              <CourseCard 
                course={course} 
                variant="default"
                showInstructor={true}
              />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-12">
          <a
            href="/courses"
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold
                       px-8 py-3 rounded-lg
                       transition-all duration-300 ease-out
                       hover:scale-105 shadow-md hover:shadow-xl
                       text-decoration-none inline-flex items-center gap-2"
          >
            View All Courses
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        .animate-fadeInUp {
          animation: fadeInUp 0.8s ease-out forwards;
          opacity: 0;
          transform: translateY(30px);
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        /* Responsive adjustments */
        @media (max-width: 1024px) {
          .grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 1.5rem !important;
          }
        }
        
        @media (max-width: 768px) {
          .grid {
            grid-template-columns: 1fr !important;
            gap: 1.5rem !important;
          }
        }
        
        @media (max-width: 480px) {
          .grid {
            gap: 1rem !important;
          }
          
          .container {
            padding-left: 1rem !important;
            padding-right: 1rem !important;
          }
        }
        
        /* Ensure cards don't overflow */
        .course-card {
          max-width: 100%;
          width: 100%;
        }
      `}</style>
    </section>
  );
};

export default PopularCourses;
