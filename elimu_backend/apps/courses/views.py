"""
Views for Courses app
"""

from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import serializers as drf_serializers
from django.shortcuts import get_object_or_404
from elimu_backend.apps.courses.models import Category, Course, Lesson, Enrollment, Review
from elimu_backend.apps.courses.serializers import (
    CategorySerializer,
    CourseListSerializer,
    CourseDetailSerializer,
    LessonSerializer,
    EnrollmentSerializer,
    ReviewSerializer
)


class CategoryListView(generics.ListAPIView):
    """
    List all categories
    """
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = (permissions.AllowAny,)


class CourseListView(generics.ListAPIView):
    """
    List all published courses with filtering and search
    """
    serializer_class = CourseListSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'instructor__username']
    ordering_fields = ['created_at', 'enrolled_count', 'rating', 'price']
    
    def get_queryset(self):
        queryset = Course.objects.filter(is_published=True)
        
        # Filter by category
        category = self.request.query_params.get('category', None)
        if category:
            queryset = queryset.filter(category__slug=category)
        
        # Filter by level
        level = self.request.query_params.get('level', None)
        if level:
            queryset = queryset.filter(level=level)
        
        # Filter by language
        language = self.request.query_params.get('language', None)
        if language:
            queryset = queryset.filter(language=language)
        
        # Filter by free courses
        is_free = self.request.query_params.get('is_free', None)
        if is_free == 'true':
            queryset = queryset.filter(is_free=True)
        
        # Filter by featured
        is_featured = self.request.query_params.get('is_featured', None)
        if is_featured == 'true':
            queryset = queryset.filter(is_featured=True)
        
        return queryset


class CourseDetailView(generics.RetrieveAPIView):
    """
    Retrieve course details
    """
    queryset = Course.objects.filter(is_published=True)
    serializer_class = CourseDetailSerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'slug'


class EnrollCourseView(APIView):
    """
    Enroll in a course
    """
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, slug):
        course = get_object_or_404(Course, slug=slug, is_published=True)
        user = request.user
        
        # Check if already enrolled
        enrollment, created = Enrollment.objects.get_or_create(
            user=user,
            course=course
        )
        
        if created:
            # Update course enrolled count
            course.enrolled_count += 1
            course.save()
            
            return Response({
                'message': 'Successfully enrolled in course',
                'enrollment': EnrollmentSerializer(enrollment).data
            }, status=status.HTTP_201_CREATED)
        else:
            return Response({
                'message': 'Already enrolled in this course',
                'enrollment': EnrollmentSerializer(enrollment).data
            }, status=status.HTTP_200_OK)


class MyEnrollmentsView(generics.ListAPIView):
    """
    List user's enrollments
    """
    serializer_class = EnrollmentSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        return Enrollment.objects.filter(user=self.request.user)


class UpdateProgressView(APIView):
    """
    Update course progress
    """
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, slug):
        course = get_object_or_404(Course, slug=slug)
        enrollment = get_object_or_404(Enrollment, user=request.user, course=course)
        
        lesson_id = request.data.get('lesson_id')
        if lesson_id:
            # Add to completed lessons
            if lesson_id not in enrollment.completed_lessons:
                enrollment.completed_lessons.append(lesson_id)
                
                # Calculate progress
                total_lessons = course.lessons.count()
                completed = len(enrollment.completed_lessons)
                enrollment.progress = (completed / total_lessons * 100) if total_lessons > 0 else 0
                
                # Mark as completed if all lessons done
                if completed >= total_lessons:
                    enrollment.status = 'completed'
                    from django.utils import timezone
                    enrollment.completed_at = timezone.now()
                
                enrollment.save()
        
        return Response({
            'message': 'Progress updated',
            'enrollment': EnrollmentSerializer(enrollment).data
        })


class CourseReviewView(generics.ListCreateAPIView):
    """
    List and create course reviews
    """
    serializer_class = ReviewSerializer
    
    def get_permissions(self):
        if self.request.method == 'POST':
            return [permissions.IsAuthenticated()]
        return [permissions.AllowAny()]
    
    def get_queryset(self):
        course_slug = self.kwargs.get('slug')
        course = get_object_or_404(Course, slug=course_slug)
        return Review.objects.filter(course=course)
    
    def perform_create(self, serializer):
        course_slug = self.kwargs.get('slug')
        course = get_object_or_404(Course, slug=course_slug)
        
        # Check if user is enrolled
        if not Enrollment.objects.filter(user=self.request.user, course=course).exists():
            raise drf_serializers.ValidationError("You must be enrolled in this course to leave a review")
        
        # Create review
        review = serializer.save(user=self.request.user, course=course)
        
        # Update course rating
        reviews = Review.objects.filter(course=course)
        course.rating = sum(r.rating for r in reviews) / reviews.count()
        course.review_count = reviews.count()
        course.save()
