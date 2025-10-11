/**
 * Step 3: Pricing & Access
 * Set course price, discounts, and visibility
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMoneyBillWave,
  faPercent,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

interface PricingStepProps {
  data: {
    is_free: boolean;
    price: number;
    discount?: number;
    is_published: boolean;
  };
  onChange: (data: any) => void;
}

const PricingStep: React.FC<PricingStepProps> = ({ data, onChange }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      onChange({ ...data, [name]: checked });
    } else if (type === 'number') {
      onChange({ ...data, [name]: Number(value) });
    } else {
      onChange({ ...data, [name]: value });
    }
  };

  const handleAccessTypeChange = (isFree: boolean) => {
    onChange({
      ...data,
      is_free: isFree,
      price: isFree ? 0 : data.price,
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pricing & Access</h2>
        <p className="text-gray-600">Set your course price and visibility settings</p>
      </div>

      {/* Access Type */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Course Access Type <span className="text-red-500">*</span>
        </label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Free Course */}
          <button
            type="button"
            onClick={() => handleAccessTypeChange(true)}
            className={`p-6 border-2 rounded-xl transition-all text-left ${
              data.is_free
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faEye} className="w-6 h-6 text-emerald-600" />
              </div>
              {data.is_free && (
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faEye} className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Free Course</h3>
            <p className="text-sm text-gray-600">
              Make your course accessible to everyone at no cost
            </p>
          </button>

          {/* Paid Course */}
          <button
            type="button"
            onClick={() => handleAccessTypeChange(false)}
            className={`p-6 border-2 rounded-xl transition-all text-left ${
              !data.is_free
                ? 'border-emerald-500 bg-emerald-50'
                : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="flex items-start justify-between mb-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <FontAwesomeIcon icon={faMoneyBillWave} className="w-6 h-6 text-purple-600" />
              </div>
              {!data.is_free && (
                <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={faMoneyBillWave} className="w-3 h-3 text-white" />
                </div>
              )}
            </div>
            <h3 className="font-bold text-gray-900 mb-1">Paid Course</h3>
            <p className="text-sm text-gray-600">
              Set a price and earn from your course
            </p>
          </button>
        </div>
      </div>

      {/* Price Input (if paid) */}
      {!data.is_free && (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Course Price (TSh) <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                TSh
              </span>
              <input
                type="number"
                name="price"
                value={data.price || ''}
                onChange={handleInputChange}
                className="w-full pl-16 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="0"
                min="0"
                step="1000"
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              Platform fee: 15% of course price
            </p>
          </div>

          {/* Discount */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Discount (Optional)
            </label>
            <div className="relative">
              <input
                type="number"
                name="discount"
                value={data.discount || ''}
                onChange={handleInputChange}
                className="w-full px-4 py-3 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
                placeholder="0"
                min="0"
                max="100"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 font-medium">
                <FontAwesomeIcon icon={faPercent} className="w-4 h-4" />
              </span>
            </div>
            {data.discount && data.discount > 0 && (
              <p className="mt-2 text-sm text-emerald-600 font-medium">
                Final Price: TSh {((Number(data.price || 0) * (100 - Number(data.discount))) / 100).toLocaleString()}
              </p>
            )}
          </div>
        </div>
      )}

      {/* Visibility */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Course Visibility
        </label>
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-center gap-3">
            <FontAwesomeIcon icon={faEyeSlash} className="w-5 h-5 text-yellow-600" />
            <div>
              <p className="font-medium text-gray-900">Draft Mode</p>
              <p className="text-sm text-gray-600">
                Course is not visible to students. You can publish it in the final step.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Summary Card */}
      {!data.is_free && data.price > 0 && (
        <div className="bg-gradient-to-br from-purple-50 to-blue-50 border border-purple-200 rounded-xl p-6">
          <h3 className="font-bold text-gray-900 mb-4">Pricing Summary</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-gray-600">Course Price:</span>
              <span className="font-bold text-gray-900">TSh {Number(data.price || 0).toLocaleString()}</span>
            </div>
            {data.discount && data.discount > 0 && (
              <>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Discount ({data.discount}%):</span>
                  <span className="font-bold text-red-600">
                    - TSh {((Number(data.price || 0) * Number(data.discount)) / 100).toLocaleString()}
                  </span>
                </div>
                <div className="border-t border-purple-200 pt-2 mt-2">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">Final Price:</span>
                    <span className="font-bold text-emerald-600 text-lg">
                      TSh {((Number(data.price || 0) * (100 - Number(data.discount))) / 100).toLocaleString()}
                    </span>
                  </div>
                </div>
              </>
            )}
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-500">Platform Fee (15%):</span>
              <span className="text-gray-700">
                TSh {((Number(data.price || 0) * 15) / 100).toLocaleString()}
              </span>
            </div>
            <div className="flex items-center justify-between border-t border-purple-200 pt-2 mt-2">
              <span className="font-medium text-gray-900">Your Earnings:</span>
              <span className="font-bold text-purple-600 text-lg">
                TSh {((Number(data.price || 0) * 85) / 100).toLocaleString()}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PricingStep;

