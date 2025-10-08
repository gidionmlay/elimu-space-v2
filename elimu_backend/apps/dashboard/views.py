"""
Views for Dashboard app
"""

from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.db.models import Count, Sum
from elimu_backend.apps.courses.models import Enrollment, Course, Review
from elimu_backend.apps.dashboard.models import UserActivity, Notification, Achievement
from elimu_backend.apps.dashboard.serializers import (
    UserActivitySerializer,
    NotificationSerializer,
    AchievementSerializer,
    DashboardStatsSerializer
)


class DashboardStatsView(APIView):
    """
    Get role-based dashboard statistics
    Returns different data based on user role (student, instructor, admin)
    """
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request):
        user = request.user
        
        # Route to appropriate dashboard based on role
        if user.role == 'student':
            return self.get_student_dashboard(user)
        elif user.role == 'instructor':
            return self.get_instructor_dashboard(user)
        elif user.role == 'admin':
            return self.get_admin_dashboard(user)
        else:
            return Response({'error': 'Invalid user role'}, status=status.HTTP_400_BAD_REQUEST)
    
    def get_student_dashboard(self, user):
        """Student Dashboard - enrolled courses, progress, certificates"""
        enrollments = Enrollment.objects.filter(user=user)
        
        # Get student profile if exists
        student_profile = getattr(user, 'student_profile', None)
        
        stats = {
            'role': 'student',
            'total_courses': enrollments.count(),
            'completed_courses': enrollments.filter(status='completed').count(),
            'in_progress_courses': enrollments.filter(status='active').count(),
            'total_learning_time': student_profile.total_learning_hours if student_profile else 0,
            'achievements_count': Achievement.objects.filter(user=user).count(),
            'current_streak': student_profile.current_streak_days if student_profile else 0,
            'longest_streak': student_profile.longest_streak_days if student_profile else 0,
            'total_certificates': student_profile.total_certificates if student_profile else 0,
            'unread_notifications': Notification.objects.filter(user=user, is_read=False).count(),
        }
        
        return Response(stats)
    
    def get_instructor_dashboard(self, user):
        """Instructor Dashboard - uploaded courses, earnings, analytics"""
        # Get instructor's courses
        instructor_courses = Course.objects.filter(instructor=user)
        
        # Get instructor profile if exists
        instructor_profile = getattr(user, 'instructor_profile', None)
        
        # Calculate total enrollments across all courses
        total_enrollments = sum(course.enrolled_count for course in instructor_courses)
        
        stats = {
            'role': 'instructor',
            'total_courses_created': instructor_courses.count(),
            'published_courses': instructor_courses.filter(is_published=True).count(),
            'draft_courses': instructor_courses.filter(is_published=False).count(),
            'total_students': total_enrollments,
            'average_rating': instructor_profile.average_rating if instructor_profile else 0,
            'total_reviews': instructor_profile.total_reviews if instructor_profile else 0,
            'total_earnings': float(instructor_profile.total_earnings) if instructor_profile else 0,
            'pending_earnings': float(instructor_profile.pending_earnings) if instructor_profile else 0,
            'is_verified': instructor_profile.is_verified_instructor if instructor_profile else False,
            'unread_notifications': Notification.objects.filter(user=user, is_read=False).count(),
        }
        
        return Response(stats)
    
    def get_admin_dashboard(self, user):
        """Admin Dashboard - user management, course approvals, reports"""
        from django.contrib.auth import get_user_model
        User = get_user_model()
        
        # Get admin profile if exists
        admin_profile = getattr(user, 'admin_profile', None)
        
        stats = {
            'role': 'admin',
            'total_users': User.objects.count(),
            'total_students': User.objects.filter(role='student').count(),
            'total_instructors': User.objects.filter(role='instructor').count(),
            'total_courses': Course.objects.count(),
            'published_courses': Course.objects.filter(is_published=True).count(),
            'pending_courses': Course.objects.filter(is_published=False).count(),
            'total_enrollments': Enrollment.objects.count(),
            'active_enrollments': Enrollment.objects.filter(status='active').count(),
            'completed_enrollments': Enrollment.objects.filter(status='completed').count(),
            'total_reviews': Review.objects.count(),
            'admin_level': admin_profile.admin_level if admin_profile else 'moderator',
            'can_approve_courses': admin_profile.can_approve_courses if admin_profile else False,
            'can_manage_users': admin_profile.can_manage_users if admin_profile else False,
        }
        
        return Response(stats)


class MyNotificationsView(generics.ListAPIView):
    """
    List user's notifications
    """
    serializer_class = NotificationSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        return Notification.objects.filter(user=self.request.user)


class MarkNotificationReadView(APIView):
    """
    Mark notification as read
    """
    permission_classes = (permissions.IsAuthenticated,)
    
    def post(self, request, pk):
        try:
            notification = Notification.objects.get(pk=pk, user=request.user)
            notification.is_read = True
            notification.save()
            return Response({'message': 'Notification marked as read'})
        except Notification.DoesNotExist:
            return Response(
                {'error': 'Notification not found'},
                status=status.HTTP_404_NOT_FOUND
            )


class MyAchievementsView(generics.ListAPIView):
    """
    List user's achievements
    """
    serializer_class = AchievementSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        return Achievement.objects.filter(user=self.request.user)


class MyActivityView(generics.ListAPIView):
    """
    List user's activity history
    """
    serializer_class = UserActivitySerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        return UserActivity.objects.filter(user=self.request.user)[:50]  # Last 50 activities


class RecentCoursesView(APIView):
    """
    Get user's recently accessed courses
    """
    permission_classes = (permissions.IsAuthenticated,)
    
    def get(self, request):
        from elimu_backend.apps.courses.serializers import CourseListSerializer
        
        # Get user's enrollments ordered by last access
        enrollments = Enrollment.objects.filter(
            user=request.user
        ).order_by('-last_accessed')[:5]
        
        courses = [e.course for e in enrollments]
        serializer = CourseListSerializer(courses, many=True, context={'request': request})
        
        return Response(serializer.data)
