import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { createServer } from 'http';
import { Server as SocketIOServer } from 'socket.io';
import connectDB from './config/database';
import { requestLogger } from './middlewares/logger';
import { errorHandler, notFound } from './middlewares/errorHandler';

// Import routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import courseRoutes from './routes/courseRoutes';
import dashboardRoutes from './routes/dashboardRoutes';
import feedbackRoutes from './routes/feedbackRoutes';
import instructorRoutes from './routes/instructorRoutes';
import uploadRoutes from './routes/uploadRoutes';
import adminRoutes from './routes/adminRoutes';

// Load environment variables
dotenv.config();

const app: Application = express();
const httpServer = createServer(app);
const io = new SocketIOServer(httpServer, {
  cors: {
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true
  }
});

const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(requestLogger);

// Socket.IO connection handling
io.on('connection', (socket) => {
  console.log('🔌 Client connected:', socket.id);

  // Join instructor room
  socket.on('instructor:join', (instructorId: string) => {
    socket.join(`instructor:${instructorId}`);
    console.log(`📚 Instructor ${instructorId} joined room`);
  });

  // Leave instructor room
  socket.on('instructor:leave', (instructorId: string) => {
    socket.leave(`instructor:${instructorId}`);
    console.log(`📚 Instructor ${instructorId} left room`);
  });

  socket.on('disconnect', () => {
    console.log('🔌 Client disconnected:', socket.id);
  });
});

// Make io accessible to controllers
app.set('io', io);

// Root endpoint
app.get('/', (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: '🚀 Elimu Space API is running!',
    version: '1.0.0',
    endpoints: {
      auth: '/api/v1/auth',
      users: '/api/v1/users',
      courses: '/api/v1/courses',
      dashboard: '/api/v1/dashboard',
      feedback: '/api/v1/feedback'
    }
  });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/courses', courseRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/feedback', feedbackRoutes);
app.use('/api/v1/instructor', instructorRoutes);
app.use('/api/v1/upload', uploadRoutes);
app.use('/api/v1/admin', adminRoutes);

// Error handling
app.use(notFound);
app.use(errorHandler);

// Connect to MongoDB and start server
const startServer = async () => {
  try {
    await connectDB();
    
    httpServer.listen(PORT, () => {
      console.log('=================================');
      console.log('🚀 Server Started Successfully');
      console.log(`📡 Port: ${PORT}`);
      console.log(`🌐 URL: http://localhost:${PORT}`);
      console.log(`🔗 API: http://localhost:${PORT}/api/v1`);
      console.log(`🔌 Socket.IO: Ready`);
      console.log(`📝 Environment: ${process.env.NODE_ENV || 'development'}`);
      console.log('=================================');
    });
  } catch (error) {
    console.error('❌ Failed to start server:', error);
    process.exit(1);
  }
};

startServer();

export default app;
