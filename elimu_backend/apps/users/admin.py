from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth import get_user_model
from elimu_backend.apps.users.models import (
    UserProfile,
    StudentProfile,
    InstructorProfile,
    AdminProfile
)

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


@admin.register(StudentProfile)
class StudentProfileAdmin(admin.ModelAdmin):
    """
    Admin for StudentProfile model
    """
    list_display = ('user', 'total_courses_enrolled', 'courses_completed', 'current_streak_days', 'total_certificates')
    list_filter = ('enrollment_date', 'preferred_learning_time')
    search_fields = ('user__username', 'user__email', 'student_id')
    readonly_fields = ('created_at', 'updated_at', 'enrollment_date')
    
    fieldsets = (
        ('User', {'fields': ('user',)}),
        ('Academic', {'fields': ('student_id', 'enrollment_date')}),
        ('Learning Stats', {'fields': ('total_courses_enrolled', 'courses_completed', 'total_learning_hours')}),
        ('Streak', {'fields': ('current_streak_days', 'longest_streak_days')}),
        ('Preferences', {'fields': ('preferred_learning_time', 'preferred_categories')}),
        ('Achievements', {'fields': ('total_certificates', 'badges_earned')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )


@admin.register(InstructorProfile)
class InstructorProfileAdmin(admin.ModelAdmin):
    """
    Admin for InstructorProfile model
    """
    list_display = ('user', 'title', 'total_courses_created', 'total_students_taught', 'average_rating', 'is_verified_instructor')
    list_filter = ('is_verified_instructor', 'payment_method', 'created_at')
    search_fields = ('user__username', 'user__email', 'title', 'expertise_areas')
    readonly_fields = ('created_at', 'updated_at', 'verified_at')
    
    fieldsets = (
        ('User', {'fields': ('user',)}),
        ('Professional', {'fields': ('title', 'expertise_areas', 'years_of_experience', 'certifications')}),
        ('Teaching Stats', {'fields': ('total_courses_created', 'total_students_taught', 'average_rating', 'total_reviews')}),
        ('Earnings', {'fields': ('total_earnings', 'pending_earnings', 'lifetime_earnings')}),
        ('Payment', {'fields': ('bank_account', 'mobile_money', 'payment_method')}),
        ('Verification', {'fields': ('is_verified_instructor', 'verification_documents', 'verified_at')}),
        ('Social', {'fields': ('youtube_channel', 'twitter_handle')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )


@admin.register(AdminProfile)
class AdminProfileAdmin(admin.ModelAdmin):
    """
    Admin for AdminProfile model
    """
    list_display = ('user', 'admin_level', 'department', 'can_approve_courses', 'can_manage_users', 'last_active')
    list_filter = ('admin_level', 'can_approve_courses', 'can_manage_users', 'can_manage_payments')
    search_fields = ('user__username', 'user__email', 'department')
    readonly_fields = ('created_at', 'updated_at', 'last_active')
    
    fieldsets = (
        ('User', {'fields': ('user',)}),
        ('Admin Info', {'fields': ('admin_level', 'department')}),
        ('Permissions', {'fields': ('can_approve_courses', 'can_manage_users', 'can_view_analytics', 'can_manage_payments')}),
        ('Activity', {'fields': ('last_active', 'total_actions')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )
