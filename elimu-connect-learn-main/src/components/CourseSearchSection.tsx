import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faChevronDown } from "@fortawesome/free-solid-svg-icons";

const CourseSearchSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [searchError, setSearchError] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const courseCategories = [
    { value: "design", label: "Design & Creative" },
    { value: "business", label: "Business & Entrepreneurship" },
    { value: "tech", label: "Technology & Programming" },
    { value: "finance", label: "Finance & Digital Money" },
    { value: "agriculture", label: "Agriculture & Farming" },
    { value: "career", label: "Career Development" },
    { value: "soft-skills", label: "Soft Skills & Leadership" }
  ];

  // Course search mappings for smart redirects
  const courseMappings: { [key: string]: string } = {
    "graphics": "/course/graphic-design-branding",
    "graphic design": "/course/graphic-design-branding",
    "design": "/course/graphic-design-branding",
    "digital marketing": "/course/digital-marketing-mastery",
    "marketing": "/course/digital-marketing-mastery",
    "business skills": "/course/entrepreneurship-business-skills",
    "entrepreneurship": "/course/entrepreneurship-business-skills",
    "business": "/course/entrepreneurship-business-skills",
    "finance essentials": "/course/finance-essentials",
    "finance": "/course/finance-essentials",
    "career launchpad": "/course/career-launchpad",
    "career": "/course/career-launchpad",
    "communication": "/course/confident-communication",
    "data analytics": "/course/data-analytics-essentials",
    "analytics": "/course/data-analytics-essentials",
    "leadership": "/course/soft-skills-leadership",
    "soft skills": "/course/soft-skills-leadership"
  };

  const handleSearch = () => {
    // Clear any previous error state
    setSearchError(false);
    
    // Check if search term is empty
    if (!searchTerm.trim()) {
      setSearchError(true);
      // Shake animation for empty search
      setTimeout(() => setSearchError(false), 500);
      return;
    }

    const lowerQuery = searchTerm.toLowerCase().trim();
    
    // Check if the search term matches any course
    if (courseMappings[lowerQuery]) {
      navigate(courseMappings[lowerQuery]);
    } else {
      // Redirect to courses page with request course section
      navigate("/courses#request-course");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleCategorySelect = (value: string, label: string) => {
    setSelectedCategory(value);
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <section className="find-course-section bg-gradient-to-r from-amber-400 to-orange-500 py-10 px-6 rounded-2xl shadow-md text-center relative overflow-visible z-10 mb-16">
      {/* Main Content */}
      <div className="max-w-4xl mx-auto relative z-20">
        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-bold text-white mb-6 font-['Poppins']">
          Find your course. <span className="text-blue-900">Start learning today.</span>
        </h2>

        {/* Search Form */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-4 relative z-20">
          {/* Search Input */}
          <div className="relative w-full md:w-2/3 lg:w-1/2">
            <div className="relative">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
                onKeyDown={handleKeyDown}
                placeholder="Search by course name..."
                className={`w-full bg-white text-gray-800 font-semibold py-3 px-5 pl-12 rounded-xl border shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 transition-all duration-300 hover:shadow-md ${
                  searchError 
                    ? "border-red-500 ring-2 ring-red-200 animate-shake" 
                    : "border-gray-200"
                }`}
                aria-label="Search for courses"
                autoFocus
              />
              <FontAwesomeIcon 
                icon={faSearch} 
                className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" 
              />
            </div>
          </div>

          {/* Category Dropdown */}
          <div ref={dropdownRef} className="relative w-full md:w-auto">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full md:w-auto bg-white text-gray-800 font-semibold py-3 px-5 pr-10 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-600 cursor-pointer transition-all duration-300 hover:shadow-md hover:-translate-y-1 flex items-center justify-between min-w-[200px]"
              aria-label="Select course category"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              <span className="truncate">
                {selectedCategory ? courseCategories.find(cat => cat.value === selectedCategory)?.label : "Select a Category"}
              </span>
              <FontAwesomeIcon 
                icon={faChevronDown} 
                className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`} 
              />
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="absolute top-full mt-2 w-full bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden z-50 animate-slideDown"
                role="listbox"
              >
                {courseCategories.map((category) => (
                  <button
                    key={category.value}
                    type="button"
                    onClick={() => handleCategorySelect(category.value, category.label)}
                    className={`w-full text-left px-4 py-3 transition-colors duration-200 hover:bg-blue-50 focus:outline-none focus:bg-blue-50 ${
                      selectedCategory === category.value
                        ? "bg-blue-100 text-blue-800 font-semibold"
                        : "text-gray-800"
                    }`}
                    role="option"
                    aria-selected={selectedCategory === category.value}
                  >
                    {category.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="bg-blue-700 hover:bg-blue-800 text-white font-semibold py-3 px-8 rounded-xl shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 whitespace-nowrap transform"
          >
            Search Courses
          </button>
        </div>
      </div>

      {/* Subtle floating illustration background */}
      <div className="absolute inset-0 bg-white/5 rounded-2xl -z-10"></div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 left-4 w-20 h-20 bg-white/10 rounded-full blur-2xl -z-10"></div>
      <div className="absolute bottom-4 right-4 w-24 h-24 bg-orange-600/20 rounded-full blur-2xl -z-10"></div>

      {/* Animation styles */}
      <style jsx>{`
        @keyframes slideDown {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-slideDown {
          animation: slideDown 0.2s ease-out;
        }
        
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          10%, 30%, 50%, 70%, 90% { transform: translateX(-2px); }
          20%, 40%, 60%, 80% { transform: translateX(2px); }
        }
        .animate-shake {
          animation: shake 0.5s ease-in-out;
        }
      `}</style>
    </section>
  );
};

export default CourseSearchSection;
