/**
 * StudentTable Component
 * Displays students in a table format with progress, status, and actions
 */

import React from 'react';
import { User, Eye, BookOpen } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';
import ProgressBar from '@/components/ui/ProgressBar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';

export interface StudentData {
  studentId: string;
  name: string;
  email: string;
  courses: Array<{
    id: string;
    title: string;
    progress: number;
    enrolledAt: string;
  }>;
  progress: number;
  status: 'active' | 'completed' | 'inactive';
  lastActivity: string;
  enrolledAt?: string;
}

interface StudentTableProps {
  students: StudentData[];
  isLoading?: boolean;
  onViewDetails: (studentId: string) => void;
}

const StudentTable: React.FC<StudentTableProps> = ({
  students,
  isLoading = false,
  onViewDetails
}) => {
  // Status badge variant mapping
  const statusVariants = {
    active: { variant: 'default' as const, className: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    completed: { variant: 'secondary' as const, className: 'bg-blue-100 text-blue-700 border-blue-200' },
    inactive: { variant: 'outline' as const, className: 'bg-gray-100 text-gray-600 border-gray-200' }
  };

  // Loading skeleton
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className="flex items-center gap-4 p-4 bg-white border border-gray-200 rounded-lg">
            <Skeleton className="h-10 w-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-48" />
              <Skeleton className="h-3 w-64" />
            </div>
            <Skeleton className="h-8 w-24" />
          </div>
        ))}
      </div>
    );
  }

  // Empty state
  if (!students || students.length === 0) {
    return (
      <div className="text-center py-16 bg-white border border-gray-200 rounded-lg">
        <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <User className="w-10 h-10 text-gray-400" />
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          No Students Found
        </h3>
        <p className="text-gray-600">
          Students will appear here when they enroll in your courses
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50">
            <TableHead className="w-[50px]"></TableHead>
            <TableHead className="font-semibold text-gray-700">Student</TableHead>
            <TableHead className="font-semibold text-gray-700">Courses</TableHead>
            <TableHead className="font-semibold text-gray-700">Progress</TableHead>
            <TableHead className="font-semibold text-gray-700">Status</TableHead>
            <TableHead className="font-semibold text-gray-700">Last Activity</TableHead>
            <TableHead className="w-[100px] font-semibold text-gray-700">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {students.map((student) => {
            const firstCourse = student.courses[0];
            const additionalCount = student.courses.length - 1;

            return (
              <TableRow 
                key={student.studentId}
                className="hover:bg-gray-50 transition-colors"
              >
                {/* Icon */}
                <TableCell>
                  <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                    <User className="w-5 h-5 text-emerald-600" />
                  </div>
                </TableCell>

                {/* Student Name & Email */}
                <TableCell>
                  <div className="space-y-0.5">
                    <p className="font-semibold text-gray-900">{student.name}</p>
                    <p className="text-sm text-gray-600">{student.email}</p>
                  </div>
                </TableCell>

                {/* Courses */}
                <TableCell>
                  <div className="flex items-center gap-2">
                    <BookOpen className="w-4 h-4 text-gray-400" />
                    <div>
                      <p className="text-sm font-medium text-gray-900">
                        {firstCourse?.title || 'No courses'}
                      </p>
                      {additionalCount > 0 && (
                        <p className="text-xs text-gray-500">
                          +{additionalCount} more
                        </p>
                      )}
                    </div>
                  </div>
                </TableCell>

                {/* Progress */}
                <TableCell>
                  <div className="w-32">
                    <ProgressBar
                      value={student.progress}
                      showPercentage
                      size="sm"
                      color="primary"
                    />
                  </div>
                </TableCell>

                {/* Status */}
                <TableCell>
                  <Badge 
                    variant={statusVariants[student.status].variant}
                    className={statusVariants[student.status].className}
                  >
                    {student.status.charAt(0).toUpperCase() + student.status.slice(1)}
                  </Badge>
                </TableCell>

                {/* Last Activity */}
                <TableCell>
                  <p className="text-sm text-gray-600">
                    {student.lastActivity
                      ? formatDistanceToNow(new Date(student.lastActivity), {
                          addSuffix: true
                        })
                      : 'Never'}
                  </p>
                </TableCell>

                {/* Actions */}
                <TableCell>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onViewDetails(student.studentId)}
                    className="hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300"
                  >
                    <Eye className="w-4 h-4 mr-1" />
                    View
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentTable;

