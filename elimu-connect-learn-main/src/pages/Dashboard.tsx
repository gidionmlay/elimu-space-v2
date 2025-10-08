/**
 * Main Dashboard Page - Routes to role-specific dashboards
 */

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import ProtectedRoute from '@/components/ProtectedRoute';
import StudentDashboard from '@/pages/dashboards/StudentDashboard';
import InstructorDashboard from '@/pages/dashboards/InstructorDashboard';
import AdminDashboard from '@/pages/dashboards/AdminDashboard';

const Dashboard: React.FC = () => {
  const { user, isLoading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  if (isLoading || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#F97316]"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Render appropriate dashboard based on user role
  return (
    <ProtectedRoute>
      {user.role === 'student' && <StudentDashboard />}
      {user.role === 'instructor' && <InstructorDashboard />}
      {user.role === 'admin' && <AdminDashboard />}
      {!['student', 'instructor', 'admin'].includes(user.role) && (
        <div className="min-h-screen flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">Unknown Role</h2>
            <p className="text-gray-600 mt-2">Your account role is not recognized.</p>
          </div>
        </div>
      )}
    </ProtectedRoute>
  );
};

export default Dashboard;

