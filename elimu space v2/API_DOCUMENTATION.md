# 📚 Elimu Space API Documentation

## Base URL
```
http://localhost:8000/api
```

---

## 🔐 Authentication Endpoints

### 1. Register User
**POST** `/api/auth/register/`

**Request Body:**
```json
{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "securepass123",
  "password2": "securepass123",
  "role": "student",
  "first_name": "John",
  "last_name": "Doe",
  "country": "Tanzania"
}
```

**Response (201 Created):**
```json
{
  "user": {
    "id": 1,
    "username": "johndoe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "role": "student"
  },
  "message": "User registered successfully",
  "tokens": {
    "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc...",
    "access": "eyJ0eXAiOiJKV1QiLCJhbGc..."
  }
}
```

---

### 2. Login User
**POST** `/api/auth/login/`

**Request Body:**
```json
{
  "username": "johndoe",
  "password": "securepass123"
}
```

**Response (200 OK):**
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

---

### 3. Refresh Token
**POST** `/api/auth/refresh/`

**Request Body:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response (200 OK):**
```json
{
  "access": "eyJ0eXAiOiJKV1QiLCJhbGc...",
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

---

### 4. Logout User
**POST** `/api/auth/logout/`
**Auth Required:** Yes

**Request Body:**
```json
{
  "refresh": "eyJ0eXAiOiJKV1QiLCJhbGc..."
}
```

**Response (200 OK):**
```json
{
  "message": "Successfully logged out"
}
```

---

## 👤 User Profile Endpoints

### 5. Get User Profile
**GET** `/api/users/profile/`
**Auth Required:** Yes

**Response (200 OK):**
```json
{
  "id": 1,
  "username": "johndoe",
  "email": "john@example.com",
  "first_name": "John",
  "last_name": "Doe",
  "full_name": "John Doe",
  "role": "student",
  "bio": "Passionate learner",
  "profile_image": "/media/profiles/john.jpg",
  "phone_number": "+255 123 456 789",
  "country": "Tanzania",
  "is_verified": true,
  "created_at": "2025-01-01T10:00:00Z",
  "last_login": "2025-10-07T15:30:00Z"
}
```

---

### 6. Update User Profile
**PUT/PATCH** `/api/users/profile/update/`
**Auth Required:** Yes

**Request Body:**
```json
{
  "first_name": "John",
  "last_name": "Doe",
  "bio": "Updated bio",
  "phone_number": "+255 123 456 789",
  "country": "Tanzania"
}
```

**Response (200 OK):**
```json
{
  "message": "Profile updated successfully",
  "user": { /* user object */ }
}
```

---

### 7. Change Password
**POST** `/api/users/change-password/`
**Auth Required:** Yes

**Request Body:**
```json
{
  "old_password": "oldpass123",
  "new_password": "newpass123",
  "new_password2": "newpass123"
}
```

**Response (200 OK):**
```json
{
  "message": "Password changed successfully"
}
```

---

## 📚 Course Endpoints

### 8. List Categories
**GET** `/api/courses/categories/`

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "name": "Digital Literacy",
    "slug": "digital-literacy",
    "description": "Learn essential digital skills",
    "icon": "faLaptop",
    "course_count": 25,
    "created_at": "2025-01-01T10:00:00Z"
  }
]
```

---

### 9. List Courses
**GET** `/api/courses/`

**Query Parameters:**
- `category` - Filter by category slug
- `level` - Filter by level (beginner/intermediate/advanced)
- `language` - Filter by language (english/swahili/both)
- `is_free` - Filter free courses (true/false)
- `is_featured` - Filter featured courses (true/false)
- `search` - Search in title, description, instructor
- `ordering` - Order by field (created_at, rating, price, enrolled_count)

**Example:**
```
GET /api/courses/?category=digital-literacy&level=beginner&is_free=true
```

**Response (200 OK):**
```json
{
  "count": 150,
  "next": "http://localhost:8000/api/courses/?page=2",
  "previous": null,
  "results": [
    {
      "id": 1,
      "title": "Introduction to Digital Marketing",
      "slug": "introduction-to-digital-marketing",
      "short_description": "Learn the basics of digital marketing",
      "category_name": "Digital Literacy",
      "instructor_name": "Amina Hassan",
      "level": "beginner",
      "language": "both",
      "thumbnail": "/media/courses/thumbnails/digital-marketing.jpg",
      "price": "0.00",
      "original_price": null,
      "is_free": true,
      "is_premium": false,
      "duration": "8 weeks",
      "enrolled_count": 1542,
      "rating": "4.80",
      "review_count": 230,
      "is_enrolled": false
    }
  ]
}
```

---

### 10. Get Course Details
**GET** `/api/courses/<slug>/`

**Response (200 OK):**
```json
{
  "id": 1,
  "title": "Introduction to Digital Marketing",
  "slug": "introduction-to-digital-marketing",
  "description": "Complete course description...",
  "short_description": "Learn the basics of digital marketing",
  "category": {
    "id": 1,
    "name": "Digital Literacy",
    "slug": "digital-literacy"
  },
  "instructor": {
    "id": 5,
    "name": "Amina Hassan",
    "username": "amina_hassan",
    "bio": "Marketing expert with 10+ years experience",
    "profile_image": "/media/profiles/amina.jpg"
  },
  "level": "beginner",
  "language": "both",
  "thumbnail": "/media/courses/thumbnails/digital-marketing.jpg",
  "intro_video": "https://youtube.com/watch?v=...",
  "price": "0.00",
  "is_free": true,
  "duration": "8 weeks",
  "total_lectures": 45,
  "total_duration_minutes": 360,
  "enrolled_count": 1542,
  "rating": "4.80",
  "review_count": 230,
  "requirements": ["Basic computer skills", "Internet connection"],
  "what_you_learn": ["Digital marketing fundamentals", "Social media marketing", "Email marketing"],
  "lessons": [
    {
      "id": 1,
      "title": "Introduction to Digital Marketing",
      "description": "Overview of digital marketing",
      "order": 1,
      "duration_minutes": 15,
      "is_preview": true
    }
  ],
  "is_enrolled": false,
  "user_progress": null
}
```

---

### 11. Enroll in Course
**POST** `/api/courses/<slug>/enroll/`
**Auth Required:** Yes

**Response (201 Created):**
```json
{
  "message": "Successfully enrolled in course",
  "enrollment": {
    "id": 1,
    "course": { /* course object */ },
    "status": "active",
    "progress": "0.00",
    "enrolled_at": "2025-10-07T15:30:00Z"
  }
}
```

---

### 12. Update Course Progress
**POST** `/api/courses/<slug>/progress/`
**Auth Required:** Yes

**Request Body:**
```json
{
  "lesson_id": 5
}
```

**Response (200 OK):**
```json
{
  "message": "Progress updated",
  "enrollment": {
    "progress": "25.50",
    "completed_lessons": [1, 2, 3, 5],
    "status": "active"
  }
}
```

---

### 13. Course Reviews
**GET/POST** `/api/courses/<slug>/reviews/`

**GET Response:**
```json
[
  {
    "id": 1,
    "user_name": "John Doe",
    "user_profile_image": "/media/profiles/john.jpg",
    "rating": 5,
    "comment": "Excellent course!",
    "created_at": "2025-10-05T10:00:00Z"
  }
]
```

**POST Request (Auth Required):**
```json
{
  "rating": 5,
  "comment": "Excellent course! Highly recommended."
}
```

---

### 14. My Enrollments
**GET** `/api/courses/my/enrollments/`
**Auth Required:** Yes

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "course": { /* course object */ },
    "status": "active",
    "progress": "45.50",
    "enrolled_at": "2025-09-01T10:00:00Z",
    "last_accessed": "2025-10-07T15:30:00Z"
  }
]
```

---

## 📊 Dashboard Endpoints

### 15. Dashboard Statistics
**GET** `/api/dashboard/stats/`
**Auth Required:** Yes

**Response (200 OK):**
```json
{
  "total_courses": 5,
  "completed_courses": 2,
  "in_progress_courses": 3,
  "total_learning_time": 1200,
  "achievements_count": 8,
  "current_streak": 7
}
```

---

### 16. My Notifications
**GET** `/api/dashboard/notifications/`
**Auth Required:** Yes

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "notification_type": "new_lesson",
    "title": "New lesson available!",
    "message": "A new lesson has been added to your course",
    "link": "/courses/digital-marketing/",
    "is_read": false,
    "created_at": "2025-10-07T14:00:00Z"
  }
]
```

---

### 17. Mark Notification as Read
**POST** `/api/dashboard/notifications/<id>/read/`
**Auth Required:** Yes

**Response (200 OK):**
```json
{
  "message": "Notification marked as read"
}
```

---

### 18. My Achievements
**GET** `/api/dashboard/achievements/`
**Auth Required:** Yes

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "First Course Completed",
    "description": "You completed your first course!",
    "badge_icon": "faTrophy",
    "earned_at": "2025-10-01T10:00:00Z"
  }
]
```

---

### 19. My Activity
**GET** `/api/dashboard/activity/`
**Auth Required:** Yes

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "action": "lesson_complete",
    "course_title": "Digital Marketing Basics",
    "timestamp": "2025-10-07T15:30:00Z"
  }
]
```

---

### 20. Recent Courses
**GET** `/api/dashboard/recent-courses/`
**Auth Required:** Yes

**Response (200 OK):**
```json
[
  {
    "id": 1,
    "title": "Digital Marketing Basics",
    "slug": "digital-marketing-basics",
    /* ... other course fields */
  }
]
```

---

## 🔑 Authentication Headers

For protected endpoints, include JWT token in Authorization header:

```
Authorization: Bearer eyJ0eXAiOiJKV1QiLCJhbGc...
```

---

## 📝 Error Responses

### 400 Bad Request
```json
{
  "email": ["A user with this email already exists."],
  "password": ["Password fields didn't match."]
}
```

### 401 Unauthorized
```json
{
  "detail": "Authentication credentials were not provided."
}
```

### 403 Forbidden
```json
{
  "detail": "You do not have permission to perform this action."
}
```

### 404 Not Found
```json
{
  "detail": "Not found."
}
```

---

## 🧪 Testing Endpoints

### Using cURL

**Register:**
```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "testpass123",
    "password2": "testpass123",
    "role": "student"
  }'
```

**Login:**
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'
```

**Get Profile (with token):**
```bash
curl -X GET http://localhost:8000/api/users/profile/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

---

## 📊 Complete API Endpoint List

| Method | Endpoint | Description | Auth |
|--------|----------|-------------|------|
| **AUTHENTICATION** |
| POST | `/api/auth/register/` | Register new user | No |
| POST | `/api/auth/login/` | Login user | No |
| POST | `/api/auth/refresh/` | Refresh access token | No |
| POST | `/api/auth/logout/` | Logout user | Yes |
| **USER PROFILE** |
| GET | `/api/users/profile/` | Get user profile | Yes |
| PUT/PATCH | `/api/users/profile/update/` | Update profile | Yes |
| POST | `/api/users/change-password/` | Change password | Yes |
| **COURSES** |
| GET | `/api/courses/categories/` | List categories | No |
| GET | `/api/courses/` | List courses | No |
| GET | `/api/courses/<slug>/` | Course details | No |
| POST | `/api/courses/<slug>/enroll/` | Enroll in course | Yes |
| POST | `/api/courses/<slug>/progress/` | Update progress | Yes |
| GET/POST | `/api/courses/<slug>/reviews/` | Course reviews | Yes (POST) |
| GET | `/api/courses/my/enrollments/` | My enrollments | Yes |
| **DASHBOARD** |
| GET | `/api/dashboard/stats/` | Dashboard stats | Yes |
| GET | `/api/dashboard/notifications/` | My notifications | Yes |
| POST | `/api/dashboard/notifications/<id>/read/` | Mark as read | Yes |
| GET | `/api/dashboard/achievements/` | My achievements | Yes |
| GET | `/api/dashboard/activity/` | My activity | Yes |
| GET | `/api/dashboard/recent-courses/` | Recent courses | Yes |

---

## 🎯 Rate Limiting

- Authentication endpoints: 5 requests per minute
- Other endpoints: 100 requests per minute
- Admin endpoints: No limit

---

## 🔄 Pagination

List endpoints return paginated results:
- Default page size: 20 items
- Query parameter: `?page=2`
- Response includes: `count`, `next`, `previous`, `results`

---

## 🔍 Search & Filtering

**Search:**
```
GET /api/courses/?search=digital marketing
```

**Filter:**
```
GET /api/courses/?category=digital-literacy&level=beginner
```

**Ordering:**
```
GET /api/courses/?ordering=-rating
GET /api/courses/?ordering=price
```

---

## 📱 Response Status Codes

- `200 OK` - Success
- `201 Created` - Resource created
- `204 No Content` - Success, no content
- `400 Bad Request` - Validation error
- `401 Unauthorized` - Authentication required
- `403 Forbidden` - Permission denied
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

**For more details, visit:** http://localhost:8000/admin/

