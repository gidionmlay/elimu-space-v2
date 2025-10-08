/**
 * Admin Dashboard
 * Shows platform analytics, user management, course approvals
 */

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUsers,
  faBook,
  faChartLine,
  faUserGraduate,
  faChalkboardTeacher,
  faCheckCircle,
  faClock
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api';
import { useToast } from '@/components/ui/use-toast';
import HeaderHero from '@/components/HeaderHero';
import FooterRedesign from '@/components/FooterRedesign';

interface AdminStats {
  role: string;
  total_users: number;
  total_students: number;
  total_instructors: number;
  total_courses: number;
  published_courses: number;
  pending_courses: number;
  total_enrollments: number;
  active_enrollments: number;
  completed_enrollments: number;
  total_reviews: number;
  admin_level: string;
  can_approve_courses: boolean;
  can_manage_users: boolean;
}

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<AdminStats | null>(null);
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

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#F97316]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <HeaderHero />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Admin Dashboard 🛡️
          </h1>
          <p className="text-gray-600">Platform analytics and management</p>
          <p className="text-sm text-gray-500 mt-1 capitalize">Admin Level: {stats?.admin_level}</p>
        </div>

        {/* Overview Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold">{stats?.total_users || 0}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Users</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faUserGraduate} className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold">{stats?.total_students || 0}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Students</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faChalkboardTeacher} className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold">{stats?.total_instructors || 0}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Instructors</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faBook} className="w-6 h-6 text-orange-600" />
              </div>
              <span className="text-2xl font-bold">{stats?.total_courses || 0}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Courses</h3>
          </div>
        </div>

        {/* Course Management */}
        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faCheckCircle} className="text-green-600" />
              Published Courses
            </h3>
            <p className="text-4xl font-bold text-green-600">{stats?.published_courses || 0}</p>
            <p className="text-sm text-gray-600 mt-2">live on platform</p>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
              <FontAwesomeIcon icon={faClock} className="text-yellow-600" />
              Pending Approval
            </h3>
            <p className="text-4xl font-bold text-yellow-600">{stats?.pending_courses || 0}</p>
            <p className="text-sm text-gray-600 mt-2">awaiting review</p>
          </div>
        </div>

        {/* Enrollments Overview */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white">
          <h3 className="text-xl font-bold mb-4">Enrollment Statistics</h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <p className="text-blue-100 text-sm mb-1">Total Enrollments</p>
              <p className="text-3xl font-bold">{stats?.total_enrollments || 0}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-1">Active Students</p>
              <p className="text-3xl font-bold">{stats?.active_enrollments || 0}</p>
            </div>
            <div>
              <p className="text-blue-100 text-sm mb-1">Completions</p>
              <p className="text-3xl font-bold">{stats?.completed_enrollments || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <FooterRedesign />
    </div>
  );
};

export default AdminDashboard;

