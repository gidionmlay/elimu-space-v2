from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import get_user_model
from elimu_backend.apps.users.serializers import (
    RegisterSerializer,
    UserSerializer,
    CustomTokenObtainPairSerializer,
    ChangePasswordSerializer,
    UpdateProfileSerializer
)

User = get_user_model()


class RegisterView(generics.CreateAPIView):
    """
    API endpoint for user registration
    """
    queryset = User.objects.all()
    permission_classes = (permissions.AllowAny,)
    serializer_class = RegisterSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        
        # Generate tokens for the new user
        refresh = RefreshToken.for_user(user)
        
        return Response({
            'user': UserSerializer(user).data,
            'message': 'User registered successfully',
            'tokens': {
                'refresh': str(refresh),
                'access': str(refresh.access_token),
            }
        }, status=status.HTTP_201_CREATED)


class CustomTokenObtainPairView(TokenObtainPairView):
    """
    Custom JWT token obtain view with additional user data
    """
    serializer_class = CustomTokenObtainPairSerializer


class LogoutView(APIView):
    """
    API endpoint for user logout (blacklist refresh token)
    """
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        try:
            refresh_token = request.data.get("refresh")
            if not refresh_token:
                return Response(
                    {"error": "Refresh token is required"},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            token = RefreshToken(refresh_token)
            token.blacklist()
            
            return Response(
                {"message": "Successfully logged out"},
                status=status.HTTP_200_OK
            )
        except Exception as e:
            return Response(
                {"error": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )


class UserProfileView(generics.RetrieveAPIView):
    """
    API endpoint to retrieve user profile
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user


class UpdateProfileView(generics.UpdateAPIView):
    """
    API endpoint to update user profile
    """
    permission_classes = (permissions.IsAuthenticated,)
    serializer_class = UpdateProfileSerializer

    def get_object(self):
        return self.request.user

    def update(self, request, *args, **kwargs):
        partial = kwargs.pop('partial', False)
        instance = self.get_object()
        serializer = self.get_serializer(instance, data=request.data, partial=partial)
        serializer.is_valid(raise_exception=True)
        self.perform_update(serializer)

        return Response({
            'message': 'Profile updated successfully',
            'user': UserSerializer(instance).data
        })


class ChangePasswordView(APIView):
    """
    API endpoint for changing user password
    """
    permission_classes = (permissions.IsAuthenticated,)

    def post(self, request):
        serializer = ChangePasswordSerializer(data=request.data)
        
        if serializer.is_valid():
            user = request.user
            
            # Check old password
            if not user.check_password(serializer.data.get("old_password")):
                return Response(
                    {"old_password": ["Wrong password."]},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            # Set new password
            user.set_password(serializer.data.get("new_password"))
            user.save()
            
            return Response(
                {"message": "Password changed successfully"},
                status=status.HTTP_200_OK
            )
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UserListView(generics.ListAPIView):
    """
    API endpoint to list all users (admin only)
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser,)


class UserDetailView(generics.RetrieveUpdateDestroyAPIView):
    """
    API endpoint to retrieve, update or delete a user (admin only)
    """
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = (permissions.IsAdminUser,)


class VerifyEmailView(APIView):
    """
    API endpoint for email verification
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        # TODO: Implement email verification logic
        return Response(
            {"message": "Email verification endpoint - to be implemented"},
            status=status.HTTP_200_OK
        )


class RequestPasswordResetView(APIView):
    """
    API endpoint for requesting password reset
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        email = request.data.get('email')
        
        if not email:
            return Response(
                {"error": "Email is required"},
                status=status.HTTP_400_BAD_REQUEST
            )
        
        try:
            user = User.objects.get(email=email)
            # TODO: Generate reset token and send email
            
            return Response(
                {"message": "Password reset email sent"},
                status=status.HTTP_200_OK
            )
        except User.DoesNotExist:
            # Return success even if user doesn't exist (security best practice)
            return Response(
                {"message": "If an account exists with this email, a password reset link has been sent"},
                status=status.HTTP_200_OK
            )


class ResetPasswordView(APIView):
    """
    API endpoint for resetting password with token
    """
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        # TODO: Implement password reset logic with token validation
        return Response(
            {"message": "Password reset endpoint - to be implemented"},
            status=status.HTTP_200_OK
        )
