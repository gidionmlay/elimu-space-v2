from django.db import models
from django.contrib.auth import get_user_model
from elimu_backend.apps.courses.models import Course

User = get_user_model()


class UserActivity(models.Model):
    """
    Track user activity for analytics
    """
    ACTION_CHOICES = (
        ('login', 'Login'),
        ('course_view', 'Course View'),
        ('lesson_complete', 'Lesson Complete'),
        ('course_enroll', 'Course Enroll'),
        ('review_submit', 'Review Submit'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='activities')
    action = models.CharField(max_length=50, choices=ACTION_CHOICES)
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True)
    metadata = models.JSONField(default=dict, blank=True)
    ip_address = models.GenericIPAddressField(null=True, blank=True)
    timestamp = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'User Activity'
        verbose_name_plural = 'User Activities'
        ordering = ['-timestamp']

    def __str__(self):
        return f"{self.user.username} - {self.action} at {self.timestamp}"


class Notification(models.Model):
    """
    User notifications
    """
    TYPE_CHOICES = (
        ('course_update', 'Course Update'),
        ('new_lesson', 'New Lesson'),
        ('announcement', 'Announcement'),
        ('achievement', 'Achievement'),
        ('reminder', 'Reminder'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='notifications')
    notification_type = models.CharField(max_length=50, choices=TYPE_CHOICES)
    title = models.CharField(max_length=200)
    message = models.TextField()
    link = models.URLField(blank=True, null=True)
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Notification'
        verbose_name_plural = 'Notifications'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.title}"


class Achievement(models.Model):
    """
    User achievements and badges
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='achievements')
    title = models.CharField(max_length=200)
    description = models.TextField()
    badge_icon = models.CharField(max_length=50, help_text='FontAwesome icon class')
    earned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        verbose_name = 'Achievement'
        verbose_name_plural = 'Achievements'
        ordering = ['-earned_at']

    def __str__(self):
        return f"{self.user.username} - {self.title}"
