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


class StudentProfile(models.Model):
    """
    Extended profile for students
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='student_profile',
        limit_choices_to={'role': 'student'}
    )
    
    # Academic Information
    student_id = models.CharField(max_length=50, blank=True, null=True, unique=True)
    enrollment_date = models.DateField(auto_now_add=True)
    
    # Learning Stats
    total_courses_enrolled = models.IntegerField(default=0)
    courses_completed = models.IntegerField(default=0)
    total_learning_hours = models.DecimalField(max_digits=10, decimal_places=2, default=0)
    current_streak_days = models.IntegerField(default=0)
    longest_streak_days = models.IntegerField(default=0)
    
    # Preferences
    preferred_learning_time = models.CharField(
        max_length=20,
        choices=(
            ('morning', 'Morning'),
            ('afternoon', 'Afternoon'),
            ('evening', 'Evening'),
            ('night', 'Night'),
        ),
        blank=True,
        null=True
    )
    preferred_categories = models.JSONField(default=list, blank=True)
    
    # Achievements
    total_certificates = models.IntegerField(default=0)
    badges_earned = models.JSONField(default=list, blank=True)
    
    # Social
    study_buddy_requests = models.JSONField(default=list, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Student Profile'
        verbose_name_plural = 'Student Profiles'

    def __str__(self):
        return f"Student: {self.user.username}"


class InstructorProfile(models.Model):
    """
    Extended profile for instructors
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='instructor_profile',
        limit_choices_to={'role': 'instructor'}
    )
    
    # Professional Information
    title = models.CharField(max_length=100, blank=True, help_text='e.g., PhD, MSc, Professional')
    expertise_areas = models.JSONField(default=list, blank=True)
    years_of_experience = models.IntegerField(default=0)
    certifications = models.JSONField(default=list, blank=True)
    
    # Teaching Stats
    total_courses_created = models.IntegerField(default=0)
    total_students_taught = models.IntegerField(default=0)
    average_rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    total_reviews = models.IntegerField(default=0)
    
    # Earnings & Payouts
    total_earnings = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    pending_earnings = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    lifetime_earnings = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    
    # Payment Information
    bank_account = models.CharField(max_length=100, blank=True)
    mobile_money = models.CharField(max_length=20, blank=True)
    payment_method = models.CharField(
        max_length=20,
        choices=(
            ('bank', 'Bank Transfer'),
            ('mpesa', 'M-Pesa'),
            ('airtel', 'Airtel Money'),
        ),
        blank=True,
        null=True
    )
    
    # Verification
    is_verified_instructor = models.BooleanField(default=False)
    verification_documents = models.JSONField(default=list, blank=True)
    verified_at = models.DateTimeField(null=True, blank=True)
    
    # Social Links (Extended)
    youtube_channel = models.URLField(blank=True, null=True)
    twitter_handle = models.CharField(max_length=100, blank=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Instructor Profile'
        verbose_name_plural = 'Instructor Profiles'

    def __str__(self):
        return f"Instructor: {self.user.username}"


class AdminProfile(models.Model):
    """
    Extended profile for administrators
    """
    user = models.OneToOneField(
        User,
        on_delete=models.CASCADE,
        related_name='admin_profile',
        limit_choices_to={'role': 'admin'}
    )
    
    # Admin Information
    admin_level = models.CharField(
        max_length=20,
        choices=(
            ('super', 'Super Admin'),
            ('manager', 'Manager'),
            ('moderator', 'Moderator'),
        ),
        default='moderator'
    )
    department = models.CharField(max_length=100, blank=True)
    
    # Permissions
    can_approve_courses = models.BooleanField(default=False)
    can_manage_users = models.BooleanField(default=False)
    can_view_analytics = models.BooleanField(default=True)
    can_manage_payments = models.BooleanField(default=False)
    
    # Activity
    last_active = models.DateTimeField(auto_now=True)
    total_actions = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Admin Profile'
        verbose_name_plural = 'Admin Profiles'

    def __str__(self):
        return f"Admin: {self.user.username} ({self.admin_level})"