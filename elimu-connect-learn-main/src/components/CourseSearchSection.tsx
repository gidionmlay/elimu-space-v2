import React, { useState, useRef, useEffect } from "react";

const CourseSearchSection: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [dropdownSearch, setDropdownSearch] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  const courseCategories = [
    "Agriculture Course",
    "Business Course",
    "Career Course",
    "Art Course",
  ];

  const filteredCategories = courseCategories.filter((category) =>
    category.toLowerCase().includes(dropdownSearch.toLowerCase())
  );

  const handleSearch = (category?: string) => {
    const categoryToSearch = category || selectedCategory;
    console.log("Searching for:", searchTerm, "Category:", categoryToSearch);
    // Add your search/filter logic here
    if (category) {
      setSelectedCategory(category);
      setIsDropdownOpen(false);
      setDropdownSearch("");
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
        setDropdownSearch("");
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, category: string) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      handleSearch(category);
    }
  };

  return (
    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-full max-w-5xl px-4 z-20">
      <div
        className="bg-gradient-to-r from-yellow-400 via-yellow-500 to-orange-400
                   rounded-2xl shadow-2xl p-6 md:p-8
                   transform transition-all duration-300"
      >
        {/* Title */}
        <h2 className="text-center text-white font-bold text-xl md:text-2xl mb-6">
          Find your course. Start learn it
        </h2>

        {/* Search Form */}
        <div className="flex flex-col md:flex-row gap-4 items-center justify-center">
          {/* Input Field */}
          <div className="relative w-full md:flex-1">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              placeholder="Enter Keyword...."
              className={`w-full px-6 py-3 md:py-4 rounded-lg
                         border-2 transition-all duration-300 outline-none
                         text-gray-800 font-medium placeholder-gray-500
                         ${
                           isFocused
                             ? "border-white shadow-lg ring-4 ring-white/30 scale-[1.02]"
                             : "border-transparent shadow-md"
                         }`}
              aria-label="Search for courses"
            />

            {/* Animated glow effect on focus */}
            {isFocused && (
              <div
                className="absolute inset-0 rounded-lg pointer-events-none
                           bg-white/20 blur-md animate-pulse"
                style={{ zIndex: -1 }}
              />
            )}
          </div>

          {/* Dropdown */}
          <div ref={dropdownRef} className="relative w-full md:w-auto">
            <button
              type="button"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full md:w-auto px-8 py-3 md:py-4
                         bg-[#0d2945] hover:bg-[#132f55]
                         text-white font-bold rounded-lg
                         shadow-lg hover:shadow-2xl
                         transform transition-all duration-300
                         hover:scale-105 hover:-translate-y-1
                         active:scale-95 active:translate-y-0
                         focus:outline-none focus:ring-4 focus:ring-white/40
                         flex items-center justify-center gap-2
                         whitespace-nowrap"
              aria-label="Select course category"
              aria-haspopup="listbox"
              aria-expanded={isDropdownOpen}
            >
              {selectedCategory || "SELECT CATEGORY"}
              <svg
                className={`w-5 h-5 transform transition-transform duration-300 ${
                  isDropdownOpen ? "rotate-180" : ""
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {/* Dropdown Menu */}
            {isDropdownOpen && (
              <div
                className="absolute top-full mt-2 w-full md:w-64 bg-white rounded-lg shadow-2xl
                           overflow-hidden z-50 animate-slideDown"
                role="listbox"
              >
                {/* Search within dropdown */}
                <div className="p-3 border-b border-gray-200">
                  <input
                    type="text"
                    value={dropdownSearch}
                    onChange={(e) => setDropdownSearch(e.target.value)}
                    placeholder="Type to filter..."
                    className="w-full px-3 py-2 border border-gray-300 rounded-md
                             focus:outline-none focus:ring-2 focus:ring-[#0d2945] focus:border-transparent
                             text-gray-800 text-sm"
                    aria-label="Filter course categories"
                  />
                </div>

                {/* Options */}
                <div className="max-h-48 overflow-y-auto">
                  {filteredCategories.length > 0 ? (
                    filteredCategories.map((category) => (
                      <div
                        key={category}
                        role="option"
                        aria-selected={selectedCategory === category}
                        tabIndex={0}
                        onClick={() => handleSearch(category)}
                        onKeyDown={(e) => handleKeyDown(e, category)}
                        className={`px-4 py-3 cursor-pointer transition-colors duration-200
                                   hover:bg-[#0d2945] hover:text-white
                                   ${
                                     selectedCategory === category
                                       ? "bg-[#0d2945] text-white"
                                       : "text-gray-800"
                                   }
                                   focus:outline-none focus:bg-[#0d2945] focus:text-white`}
                      >
                        {category}
                      </div>
                    ))
                  ) : (
                    <div className="px-4 py-3 text-gray-500 text-sm">
                      No categories found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Animation for dropdown */}
        <style>{`
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
        `}</style>

        {/* Decorative elements for depth */}
        <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-orange-600/20 rounded-full blur-3xl -z-10" />
      </div>
    </div>
  );
};

export default CourseSearchSection;
