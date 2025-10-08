"""
Views for Feedback app
"""

from rest_framework import generics, permissions, status, filters
from rest_framework.response import Response
from rest_framework.views import APIView
from django.utils.text import slugify
from django.utils import timezone
from elimu_backend.apps.feedback.models import Testimonial, Opportunity, FeedbackSubmission
from elimu_backend.apps.feedback.serializers import (
    TestimonialSerializer,
    OpportunitySerializer,
    FeedbackSubmissionSerializer
)


class TestimonialListView(generics.ListAPIView):
    """
    List all approved testimonials
    """
    serializer_class = TestimonialSerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'content', 'user__username']
    ordering_fields = ['created_at', 'rating']
    
    def get_queryset(self):
        queryset = Testimonial.objects.filter(status='approved')
        
        # Filter featured
        is_featured = self.request.query_params.get('is_featured', None)
        if is_featured == 'true':
            queryset = queryset.filter(is_featured=True)
        
        return queryset


class CreateTestimonialView(generics.CreateAPIView):
    """
    Create a new testimonial (authenticated users only)
    """
    serializer_class = TestimonialSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user, status='pending')


class MyTestimonialsView(generics.ListAPIView):
    """
    List user's own testimonials
    """
    serializer_class = TestimonialSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        return Testimonial.objects.filter(user=self.request.user)


class OpportunityListView(generics.ListAPIView):
    """
    List all active opportunities
    """
    serializer_class = OpportunitySerializer
    permission_classes = (permissions.AllowAny,)
    filter_backends = [filters.SearchFilter, filters.OrderingFilter]
    search_fields = ['title', 'description', 'organization']
    ordering_fields = ['created_at', 'deadline']
    
    def get_queryset(self):
        queryset = Opportunity.objects.filter(status='active', deadline__gte=timezone.now())
        
        # Filter by type
        opportunity_type = self.request.query_params.get('type', None)
        if opportunity_type:
            queryset = queryset.filter(opportunity_type=opportunity_type)
        
        # Filter featured
        is_featured = self.request.query_params.get('is_featured', None)
        if is_featured == 'true':
            queryset = queryset.filter(is_featured=True)
        
        return queryset


class OpportunityDetailView(generics.RetrieveAPIView):
    """
    Get opportunity details and increment view count
    """
    queryset = Opportunity.objects.filter(status='active')
    serializer_class = OpportunitySerializer
    permission_classes = (permissions.AllowAny,)
    lookup_field = 'slug'
    
    def retrieve(self, request, *args, **kwargs):
        instance = self.get_object()
        
        # Increment view count
        instance.views_count += 1
        instance.save(update_fields=['views_count'])
        
        serializer = self.get_serializer(instance)
        return Response(serializer.data)


class CreateOpportunityView(generics.CreateAPIView):
    """
    Create a new opportunity (admin/instructor only)
    """
    serializer_class = OpportunitySerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def perform_create(self, serializer):
        # Auto-generate slug
        title = serializer.validated_data.get('title')
        slug = slugify(title)
        
        serializer.save(
            posted_by=self.request.user,
            slug=slug,
            status='draft' if not self.request.user.is_staff else 'active'
        )


class FeedbackSubmissionListView(generics.ListCreateAPIView):
    """
    List and create feedback submissions
    """
    serializer_class = FeedbackSubmissionSerializer
    permission_classes = (permissions.IsAuthenticated,)
    
    def get_queryset(self):
        # Users see only their own feedback
        if not self.request.user.is_staff:
            return FeedbackSubmission.objects.filter(user=self.request.user)
        # Admins see all feedback
        return FeedbackSubmission.objects.all()
    
    def perform_create(self, serializer):
        serializer.save(user=self.request.user)


class RespondToFeedbackView(APIView):
    """
    Admin response to feedback (admin only)
    """
    permission_classes = (permissions.IsAdminUser,)
    
    def post(self, request, pk):
        try:
            feedback = FeedbackSubmission.objects.get(pk=pk)
            admin_response = request.data.get('admin_response')
            
            if not admin_response:
                return Response(
                    {'error': 'Admin response is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            feedback.admin_response = admin_response
            feedback.is_resolved = True
            feedback.responded_by = request.user
            feedback.responded_at = timezone.now()
            feedback.save()
            
            return Response({
                'message': 'Feedback responded successfully',
                'feedback': FeedbackSubmissionSerializer(feedback).data
            })
        except FeedbackSubmission.DoesNotExist:
            return Response(
                {'error': 'Feedback not found'},
                status=status.HTTP_404_NOT_FOUND
            )

