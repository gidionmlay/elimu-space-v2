"""
Django signals for User app
Automatically create UserProfile when User is created
"""

from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth import get_user_model
from elimu_backend.apps.users.models import (
    UserProfile,
    StudentProfile,
    InstructorProfile,
    AdminProfile
)

User = get_user_model()


@receiver(post_save, sender=User)
def create_user_profile(sender, instance, created, **kwargs):
    """
    Create UserProfile and role-specific profile when a new User is created
    """
    if created:
        # Create base UserProfile
        UserProfile.objects.get_or_create(user=instance)
        
        # Create role-specific profile
        if instance.role == 'student':
            StudentProfile.objects.get_or_create(user=instance)
        elif instance.role == 'instructor':
            InstructorProfile.objects.get_or_create(user=instance)
        elif instance.role == 'admin':
            AdminProfile.objects.get_or_create(user=instance)


@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    """
    Save the UserProfile when the User is saved
    """
    if hasattr(instance, 'profile'):
        instance.profile.save()

