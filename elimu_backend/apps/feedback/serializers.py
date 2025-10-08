"""
Serializers for Feedback app
"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
from elimu_backend.apps.feedback.models import Testimonial, Opportunity, FeedbackSubmission

User = get_user_model()


class TestimonialSerializer(serializers.ModelSerializer):
    """
    Serializer for Testimonial model
    """
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    user_profile_image = serializers.SerializerMethodField()
    course_title = serializers.CharField(source='course.title', read_only=True)
    
    class Meta:
        model = Testimonial
        fields = (
            'id', 'user', 'user_name', 'user_profile_image', 'course', 'course_title',
            'title', 'content', 'rating', 'image', 'video_url', 'status',
            'is_featured', 'created_at'
        )
        read_only_fields = ('id', 'user', 'status', 'approved_by', 'approved_at', 'created_at')
    
    def get_user_profile_image(self, obj):
        if obj.user.profile_image:
            return obj.user.profile_image.url
        return None


class OpportunitySerializer(serializers.ModelSerializer):
    """
    Serializer for Opportunity model
    """
    posted_by_name = serializers.CharField(source='posted_by.get_full_name', read_only=True)
    days_remaining = serializers.SerializerMethodField()
    
    class Meta:
        model = Opportunity
        fields = (
            'id', 'title', 'slug', 'description', 'opportunity_type',
            'organization', 'organization_logo', 'location', 'is_remote',
            'requirements', 'benefits', 'application_url', 'deadline',
            'status', 'is_featured', 'views_count', 'applications_count',
            'posted_by', 'posted_by_name', 'days_remaining', 'created_at'
        )
        read_only_fields = ('id', 'slug', 'views_count', 'applications_count', 'posted_by', 'created_at')
    
    def get_days_remaining(self, obj):
        from django.utils import timezone
        if obj.deadline > timezone.now():
            delta = obj.deadline - timezone.now()
            return delta.days
        return 0


class FeedbackSubmissionSerializer(serializers.ModelSerializer):
    """
    Serializer for FeedbackSubmission model
    """
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    responded_by_name = serializers.CharField(source='responded_by.get_full_name', read_only=True)
    
    class Meta:
        model = FeedbackSubmission
        fields = (
            'id', 'user', 'user_name', 'category', 'subject', 'message',
            'screenshot', 'is_resolved', 'admin_response', 'responded_by',
            'responded_by_name', 'responded_at', 'created_at'
        )
        read_only_fields = ('id', 'user', 'is_resolved', 'admin_response', 'responded_by', 'responded_at', 'created_at')

