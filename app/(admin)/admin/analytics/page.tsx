'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { 
  Loader2, 
  RefreshCw, 
  AlertTriangle, 
  Users, 
  BookOpen, 
  GraduationCap, 
  Zap, 
  TrendingUp, 
  BarChart as BarChartIcon, 
  PieChart as PieChartIcon,
  Calendar, 
  Hexagon,
  Award,
  Clock,
  CheckCircle,
  XCircle,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { LoadingSpinner } from '@/components/shared/LoadingPlaceholder';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useToast } from '@/components/ui/use-toast';
import Link from 'next/link';

interface AnalyticsData {
  users: {
    total: number;
    newLastWeek: number;
    newLastMonth: number;
    byRole: Record<string, number>;
  };
  courses: {
    total: number;
    newLastMonth: number;
    byCategory: Record<string, number>;
    byStatus: Record<string, number>;
  };
  enrollments: {
    total: number;
    newLastWeek: number;
    newLastMonth: number;
    byStatus: Record<string, number>;
    completionRate: number;
    weeklyTrend: Array<{ date: string; count: number }>;
  };
  engagement: {
    totalMaterialInteractions: number;
    activeMaterialInteractionsLastWeek: number;
    averageCourseProgress: number;
  };
  trending: {
    courses: Array<{
      id: string;
      title: string;
      category: string;
      enrollmentsLastMonth: number;
      _count: {
        enrollments: number;
        materials: number;
      };
    }>;
  };
}

export default function AnalyticsPage() {
  const { data: session, status } = useSession();
  const [analyticsData, setAnalyticsData] = useState<AnalyticsData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeRange, setTimeRange] = useState('month');
  const { toast } = useToast();

  const fetchAnalyticsData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('/api/admin/analytics');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setAnalyticsData(data);
    } catch (err) {
      console.error('Failed to fetch analytics data:', err);
      setError(err instanceof Error ? err.message : 'Failed to load analytics data');
      toast({
        title: 'Error',
        description: 'Failed to load analytics data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchAnalyticsData();
    }
  }, [session]);

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8 mt-16 max-w-7xl flex justify-center items-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <LoadingSpinner className="h-10 w-10 mx-auto" />
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (!session?.user || session.user.role !== 'admin') {
    return (
      <div className="container mx-auto px-4 py-8 mt-16 max-w-7xl">
        <Card className="border-destructive shadow-lg">
          <CardHeader>
            <div className="flex items-center gap-3 text-destructive">
              <AlertTriangle className="h-6 w-6" />
              <CardTitle>Access Denied</CardTitle>
            </div>
            <CardDescription className="mt-2">
              You don't have permission to access this page.
            </CardDescription>
          </CardHeader>
          <CardContent className="pt-4">
            <p>Please contact an administrator if you believe this is an error.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const renderCategoryBadge = (category: string) => {
    const colorMap: Record<string, string> = {
      programming: 'bg-blue-50 text-blue-600 border-blue-200',
      design: 'bg-purple-50 text-purple-600 border-purple-200',
      marketing: 'bg-green-50 text-green-600 border-green-200',
      data: 'bg-orange-50 text-orange-600 border-orange-200',
      business: 'bg-amber-50 text-amber-600 border-amber-200',
      default: 'bg-gray-50 text-gray-600 border-gray-200',
    };
    
    return (
      <Badge variant="outline" className={colorMap[category] || colorMap.default}>
        {category}
      </Badge>
    );
  };

  const renderStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">Active</Badge>;
      case 'completed':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Completed</Badge>;
      case 'dropped':
        return <Badge variant="outline" className="bg-red-50 text-red-600 border-red-200">Dropped</Badge>;
      case 'draft':
        return <Badge variant="outline" className="bg-gray-50 text-gray-600 border-gray-200">Draft</Badge>;
      case 'published':
        return <Badge variant="outline" className="bg-green-50 text-green-600 border-green-200">Published</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const renderSimpleBarChart = (data: Record<string, number>, maxValue?: number) => {
    const items = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const highest = maxValue || Math.max(...items.map(([_, value]) => value));
    
    return (
      <div className="space-y-4">
        {items.map(([key, value]) => (
          <div key={key} className="space-y-1">
            <div className="flex items-center justify-between text-sm">
              <div className="capitalize font-medium">{key}</div>
              <div className="text-muted-foreground">{value}</div>
            </div>
            <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary"
                style={{ width: `${(value / highest) * 100}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Create a simple line chart for the enrollment trend
  const renderEnrollmentTrend = (data: Array<{ date: string; count: number }>) => {
    if (!data || data.length === 0) return <p>No trend data available</p>;
    
    // Sort by date
    const sortedData = [...data].sort((a, b) => 
      new Date(a.date).getTime() - new Date(b.date).getTime()
    );
    
    const maxValue = Math.max(...sortedData.map(item => item.count));
    const minValue = Math.min(...sortedData.map(item => item.count));
    const range = maxValue - minValue || 1;
    
    const chartHeight = 100; // Height in pixels
    
    // Generate points for the SVG polyline
    const points = sortedData.map((item, index) => {
      const x = (index / (sortedData.length - 1 || 1)) * 100;
      const y = 100 - ((item.count - minValue) / range) * 100;
      return `${x},${y}`;
    }).join(' ');
    
    return (
      <div className="pt-6">
        <div className="flex justify-between items-center mb-2">
          {sortedData.map((item, index) => {
            // Only show labels for first, middle and last points to avoid overcrowding
            if (index === 0 || index === sortedData.length - 1 || 
                index === Math.floor(sortedData.length / 2)) {
              return (
                <div key={item.date} className="text-xs text-muted-foreground">
                  {new Date(item.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric' })}
                </div>
              );
            }
            return <div key={item.date} className="text-xs invisible">.</div>;
          })}
        </div>
        
        <div className="relative h-32 w-full">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Grid lines */}
            <line x1="0" y1="0" x2="100" y2="0" stroke="hsl(var(--muted))" strokeWidth="0.5" />
            <line x1="0" y1="50" x2="100" y2="50" stroke="hsl(var(--muted))" strokeWidth="0.5" />
            <line x1="0" y1="100" x2="100" y2="100" stroke="hsl(var(--muted))" strokeWidth="0.5" />
            
            {/* Line chart */}
            <polyline
              points={points}
              fill="none"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
            />
            
            {/* Dots for data points */}
            {sortedData.map((item, index) => {
              const x = (index / (sortedData.length - 1 || 1)) * 100;
              const y = 100 - ((item.count - minValue) / range) * 100;
              return (
                <circle
                  key={item.date}
                  cx={x}
                  cy={y}
                  r="1.5"
                  fill="hsl(var(--primary))"
                />
              );
            })}
          </svg>
          
          {/* Y-axis labels */}
          <div className="absolute top-0 left-0 h-full flex flex-col justify-between pointer-events-none">
            <div className="text-xs text-muted-foreground">{maxValue}</div>
            <div className="text-xs text-muted-foreground">{Math.round((maxValue + minValue) / 2)}</div>
            <div className="text-xs text-muted-foreground">{minValue}</div>
          </div>
        </div>
      </div>
    );
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16 max-w-7xl flex justify-center items-center min-h-[50vh]">
        <div className="text-center space-y-4">
          <LoadingSpinner className="h-10 w-10 mx-auto" />
          <p className="text-muted-foreground">Loading analytics data...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8 mt-16 max-w-7xl">
        <Card className="border-destructive shadow-lg">
          <CardHeader className="pb-2">
            <div className="flex items-center gap-3 text-destructive">
              <AlertTriangle className="h-6 w-6" />
              <CardTitle>Failed to load analytics data</CardTitle>
            </div>
            <CardDescription className="mt-2">
              We couldn't load the analytics data at this time.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 pt-4">
            <div className="p-4 rounded-md bg-destructive/10 text-destructive text-sm">
              <p className="font-medium mb-2">Error details:</p>
              <p className="font-mono text-xs whitespace-normal break-words">{error}</p>
            </div>
            <Button 
              onClick={fetchAnalyticsData} 
              variant="outline" 
              className="gap-2"
            >
              <RefreshCw className="h-4 w-4" />
              Retry
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics Dashboard</h1>
          <p className="text-muted-foreground">
            Insights and statistics about your education platform
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[160px]">
              <SelectValue placeholder="Select time range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Last 7 days</SelectItem>
              <SelectItem value="month">Last 30 days</SelectItem>
              <SelectItem value="quarter">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchAnalyticsData}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
        </div>
      </div>

      {analyticsData && (
        <div className="space-y-6">
          {/* Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">{analyticsData.users.total}</div>
                  <Users className="h-8 w-8 text-primary opacity-75" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  +{analyticsData.users.newLastWeek} new in the last 7 days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">{analyticsData.courses.total}</div>
                  <BookOpen className="h-8 w-8 text-primary opacity-75" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  +{analyticsData.courses.newLastMonth} new in the last 30 days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Enrollments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">{analyticsData.enrollments.total}</div>
                  <GraduationCap className="h-8 w-8 text-primary opacity-75" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  +{analyticsData.enrollments.newLastWeek} new in the last 7 days
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex justify-between items-center">
                  <div className="text-3xl font-bold">{analyticsData.enrollments.completionRate}%</div>
                  <Award className="h-8 w-8 text-primary opacity-75" />
                </div>
                <p className="text-xs text-muted-foreground mt-2">
                  Average progress: {analyticsData.engagement.averageCourseProgress}%
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Tabs */}
          <Tabs defaultValue="users">
            <TabsList className="grid grid-cols-4 md:w-[600px]">
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="courses">Courses</TabsTrigger>
              <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
              <TabsTrigger value="trending">Trending</TabsTrigger>
            </TabsList>

            {/* Users Tab */}
            <TabsContent value="users" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>User Distribution by Role</CardTitle>
                    <CardDescription>Breakdown of users by their role</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderSimpleBarChart(analyticsData.users.byRole)}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Users Overview</CardTitle>
                    <CardDescription>Key user metrics</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-2xl font-bold">{analyticsData.users.total}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">New (30d)</p>
                          <p className="text-2xl font-bold">{analyticsData.users.newLastMonth}</p>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">Role Distribution</h4>
                        <div className="space-y-2">
                          {Object.entries(analyticsData.users.byRole).map(([role, count]) => (
                            <div key={role} className="flex justify-between items-center">
                              <div className="flex items-center">
                                {role === 'admin' ? (
                                  <Hexagon className="h-4 w-4 mr-2 text-primary" />
                                ) : role === 'instructor' ? (
                                  <BookOpen className="h-4 w-4 mr-2 text-primary" />
                                ) : (
                                  <Users className="h-4 w-4 mr-2 text-primary" />
                                )}
                                <span className="text-sm capitalize">{role}</span>
                              </div>
                              <span className="text-sm font-medium">{count}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Courses Tab */}
            <TabsContent value="courses" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Courses by Category</CardTitle>
                    <CardDescription>Distribution of courses by category</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderSimpleBarChart(analyticsData.courses.byCategory)}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Courses by Status</CardTitle>
                    <CardDescription>Distribution of courses by status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(analyticsData.courses.byStatus).map(([status, count]) => (
                        <div key={status} className="flex justify-between items-center">
                          <div>{renderStatusBadge(status)}</div>
                          <div className="text-sm font-medium">{count}</div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Course Metrics</CardTitle>
                    <CardDescription>Key statistics about courses</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">Total</p>
                          <p className="text-2xl font-bold">{analyticsData.courses.total}</p>
                        </div>
                        <div className="space-y-1">
                          <p className="text-sm text-muted-foreground">New (30d)</p>
                          <p className="text-2xl font-bold">{analyticsData.courses.newLastMonth}</p>
                        </div>
                      </div>
                      
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">Engagement</h4>
                        <div className="space-y-2">
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <GraduationCap className="h-4 w-4 mr-2 text-primary" />
                              <span className="text-sm">Enrollments</span>
                            </div>
                            <span className="text-sm font-medium">{analyticsData.enrollments.total}</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <div className="flex items-center">
                              <Zap className="h-4 w-4 mr-2 text-primary" />
                              <span className="text-sm">Material Interactions</span>
                            </div>
                            <span className="text-sm font-medium">{analyticsData.engagement.totalMaterialInteractions}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Enrollments Tab */}
            <TabsContent value="enrollments" className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card className="md:col-span-2">
                  <CardHeader>
                    <CardTitle>Enrollment Trend</CardTitle>
                    <CardDescription>Weekly enrollment count over time</CardDescription>
                  </CardHeader>
                  <CardContent>
                    {renderEnrollmentTrend(analyticsData.enrollments.weeklyTrend)}
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Enrollment Status</CardTitle>
                    <CardDescription>Distribution by status</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {Object.entries(analyticsData.enrollments.byStatus).map(([status, count]) => (
                        <div key={status} className="flex justify-between items-center">
                          <div>{renderStatusBadge(status)}</div>
                          <div className="text-sm font-medium">{count}</div>
                        </div>
                      ))}
                      
                      <div className="pt-4 border-t">
                        <h4 className="text-sm font-medium mb-2">Completion Rate</h4>
                        <div className="space-y-2">
                          <div className="flex items-center justify-between">
                            <span className="text-sm">Course Completion</span>
                            <span className="text-sm font-medium">{analyticsData.enrollments.completionRate}%</span>
                          </div>
                          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary"
                              style={{ width: `${analyticsData.enrollments.completionRate}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            {/* Trending Tab */}
            <TabsContent value="trending" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Trending Courses</CardTitle>
                  <CardDescription>Most popular courses in the last 30 days</CardDescription>
                </CardHeader>
                <CardContent>
                  {analyticsData.trending.courses.length > 0 ? (
                    <div className="space-y-6">
                      {analyticsData.trending.courses.map((course, index) => (
                        <div key={course.id} className="flex items-start gap-4">
                          <div className="flex-shrink-0 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                            <span className="text-lg font-bold text-primary">#{index + 1}</span>
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <Link href={`/admin/content/courses/${course.id}`} className="font-medium hover:underline">
                                {course.title}
                              </Link>
                              <div className="flex items-center gap-1">
                                <GraduationCap className="h-4 w-4 text-muted-foreground" />
                                <span className="text-sm font-medium">{course._count.enrollments}</span>
                              </div>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              {renderCategoryBadge(course.category)}
                              <span>•</span>
                              <span>{course._count.materials} materials</span>
                            </div>
                            <div className="flex items-center gap-2 mt-1">
                              <TrendingUp className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-green-600">
                                {course.enrollmentsLastMonth} new enrollments in the last 30 days
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <Clock className="mx-auto h-8 w-8 text-muted-foreground" />
                      <h3 className="mt-2 text-lg font-semibold">No trending data yet</h3>
                      <p className="text-sm text-muted-foreground">
                        We don't have enough data to show trending courses.
                        Check back soon as more enrollments are recorded.
                      </p>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
} 