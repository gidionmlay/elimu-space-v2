/**
 * Instructor Dashboard - Modern Professional UI
 * Redesigned to match platforms like Coursera, Udemy, Niajiri
 * Clean layout with sidebar navigation and analytics cards
 */

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBook,
  faUsers,
  faStar,
  faMoneyBillWave,
  faPlus,
  faCheckCircle,
  faSpinner,
  faChartBar,
  faArrowUp,
  faArrowDown,
  faClock,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import instructorService from '@/services/instructorService';
import {
  InstructorStats,
  InstructorCourse,
  CourseStudent,
  Notification,
} from '@/types';
import InstructorCourseCard from '@/components/dashboard/InstructorCourseCard';
import StudentCard from '@/components/dashboard/StudentCard';
import NotificationItem from '@/components/dashboard/NotificationItem';
import DashboardLayout from '@/components/layouts/DashboardLayout';

const InstructorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  // State management
  const [stats, setStats] = useState<InstructorStats | null>(null);
  const [courses, setCourses] = useState<InstructorCourse[]>([]);
  const [students, setStudents] = useState<CourseStudent[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'courses' | 'students' | 'analytics'>('courses');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  /**
   * Fetch all instructor dashboard data
   */
  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);

      // Fetch all data in parallel
      const [statsData, coursesData, studentsData, notificationsData] = await Promise.all([
        instructorService.getStats().catch(() => null),
        instructorService.getMyCourses().catch(() => []),
        instructorService.getAllStudents().catch(() => []),
        instructorService.getNotifications(5).catch(() => []),
      ]);

      setStats(statsData);
      setCourses(coursesData);
      setStudents(studentsData);
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
   * Handle course edit
   */
  const handleEditCourse = (courseId: number) => {
    toast({
      title: 'Coming soon',
      description: 'Course editing feature will be available soon',
    });
  };

  /**
   * Handle toggle course status
   */
  const handleToggleCourseStatus = async (courseId: number, currentStatus: string) => {
    try {
      const newStatus = currentStatus === 'published' ? 'draft' : 'published';
      await instructorService.toggleCourseStatus(courseId, newStatus);
      
      // Update local state
      setCourses((prev) =>
        prev.map((course) =>
          course.id === courseId ? { ...course, status: newStatus } : course
        )
      );

      toast({
        title: 'Success',
        description: `Course ${newStatus === 'published' ? 'published' : 'unpublished'} successfully`,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update course status',
        variant: 'destructive',
      });
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
        unread_notifications: Math.max(0, Number(stats.unread_notifications || 0) - 1),
      });
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <DashboardLayout userRole="instructor">
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
    <DashboardLayout userRole="instructor">
      <div className="p-6 space-y-6">
        {/* Welcome Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Instructor Dashboard 🎓
            </h1>
            <p className="text-gray-600 mt-1">Manage your courses and track performance</p>
          </div>
          {stats?.is_verified && (
            <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-emerald-50 text-emerald-700 rounded-lg border border-emerald-200">
              <FontAwesomeIcon icon={faCheckCircle} className="w-5 h-5" />
              <span className="font-medium">Verified Instructor</span>
            </div>
          )}
        </div>

        {/* Key Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Total Courses */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Courses</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.total_courses_created || 0}</p>
                <p className="text-sm text-emerald-600 mt-1 font-medium">
                  {stats?.published_courses || 0} Published
                </p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faBook} className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </div>

          {/* Total Students */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Students</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stats?.total_students || 0}</p>
                <p className="text-sm text-emerald-600 mt-1 font-medium">
                  {stats?.active_students || 0} Active
                </p>
              </div>
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faUsers} className="w-6 h-6 text-emerald-600" />
              </div>
            </div>
          </div>

          {/* Average Rating */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Average Rating</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  {Number(stats?.average_rating || 0).toFixed(1)}
                </p>
                <p className="text-sm text-gray-500 mt-1">
                  {stats?.total_reviews || 0} Reviews
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faStar} className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </div>

          {/* Total Earnings */}
          <div className="bg-white rounded-xl p-6 border border-gray-200 hover:shadow-lg transition-shadow">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Earnings</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">
                  TSh {Number(stats?.total_earnings || 0).toLocaleString()}
                </p>
                <p className="text-sm text-orange-600 mt-1 font-medium">
                  TSh {Number(stats?.pending_earnings || 0).toLocaleString()} Pending
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faMoneyBillWave} className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Earnings & Performance Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Earnings Card */}
          <div className="lg:col-span-2 bg-gradient-to-br from-purple-600 to-purple-700 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold">Earnings Overview</h3>
              <FontAwesomeIcon icon={faMoneyBillWave} className="w-6 h-6 opacity-75" />
            </div>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="text-purple-200 text-sm mb-1">Available for Payout</p>
                <p className="text-3xl font-bold">
                  TSh {((stats?.total_earnings || 0) - (stats?.pending_earnings || 0)).toLocaleString()}
                </p>
              </div>
              <div>
                <p className="text-purple-200 text-sm mb-1">Monthly Earnings</p>
                <p className="text-3xl font-bold">
                  TSh {(stats?.monthly_earnings || 0).toLocaleString()}
                </p>
                <div className="flex items-center gap-1 text-emerald-300 text-sm mt-1">
                  <FontAwesomeIcon icon={faArrowUp} className="w-3 h-3" />
                  <span>12% from last month</span>
                </div>
              </div>
            </div>
            <button className="mt-6 w-full bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all">
              Request Payout
            </button>
          </div>

          {/* Quick Stats */}
          <div className="space-y-4">
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center gap-3 mb-3">
                <FontAwesomeIcon icon={faChartBar} className="w-5 h-5 text-emerald-600" />
                <span className="font-semibold text-gray-900">Course Performance</span>
              </div>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Completion Rate</span>
                  <span className="font-semibold text-gray-900">
                    {Number(stats?.course_completion_rate || 0).toFixed(0)}%
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Enrollments</span>
                  <span className="font-semibold text-gray-900">
                    {stats?.total_enrollments || 0}
                  </span>
                </div>
              </div>
            </div>

            <div className="bg-emerald-50 rounded-xl p-6 border border-emerald-200">
              <div className="flex items-center gap-3">
                <FontAwesomeIcon icon={faClock} className="w-5 h-5 text-emerald-600" />
                <div>
                  <p className="font-semibold text-gray-900">Active Students</p>
                  <p className="text-2xl font-bold text-emerald-600 mt-1">
                    {stats?.active_students || 0}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Quick Action - View All Students */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold mb-2">My Students</h3>
              <p className="text-blue-100 mb-4">
                Track and manage all your enrolled learners
              </p>
              <button
                onClick={() => navigate('/instructor/students')}
                className="bg-white text-blue-600 px-6 py-2 rounded-lg font-semibold hover:bg-blue-50 transition-all inline-flex items-center gap-2"
              >
                <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
                View All Students
              </button>
            </div>
            <div className="hidden md:block">
              <div className="text-5xl font-bold">{stats?.total_students || 0}</div>
              <p className="text-blue-100 text-sm">Total Enrolled</p>
            </div>
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
                My Courses ({courses.length})
              </button>
              <button
                onClick={() => setActiveTab('students')}
                className={`py-4 px-2 font-medium border-b-2 transition-colors ${
                  activeTab === 'students'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Recent Students ({students.length})
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`py-4 px-2 font-medium border-b-2 transition-colors relative ${
                  activeTab === 'analytics'
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-gray-800'
                }`}
              >
                Recent Activity ({notifications.length})
                {stats && Number(stats.unread_notifications || 0) > 0 && (
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
                {courses.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {courses.map((course) => (
                      <InstructorCourseCard
                        key={course.id}
                        course={course}
                        onEdit={handleEditCourse}
                        onToggleStatus={handleToggleCourseStatus}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FontAwesomeIcon icon={faBook} className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Courses Yet</h3>
                    <p className="text-gray-600 mb-6">Create your first course to start teaching!</p>
                    <button
                      onClick={() => navigate('/instructor/courses/create')}
                      className="inline-flex items-center gap-2 px-6 py-3 bg-emerald-500 text-white rounded-lg font-semibold hover:bg-emerald-600 transition-all"
                    >
                      <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
                      Create Course
                    </button>
                  </div>
                )}
              </div>
            )}

            {/* Students Tab */}
            {activeTab === 'students' && (
              <div>
                {students.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {students.map((student) => (
                      <StudentCard key={student.id} student={student} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <FontAwesomeIcon icon={faUsers} className="w-10 h-10 text-gray-400" />
                    </div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-2">No Students Yet</h3>
                    <p className="text-gray-600">Students will appear here when they enroll in your courses</p>
                  </div>
                )}
              </div>
            )}

            {/* Analytics Tab */}
            {activeTab === 'analytics' && (
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

export default InstructorDashboard;
