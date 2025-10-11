/**
 * Admin Routes
 * Routes for admin-specific operations (course approval, etc.)
 */

import express from 'express';
import { authenticate, authorizeRoles } from '../middlewares/auth';
import {
  getPendingCourses,
  approveCourse,
  rejectCourse
} from '../controllers/courseController';

const router = express.Router();

// All routes require admin authentication
router.use(authenticate);
router.use(authorizeRoles('admin'));

/**
 * @route   GET /api/v1/admin/courses/pending
 * @desc    Get all pending courses for review
 * @access  Admin
 */
router.get('/courses/pending', getPendingCourses);

/**
 * @route   PUT /api/v1/admin/courses/:id/approve
 * @desc    Approve a pending course
 * @access  Admin
 */
router.put('/courses/:id/approve', approveCourse);

/**
 * @route   PUT /api/v1/admin/courses/:id/reject
 * @desc    Reject a pending course
 * @access  Admin
 */
router.put('/courses/:id/reject', rejectCourse);

export default router;

