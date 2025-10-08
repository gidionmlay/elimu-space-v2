from django.db import models
from django.contrib.auth import get_user_model
from elimu_backend.apps.courses.models import Course

User = get_user_model()


class Testimonial(models.Model):
    """
    Student testimonials and success stories
    """
    STATUS_CHOICES = (
        ('pending', 'Pending Review'),
        ('approved', 'Approved'),
        ('rejected', 'Rejected'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='testimonials')
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True, related_name='testimonials')
    
    # Testimonial Content
    title = models.CharField(max_length=200)
    content = models.TextField()
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    
    # Media
    image = models.ImageField(upload_to='testimonials/', blank=True, null=True)
    video_url = models.URLField(blank=True, null=True)
    
    # Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')
    is_featured = models.BooleanField(default=False)
    
    # Approval
    approved_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='approved_testimonials'
    )
    approved_at = models.DateTimeField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Testimonial'
        verbose_name_plural = 'Testimonials'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.title}"


class Opportunity(models.Model):
    """
    Learning opportunities, internships, and job postings
    """
    TYPE_CHOICES = (
        ('internship', 'Internship'),
        ('job', 'Job'),
        ('scholarship', 'Scholarship'),
        ('competition', 'Competition'),
        ('event', 'Event'),
    )
    
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('closed', 'Closed'),
        ('draft', 'Draft'),
    )
    
    # Basic Information
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField()
    opportunity_type = models.CharField(max_length=20, choices=TYPE_CHOICES)
    
    # Organization
    organization = models.CharField(max_length=200)
    organization_logo = models.ImageField(upload_to='opportunities/logos/', blank=True, null=True)
    location = models.CharField(max_length=200)
    is_remote = models.BooleanField(default=False)
    
    # Details
    requirements = models.JSONField(default=list, blank=True)
    benefits = models.JSONField(default=list, blank=True)
    application_url = models.URLField()
    deadline = models.DateTimeField()
    
    # Meta
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    is_featured = models.BooleanField(default=False)
    views_count = models.IntegerField(default=0)
    applications_count = models.IntegerField(default=0)
    
    # Posted by
    posted_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        related_name='posted_opportunities'
    )
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Opportunity'
        verbose_name_plural = 'Opportunities'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.title} - {self.organization}"


class FeedbackSubmission(models.Model):
    """
    General platform feedback from users
    """
    CATEGORY_CHOICES = (
        ('bug', 'Bug Report'),
        ('feature', 'Feature Request'),
        ('improvement', 'Improvement Suggestion'),
        ('complaint', 'Complaint'),
        ('praise', 'Praise'),
        ('other', 'Other'),
    )
    
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='feedback_submissions')
    category = models.CharField(max_length=20, choices=CATEGORY_CHOICES)
    subject = models.CharField(max_length=200)
    message = models.TextField()
    
    # Attachments
    screenshot = models.ImageField(upload_to='feedback/', blank=True, null=True)
    
    # Status
    is_resolved = models.BooleanField(default=False)
    admin_response = models.TextField(blank=True)
    responded_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name='feedback_responses'
    )
    responded_at = models.DateTimeField(null=True, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Feedback Submission'
        verbose_name_plural = 'Feedback Submissions'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.subject}"

