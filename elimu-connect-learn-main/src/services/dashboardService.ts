/**
 * Dashboard Service
 * API calls for student dashboard data
 */

import api, { handleApiError } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api';
import { AxiosError } from 'axios';
import {
  DashboardStats,
  Enrollment,
  Certificate,
  Notification,
  Achievement,
  LearningActivity,
} from '@/types';

class DashboardService {
  /**
   * Get student dashboard statistics
   */
  async getStats(): Promise<DashboardStats> {
    try {
      const response = await api.get<DashboardStats>(API_ENDPOINTS.DASHBOARD.STATS);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Get enrolled courses for the student
   */
  async getEnrolledCourses(): Promise<Enrollment[]> {
    try {
      const response = await api.get<Enrollment[]>(API_ENDPOINTS.COURSES.MY_ENROLLMENTS);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Get student certificates
   */
  async getCertificates(): Promise<Certificate[]> {
    try {
      const response = await api.get<Certificate[]>(`${API_ENDPOINTS.DASHBOARD.STATS}/certificates`);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Get notifications for the student
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
   * Mark all notifications as read
   */
  async markAllNotificationsRead(): Promise<void> {
    try {
      await api.patch(`${API_ENDPOINTS.DASHBOARD.NOTIFICATIONS}/mark-all-read`);
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Get achievements
   */
  async getAchievements(): Promise<Achievement[]> {
    try {
      const response = await api.get<Achievement[]>(API_ENDPOINTS.DASHBOARD.ACHIEVEMENTS);
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Get recent learning activity
   */
  async getRecentActivity(limit: number = 10): Promise<LearningActivity[]> {
    try {
      const response = await api.get<LearningActivity[]>(
        `${API_ENDPOINTS.DASHBOARD.ACTIVITY}?limit=${limit}`
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Download certificate
   */
  async downloadCertificate(certificateId: number): Promise<Blob> {
    try {
      const response = await api.get(`/dashboard/certificates/${certificateId}/download`, {
        responseType: 'blob',
      });
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }
}

// Export singleton instance
export default new DashboardService();

