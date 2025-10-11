/**
 * Upload Controller
 * Handles file uploads to cloud storage
 */

import { Request, Response } from 'express';
import cloudinaryService from '../services/cloudinaryService';

// Type for authenticated request
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

/**
 * Upload single file (generic endpoint)
 * POST /api/v1/upload/single
 */
export const uploadSingle = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file provided'
      });
    }

    // Check if Cloudinary is configured
    if (!cloudinaryService.isConfigured()) {
      return res.status(500).json({
        success: false,
        message: 'File upload service not configured. Please contact administrator.'
      });
    }

    const folder = req.body.folder || 'elimu-space';
    
    // Upload to Cloudinary
    const result = await cloudinaryService.uploadBuffer(req.file.buffer, {
      folder,
      resource_type: 'auto'
    });

    return res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        format: result.format,
        size: result.bytes,
        width: result.width,
        height: result.height,
        duration: result.duration,
      }
    });
  } catch (error: any) {
    console.error('Upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Upload failed',
      error: error.message || 'Unknown error'
    });
  }
};

/**
 * Upload course thumbnail (image only)
 * POST /api/v1/instructor/thumbnail
 * POST /api/v1/upload/thumbnail (alias)
 */
export const uploadThumbnail = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No thumbnail image provided'
      });
    }

    // Check if Cloudinary is configured
    if (!cloudinaryService.isConfigured()) {
      return res.status(500).json({
        success: false,
        message: 'File upload service not configured. Please contact administrator.'
      });
    }

    // Validate image type
    if (!req.file.mimetype.startsWith('image/')) {
      return res.status(400).json({
        success: false,
        message: 'Only image files are allowed for thumbnails'
      });
    }

    // Upload to Cloudinary with thumbnail-specific settings
    const result = await cloudinaryService.uploadThumbnail(req.file.buffer);

    return res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        width: result.width,
        height: result.height,
        size: result.bytes,
      }
    });
  } catch (error: any) {
    console.error('Thumbnail upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Thumbnail upload failed',
      error: error.message || 'Unknown error'
    });
  }
};

/**
 * Upload course video
 * POST /api/v1/upload/video
 */
export const uploadVideo = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No video file provided'
      });
    }

    // Check if Cloudinary is configured
    if (!cloudinaryService.isConfigured()) {
      return res.status(500).json({
        success: false,
        message: 'File upload service not configured. Please contact administrator.'
      });
    }

    // Validate video type
    if (!req.file.mimetype.startsWith('video/')) {
      return res.status(400).json({
        success: false,
        message: 'Only video files are allowed'
      });
    }

    // Upload to Cloudinary
    const result = await cloudinaryService.uploadVideo(req.file.buffer);

    return res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        duration: result.duration,
        format: result.format,
        size: result.bytes,
      }
    });
  } catch (error: any) {
    console.error('Video upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Video upload failed',
      error: error.message || 'Unknown error'
    });
  }
};

/**
 * Upload course resource file
 * POST /api/v1/upload/resource
 */
export const uploadResource = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: 'No file provided'
      });
    }

    // Check if Cloudinary is configured
    if (!cloudinaryService.isConfigured()) {
      return res.status(500).json({
        success: false,
        message: 'File upload service not configured. Please contact administrator.'
      });
    }

    // Upload to Cloudinary
    const result = await cloudinaryService.uploadResource(
      req.file.buffer,
      req.file.originalname
    );

    return res.status(200).json({
      success: true,
      data: {
        url: result.secure_url,
        publicId: result.public_id,
        filename: req.file.originalname,
        format: result.format,
        size: result.bytes,
      }
    });
  } catch (error: any) {
    console.error('Resource upload error:', error);
    return res.status(500).json({
      success: false,
      message: 'Resource upload failed',
      error: error.message || 'Unknown error'
    });
  }
};

