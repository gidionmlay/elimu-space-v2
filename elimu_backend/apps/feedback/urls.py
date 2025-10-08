"""
URL configuration for Feedback app
"""

from django.urls import path
from elimu_backend.apps.feedback import views

app_name = 'feedback'

urlpatterns = [
    # Testimonials
    path('testimonials/', views.TestimonialListView.as_view(), name='testimonial-list'),
    path('testimonials/create/', views.CreateTestimonialView.as_view(), name='create-testimonial'),
    path('testimonials/my/', views.MyTestimonialsView.as_view(), name='my-testimonials'),
    
    # Opportunities
    path('opportunities/', views.OpportunityListView.as_view(), name='opportunity-list'),
    path('opportunities/<slug:slug>/', views.OpportunityDetailView.as_view(), name='opportunity-detail'),
    path('opportunities/create/', views.CreateOpportunityView.as_view(), name='create-opportunity'),
    
    # General Feedback
    path('submissions/', views.FeedbackSubmissionListView.as_view(), name='feedback-list'),
    path('submissions/<int:pk>/respond/', views.RespondToFeedbackView.as_view(), name='respond-feedback'),
]

