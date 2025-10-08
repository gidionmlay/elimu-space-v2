import { useRef, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronLeft, faChevronRight } from "@fortawesome/free-solid-svg-icons";
import { Category } from "@/types/course";

interface CategoryTabsProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export default function CategoryTabs({
  categories,
  activeCategory,
  onCategoryChange,
}: CategoryTabsProps) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (container) {
      setCanScrollLeft(container.scrollLeft > 0);
      setCanScrollRight(
        container.scrollLeft < container.scrollWidth - container.clientWidth - 1
      );
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const scroll = (direction: "left" | "right") => {
    const container = scrollContainerRef.current;
    if (container) {
      const scrollAmount = 300;
      const newPosition =
        direction === "left"
          ? container.scrollLeft - scrollAmount
          : container.scrollLeft + scrollAmount;
      container.scrollTo({ left: newPosition, behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full">
      {/* Left Arrow */}
      {canScrollLeft && (
        <button
          onClick={() => scroll("left")}
          className="absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors"
          aria-label="Scroll left"
        >
          <FontAwesomeIcon icon={faChevronLeft} className="w-5 h-5 text-gray-700" />
        </button>
      )}

      {/* Categories Container */}
      <div
        ref={scrollContainerRef}
        onScroll={checkScroll}
        className="flex gap-3 overflow-x-auto scrollbar-hide scroll-smooth px-8"
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        {categories.map((category) => {
          const isActive = activeCategory === category.id;
          return (
            <button
              key={category.id}
              onClick={() => onCategoryChange(category.id)}
              className={`
                flex-shrink-0 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-300
                ${
                  isActive
                    ? "bg-orange-500 text-white shadow-lg scale-105"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200 hover:scale-105"
                }
              `}
              aria-pressed={isActive}
            >
              <span className="flex items-center gap-2 whitespace-nowrap">
                {category.icon && <span>{category.icon}</span>}
                {category.name}
              </span>
            </button>
          );
        })}
      </div>

      {/* Right Arrow */}
      {canScrollRight && (
        <button
          onClick={() => scroll("right")}
          className="absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-lg rounded-full p-2 hover:bg-gray-100 transition-colors"
          aria-label="Scroll right"
        >
          <FontAwesomeIcon icon={faChevronRight} className="w-5 h-5 text-gray-700" />
        </button>
      )}
    </div>
  );
}
