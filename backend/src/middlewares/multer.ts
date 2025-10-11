/**
 * Multer Middleware
 * Handles multipart/form-data file uploads
 */

import multer from 'multer';
import { Request } from 'express';

// Memory storage - files stored in memory as Buffer
const storage = multer.memoryStorage();

// File filter - validate file types
const fileFilter = (
  req: Request,
  file: Express.Multer.File,
  callback: multer.FileFilterCallback
) => {
  // Allowed file types
  const allowedMimes = [
    // Images
    'image/jpeg',
    'image/jpg',
    'image/png',
    'image/gif',
    'image/webp',
    // Videos
    'video/mp4',
    'video/mpeg',
    'video/quicktime',
    'video/x-msvideo',
    'video/x-ms-wmv',
    // Documents
    'application/pdf',
    'application/msword',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
    'application/vnd.ms-powerpoint',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation',
    // Archives
    'application/zip',
    'application/x-rar-compressed',
    'application/x-7z-compressed',
  ];

  if (allowedMimes.includes(file.mimetype)) {
    callback(null, true);
  } else {
    callback(new Error(`Invalid file type: ${file.mimetype}. Allowed types: images, videos, documents, archives.`));
  }
};

// Create multer instance
export const upload = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB max file size
  },
  fileFilter,
});

// Specific upload instances for different use cases
export const uploadImage = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB for images
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Only image files (jpg, png, gif, webp) are allowed for thumbnails'));
    }
  },
});

export const uploadVideo = multer({
  storage,
  limits: {
    fileSize: 100 * 1024 * 1024, // 100MB for videos
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = ['video/mp4', 'video/mpeg', 'video/quicktime', 'video/x-msvideo'];
    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Only video files (mp4, mpeg, mov, avi) are allowed'));
    }
  },
});

export default upload;

