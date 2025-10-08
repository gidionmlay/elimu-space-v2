/**
 * Student Dashboard
 * Shows enrolled courses, progress, certificates, and achievements
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faChartLine,
  faTrophy,
  faCertificate,
  faFire,
  faBell,
  faGraduationCap
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api';
import { useToast } from '@/components/ui/use-toast';
import HeaderHero from '@/components/HeaderHero';
import FooterRedesign from '@/components/FooterRedesign';

interface StudentStats {
  role: string;
  total_courses: number;
  completed_courses: number;
  in_progress_courses: number;
  total_learning_time: number;
  achievements_count: number;
  current_streak: number;
  longest_streak: number;
  total_certificates: number;
  unread_notifications: number;
}

const StudentDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<StudentStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      setIsLoading(true);
      const response = await api.get(API_ENDPOINTS.DASHBOARD.STATS);
      setStats(response.data);
    } catch (error: any) {
      toast({
        title: 'Error',
        description: 'Failed to load dashboard data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged out successfully',
        description: 'See you next time!',
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#F97316]"></div>
          <p className="mt-4 text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <HeaderHero />

      {/* Dashboard Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Welcome back, {user?.full_name || user?.username}! 👋
          </h1>
          <p className="text-gray-600">Here's your learning progress overview</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {/* Total Courses */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faBook} className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{stats?.total_courses || 0}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Courses</h3>
          </div>

          {/* Completed Courses */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faGraduationCap} className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{stats?.completed_courses || 0}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Completed</h3>
          </div>

          {/* Learning Streak */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faFire} className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{stats?.current_streak || 0}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Day Streak</h3>
          </div>

          {/* Certificates */}
          <div className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faCertificate} className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold text-gray-800">{stats?.total_certificates || 0}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Certificates</h3>
          </div>
        </div>

        {/* Progress Section */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {/* In Progress Courses */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faChartLine} className="text-blue-600" />
              In Progress
            </h3>
            <p className="text-3xl font-bold text-blue-600">{stats?.in_progress_courses || 0}</p>
            <p className="text-sm text-gray-600 mt-2">courses active</p>
            <Link
              to="/courses"
              className="mt-4 inline-block text-blue-600 hover:text-blue-700 font-medium text-sm"
            >
              View all courses →
            </Link>
          </div>

          {/* Achievements */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faTrophy} className="text-yellow-600" />
              Achievements
            </h3>
            <p className="text-3xl font-bold text-yellow-600">{stats?.achievements_count || 0}</p>
            <p className="text-sm text-gray-600 mt-2">badges earned</p>
          </div>

          {/* Learning Time */}
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4">Total Learning Time</h3>
            <p className="text-3xl font-bold text-green-600">
              {Math.floor((stats?.total_learning_time || 0) / 60)}h {(stats?.total_learning_time || 0) % 60}m
            </p>
            <p className="text-sm text-gray-600 mt-2">hours invested</p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="bg-white rounded-xl p-6 shadow-lg mb-8">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Link
              to="/courses"
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-blue-500 hover:bg-blue-50 transition-all text-center"
            >
              <FontAwesomeIcon icon={faBook} className="w-6 h-6 text-blue-600 mb-2" />
              <p className="text-sm font-medium text-gray-700">Browse Courses</p>
            </Link>
            
            <button
              onClick={() => {}}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-purple-500 hover:bg-purple-50 transition-all text-center"
            >
              <FontAwesomeIcon icon={faTrophy} className="w-6 h-6 text-purple-600 mb-2" />
              <p className="text-sm font-medium text-gray-700">My Achievements</p>
            </button>
            
            <button
              onClick={() => {}}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-green-500 hover:bg-green-50 transition-all text-center"
            >
              <FontAwesomeIcon icon={faCertificate} className="w-6 h-6 text-green-600 mb-2" />
              <p className="text-sm font-medium text-gray-700">Certificates</p>
            </button>
            
            <button
              onClick={handleLogout}
              className="p-4 border-2 border-gray-200 rounded-lg hover:border-red-500 hover:bg-red-50 transition-all text-center"
            >
              <p className="text-sm font-medium text-gray-700">Logout</p>
            </button>
          </div>
        </div>

        {/* User Info */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-2">Your Profile</h3>
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
              <FontAwesomeIcon icon={faUser} className="w-8 h-8" />
            </div>
            <div>
              <p className="font-bold text-lg">{user.full_name || user.username}</p>
              <p className="text-blue-100">{user.email}</p>
              <p className="text-sm text-blue-200 capitalize">Role: {user.role}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <FooterRedesign />
    </div>
  );
};

export default StudentDashboard;

