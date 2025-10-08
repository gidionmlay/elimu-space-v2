"""
Admin configuration for Feedback app
"""

from django.contrib import admin
from elimu_backend.apps.feedback.models import Testimonial, Opportunity, FeedbackSubmission


@admin.register(Testimonial)
class TestimonialAdmin(admin.ModelAdmin):
    """
    Admin for Testimonial model
    """
    list_display = ('user', 'title', 'rating', 'status', 'is_featured', 'created_at')
    list_filter = ('status', 'is_featured', 'rating', 'created_at')
    search_fields = ('user__username', 'title', 'content')
    readonly_fields = ('created_at', 'updated_at', 'approved_at')
    actions = ['approve_testimonials', 'reject_testimonials', 'feature_testimonials']
    
    fieldsets = (
        ('User & Course', {'fields': ('user', 'course')}),
        ('Content', {'fields': ('title', 'content', 'rating')}),
        ('Media', {'fields': ('image', 'video_url')}),
        ('Status', {'fields': ('status', 'is_featured')}),
        ('Approval', {'fields': ('approved_by', 'approved_at')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )
    
    def approve_testimonials(self, request, queryset):
        from django.utils import timezone
        queryset.update(
            status='approved',
            approved_by=request.user,
            approved_at=timezone.now()
        )
        self.message_user(request, f"{queryset.count()} testimonial(s) approved successfully.")
    approve_testimonials.short_description = "Approve selected testimonials"
    
    def reject_testimonials(self, request, queryset):
        queryset.update(status='rejected')
        self.message_user(request, f"{queryset.count()} testimonial(s) rejected.")
    reject_testimonials.short_description = "Reject selected testimonials"
    
    def feature_testimonials(self, request, queryset):
        queryset.update(is_featured=True)
        self.message_user(request, f"{queryset.count()} testimonial(s) featured.")
    feature_testimonials.short_description = "Feature selected testimonials"


@admin.register(Opportunity)
class OpportunityAdmin(admin.ModelAdmin):
    """
    Admin for Opportunity model
    """
    list_display = ('title', 'organization', 'opportunity_type', 'location', 'deadline', 'status', 'is_featured')
    list_filter = ('opportunity_type', 'status', 'is_featured', 'is_remote', 'created_at')
    search_fields = ('title', 'description', 'organization')
    prepopulated_fields = {'slug': ('title',)}
    readonly_fields = ('views_count', 'applications_count', 'created_at', 'updated_at')
    
    fieldsets = (
        ('Basic Information', {'fields': ('title', 'slug', 'description', 'opportunity_type')}),
        ('Organization', {'fields': ('organization', 'organization_logo', 'location', 'is_remote')}),
        ('Details', {'fields': ('requirements', 'benefits', 'application_url', 'deadline')}),
        ('Status', {'fields': ('status', 'is_featured')}),
        ('Statistics', {'fields': ('views_count', 'applications_count')}),
        ('Posted By', {'fields': ('posted_by',)}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )


@admin.register(FeedbackSubmission)
class FeedbackSubmissionAdmin(admin.ModelAdmin):
    """
    Admin for FeedbackSubmission model
    """
    list_display = ('user', 'category', 'subject', 'is_resolved', 'created_at')
    list_filter = ('category', 'is_resolved', 'created_at')
    search_fields = ('user__username', 'subject', 'message')
    readonly_fields = ('created_at', 'updated_at', 'responded_at')
    
    fieldsets = (
        ('User', {'fields': ('user',)}),
        ('Feedback', {'fields': ('category', 'subject', 'message', 'screenshot')}),
        ('Response', {'fields': ('is_resolved', 'admin_response', 'responded_by', 'responded_at')}),
        ('Timestamps', {'fields': ('created_at', 'updated_at')}),
    )

