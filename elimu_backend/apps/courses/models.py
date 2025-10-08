from django.db import models
from django.contrib.auth import get_user_model
from django.utils.text import slugify

User = get_user_model()


class Category(models.Model):
    """
    Course categories
    """
    name = models.CharField(max_length=100, unique=True)
    slug = models.SlugField(max_length=100, unique=True, blank=True)
    description = models.TextField(blank=True)
    icon = models.CharField(max_length=50, blank=True, help_text='FontAwesome icon class')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Category'
        verbose_name_plural = 'Categories'
        ordering = ['name']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.name)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.name


class Course(models.Model):
    """
    Main Course model
    """
    LEVEL_CHOICES = (
        ('beginner', 'Beginner'),
        ('intermediate', 'Intermediate'),
        ('advanced', 'Advanced'),
    )

    LANGUAGE_CHOICES = (
        ('english', 'English'),
        ('swahili', 'Swahili'),
        ('both', 'Both'),
    )

    # Basic Information
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=200, unique=True, blank=True)
    description = models.TextField()
    short_description = models.CharField(max_length=300)
    
    # Course Details
    category = models.ForeignKey(Category, on_delete=models.SET_NULL, null=True, related_name='courses')
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='courses_teaching')
    level = models.CharField(max_length=20, choices=LEVEL_CHOICES, default='beginner')
    language = models.CharField(max_length=20, choices=LANGUAGE_CHOICES, default='both')
    
    # Media
    thumbnail = models.ImageField(upload_to='courses/thumbnails/', blank=True, null=True)
    intro_video = models.URLField(blank=True, null=True, help_text='YouTube or Vimeo URL')
    
    # Pricing
    price = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    original_price = models.DecimalField(max_digits=10, decimal_places=2, null=True, blank=True)
    is_free = models.BooleanField(default=False)
    is_premium = models.BooleanField(default=False)
    
    # Course Metadata
    duration = models.CharField(max_length=50, help_text='e.g., 8 weeks, 3 months')
    total_lectures = models.IntegerField(default=0)
    total_duration_minutes = models.IntegerField(default=0, help_text='Total course duration in minutes')
    
    # Status
    is_published = models.BooleanField(default=False)
    is_featured = models.BooleanField(default=False)
    
    # Stats
    enrolled_count = models.IntegerField(default=0)
    rating = models.DecimalField(max_digits=3, decimal_places=2, default=0.0)
    review_count = models.IntegerField(default=0)
    
    # Requirements
    requirements = models.JSONField(default=list, blank=True)
    what_you_learn = models.JSONField(default=list, blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    published_at = models.DateTimeField(null=True, blank=True)

    class Meta:
        verbose_name = 'Course'
        verbose_name_plural = 'Courses'
        ordering = ['-created_at']

    def save(self, *args, **kwargs):
        if not self.slug:
            self.slug = slugify(self.title)
        super().save(*args, **kwargs)

    def __str__(self):
        return self.title


class Lesson(models.Model):
    """
    Individual lesson within a course
    """
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    order = models.IntegerField(default=0)
    
    # Content
    video_url = models.URLField(blank=True, null=True)
    duration_minutes = models.IntegerField(default=0)
    content = models.TextField(blank=True, help_text='Lesson content/notes')
    
    # Files
    attachments = models.JSONField(default=list, blank=True, help_text='List of file URLs')
    
    # Status
    is_preview = models.BooleanField(default=False, help_text='Free preview lesson')
    is_published = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Lesson'
        verbose_name_plural = 'Lessons'
        ordering = ['order']

    def __str__(self):
        return f"{self.course.title} - {self.title}"


class Enrollment(models.Model):
    """
    User course enrollment
    """
    STATUS_CHOICES = (
        ('active', 'Active'),
        ('completed', 'Completed'),
        ('dropped', 'Dropped'),
    )

    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='enrollments')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='active')
    
    # Progress
    progress = models.DecimalField(max_digits=5, decimal_places=2, default=0.0)
    completed_lessons = models.JSONField(default=list, help_text='List of completed lesson IDs')
    
    # Timestamps
    enrolled_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    last_accessed = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Enrollment'
        verbose_name_plural = 'Enrollments'
        unique_together = ('user', 'course')
        ordering = ['-enrolled_at']

    def __str__(self):
        return f"{self.user.username} - {self.course.title}"
    
    def update_progress(self):
        """Calculate progress based on completed lessons"""
        if self.course.lessons.count() > 0:
            self.progress = (len(self.completed_lessons) / self.course.lessons.count()) * 100
            
            # Mark as completed if 100%
            if self.progress >= 100 and self.status != 'completed':
                self.status = 'completed'
                from django.utils import timezone
                self.completed_at = timezone.now()
            
            self.save()


class LessonProgress(models.Model):
    """
    Track individual lesson completion
    """
    enrollment = models.ForeignKey(Enrollment, on_delete=models.CASCADE, related_name='lesson_progress')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='progress_records')
    
    # Completion
    completed = models.BooleanField(default=False)
    completed_at = models.DateTimeField(null=True, blank=True)
    
    # Engagement
    time_spent_seconds = models.IntegerField(default=0)
    attempts = models.IntegerField(default=0)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Lesson Progress'
        verbose_name_plural = 'Lesson Progress'
        unique_together = ('enrollment', 'lesson')
        ordering = ['lesson__order']

    def __str__(self):
        return f"{self.enrollment.user.username} - {self.lesson.title}"


class Announcement(models.Model):
    """
    Course announcements from instructors
    """
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='announcements')
    instructor = models.ForeignKey(User, on_delete=models.CASCADE, related_name='announcements')
    
    # Content
    title = models.CharField(max_length=200)
    message = models.TextField()
    
    # Delivery
    send_email = models.BooleanField(default=False)
    email_sent = models.BooleanField(default=False)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Announcement'
        verbose_name_plural = 'Announcements'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.course.title} - {self.title}"


class Review(models.Model):
    """
    Course reviews and ratings
    """
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='reviews')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='reviews')
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)])
    comment = models.TextField(blank=True)
    
    # Timestamps
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        verbose_name = 'Review'
        verbose_name_plural = 'Reviews'
        unique_together = ('user', 'course')
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.user.username} - {self.course.title} ({self.rating}★)"
