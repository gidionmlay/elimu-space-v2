/**
 * Upload Routes
 * Routes for file uploads (thumbnails, videos, resources)
 */

import express from 'express';
import { authenticate, authorizeRoles } from '../middlewares/auth';
import { upload, uploadImage, uploadVideo as uploadVideoMiddleware } from '../middlewares/multer';
import {
  uploadSingle,
  uploadThumbnail,
  uploadVideo,
  uploadResource
} from '../controllers/uploadController';

const router = express.Router();

// All upload routes require authentication
router.use(authenticate);

/**
 * @route   POST /api/v1/upload/single
 * @desc    Upload a single file (generic)
 * @access  Authenticated users
 */
router.post('/single', upload.single('file'), uploadSingle);

/**
 * @route   POST /api/v1/upload/thumbnail
 * @desc    Upload course thumbnail (image only)
 * @access  Instructor, Admin
 */
router.post(
  '/thumbnail',
  authorizeRoles('instructor', 'admin'),
  uploadImage.single('file'),
  uploadThumbnail
);

/**
 * @route   POST /api/v1/upload/video
 * @desc    Upload course video
 * @access  Instructor, Admin
 */
router.post(
  '/video',
  authorizeRoles('instructor', 'admin'),
  uploadVideoMiddleware.single('file'),
  uploadVideo
);

/**
 * @route   POST /api/v1/upload/resource
 * @desc    Upload course resource file
 * @access  Instructor, Admin
 */
router.post(
  '/resource',
  authorizeRoles('instructor', 'admin'),
  upload.single('file'),
  uploadResource
);

export default router;

