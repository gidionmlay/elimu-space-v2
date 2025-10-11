/**
 * StudentDetailDrawer Component
 * Right-side drawer showing detailed student information
 */

import React, { useState, useEffect } from 'react';
import { X, User, Mail, Globe, Calendar, BookOpen, Award } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import ProgressBar from '@/components/ui/ProgressBar';
import api from '@/lib/api';

export interface StudentDetails {
  studentId: string;
  name: string;
  email: string;
  profileImage?: string;
  bio?: string;
  country?: string;
  joinedDate: string;
  totalCourses: number;
  completedCourses: number;
  averageProgress: number;
  courses: Array<{
    courseId: string;
    title: string;
    thumbnail?: string;
    category: string;
    level: string;
    progress: number;
    status: 'active' | 'completed' | 'inactive';
    enrolledAt: string;
    lastActivity: string;
    completedLessons: number;
  }>;
}

interface StudentDetailDrawerProps {
  studentId: string | null;
  isOpen: boolean;
  onClose: () => void;
}

const StudentDetailDrawer: React.FC<StudentDetailDrawerProps> = ({
  studentId,
  isOpen,
  onClose
}) => {
  const [student, setStudent] = useState<StudentDetails | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch student details
  useEffect(() => {
    if (studentId && isOpen) {
      fetchStudentDetails();
    }
  }, [studentId, isOpen]);

  const fetchStudentDetails = async () => {
    if (!studentId) return;

    setIsLoading(true);
    setError(null);
    
    try {
      const response = await api.get(`/instructor/students/${studentId}`);
      if (response.data.success) {
        setStudent(response.data.data);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || 'Failed to load student details');
      console.error('Fetch student details error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // Status badge variant mapping
  const statusVariants = {
    active: { className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    completed: { className: 'bg-blue-100 text-blue-700 border-blue-200' },
    inactive: { className: 'bg-gray-100 text-gray-600 border-gray-200' }
  };

  // Prepare chart data
  const chartData = student?.courses.map(course => ({
    name: course.title.length > 20 ? course.title.substring(0, 20) + '...' : course.title,
    progress: course.progress,
    fill: course.status === 'completed' ? '#22c55e' : course.status === 'active' ? '#3b82f6' : '#9ca3af'
  })) || [];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle className="text-2xl font-bold text-gray-900">
            Student Details
          </SheetTitle>
        </SheetHeader>

        {isLoading ? (
          <div className="space-y-6 mt-6">
            <div className="flex items-center gap-4">
              <Skeleton className="h-16 w-16 rounded-full" />
              <div className="space-y-2 flex-1">
                <Skeleton className="h-6 w-48" />
                <Skeleton className="h-4 w-64" />
              </div>
            </div>
            <Skeleton className="h-32 w-full" />
            <Skeleton className="h-64 w-full" />
          </div>
        ) : error ? (
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <p className="text-red-600 font-semibold mb-2">Error</p>
              <p className="text-gray-600">{error}</p>
            </div>
          </div>
        ) : student ? (
          <div className="space-y-6 mt-6">
            {/* Student Header */}
            <div className="flex items-start gap-4 pb-6 border-b border-gray-200">
              <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <User className="w-8 h-8 text-emerald-600" />
              </div>
              <div className="flex-1">
                <h2 className="text-xl font-bold text-gray-900">{student.name}</h2>
                <div className="flex flex-col gap-2 mt-2">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    <span className="text-sm">{student.email}</span>
                  </div>
                  {student.country && (
                    <div className="flex items-center gap-2 text-gray-600">
                      <Globe className="w-4 h-4" />
                      <span className="text-sm">{student.country}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">
                      Joined {format(new Date(student.joinedDate), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 text-center">
                <BookOpen className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{student.totalCourses}</p>
                <p className="text-sm text-gray-600">Enrolled</p>
              </div>
              <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4 text-center">
                <Award className="w-6 h-6 text-emerald-600 mx-auto mb-2" />
                <p className="text-2xl font-bold text-gray-900">{student.completedCourses}</p>
                <p className="text-sm text-gray-600">Completed</p>
              </div>
              <div className="bg-purple-50 border border-purple-200 rounded-lg p-4 text-center">
                <div className="w-6 h-6 mx-auto mb-2 relative">
                  <div className="absolute inset-0 flex items-center justify-center text-purple-600 font-bold text-xs">
                    {student.averageProgress}%
                  </div>
                </div>
                <p className="text-2xl font-bold text-gray-900">{student.averageProgress}%</p>
                <p className="text-sm text-gray-600">Avg Progress</p>
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="courses" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="courses">Courses</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>

              {/* Courses Tab */}
              <TabsContent value="courses" className="space-y-6">
                {/* Progress Chart */}
                {chartData.length > 0 && (
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      Course Progress Overview
                    </h3>
                    <ResponsiveContainer width="100%" height={200}>
                      <BarChart data={chartData}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="name" 
                          tick={{ fontSize: 12 }}
                          angle={-45}
                          textAnchor="end"
                          height={80}
                        />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="progress" radius={[8, 8, 0, 0]}>
                          {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.fill} />
                          ))}
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {/* Course List */}
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-900">
                    Enrolled Courses ({student.courses.length})
                  </h3>
                  {student.courses.map((course) => (
                    <div
                      key={course.courseId}
                      className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="font-semibold text-gray-900">{course.title}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-xs">
                              {course.category}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {course.level}
                            </Badge>
                          </div>
                        </div>
                        <Badge className={statusVariants[course.status].className}>
                          {course.status.charAt(0).toUpperCase() + course.status.slice(1)}
                        </Badge>
                      </div>

                      <ProgressBar
                        value={course.progress}
                        showPercentage
                        size="md"
                        color={course.status === 'completed' ? 'success' : 'primary'}
                      />

                      <div className="flex items-center justify-between mt-3 text-sm text-gray-600">
                        <span>
                          Enrolled {formatDistanceToNow(new Date(course.enrolledAt), { addSuffix: true })}
                        </span>
                        <span>
                          Last active {formatDistanceToNow(new Date(course.lastActivity), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </TabsContent>

              {/* Notes Tab */}
              <TabsContent value="notes">
                <div className="text-center py-16">
                  <p className="text-gray-600">Notes feature coming soon</p>
                </div>
              </TabsContent>

              {/* Messages Tab */}
              <TabsContent value="messages">
                <div className="text-center py-16">
                  <p className="text-gray-600">Messaging feature coming soon</p>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        ) : null}
      </SheetContent>
    </Sheet>
  );
};

export default StudentDetailDrawer;

