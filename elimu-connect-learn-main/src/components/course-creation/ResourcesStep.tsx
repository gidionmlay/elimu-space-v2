/**
 * Step 4: Resources & Attachments
 * Upload files and add external resources
 */

import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faUpload,
  faFile,
  faTrash,
  faCheckCircle,
  faSpinner,
  faLink,
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from '@/components/ui/use-toast';
import courseService from '@/services/courseService';
import { Progress } from '@/components/ui/progress';

interface Resource {
  id: string;
  name: string;
  url: string;
  size?: number;
  type: 'file' | 'link';
}

interface ResourcesStepProps {
  data: {
    resources: Resource[];
  };
  onChange: (data: any) => void;
}

const ResourcesStep: React.FC<ResourcesStepProps> = ({ data, onChange }) => {
  const { toast } = useToast();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [externalLink, setExternalLink] = useState('');
  const [linkName, setLinkName] = useState('');

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    const file = files[0];

    // Validate file size (max 50MB)
    if (file.size > 50 * 1024 * 1024) {
      toast({
        title: 'File too large',
        description: 'File must be less than 50MB',
        variant: 'destructive',
      });
      return;
    }

    try {
      setUploading(true);
      setUploadProgress(0);

      const response = await courseService.uploadResource(file);

      const newResource: Resource = {
        id: `resource-${Date.now()}`,
        name: file.name,
        url: response.url,
        size: file.size,
        type: 'file',
      };

      onChange({
        resources: [...(data.resources || []), newResource],
      });

      toast({
        title: 'Success',
        description: 'Resource uploaded successfully',
      });

      setUploadProgress(100);
    } catch (error: any) {
      toast({
        title: 'Upload failed',
        description: error.message || 'Failed to upload resource',
        variant: 'destructive',
      });
    } finally {
      setUploading(false);
      setTimeout(() => setUploadProgress(0), 1000);
    }
  };

  const addExternalLink = () => {
    if (!externalLink.trim() || !linkName.trim()) {
      toast({
        title: 'Missing information',
        description: 'Please provide both link name and URL',
        variant: 'destructive',
      });
      return;
    }

    // Validate URL
    try {
      new URL(externalLink);
    } catch {
      toast({
        title: 'Invalid URL',
        description: 'Please enter a valid URL',
        variant: 'destructive',
      });
      return;
    }

    const newResource: Resource = {
      id: `link-${Date.now()}`,
      name: linkName,
      url: externalLink,
      type: 'link',
    };

    onChange({
      resources: [...(data.resources || []), newResource],
    });

    setExternalLink('');
    setLinkName('');

    toast({
      title: 'Link added',
      description: 'External resource added successfully',
    });
  };

  const removeResource = (resourceId: string) => {
    onChange({
      resources: (data.resources || []).filter((r) => r.id !== resourceId),
    });
  };

  const formatFileSize = (bytes?: number) => {
    if (!bytes) return '';
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Resources & Attachments</h2>
        <p className="text-gray-600">Add downloadable files and external links for students</p>
      </div>

      {/* File Upload */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Upload Files
        </label>
        <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 hover:border-emerald-500 transition-colors">
          <div className="text-center">
            <FontAwesomeIcon icon={faFile} className="w-12 h-12 text-gray-400 mb-3" />
            <div className="flex items-center justify-center gap-2">
              <label
                htmlFor="resource-upload"
                className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 bg-emerald-500 text-white rounded-lg font-medium hover:bg-emerald-600 transition-all"
              >
                <FontAwesomeIcon icon={faUpload} className="w-4 h-4" />
                {uploading ? 'Uploading...' : 'Upload File'}
              </label>
              <input
                id="resource-upload"
                type="file"
                onChange={handleFileUpload}
                className="hidden"
                disabled={uploading}
                accept=".pdf,.doc,.docx,.zip,.ppt,.pptx"
              />
            </div>
            <p className="text-xs text-gray-500 mt-2">
              PDF, DOC, DOCX, ZIP, PPT (Max 50MB)
            </p>
            {uploading && uploadProgress > 0 && (
              <div className="mt-4 max-w-xs mx-auto">
                <Progress value={uploadProgress} className="h-2" />
                <p className="text-sm text-gray-600 mt-1">{uploadProgress}%</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* External Links */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-3">
          External Resources
        </label>
        <div className="bg-white border border-gray-200 rounded-xl p-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <input
              type="text"
              value={linkName}
              onChange={(e) => setLinkName(e.target.value)}
              className="md:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="Link name"
            />
            <input
              type="url"
              value={externalLink}
              onChange={(e) => setExternalLink(e.target.value)}
              className="md:col-span-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
              placeholder="https://..."
            />
            <button
              onClick={addExternalLink}
              className="px-4 py-2 bg-blue-500 text-white rounded-lg font-medium hover:bg-blue-600 transition-all"
            >
              <FontAwesomeIcon icon={faLink} className="w-4 h-4 mr-2" />
              Add Link
            </button>
          </div>
        </div>
      </div>

      {/* Resources List */}
      {data.resources && data.resources.length > 0 && (
        <div>
          <h3 className="text-lg font-semibold text-gray-900 mb-3">
            Uploaded Resources ({data.resources.length})
          </h3>
          <div className="space-y-2">
            {data.resources.map((resource) => (
              <div
                key={resource.id}
                className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg hover:border-emerald-300 transition-all"
              >
                <div className="flex items-center gap-3 flex-1 min-w-0">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    resource.type === 'file' ? 'bg-blue-100' : 'bg-purple-100'
                  }`}>
                    <FontAwesomeIcon
                      icon={resource.type === 'file' ? faFile : faLink}
                      className={`w-5 h-5 ${
                        resource.type === 'file' ? 'text-blue-600' : 'text-purple-600'
                      }`}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 truncate">{resource.name}</p>
                    <div className="flex items-center gap-2">
                      <p className="text-xs text-gray-500 truncate">{resource.url}</p>
                      {resource.size && (
                        <span className="text-xs text-gray-400">
                          • {formatFileSize(resource.size)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => removeResource(resource.id)}
                  className="ml-3 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-all"
                >
                  <FontAwesomeIcon icon={faTrash} className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {(!data.resources || data.resources.length === 0) && (
        <div className="text-center py-8 bg-gray-50 rounded-xl">
          <p className="text-gray-500">No resources added yet</p>
          <p className="text-sm text-gray-400 mt-1">
            Upload files or add external links to enhance your course
          </p>
        </div>
      )}
    </div>
  );
};

export default ResourcesStep;

