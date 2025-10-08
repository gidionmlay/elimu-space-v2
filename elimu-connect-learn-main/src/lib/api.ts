/**
 * Axios API Client with JWT Token Management
 * Handles authentication, token refresh, and error handling
 */

import axios, { AxiosError, AxiosRequestConfig, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { API_BASE_URL, API_TIMEOUT, API_ENDPOINTS } from '@/config/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

/**
 * Request Interceptor - Add JWT token to requests
 */
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('access_token');
    
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

/**
 * Response Interceptor - Handle token refresh and errors
 */
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    const originalRequest = error.config as AxiosRequestConfig & { _retry?: boolean };

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        
        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Request new access token
        const response = await axios.post(API_ENDPOINTS.AUTH.REFRESH, {
          refresh: refreshToken,
        });

        const { access, refresh } = response.data;

        // Store new tokens
        localStorage.setItem('access_token', access);
        if (refresh) {
          localStorage.setItem('refresh_token', refresh);
        }

        // Retry original request with new token
        if (originalRequest.headers) {
          originalRequest.headers.Authorization = `Bearer ${access}`;
        }
        
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed - clear tokens and redirect to login
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        
        // Redirect to login
        if (typeof window !== 'undefined') {
          window.location.href = '/login';
        }
        
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;

/**
 * Helper function to handle API errors
 */
export const handleApiError = (error: AxiosError): string => {
  if (error.response) {
    // Server responded with error
    const data = error.response.data as any;
    
    if (typeof data === 'string') {
      return data;
    }
    
    if (data.detail) {
      return data.detail;
    }
    
    if (data.message) {
      return data.message;
    }
    
    // Extract first error from validation errors
    if (typeof data === 'object') {
      const firstKey = Object.keys(data)[0];
      const firstError = data[firstKey];
      
      if (Array.isArray(firstError)) {
        return firstError[0];
      }
      
      if (typeof firstError === 'string') {
        return firstError;
      }
    }
    
    return 'An error occurred. Please try again.';
  } else if (error.request) {
    // Request made but no response
    return 'No response from server. Please check your connection.';
  } else {
    // Error in request setup
    return error.message || 'An unexpected error occurred.';
  }
};

