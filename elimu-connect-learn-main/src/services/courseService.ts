/**
 * Course Service
 * API calls for course creation and management
 */

import api, { handleApiError } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api';
import { AxiosError } from 'axios';

// Course creation types
export interface CourseModule {
  id?: string;
  title: string;
  order: number;
  lessons: CourseLesson[];
}

export interface CourseLesson {
  id?: string;
  title: string;
  type: 'video' | 'article' | 'quiz';
  content?: string;
  video_url?: string;
  duration: number; // in minutes
  order: number;
}

export interface CourseDraft {
  id?: number;
  title: string;
  description: string;
  category: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  language: string;
  thumbnail?: string;
  preview_video?: string;
  modules: CourseModule[];
  price: number;
  discount?: number;
  is_free: boolean;
  is_published: boolean;
  instructor_id?: number;
  created_at?: string;
  updated_at?: string;
}

export interface UploadResponse {
  success: boolean;
  url: string;
  filename: string;
  size: number;
}

class CourseService {
  /**
   * Create a new course draft
   */
  async createCourseDraft(courseData: Partial<CourseDraft>): Promise<CourseDraft> {
    try {
      const response = await api.post<CourseDraft>(
        `${API_ENDPOINTS.COURSES.LIST}`,
        {
          ...courseData,
          is_published: false,
        }
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Update course draft
   */
  async updateCourseDraft(courseId: number, courseData: Partial<CourseDraft>): Promise<CourseDraft> {
    try {
      const response = await api.put<CourseDraft>(
        `${API_ENDPOINTS.COURSES.LIST}/${courseId}`,
        courseData
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Get course draft by ID
   */
  async getCourseDraft(courseId: number): Promise<CourseDraft> {
    try {
      const response = await api.get<CourseDraft>(
        `${API_ENDPOINTS.COURSES.LIST}/${courseId}`
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Upload course thumbnail
   */
  async uploadThumbnail(file: File, onUploadProgress?: (progressEvent: any) => void): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file); // Changed from 'thumbnail' to 'file'

      const response = await api.post<any>(
        '/instructor/thumbnail',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress,
        }
      );
      
      // Return standardized response
      return {
        url: response.data.data?.url || response.data.url,
        public_id: response.data.data?.publicId || response.data.publicId,
      };
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Upload course resource file
   */
  async uploadResource(file: File, onUploadProgress?: (progressEvent: any) => void): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file); // Changed from 'resource' to 'file'

      const response = await api.post<any>(
        '/upload/resource',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress,
        }
      );
      
      // Return standardized response
      return {
        url: response.data.data?.url || response.data.url,
        public_id: response.data.data?.publicId || response.data.publicId,
      };
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Upload lesson video
   */
  async uploadVideo(file: File, onProgress?: (progress: number) => void): Promise<UploadResponse> {
    try {
      const formData = new FormData();
      formData.append('file', file); // Changed from 'video' to 'file'

      const response = await api.post<any>(
        '/upload/video',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: (progressEvent) => {
            if (progressEvent.total && onProgress) {
              const percentCompleted = Math.round(
                (progressEvent.loaded * 100) / progressEvent.total
              );
              onProgress(percentCompleted);
            }
          },
        }
      );
      
      // Return standardized response
      return {
        url: response.data.data?.url || response.data.url,
        public_id: response.data.data?.publicId || response.data.publicId,
      };
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Publish course
   */
  async publishCourse(courseId: number): Promise<CourseDraft> {
    try {
      const response = await api.post<CourseDraft>(
        `/instructor/courses/${courseId}/publish`
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
   * Get instructor's draft courses
   */
  async getDraftCourses(): Promise<CourseDraft[]> {
    try {
      const response = await api.get<CourseDraft[]>(
        `${API_ENDPOINTS.COURSES.LIST}/my-drafts`
      );
      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }
}

// Export singleton instance
export default new CourseService();

