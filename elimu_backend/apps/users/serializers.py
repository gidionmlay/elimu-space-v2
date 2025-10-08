from rest_framework import serializers
from django.contrib.auth import get_user_model
from django.contrib.auth.password_validation import validate_password
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

User = get_user_model()


class UserSerializer(serializers.ModelSerializer):
    """
    Serializer for User model
    """
    full_name = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = (
            'id', 'username', 'email', 'first_name', 'last_name',
            'full_name', 'role', 'bio', 'profile_image', 'phone_number',
            'country', 'is_verified', 'created_at', 'last_login'
        )
        read_only_fields = ('id', 'created_at', 'last_login', 'is_verified')

    def get_full_name(self, obj):
        return obj.get_full_name()


class RegisterSerializer(serializers.ModelSerializer):
    """
    Serializer for user registration
    """
    password = serializers.CharField(
        write_only=True,
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    password2 = serializers.CharField(
        write_only=True,
        required=True,
        style={'input_type': 'password'},
        label='Confirm Password'
    )
    email = serializers.EmailField(required=True)

    class Meta:
        model = User
        fields = (
            'username', 'email', 'password', 'password2',
            'first_name', 'last_name', 'role', 'country'
        )
        extra_kwargs = {
            'first_name': {'required': False},
            'last_name': {'required': False},
            'country': {'required': False},
        }

    def validate_email(self, value):
        """
        Check that the email is not already in use
        """
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with this email already exists.")
        return value

    def validate_username(self, value):
        """
        Check that the username is not already in use
        """
        if User.objects.filter(username=value).exists():
            raise serializers.ValidationError("A user with this username already exists.")
        return value

    def validate(self, attrs):
        """
        Check that the two password entries match
        """
        if attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({
                "password": "Password fields didn't match."
            })
        return attrs

    def create(self, validated_data):
        """
        Create and return a new user instance, given the validated data
        """
        # Remove password2 as it's not needed for user creation
        validated_data.pop('password2')
        
        # Extract password
        password = validated_data.pop('password')
        
        # Create user
        user = User.objects.create(**validated_data)
        user.set_password(password)
        user.save()
        
        return user


class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    """
    Custom JWT token serializer to include additional user data
    """
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)

        # Add custom claims
        token['username'] = user.username
        token['email'] = user.email
        token['role'] = user.role
        token['full_name'] = user.get_full_name()

        return token

    def validate(self, attrs):
        data = super().validate(attrs)

        # Add extra responses
        data['user'] = {
            'id': self.user.id,
            'username': self.user.username,
            'email': self.user.email,
            'role': self.user.role,
            'full_name': self.user.get_full_name(),
            'profile_image': self.user.profile_image.url if self.user.profile_image else None,
        }

        return data


class ChangePasswordSerializer(serializers.Serializer):
    """
    Serializer for password change endpoint
    """
    old_password = serializers.CharField(
        required=True,
        style={'input_type': 'password'}
    )
    new_password = serializers.CharField(
        required=True,
        validators=[validate_password],
        style={'input_type': 'password'}
    )
    new_password2 = serializers.CharField(
        required=True,
        style={'input_type': 'password'},
        label='Confirm New Password'
    )

    def validate(self, attrs):
        if attrs['new_password'] != attrs['new_password2']:
            raise serializers.ValidationError({
                "new_password": "Password fields didn't match."
            })
        return attrs


class UpdateProfileSerializer(serializers.ModelSerializer):
    """
    Serializer for updating user profile
    """
    email = serializers.EmailField(required=False)

    class Meta:
        model = User
        fields = (
            'first_name', 'last_name', 'email', 'bio',
            'profile_image', 'phone_number', 'country'
        )

    def validate_email(self, value):
        user = self.context['request'].user
        if User.objects.exclude(pk=user.pk).filter(email=value).exists():
            raise serializers.ValidationError("This email is already in use.")
        return value

    def update(self, instance, validated_data):
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)
        instance.email = validated_data.get('email', instance.email)
        instance.bio = validated_data.get('bio', instance.bio)
        instance.phone_number = validated_data.get('phone_number', instance.phone_number)
        instance.country = validated_data.get('country', instance.country)
        
        if 'profile_image' in validated_data:
            instance.profile_image = validated_data['profile_image']
        
        instance.save()
        return instance

