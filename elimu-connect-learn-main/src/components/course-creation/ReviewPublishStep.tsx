/**
 * Step 5: Review & Publish
 * Final review of all course data before publishing
 */

import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faExclamationCircle,
  faBook,
  faFileAlt,
  faMoneyBillWave,
  faGlobe,
} from '@fortawesome/free-solid-svg-icons';
import { CourseDraft } from '@/services/courseService';

interface ReviewPublishStepProps {
  data: CourseDraft;
}

const ReviewPublishStep: React.FC<ReviewPublishStepProps> = ({ data }) => {
  // Validation checks
  const hasTitle = Boolean(data.title?.trim());
  const hasDescription = Boolean(data.description?.trim());
  const hasCategory = Boolean(data.category);
  const hasLevel = Boolean(data.level);
  const hasLanguage = Boolean(data.language);
  const hasModules = data.modules && data.modules.length > 0;
  const hasPricing = data.is_free || (data.price && data.price > 0);

  const isReadyToPublish =
    hasTitle &&
    hasDescription &&
    hasCategory &&
    hasLevel &&
    hasLanguage &&
    hasModules &&
    hasPricing;

  const totalLessons = data.modules?.reduce(
    (acc, module) => acc + (module.lessons?.length || 0),
    0
  ) || 0;

  const totalDuration = data.modules?.reduce(
    (moduleAcc, module) =>
      moduleAcc +
      (module.lessons?.reduce(
        (lessonAcc, lesson) => lessonAcc + Number(lesson.duration || 0),
        0
      ) || 0),
    0
  ) || 0;

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Publish</h2>
        <p className="text-gray-600">Review your course details before publishing</p>
      </div>

      {/* Validation Status */}
      <div
        className={`p-4 rounded-xl border-2 ${
          isReadyToPublish
            ? 'bg-emerald-50 border-emerald-200'
            : 'bg-yellow-50 border-yellow-200'
        }`}
      >
        <div className="flex items-start gap-3">
          <FontAwesomeIcon
            icon={isReadyToPublish ? faCheckCircle : faExclamationCircle}
            className={`w-6 h-6 mt-0.5 ${
              isReadyToPublish ? 'text-emerald-600' : 'text-yellow-600'
            }`}
          />
          <div>
            <h3 className={`font-bold ${isReadyToPublish ? 'text-emerald-900' : 'text-yellow-900'}`}>
              {isReadyToPublish ? 'Course is ready to publish!' : 'Almost there!'}
            </h3>
            <p className={`text-sm ${isReadyToPublish ? 'text-emerald-700' : 'text-yellow-700'}`}>
              {isReadyToPublish
                ? 'All required fields are completed. You can publish your course now.'
                : 'Please complete the missing required fields before publishing.'}
            </p>
          </div>
        </div>
      </div>

      {/* Checklist */}
      <div className="bg-white border border-gray-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-4">Completion Checklist</h3>
        <div className="space-y-3">
          {[
            { label: 'Course Title', status: hasTitle },
            { label: 'Description', status: hasDescription },
            { label: 'Category', status: hasCategory },
            { label: 'Level', status: hasLevel },
            { label: 'Language', status: hasLanguage },
            { label: 'Course Content (Modules & Lessons)', status: hasModules },
            { label: 'Pricing Information', status: hasPricing },
          ].map((item, index) => (
            <div key={index} className="flex items-center gap-3">
              <FontAwesomeIcon
                icon={faCheckCircle}
                className={`w-5 h-5 ${item.status ? 'text-emerald-500' : 'text-gray-300'}`}
              />
              <span className={item.status ? 'text-gray-900' : 'text-gray-500'}>
                {item.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Course Summary */}
      <div className="bg-gradient-to-br from-blue-50 to-purple-50 border border-blue-200 rounded-xl p-6">
        <h3 className="font-bold text-gray-900 mb-4">Course Summary</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Info */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Basic Information</p>
            <div className="space-y-2">
              <div>
                <p className="text-xs text-gray-500">Title</p>
                <p className="font-medium text-gray-900">{data.title || 'Not set'}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Category</p>
                <p className="font-medium text-gray-900">{data.category || 'Not set'}</p>
              </div>
              <div className="flex gap-4">
                <div>
                  <p className="text-xs text-gray-500">Level</p>
                  <p className="font-medium text-gray-900">{data.level || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Language</p>
                  <p className="font-medium text-gray-900">{data.language || 'Not set'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Content Stats */}
          <div>
            <p className="text-sm font-medium text-gray-600 mb-2">Content Statistics</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faBook} className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-gray-700">
                  <strong>{data.modules?.length || 0}</strong> Modules
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faFileAlt} className="w-4 h-4 text-green-600" />
                <span className="text-sm text-gray-700">
                  <strong>{totalLessons}</strong> Lessons
                </span>
              </div>
              <div className="flex items-center gap-2">
                <FontAwesomeIcon icon={faGlobe} className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-gray-700">
                  <strong>{Math.floor(totalDuration / 60)}h {totalDuration % 60}m</strong> Total Duration
                </span>
              </div>
            </div>
          </div>

          {/* Pricing */}
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-gray-600 mb-2">Pricing</p>
            <div className="flex items-center gap-2">
              <FontAwesomeIcon
                icon={faMoneyBillWave}
                className="w-4 h-4 text-emerald-600"
              />
              <span className="text-lg font-bold text-gray-900">
                {data.is_free ? (
                  'Free Course'
                ) : (
                  <>
                    TSh {Number(data.price || 0).toLocaleString()}
                    {data.discount && data.discount > 0 && (
                      <span className="ml-2 text-sm text-gray-500">
                        ({data.discount}% discount applied)
                      </span>
                    )}
                  </>
                )}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Warning if not ready */}
      {!isReadyToPublish && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <FontAwesomeIcon icon={faExclamationCircle} className="w-5 h-5 text-yellow-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-yellow-900">Cannot publish yet</h4>
              <p className="text-sm text-yellow-700 mt-1">
                Please go back and complete all required fields marked with *
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Thumbnail Preview */}
      {data.thumbnail && (
        <div>
          <p className="text-sm font-medium text-gray-700 mb-2">Thumbnail Preview</p>
          <img
            src={data.thumbnail}
            alt="Course thumbnail"
            className="w-full max-w-md h-48 object-cover rounded-xl border border-gray-200"
          />
        </div>
      )}
    </div>
  );
};

export default ReviewPublishStep;

