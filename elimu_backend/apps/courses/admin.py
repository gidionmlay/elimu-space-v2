"""
Admin configuration for Courses app
"""

from django.contrib import admin
from elimu_backend.apps.courses.models import Category, Course, Lesson, Enrollment, Review


class LessonInline(admin.TabularInline):
    """
    Inline admin for lessons within course admin
    """
    model = Lesson
    extra = 1
    fields = ('title', 'order', 'duration_minutes', 'is_preview', 'is_published')


@admin.register(Category)
class CategoryAdmin(admin.ModelAdmin):
    """
    Admin for Category model
    """
    list_display = ('name', 'slug', 'get_course_count', 'created_at')
    search_fields = ('name', 'description')
    prepopulated_fields = {'slug': ('name',)}
    readonly_fields = ('created_at', 'updated_at')
    
    def get_course_count(self, obj):
        return obj.courses.count()
    get_course_count.short_description = 'Courses'


@admin.register(Course)
class CourseAdmin(admin.ModelAdmin):
    """
    Admin for Course model
    """
    list_display = (
        'title', 'category', 'instructor', 'level', 'language',
        'price', 'is_free', 'is_published', 'enrolled_count', 'rating'
    )
    list_filter = ('category', 'level', 'language', 'is_published', 'is_featured', 'is_free')
    search_fields = ('title', 'description', 'instructor__username')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('enrolled_count', 'rating', 'review_count', 'created_at', 'updated_at')
    inlines = [LessonInline]
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('title', 'slug', 'short_description', 'description')
        }),
        ('Course Details', {
            'fields': ('category', 'instructor', 'level', 'language')
        }),
        ('Media', {
            'fields': ('thumbnail', 'intro_video')
        }),
        ('Pricing', {
            'fields': ('price', 'original_price', 'is_free', 'is_premium')
        }),
        ('Metadata', {
            'fields': ('duration', 'total_lectures', 'total_duration_minutes')
        }),
        ('Content', {
            'fields': ('requirements', 'what_you_learn')
        }),
        ('Status', {
            'fields': ('is_published', 'is_featured', 'published_at')
        }),
        ('Statistics', {
            'fields': ('enrolled_count', 'rating', 'review_count'),
            'classes': ('collapse',)
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Lesson)
class LessonAdmin(admin.ModelAdmin):
    """
    Admin for Lesson model
    """
    list_display = ('title', 'course', 'order', 'duration_minutes', 'is_preview', 'is_published')
    list_filter = ('course', 'is_preview', 'is_published')
    search_fields = ('title', 'description', 'course__title')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Basic Information', {
            'fields': ('course', 'title', 'description', 'order')
        }),
        ('Content', {
            'fields': ('video_url', 'duration_minutes', 'content', 'attachments')
        }),
        ('Status', {
            'fields': ('is_preview', 'is_published')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at'),
            'classes': ('collapse',)
        }),
    )


@admin.register(Enrollment)
class EnrollmentAdmin(admin.ModelAdmin):
    """
    Admin for Enrollment model
    """
    list_display = ('user', 'course', 'status', 'progress', 'enrolled_at', 'last_accessed')
    list_filter = ('status', 'enrolled_at', 'course__category')
    search_fields = ('user__username', 'user__email', 'course__title')
    readonly_fields = ('enrolled_at', 'last_accessed')
    
    fieldsets = (
        ('Enrollment Info', {
            'fields': ('user', 'course', 'status')
        }),
        ('Progress', {
            'fields': ('progress', 'completed_lessons')
        }),
        ('Timestamps', {
            'fields': ('enrolled_at', 'completed_at', 'last_accessed')
        }),
    )


@admin.register(Review)
class ReviewAdmin(admin.ModelAdmin):
    """
    Admin for Review model
    """
    list_display = ('user', 'course', 'rating', 'created_at')
    list_filter = ('rating', 'created_at', 'course__category')
    search_fields = ('user__username', 'course__title', 'comment')
    readonly_fields = ('created_at', 'updated_at')
    
    fieldsets = (
        ('Review Info', {
            'fields': ('user', 'course', 'rating', 'comment')
        }),
        ('Timestamps', {
            'fields': ('created_at', 'updated_at')
        }),
    )
