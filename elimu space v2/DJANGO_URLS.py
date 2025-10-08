"""
Main URL configuration for elimu_backend project
Copy this content to elimu_backend/urls.py after creating the project
"""

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from users import views as user_views

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # Authentication Endpoints
    path('api/auth/register/', user_views.RegisterView.as_view(), name='register'),
    path('api/auth/login/', user_views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/auth/logout/', user_views.LogoutView.as_view(), name='logout'),
    
    # User Profile Endpoints
    path('api/users/profile/', user_views.UserProfileView.as_view(), name='user-profile'),
    path('api/users/profile/update/', user_views.UpdateProfileView.as_view(), name='update-profile'),
    path('api/users/change-password/', user_views.ChangePasswordView.as_view(), name='change-password'),
    
    # Email Verification & Password Reset
    path('api/auth/verify-email/', user_views.VerifyEmailView.as_view(), name='verify-email'),
    path('api/auth/request-password-reset/', user_views.RequestPasswordResetView.as_view(), name='request-password-reset'),
    path('api/auth/reset-password/', user_views.ResetPasswordView.as_view(), name='reset-password'),
    
    # Admin User Management
    path('api/users/', user_views.UserListView.as_view(), name='user-list'),
    path('api/users/<int:pk>/', user_views.UserDetailView.as_view(), name='user-detail'),
    
    # Future app URLs (uncomment when ready)
    # path('api/courses/', include('courses.urls')),
    # path('api/dashboard/', include('dashboard.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)

