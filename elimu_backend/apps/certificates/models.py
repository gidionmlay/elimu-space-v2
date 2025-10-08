from django.db import models
from django.contrib.auth import get_user_model
from elimu_backend.apps.courses.models import Course
import uuid

User = get_user_model()


class Certificate(models.Model):
    """
    Course completion certificates
    """
    STATUS_CHOICES = (
        ('processing', 'Processing'),
        ('completed', 'Completed'),
        ('failed', 'Failed'),
    )
    
    # Certificate Info
    certificate_id = models.CharField(max_length=100, unique=True, blank=True, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='certificates')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='certificates')
    
    # Certificate Details
    student_name = models.CharField(max_length=200)
    course_title = models.CharField(max_length=200)
    instructor_name = models.CharField(max_length=200)
    completion_date = models.DateField(auto_now_add=True)
    
    # File Storage
    file_url = models.URLField(blank=True, null=True, help_text='Cloudinary URL for PDF')
    cloudinary_public_id = models.CharField(max_length=255, blank=True, null=True)
    
    # Generation Status
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='processing')
    error_message = models.TextField(blank=True, null=True)
    
    # Verification
    verification_code = models.CharField(max_length=50, unique=True, blank=True)
    is_verified = models.BooleanField(default=True)
    
    # Timestamps
    issued_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Certificate'
        verbose_name_plural = 'Certificates'
        unique_together = ('user', 'course')
        ordering = ['-issued_at']

    def save(self, *args, **kwargs):
        if not self.certificate_id:
            # Generate unique certificate ID
            self.certificate_id = f"ELIMU-{uuid.uuid4().hex[:8].upper()}-{self.course.id}"
        
        if not self.verification_code:
            # Generate verification code
            self.verification_code = uuid.uuid4().hex[:12].upper()
        
        if not self.student_name:
            self.student_name = self.user.get_full_name() or self.user.username
        
        if not self.course_title:
            self.course_title = self.course.title
        
        if not self.instructor_name:
            self.instructor_name = self.course.instructor.get_full_name()
        
        super().save(*args, **kwargs)

    def __str__(self):
        return f"Certificate: {self.student_name} - {self.course_title}"


class CertificateTemplate(models.Model):
    """
    Customizable certificate templates
    """
    name = models.CharField(max_length=100, unique=True)
    description = models.TextField(blank=True)
    
    # Template Design
    background_image_url = models.URLField(blank=True, null=True)
    logo_url = models.URLField(blank=True, null=True)
    
    # Template HTML (for WeasyPrint)
    html_template = models.TextField(help_text='HTML template with placeholders')
    css_styles = models.TextField(blank=True, help_text='Custom CSS for template')
    
    # Settings
    is_default = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Certificate Template'
        verbose_name_plural = 'Certificate Templates'

    def __str__(self):
        return self.name

