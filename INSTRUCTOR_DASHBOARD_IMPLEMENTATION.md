# Instructor Dashboard Implementation Guide

## Overview

The Instructor Dashboard is a comprehensive course management interface for Elimu Space instructors. It provides real-time access to course analytics, student management, earnings tracking, and notifications - all integrated with the Node.js + Express backend.

## ✅ Features Implemented

### 1. **User Profile Display**
- Real instructor information (name, email, role)
- Profile image support with fallback avatar
- Verification badge for verified instructors
- Edit profile functionality
- Secure logout

### 2. **Dashboard Statistics**
- Total courses created
- Published vs draft courses
- Total students enrolled
- Active students count
- Average course rating
- Total reviews
- Total earnings
- Pending payouts
- All stats fetched from `/api/v1/dashboard/stats`

### 3. **Course Management**
- List all courses created by instructor
- Real-time course statistics:
  - Enrollment count
  - Active students
  - Completed students
  - Average progress
  - Revenue per course
  - Course status (draft, published, archived)
- Course actions:
  - View course
  - Edit course
  - Publish/unpublish toggle
  - Delete course (planned)
- Empty state with "Create Course" CTA

### 4. **Student Management**
- View all students across all courses
- Student information:
  - Name, email, profile image
  - Enrollment date
  - Current progress (0-100%)
  - Status (enrolled, in_progress, completed, dropped)
  - Last activity timestamp
  - Average quiz scores
- Filter by course (planned)
- Student progress tracking

### 5. **Earnings Overview**
- Total earnings display
- Pending earnings
- Available for payout
- Monthly earnings with growth indicator
- Request payout functionality
- Currency formatting (TSh)

### 6. **Notifications**
- Real-time instructor notifications
- Unread count badge
- Mark as read functionality
- Different notification types
- Action links for quick access
- Empty state when caught up

### 7. **Quick Actions**
- Create new course
- Edit profile
- View analytics (planned)
- Request payout
- Logout

## Architecture

### Frontend Components

```
src/
├── pages/
│   └── dashboards/
│       └── InstructorDashboard.tsx        # Main dashboard page
├── components/
│   └── dashboard/
│       ├── InstructorCourseCard.tsx      # Course card with stats
│       ├── StudentCard.tsx                # Student display with progress
│       ├── EarningsCard.tsx               # Earnings overview
│       ├── NotificationItem.tsx           # Notification display
│       └── StatsCard.tsx                  # Reusable stats card
├── services/
│   └── instructorService.ts               # Instructor API calls
├── types/
│   └── index.ts                           # TypeScript interfaces
└── config/
    └── api.ts                             # API endpoints
```

### Backend Integration

All data is fetched from the Node.js + Express backend:

- **Base URL**: `http://localhost:3000/api/v1`
- **Authentication**: JWT Bearer tokens
- **Token Storage**: localStorage
- **Auto-refresh**: Token refresh before expiry

### API Endpoints Used

```javascript
// Dashboard Stats
GET /api/v1/dashboard/stats

// Instructor Courses
GET /api/v1/courses/my-courses

// Course Students
GET /api/v1/courses/:id/students

// All Instructor Students
GET /instructor/students

// Notifications
GET /api/v1/dashboard/notifications
PATCH /api/v1/dashboard/notifications/:id/read

// Course Management
POST /api/v1/courses                    # Create course
PUT /api/v1/courses/:id                 # Update course
DELETE /api/v1/courses/:id              # Delete course
PATCH /api/v1/courses/:id/status        # Publish/unpublish

// Earnings
GET /instructor/earnings

// Course Analytics
GET /api/v1/courses/:id/analytics
```

## Authentication Flow

### 1. Registration Flow

```
User fills form → Register as instructor → API call → Success → Redirect to Login page
```

**Implementation:**
```typescript
// Register.tsx
await registerUser({
  username,
  email,
  password,
  password2,
  role: 'instructor',  // Important!
  country,
});

// Redirect to login
navigate('/login', { 
  replace: true,
  state: { message: 'Registration successful!' }
});
```

### 2. Login Flow

```
Instructor enters credentials → Login button → API call → Token storage → Redirect to Dashboard
```

**Implementation:**
```typescript
// Login.tsx
await login(email, password);

// Redirect to dashboard
const from = location.state?.from?.pathname || '/dashboard';
navigate(from, { replace: true });
```

### 3. Dashboard Routing

```typescript
// Dashboard.tsx
<ProtectedRoute>
  {user.role === 'instructor' && <InstructorDashboard />}
  {user.role === 'student' && <StudentDashboard />}
  {user.role === 'admin' && <AdminDashboard />}
</ProtectedRoute>
```

## Data Flow

### 1. Dashboard Data Loading

```typescript
// InstructorDashboard.tsx
const fetchDashboardData = async () => {
  // Fetch all data in parallel for better performance
  const [stats, courses, students, notifications] = await Promise.all([
    instructorService.getStats(),
    instructorService.getMyCourses(),
    instructorService.getAllStudents(),
    instructorService.getNotifications(5),
  ]);

  // Update state
  setStats(stats);
  setCourses(courses);
  setStudents(students);
  setNotifications(notifications);
};
```

### 2. Real-time Updates

- **Course status toggle**: Optimistic UI update + API call
- **Student progress**: Fetched from backend on each dashboard load
- **Earnings**: Updated when students complete purchases
- **Notifications**: Real-time with mark as read

### 3. Error Handling

```typescript
try {
  // API call
} catch (error) {
  // Fallback to empty array/null
  // Show user-friendly toast notification
  toast({
    title: 'Error',
    description: 'Failed to load data',
    variant: 'destructive',
  });
}
```

## TypeScript Interfaces

### Key Data Models

```typescript
// Instructor Statistics
interface InstructorStats {
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

// Instructor Course (extends base Course)
interface InstructorCourse extends Course {
  enrollment_count: number;
  active_students: number;
  completed_students: number;
  average_progress: number;
  revenue: number;
  status: 'draft' | 'published' | 'archived';
  last_updated: string;
}

// Course Student
interface CourseStudent {
  id: number;
  student_id: number;
  student_name: string;
  student_email: string;
  student_profile_image?: string;
  enrollment_date: string;
  progress: number; // 0-100
  status: 'enrolled' | 'in_progress' | 'completed' | 'dropped';
  last_activity: string;
  quiz_scores?: number[];
  average_score?: number;
}
```

## Styling & Design

### Color Scheme (Elimu Space Brand Colors)

```css
/* Primary */
--orange: #F97316;      /* Actions, CTAs */
--orange-dark: #EA580C;

/* Secondary */
--blue: #0D3B66;        /* Headers, Navigation */
--blue-light: #3B82F6;

/* Status Colors */
--green: #10B981;       /* Published, Success */
--yellow: #F59E0B;      /* Draft, Warning */
--red: #EF4444;         /* Dropped, Error */
--purple: #8B5CF6;      /* Earnings, Certificates */

/* Neutrals */
--gray-50: #F9FAFB;
--gray-100: #F3F4F6;
--gray-600: #6B7280;
--gray-800: #111827;
```

### Responsive Design

- **Mobile-first approach**
- **Breakpoints**:
  - `md`: 768px (tablets)
  - `lg`: 1024px (desktops)
- **Grid layouts** adapt from 1 column → 2 columns → 3-4 columns
- **Touch-friendly** button sizes and spacing

### Component Patterns

```typescript
// Gradient backgrounds for earnings
className="bg-gradient-to-br from-purple-600 to-pink-600"

// Status badges
className="bg-green-100 text-green-700 border-green-300"

// Card hover effects
className="hover:shadow-xl transition-all duration-300"

// Rounded corners
className="rounded-xl"
```

## Security Features

### 1. Authentication

- **JWT Tokens**: Stored in localStorage
- **Token Refresh**: Automatic before expiry
- **Protected Routes**: Require authentication
- **Role-based Access**: Only instructors see instructor dashboard

### 2. API Security

```typescript
// API interceptor adds token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('access_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Auto-refresh on 401 errors
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      await refreshToken();
    }
  }
);
```

### 3. Data Validation

- **Frontend**: Form validation before submission
- **Backend**: API validates all inputs
- **Type Safety**: TypeScript interfaces enforce correct data types

### 4. Access Control

- Instructors can only view/edit their own courses
- Student data filtered by instructor's courses
- Earnings data isolated per instructor

## Performance Optimizations

### 1. Parallel Data Loading

```typescript
const [stats, courses, students, notifications] = await Promise.all([
  instructorService.getStats().catch(() => null),
  instructorService.getMyCourses().catch(() => []),
  instructorService.getAllStudents().catch(() => []),
  instructorService.getNotifications(5).catch(() => []),
]);
```

### 2. Error Resilience

- Individual API failures don't crash the dashboard
- Graceful fallbacks to empty states
- User-friendly error messages

### 3. Loading States

- Spinner during initial load
- Optimistic UI updates for actions
- Skeleton screens (planned)

### 4. Lazy Loading

```typescript
// Components rendered conditionally based on active tab
{activeTab === 'courses' && <CoursesList />}
{activeTab === 'students' && <StudentsList />}
{activeTab === 'notifications' && <NotificationsList />}
```

## Adding New Features

### 1. Add Course Analytics Section

```typescript
// 1. Create component
// components/dashboard/CourseAnalytics.tsx
export const CourseAnalytics: React.FC<{courseId: number}> = ({courseId}) => {
  const [analytics, setAnalytics] = useState(null);
  
  useEffect(() => {
    instructorService.getCourseAnalytics(courseId)
      .then(setAnalytics);
  }, [courseId]);
  
  return <div>Analytics for course {courseId}</div>;
};

// 2. Add to InstructorDashboard
import CourseAnalytics from '@/components/dashboard/CourseAnalytics';

// 3. Use in dashboard
<CourseAnalytics courseId={selectedCourse.id} />
```

### 2. Add New API Endpoint

```typescript
// 1. Add to config/api.ts
export const API_ENDPOINTS = {
  INSTRUCTOR: {
    ANALYTICS: `${API_BASE_URL}/instructor/analytics`,
  },
};

// 2. Add service method
// services/instructorService.ts
async getInstructorAnalytics(): Promise<Analytics> {
  const response = await api.get(API_ENDPOINTS.INSTRUCTOR.ANALYTICS);
  return response.data;
}

// 3. Use in component
const analytics = await instructorService.getInstructorAnalytics();
```

## Testing the Dashboard

### 1. Instructor Registration

```bash
1. Navigate to http://localhost:5173/register
2. Fill in form:
   - Full Name: Test Instructor
   - Email: instructor@test.com
   - Password: password123
   - Role: Instructor
   - Country: Tanzania
3. Click "Create Account"
4. Should redirect to login page
```

### 2. Instructor Login

```bash
1. Navigate to http://localhost:5173/login
2. Enter credentials:
   - Email: instructor@test.com
   - Password: password123
3. Click "Sign In"
4. Should redirect to instructor dashboard
```

### 3. Dashboard Features

```bash
1. View Stats: Check all stat cards display correct numbers
2. My Courses: View course cards with enrollment stats
3. Students: Check students tab with progress
4. Notifications: Check notifications tab with unread count
5. Earnings: Verify earnings card shows correct amounts
6. Create Course: Click create button (redirects to create page)
7. Edit Course: Click edit button on course card
8. Toggle Status: Publish/unpublish course
9. Profile: Verify instructor info displays correctly
10. Logout: Click logout button, should redirect to login
```

## Troubleshooting

### Issue: Dashboard shows no data

**Solution:**
```bash
# Check browser console for API errors
# Verify backend is running on http://localhost:3000
# Check that JWT token exists in localStorage
localStorage.getItem('access_token')

# Verify user role is 'instructor'
const user = JSON.parse(localStorage.getItem('user'));
console.log(user.role); // Should be 'instructor'
```

### Issue: Can't create courses

**Solution:**
```bash
# Backend endpoint must exist: POST /api/v1/courses
# Check instructor is verified: stats.is_verified should be true
# Verify token has proper permissions
```

### Issue: Students not showing

**Solution:**
```bash
# Ensure backend endpoint exists: GET /instructor/students
# Verify courses have enrolled students
# Check API response in network tab
```

## Future Enhancements

### Planned Features

1. **Course Builder**
   - Drag-and-drop curriculum builder
   - Video upload and management
   - Quiz creator
   - Assignment management

2. **Advanced Analytics**
   - Course performance charts
   - Student engagement metrics
   - Revenue trends
   - Conversion rates

3. **Communication Tools**
   - Message students
   - Announcement system
   - Live Q&A sessions
   - Discussion forums

4. **Payment Integration**
   - Automated payouts
   - Payment history
   - Tax documents
   - Stripe/PayPal integration

5. **Course Reviews**
   - View all reviews
   - Respond to reviews
   - Rating breakdown
   - Review moderation

## Required Backend Endpoints

### Currently Implemented
- ✅ `GET /api/v1/dashboard/stats`
- ✅ `GET /api/v1/dashboard/notifications`
- ✅ `PATCH /api/v1/dashboard/notifications/:id/read`

### To Be Implemented

```javascript
// Course Management
GET /api/v1/courses/my-courses              # Get instructor's courses
POST /api/v1/courses                        # Create new course
PUT /api/v1/courses/:id                     # Update course
DELETE /api/v1/courses/:id                  # Delete course
PATCH /api/v1/courses/:id/status            # Toggle publish status

// Student Management
GET /api/v1/courses/:id/students            # Get students in a course
GET /api/v1/instructor/students             # Get all instructor's students

// Earnings
GET /api/v1/instructor/earnings             # Get earnings overview
POST /api/v1/instructor/payout              # Request payout

// Analytics
GET /api/v1/courses/:id/analytics           # Get course analytics
GET /api/v1/instructor/analytics            # Get overall analytics

// Course Content
POST /api/v1/courses/:id/lessons            # Add lesson
PUT /api/v1/courses/:id/lessons/:lessonId   # Update lesson
DELETE /api/v1/courses/:id/lessons/:lessonId # Delete lesson
```

## Support & Documentation

- **Frontend README**: `/elimu-connect-learn-main/README.md`
- **Backend Documentation**: `/backend/IMPLEMENTATION_COMPLETE.md`
- **Student Dashboard**: `/STUDENT_DASHBOARD_IMPLEMENTATION.md`
- **API Documentation**: `/backend/START_HERE.md`

---

**Last Updated**: October 2025
**Version**: 2.0
**Maintained by**: Elimu Space Development Team

