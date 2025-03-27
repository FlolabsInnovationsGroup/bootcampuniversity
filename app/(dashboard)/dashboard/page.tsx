'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { CalendarDays, Book, Users, Percent, Activity, FileText, BookOpen } from 'lucide-react';

interface DashboardData {
  stats: {
    totalCourses: number;
    completedCourses: number;
    activeUsers: number;
    averageProgress: number;
  };
  recentActivity: Array<{
    id: string | number;
    title: string;
    description: string;
    date: string;
    icon: string;
  }>;
  upcomingSchedule: Array<{
    id: string | number;
    title: string;
    description: string;
    time: string;
    duration: string;
  }>;
  userProgress: Array<{
    id: string | number;
    title: string;
    progress: number;
    lastUpdated: string;
  }>;
}

// Updated to fetch real data
async function fetchDashboardData(userId?: string): Promise<DashboardData> {
  // Return default stats if no user ID is provided
  if (!userId) {
    return {
      stats: {
        totalCourses: 0,
        completedCourses: 0,
        activeUsers: 0,
        averageProgress: 0,
      },
      recentActivity: [],
      upcomingSchedule: [],
      userProgress: [],
    };
  }

  try {
    // Fetch user progress data
    const progressResponse = await fetch(`/api/user/progress?userId=${userId}`);
    const progressData = await progressResponse.json();
    
    // Fetch courses data
    const coursesResponse = await fetch('/api/courses');
    const coursesData = await coursesResponse.json();
    
    // Fetch user enrollments
    const enrollmentsResponse = await fetch(`/api/user/enrollments`);
    const enrollmentsData = await enrollmentsResponse.json();
    
    // Calculate stats
    const totalCourses = coursesData.courses?.length || 0;
    const completedCourses = progressData.materials?.filter((p: any) => p.progress === 100)?.length || 0;
    const totalProgressItems = progressData.materials?.length || 1;
    const totalProgressValue = progressData.materials?.reduce((sum: number, item: any) => sum + item.progress, 0) || 0;
    const averageProgress = Math.round(totalProgressValue / (totalProgressItems || 1));
    
    // Generate recent activity from progress and enrollments
    const recentActivity = [
      ...(progressData.materials?.slice(0, 3).map((p: any) => ({
        id: p.id,
        title: `You made progress on ${p.material.title}`,
        description: `${p.progress}% complete`,
        date: new Date(p.updatedAt).toLocaleDateString(),
        icon: 'activity',
      })) || []),
      ...(enrollmentsData.enrollments?.slice(0, 2).map((e: any) => ({
        id: e.id,
        title: `You enrolled in ${e.course.title}`,
        description: e.course.description.substring(0, 50) + '...',
        date: new Date(e.enrolledAt).toLocaleDateString(),
        icon: 'enrollment',
      })) || []),
    ].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()).slice(0, 5);
    
    // Create upcoming schedule based on enrolled courses
    const upcomingSchedule = enrollmentsData.enrollments?.slice(0, 3).map((e: any) => ({
      id: e.id,
      title: e.course.title,
      description: 'Continue your learning journey',
      time: '9:00 AM',
      duration: e.course.duration ? `${e.course.duration} mins` : 'Flexible',
    })) || [];
    
    // Format user progress
    const userProgress = progressData.materials?.slice(0, 5).map((p: any) => ({
      id: p.id,
      title: p.material.title,
      progress: p.progress,
      lastUpdated: new Date(p.updatedAt).toLocaleDateString(),
    })) || [];
    
    return {
      stats: {
        totalCourses,
        completedCourses,
        activeUsers: 15, // This would typically come from an admin API
        averageProgress,
      },
      recentActivity,
      upcomingSchedule,
      userProgress,
    };
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    throw new Error('Failed to fetch dashboard data');
  }
}

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const [dashboardData, setDashboardData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    // Redirect admin users to admin dashboard
    if (status === 'authenticated' && session?.user?.role === 'admin') {
      router.push('/admin-dashboard');
      return;
    }

    const fetchData = async () => {
      try {
        const result = await fetchDashboardData(session?.user?.id);
        setDashboardData(result);
      } catch (err) {
        console.error('Error loading dashboard data:', err);
      } finally {
        setLoading(false);
      }
    };

    if (status !== 'loading') {
      fetchData();
    }
  }, [status, session, router]);

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!dashboardData) return null;

  const { stats, recentActivity, upcomingSchedule, userProgress } = dashboardData;

  return (
    <main className="container py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, {session?.user?.name}</p>
        </div>
        <Avatar className="h-12 w-12">
          <AvatarImage src={session?.user?.image || ""} alt={session?.user?.name || "User"} />
          <AvatarFallback>{session?.user?.name?.charAt(0) || "U"}</AvatarFallback>
        </Avatar>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
            <Book className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalCourses}</div>
            <p className="text-xs text-muted-foreground">Available to you</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completed</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completedCourses}</div>
            <p className="text-xs text-muted-foreground">Courses completed</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">Currently learning</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Progress</CardTitle>
            <Percent className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.averageProgress}%</div>
            <p className="text-xs text-muted-foreground">Across your courses</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-6 gap-6">
        {/* Left Column: Progress */}
        <div className="lg:col-span-3 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Your Progress</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {userProgress.length > 0 ? (
                userProgress.map((item) => (
                  <div key={item.id.toString()} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="font-medium text-sm">{item.title}</span>
                      <span className="text-sm text-muted-foreground">{item.progress}%</span>
                    </div>
                    <Progress value={item.progress} className="h-2" />
                    <div className="text-xs text-muted-foreground text-right">
                      Last updated: {item.lastUpdated}
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-4">
                  <p className="text-muted-foreground">No progress data available yet</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Activity & Schedule */}
        <div className="lg:col-span-3 space-y-6">
          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentActivity.length > 0 ? (
                  recentActivity.map((activity) => (
                    <div key={activity.id.toString()} className="flex items-start gap-4">
                      <div className="bg-muted rounded-full p-2 mt-1">
                        {activity.icon === 'activity' ? (
                          <Activity className="h-4 w-4" />
                        ) : (
                          <FileText className="h-4 w-4" />
                        )}
                      </div>
                      <div>
                        <p className="font-medium text-sm">{activity.title}</p>
                        <p className="text-xs text-muted-foreground">{activity.description}</p>
                        <p className="text-xs text-muted-foreground mt-1">{activity.date}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">No recent activity</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Upcoming Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {upcomingSchedule.length > 0 ? (
                  upcomingSchedule.map((event) => (
                    <div key={event.id.toString()} className="flex items-start gap-4">
                      <div className="bg-muted rounded-full p-2 mt-1">
                        <CalendarDays className="h-4 w-4" />
                      </div>
                      <div className="flex-1">
                        <p className="font-medium text-sm">{event.title}</p>
                        <p className="text-xs text-muted-foreground">{event.description}</p>
                        <div className="flex justify-between mt-1 text-xs text-muted-foreground">
                          <span>{event.time}</span>
                          <span>{event.duration}</span>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <div className="text-center py-4">
                    <p className="text-muted-foreground">No upcoming schedule</p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  );
} 