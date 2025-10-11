/**
 * Earnings Card Component
 * Displays earnings information for instructor
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoneyBillWave,
  faArrowUp,
  faArrowDown,
  faClock,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';

interface EarningsCardProps {
  totalEarnings: number;
  pendingEarnings: number;
  monthlyEarnings?: number;
  previousMonthEarnings?: number;
  currency?: string;
}

const EarningsCard: React.FC<EarningsCardProps> = ({
  totalEarnings,
  pendingEarnings,
  monthlyEarnings,
  previousMonthEarnings,
  currency = 'TSh',
}) => {
  // Safely calculate monthly growth
  const monthlyGrowth =
    monthlyEarnings && previousMonthEarnings && previousMonthEarnings > 0
      ? ((Number(monthlyEarnings) - Number(previousMonthEarnings)) / Number(previousMonthEarnings)) * 100
      : 0;

  const isPositiveGrowth = monthlyGrowth >= 0;

  return (
    <div className="bg-gradient-to-br from-purple-600 to-pink-600 rounded-xl shadow-lg p-6 text-white">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold">Earnings Overview</h3>
        <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center">
          <FontAwesomeIcon icon={faMoneyBillWave} className="w-6 h-6" />
        </div>
      </div>

      {/* Total Earnings */}
      <div className="mb-6">
        <p className="text-purple-200 text-sm mb-1">Total Earnings</p>
        <p className="text-4xl font-bold">
          {currency} {Number(totalEarnings || 0).toLocaleString()}
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        {/* Pending Earnings */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon icon={faClock} className="w-4 h-4 text-yellow-300" />
            <span className="text-xs text-purple-200">Pending</span>
          </div>
          <p className="text-xl font-bold">
            {currency} {Number(pendingEarnings || 0).toLocaleString()}
          </p>
        </div>

        {/* Available */}
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 text-green-300" />
            <span className="text-xs text-purple-200">Available</span>
          </div>
          <p className="text-xl font-bold">
            {currency} {(Number(totalEarnings || 0) - Number(pendingEarnings || 0)).toLocaleString()}
          </p>
        </div>
      </div>

      {/* Monthly Earnings */}
      {monthlyEarnings !== undefined && monthlyEarnings !== null && (
        <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-purple-200">This Month</span>
            {previousMonthEarnings !== undefined && previousMonthEarnings !== null && (
              <div className={`flex items-center gap-1 text-xs font-semibold ${isPositiveGrowth ? 'text-green-300' : 'text-red-300'}`}>
                <FontAwesomeIcon icon={isPositiveGrowth ? faArrowUp : faArrowDown} className="w-3 h-3" />
                <span>{Math.abs(Number(monthlyGrowth || 0)).toFixed(1)}%</span>
              </div>
            )}
          </div>
          <p className="text-2xl font-bold">
            {currency} {Number(monthlyEarnings || 0).toLocaleString()}
          </p>
        </div>
      )}

      {/* Withdraw Button */}
      <button className="w-full mt-6 bg-white text-purple-600 py-3 rounded-lg font-semibold hover:bg-purple-50 transition-all duration-300 flex items-center justify-center gap-2">
        <FontAwesomeIcon icon={faMoneyBillWave} className="w-4 h-4" />
        Request Payout
      </button>
    </div>
  );
};

export default EarningsCard;

