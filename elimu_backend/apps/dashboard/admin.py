"""
Admin configuration for Dashboard app
"""

from django.contrib import admin
from elimu_backend.apps.dashboard.models import UserActivity, Notification, Achievement


@admin.register(UserActivity)
class UserActivityAdmin(admin.ModelAdmin):
    """
    Admin for UserActivity model
    """
    list_display = ('user', 'action', 'course', 'ip_address', 'timestamp')
    list_filter = ('action', 'timestamp')
    search_fields = ('user__username', 'user__email', 'course__title')
    readonly_fields = ('timestamp',)
    date_hierarchy = 'timestamp'
    
    fieldsets = (
        ('Activity Info', {
            'fields': ('user', 'action', 'course')
        }),
        ('Metadata', {
            'fields': ('metadata', 'ip_address')
        }),
        ('Timestamp', {
            'fields': ('timestamp',)
        }),
    )


@admin.register(Notification)
class NotificationAdmin(admin.ModelAdmin):
    """
    Admin for Notification model
    """
    list_display = ('user', 'notification_type', 'title', 'is_read', 'created_at')
    list_filter = ('notification_type', 'is_read', 'created_at')
    search_fields = ('user__username', 'title', 'message')
    readonly_fields = ('created_at',)
    date_hierarchy = 'created_at'
    
    fieldsets = (
        ('Notification Info', {
            'fields': ('user', 'notification_type', 'title', 'message', 'link')
        }),
        ('Status', {
            'fields': ('is_read',)
        }),
        ('Timestamp', {
            'fields': ('created_at',)
        }),
    )


@admin.register(Achievement)
class AchievementAdmin(admin.ModelAdmin):
    """
    Admin for Achievement model
    """
    list_display = ('user', 'title', 'badge_icon', 'earned_at')
    list_filter = ('earned_at',)
    search_fields = ('user__username', 'title', 'description')
    readonly_fields = ('earned_at',)
    date_hierarchy = 'earned_at'
    
    fieldsets = (
        ('Achievement Info', {
            'fields': ('user', 'title', 'description', 'badge_icon')
        }),
        ('Timestamp', {
            'fields': ('earned_at',)
        }),
    )
