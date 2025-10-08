"""
URL configuration for Courses app
"""

from django.urls import path
from elimu_backend.apps.courses import views

app_name = 'courses'

urlpatterns = [
    # Categories
    path('categories/', views.CategoryListView.as_view(), name='category-list'),
    
    # Courses
    path('', views.CourseListView.as_view(), name='course-list'),
    path('<slug:slug>/', views.CourseDetailView.as_view(), name='course-detail'),
    
    # Enrollment
    path('<slug:slug>/enroll/', views.EnrollCourseView.as_view(), name='enroll-course'),
    path('<slug:slug>/progress/', views.UpdateProgressView.as_view(), name='update-progress'),
    
    # Reviews
    path('<slug:slug>/reviews/', views.CourseReviewView.as_view(), name='course-reviews'),
    
    # My Enrollments
    path('my/enrollments/', views.MyEnrollmentsView.as_view(), name='my-enrollments'),
]

