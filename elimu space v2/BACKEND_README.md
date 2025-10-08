# Elimu Space Django Backend

## 📚 Overview

This is the Django REST Framework backend for the Elimu Space e-learning platform. It provides authentication, user management, and will support course management, enrollments, and more.

## 🏗️ Architecture

- **Framework**: Django 4.2.7
- **API**: Django REST Framework
- **Database**: MongoDB (via Djongo)
- **Authentication**: JWT (SimpleJWT)
- **CORS**: django-cors-headers

## 📦 Project Structure

```
elimu space v2/
├── elimu_backend/          # Main Django project
│   ├── settings.py         # Project settings
│   ├── urls.py            # Main URL configuration
│   ├── wsgi.py            # WSGI application
│   └── asgi.py            # ASGI application
├── users/                  # User management app
│   ├── models.py          # User & UserProfile models
│   ├── serializers.py     # User serializers
│   ├── views.py           # User views/endpoints
│   ├── admin.py           # Django admin config
│   └── urls.py            # User URLs (if needed)
├── courses/                # Course management app (future)
├── dashboard/              # Dashboard app (future)
├── media/                  # User uploaded files
├── staticfiles/            # Static files
├── manage.py              # Django management script
├── requirements.txt       # Python dependencies
└── .env                   # Environment variables
```

## 🚀 Quick Start

### Prerequisites

- Python 3.8+
- MongoDB installed or MongoDB Atlas account
- pip (Python package manager)

### Installation Steps

1. **Clone and navigate to project**
   ```bash
   cd "C:\Users\Gidion Mlay\Downloads\elimu space v2"
   ```

2. **Run setup script (Windows PowerShell)**
   ```powershell
   .\setup_backend.ps1
   ```

   Or manually:

3. **Create virtual environment**
   ```bash
   python -m venv venv
   .\venv\Scripts\Activate.ps1  # Windows
   ```

4. **Install dependencies**
   ```bash
   pip install -r requirements.txt
   ```

5. **Create Django project**
   ```bash
   django-admin startproject elimu_backend .
   ```

6. **Create apps**
   ```bash
   python manage.py startapp users
   python manage.py startapp courses
   python manage.py startapp dashboard
   ```

7. **Configure settings**
   - Copy content from `DJANGO_SETTINGS.py` to `elimu_backend/settings.py`
   - Copy content from `USERS_MODELS.py` to `users/models.py`
   - Copy content from `USERS_SERIALIZERS.py` to `users/serializers.py`
   - Copy content from `USERS_VIEWS.py` to `users/views.py`
   - Copy content from `USERS_ADMIN.py` to `users/admin.py`
   - Copy content from `DJANGO_URLS.py` to `elimu_backend/urls.py`

8. **Set up environment variables**
   ```bash
   cp env.example .env
   # Edit .env with your configuration
   ```

9. **Run migrations**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

10. **Create superuser**
    ```bash
    python manage.py createsuperuser
    ```

11. **Run development server**
    ```bash
    python manage.py runserver
    ```

The API will be available at: `http://localhost:8000`

## 🔑 API Endpoints

### Authentication

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| POST | `/api/auth/register/` | Register new user | No |
| POST | `/api/auth/login/` | Login user | No |
| POST | `/api/auth/refresh/` | Refresh access token | No |
| POST | `/api/auth/logout/` | Logout user | Yes |
| POST | `/api/auth/verify-email/` | Verify email | No |
| POST | `/api/auth/request-password-reset/` | Request password reset | No |
| POST | `/api/auth/reset-password/` | Reset password | No |

### User Management

| Method | Endpoint | Description | Auth Required |
|--------|----------|-------------|---------------|
| GET | `/api/users/profile/` | Get current user profile | Yes |
| PUT/PATCH | `/api/users/profile/update/` | Update user profile | Yes |
| POST | `/api/users/change-password/` | Change password | Yes |
| GET | `/api/users/` | List all users (admin) | Yes (Admin) |
| GET/PUT/DELETE | `/api/users/<id>/` | User detail (admin) | Yes (Admin) |

## 📝 API Usage Examples

### Register User

```bash
curl -X POST http://localhost:8000/api/auth/register/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "email": "john@example.com",
    "password": "securepass123",
    "password2": "securepass123",
    "role": "student",
    "country": "Tanzania"
  }'
```

### Login User

```bash
curl -X POST http://localhost:8000/api/auth/login/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "johndoe",
    "password": "securepass123"
  }'
```

### Get User Profile

```bash
curl -X GET http://localhost:8000/api/users/profile/ \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN"
```

## 🔐 Environment Variables

Required environment variables (in `.env`):

```env
# Django
DEBUG=True
SECRET_KEY=your-secret-key
ALLOWED_HOSTS=localhost,127.0.0.1

# CORS
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# MongoDB
MONGODB_NAME=elimu_space_db
MONGODB_HOST=localhost
MONGODB_PORT=27017

# JWT
JWT_ACCESS_TOKEN_LIFETIME_MINUTES=60
JWT_REFRESH_TOKEN_LIFETIME_DAYS=7
```

## 🗃️ Database Models

### User Model

- `username` (string, unique)
- `email` (string, unique)
- `password` (hashed)
- `first_name` (string)
- `last_name` (string)
- `role` (choice: student/instructor/partner/admin)
- `bio` (text)
- `profile_image` (image)
- `phone_number` (string)
- `country` (string)
- `is_verified` (boolean)
- `created_at` (datetime)
- `updated_at` (datetime)

### UserProfile Model (Extended)

- `user` (OneToOne with User)
- `education_level` (string)
- `institution` (string)
- `occupation` (string)
- `linkedin_url` (URL)
- `github_url` (URL)
- `website` (URL)
- `learning_goals` (text)
- `interests` (JSON)
- `email_notifications` (boolean)
- `course_updates` (boolean)
- `marketing_emails` (boolean)

## 🧪 Testing

Run tests:
```bash
python manage.py test
```

## 📊 Admin Panel

Access the Django admin at: `http://localhost:8000/admin/`

Use the superuser credentials you created.

## 🔧 Troubleshooting

### MongoDB Connection Issues

**Problem**: Can't connect to MongoDB

**Solution**:
1. Ensure MongoDB is running: `mongod --version`
2. Check MongoDB service status
3. Verify connection settings in `.env`
4. For MongoDB Atlas, use connection URI in settings

### CORS Errors

**Problem**: CORS policy blocking requests

**Solution**:
1. Add frontend URL to `CORS_ALLOWED_ORIGINS` in settings
2. Ensure corsheaders middleware is properly ordered
3. Check that django-cors-headers is installed

### JWT Token Issues

**Problem**: Token authentication failing

**Solution**:
1. Verify token format: `Bearer <token>`
2. Check token hasn't expired
3. Ensure SIMPLE_JWT settings are correct
4. Use refresh token to get new access token

### Migration Errors

**Problem**: Migrations failing

**Solution**:
1. Delete migration files (except `__init__.py`)
2. Delete MongoDB collections
3. Run `python manage.py makemigrations`
4. Run `python manage.py migrate`

## 📚 Additional Documentation

- [Backend Setup Guide](BACKEND_SETUP_GUIDE.md)
- [Frontend API Integration](FRONTEND_API_INTEGRATION.md)
- [Django Documentation](https://docs.djangoproject.com/)
- [DRF Documentation](https://www.django-rest-framework.org/)

## 🚀 Deployment

### Production Checklist

- [ ] Set `DEBUG=False`
- [ ] Configure proper `SECRET_KEY`
- [ ] Set up production database
- [ ] Configure static files serving
- [ ] Set up HTTPS
- [ ] Configure proper CORS settings
- [ ] Set up logging
- [ ] Configure email backend
- [ ] Set up monitoring
- [ ] Configure backup strategy

### Deployment Platforms

- **Railway**: Easy deployment with MongoDB support
- **Heroku**: Popular PaaS with MongoDB add-ons
- **DigitalOcean**: Full control with App Platform
- **AWS**: EC2 + MongoDB Atlas

## 🤝 Contributing

1. Create a feature branch
2. Make your changes
3. Write/update tests
4. Submit a pull request

## 📄 License

[Your License Here]

## 👥 Team

Elimu Space Development Team

## 📞 Support

For issues and questions:
- Email: support@elimuspace.com
- GitHub Issues: [Your Repo]

---

**Happy Coding! 🚀**


