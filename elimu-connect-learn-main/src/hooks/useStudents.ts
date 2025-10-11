/**
 * useStudents Hook
 * React Query hooks for managing instructor students data
 */

import { useQuery, UseQueryResult } from '@tanstack/react-query';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api';

// Types
export interface Student {
  studentId: string;
  name: string;
  email: string;
  courses: Array<{
    id: string;
    title: string;
    progress: number;
    enrolledAt: string;
  }>;
  progress: number;
  status: 'active' | 'completed' | 'inactive';
  lastActivity: string;
  enrolledAt?: string;
}

export interface StudentDetail {
  studentId: string;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  country?: string;
  joinedDate: string;
  totalCourses: number;
  completedCourses: number;
  averageProgress: number;
  courses: Array<{
    courseId: string;
    title: string;
    thumbnail?: string;
    category: string;
    level: string;
    progress: number;
    status: 'active' | 'completed' | 'inactive';
    enrolledAt: string;
    lastActivity: string;
    completedLessons: number;
  }>;
}

export interface StudentsResponse {
  success: boolean;
  data: Student[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
}

export interface StudentDetailResponse {
  success: boolean;
  data: StudentDetail;
}

export interface StudentsQueryParams {
  page?: number;
  limit?: number;
  search?: string;
  status?: 'all' | 'active' | 'completed' | 'inactive';
}

/**
 * Fetch instructor students
 */
const fetchInstructorStudents = async (params: StudentsQueryParams = {}): Promise<StudentsResponse> => {
  const { page = 1, limit = 25, search = '', status = 'all' } = params;
  
  const response = await api.get(API_ENDPOINTS.INSTRUCTOR.STUDENTS, {
    params: { page, limit, search, status: status === 'all' ? '' : status }
  });
  
  return response.data;
};

/**
 * Fetch single student details
 */
const fetchStudentDetails = async (studentId: string): Promise<StudentDetailResponse> => {
  const response = await api.get(API_ENDPOINTS.INSTRUCTOR.STUDENT_DETAIL(studentId));
  return response.data;
};

/**
 * Hook: useInstructorStudents
 * Fetch and manage instructor's students list
 */
export const useInstructorStudents = (
  params: StudentsQueryParams = {}
): UseQueryResult<StudentsResponse, Error> => {
  return useQuery({
    queryKey: ['instructorStudents', params],
    queryFn: () => fetchInstructorStudents(params),
    staleTime: 30000, // 30 seconds
    refetchOnWindowFocus: true,
  });
};

/**
 * Hook: useStudentDetails
 * Fetch single student details
 */
export const useStudentDetails = (
  studentId: string | null
): UseQueryResult<StudentDetailResponse, Error> => {
  return useQuery({
    queryKey: ['studentDetails', studentId],
    queryFn: () => fetchStudentDetails(studentId!),
    enabled: !!studentId, // Only run when studentId is provided
    staleTime: 60000, // 1 minute
  });
};

/**
 * Export students to CSV
 */
export const exportStudentsToCSV = async (params: StudentsQueryParams = {}): Promise<Blob> => {
  const { search = '', status = 'all' } = params;
  
  const response = await api.get(API_ENDPOINTS.INSTRUCTOR.EXPORT_STUDENTS, {
    params: { search, status: status === 'all' ? '' : status },
    responseType: 'blob'
  });
  
  return response.data;
};

