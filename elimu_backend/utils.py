"""
Utility functions for elimu_backend
"""

import random
import string
from django.core.mail import send_mail
from django.conf import settings


def generate_random_code(length=6):
    """
    Generate a random alphanumeric code
    """
    return ''.join(random.choices(string.ascii_uppercase + string.digits, k=length))


def send_verification_email(user, verification_link):
    """
    Send email verification email to user
    """
    subject = 'Verify your Elimu Space account'
    message = f'''
    Hello {user.get_full_name()},
    
    Thank you for registering with Elimu Space!
    
    Please click the link below to verify your email address:
    {verification_link}
    
    If you didn't create an account, please ignore this email.
    
    Best regards,
    The Elimu Space Team
    '''
    
    send_mail(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
    )


def send_password_reset_email(user, reset_link):
    """
    Send password reset email to user
    """
    subject = 'Reset your Elimu Space password'
    message = f'''
    Hello {user.get_full_name()},
    
    You requested to reset your password for your Elimu Space account.
    
    Please click the link below to reset your password:
    {reset_link}
    
    This link will expire in 24 hours.
    
    If you didn't request this, please ignore this email.
    
    Best regards,
    The Elimu Space Team
    '''
    
    send_mail(
        subject,
        message,
        settings.EMAIL_HOST_USER,
        [user.email],
        fail_silently=False,
    )


def get_client_ip(request):
    """
    Get client IP address from request
    """
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0]
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip

