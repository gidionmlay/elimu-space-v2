/**
 * Instructor Controller
 * Handles instructor-specific operations including student management
 */

import { Request, Response } from 'express';
import Course from '../models/Course';
import Enrollment from '../models/Enrollment';
import User from '../models/User';
import mongoose from 'mongoose';

// Type for authenticated request
interface AuthRequest extends Request {
  user?: {
    id: string;
    role: string;
  };
}

/**
 * Get all students enrolled in instructor's courses
 * GET /api/v1/instructor/students
 */
export const getInstructorStudents = async (req: AuthRequest, res: Response) => {
  try {
    const instructorId = req.user?.id;
    const { page = 1, limit = 25, search = '', status = '' } = req.query;

    if (!instructorId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Find all courses by this instructor
    const courses = await Course.find({ instructor: instructorId }).select('_id').lean();
    const courseIds = courses.map(c => c._id);

    if (courseIds.length === 0) {
      return res.status(200).json({
        success: true,
        data: [],
        pagination: { page: 1, limit: Number(limit), total: 0, pages: 0 }
      });
    }

    // Build match conditions
    const matchConditions: any = { course: { $in: courseIds } };
    if (status && status !== 'all') {
      matchConditions.status = status;
    }

    // Aggregation pipeline
    const pipeline: any[] = [
      { $match: matchConditions },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'student'
        }
      },
      { $unwind: '$student' },
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'courseDetails'
        }
      },
      { $unwind: '$courseDetails' },
    ];

    // Add search filter if provided
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { 'student.username': { $regex: search, $options: 'i' } },
            { 'student.email': { $regex: search, $options: 'i' } },
            { 'student.first_name': { $regex: search, $options: 'i' } },
            { 'student.last_name': { $regex: search, $options: 'i' } },
            { 'courseDetails.title': { $regex: search, $options: 'i' } }
          ]
        }
      });
    }

    // Group by student
    pipeline.push({
      $group: {
        _id: '$student._id',
        name: { 
          $first: { 
            $cond: {
              if: { $and: ['$student.first_name', '$student.last_name'] },
              then: { $concat: ['$student.first_name', ' ', '$student.last_name'] },
              else: '$student.username'
            }
          }
        },
        email: { $first: '$student.email' },
        courses: {
          $push: {
            id: '$courseDetails._id',
            title: '$courseDetails.title',
            progress: '$progress',
            enrolledAt: '$enrollment_date',
            status: '$status'
          }
        },
        lastActivity: { $max: '$lastActivityAt' },
        status: { $first: '$status' },
        avgProgress: { $avg: '$progress' },
        createdAt: { $first: '$student.createdAt' }
      }
    });

    // Sort by last activity
    pipeline.push({ $sort: { lastActivity: -1 } });

    // Get total count
    const countPipeline = [...pipeline, { $count: 'total' }];
    const countResult = await Enrollment.aggregate(countPipeline);
    const total = countResult.length > 0 ? countResult[0].total : 0;

    // Add pagination
    pipeline.push(
      { $skip: (Number(page) - 1) * Number(limit) },
      { $limit: Number(limit) }
    );

    // Execute aggregation
    const results = await Enrollment.aggregate(pipeline);

    // Format results
    const students = results.map((result: any) => ({
      studentId: result._id,
      name: result.name,
      email: result.email,
      courses: result.courses,
      progress: Math.round(result.avgProgress || 0),
      status: result.status,
      lastActivity: result.lastActivity,
      enrolledAt: result.createdAt
    }));

    res.status(200).json({
      success: true,
      data: students,
      pagination: {
        page: Number(page),
        limit: Number(limit),
        total,
        pages: Math.ceil(total / Number(limit))
      }
    });
  } catch (error: any) {
    console.error('Get instructor students error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch students',
      error: error.message
    });
  }
};

/**
 * Get single student details with per-course progress
 * GET /api/v1/instructor/students/:studentId
 */
export const getStudentDetails = async (req: AuthRequest, res: Response) => {
  try {
    const instructorId = req.user?.id;
    const { studentId } = req.params;

    if (!instructorId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Validate student ID
    if (!mongoose.Types.ObjectId.isValid(studentId)) {
      return res.status(400).json({ success: false, message: 'Invalid student ID' });
    }

    // Find instructor's courses
    const courses = await Course.find({ instructor: instructorId }).select('_id').lean();
    const courseIds = courses.map(c => c._id);

    if (courseIds.length === 0) {
      return res.status(404).json({ success: false, message: 'No courses found' });
    }

    // Get student info
    const student = await User.findById(studentId).select('-password').lean();
    if (!student) {
      return res.status(404).json({ success: false, message: 'Student not found' });
    }

    // Get enrollments for this student in instructor's courses
    const enrollments = await Enrollment.find({
      user: studentId,
      course: { $in: courseIds }
    })
      .populate('course', 'title thumbnail category level')
      .lean();

    if (enrollments.length === 0) {
      return res.status(403).json({ 
        success: false, 
        message: 'Student not enrolled in your courses' 
      });
    }

    // Format enrollments
    const coursesProgress = enrollments.map((enrollment: any) => ({
      courseId: enrollment.course._id,
      title: enrollment.course.title,
      thumbnail: enrollment.course.thumbnail,
      category: enrollment.course.category,
      level: enrollment.course.level,
      progress: enrollment.progress,
      status: enrollment.status,
      enrolledAt: enrollment.enrollment_date,
      lastActivity: enrollment.lastActivityAt,
      completedLessons: enrollment.completed_lessons
    }));

    // Calculate overall stats
    const avgProgress = enrollments.reduce((sum: number, e: any) => sum + e.progress, 0) / enrollments.length;
    const completedCourses = enrollments.filter((e: any) => e.is_completed).length;

    res.status(200).json({
      success: true,
      data: {
        studentId: student._id,
        name: student.first_name && student.last_name 
          ? `${student.first_name} ${student.last_name}` 
          : student.username,
        email: student.email,
        profileImage: student.profile_image,
        bio: student.bio,
        country: student.country,
        joinedDate: student.createdAt,
        totalCourses: enrollments.length,
        completedCourses,
        averageProgress: Math.round(avgProgress),
        courses: coursesProgress
      }
    });
  } catch (error: any) {
    console.error('Get student details error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch student details',
      error: error.message
    });
  }
};

/**
 * Export students data as CSV
 * GET /api/v1/instructor/students/export
 */
export const exportStudentsCSV = async (req: AuthRequest, res: Response) => {
  try {
    const instructorId = req.user?.id;
    const { search = '', status = '' } = req.query;

    if (!instructorId) {
      return res.status(401).json({ success: false, message: 'Unauthorized' });
    }

    // Find all courses by this instructor
    const courses = await Course.find({ instructor: instructorId }).select('_id').lean();
    const courseIds = courses.map(c => c._id);

    if (courseIds.length === 0) {
      return res.status(200).send('Name,Email,Courses,Progress,Status,Last Activity\n');
    }

    // Build match conditions
    const matchConditions: any = { course: { $in: courseIds } };
    if (status && status !== 'all') {
      matchConditions.status = status;
    }

    // Aggregation pipeline (similar to getInstructorStudents but no pagination)
    const pipeline: any[] = [
      { $match: matchConditions },
      {
        $lookup: {
          from: 'users',
          localField: 'user',
          foreignField: '_id',
          as: 'student'
        }
      },
      { $unwind: '$student' },
      {
        $lookup: {
          from: 'courses',
          localField: 'course',
          foreignField: '_id',
          as: 'courseDetails'
        }
      },
      { $unwind: '$courseDetails' },
    ];

    // Add search filter if provided
    if (search) {
      pipeline.push({
        $match: {
          $or: [
            { 'student.username': { $regex: search, $options: 'i' } },
            { 'student.email': { $regex: search, $options: 'i' } },
            { 'courseDetails.title': { $regex: search, $options: 'i' } }
          ]
        }
      });
    }

    // Group by student
    pipeline.push({
      $group: {
        _id: '$student._id',
        name: { 
          $first: { 
            $cond: {
              if: { $and: ['$student.first_name', '$student.last_name'] },
              then: { $concat: ['$student.first_name', ' ', '$student.last_name'] },
              else: '$student.username'
            }
          }
        },
        email: { $first: '$student.email' },
        courseTitles: { $push: '$courseDetails.title' },
        lastActivity: { $max: '$lastActivityAt' },
        status: { $first: '$status' },
        avgProgress: { $avg: '$progress' }
      }
    });

    pipeline.push({ $sort: { lastActivity: -1 } });

    // Execute aggregation
    const results = await Enrollment.aggregate(pipeline);

    // Build CSV
    let csv = 'Name,Email,Courses,Progress,Status,Last Activity\n';
    
    results.forEach((result: any) => {
      const name = result.name || 'N/A';
      const email = result.email || 'N/A';
      const courses = result.courseTitles.join('; ') || 'N/A';
      const progress = `${Math.round(result.avgProgress || 0)}%`;
      const status = result.status || 'active';
      const lastActivity = result.lastActivity 
        ? new Date(result.lastActivity).toISOString().split('T')[0] 
        : 'N/A';
      
      csv += `"${name}","${email}","${courses}","${progress}","${status}","${lastActivity}"\n`;
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader('Content-Disposition', 'attachment; filename=students.csv');
    res.status(200).send(csv);
  } catch (error: any) {
    console.error('Export students CSV error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to export students',
      error: error.message
    });
  }
};

