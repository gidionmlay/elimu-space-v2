import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faClock, faUsers, faHeart, faPlay } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";

interface Course {
  id: string;
  title: string;
  instructor: string;
  rating: number;
  reviewCount: number;
  duration: string;
  students: number;
  price: number;
  originalPrice?: number;
  thumbnail: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: 'English' | 'Swahili' | 'Both';
  isFree: boolean;
  isPremium: boolean;
  progress?: number; // For enrolled courses
}

interface CourseCardProps {
  course: Course;
  variant?: 'grid' | 'list' | 'featured';
  showProgress?: boolean;
  onEnroll?: (courseId: string) => void;
  onWishlist?: (courseId: string) => void;
}

const CourseCard = ({ 
  course, 
  variant = 'grid', 
  showProgress = false, 
  onEnroll, 
  onWishlist 
}: CourseCardProps) => {
  const {
    id,
    title,
    instructor,
    rating,
    reviewCount,
    duration,
    students,
    price,
    originalPrice,
    thumbnail,
    category,
    level,
    language,
    isFree,
    isPremium,
    progress
  } = course;

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('sw-TZ', {
      style: 'currency',
      currency: 'TZS',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatNumber = (num: number) => {
    if (num >= 1000) {
      return `${(num / 1000).toFixed(1)}K`;
    }
    return num.toString();
  };

  return (
    <Card className="course-card group overflow-hidden h-full">
      <CardContent className="p-0">
        {/* Course Thumbnail */}
        <div className="relative overflow-hidden">
          <img
            src={thumbnail}
            alt={title}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
            loading="lazy"
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
            <Button
              size="sm"
              variant="outline"
              className="opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/90 hover:bg-white text-primary border-primary/20"
            >
              <FontAwesomeIcon icon={faPlay} className="w-4 h-4 mr-2" />
              Preview
            </Button>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-wrap gap-2">
            {isFree && (
              <Badge className="badge-free text-xs font-medium">
                Bila Malipo
              </Badge>
            )}
            {isPremium && (
              <Badge className="badge-premium text-xs font-medium">
                Premium
              </Badge>
            )}
            <Badge variant="secondary" className="text-xs">
              {level}
            </Badge>
          </div>

          {/* Wishlist Button */}
          <Button
            size="sm"
            variant="ghost"
            className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/80 hover:bg-white text-primary opacity-0 group-hover:opacity-100 transition-all duration-300"
            onClick={() => onWishlist?.(id)}
          >
            <FontAwesomeIcon icon={faHeart} className="w-4 h-4" />
          </Button>

          {/* Progress Bar for Enrolled Courses */}
          {showProgress && progress !== undefined && (
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-black/20">
              <div 
                className="h-full progress-bar transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          )}
        </div>

        {/* Course Content */}
        <div className="p-4 space-y-3">
          {/* Category */}
          <div className="text-xs text-primary font-medium uppercase tracking-wide">
            {category}
          </div>

          {/* Title */}
          <h3 className="font-poppins font-semibold text-base line-clamp-2 text-card-foreground group-hover:text-primary transition-colors">
            {title}
          </h3>

          {/* Instructor */}
          <p className="text-sm text-muted-foreground">
            Mwalimu: {instructor}
          </p>

          {/* Stats */}
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <div className="flex items-center space-x-3">
              <div className="flex items-center">
                <FontAwesomeIcon icon={faStar} className="w-3 h-3 fill-tanzania-gold text-tanzania-gold mr-1" />
                <span className="font-medium text-foreground">{rating}</span>
                <span className="ml-1">({formatNumber(reviewCount)})</span>
              </div>
              <div className="flex items-center">
                <FontAwesomeIcon icon={faClock} className="w-3 h-3 mr-1" />
                <span>{duration}</span>
              </div>
            </div>
            <div className="flex items-center">
              <FontAwesomeIcon icon={faUsers} className="w-3 h-3 mr-1" />
              <span>{formatNumber(students)}</span>
            </div>
          </div>

          {/* Language */}
          <div className="text-xs text-muted-foreground">
            Lugha: {language}
          </div>

          {/* Price and Action */}
          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center space-x-2">
              {isFree ? (
                <span className="text-lg font-bold text-success">Bila Malipo</span>
              ) : (
                <div className="flex items-center space-x-2">
                  <span className="text-lg font-bold text-primary">
                    {formatPrice(price)}
                  </span>
                  {originalPrice && (
                    <span className="text-sm text-muted-foreground line-through">
                      {formatPrice(originalPrice)}
                    </span>
                  )}
                </div>
              )}
            </div>

            <Button
              size="sm"
              className="hero-button text-xs px-4 py-2 touch-target"
              onClick={() => onEnroll?.(id)}
            >
              {showProgress ? 'Endelea' : 'Jiunge'}
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CourseCard;