"""
URL configuration for Dashboard app
"""

from django.urls import path
from elimu_backend.apps.dashboard import views

app_name = 'dashboard'

urlpatterns = [
    # Dashboard Stats
    path('stats/', views.DashboardStatsView.as_view(), name='dashboard-stats'),
    
    # Notifications
    path('notifications/', views.MyNotificationsView.as_view(), name='my-notifications'),
    path('notifications/<int:pk>/read/', views.MarkNotificationReadView.as_view(), name='mark-notification-read'),
    
    # Achievements
    path('achievements/', views.MyAchievementsView.as_view(), name='my-achievements'),
    
    # Activity
    path('activity/', views.MyActivityView.as_view(), name='my-activity'),
    
    # Recent Courses
    path('recent-courses/', views.RecentCoursesView.as_view(), name='recent-courses'),
]

