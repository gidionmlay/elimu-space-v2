/**
 * Instructor Routes
 * Routes for instructor-specific operations
 */

import express from 'express';
import { authenticate, authorizeRoles } from '../middlewares/auth';
import {
  getInstructorStudents,
  getStudentDetails,
  exportStudentsCSV
} from '../controllers/instructorController';
import { uploadImage } from '../middlewares/multer';
import { uploadThumbnail } from '../controllers/uploadController';

const router = express.Router();

// All routes require instructor authentication
router.use(authenticate);
router.use(authorizeRoles('instructor', 'admin'));

/**
 * @route   GET /api/v1/instructor/students
 * @desc    Get all students enrolled in instructor's courses
 * @access  Instructor
 * @query   page, limit, search, status
 */
router.get('/students', getInstructorStudents);

/**
 * @route   GET /api/v1/instructor/students/export
 * @desc    Export students data as CSV
 * @access  Instructor
 * @query   search, status
 */
router.get('/students/export', exportStudentsCSV);

/**
 * @route   GET /api/v1/instructor/students/:studentId
 * @desc    Get single student details with per-course progress
 * @access  Instructor
 */
router.get('/students/:studentId', getStudentDetails);

/**
 * @route   POST /api/v1/instructor/thumbnail
 * @desc    Upload course thumbnail (alias for compatibility)
 * @access  Instructor
 */
router.post('/thumbnail', uploadImage.single('file'), uploadThumbnail);

export default router;

