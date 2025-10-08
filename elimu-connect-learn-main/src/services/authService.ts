/**
 * Authentication Service
 * Handles all authentication-related API calls
 */

import api, { handleApiError } from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api';
import { AxiosError } from 'axios';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
  role: 'student' | 'instructor' | 'partner' | 'admin';
  first_name?: string;
  last_name?: string;
  country?: string;
}

export interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  full_name: string;
  first_name?: string;
  last_name?: string;
  profile_image?: string;
  bio?: string;
  country?: string;
  is_verified?: boolean;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

export interface RegisterResponse {
  user: User;
  message: string;
  tokens: {
    access: string;
    refresh: string;
  };
}

class AuthService {
  /**
   * Register a new user
   */
  async register(data: RegisterData): Promise<RegisterResponse> {
    try {
      const response = await api.post<RegisterResponse>(
        API_ENDPOINTS.AUTH.REGISTER,
        data
      );

      // Store tokens and user data
      if (response.data.tokens) {
        localStorage.setItem('access_token', response.data.tokens.access);
        localStorage.setItem('refresh_token', response.data.tokens.refresh);
        localStorage.setItem('user', JSON.stringify(response.data.user));
      }

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Login user
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    try {
      const response = await api.post<AuthResponse>(
        API_ENDPOINTS.AUTH.LOGIN,
        credentials
      );

      // Store tokens and user data
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      return response.data;
    } catch (error) {
      throw new Error(handleApiError(error as AxiosError));
    }
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    try {
      const refreshToken = localStorage.getItem('refresh_token');

      if (refreshToken) {
        await api.post(API_ENDPOINTS.AUTH.LOGOUT, {
          refresh: refreshToken,
        });
      }
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Clear local storage regardless of API call result
      this.clearAuthData();
    }
  }

  /**
   * Refresh access token
   */
  async refreshToken(): Promise<string | null> {
    try {
      const refreshToken = localStorage.getItem('refresh_token');

      if (!refreshToken) {
        return null;
      }

      const response = await api.post(API_ENDPOINTS.AUTH.REFRESH, {
        refresh: refreshToken,
      });

      const { access, refresh } = response.data;

      // Store new tokens
      localStorage.setItem('access_token', access);
      if (refresh) {
        localStorage.setItem('refresh_token', refresh);
      }

      return access;
    } catch (error) {
      this.clearAuthData();
      return null;
    }
  }

  /**
   * Get current user from localStorage
   */
  getCurrentUser(): User | null {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch {
        return null;
      }
    }
    return null;
  }

  /**
   * Get current user's role
   */
  getUserRole(): string | null {
    const user = this.getCurrentUser();
    return user?.role || null;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: string): boolean {
    const userRole = this.getUserRole();
    return userRole === role;
  }

  /**
   * Check if user is student
   */
  isStudent(): boolean {
    return this.hasRole('student');
  }

  /**
   * Check if user is instructor
   */
  isInstructor(): boolean {
    return this.hasRole('instructor');
  }

  /**
   * Check if user is admin
   */
  isAdmin(): boolean {
    return this.hasRole('admin');
  }

  /**
   * Clear all authentication data
   */
  clearAuthData(): void {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

  /**
   * Update user data in localStorage
   */
  updateUserData(user: User): void {
    localStorage.setItem('user', JSON.stringify(user));
  }

  /**
   * Get access token
   */
  getAccessToken(): string | null {
    return localStorage.getItem('access_token');
  }

  /**
   * Get refresh token
   */
  getRefreshToken(): string | null {
    return localStorage.getItem('refresh_token');
  }
}

// Export singleton instance
export default new AuthService();

