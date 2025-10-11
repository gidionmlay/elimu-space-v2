/**
 * Step 1: Basic Info
 * Course title, description, category, level, language, thumbnail
 */

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faImage,
  faVideo,
  faCheckCircle,
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from '@/components/ui/use-toast';
import courseService from '@/services/courseService';

interface BasicInfoStepProps {
  data: {
    title: string;
    description: string;
    category: string;
    level: string;
    language: string;
    thumbnail?: string;
    preview_video?: string;
  };
  onChange: (data: any) => void;
}

const CATEGORIES = [
  'Agriculture',
  'Business & Entrepreneurship',
  'Technology & Programming',
  'Design & Creative',
  'Marketing & Sales',
  'Health & Wellness',
  'Languages',
  'Personal Development',
  'Science & Engineering',
  'Arts & Crafts',
];

const LANGUAGES = ['English', 'Swahili', 'French', 'Arabic', 'Other'];

const BasicInfoStep: React.FC<BasicInfoStepProps> = ({ data, onChange }) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    onChange({ ...data, [name]: value });
  };

  const handleThumbnailUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      toast({
        title: 'Invalid file',
        description: 'Please upload an image file',
        variant: 'destructive',
      });
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'Image must be less than 5MB',
        variant: 'destructive',
      });
      return;
    }

    try {
      setUploading(true);
      const response = await courseService.uploadThumbnail(file);
      onChange({ ...data, thumbnail: response.url });
      
      toast({
        title: 'Success',
        description: 'Thumbnail uploaded successfully',
      });
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload thumbnail',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
    }
  };

  const errors: Record<string, string> = {};
  if (!data.title?.trim()) errors.title = 'Title is required';
  if (!data.description?.trim()) errors.description = 'Description is required';
  if (data.description && data.description.length > 200) {
    errors.description = 'Description must be 200 characters or less';
  }
  if (!data.category) errors.category = 'Category is required';
  if (!data.level) errors.level = 'Level is required';
  if (!data.language) errors.language = 'Language is required';

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information</h2>
        <p className="text-gray-600">
          Let's start with the essential details about your course
        </p>
      </div>

      {/* Course Title */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Title <span className="text-red-500">*</span>
        </label>
        <input
          type="text"
          name="title"
          value={data.title || ''}
          onChange={handleInputChange}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
            errors.title ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="e.g., Complete Web Development Bootcamp"
          maxLength={100}
        />
        {errors.title && (
          <p className="mt-1 text-sm text-red-500">{errors.title}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          {data.title?.length || 0}/100 characters
        </p>
      </div>

      {/* Short Description */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Short Description <span className="text-red-500">*</span>
        </label>
        <textarea
          name="description"
          value={data.description || ''}
          onChange={handleInputChange}
          rows={3}
          className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
            errors.description ? 'border-red-500' : 'border-gray-300'
          }`}
          placeholder="A brief overview of what students will learn..."
          maxLength={200}
        />
        {errors.description && (
          <p className="mt-1 text-sm text-red-500">{errors.description}</p>
        )}
        <p className="mt-1 text-xs text-gray-500">
          {data.description?.length || 0}/200 characters
        </p>
      </div>

      {/* Category, Level, Language Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Category */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Category <span className="text-red-500">*</span>
          </label>
          <select
            name="category"
            value={data.category || ''}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
              errors.category ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select category</option>
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-500">{errors.category}</p>
          )}
        </div>

        {/* Level */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Level <span className="text-red-500">*</span>
          </label>
          <select
            name="level"
            value={data.level || ''}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
              errors.level ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select level</option>
            <option value="Beginner">Beginner</option>
            <option value="Intermediate">Intermediate</option>
            <option value="Advanced">Advanced</option>
          </select>
          {errors.level && (
            <p className="mt-1 text-sm text-red-500">{errors.level}</p>
          )}
        </div>

        {/* Language */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Language <span className="text-red-500">*</span>
          </label>
          <select
            name="language"
            value={data.language || ''}
            onChange={handleInputChange}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all ${
              errors.language ? 'border-red-500' : 'border-gray-300'
            }`}
          >
            <option value="">Select language</option>
            {LANGUAGES.map((lang) => (
              <option key={lang} value={lang}>
                {lang}
              </option>
            ))}
          </select>
          {errors.language && (
            <p className="mt-1 text-sm text-red-500">{errors.language}</p>
          )}
        </div>
      </div>

      {/* Thumbnail Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Course Thumbnail
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 hover:border-emerald-500 transition-colors">
          {data.thumbnail ? (
            <div className="relative">
              <img
                src={data.thumbnail}
                alt="Course thumbnail"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute top-2 right-2 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                <FontAwesomeIcon icon={faCheckCircle} className="w-3 h-3" />
                Uploaded
              </div>
              <button
                onClick={() => onChange({ ...data, thumbnail: undefined })}
                className="mt-2 text-sm text-red-600 hover:text-red-700 font-medium"
              >
                Remove
              </button>
            </div>
          ) : (
            <div className="text-center">
              <FontAwesomeIcon
                icon={faImage}
                className="w-12 h-12 text-gray-400 mb-3"
              />
              <div className="flex items-center justify-center gap-2">
                <label
                  htmlFor="thumbnail-upload"
                  className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-all"
                >
                  <FontAwesomeIcon icon={faUpload} className="w-4 h-4" />
                  {uploading ? 'Uploading...' : 'Upload Thumbnail'}
                </label>
                <input
                  id="thumbnail-upload"
                  type="file"
                  accept="image/*"
                  onChange={handleThumbnailUpload}
                  className="hidden"
                  disabled={uploading}
                />
              </div>
              <p className="text-xs text-gray-500 mt-2">
                Recommended: 1280x720px, Max 5MB
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Preview Video */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Preview Video (Optional)
        </label>
        <div className="flex gap-3">
          <input
            type="url"
            name="preview_video"
            value={data.preview_video || ''}
            onChange={handleInputChange}
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            placeholder="YouTube or Vimeo URL"
          />
          <button
            type="button"
            className="px-4 py-3 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-all"
          >
            <FontAwesomeIcon icon={faVideo} className="w-5 h-5" />
          </button>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Add a YouTube or Vimeo link to give students a preview
        </p>
      </div>
    </div>
  );
};

export default BasicInfoStep;

