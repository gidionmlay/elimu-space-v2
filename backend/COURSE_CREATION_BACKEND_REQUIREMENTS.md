# Course Creation Backend Requirements

## 🎯 Overview

This document outlines the backend API endpoints required to support the Course Creation System in the Elimu Space frontend.

---

## 📋 Required API Endpoints

### 1. Course Management Endpoints

#### Create Course Draft
```
POST /api/v1/courses
```

**Request Body:**
```json
{
  "title": "string (required, unique)",
  "description": "string (required, max 200)",
  "category": "string (required)",
  "level": "string (required, enum: Beginner/Intermediate/Advanced)",
  "language": "string (required)",
  "thumbnail": "string (optional, URL)",
  "preview_video": "string (optional, URL)",
  "modules": [],
  "price": 0,
  "discount": 0,
  "is_free": true,
  "is_published": false
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Course Title",
    ...all course fields,
    "created_at": "2025-10-09T10:00:00Z",
    "updated_at": "2025-10-09T10:00:00Z"
  }
}
```

**Status Codes:**
- `201` - Course created successfully
- `400` - Validation error
- `401` - Unauthorized
- `409` - Duplicate title

---

#### Update Course Draft
```
PUT /api/v1/courses/:id
```

**Request Body:**
```json
{
  "title": "string (optional)",
  "description": "string (optional)",
  "modules": [
    {
      "id": "string",
      "title": "string",
      "order": 0,
      "lessons": [
        {
          "id": "string",
          "title": "string",
          "type": "video|article|quiz",
          "content": "string",
          "video_url": "string",
          "duration": 15,
          "order": 0
        }
      ]
    }
  ],
  ...other fields
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    ...updated course data
  }
}
```

**Status Codes:**
- `200` - Updated successfully
- `400` - Validation error
- `401` - Unauthorized
- `404` - Course not found
- `403` - Not course owner

---

#### Get Course Draft
```
GET /api/v1/courses/:id
```

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "Course Title",
    "description": "Description",
    "modules": [...],
    "resources": [...],
    ...all course fields
  }
}
```

**Status Codes:**
- `200` - Success
- `401` - Unauthorized
- `404` - Course not found
- `403` - Not course owner

---

#### Get Instructor's Drafts
```
GET /api/v1/courses/my-drafts
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "Draft Course 1",
      "is_published": false,
      "created_at": "2025-10-09T10:00:00Z"
    }
  ]
}
```

---

#### Delete Course
```
DELETE /api/v1/courses/:id
```

**Response:**
```json
{
  "success": true,
  "message": "Course deleted successfully"
}
```

**Status Codes:**
- `200` - Deleted successfully
- `401` - Unauthorized
- `404` - Course not found
- `403` - Not course owner

---

### 2. Publish Endpoint

#### Publish Course
```
POST /instructor/courses/:id/publish
```

**Validation:**
- Course must have title
- Course must have description
- Course must have at least 1 module
- Module must have at least 1 lesson
- Course must have pricing set (free or price > 0)

**Response:**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "is_published": true,
    "published_at": "2025-10-09T10:00:00Z",
    ...course data
  },
  "message": "Course published successfully"
}
```

**Status Codes:**
- `200` - Published successfully
- `400` - Validation failed (missing required fields)
- `401` - Unauthorized
- `404` - Course not found
- `403` - Not course owner

---

### 3. File Upload Endpoints

#### Upload Thumbnail
```
POST /instructor/upload/thumbnail
Content-Type: multipart/form-data
```

**Request:**
```
Form Data:
- thumbnail: File (image/*, max 5MB)
```

**Response:**
```json
{
  "success": true,
  "url": "https://storage.example.com/thumbnails/abc123.jpg",
  "filename": "course-thumbnail-abc123.jpg",
  "size": 245678
}
```

**Validation:**
- File type: image/* only
- Max size: 5MB
- Formats: JPG, PNG, WEBP, GIF

**Status Codes:**
- `200` - Uploaded successfully
- `400` - Invalid file type/size
- `401` - Unauthorized
- `413` - File too large

---

#### Upload Resource File
```
POST /instructor/upload/resource
Content-Type: multipart/form-data
```

**Request:**
```
Form Data:
- resource: File (pdf|doc|docx|zip|ppt|pptx, max 50MB)
```

**Response:**
```json
{
  "success": true,
  "url": "https://storage.example.com/resources/resource123.pdf",
  "filename": "course-resource-123.pdf",
  "size": 2456789
}
```

**Validation:**
- File types: PDF, DOC, DOCX, ZIP, PPT, PPTX
- Max size: 50MB

**Status Codes:**
- `200` - Uploaded successfully
- `400` - Invalid file type/size
- `401` - Unauthorized
- `413` - File too large

---

#### Upload Video
```
POST /instructor/upload/video
Content-Type: multipart/form-data
```

**Request:**
```
Form Data:
- video: File (video/*, max 500MB)
```

**Response:**
```json
{
  "success": true,
  "url": "https://storage.example.com/videos/video123.mp4",
  "filename": "lesson-video-123.mp4",
  "size": 45678901,
  "duration": 1520 // seconds
}
```

**Validation:**
- File types: MP4, MOV, AVI, WEBM
- Max size: 500MB
- Support upload progress tracking

**Status Codes:**
- `200` - Uploaded successfully
- `400` - Invalid file type/size
- `401` - Unauthorized
- `413` - File too large

---

## 🗄️ MongoDB Schema

### Course Collection

```javascript
const courseSchema = new mongoose.Schema({
  // Basic Info
  title: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    maxlength: 100
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: true,
    maxlength: 200
  },
  category: {
    type: String,
    required: true,
    enum: [
      'Agriculture',
      'Business & Entrepreneurship',
      'Technology & Programming',
      'Design & Creative',
      'Marketing & Sales',
      'Health & Wellness',
      'Languages',
      'Personal Development',
      'Science & Engineering',
      'Arts & Crafts'
    ]
  },
  level: {
    type: String,
    required: true,
    enum: ['Beginner', 'Intermediate', 'Advanced']
  },
  language: {
    type: String,
    required: true
  },
  thumbnail: {
    type: String, // URL
    default: null
  },
  preview_video: {
    type: String, // URL
    default: null
  },

  // Course Content
  modules: [{
    id: String,
    title: {
      type: String,
      required: true
    },
    order: {
      type: Number,
      required: true
    },
    lessons: [{
      id: String,
      title: {
        type: String,
        required: true
      },
      type: {
        type: String,
        required: true,
        enum: ['video', 'article', 'quiz']
      },
      content: String,
      video_url: String,
      duration: {
        type: Number, // minutes
        default: 0
      },
      order: {
        type: Number,
        required: true
      }
    }]
  }],

  // Resources
  resources: [{
    id: String,
    name: String,
    url: String,
    size: Number,
    type: {
      type: String,
      enum: ['file', 'link']
    }
  }],

  // Pricing
  price: {
    type: Number,
    default: 0
  },
  discount: {
    type: Number,
    min: 0,
    max: 100,
    default: 0
  },
  is_free: {
    type: Boolean,
    default: true
  },

  // Status
  is_published: {
    type: Boolean,
    default: false
  },
  published_at: {
    type: Date,
    default: null
  },

  // Instructor Reference
  instructor_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },

  // Statistics (computed)
  enrollment_count: {
    type: Number,
    default: 0
  },
  rating: {
    type: Number,
    default: 0
  },
  reviews_count: {
    type: Number,
    default: 0
  },

  // Timestamps
  created_at: {
    type: Date,
    default: Date.now
  },
  updated_at: {
    type: Date,
    default: Date.now
  }
});

// Indexes
courseSchema.index({ instructor_id: 1, is_published: 1 });
courseSchema.index({ title: 'text', description: 'text' });
courseSchema.index({ slug: 1 }, { unique: true });

// Pre-save middleware
courseSchema.pre('save', function(next) {
  this.updated_at = new Date();
  
  // Generate slug from title
  if (this.isModified('title')) {
    this.slug = this.title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  }
  
  next();
});

module.exports = mongoose.model('Course', courseSchema);
```

---

## 🔧 Backend Implementation Checklist

### Controllers

#### courseController.ts
- [ ] `createCourse` - Handle POST /api/v1/courses
- [ ] `updateCourse` - Handle PUT /api/v1/courses/:id
- [ ] `getCourse` - Handle GET /api/v1/courses/:id
- [ ] `deleteCourse` - Handle DELETE /api/v1/courses/:id
- [ ] `getMyCourses` - Handle GET /api/v1/courses/my-courses
- [ ] `getMyDrafts` - Handle GET /api/v1/courses/my-drafts
- [ ] `publishCourse` - Handle POST /instructor/courses/:id/publish

#### uploadController.ts
- [ ] `uploadThumbnail` - Handle POST /instructor/upload/thumbnail
- [ ] `uploadResource` - Handle POST /instructor/upload/resource
- [ ] `uploadVideo` - Handle POST /instructor/upload/video

### Middleware

- [ ] `authMiddleware` - Verify JWT token
- [ ] `instructorOnly` - Verify user is instructor
- [ ] `courseOwnership` - Verify user owns the course
- [ ] `fileUpload` - Handle multipart/form-data (use multer)
- [ ] `validateCourse` - Validate course data before save

### File Storage

**Options:**
1. **Local Storage** (Development)
   - Store in `backend/uploads/` directory
   - Serve with Express static middleware

2. **Cloud Storage** (Production)
   - AWS S3
   - Google Cloud Storage
   - Azure Blob Storage
   - Cloudinary (for images)

**Recommended: Cloudinary**
```bash
npm install cloudinary multer
```

```javascript
// backend/config/cloudinary.js
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

module.exports = cloudinary;
```

---

## 🔐 Security Requirements

### Authentication
- All endpoints require JWT authentication
- Verify user role is 'instructor'
- Check course ownership before update/delete

### File Upload Security
- Validate file types (whitelist only)
- Enforce file size limits
- Sanitize file names
- Scan for malware (optional)
- Prevent path traversal attacks

### Data Validation
- Validate all input fields
- Sanitize text inputs (prevent XSS)
- Validate URLs
- Check required fields
- Enforce business rules (e.g., price >= 0)

---

## 📊 Example Implementations

### Create Course Endpoint

```typescript
// backend/src/controllers/courseController.ts
import { Request, Response } from 'express';
import Course from '../models/Course';
import { AuthRequest } from '../middlewares/auth';

export const createCourse = async (req: AuthRequest, res: Response) => {
  try {
    const instructorId = req.user?.id;

    // Validation
    const { title, description, category, level, language } = req.body;
    
    if (!title || !description || !category || !level || !language) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields'
      });
    }

    // Check for duplicate title
    const existingCourse = await Course.findOne({ title });
    if (existingCourse) {
      return res.status(409).json({
        success: false,
        message: 'Course with this title already exists'
      });
    }

    // Create course
    const course = await Course.create({
      ...req.body,
      instructor_id: instructorId,
      is_published: false,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-')
    });

    res.status(201).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Create course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create course'
    });
  }
};
```

### Update Course Endpoint

```typescript
export const updateCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const instructorId = req.user?.id;

    // Find course
    const course = await Course.findById(id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check ownership
    if (course.instructor_id.toString() !== instructorId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to edit this course'
      });
    }

    // Update course
    Object.assign(course, req.body);
    course.updated_at = new Date();
    await course.save();

    res.status(200).json({
      success: true,
      data: course
    });
  } catch (error) {
    console.error('Update course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update course'
    });
  }
};
```

### Publish Course Endpoint

```typescript
export const publishCourse = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const instructorId = req.user?.id;

    // Find course
    const course = await Course.findById(id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    // Check ownership
    if (course.instructor_id.toString() !== instructorId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'Not authorized'
      });
    }

    // Validation before publish
    if (!course.title || !course.description) {
      return res.status(400).json({
        success: false,
        message: 'Missing required fields: title or description'
      });
    }

    if (!course.modules || course.modules.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Course must have at least one module with lessons'
      });
    }

    const hasLessons = course.modules.some(mod => mod.lessons && mod.lessons.length > 0);
    if (!hasLessons) {
      return res.status(400).json({
        success: false,
        message: 'Each module must have at least one lesson'
      });
    }

    // Publish course
    course.is_published = true;
    course.published_at = new Date();
    await course.save();

    res.status(200).json({
      success: true,
      data: course,
      message: 'Course published successfully'
    });
  } catch (error) {
    console.error('Publish course error:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to publish course'
    });
  }
};
```

### File Upload Endpoint (with Cloudinary)

```typescript
// backend/src/controllers/uploadController.ts
import { Request, Response } from 'express';
import cloudinary from '../config/cloudinary';
import multer from 'multer';

// Configure multer
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024 // 5MB for thumbnails
  },
  fileFilter: (req, file, cb) => {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only image files are allowed'));
    }
  }
});

export const uploadThumbnail = [
  upload.single('thumbnail'),
  async (req: Request, res: Response) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded'
        });
      }

      // Upload to Cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader.upload_stream(
          {
            folder: 'elimu-space/thumbnails',
            resource_type: 'image'
          },
          (error, result) => {
            if (error) reject(error);
            else resolve(result);
          }
        ).end(req.file.buffer);
      });

      res.status(200).json({
        success: true,
        url: result.secure_url,
        filename: result.public_id,
        size: result.bytes
      });
    } catch (error) {
      console.error('Upload error:', error);
      res.status(500).json({
        success: false,
        message: 'Failed to upload file'
      });
    }
  }
];
```

---

## 🛣️ Routes Setup

```typescript
// backend/src/routes/courseRoutes.ts
import express from 'express';
import * as courseController from '../controllers/courseController';
import * as uploadController from '../controllers/uploadController';
import { auth, instructorOnly, courseOwnership } from '../middlewares/auth';

const router = express.Router();

// Course CRUD
router.post('/', auth, instructorOnly, courseController.createCourse);
router.put('/:id', auth, instructorOnly, courseOwnership, courseController.updateCourse);
router.get('/:id', auth, courseController.getCourse);
router.delete('/:id', auth, instructorOnly, courseOwnership, courseController.deleteCourse);

// Instructor courses
router.get('/my-courses', auth, instructorOnly, courseController.getMyCourses);
router.get('/my-drafts', auth, instructorOnly, courseController.getMyDrafts);

// Publish
router.post('/:id/publish', auth, instructorOnly, courseOwnership, courseController.publishCourse);

// File uploads
router.post('/upload/thumbnail', auth, instructorOnly, uploadController.uploadThumbnail);
router.post('/upload/resource', auth, instructorOnly, uploadController.uploadResource);
router.post('/upload/video', auth, instructorOnly, uploadController.uploadVideo);

export default router;
```

---

## 🔄 Middleware Examples

### Course Ownership Middleware

```typescript
// backend/src/middlewares/auth.ts
export const courseOwnership = async (req: AuthRequest, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params;
    const userId = req.user?.id;

    const course = await Course.findById(id);
    
    if (!course) {
      return res.status(404).json({
        success: false,
        message: 'Course not found'
      });
    }

    if (course.instructor_id.toString() !== userId.toString()) {
      return res.status(403).json({
        success: false,
        message: 'You do not have permission to access this course'
      });
    }

    next();
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
};
```

---

## 📦 Required NPM Packages

```json
{
  "dependencies": {
    "multer": "^1.4.5-lts.1",       // File upload handling
    "cloudinary": "^1.41.0",        // Cloud storage (recommended)
    "slugify": "^1.6.6"             // URL-friendly slugs
  },
  "devDependencies": {
    "@types/multer": "^1.4.11"
  }
}
```

---

## ✅ Implementation Priority

### Phase 1: Core Functionality (High Priority)
1. ✅ Create course endpoint
2. ✅ Update course endpoint
3. ✅ Get course endpoint
4. ✅ Publish course endpoint

### Phase 2: File Uploads (High Priority)
5. ⏳ Upload thumbnail endpoint
6. ⏳ Upload resource endpoint
7. ⏳ Upload video endpoint

### Phase 3: Management (Medium Priority)
8. ⏳ Get my drafts endpoint
9. ⏳ Delete course endpoint
10. ⏳ Course ownership middleware

### Phase 4: Enhancements (Low Priority)
11. ⏳ Course preview endpoint
12. ⏳ Duplicate course endpoint
13. ⏳ Course analytics endpoint

---

## 🧪 Testing Endpoints

### Using Postman or cURL

#### Create Course
```bash
curl -X POST http://localhost:3000/api/v1/courses \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Test Course",
    "description": "Test Description",
    "category": "Technology & Programming",
    "level": "Beginner",
    "language": "English",
    "price": 0,
    "is_free": true
  }'
```

#### Upload Thumbnail
```bash
curl -X POST http://localhost:3000/instructor/upload/thumbnail \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -F "thumbnail=@/path/to/image.jpg"
```

---

## 📋 Backend TODO List

### Immediate (Before Frontend Testing)
- [ ] Implement Course model with schema above
- [ ] Create courseController with CRUD operations
- [ ] Add course routes to Express app
- [ ] Implement file upload with multer
- [ ] Configure Cloudinary or local storage
- [ ] Add course ownership middleware
- [ ] Test all endpoints with Postman

### Enhancement (Post-Launch)
- [ ] Add course search/filter
- [ ] Implement course categories endpoint
- [ ] Add course reviews/ratings
- [ ] Course analytics dashboard
- [ ] Bulk operations
- [ ] Course import/export

---

## ✨ Summary

The frontend Course Creation System is **complete and ready**. The backend needs:

1. **7 API endpoints** (course CRUD + publish + uploads)
2. **1 MongoDB schema** (Course model)
3. **3 controllers** (course, upload, instructor)
4. **2 middleware** (ownership, file validation)
5. **File storage** setup (Cloudinary recommended)

**Once backend endpoints are implemented, the entire course creation flow will be fully functional!**

---

**Document Version**: 1.0  
**Last Updated**: October 2025  
**Status**: Frontend Complete, Backend Pending ✅

