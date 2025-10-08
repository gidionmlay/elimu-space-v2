"""
Custom middleware for elimu_backend
"""

import logging
from django.utils.deprecation import MiddlewareMixin

logger = logging.getLogger(__name__)


class RequestLoggingMiddleware(MiddlewareMixin):
    """
    Log all API requests for debugging and monitoring
    """
    
    def process_request(self, request):
        logger.info(f"{request.method} {request.path} - User: {request.user}")
        return None
    
    def process_response(self, request, response):
        logger.info(f"{request.method} {request.path} - Status: {response.status_code}")
        return response


class IPTrackingMiddleware(MiddlewareMixin):
    """
    Track user's IP address on login
    """
    
    def process_request(self, request):
        if request.user.is_authenticated:
            x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
            if x_forwarded_for:
                ip = x_forwarded_for.split(',')[0]
            else:
                ip = request.META.get('REMOTE_ADDR')
            
            # Update last login IP if changed
            if hasattr(request.user, 'last_login_ip') and request.user.last_login_ip != ip:
                request.user.last_login_ip = ip
                request.user.save(update_fields=['last_login_ip'])
        
        return None

