"""
URL configuration for elimu_backend project.
"""
from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import TokenRefreshView
from elimu_backend.apps.users import views as user_views
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi

# Swagger API Documentation
schema_view = get_schema_view(
    openapi.Info(
        title="Elimu Space API",
        default_version='v1',
        description="Complete API documentation for Elimu Space E-Learning Platform",
        terms_of_service="https://www.elimuspace.com/terms/",
        contact=openapi.Contact(email="api@elimuspace.com"),
        license=openapi.License(name="MIT License"),
    ),
    public=True,
    permission_classes=(permissions.AllowAny,),
)

urlpatterns = [
    # Admin
    path('admin/', admin.site.urls),
    
    # API Documentation (Swagger)
    re_path(r'^docs/$', schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    re_path(r'^redoc/$', schema_view.with_ui('redoc', cache_timeout=0), name='schema-redoc'),
    re_path(r'^swagger(?P<format>\.json|\.yaml)$', schema_view.without_ui(cache_timeout=0), name='schema-json'),
    
    # Authentication Endpoints (v1)
    path('api/v1/auth/register/', user_views.RegisterView.as_view(), name='register'),
    path('api/v1/auth/login/', user_views.CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/v1/auth/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/v1/auth/logout/', user_views.LogoutView.as_view(), name='logout'),
    
    # User Profile Endpoints (v1)
    path('api/v1/users/profile/', user_views.UserProfileView.as_view(), name='user-profile'),
    path('api/v1/users/profile/update/', user_views.UpdateProfileView.as_view(), name='update-profile'),
    path('api/v1/users/change-password/', user_views.ChangePasswordView.as_view(), name='change-password'),
    
    # Email Verification & Password Reset
    path('api/v1/auth/verify-email/', user_views.VerifyEmailView.as_view(), name='verify-email'),
    path('api/v1/auth/request-password-reset/', user_views.RequestPasswordResetView.as_view(), name='request-password-reset'),
    path('api/v1/auth/reset-password/', user_views.ResetPasswordView.as_view(), name='reset-password'),
    
    # Admin User Management
    path('api/v1/users/', user_views.UserListView.as_view(), name='user-list'),
    path('api/v1/users/<int:pk>/', user_views.UserDetailView.as_view(), name='user-detail'),
    
    # Courses URLs (v1)
    path('api/v1/courses/', include('elimu_backend.apps.courses.urls')),
    
    # Dashboard URLs (v1)
    path('api/v1/dashboard/', include('elimu_backend.apps.dashboard.urls')),
    
    # Feedback & Opportunities URLs (v1)
    path('api/v1/feedback/', include('elimu_backend.apps.feedback.urls')),
]

# Serve media files in development
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
