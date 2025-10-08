# Frontend API Integration Guide

## 🔗 Connecting React Frontend to Django Backend

### 1. API Configuration

Create the following file in your React frontend:

**File: `elimu-connect-learn-main/src/config/api.ts`**

```typescript
// API Base URL
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

// API Endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login/`,
    REGISTER: `${API_BASE_URL}/auth/register/`,
    REFRESH: `${API_BASE_URL}/auth/refresh/`,
    LOGOUT: `${API_BASE_URL}/auth/logout/`,
    VERIFY_EMAIL: `${API_BASE_URL}/auth/verify-email/`,
    REQUEST_PASSWORD_RESET: `${API_BASE_URL}/auth/request-password-reset/`,
    RESET_PASSWORD: `${API_BASE_URL}/auth/reset-password/`,
  },
  USERS: {
    PROFILE: `${API_BASE_URL}/users/profile/`,
    UPDATE_PROFILE: `${API_BASE_URL}/users/profile/update/`,
    CHANGE_PASSWORD: `${API_BASE_URL}/users/change-password/`,
    LIST: `${API_BASE_URL}/users/`,
    DETAIL: (id: number) => `${API_BASE_URL}/users/${id}/`,
  },
  COURSES: {
    LIST: `${API_BASE_URL}/courses/`,
    DETAIL: (id: string) => `${API_BASE_URL}/courses/${id}/`,
    ENROLL: (id: string) => `${API_BASE_URL}/courses/${id}/enroll/`,
  }
};
```

### 2. Axios Instance Setup

**File: `elimu-connect-learn-main/src/services/api.ts`**

```typescript
import axios from 'axios';
import { API_BASE_URL } from '@/config/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('access_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle token refresh
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // If error is 401 and we haven't tried to refresh yet
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = localStorage.getItem('refresh_token');
        const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
          refresh: refreshToken,
        });

        const { access } = response.data;
        localStorage.setItem('access_token', access);

        // Retry original request with new token
        originalRequest.headers.Authorization = `Bearer ${access}`;
        return api(originalRequest);
      } catch (refreshError) {
        // Refresh failed, logout user
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default api;
```

### 3. Authentication Service

**File: `elimu-connect-learn-main/src/services/authService.ts`**

```typescript
import api from './api';
import { API_ENDPOINTS } from '@/config/api';

export interface LoginCredentials {
  username: string;
  password: string;
}

export interface RegisterData {
  username: string;
  email: string;
  password: string;
  password2: string;
  role: 'student' | 'instructor' | 'partner';
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
  profile_image?: string;
}

export interface AuthResponse {
  access: string;
  refresh: string;
  user: User;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await api.post(API_ENDPOINTS.AUTH.LOGIN, credentials);
    
    // Store tokens
    localStorage.setItem('access_token', response.data.access);
    localStorage.setItem('refresh_token', response.data.refresh);
    localStorage.setItem('user', JSON.stringify(response.data.user));
    
    return response.data;
  }

  async register(data: RegisterData): Promise<AuthResponse> {
    const response = await api.post(API_ENDPOINTS.AUTH.REGISTER, data);
    
    // Store tokens
    if (response.data.tokens) {
      localStorage.setItem('access_token', response.data.tokens.access);
      localStorage.setItem('refresh_token', response.data.tokens.refresh);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    
    return response.data;
  }

  async logout(): Promise<void> {
    const refreshToken = localStorage.getItem('refresh_token');
    
    if (refreshToken) {
      try {
        await api.post(API_ENDPOINTS.AUTH.LOGOUT, { refresh: refreshToken });
      } catch (error) {
        console.error('Logout error:', error);
      }
    }
    
    // Clear local storage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
  }

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

  isAuthenticated(): boolean {
    return !!localStorage.getItem('access_token');
  }
}

export default new AuthService();
```

### 4. Update Login Page

Update `elimu-connect-learn-main/src/pages/Login.tsx`:

```typescript
import authService from '@/services/authService';

// In handleSubmit function:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (validateForm()) {
    setIsLoading(true);
    
    try {
      const response = await authService.login({
        username: formData.email, // or username
        password: formData.password
      });
      
      console.log('Login successful:', response);
      navigate('/dashboard'); // or wherever you want to redirect
    } catch (error: any) {
      console.error('Login error:', error);
      
      // Handle errors
      if (error.response?.data) {
        setErrors({
          email: error.response.data.detail || 'Invalid credentials'
        });
      } else {
        setErrors({
          email: 'Network error. Please try again.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
};
```

### 5. Update Register Page

Update `elimu-connect-learn-main/src/pages/Register.tsx`:

```typescript
import authService from '@/services/authService';

// In handleSubmit function:
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  
  if (validateForm()) {
    setIsLoading(true);
    
    try {
      const response = await authService.register({
        username: formData.fullName.replace(/\s+/g, '').toLowerCase(),
        email: formData.email,
        password: formData.password,
        password2: formData.confirmPassword,
        role: formData.role as 'student' | 'instructor' | 'partner',
        country: formData.country
      });
      
      console.log('Registration successful:', response);
      navigate('/dashboard');
    } catch (error: any) {
      console.error('Registration error:', error);
      
      // Handle errors
      if (error.response?.data) {
        setErrors(error.response.data);
      } else {
        setErrors({
          email: 'Network error. Please try again.'
        });
      }
    } finally {
      setIsLoading(false);
    }
  }
};
```

### 6. Protected Route Component

**File: `elimu-connect-learn-main/src/components/ProtectedRoute.tsx`**

```typescript
import { Navigate } from 'react-router-dom';
import authService from '@/services/authService';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children, requiredRole }) => {
  const isAuthenticated = authService.isAuthenticated();
  const user = authService.getCurrentUser();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole && user && !requiredRole.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;
```

### 7. Environment Variables

**File: `elimu-connect-learn-main/.env`**

```
VITE_API_URL=http://localhost:8000/api
```

### 8. Install Required Packages

```bash
cd elimu-connect-learn-main
npm install axios
```

### 9. Testing the Integration

1. Start Django backend:
```bash
cd "C:\Users\Gidion Mlay\Downloads\elimu space v2"
python manage.py runserver
```

2. Start React frontend:
```bash
cd elimu-connect-learn-main
npm run dev
```

3. Test the flow:
   - Register a new user at `/register`
   - Login at `/login`
   - Access protected routes

### 10. Common API Responses

**Success Response (Login/Register):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "role": "student",
    "full_name": "John Doe",
    "profile_image": null
  }
}
```

**Error Response:**
```json
{
  "email": ["A user with this email already exists."],
  "password": ["Password fields didn't match."]
}
```

### 11. Troubleshooting

**CORS Error:**
- Ensure `CORS_ALLOWED_ORIGINS` in Django settings includes your frontend URL
- Check that `corsheaders` middleware is properly configured

**401 Unauthorized:**
- Check if token is being sent in Authorization header
- Verify token hasn't expired
- Ensure JWT settings are correct

**Network Error:**
- Verify Django server is running on port 8000
- Check API_BASE_URL in frontend configuration
- Ensure both frontend and backend are accessible

### 12. Next Steps

1. Implement user profile management
2. Add course enrollment functionality
3. Create dashboard with user data
4. Implement file upload for profile images
5. Add email verification flow
6. Set up password reset functionality

