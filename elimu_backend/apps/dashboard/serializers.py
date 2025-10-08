"""
Serializers for Dashboard app
"""

from rest_framework import serializers
from elimu_backend.apps.dashboard.models import UserActivity, Notification, Achievement


class UserActivitySerializer(serializers.ModelSerializer):
    """
    Serializer for UserActivity model
    """
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)
    
    class Meta:
        model = UserActivity
        fields = (
            'id', 'user', 'user_name', 'action', 'course', 'course_title',
            'metadata', 'ip_address', 'timestamp'
        )
        read_only_fields = ('id', 'timestamp')


class NotificationSerializer(serializers.ModelSerializer):
    """
    Serializer for Notification model
    """
    
    class Meta:
        model = Notification
        fields = (
            'id', 'notification_type', 'title', 'message', 'link',
            'is_read', 'created_at'
        )
        read_only_fields = ('id', 'created_at')


class AchievementSerializer(serializers.ModelSerializer):
    """
    Serializer for Achievement model
    """
    
    class Meta:
        model = Achievement
        fields = ('id', 'title', 'description', 'badge_icon', 'earned_at')
        read_only_fields = ('id', 'earned_at')


class DashboardStatsSerializer(serializers.Serializer):
    """
    Serializer for dashboard statistics
    """
    total_courses = serializers.IntegerField()
    completed_courses = serializers.IntegerField()
    in_progress_courses = serializers.IntegerField()
    total_learning_time = serializers.IntegerField()
    achievements_count = serializers.IntegerField()
    current_streak = serializers.IntegerField()

