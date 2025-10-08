"""
Tests for Users app
"""

from django.test import TestCase
from django.contrib.auth import get_user_model
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse

User = get_user_model()


class UserModelTests(TestCase):
    """
    Test User model
    """
    
    def setUp(self):
        self.user = User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123',
            role='student'
        )
    
    def test_user_creation(self):
        """Test creating a new user"""
        self.assertEqual(self.user.username, 'testuser')
        self.assertEqual(self.user.email, 'test@example.com')
        self.assertEqual(self.user.role, 'student')
        self.assertTrue(self.user.check_password('testpass123'))
    
    def test_user_full_name(self):
        """Test get_full_name method"""
        self.user.first_name = 'Test'
        self.user.last_name = 'User'
        self.user.save()
        self.assertEqual(self.user.get_full_name(), 'Test User')
    
    def test_user_properties(self):
        """Test user role properties"""
        self.assertTrue(self.user.is_student)
        self.assertFalse(self.user.is_instructor)
        self.assertFalse(self.user.is_partner)


class UserAPITests(APITestCase):
    """
    Test User API endpoints
    """
    
    def setUp(self):
        self.client = APIClient()
        self.register_url = reverse('register')
        self.login_url = reverse('token_obtain_pair')
        
        self.user_data = {
            'username': 'testuser',
            'email': 'test@example.com',
            'password': 'testpass123',
            'password2': 'testpass123',
            'role': 'student'
        }
    
    def test_user_registration(self):
        """Test user registration endpoint"""
        response = self.client.post(self.register_url, self.user_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertIn('tokens', response.data)
        self.assertIn('user', response.data)
        self.assertEqual(response.data['user']['username'], 'testuser')
    
    def test_user_login(self):
        """Test user login endpoint"""
        # First create a user
        User.objects.create_user(
            username='testuser',
            email='test@example.com',
            password='testpass123'
        )
        
        # Then try to login
        login_data = {
            'username': 'testuser',
            'password': 'testpass123'
        }
        response = self.client.post(self.login_url, login_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn('access', response.data)
        self.assertIn('refresh', response.data)
    
    def test_duplicate_email(self):
        """Test registration with duplicate email"""
        # Create first user
        self.client.post(self.register_url, self.user_data, format='json')
        
        # Try to create second user with same email
        duplicate_data = self.user_data.copy()
        duplicate_data['username'] = 'anotheruser'
        response = self.client.post(self.register_url, duplicate_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
    
    def test_password_mismatch(self):
        """Test registration with mismatched passwords"""
        invalid_data = self.user_data.copy()
        invalid_data['password2'] = 'differentpass'
        response = self.client.post(self.register_url, invalid_data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
