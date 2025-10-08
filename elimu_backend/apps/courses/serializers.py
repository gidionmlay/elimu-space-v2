"""
Serializers for Courses app
"""

from rest_framework import serializers
from django.contrib.auth import get_user_model
from elimu_backend.apps.courses.models import Category, Course, Lesson, Enrollment, Review

User = get_user_model()


class CategorySerializer(serializers.ModelSerializer):
    """
    Serializer for Category model
    """
    course_count = serializers.SerializerMethodField()
    
    class Meta:
        model = Category
        fields = ('id', 'name', 'slug', 'description', 'icon', 'course_count', 'created_at')
        read_only_fields = ('id', 'slug', 'created_at')
    
    def get_course_count(self, obj):
        return obj.courses.filter(is_published=True).count()


class LessonSerializer(serializers.ModelSerializer):
    """
    Serializer for Lesson model
    """
    
    class Meta:
        model = Lesson
        fields = (
            'id', 'title', 'description', 'order', 'video_url',
            'duration_minutes', 'content', 'attachments', 'is_preview',
            'is_published', 'created_at'
        )
        read_only_fields = ('id', 'created_at')


class CourseListSerializer(serializers.ModelSerializer):
    """
    Serializer for Course list view (minimal data)
    """
    category_name = serializers.CharField(source='category.name', read_only=True)
    instructor_name = serializers.CharField(source='instructor.get_full_name', read_only=True)
    is_enrolled = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = (
            'id', 'title', 'slug', 'short_description', 'category_name',
            'instructor_name', 'level', 'language', 'thumbnail', 'price',
            'original_price', 'is_free', 'is_premium', 'duration',
            'enrolled_count', 'rating', 'review_count', 'is_enrolled'
        )
    
    def get_is_enrolled(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Enrollment.objects.filter(user=request.user, course=obj).exists()
        return False


class CourseDetailSerializer(serializers.ModelSerializer):
    """
    Serializer for Course detail view (complete data)
    """
    category = CategorySerializer(read_only=True)
    instructor = serializers.SerializerMethodField()
    lessons = LessonSerializer(many=True, read_only=True)
    is_enrolled = serializers.SerializerMethodField()
    user_progress = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = (
            'id', 'title', 'slug', 'description', 'short_description',
            'category', 'instructor', 'level', 'language', 'thumbnail',
            'intro_video', 'price', 'original_price', 'is_free', 'is_premium',
            'duration', 'total_lectures', 'total_duration_minutes',
            'enrolled_count', 'rating', 'review_count', 'requirements',
            'what_you_learn', 'lessons', 'is_enrolled', 'user_progress',
            'created_at', 'updated_at', 'published_at'
        )
    
    def get_instructor(self, obj):
        return {
            'id': obj.instructor.id,
            'name': obj.instructor.get_full_name(),
            'username': obj.instructor.username,
            'bio': obj.instructor.bio,
            'profile_image': obj.instructor.profile_image.url if obj.instructor.profile_image else None
        }
    
    def get_is_enrolled(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return Enrollment.objects.filter(user=request.user, course=obj).exists()
        return False
    
    def get_user_progress(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            enrollment = Enrollment.objects.filter(user=request.user, course=obj).first()
            if enrollment:
                return {
                    'progress': float(enrollment.progress),
                    'status': enrollment.status,
                    'completed_lessons': enrollment.completed_lessons
                }
        return None


class EnrollmentSerializer(serializers.ModelSerializer):
    """
    Serializer for Enrollment model
    """
    course = CourseListSerializer(read_only=True)
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    
    class Meta:
        model = Enrollment
        fields = (
            'id', 'user', 'user_name', 'course', 'status', 'progress',
            'completed_lessons', 'enrolled_at', 'completed_at', 'last_accessed'
        )
        read_only_fields = ('id', 'enrolled_at', 'last_accessed')


class ReviewSerializer(serializers.ModelSerializer):
    """
    Serializer for Review model
    """
    user_name = serializers.CharField(source='user.get_full_name', read_only=True)
    user_profile_image = serializers.SerializerMethodField()
    
    class Meta:
        model = Review
        fields = (
            'id', 'user', 'user_name', 'user_profile_image', 'course',
            'rating', 'comment', 'created_at', 'updated_at'
        )
        read_only_fields = ('id', 'user', 'created_at', 'updated_at')
    
    def get_user_profile_image(self, obj):
        if obj.user.profile_image:
            return obj.user.profile_image.url
        return None

