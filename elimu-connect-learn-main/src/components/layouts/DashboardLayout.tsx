/**
 * Professional Dashboard Layout
 * Clean sidebar navigation with main content area
 * Matches modern platforms like Coursera, Udemy, Niajiri
 */

import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faHome,
  faBook,
  faUsers,
  faChartLine,
  faCertificate,
  faBell,
  faGear,
  faSignOutAlt,
  faBars,
  faTimes,
  faUser,
  faMoneyBillWave,
  faPlus,
  faMessage,
} from '@fortawesome/free-solid-svg-icons';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

interface DashboardLayoutProps {
  children: React.ReactNode;
  userRole: 'student' | 'instructor' | 'admin';
}

interface NavItem {
  label: string;
  path: string;
  icon: any;
  role?: string[];
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children, userRole }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Navigation items based on role
  const getNavItems = (): NavItem[] => {
    const commonItems: NavItem[] = [
      { label: 'Dashboard', path: '/dashboard', icon: faHome },
      { label: 'Courses', path: '/courses', icon: faBook },
      { label: 'Notifications', path: '/dashboard', icon: faBell },
      { label: 'Settings', path: '/profile', icon: faGear },
    ];

    if (userRole === 'student') {
      return [
        ...commonItems.slice(0, 2),
        { label: 'Certificates', path: '/dashboard', icon: faCertificate },
        { label: 'Progress', path: '/dashboard', icon: faChartLine },
        ...commonItems.slice(2),
      ];
    } else if (userRole === 'instructor') {
      return [
        ...commonItems.slice(0, 1),
        { label: 'My Courses', path: '/dashboard', icon: faBook },
        { label: 'Students', path: '/dashboard', icon: faUsers },
        { label: 'Earnings', path: '/dashboard', icon: faMoneyBillWave },
        { label: 'Analytics', path: '/dashboard', icon: faChartLine },
        { label: 'Messages', path: '/dashboard', icon: faMessage },
        ...commonItems.slice(2),
      ];
    }

    return commonItems;
  };

  const navItems = getNavItems();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: 'Logged out successfully',
        description: 'See you next time!',
      });
      navigate('/login');
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const isActive = (path: string) => {
    return location.pathname === path;
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:sticky top-0 left-0 h-screen bg-white border-r border-gray-200 z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        } w-64 flex flex-col`}
      >
        {/* Logo/Brand */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-gray-200">
          <Link to="/" className="flex items-center gap-2">
            <img src="/logo.png" alt="Elimu Space" className="h-8 w-auto" />
            <span className="font-bold text-gray-800 text-lg">Elimu Space</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-gray-600 hover:text-gray-800"
          >
            <FontAwesomeIcon icon={faTimes} className="w-5 h-5" />
          </button>
        </div>

        {/* User Profile Card */}
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center flex-shrink-0">
              {user?.profile_image ? (
                <img
                  src={user.profile_image}
                  alt={user.full_name || user?.username}
                  className="w-full h-full rounded-full object-cover"
                />
              ) : (
                <FontAwesomeIcon icon={faUser} className="w-5 h-5 text-white" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm text-gray-800 truncate">
                {user?.full_name || user?.username}
              </p>
              <p className="text-xs text-gray-500 capitalize">{userRole}</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive(item.path)
                      ? 'bg-emerald-50 text-emerald-600 font-medium'
                      : 'text-gray-700 hover:bg-gray-100'
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <FontAwesomeIcon icon={item.icon} className="w-5 h-5" />
                  <span>{item.label}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Create Course Button (Instructor Only) */}
        {userRole === 'instructor' && (
          <div className="p-4 border-t border-gray-200">
            <button
              onClick={() => navigate('/instructor/courses/create')}
              className="w-full flex items-center justify-center gap-2 bg-emerald-500 text-white py-2.5 rounded-lg font-medium hover:bg-emerald-600 transition-all"
            >
              <FontAwesomeIcon icon={faPlus} className="w-4 h-4" />
              Create Course
            </button>
          </div>
        )}

        {/* Logout Button */}
        <div className="p-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-50 py-2.5 rounded-lg font-medium transition-all"
          >
            <FontAwesomeIcon icon={faSignOutAlt} className="w-4 h-4" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen">
        {/* Top Bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="lg:hidden text-gray-600 hover:text-gray-800"
          >
            <FontAwesomeIcon icon={faBars} className="w-6 h-6" />
          </button>

          <div className="flex items-center gap-4 ml-auto">
            {/* Notification Icon */}
            <button className="relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded-lg transition-all">
              <FontAwesomeIcon icon={faBell} className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>

            {/* User Menu */}
            <Link
              to="/profile"
              className="flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg transition-all"
            >
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-blue-600 flex items-center justify-center">
                {user?.profile_image ? (
                  <img
                    src={user.profile_image}
                    alt={user.full_name || user?.username}
                    className="w-full h-full rounded-full object-cover"
                  />
                ) : (
                  <FontAwesomeIcon icon={faUser} className="w-4 h-4 text-white" />
                )}
              </div>
              <span className="hidden md:block text-sm font-medium text-gray-800">
                {user?.full_name || user?.username}
              </span>
            </Link>
          </div>
        </header>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default DashboardLayout;

