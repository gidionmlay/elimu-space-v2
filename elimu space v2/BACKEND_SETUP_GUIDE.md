# Elimu Space Backend Setup Guide

## 📋 Prerequisites
- Python 3.8+ installed
- pip (Python package manager)
- MongoDB installed and running locally or MongoDB Atlas account

## 🚀 Phase 1: Backend Foundation Setup

### Step 1: Create Virtual Environment

```bash
# Navigate to your project directory
cd "C:\Users\Gidion Mlay\Downloads\elimu space v2"

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1

# On Windows CMD:
venv\Scripts\activate.bat

# On Mac/Linux:
source venv/bin/activate
```

### Step 2: Install Required Dependencies

```bash
pip install django djongo djangorestframework djangorestframework-simplejwt django-cors-headers pymongo pillow python-decouple
```

### Step 3: Create Django Project

```bash
django-admin startproject elimu_backend .
```

### Step 4: Create Django Apps

```bash
python manage.py startapp users
python manage.py startapp courses
python manage.py startapp dashboard
```

### Step 5: Project Structure

After setup, your structure should look like:
```
elimu space v2/
├── elimu-connect-learn-main/     # React Frontend
├── elimu_backend/                 # Django Backend
│   ├── __init__.py
│   ├── settings.py
│   ├── urls.py
│   ├── wsgi.py
│   └── asgi.py
├── users/                         # User management app
├── courses/                       # Course management app
├── dashboard/                     # Dashboard app
├── manage.py
├── requirements.txt
└── .env                          # Environment variables
```

### Step 6: Configure Settings

See the `settings.py` configuration below.

### Step 7: Run Migrations

```bash
python manage.py makemigrations
python manage.py migrate
```

### Step 8: Create Superuser

```bash
python manage.py createsuperuser
```

### Step 9: Run Development Server

```bash
python manage.py runserver
```

The backend will be available at: `http://localhost:8000`

## 🔗 Frontend Integration

### Update Frontend API URLs

In your React frontend, create an API configuration file:

**File: `elimu-connect-learn-main/src/config/api.ts`**

```typescript
export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: `${API_BASE_URL}/auth/login/`,
    REGISTER: `${API_BASE_URL}/auth/register/`,
    REFRESH: `${API_BASE_URL}/auth/refresh/`,
    LOGOUT: `${API_BASE_URL}/auth/logout/`,
  },
  USERS: {
    PROFILE: `${API_BASE_URL}/users/profile/`,
    UPDATE: `${API_BASE_URL}/users/update/`,
  },
  COURSES: {
    LIST: `${API_BASE_URL}/courses/`,
    DETAIL: (id: string) => `${API_BASE_URL}/courses/${id}/`,
    ENROLL: (id: string) => `${API_BASE_URL}/courses/${id}/enroll/`,
  }
};
```

### Environment Variables

**Frontend `.env` file:**
```
VITE_API_URL=http://localhost:8000/api
```

**Backend `.env` file:**
```
DEBUG=True
SECRET_KEY=your-secret-key-here
ALLOWED_HOSTS=localhost,127.0.0.1
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000
MONGODB_NAME=elimu_space_db
MONGODB_HOST=localhost
MONGODB_PORT=27017
```

## 🧪 Testing the API

### Test Registration
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

### Test Login
```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "testpass123"
  }'
```

## 📦 Requirements.txt

Save all dependencies:
```bash
pip freeze > requirements.txt
```

## 🔧 Troubleshooting

### MongoDB Connection Issues
- Ensure MongoDB is running: `mongod --version`
- Check MongoDB service status
- Verify connection string in settings.py

### CORS Issues
- Check CORS_ALLOWED_ORIGINS in settings.py
- Ensure frontend URL is whitelisted

### JWT Token Issues
- Verify JWT settings in settings.py
- Check token expiration times
- Ensure proper Authorization header format: `Bearer <token>`

## 🎯 Next Steps

1. Implement course models and serializers
2. Add file upload for course materials
3. Implement enrollment system
4. Add payment integration (if needed)
5. Set up email notifications
6. Deploy to production (Railway, Heroku, or DigitalOcean)

## 📚 Useful Commands

```bash
# Create new migration
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Run on different port
python manage.py runserver 8080

# Shell access
python manage.py shell

# Collect static files (for production)
python manage.py collectstatic
```

## 🔐 Security Checklist

- [ ] Change SECRET_KEY in production
- [ ] Set DEBUG=False in production
- [ ] Configure ALLOWED_HOSTS properly
- [ ] Use environment variables for sensitive data
- [ ] Enable HTTPS in production
- [ ] Set up proper CORS configuration
- [ ] Implement rate limiting
- [ ] Add input validation and sanitization

