"""
User models for elimu_backend
Copy this content to users/models.py after creating the app
"""

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils import timezone

class User(AbstractUser):
    """
    Custom User model extending Django's AbstractUser
    """
    ROLE_CHOICES = (
        ('student', 'Student'),
        ('instructor', 'Instructor'),
        ('partner', 'Partner'),
        ('admin', 'Admin'),
    )
    
    # User profile fields
    role = models.CharField(
        max_length=20, 
        choices=ROLE_CHOICES, 
        default='student',
        help_text='User role in the platform'
    )
    bio = models.TextField(
        blank=True, 
        null=True,
        help_text='User biography or description'
    )
    profile_image = models.ImageField(
        upload_to='profiles/', 
        blank=True, 
        null=True,
        help_text='User profile picture'
    )
    phone_number = models.CharField(
        max_length=20,
        blank=True,
        null=True,
        help_text='Contact phone number'
    )
    country = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text='User country'
    )
    
    # Additional tracking fields
    is_verified = models.BooleanField(
        default=False,
        help_text='Email verification status'
    )
    created_at = models.DateTimeField(
        auto_now_add=True,
        help_text='Account creation timestamp'
    )
    updated_at = models.DateTimeField(
        auto_now=True,
        help_text='Last profile update timestamp'
    )
    last_login_ip = models.GenericIPAddressField(
        null=True,
        blank=True,
        help_text='Last login IP address'
    )

    class Meta:
        verbose_name = 'User'
        verbose_name_plural = 'Users'
        ordering = ['-created_at']
        indexes = [
            models.Index(fields=['email']),
            models.Index(fields=['username']),
            models.Index(fields=['role']),
        ]

    def __str__(self):
        return f"{self.username} ({self.get_role_display()})"

    def get_full_name(self):
        """
        Return the first_name plus the last_name, with a space in between.
        """
        full_name = f"{self.first_name} {self.last_name}".strip()
        return full_name or self.username

    @property
    def is_student(self):
        return self.role == 'student'

    @property
    def is_instructor(self):
        return self.role == 'instructor'

    @property
    def is_partner(self):
        return self.role == 'partner'


class UserProfile(models.Model):
    """
    Extended user profile information
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='profile'
    )
    
    # Education information
    education_level = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text='Highest education level'
    )
    institution = models.CharField(
        max_length=200,
        blank=True,
        null=True,
        help_text='Current or last institution'
    )
    
    # Professional information
    occupation = models.CharField(
        max_length=100,
        blank=True,
        null=True,
        help_text='Current occupation'
    )
    linkedin_url = models.URLField(
        blank=True,
        null=True,
        help_text='LinkedIn profile URL'
    )
    github_url = models.URLField(
        blank=True,
        null=True,
        help_text='GitHub profile URL'
    )
    website = models.URLField(
        blank=True,
        null=True,
        help_text='Personal website'
    )
    
    # Learning preferences
    learning_goals = models.TextField(
        blank=True,
        null=True,
        help_text='User learning goals'
    )
    interests = models.JSONField(
        default=list,
        blank=True,
        help_text='Areas of interest'
    )
    
    # Notifications preferences
    email_notifications = models.BooleanField(
        default=True,
        help_text='Receive email notifications'
    )
    course_updates = models.BooleanField(
        default=True,
        help_text='Receive course update notifications'
    )
    marketing_emails = models.BooleanField(
        default=False,
        help_text='Receive marketing emails'
    )
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'User Profile'
        verbose_name_plural = 'User Profiles'

    def __str__(self):
        return f"Profile of {self.user.username}"

