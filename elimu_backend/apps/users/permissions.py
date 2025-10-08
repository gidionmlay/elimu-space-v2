"""
Custom permissions for Users app
"""

from rest_framework import permissions


class IsOwnerOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow owners of an object or admins to edit it.
    """
    
    def has_object_permission(self, request, view, obj):
        # Read permissions are allowed to any request
        if request.method in permissions.SAFE_METHODS:
            return True
        
        # Write permissions are only allowed to the owner or admin
        return obj == request.user or request.user.is_staff


class IsInstructorOrAdmin(permissions.BasePermission):
    """
    Custom permission to only allow instructors or admins
    """
    
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            (request.user.role == 'instructor' or request.user.is_staff)
        )


class IsStudent(permissions.BasePermission):
    """
    Custom permission to only allow students
    """
    
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.role == 'student'
        )


class IsPartner(permissions.BasePermission):
    """
    Custom permission to only allow partners
    """
    
    def has_permission(self, request, view):
        return (
            request.user and 
            request.user.is_authenticated and 
            request.user.role == 'partner'
        )

