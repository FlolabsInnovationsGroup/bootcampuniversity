'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, BarChart, PieChart } from '@/components/ui/charts';
import {
  Users,
  GraduationCap,
  BookOpen,
  Activity,
  TrendingUp,
  Clock,
  Plus,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

interface DashboardStats {
  totalStudents: number;
  activeCourses: number;
  completionRate: number;
  totalEnrollments: number;
  averageProgress: number;
  activeUsers: number;
  studentGrowth: number;
  courseGrowth: number;
}

interface ActivityItem {
  id: string;
  user: {
    name: string;
    image?: string;
  };
  action: string;
  target: string;
  timestamp: string;
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    activeCourses: 0,
    completionRate: 0,
    totalEnrollments: 0,
    averageProgress: 0,
    activeUsers: 0,
    studentGrowth: 5.25,
    courseGrowth: 12.5,
  });
  const [recentActivity, setRecentActivity] = useState<ActivityItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [statsResponse, activityResponse] = await Promise.all([
          fetch('/api/admin/dashboard/stats'),
          fetch('/api/admin/activity')
        ]);

        if (statsResponse.ok) {
          const statsData = await statsResponse.json();
          setStats(statsData);
        }

        if (activityResponse.ok) {
          const activityData = await activityResponse.json();
          setRecentActivity(activityData.items);
        }
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back! Here's what's happening with your platform.
          </p>
        </div>
        <div className="flex gap-2">
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            New Course
          </Button>
          <Button variant="outline">View Reports</Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Students</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalStudents}</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              {stats.studentGrowth}% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Courses</CardTitle>
            <GraduationCap className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeCourses}</div>
            <div className="flex items-center text-sm text-green-600">
              <ArrowUpRight className="h-4 w-4 mr-1" />
              {stats.courseGrowth}% from last month
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.completionRate}%</div>
            <p className="text-xs text-muted-foreground">
              +2.5% from last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeUsers}</div>
            <p className="text-xs text-muted-foreground">
              In the last 24 hours
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="enrollments" className="space-y-4">
              <TabsList>
                <TabsTrigger value="enrollments">Enrollments</TabsTrigger>
                <TabsTrigger value="engagement">Engagement</TabsTrigger>
                <TabsTrigger value="completion">Completion</TabsTrigger>
              </TabsList>
              <TabsContent value="enrollments" className="h-[300px]">
                <LineChart
                  data={[
                    { name: 'Jan', value: 100 },
                    { name: 'Feb', value: 120 },
                    { name: 'Mar', value: 170 },
                    { name: 'Apr', value: 180 },
                    { name: 'May', value: 250 },
                    { name: 'Jun', value: 280 },
                  ]}
                />
              </TabsContent>
              <TabsContent value="engagement" className="h-[300px]">
                <BarChart
                  data={[
                    { name: 'Mon', value: 85 },
                    { name: 'Tue', value: 92 },
                    { name: 'Wed', value: 87 },
                    { name: 'Thu', value: 95 },
                    { name: 'Fri', value: 89 },
                    { name: 'Sat', value: 65 },
                    { name: 'Sun', value: 70 },
                  ]}
                />
              </TabsContent>
              <TabsContent value="completion" className="h-[300px]">
                <PieChart
                  data={[
                    { name: 'Completed', value: 65 },
                    { name: 'In Progress', value: 25 },
                    { name: 'Not Started', value: 10 },
                  ]}
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>
              Latest actions across your platform
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivity.map((item) => (
                <div key={item.id} className="flex items-center">
                  <div className="relative mr-2">
                    {item.user.image ? (
                      <img
                        src={item.user.image}
                        alt={item.user.name}
                        className="h-8 w-8 rounded-full"
                      />
                    ) : (
                      <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="h-4 w-4 text-primary" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 ml-2">
                    <p className="text-sm">
                      <span className="font-medium">{item.user.name}</span>
                      {' '}{item.action}{' '}
                      <span className="font-medium">{item.target}</span>
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {item.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 