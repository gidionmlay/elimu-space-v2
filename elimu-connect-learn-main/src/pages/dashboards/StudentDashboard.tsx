/**
 * Student Dashboard - Modern Professional UI
 * Redesigned to match platforms like Coursera, Udemy, Niajiri
 * Clean layout with sidebar navigation and stat cards
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
  faGraduationCap,
  faSpinner,
  faClock,
  faArrowRight,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import dashboardService from '@/services/dashboardService';
import {
  DashboardStats,
  Enrollment,
  Certificate,
  Notification,
} from '@/types';
import EnrolledCourseCard from '@/components/dashboard/EnrolledCourseCard';
import CertificateCard from '@/components/dashboard/CertificateCard';
import NotificationItem from '@/components/dashboard/NotificationItem';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const StudentDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // State management
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [enrolledCourses, setEnrolledCourses] = useState<Enrollment[]>([]);
  const [certificates, setCertificates] = useState<Certificate[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'courses' | 'certificates' | 'activity'>('courses');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /**
   * Fetch all dashboard data
   */
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch all data in parallel
      const [statsData, coursesData, certificatesData, notificationsData] = await Promise.all([
        dashboardService.getStats().catch(() => null),
        dashboardService.getEnrolledCourses().catch(() => []),
        dashboardService.getCertificates().catch(() => []),
        dashboardService.getNotifications(5).catch(() => []),
      ]);

      setStats(statsData);
      setEnrolledCourses(coursesData);
      setCertificates(certificatesData);
      setNotifications(notificationsData);
    } catch (error: any) {
      console.error('Dashboard data fetch error:', error);
      toast({
        title: 'Error',
        description: 'Failed to load some dashboard data',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Handle notification mark as read
   */
  const handleNotificationRead = (notificationId: number) => {
    setNotifications((prev) =>
      prev.map((notif) =>
        notif.id === notificationId ? { ...notif, is_read: true } : notif
      )
    );
    if (stats) {
      setStats({
        ...stats,
        unread_notifications: Math.max(0, stats.unread_notifications - 1),
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout userRole="student">
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <FontAwesomeIcon
              icon={faSpinner}
              className="w-12 h-12 text-emerald-500 animate-spin"
            />
            <p className="mt-4 text-gray-600 font-medium">Loading your dashboard...</p>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout userRole="student">
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Welcome back, {user?.full_name || user?.username}! 👋
            </h1>
            <p className="text-gray-600 mt-1">Track your progress and continue learning</p>
          </div>
          <Link
            to="/courses"
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-all"
          >
            Browse Courses
            <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Courses */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.total_courses || 0}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faBook} className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Completed */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.completed_courses || 0}</p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faGraduationCap} className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Learning Streak */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Day Streak</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.current_streak || 0}</p>
              </div>
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faFire} className="w-6 h-6 text-orange-600" />
              </div>
            </div>
          </div>

          {/* Certificates */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Certificates</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.total_certificates || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faCertificate} className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Quick Stats Row */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* In Progress */}
          <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <FontAwesomeIcon icon={faChartLine} className="w-5 h-5" />
              <span className="font-medium">In Progress</span>
            </div>
            <p className="text-3xl font-bold">{stats?.in_progress_courses || 0}</p>
            <p className="text-sm text-blue-100 mt-2">courses active</p>
          </div>

          {/* Achievements */}
          <div className="bg-gradient-to-br from-yellow-500 to-orange-500 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <FontAwesomeIcon icon={faTrophy} className="w-5 h-5" />
              <span className="font-medium">Achievements</span>
            </div>
            <p className="text-3xl font-bold">{stats?.achievements_count || 0}</p>
            <p className="text-sm text-yellow-100 mt-2">badges earned</p>
          </div>

          {/* Learning Time */}
          <div className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-xl p-6 text-white">
            <div className="flex items-center gap-3 mb-3">
              <FontAwesomeIcon icon={faClock} className="w-5 h-5" />
              <span className="font-medium">Learning Time</span>
            </div>
            <p className="text-3xl font-bold">
              {Math.floor((stats?.total_learning_time || 0) / 60)}h
            </p>
            <p className="text-sm text-emerald-100 mt-2">hours invested</p>
          </div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white rounded-xl border border-gray-200">
          {/* Tab Headers */}
          <div className="border-b border-gray-200">
            <div className="flex gap-8 px-6">
              <button
                onClick={() => setActiveTab('courses')}
                className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                  activeTab === 'courses'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                My Courses ({enrolledCourses.length})
              </button>
              <button
                onClick={() => setActiveTab('certificates')}
                className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                  activeTab === 'certificates'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Certificates ({certificates.length})
              </button>
              <button
                onClick={() => setActiveTab('activity')}
                className={`py-4 px-2 font-medium border-b-2 transition-colors relative ${
                  activeTab === 'activity'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Recent Activity ({notifications.length})
                {stats && stats.unread_notifications > 0 && (
                  <span className="absolute -top-1 -right-2 bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                    {stats.unread_notifications}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Tab Content */}
          <div className="p-6">
            {/* Courses Tab */}
            {activeTab === 'courses' && (
              <div>
                {enrolledCourses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {enrolledCourses.map((enrollment) => (
                      <EnrolledCourseCard key={enrollment.id} enrollment={enrollment} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FontAwesomeIcon icon={faBook} className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Enrolled Courses</h3>
                    <p className="text-gray-600 mb-6">Start your learning journey today!</p>
                    <Link
                      to="/courses"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all"
                    >
                      Browse Courses
                      <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <div>
                {certificates.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {certificates.map((certificate) => (
                      <CertificateCard key={certificate.id} certificate={certificate} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FontAwesomeIcon icon={faCertificate} className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Certificates Yet</h3>
                    <p className="text-gray-600 mb-6">Complete courses to earn certificates!</p>
                    <Link
                      to="/courses"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all"
                    >
                      View Courses
                      <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                    </Link>
                  </div>
                )}
              </div>
            )}

            {/* Activity Tab */}
            {activeTab === 'activity' && (
              <div>
                {notifications.length > 0 ? (
                  <div className="space-y-3">
                    {notifications.map((notification) => (
                      <NotificationItem
                        key={notification.id}
                        notification={notification}
                        onMarkRead={handleNotificationRead}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FontAwesomeIcon icon={faCheckCircle} className="w-10 h-10 text-emerald-500" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">You're All Caught Up!</h3>
                    <p className="text-gray-600">No new notifications at this time</p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default StudentDashboard;
