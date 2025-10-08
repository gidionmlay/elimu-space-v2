export interface Course {
  id: string;
  title: string;
  description: string;
  instructor: string;
  thumbnail: string;
  category: string;
  rating: number;
  studentsCount: number;
  price: number;
  isFree: boolean;
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  isFeatured?: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon?: string;
}

export interface Testimonial {
  id: string;
  name: string;
  photo: string;
  quote: string;
  rating: number;
  course?: string;
}

export type SortOption = 'newest' | 'popular' | 'highest-rated' | 'free' | 'paid';

export interface FilterOptions {
  duration?: string[];
  level?: string[];
  price?: 'all' | 'free' | 'paid';
  language?: string[];
}
