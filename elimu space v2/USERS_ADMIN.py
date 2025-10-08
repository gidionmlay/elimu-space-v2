"""
User admin configuration for elimu_backend
Copy this content to users/admin.py after creating the app
"""

from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from .models import UserProfile

User = get_user_model()


@admin.register(User)
class UserAdmin(BaseUserAdmin):
    """
    Custom admin for User model
    """
    list_display = ('username', 'email', 'role', 'is_verified', 'is_staff', 'created_at')
    list_filter = ('role', 'is_verified', 'is_staff', 'is_superuser', 'created_at')
    search_fields = ('username', 'email', 'first_name', 'last_name')
    ordering = ('-created_at',)
    
    fieldsets = (
        (None, {'fields': ('username', 'password')}),
        ('Personal Info', {'fields': ('first_name', 'last_name', 'email', 'phone_number', 'country')}),
        ('Profile', {'fields': ('role', 'bio', 'profile_image')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_verified', 'groups', 'user_permissions')}),
        ('Important Dates', {'fields': ('last_login', 'date_joined')}),
    )
    
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('username', 'email', 'password1', 'password2', 'role'),
        }),
    )
    
    readonly_fields = ('created_at', 'updated_at', 'last_login')


@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    """
    Admin for UserProfile model
    """
    list_display = ('user', 'occupation', 'education_level', 'email_notifications', 'created_at')
    list_filter = ('email_notifications', 'course_updates', 'marketing_emails', 'created_at')
    search_fields = ('user__username', 'user__email', 'occupation', 'institution')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('User', {'fields': ('user',)}),
        ('Education', {'fields': ('education_level', 'institution')}),
        ('Professional', {'fields': ('occupation', 'linkedin_url', 'github_url', 'website')}),
        ('Learning', {'fields': ('learning_goals', 'interests')}),
        ('Notifications', {'fields': ('email_notifications', 'course_updates', 'marketing_emails')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )

