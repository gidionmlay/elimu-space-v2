import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useState } from "react";

interface CoursesHeroProps {
  onSearch?: (query: string) => void;
}

export default function CoursesHero({ onSearch }: CoursesHeroProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (onSearch) {
      onSearch(searchQuery);
    }
  };

  return (
    <div className="relative bg-gradient-to-br from-orange-500 via-orange-600 to-orange-700 text-white py-20 md:py-28">
      {/* Background Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20px 20px, white 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
      />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl mx-auto text-center">
          {/* Heading */}
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Explore Our Courses
          </h1>
          <p className="text-lg md:text-xl text-orange-100 mb-8">
            Learn practical skills in digital literacy, entrepreneurship, and financial education
          </p>

          {/* Search Bar */}
          <form onSubmit={handleSearch} className="relative max-w-2xl mx-auto">
            <div className="flex items-center bg-white rounded-full shadow-lg overflow-hidden">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search for courses..."
                className="flex-1 px-6 py-4 text-gray-800 text-lg focus:outline-none"
              />
              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 font-semibold transition-colors duration-300"
                aria-label="Search courses"
              >
                <FontAwesomeIcon icon={faSearch} className="w-6 h-6" />
              </button>
            </div>
          </form>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-6 mt-12 max-w-xl mx-auto">
            <div>
              <div className="text-3xl md:text-4xl font-bold">500+</div>
              <div className="text-sm md:text-base text-orange-100 mt-1">Courses</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">50K+</div>
              <div className="text-sm md:text-base text-orange-100 mt-1">Students</div>
            </div>
            <div>
              <div className="text-3xl md:text-4xl font-bold">200+</div>
              <div className="text-sm md:text-base text-orange-100 mt-1">Instructors</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
