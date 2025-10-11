/**
 * API Configuration
 * Base URL and endpoint definitions for Elimu Space backend
 * TODO: Update with Node.js + Express backend endpoints
 */

// API Base URL from environment variables
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api/v1';
export const API_TIMEOUT = Number(import.meta.env.VITE_API_TIMEOUT) || 10000;

/**
 * API Endpoints organized by feature
 * TODO: These endpoints will be implemented in the Node.js backend
 */
export const API_ENDPOINTS = {
  // Authentication
  AUTH: {
    REGISTER: `${API_BASE_URL}/auth/register`,
    LOGIN: `${API_BASE_URL}/auth/login`,
    LOGOUT: `${API_BASE_URL}/auth/logout`,
    REFRESH: `${API_BASE_URL}/auth/refresh`,
    VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email`,
    REQUEST_PASSWORD_RESET: `${API_BASE_URL}/auth/request-password-reset`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password`,
  },

  // User Management
  USERS: {
    PROFILE: `${API_BASE_URL}/users/profile`,
    UPDATE_PROFILE: `${API_BASE_URL}/users/profile/update`,
    CHANGE_PASSWORD: `${API_BASE_URL}/users/change-password`,
    LIST: `${API_BASE_URL}/users`,
    DETAIL: (id: number) => `${API_BASE_URL}/users/${id}`,
  },

  // Courses
  COURSES: {
    LIST: `${API_BASE_URL}/courses`,
    CATEGORIES: `${API_BASE_URL}/courses/categories`,
    DETAIL: (slug: string) => `${API_BASE_URL}/courses/${slug}`,
    ENROLL: (slug: string) => `${API_BASE_URL}/courses/${slug}/enroll`,
    PROGRESS: (slug: string) => `${API_BASE_URL}/courses/${slug}/progress`,
    REVIEWS: (slug: string) => `${API_BASE_URL}/courses/${slug}/reviews`,
    MY_ENROLLMENTS: `${API_BASE_URL}/courses/my/enrollments`,
  },

  // Dashboard
  DASHBOARD: {
    STATS: `${API_BASE_URL}/dashboard/stats`,
    NOTIFICATIONS: `${API_BASE_URL}/dashboard/notifications`,
    MARK_READ: (id: number) => `${API_BASE_URL}/dashboard/notifications/${id}/read`,
    ACHIEVEMENTS: `${API_BASE_URL}/dashboard/achievements`,
    ACTIVITY: `${API_BASE_URL}/dashboard/activity`,
    RECENT_COURSES: `${API_BASE_URL}/dashboard/recent-courses`,
  },

  // Feedback & Opportunities
  FEEDBACK: {
    TESTIMONIALS: `${API_BASE_URL}/feedback/testimonials`,
    CREATE_TESTIMONIAL: `${API_BASE_URL}/feedback/testimonials/create`,
    MY_TESTIMONIALS: `${API_BASE_URL}/feedback/testimonials/my`,
    OPPORTUNITIES: `${API_BASE_URL}/feedback/opportunities`,
    OPPORTUNITY_DETAIL: (slug: string) => `${API_BASE_URL}/feedback/opportunities/${slug}`,
    CREATE_OPPORTUNITY: `${API_BASE_URL}/feedback/opportunities/create`,
    SUBMIT_FEEDBACK: `${API_BASE_URL}/feedback/submissions`,
    RESPOND_FEEDBACK: (id: number) => `${API_BASE_URL}/feedback/submissions/${id}/respond`,
  },

  // Instructor
  INSTRUCTOR: {
    STUDENTS: `${API_BASE_URL}/instructor/students`,
    STUDENT_DETAIL: (studentId: string) => `${API_BASE_URL}/instructor/students/${studentId}`,
    EXPORT_STUDENTS: `${API_BASE_URL}/instructor/students/export`,
  },
};

/**
 * HTTP Methods
 */
export const HTTP_METHODS = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  PATCH: 'PATCH',
  DELETE: 'DELETE',
} as const;

/**
 * User Roles
 */
export const USER_ROLES = {
  STUDENT: 'student',
  INSTRUCTOR: 'instructor',
  PARTNER: 'partner',
  ADMIN: 'admin',
} as const;

export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
