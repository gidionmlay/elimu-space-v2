/**
 * Instructor Service
 * API calls for instructor dashboard data
 */

import api, { handleApiError } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api';
import { AxiosError } from 'axios';
import {
  InstructorStats,
  InstructorCourse,
  CourseStudent,
  Notification,
} from '@/types';

class InstructorService {
  /**
   * Get instructor dashboard statistics
   */
  async getStats(): Promise<InstructorStats> {
    try {
      const response = await api.get<InstructorStats>(API_ENDPOINTS.DASHBOARD.STATS);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Get all courses created by instructor
   */
  async getMyCourses(): Promise<InstructorCourse[]> {
    try {
      const response = await api.get<InstructorCourse[]>(`${API_ENDPOINTS.COURSES.LIST}/my-courses`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Get students enrolled in a specific course
   */
  async getCourseStudents(courseId: number): Promise<CourseStudent[]> {
    try {
      const response = await api.get<CourseStudent[]>(
        `${API_ENDPOINTS.COURSES.LIST}/${courseId}/students`
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Get all students across all instructor's courses
   */
  async getAllStudents(): Promise<CourseStudent[]> {
    try {
      const response = await api.get<CourseStudent[]>('/instructor/students');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Get notifications for instructor
   */
  async getNotifications(limit?: number): Promise<Notification[]> {
    try {
      const url = limit 
        ? `${API_ENDPOINTS.DASHBOARD.NOTIFICATIONS}?limit=${limit}` 
        : API_ENDPOINTS.DASHBOARD.NOTIFICATIONS;
      const response = await api.get<Notification[]>(url);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Mark notification as read
   */
  async markNotificationRead(notificationId: number): Promise<void> {
    try {
      await api.patch(API_ENDPOINTS.DASHBOARD.MARK_READ(notificationId));
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Create new course
   */
  async createCourse(courseData: any): Promise<InstructorCourse> {
    try {
      const response = await api.post<InstructorCourse>(
        API_ENDPOINTS.COURSES.LIST,
        courseData
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Update existing course
   */
  async updateCourse(courseId: number, courseData: any): Promise<InstructorCourse> {
    try {
      const response = await api.put<InstructorCourse>(
        `${API_ENDPOINTS.COURSES.LIST}/${courseId}`,
        courseData
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Delete course
   */
  async deleteCourse(courseId: number): Promise<void> {
    try {
      await api.delete(`${API_ENDPOINTS.COURSES.LIST}/${courseId}`);
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Publish/unpublish course
   */
  async toggleCourseStatus(courseId: number, status: 'published' | 'draft'): Promise<InstructorCourse> {
    try {
      const response = await api.patch<InstructorCourse>(
        `${API_ENDPOINTS.COURSES.LIST}/${courseId}/status`,
        { status }
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Get earnings overview
   */
  async getEarnings(): Promise<any> {
    try {
      const response = await api.get('/instructor/earnings');
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Get course analytics
   */
  async getCourseAnalytics(courseId: number): Promise<any> {
    try {
      const response = await api.get(`${API_ENDPOINTS.COURSES.LIST}/${courseId}/analytics`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }
}

// Export singleton instance
export default new InstructorService();

