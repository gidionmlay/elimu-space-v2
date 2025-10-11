/**
 * TypeScript Interfaces for Elimu Space
 * Centralized type definitions for the application
 */

// ===========================
// User & Authentication Types
// ===========================

export interface User {
  id: number;
  username: string;
  email: string;
  role: 'student' | 'instructor' | 'partner' | 'admin';
  full_name: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string;
  bio?: string;
  country?: string;
  is_verified?: boolean;
  created_at?: string;
  updated_at?: string;
}

// ===========================
// Course Types
// ===========================

export interface Course {
  id: number;
  _id?: string; // MongoDB ID
  slug: string;
  title: string;
  description: string;
  instructor: string | Instructor;
  instructor_id?: number;
  thumbnail: string;
  category: string;
  rating: number;
  students_count: number;
  studentsCount?: number; // Alias
  price: number;
  is_free: boolean;
  isFree?: boolean; // Alias
  duration: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  is_featured?: boolean;
  isFeatured?: boolean; // Alias
  syllabus?: CourseSyllabus[];
  created_at?: string;
  updated_at?: string;
}

export interface Instructor {
  id: number;
  name: string;
  bio?: string;
  profile_image?: string;
  expertise?: string[];
}

export interface CourseSyllabus {
  id: number;
  title: string;
  description: string;
  duration: string;
  order: number;
}

// ===========================
// Enrollment Types
// ===========================

export interface Enrollment {
  id: number;
  _id?: string;
  student_id: number;
  course_id: number;
  course?: Course;
  progress: number; // 0-100
  status: 'enrolled' | 'in_progress' | 'completed' | 'dropped';
  enrolled_at: string;
  last_accessed?: string;
  completed_at?: string;
  certificate_id?: number;
}

// ===========================
// Certificate Types
// ===========================

export interface Certificate {
  id: number;
  _id?: string;
  student_id: number;
  course_id: number;
  course?: Course;
  enrollment_id: number;
  certificate_number: string;
  issued_date: string;
  certificate_url?: string;
  download_url?: string;
  is_verified: boolean;
  verification_code?: string;
}

// ===========================
// Notification Types
// ===========================

export interface Notification {
  id: number;
  _id?: string;
  user_id: number;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error' | 'course' | 'certificate' | 'achievement';
  is_read: boolean;
  created_at: string;
  read_at?: string;
  action_url?: string;
  metadata?: Record<string, any>;
}

// ===========================
// Dashboard Types
// ===========================

export interface DashboardStats {
  role: string;
  total_courses: number;
  completed_courses: number;
  in_progress_courses: number;
  total_learning_time: number; // in minutes
  achievements_count: number;
  current_streak: number; // in days
  longest_streak: number;
  total_certificates: number;
  unread_notifications: number;
  avg_progress?: number;
}

export interface InstructorStats {
  role: string;
  total_courses_created: number;
  published_courses: number;
  draft_courses: number;
  total_students: number;
  total_enrollments: number;
  average_rating: number;
  total_reviews: number;
  total_earnings: number;
  pending_earnings: number;
  monthly_earnings?: number;
  is_verified: boolean;
  unread_notifications: number;
  active_students: number;
  course_completion_rate?: number;
}

export interface InstructorCourse extends Course {
  enrollment_count: number;
  active_students: number;
  completed_students: number;
  average_progress: number;
  revenue: number;
  status: 'draft' | 'published' | 'archived';
  last_updated: string;
}

export interface CourseStudent {
  id: number;
  student_id: number;
  student_name: string;
  student_email: string;
  student_profile_image?: string;
  enrollment_date: string;
  progress: number;
  status: 'enrolled' | 'in_progress' | 'completed' | 'dropped';
  last_activity: string;
  quiz_scores?: number[];
  average_score?: number;
}

export interface Achievement {
  id: number;
  _id?: string;
  student_id: number;
  title: string;
  description: string;
  icon: string;
  badge_type: 'bronze' | 'silver' | 'gold' | 'platinum';
  earned_date: string;
  criteria?: string;
}

export interface LearningActivity {
  id: number;
  student_id: number;
  course_id: number;
  course?: Course;
  activity_type: 'enrollment' | 'lesson_complete' | 'quiz_complete' | 'certificate_earned';
  description: string;
  created_at: string;
  metadata?: Record<string, any>;
}

// ===========================
// Feedback & Testimonial Types
// ===========================

export interface Testimonial {
  id: number;
  _id?: string;
  student_id: number;
  student?: User;
  name?: string;
  photo?: string;
  quote: string;
  rating: number;
  course_id?: number;
  course?: Course | string;
  is_approved: boolean;
  is_featured: boolean;
  created_at: string;
}

export interface FeedbackSubmission {
  id: number;
  student_id: number;
  course_id?: number;
  course?: Course;
  feedback_type: 'course' | 'instructor' | 'platform' | 'feature_request' | 'bug_report';
  rating?: number;
  message: string;
  status: 'pending' | 'reviewed' | 'resolved';
  response?: string;
  responded_at?: string;
  created_at: string;
}

// ===========================
// Opportunity Types
// ===========================

export interface Opportunity {
  id: number;
  _id?: string;
  slug: string;
  title: string;
  description: string;
  type: 'scholarship' | 'job' | 'internship' | 'mentorship' | 'competition';
  organization: string;
  location?: string;
  deadline?: string;
  requirements?: string[];
  application_url?: string;
  is_active: boolean;
  created_at: string;
  updated_at?: string;
}

// ===========================
// Category & Filter Types
// ===========================

export interface Category {
  id: string | number;
  name: string;
  slug?: string;
  icon?: string;
  description?: string;
  course_count?: number;
}

export type SortOption = 'newest' | 'popular' | 'highest-rated' | 'free' | 'paid';

export interface FilterOptions {
  duration?: string[];
  level?: string[];
  price?: 'all' | 'free' | 'paid';
  language?: string[];
  category?: string[];
}

// ===========================
// API Response Types
// ===========================

export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
  errors?: Record<string, string[]>;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  count: number;
  total: number;
  page: number;
  pages: number;
  limit: number;
  has_next: boolean;
  has_prev: boolean;
}

// ===========================
// Form Types
// ===========================

export interface RegisterFormData {
  username: string;
  email: string;
  password: string;
  password2: string;
  role: 'student' | 'instructor' | 'partner' | 'admin';
  first_name?: string;
  last_name?: string;
  country?: string;
}

export interface LoginFormData {
  username: string;
  password: string;
  remember_me?: boolean;
}

export interface ProfileUpdateData {
  first_name?: string;
  last_name?: string;
  bio?: string;
  country?: string;
  profile_image?: File | string;
}

