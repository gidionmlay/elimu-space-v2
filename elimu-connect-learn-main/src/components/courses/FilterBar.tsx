import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faFilter, faTimes } from "@fortawesome/free-solid-svg-icons";
import { SortOption, FilterOptions } from "@/types/course";

interface FilterBarProps {
  sortOption: SortOption;
  onSortChange: (option: SortOption) => void;
  filters: FilterOptions;
  onFilterChange: (filters: FilterOptions) => void;
}

export default function FilterBar({
  sortOption,
  onSortChange,
  filters,
  onFilterChange,
}: FilterBarProps) {
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortOptions: { value: SortOption; label: string }[] = [
    { value: "newest", label: "Newest First" },
    { value: "popular", label: "Most Popular" },
    { value: "highest-rated", label: "Highest Rated" },
    { value: "free", label: "Free Courses" },
    { value: "paid", label: "Paid Courses" },
  ];

  const levelOptions = ["Beginner", "Intermediate", "Advanced"];
  const durationOptions = ["0-2 hours", "2-5 hours", "5-10 hours", "10+ hours"];
  const languageOptions = ["English", "Swahili"];

  const toggleFilter = (
    filterType: keyof FilterOptions,
    value: string
  ) => {
    const currentValues = filters[filterType] as string[] | undefined;
    const newValues = currentValues?.includes(value)
      ? currentValues.filter((v) => v !== value)
      : [...(currentValues || []), value];

    onFilterChange({ ...filters, [filterType]: newValues });
  };

  const clearFilters = () => {
    onFilterChange({
      duration: [],
      level: [],
      price: "all",
      language: [],
    });
  };

  const hasActiveFilters =
    (filters.duration?.length || 0) > 0 ||
    (filters.level?.length || 0) > 0 ||
    (filters.language?.length || 0) > 0 ||
    filters.price !== "all";

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mb-8">
      <div className="flex flex-wrap items-center gap-4 justify-between">
        {/* Sort Dropdown */}
        <div className="flex items-center gap-3">
          <label className="text-sm font-semibold text-gray-700">Sort by:</label>
          <div className="relative">
            <select
              value={sortOption}
              onChange={(e) => onSortChange(e.target.value as SortOption)}
              className="appearance-none bg-gray-50 border border-gray-300 rounded-lg px-4 py-2 pr-10 text-sm font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-orange-500 cursor-pointer"
            >
              {sortOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
            <FontAwesomeIcon icon={faChevronDown} className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
          </div>
        </div>

        {/* Filter Button */}
        <div className="flex items-center gap-3">
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-2 text-sm text-orange-600 hover:text-orange-700 font-medium"
            >
              <FontAwesomeIcon icon={faTimes} className="w-4 h-4" />
              Clear Filters
            </button>
          )}
          <button
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              isFilterOpen
                ? "bg-orange-500 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
          >
            <FontAwesomeIcon icon={faFilter} className="w-4 h-4" />
            Filters
            {hasActiveFilters && (
              <span className="bg-white text-orange-600 rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold">
                {(filters.duration?.length || 0) +
                  (filters.level?.length || 0) +
                  (filters.language?.length || 0)}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Filter Panel */}
      {isFilterOpen && (
        <div className="mt-6 pt-6 border-t border-gray-200 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Level Filter */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Level</h4>
            <div className="space-y-2">
              {levelOptions.map((level) => (
                <label
                  key={level}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.level?.includes(level)}
                    onChange={() => toggleFilter("level", level)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900">
                    {level}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Duration Filter */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Duration</h4>
            <div className="space-y-2">
              {durationOptions.map((duration) => (
                <label
                  key={duration}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.duration?.includes(duration)}
                    onChange={() => toggleFilter("duration", duration)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900">
                    {duration}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Language Filter */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Language</h4>
            <div className="space-y-2">
              {languageOptions.map((language) => (
                <label
                  key={language}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="checkbox"
                    checked={filters.language?.includes(language)}
                    onChange={() => toggleFilter("language", language)}
                    className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900">
                    {language}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Filter */}
          <div>
            <h4 className="text-sm font-semibold text-gray-700 mb-3">Price</h4>
            <div className="space-y-2">
              {["all", "free", "paid"].map((priceOption) => (
                <label
                  key={priceOption}
                  className="flex items-center gap-2 cursor-pointer group"
                >
                  <input
                    type="radio"
                    name="price"
                    checked={filters.price === priceOption}
                    onChange={() =>
                      onFilterChange({
                        ...filters,
                        price: priceOption as "all" | "free" | "paid",
                      })
                    }
                    className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500"
                  />
                  <span className="text-sm text-gray-600 group-hover:text-gray-900 capitalize">
                    {priceOption === "all" ? "All Courses" : `${priceOption} Only`}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
