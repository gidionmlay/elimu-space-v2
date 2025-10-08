"""
Custom exception handlers for elimu_backend
"""

from rest_framework.views import exception_handler
from rest_framework.response import Response
from rest_framework import status


def custom_exception_handler(exc, context):
    """
    Custom exception handler that returns consistent error responses
    """
    # Call REST framework's default exception handler first
    response = exception_handler(exc, context)

    # Now add the custom response format
    if response is not None:
        custom_response_data = {
            'error': True,
            'status_code': response.status_code,
            'message': get_error_message(response.data),
            'details': response.data
        }
        response.data = custom_response_data

    return response


def get_error_message(data):
    """
    Extract a user-friendly error message from error data
    """
    if isinstance(data, dict):
        # Get first error message
        for key, value in data.items():
            if isinstance(value, list):
                return value[0]
            return str(value)
    elif isinstance(data, list):
        return data[0]
    return str(data)

