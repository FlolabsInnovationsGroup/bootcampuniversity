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
  RefreshCw, 
  AlertTriangle, 
  Users, 
  CheckCircle,
  XCircle,
  ClockIcon,
  Filter,
  GraduationCap,
  User,
  Calendar,
  ChevronDown,
  ChevronRight,
  Activity,
  BookOpen
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/shared/LoadingPlaceholder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import Link from 'next/link';

interface UserInfo {
  id: string;
  name: string;
  email: string;
  image?: string | null;
}

interface MaterialInfo {
  id: string;
  title: string;
  type: string;
  order: number;
}

interface CourseInfo {
  id: string;
  title: string;
  category: string;
  materials: MaterialInfo[];
}

interface MaterialProgressInfo {
  id: string;
  userId: string;
  materialId: string;
  progress: number;
  lastPosition: number;
  updatedAt: string;
  material: MaterialInfo;
}

interface EnrollmentProgress {
  id: string;
  userId: string;
  courseId: string;
  status: 'active' | 'completed' | 'dropped';
  progress: number;
  enrolledAt: string;
  updatedAt: string;
  user: UserInfo;
  course: CourseInfo;
  materialProgresses: MaterialProgressInfo[];
  stats: {
    totalMaterials: number;
    completedMaterials: number;
    inProgressMaterials: number;
    notStartedMaterials: number;
    completionPercentage: number;
  };
}

export default function ProgressPage() {
  const { data: session, status } = useSession();
  const [progressData, setProgressData] = useState<EnrollmentProgress[]>([]);
  const [users, setUsers] = useState<UserInfo[]>([]);
  const [courses, setCourses] = useState<CourseInfo[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [progressFilter, setProgressFilter] = useState('all');
  const [expandedEnrollments, setExpandedEnrollments] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Fetch data
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
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      toast({
        title: 'Error',
        description: 'Failed to load courses. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const fetchProgressData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      let url = '/api/admin/progress';
      
      if (courseFilter !== 'all') {
        url += `?courseId=${courseFilter}`;
      }
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setProgressData(data);
    } catch (err) {
      console.error('Failed to fetch progress data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load progress data');
      toast({
        title: 'Error',
        description: 'Failed to load progress data. Please try again.',
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
      fetchProgressData();
    }
  }, [session]);

  // Refetch when courseFilter changes
  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchProgressData();
    }
  }, [courseFilter]);

  const handleProgressUpdate = async (enrollmentId: string, newProgress: number) => {
    try {
      const response = await fetch('/api/admin/progress', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          enrollmentId,
          progress: newProgress,
        }),
      });
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      // Update local state
      setProgressData(prevData =>
        prevData.map(enrollment =>
          enrollment.id === enrollmentId
            ? { ...enrollment, progress: newProgress }
            : enrollment
        )
      );
      
      toast({
        title: 'Progress updated',
        description: `Progress has been updated to ${newProgress}%.`,
      });
    } catch (err) {
      console.error('Failed to update progress:', err);
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to update progress',
        variant: 'destructive',
      });
    }
  };

  const toggleEnrollmentExpanded = (enrollmentId: string) => {
    setExpandedEnrollments(prev => {
      if (prev.includes(enrollmentId)) {
        return prev.filter(id => id !== enrollmentId);
      } else {
        return [...prev, enrollmentId];
      }
    });
  };

  // Filter functions
  const filterByProgress = (enrollment: EnrollmentProgress) => {
    switch(progressFilter) {
      case 'all':
        return true;
      case 'not-started':
        return enrollment.progress === 0;
      case 'in-progress':
        return enrollment.progress > 0 && enrollment.progress < 100;
      case 'completed':
        return enrollment.progress === 100;
      default:
        return true;
    }
  };

  const filteredProgressData = progressData.filter(enrollment => {
    const matchesSearch = 
      enrollment.user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      enrollment.course.title.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesSearch && filterByProgress(enrollment);
  });

  // Helper functions
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

  const getProgressColor = (progressValue: number) => {
    if (progressValue === 0) return 'bg-muted';
    if (progressValue < 25) return 'bg-red-500';
    if (progressValue < 50) return 'bg-orange-500';
    if (progressValue < 75) return 'bg-yellow-500';
    if (progressValue < 100) return 'bg-blue-500';
    return 'bg-green-500';
  };

  const getMaterialTypeIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <Badge variant="outline" className="bg-purple-50 text-purple-600 border-purple-200">Video</Badge>;
      case 'text':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Text</Badge>;
      case 'quiz':
        return <Badge variant="outline" className="bg-orange-50 text-orange-600 border-orange-200">Quiz</Badge>;
      case 'file':
        return <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">File</Badge>;
      default:
        return <Badge variant="outline">{type}</Badge>;
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
        <h1 className="text-2xl font-bold tracking-tight">Student Progress</h1>
        <p className="text-muted-foreground">
          Track and manage student progress across courses
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-4">
        <Card className="md:w-1/4">
          <CardHeader>
            <CardTitle>Progress Overview</CardTitle>
            <CardDescription>Summary of student progress</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-1">Total Enrollments</p>
              <p className="text-3xl font-bold">{progressData.length}</p>
            </div>

            <div>
              <p className="text-sm font-medium mb-1">Average Completion</p>
              <p className="text-3xl font-bold">
                {progressData.length > 0
                  ? Math.round(
                      progressData.reduce((sum, item) => sum + item.progress, 0) /
                        progressData.length
                    )
                  : 0}%
              </p>
              <Progress 
                value={
                  progressData.length > 0
                    ? Math.round(
                        progressData.reduce((sum, item) => sum + item.progress, 0) /
                          progressData.length
                      )
                    : 0
                } 
                className="h-2 mt-1" 
              />
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">Completed</div>
                <div className="text-xl font-bold text-green-600">
                  {progressData.filter(item => item.progress === 100).length}
                </div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">In Progress</div>
                <div className="text-xl font-bold text-blue-600">
                  {progressData.filter(item => item.progress > 0 && item.progress < 100).length}
                </div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">Not Started</div>
                <div className="text-xl font-bold text-orange-600">
                  {progressData.filter(item => item.progress === 0).length}
                </div>
              </div>
              <div className="rounded-md border p-3">
                <div className="text-xs text-muted-foreground">Total Materials</div>
                <div className="text-xl font-bold">
                  {progressData.reduce((sum, item) => sum + item.stats.totalMaterials, 0)}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="md:w-3/4">
          <CardHeader className="pb-3">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <CardTitle>Progress Details</CardTitle>
                <CardDescription>
                  Detailed progress for each student and course
                </CardDescription>
              </div>
              <div className="flex gap-2">
                <Select value={courseFilter} onValueChange={setCourseFilter}>
                  <SelectTrigger className="w-[180px]">
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
                <Select value={progressFilter} onValueChange={setProgressFilter}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Filter by progress" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Progress</SelectItem>
                    <SelectItem value="not-started">Not Started</SelectItem>
                    <SelectItem value="in-progress">In Progress</SelectItem>
                    <SelectItem value="completed">Completed</SelectItem>
                  </SelectContent>
                </Select>
                <Button variant="outline" onClick={fetchProgressData}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Refresh
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <div className="relative mb-4">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by student or course..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            <div className="space-y-4">
              {loading ? (
                <div className="flex justify-center py-10">
                  <LoadingSpinner className="h-8 w-8" />
                </div>
              ) : error ? (
                <div className="text-center py-10">
                  <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
                  <h3 className="mt-2 text-lg font-semibold">Failed to load progress data</h3>
                  <p className="text-muted-foreground mb-4">{error}</p>
                  <Button onClick={fetchProgressData}>
                    <RefreshCw className="mr-2 h-4 w-4" /> Retry
                  </Button>
                </div>
              ) : filteredProgressData.length === 0 ? (
                <div className="text-center py-10">
                  <Users className="mx-auto h-12 w-12 text-muted-foreground" />
                  <h3 className="mt-2 text-lg font-semibold">No progress data found</h3>
                  <p className="text-muted-foreground">
                    Try adjusting your search or filters to find what you're looking for.
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredProgressData.map((enrollment) => (
                    <Collapsible key={enrollment.id} open={expandedEnrollments.includes(enrollment.id)}
                      onOpenChange={() => toggleEnrollmentExpanded(enrollment.id)}
                      className="rounded-md border overflow-hidden"
                    >
                      <CollapsibleTrigger asChild>
                        <div className="flex cursor-pointer p-4 hover:bg-muted/50">
                          <div className="flex-1">
                            <div className="flex items-center gap-2">
                              {expandedEnrollments.includes(enrollment.id) ? 
                                <ChevronDown className="h-4 w-4 text-muted-foreground" /> : 
                                <ChevronRight className="h-4 w-4 text-muted-foreground" />
                              }
                              <div className="flex items-center gap-2">
                                {enrollment.user.image ? (
                                  <img src={enrollment.user.image} alt={enrollment.user.name} className="h-8 w-8 rounded-full" />
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
                            </div>
                          </div>
                          <div className="flex-1">
                            <div className="font-medium">{enrollment.course.title}</div>
                            <div className="text-sm text-muted-foreground capitalize">{enrollment.course.category}</div>
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <div className="font-medium">Progress: {enrollment.progress}%</div>
                              {getStatusBadge(enrollment.status)}
                            </div>
                            <div className="mt-1 h-2 w-full bg-muted rounded-full overflow-hidden">
                              <div 
                                className={`h-full ${getProgressColor(enrollment.progress)}`}
                                style={{ width: `${enrollment.progress}%` }}
                              />
                            </div>
                          </div>
                        </div>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <div className="border-t p-4">
                          <div className="mb-4">
                            <div className="flex items-center justify-between">
                              <h4 className="text-sm font-medium mb-2">Course Statistics</h4>
                              <div className="flex gap-2 items-center">
                                <span className="text-xs text-muted-foreground">Last Updated:</span>
                                <span className="text-xs">{new Date(enrollment.updatedAt).toLocaleDateString()}</span>
                              </div>
                            </div>
                            <div className="grid grid-cols-4 gap-2">
                              <div className="rounded-md border p-2">
                                <div className="text-xs text-muted-foreground">Total Materials</div>
                                <div className="text-lg font-bold">{enrollment.stats.totalMaterials}</div>
                              </div>
                              <div className="rounded-md border p-2">
                                <div className="text-xs text-muted-foreground">Completed</div>
                                <div className="text-lg font-bold text-green-600">{enrollment.stats.completedMaterials}</div>
                              </div>
                              <div className="rounded-md border p-2">
                                <div className="text-xs text-muted-foreground">In Progress</div>
                                <div className="text-lg font-bold text-blue-600">{enrollment.stats.inProgressMaterials}</div>
                              </div>
                              <div className="rounded-md border p-2">
                                <div className="text-xs text-muted-foreground">Not Started</div>
                                <div className="text-lg font-bold text-orange-600">{enrollment.stats.notStartedMaterials}</div>
                              </div>
                            </div>
                          </div>

                          <h4 className="text-sm font-medium mb-2">Material Progress</h4>
                          <div className="rounded-md border overflow-hidden">
                            <div className="bg-muted/50 px-4 py-2 grid grid-cols-12 text-xs font-medium">
                              <div className="col-span-1">#</div>
                              <div className="col-span-6">Material</div>
                              <div className="col-span-2">Type</div>
                              <div className="col-span-3">Progress</div>
                            </div>
                            <div className="divide-y">
                              {enrollment.course.materials.map((material, index) => {
                                const materialProgress = enrollment.materialProgresses.find(
                                  mp => mp.materialId === material.id
                                );
                                const progress = materialProgress ? materialProgress.progress : 0;
                                
                                return (
                                  <div key={material.id} className="px-4 py-3 grid grid-cols-12 items-center text-sm">
                                    <div className="col-span-1 text-muted-foreground">{material.order}</div>
                                    <div className="col-span-6 font-medium">{material.title}</div>
                                    <div className="col-span-2">{getMaterialTypeIcon(material.type)}</div>
                                    <div className="col-span-3">
                                      <div className="flex items-center gap-2">
                                        <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                          <div 
                                            className={`h-full ${getProgressColor(progress)}`}
                                            style={{ width: `${progress}%` }}
                                          />
                                        </div>
                                        <span className="text-xs">{progress}%</span>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>

                          <div className="mt-4 flex justify-between">
                            <div>
                              <Link 
                                href={`/admin/enrollments?userId=${enrollment.userId}`} 
                                className="text-sm text-blue-600 hover:underline"
                              >
                                View All Enrollments
                              </Link>
                            </div>
                            <div className="flex items-center gap-2">
                              <Label htmlFor={`progress-${enrollment.id}`} className="text-sm">Update Overall Progress:</Label>
                              <Select 
                                value={enrollment.progress.toString()}
                                onValueChange={(value) => handleProgressUpdate(enrollment.id, parseInt(value))}
                              >
                                <SelectTrigger className="w-[100px] h-8">
                                  <SelectValue placeholder="Progress" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="0">0%</SelectItem>
                                  <SelectItem value="25">25%</SelectItem>
                                  <SelectItem value="50">50%</SelectItem>
                                  <SelectItem value="75">75%</SelectItem>
                                  <SelectItem value="100">100%</SelectItem>
                                </SelectContent>
                              </Select>
                            </div>
                          </div>
                        </div>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 