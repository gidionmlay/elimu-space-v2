/**
 * Cloudinary Service
 * Handles file uploads to Cloudinary cloud storage
 */

import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME || '',
  api_key: process.env.CLOUDINARY_API_KEY || '',
  api_secret: process.env.CLOUDINARY_API_SECRET || '',
});

export interface UploadResult {
  url: string;
  secure_url: string;
  public_id: string;
  format: string;
  resource_type: string;
  bytes: number;
  width?: number;
  height?: number;
  duration?: number;
}

/**
 * Upload a file buffer to Cloudinary
 */
export function uploadBuffer(
  buffer: Buffer,
  options: {
    folder?: string;
    resource_type?: 'image' | 'video' | 'raw' | 'auto';
    transformation?: any;
  } = {}
): Promise<UploadResult> {
  return new Promise((resolve, reject) => {
    const uploadOptions = {
      folder: options.folder || 'elimu-space',
      resource_type: options.resource_type || 'auto',
      transformation: options.transformation,
    };

    const uploadStream = cloudinary.uploader.upload_stream(
      uploadOptions,
      (error: UploadApiErrorResponse | undefined, result: UploadApiResponse | undefined) => {
        if (error) {
          console.error('Cloudinary upload error:', error);
          return reject(error);
        }

        if (!result) {
          return reject(new Error('Upload failed: No result returned'));
        }

        resolve({
          url: result.url,
          secure_url: result.secure_url,
          public_id: result.public_id,
          format: result.format,
          resource_type: result.resource_type,
          bytes: result.bytes,
          width: result.width,
          height: result.height,
          duration: result.duration,
        });
      }
    );

    uploadStream.end(buffer);
  });
}

/**
 * Upload a course thumbnail
 */
export async function uploadThumbnail(buffer: Buffer): Promise<UploadResult> {
  return uploadBuffer(buffer, {
    folder: 'elimu-space/courses/thumbnails',
    resource_type: 'image',
    transformation: {
      width: 1280,
      height: 720,
      crop: 'fill',
      quality: 'auto:good',
    },
  });
}

/**
 * Upload a course preview video
 */
export async function uploadVideo(buffer: Buffer): Promise<UploadResult> {
  return uploadBuffer(buffer, {
    folder: 'elimu-space/courses/videos',
    resource_type: 'video',
  });
}

/**
 * Upload course resource file (PDF, documents, etc.)
 */
export async function uploadResource(buffer: Buffer, filename: string): Promise<UploadResult> {
  return uploadBuffer(buffer, {
    folder: 'elimu-space/courses/resources',
    resource_type: 'raw',
  });
}

/**
 * Delete a file from Cloudinary
 */
export async function deleteFile(publicId: string): Promise<void> {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error('Cloudinary delete error:', error);
    throw error;
  }
}

/**
 * Check if Cloudinary is configured
 */
export function isConfigured(): boolean {
  return !!(
    process.env.CLOUDINARY_CLOUD_NAME &&
    process.env.CLOUDINARY_API_KEY &&
    process.env.CLOUDINARY_API_SECRET
  );
}

export default {
  uploadBuffer,
  uploadThumbnail,
  uploadVideo,
  uploadResource,
  deleteFile,
  isConfigured,
};

