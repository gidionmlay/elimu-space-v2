/**
 * Instructor Dashboard
 * Shows uploaded courses, earnings, student analytics
 */

import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faUsers,
  faStar,
  faMoneyBillWave,
  faChartBar,
  faCheckCircle
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/contexts/AuthContext';
import api from '@/lib/api';
import { API_ENDPOINTS } from '@/config/api';
import { useToast } from '@/components/ui/use-toast';
import HeaderHero from '@/components/HeaderHero';
import FooterRedesign from '@/components/FooterRedesign';

interface InstructorStats {
  role: string;
  total_courses_created: number;
  published_courses: number;
  draft_courses: number;
  total_students: number;
  average_rating: number;
  total_reviews: number;
  total_earnings: number;
  pending_earnings: number;
  is_verified: boolean;
  unread_notifications: number;
}

const InstructorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [stats, setStats] = useState<InstructorStats | null>(null);
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
            Instructor Dashboard 🎓
          </h1>
          <p className="text-gray-600">Manage your courses and track your earnings</p>
        </div>

        {/* Verification Badge */}
        {stats?.is_verified && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 flex items-center gap-3">
            <FontAwesomeIcon icon={faCheckCircle} className="w-6 h-6 text-green-600" />
            <div>
              <p className="font-semibold text-green-800">Verified Instructor</p>
              <p className="text-sm text-green-600">Your account is verified</p>
            </div>
          </div>
        )}

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faBook} className="w-6 h-6 text-blue-600" />
              </div>
              <span className="text-2xl font-bold">{stats?.total_courses_created || 0}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Courses</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-green-600" />
              </div>
              <span className="text-2xl font-bold">{stats?.total_students || 0}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Students</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faStar} className="w-6 h-6 text-yellow-600" />
              </div>
              <span className="text-2xl font-bold">{stats?.average_rating.toFixed(1) || '0.0'}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Average Rating</h3>
          </div>

          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faMoneyBillWave} className="w-6 h-6 text-purple-600" />
              </div>
              <span className="text-2xl font-bold">TSh {stats?.total_earnings.toLocaleString() || 0}</span>
            </div>
            <h3 className="text-sm font-medium text-gray-600">Total Earnings</h3>
          </div>
        </div>

        {/* Earnings Overview */}
        <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-xl p-6 text-white mb-8">
          <h3 className="text-xl font-bold mb-4">Earnings Overview</h3>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <p className="text-purple-100 text-sm mb-1">Pending Payout</p>
              <p className="text-3xl font-bold">TSh {stats?.pending_earnings.toLocaleString() || 0}</p>
            </div>
            <div>
              <p className="text-purple-100 text-sm mb-1">Published Courses</p>
              <p className="text-3xl font-bold">{stats?.published_courses || 0} / {stats?.total_courses_created || 0}</p>
            </div>
          </div>
        </div>
      </div>

      <FooterRedesign />
    </div>
  );
};

export default InstructorDashboard;

