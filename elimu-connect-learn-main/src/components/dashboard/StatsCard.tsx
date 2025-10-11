/**
 * Stats Card Component
 * Reusable card for displaying dashboard statistics
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import { motion } from 'framer-motion';

interface StatsCardProps {
  icon: IconDefinition;
  title: string;
  value: string | number;
  bgColor?: string;
  iconColor?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

const StatsCard: React.FC<StatsCardProps> = ({
  icon,
  title,
  value,
  bgColor = 'bg-blue-100',
  iconColor = 'text-blue-600',
  trend,
}) => {
  return (
    <motion.div
      whileHover={{ y: -5 }}
      className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300"
    >
      <div className="flex items-center justify-between mb-4">
        <div className={`w-14 h-14 ${bgColor} rounded-lg flex items-center justify-center`}>
          <FontAwesomeIcon icon={icon} className={`w-7 h-7 ${iconColor}`} />
        </div>
        <span className="text-3xl font-bold text-gray-800">{value}</span>
      </div>
      <h3 className="text-sm font-medium text-gray-600 mb-1">{title}</h3>
      {trend && (
        <div className={`text-xs font-medium ${trend.isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}% from last month
        </div>
      )}
    </motion.div>
  );
};

export default StatsCard;

