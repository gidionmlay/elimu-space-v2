import React, { useState, useRef } from "react";
import PopularCourseCard from "./PopularCourseCard";

const PopularCourses: React.FC = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const courses = [
    {
      id: 1,
      title: "How to Create an Online Course",
      instructor: "Kerry White",
      lessons: 10,
      students: 200,
      imageText: "Image",
    },
    {
      id: 2,
      title: "Web Development Fundamentals",
      instructor: "Kerry White",
      lessons: 15,
      students: 350,
      imageText: "Image",
    },
    {
      id: 3,
      title: "Digital Marketing Mastery",
      instructor: "Kerry White",
      lessons: 12,
      students: 180,
      imageText: "Image",
    },
    {
      id: 4,
      title: "Graphic Design Essentials",
      instructor: "Kerry White",
      lessons: 8,
      students: 220,
      imageText: "Image",
    },
    {
      id: 5,
      title: "Data Science Basics",
      instructor: "Kerry White",
      lessons: 20,
      students: 400,
      imageText: "Image",
    },
    {
      id: 6,
      title: "Mobile App Development",
      instructor: "Kerry White",
      lessons: 18,
      students: 310,
      imageText: "Image",
    },
  ];

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const scrollAmount = container.offsetWidth * 0.8;
    const newPosition =
      direction === "left"
        ? container.scrollLeft - scrollAmount
        : container.scrollLeft + scrollAmount;

    container.scrollTo({
      left: newPosition,
      behavior: "smooth",
    });
  };

  const handleScroll = () => {
    if (scrollContainerRef.current) {
      setScrollPosition(scrollContainerRef.current.scrollLeft);
    }
  };

  const canScrollLeft = scrollPosition > 0;
  const canScrollRight =
    scrollContainerRef.current &&
    scrollPosition <
      scrollContainerRef.current.scrollWidth -
        scrollContainerRef.current.clientWidth - 10;

  return (
    <section className="pt-32 md:pt-40 pb-16 bg-white">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="flex items-end justify-between mb-8">
          <div className="text-center flex-1">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
              Popular Courses
            </h2>
            <p className="text-gray-500 text-sm md:text-base">
              Limitless learning, more possibilities
            </p>
          </div>

          {/* Arrow Navigation */}
          <div className="flex gap-2 ml-4">
            <button
              onClick={() => scroll("left")}
              disabled={!canScrollLeft}
              className={`w-10 h-10 rounded-full flex items-center justify-center
                         transition-all duration-300
                         ${
                           canScrollLeft
                             ? "bg-gray-800 hover:bg-gray-700 text-white"
                             : "bg-gray-200 text-gray-400 cursor-not-allowed"
                         }`}
              aria-label="Scroll left"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
            </button>
            <button
              onClick={() => scroll("right")}
              disabled={!canScrollRight}
              className={`w-10 h-10 rounded-full flex items-center justify-center
                         transition-all duration-300
                         ${
                           canScrollRight
                             ? "bg-gray-800 hover:bg-gray-700 text-white"
                             : "bg-gray-200 text-gray-400 cursor-not-allowed"
                         }`}
              aria-label="Scroll right"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Carousel */}
        <div
          ref={scrollContainerRef}
          onScroll={handleScroll}
          className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {courses.map((course) => (
            <div
              key={course.id}
              className="w-full sm:w-[calc(50%-12px)] lg:w-[calc(25%-18px)] flex-shrink-0"
            >
              <PopularCourseCard
                title={course.title}
                instructor={course.instructor}
                lessons={course.lessons}
                students={course.students}
                imageText={course.imageText}
              />
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="flex justify-center mt-10">
          <button
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold
                       px-8 py-3 rounded-lg
                       transition-all duration-300 ease-out
                       hover:scale-105 shadow-md hover:shadow-xl"
          >
            VIEW MORE
          </button>
        </div>
      </div>

      {/* Hide scrollbar */}
      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default PopularCourses;
