import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faFilter, faThLarge, faList, faChevronDown } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import CourseCard from "./CourseCard";
import courseDigital from "@/assets/course-digital.jpg";
import courseBusiness from "@/assets/course-business.jpg";
import courseFinance from "@/assets/course-finance.jpg";

// Sample course data
const sampleCourses = [
  {
    id: "1",
    title: "Digital Marketing Fundamentals - Misingi ya Uuzaji wa Kidijitali",
    instructor: "Amina Hassan",
    rating: 4.8,
    reviewCount: 1250,
    duration: "8 wiki",
    students: 15420,
    price: 45000,
    originalPrice: 75000,
    thumbnail: courseDigital,
    category: "Digital Literacy",
    level: "Beginner" as const,
    language: "Both" as const,
    isFree: false,
    isPremium: true,
  },
  {
    id: "2",
    title: "Entrepreneurship Bootcamp - Uwongozi wa Biashara",
    instructor: "John Mwalimu",
    rating: 4.9,
    reviewCount: 890,
    duration: "12 wiki",
    students: 8750,
    price: 0,
    thumbnail: courseBusiness,
    category: "Entrepreneurship",
    level: "Intermediate" as const,
    language: "Swahili" as const,
    isFree: true,
    isPremium: false,
  },
  {
    id: "3",
    title: "Personal Finance Management - Usimamizi wa Fedha",
    instructor: "Grace Mbeki",
    rating: 4.7,
    reviewCount: 2100,
    duration: "6 wiki",
    students: 23450,
    price: 35000,
    originalPrice: 50000,
    thumbnail: courseFinance,
    category: "Financial Literacy",
    level: "Beginner" as const,
    language: "Both" as const,
    isFree: false,
    isPremium: false,
  },
  {
    id: "4",
    title: "Advanced Excel & Data Analysis - Uchambuzi wa Data",
    instructor: "Peter Kazimoto",
    rating: 4.6,
    reviewCount: 675,
    duration: "10 wiki",
    students: 5200,
    price: 60000,
    thumbnail: courseDigital,
    category: "Digital Literacy",
    level: "Advanced" as const,
    language: "English" as const,
    isFree: false,
    isPremium: true,
  },
  {
    id: "5",
    title: "Mobile Money Business - Biashara ya Fedha za Simu",
    instructor: "Sarah Mwita",
    rating: 4.5,
    reviewCount: 420,
    duration: "4 wiki",
    students: 3100,
    price: 25000,
    thumbnail: courseFinance,
    category: "Financial Literacy",
    level: "Beginner" as const,
    language: "Swahili" as const,
    isFree: false,
    isPremium: false,
  },
  {
    id: "6",
    title: "Social Media Marketing - Uuzaji wa Mitandao ya Kijamii",
    instructor: "David Kilimo",
    rating: 4.8,
    reviewCount: 1580,
    duration: "7 wiki",
    students: 12300,
    price: 0,
    thumbnail: courseBusiness,
    category: "Digital Literacy",
    level: "Intermediate" as const,
    language: "Both" as const,
    isFree: true,
    isPremium: false,
  },
];

const categories = [
  "Vyote",
  "Digital Literacy",
  "Entrepreneurship", 
  "Financial Literacy",
  "Soft Skills"
];

const CourseGrid = () => {
  const [courses] = useState(sampleCourses);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Vyote");
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);

  const filteredCourses = courses.filter(course => {
    const matchesSearch = course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         course.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "Vyote" || course.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleEnroll = (courseId: string) => {
    console.log("Enrolling in course:", courseId);
    // TODO: Implement enrollment logic
  };

  const handleWishlist = (courseId: string) => {
    console.log("Adding to wishlist:", courseId);
    // TODO: Implement wishlist logic
  };

  return (
    <section className="py-16 bg-gradient-to-br from-background to-accent">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 animate-fade-in">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold text-gradient-primary mb-4">
            Kozi za Kisasa za Elimu Space
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Chagua kutoka kozi zaidi ya 200+ za kisasa zilizoundwa kwa ajili ya vijana wa Tanzania. 
            Jifunze skills za maisha halisi na kujenga mustakabali wako.
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <FontAwesomeIcon icon={faSearch} className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Tafuta kozi, mwalimu, au mada..."
              className="pl-10 glass-card border-white/20"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            {/* Categories */}
            <div className="flex items-center space-x-2 overflow-x-auto pb-2">
              {categories.map((category) => (
                <Badge
                  key={category}
                  variant={selectedCategory === category ? "default" : "secondary"}
                  className={`cursor-pointer touch-target whitespace-nowrap transition-all duration-200 hover:scale-105 ${
                    selectedCategory === category 
                      ? 'bg-gradient-primary text-primary-foreground shadow-card' 
                      : 'hover:bg-primary/10'
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Badge>
              ))}
            </div>

            {/* View Controls */}
            <div className="flex items-center space-x-2">
              <Button
                variant="ghost"
                size="sm"
                className="touch-target"
                onClick={() => setShowFilters(!showFilters)}
              >
                <FontAwesomeIcon icon={faFilter} className="w-4 h-4 mr-2" />
                Chuja
                <FontAwesomeIcon icon={faChevronDown} className={`w-4 h-4 ml-2 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
              </Button>

              <div className="flex items-center space-x-1 bg-white/50 rounded-lg p-1">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => setViewMode('grid')}
                >
                  <FontAwesomeIcon icon={faThLarge} className="w-4 h-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  className="w-8 h-8 p-0"
                  onClick={() => setViewMode('list')}
                >
                  <FontAwesomeIcon icon={faList} className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-center text-sm text-muted-foreground">
            Inaonyesha kozi {filteredCourses.length} kati ya {courses.length}
          </div>
        </div>

        {/* Course Grid */}
        <div className={`grid gap-6 animate-slide-up ${
          viewMode === 'grid' 
            ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
            : 'grid-cols-1 max-w-4xl mx-auto'
        }`}>
          {filteredCourses.map((course, index) => (
            <div 
              key={course.id} 
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CourseCard
                course={course}
                variant={viewMode}
                onEnroll={handleEnroll}
                onWishlist={handleWishlist}
              />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filteredCourses.length === 0 && (
          <div className="text-center py-12 animate-fade-in">
            <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
              <FontAwesomeIcon icon={faSearch} className="w-8 h-8 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Hakuna kozi zilizopatikana
            </h3>
            <p className="text-muted-foreground">
              Jaribu kutafuta kwa maneno mengine au uchague kategoria nyingine.
            </p>
          </div>
        )}

        {/* Load More Button */}
        {filteredCourses.length > 0 && (
          <div className="text-center mt-12">
            <Button size="lg" variant="outline" className="hero-button-outline">
              Onyesha Zaidi
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseGrid;