'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { 
  Loader2, 
  Search, 
  Plus, 
  RefreshCw, 
  AlertTriangle, 
  Users, 
  CheckCircle,
  XCircle,
  ClockIcon,
  UserCog,
  Filter,
  GraduationCap,
  ArrowUpDown,
  User,
  Calendar
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/shared/LoadingPlaceholder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

interface User {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface Course {
  id: string;
  title: string;
  category: string;
}

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  status: 'active' | 'completed' | 'dropped';
  progress: number;
  enrolledAt: string;
  updatedAt: string;
  user: {
    id: string;
    name: string;
    email: string;
    image?: string | null;
  };
  course: {
    id: string;
    title: string;
    category: string;
  };
}

export default function EnrollmentsPage() {
  const { data: session, status } = useSession();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isBulkEnrollDialogOpen, setIsBulkEnrollDialogOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  
  // Add sorting functionality
  const [sortColumn, setSortColumn] = useState('enrolledAt');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc');
  const [activeTab, setActiveTab] = useState('all');

  const [newEnrollment, setNewEnrollment] = useState({
    userId: '',
    courseId: '',
    status: 'active',
  });

  const [bulkEnrollment, setBulkEnrollment] = useState({
    userIds: [] as string[],
    courseId: '',
    status: 'active',
  });

  // Fetch data functions
  const fetchUsers = async () => {
    try {
      const response = await fetch('/api/admin/users');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setUsers(data);
    } catch (err) {
      console.error('Failed to fetch users:', err);
      toast({
        title: 'Error',
        description: 'Failed to load users. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/admin/courses');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setCourses(data);
      
      // If we have courses and no courseId selected yet, select the first one
      if (data.length > 0) {
        if (newEnrollment.courseId === '') {
          setNewEnrollment(prev => ({ ...prev, courseId: data[0].id }));
        }
        if (bulkEnrollment.courseId === '') {
          setBulkEnrollment(prev => ({ ...prev, courseId: data[0].id }));
        }
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      toast({
        title: 'Error',
        description: 'Failed to load courses. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const fetchEnrollments = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/admin/enrollments');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setEnrollments(data);
    } catch (err) {
      console.error('Failed to fetch enrollments:', err);
      setError(err instanceof Error ? err.message : 'Failed to load enrollments');
      toast({
        title: 'Error',
        description: 'Failed to load enrollments. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchUsers();
      fetchCourses();
      fetchEnrollments();
    }
  }, [session]);

  // Toggle sort function
  const toggleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  // Filter and sort enrollments
  const filteredEnrollments = enrollments.filter((enrollment) => {
    const matchesSearch = 
      enrollment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
      enrollment.user.email.toLowerCase().includes(searchTerm.toLowerCase()) || 
      enrollment.course.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCourse = courseFilter === 'all' || enrollment.courseId === courseFilter;
    const matchesStatus = activeTab === 'all' || enrollment.status === activeTab;
    
    return matchesSearch && matchesCourse && matchesStatus;
  }).sort((a, b) => {
    // Sort based on the selected column
    if (sortColumn === 'user') {
      return sortDirection === 'asc' 
        ? a.user.name.localeCompare(b.user.name)
        : b.user.name.localeCompare(a.user.name);
    }
    if (sortColumn === 'course') {
      return sortDirection === 'asc'
        ? a.course.title.localeCompare(b.course.title)
        : b.course.title.localeCompare(a.course.title);
    }
    if (sortColumn === 'status') {
      return sortDirection === 'asc'
        ? a.status.localeCompare(b.status)
        : b.status.localeCompare(a.status);
    }
    if (sortColumn === 'progress') {
      return sortDirection === 'asc'
        ? a.progress - b.progress
        : b.progress - a.progress;
    }
    if (sortColumn === 'enrolledAt') {
      return sortDirection === 'asc'
        ? new Date(a.enrolledAt).getTime() - new Date(b.enrolledAt).getTime()
        : new Date(b.enrolledAt).getTime() - new Date(a.enrolledAt).getTime();
    }
    return 0;
  });

  // Create a single enrollment
  const handleCreateEnrollment = async () => {
    if (!newEnrollment.userId || !newEnrollment.courseId) {
      toast({
        title: 'Missing information',
        description: 'Please select both a user and a course.',
        variant: 'destructive',
      });
      return;
    }
    
    setSaving(true);
    
    try {
      const response = await fetch('/api/admin/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newEnrollment),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }
      
      const createdEnrollment = await response.json();
      
      setEnrollments([createdEnrollment, ...enrollments]);
      setNewEnrollment({
        userId: '',
        courseId: courses.length > 0 ? courses[0].id : '',
        status: 'active',
      });
      setIsCreateDialogOpen(false);
      
      toast({
        title: 'Success',
        description: 'Student has been enrolled in the course.',
      });
    } catch (err) {
      console.error('Failed to create enrollment:', err);
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to create enrollment',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  // Bulk enroll multiple students
  const handleBulkEnrollment = async () => {
    if (bulkEnrollment.userIds.length === 0 || !bulkEnrollment.courseId) {
      toast({
        title: 'Missing information',
        description: 'Please select at least one user and a course.',
        variant: 'destructive',
      });
      return;
    }
    
    setSaving(true);
    
    try {
      const response = await fetch('/api/admin/enrollments', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bulkEnrollment),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }
      
      const result = await response.json();
      
      // Refresh enrollments after bulk operation
      fetchEnrollments();
      
      setBulkEnrollment({
        userIds: [],
        courseId: courses.length > 0 ? courses[0].id : '',
        status: 'active',
      });
      setIsBulkEnrollDialogOpen(false);
      
      toast({
        title: 'Bulk Enrollment Complete',
        description: result.message,
      });
    } catch (err) {
      console.error('Failed to perform bulk enrollment:', err);
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to process bulk enrollment',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  // Helper functions for UI
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          <ClockIcon className="h-3 w-3 mr-1" /> Active
        </Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">
          <CheckCircle className="h-3 w-3 mr-1" /> Completed
        </Badge>;
      case 'dropped':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">
          <XCircle className="h-3 w-3 mr-1" /> Dropped
        </Badge>;
      default:
        return null;
    }
  };

  if (status === 'loading') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (!session?.user || session.user.role !== 'admin') {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle />
            <CardTitle>Access Denied</CardTitle>
          </div>
          <CardDescription>
            You don't have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please contact an administrator if you believe this is an error.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Course Enrollments</h1>
        <p className="text-muted-foreground">
          Manage student enrollments in courses
        </p>
      </div>

      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <div className="flex justify-between items-center">
          <TabsList>
            <TabsTrigger value="all">All Enrollments</TabsTrigger>
            <TabsTrigger value="active">Active</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="dropped">Dropped</TabsTrigger>
          </TabsList>
          <div className="flex gap-2">
            <Button variant="outline" onClick={fetchEnrollments}>
              <RefreshCw className="mr-2 h-4 w-4" /> Refresh
            </Button>
            <Button onClick={() => setIsCreateDialogOpen(true)}>
              <Plus className="mr-2 h-4 w-4" /> Add Enrollment
            </Button>
            <Button onClick={() => setIsBulkEnrollDialogOpen(true)} variant="secondary">
              <Users className="mr-2 h-4 w-4" /> Bulk Enroll
            </Button>
          </div>
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search enrollments by user or course..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-[180px]">
              <Filter className="h-4 w-4 mr-2" />
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <TabsContent value="all" className="space-y-4">
          <EnrollmentTable 
            enrollments={filteredEnrollments} 
            loading={loading} 
            error={error} 
            onRefresh={fetchEnrollments}
            getStatusBadge={getStatusBadge}
            toggleSort={toggleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
        </TabsContent>
        
        <TabsContent value="active" className="space-y-4">
          <EnrollmentTable 
            enrollments={filteredEnrollments.filter(e => e.status === 'active')} 
            loading={loading} 
            error={error} 
            onRefresh={fetchEnrollments}
            getStatusBadge={getStatusBadge}
            toggleSort={toggleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
        </TabsContent>
        
        <TabsContent value="completed" className="space-y-4">
          <EnrollmentTable 
            enrollments={filteredEnrollments.filter(e => e.status === 'completed')} 
            loading={loading} 
            error={error} 
            onRefresh={fetchEnrollments}
            getStatusBadge={getStatusBadge}
            toggleSort={toggleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
        </TabsContent>
        
        <TabsContent value="dropped" className="space-y-4">
          <EnrollmentTable 
            enrollments={filteredEnrollments.filter(e => e.status === 'dropped')} 
            loading={loading} 
            error={error} 
            onRefresh={fetchEnrollments}
            getStatusBadge={getStatusBadge}
            toggleSort={toggleSort}
            sortColumn={sortColumn}
            sortDirection={sortDirection}
          />
        </TabsContent>
      </Tabs>

      {/* Create Enrollment Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Enrollment</DialogTitle>
            <DialogDescription>
              Enroll a student in a course. Fill in the details below.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="userId">Student</Label>
              <Select 
                value={newEnrollment.userId}
                onValueChange={(value) => setNewEnrollment({...newEnrollment, userId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select student" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="courseId">Course</Label>
              <Select 
                value={newEnrollment.courseId}
                onValueChange={(value) => setNewEnrollment({...newEnrollment, courseId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={newEnrollment.status}
                onValueChange={(value) => setNewEnrollment({
                  ...newEnrollment, 
                  status: value as 'active' | 'completed' | 'dropped'
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="dropped">Dropped</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateEnrollment} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Enrollment'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Bulk Enrollment Dialog */}
      <Dialog open={isBulkEnrollDialogOpen} onOpenChange={setIsBulkEnrollDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Bulk Student Enrollment</DialogTitle>
            <DialogDescription>
              Enroll multiple students in a course at once.
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="userIds">Students</Label>
              <Select 
                value={bulkEnrollment.userIds.join(',')}
                onValueChange={(value) => {
                  const userIds = value.split(',').filter(id => id);
                  setBulkEnrollment({...bulkEnrollment, userIds});
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select students" />
                </SelectTrigger>
                <SelectContent>
                  {users.map((user) => (
                    <SelectItem key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground pt-1">
                Selected: {bulkEnrollment.userIds.length} students
              </p>
            </div>
            
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="courseId">Course</Label>
              <Select 
                value={bulkEnrollment.courseId}
                onValueChange={(value) => setBulkEnrollment({...bulkEnrollment, courseId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="status">Status</Label>
              <Select 
                value={bulkEnrollment.status}
                onValueChange={(value) => setBulkEnrollment({
                  ...bulkEnrollment, 
                  status: value as 'active' | 'completed' | 'dropped'
                })}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="completed">Completed</SelectItem>
                  <SelectItem value="dropped">Dropped</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsBulkEnrollDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleBulkEnrollment} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Processing...
                </>
              ) : (
                'Enroll Students'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// EnrollmentTable component
interface EnrollmentTableProps {
  enrollments: Enrollment[];
  loading: boolean;
  error: string | null;
  onRefresh: () => void;
  getStatusBadge: (status: string) => JSX.Element | null;
  toggleSort: (column: string) => void;
  sortColumn: string;
  sortDirection: 'asc' | 'desc';
}

function EnrollmentTable({ 
  enrollments, 
  loading, 
  error, 
  onRefresh,
  getStatusBadge,
  toggleSort,
  sortColumn,
  sortDirection,
}: EnrollmentTableProps) {
  const { toast } = useToast();
  const [updating, setUpdating] = useState(false);
  
  const handleUpdateStatus = async (id: string, status: 'active' | 'completed' | 'dropped') => {
    setUpdating(true);
    
    try {
      const response = await fetch(`/api/admin/enrollments/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }
      
      toast({
        title: 'Status updated',
        description: `Enrollment status has been updated to ${status}.`,
      });
      
      // Refresh enrollments after update
      onRefresh();
    } catch (err) {
      console.error('Failed to update enrollment status:', err);
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to update status',
        variant: 'destructive',
      });
    } finally {
      setUpdating(false);
    }
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>Student Enrollments</CardTitle>
        <CardDescription>
          {enrollments.length} enrollment{enrollments.length !== 1 ? 's' : ''} found
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {loading ? (
            <div className="flex justify-center py-10">
              <LoadingSpinner className="h-8 w-8" />
            </div>
          ) : error ? (
            <div className="text-center py-10">
              <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
              <h3 className="mt-2 text-lg font-semibold">Failed to load enrollments</h3>
              <p className="text-muted-foreground mb-4">{error}</p>
              <Button onClick={onRefresh}>
                <RefreshCw className="mr-2 h-4 w-4" /> Retry
              </Button>
            </div>
          ) : enrollments.length === 0 ? (
            <div className="text-center py-10">
              <Users className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-2 text-lg font-semibold">No enrollments found</h3>
              <p className="text-muted-foreground">
                No enrollments match your current filters. Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="rounded-md border">
              <div className="relative w-full overflow-auto">
                <table className="w-full caption-bottom text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th 
                        className="h-12 px-4 text-left align-middle font-medium cursor-pointer hover:bg-muted/70"
                        onClick={() => toggleSort('user')}
                      >
                        <div className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Student
                          {sortColumn === 'user' && (
                            sortDirection === 'asc' ? ' ↑' : ' ↓'
                          )}
                        </div>
                      </th>
                      <th 
                        className="h-12 px-4 text-left align-middle font-medium cursor-pointer hover:bg-muted/70"
                        onClick={() => toggleSort('course')}
                      >
                        <div className="flex items-center">
                          <GraduationCap className="h-4 w-4 mr-2" />
                          Course
                          {sortColumn === 'course' && (
                            sortDirection === 'asc' ? ' ↑' : ' ↓'
                          )}
                        </div>
                      </th>
                      <th 
                        className="h-12 px-4 text-left align-middle font-medium cursor-pointer hover:bg-muted/70"
                        onClick={() => toggleSort('status')}
                      >
                        <div className="flex items-center">
                          Status
                          {sortColumn === 'status' && (
                            sortDirection === 'asc' ? ' ↑' : ' ↓'
                          )}
                        </div>
                      </th>
                      <th 
                        className="h-12 px-4 text-left align-middle font-medium cursor-pointer hover:bg-muted/70"
                        onClick={() => toggleSort('progress')}
                      >
                        <div className="flex items-center">
                          Progress
                          {sortColumn === 'progress' && (
                            sortDirection === 'asc' ? ' ↑' : ' ↓'
                          )}
                        </div>
                      </th>
                      <th 
                        className="h-12 px-4 text-left align-middle font-medium cursor-pointer hover:bg-muted/70"
                        onClick={() => toggleSort('enrolledAt')}
                      >
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-2" />
                          Enrolled Date
                          {sortColumn === 'enrolledAt' && (
                            sortDirection === 'asc' ? ' ↑' : ' ↓'
                          )}
                        </div>
                      </th>
                      <th className="h-12 px-4 text-left align-middle font-medium">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {enrollments.map((enrollment) => (
                      <tr key={enrollment.id} className="border-b hover:bg-muted/50">
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            {enrollment.user.image ? (
                              <img 
                                src={enrollment.user.image} 
                                alt={enrollment.user.name}
                                className="h-8 w-8 rounded-full" 
                              />
                            ) : (
                              <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
                                <User className="h-4 w-4" />
                              </div>
                            )}
                            <div>
                              <div className="font-medium">{enrollment.user.name}</div>
                              <div className="text-sm text-muted-foreground">{enrollment.user.email}</div>
                            </div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          <div>
                            <div className="font-medium">{enrollment.course.title}</div>
                            <div className="text-sm text-muted-foreground capitalize">{enrollment.course.category}</div>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          {getStatusBadge(enrollment.status)}
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <div className="h-2 w-24 bg-muted rounded-full overflow-hidden">
                              <div 
                                className="h-full bg-primary" 
                                style={{ width: `${enrollment.progress}%` }}
                              />
                            </div>
                            <span className="text-sm">{enrollment.progress}%</span>
                          </div>
                        </td>
                        <td className="p-4 align-middle">
                          {new Date(enrollment.enrolledAt).toLocaleDateString()}
                        </td>
                        <td className="p-4 align-middle">
                          <div className="flex items-center gap-2">
                            <Select 
                              defaultValue={enrollment.status}
                              onValueChange={(value) => {
                                handleUpdateStatus(
                                  enrollment.id, 
                                  value as 'active' | 'completed' | 'dropped'
                                );
                              }}
                              disabled={updating}
                            >
                              <SelectTrigger className="h-8 w-[130px]">
                                <SelectValue placeholder="Change status" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="active">Mark as Active</SelectItem>
                                <SelectItem value="completed">Mark as Completed</SelectItem>
                                <SelectItem value="dropped">Mark as Dropped</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}