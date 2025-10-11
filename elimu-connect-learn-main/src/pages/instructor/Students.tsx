/**
 * Instructor Students Page
 * Shows all students enrolled in instructor's courses with filtering and search
 */

import React, { useState, useEffect } from 'react';
import { Search, Download, Users, Filter } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';
import { useInstructorStudents, exportStudentsToCSV } from '@/hooks/useStudents';
import StudentTable from '@/components/instructor/StudentTable';
import StudentDetailDrawer from '@/components/instructor/StudentDetailDrawer';
import DashboardLayout from '@/components/layouts/DashboardLayout';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { io, Socket } from 'socket.io-client';

const InstructorStudentsPage: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();

  // State
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'completed' | 'inactive'>('all');
  const [page, setPage] = useState(1);
  const [selectedStudentId, setSelectedStudentId] = useState<string | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [socket, setSocket] = useState<Socket | null>(null);

  // Debounce search
  const [debouncedSearch, setDebouncedSearch] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchQuery);
      setPage(1); // Reset to page 1 on search
    }, 500);

    return () => clearTimeout(timer);
  }, [searchQuery]);

  // Fetch students
  const {
    data: studentsData,
    isLoading,
    refetch
  } = useInstructorStudents({
    page,
    limit: 25,
    search: debouncedSearch,
    status: statusFilter
  });

  // Socket.IO setup
  useEffect(() => {
    if (!user?.id) return;

    // Connect to Socket.IO
    const newSocket = io(import.meta.env.VITE_API_BASE_URL?.replace('/api/v1', '') || 'http://localhost:3000', {
      transports: ['websocket', 'polling']
    });

    newSocket.on('connect', () => {
      console.log('✅ Connected to Socket.IO');
      newSocket.emit('instructor:join', user.id);
    });

    newSocket.on('instructor:student_update', (data) => {
      console.log('🔄 Student update received:', data);
      refetch();
      toast({
        title: 'Student Updated',
        description: 'Student progress has been updated',
      });
    });

    newSocket.on('disconnect', () => {
      console.log('❌ Disconnected from Socket.IO');
    });

    setSocket(newSocket);

    return () => {
      if (newSocket) {
        newSocket.emit('instructor:leave', user.id);
        newSocket.disconnect();
      }
    };
  }, [user?.id, refetch]);

  // Handle status filter change
  const handleStatusChange = (value: string) => {
    setStatusFilter(value as typeof statusFilter);
    setPage(1); // Reset to page 1 on filter change
  };

  // Handle view details
  const handleViewDetails = (studentId: string) => {
    setSelectedStudentId(studentId);
    setIsDrawerOpen(true);
  };

  // Handle close drawer
  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setSelectedStudentId(null);
  };

  // Handle CSV export
  const handleExport = async () => {
    try {
      toast({
        title: 'Exporting...',
        description: 'Generating CSV file',
      });

      const blob = await exportStudentsToCSV({
        search: debouncedSearch,
        status: statusFilter
      });

      // Create download link
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `students_${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);

      toast({
        title: 'Export Successful',
        description: 'CSV file has been downloaded',
      });
    } catch (error: any) {
      console.error('Export error:', error);
      toast({
        title: 'Export Failed',
        description: error.response?.data?.message || 'Failed to export students',
        variant: 'destructive',
      });
    }
  };

  const students = studentsData?.data || [];
  const pagination = studentsData?.pagination;

  return (
    <DashboardLayout userRole="instructor">
      <div className="p-6 space-y-6">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-xl p-8 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold mb-2">
                My Students 👩‍🎓
              </h1>
              <p className="text-emerald-100">
                Track your enrolled learners and their progress
              </p>
            </div>
            <div className="hidden md:flex items-center gap-3 bg-white/20 backdrop-blur-sm rounded-lg px-6 py-4">
              <Users className="w-8 h-8" />
              <div>
                <p className="text-sm text-emerald-100">Total Students</p>
                <p className="text-2xl font-bold">{pagination?.total || 0}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters & Actions */}
        <div className="bg-white border border-gray-200 rounded-lg p-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search by name or course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Status Filter */}
            <Select value={statusFilter} onValueChange={handleStatusChange}>
              <SelectTrigger className="w-full md:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Students</SelectItem>
                <SelectItem value="active">Active</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
                <SelectItem value="inactive">Inactive</SelectItem>
              </SelectContent>
            </Select>

            {/* Export Button */}
            <Button
              onClick={handleExport}
              variant="outline"
              className="hover:bg-emerald-50 hover:text-emerald-600 hover:border-emerald-300"
              disabled={!students.length}
            >
              <Download className="w-4 h-4 mr-2" />
              Export CSV
            </Button>
          </div>
        </div>

        {/* Students Table */}
        <StudentTable
          students={students}
          isLoading={isLoading}
          onViewDetails={handleViewDetails}
        />

        {/* Pagination */}
        {pagination && pagination.pages > 1 && (
          <div className="flex items-center justify-between bg-white border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600">
              Showing {((pagination.page - 1) * pagination.limit) + 1} to{' '}
              {Math.min(pagination.page * pagination.limit, pagination.total)} of{' '}
              {pagination.total} students
            </p>
            <div className="flex gap-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={page === 1}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setPage(prev => Math.min(pagination.pages, prev + 1))}
                disabled={page === pagination.pages}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Student Detail Drawer */}
      <StudentDetailDrawer
        studentId={selectedStudentId}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </DashboardLayout>
  );
};

export default InstructorStudentsPage;

