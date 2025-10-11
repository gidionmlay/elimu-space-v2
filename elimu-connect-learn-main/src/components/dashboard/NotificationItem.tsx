/**
 * Notification Item Component
 * Displays individual notification with mark as read functionality
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBell,
  faCheckCircle,
  faExclamationCircle,
  faInfoCircle,
  faGraduationCap,
  faCertificate,
  faTrophy,
} from '@fortawesome/free-solid-svg-icons';
import { Notification } from '@/types';
import dashboardService from '@/services/dashboardService';
import { useToast } from '@/components/ui/use-toast';

interface NotificationItemProps {
  notification: Notification;
  onMarkRead?: (id: number) => void;
}

const NotificationItem: React.FC<NotificationItemProps> = ({ notification, onMarkRead }) => {
  const { toast } = useToast();

  const getIcon = (type: string) => {
    switch (type) {
      case 'success':
        return faCheckCircle;
      case 'warning':
        return faExclamationCircle;
      case 'error':
        return faExclamationCircle;
      case 'course':
        return faGraduationCap;
      case 'certificate':
        return faCertificate;
      case 'achievement':
        return faTrophy;
      default:
        return faInfoCircle;
    }
  };

  const getIconColor = (type: string) => {
    switch (type) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      case 'course':
        return 'text-blue-600 bg-blue-100';
      case 'certificate':
        return 'text-purple-600 bg-purple-100';
      case 'achievement':
        return 'text-orange-600 bg-orange-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const handleMarkRead = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (notification.is_read) return;

    try {
      await dashboardService.markNotificationRead(notification.id);
      if (onMarkRead) {
        onMarkRead(notification.id);
      }
      toast({
        title: 'Marked as read',
        variant: 'default',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark notification as read',
        variant: 'destructive',
      });
    }
  };

  const content = (
    <div
      className={`flex gap-4 p-4 rounded-lg border transition-all hover:shadow-md cursor-pointer ${
        notification.is_read
          ? 'bg-white border-gray-200'
          : 'bg-blue-50 border-blue-200 hover:bg-blue-100'
      }`}
    >
      {/* Icon */}
      <div className={`w-12 h-12 rounded-full flex items-center justify-center flex-shrink-0 ${getIconColor(notification.type)}`}>
        <FontAwesomeIcon icon={getIcon(notification.type)} className="w-6 h-6" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4 className={`font-semibold text-gray-800 ${!notification.is_read ? 'font-bold' : ''}`}>
            {notification.title}
          </h4>
          {!notification.is_read && (
            <button
              onClick={handleMarkRead}
              className="flex-shrink-0 text-blue-600 hover:text-blue-700 text-sm font-medium"
            >
              Mark read
            </button>
          )}
        </div>
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {notification.message}
        </p>
        <p className="text-xs text-gray-400 mt-2">
          {new Date(notification.created_at).toLocaleString()}
        </p>
      </div>

      {/* Unread Indicator */}
      {!notification.is_read && (
        <div className="w-3 h-3 bg-blue-600 rounded-full flex-shrink-0 mt-2"></div>
      )}
    </div>
  );

  if (notification.action_url) {
    return <Link to={notification.action_url}>{content}</Link>;
  }

  return content;
};

export default NotificationItem;

