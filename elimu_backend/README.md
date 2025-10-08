# Elimu Space Backend

## 🚀 Quick Start

### Start Development Server
```bash
cd elimu_backend
python manage.py runserver
```

Server will be available at: **http://localhost:8000**

### Admin Panel
Access at: **http://localhost:8000/admin/**

---

## 📁 Folder Structure

```
elimu_backend/
├── elimu_backend/          # Core Django project
│   ├── settings.py         # ✅ Configuration
│   ├── urls.py            # ✅ Main URL routing
│   ├── utils.py           # ✅ Utility functions
│   ├── exceptions.py      # ✅ Error handlers
│   └── middleware.py      # ✅ Custom middleware
│
├── apps/                  # All Django apps
│   ├── users/            # 👤 User Management
│   │   ├── models.py     # User & UserProfile
│   │   ├── views.py      # API endpoints
│   │   ├── serializers.py # DRF serializers
│   │   ├── admin.py      # Admin config
│   │   ├── permissions.py # Custom permissions
│   │   ├── signals.py    # Auto-create profiles
│   │   └── tests.py      # Unit tests
│   │
│   ├── courses/          # 📚 Course Management
│   │   ├── models.py     # Course, Lesson, Enrollment
│   │   ├── views.py      # Course API endpoints
│   │   ├── serializers.py # Course serializers
│   │   ├── admin.py      # Course admin
│   │   └── urls.py       # Course routes
│   │
│   └── dashboard/        # 📊 Dashboard & Analytics
│       ├── models.py     # Activity, Notifications
│       ├── views.py      # Dashboard endpoints
│       ├── serializers.py # Dashboard serializers
│       ├── admin.py      # Dashboard admin
│       └── urls.py       # Dashboard routes
│
├── manage.py             # Django CLI
├── db.sqlite3            # SQLite database
└── requirements.txt      # Python dependencies
```

---

## 🔗 API Endpoints

### Authentication
- `POST /api/auth/register/` - Register
- `POST /api/auth/login/` - Login
- `POST /api/auth/refresh/` - Refresh token
- `POST /api/auth/logout/` - Logout

### Users
- `GET /api/users/profile/` - Get profile
- `PUT /api/users/profile/update/` - Update profile
- `POST /api/users/change-password/` - Change password

### Courses
- `GET /api/courses/` - List courses
- `GET /api/courses/<slug>/` - Course details
- `POST /api/courses/<slug>/enroll/` - Enroll
- `POST /api/courses/<slug>/progress/` - Update progress

### Dashboard
- `GET /api/dashboard/stats/` - User stats
- `GET /api/dashboard/notifications/` - Notifications
- `GET /api/dashboard/achievements/` - Achievements

---

## 🛠️ Common Commands

```bash
# Create migrations
python manage.py makemigrations

# Apply migrations
python manage.py migrate

# Create superuser
python manage.py createsuperuser

# Run development server
python manage.py runserver

# Run tests
python manage.py test

# Access shell
python manage.py shell
```

---

## 📦 Dependencies

See `requirements.txt` for all dependencies.

Install with:
```bash
pip install -r requirements.txt
```

---

## ⚙️ Configuration

- **Database**: SQLite (configured in settings.py)
- **JWT**: Access tokens expire in 60 minutes
- **CORS**: Enabled for localhost:5173 (React frontend)
- **Timezone**: Africa/Dar_es_Salaam

---

## 🧪 Testing

Run all tests:
```bash
python manage.py test
```

Run specific app tests:
```bash
python manage.py test apps.users
python manage.py test apps.courses
```

---

## 📚 Documentation

For complete API documentation, see:
- `../API_DOCUMENTATION.md`
- `../FRONTEND_API_INTEGRATION.md`

---

**Backend is ready to use! 🎉**

