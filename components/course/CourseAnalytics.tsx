'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface EnrollmentStats {
  totalEnrollments: number;
  activeStudents: number;
  completionRate: number;
  averageProgress: number;
}

interface ProgressData {
  date: string;
  completions: number;
  activeUsers: number;
}

interface ModuleStats {
  moduleId: string;
  title: string;
  completions: number;
  averageTime: number;
  studentCount: number;
}

export function CourseAnalytics({ courseId }: { courseId: string }) {
  const [stats, setStats] = useState<EnrollmentStats | null>(null);
  const [progressData, setProgressData] = useState<ProgressData[]>([]);
  const [moduleStats, setModuleStats] = useState<ModuleStats[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [statsRes, progressRes, moduleStatsRes] = await Promise.all([
          fetch(`/api/courses/${courseId}/analytics/enrollment`),
          fetch(`/api/courses/${courseId}/analytics/progress`),
          fetch(`/api/courses/${courseId}/analytics/modules`)
        ]);

        if (!statsRes.ok || !progressRes.ok || !moduleStatsRes.ok) {
          throw new Error('Failed to fetch analytics data');
        }

        const [statsData, progressData, moduleStatsData] = await Promise.all([
          statsRes.json(),
          progressRes.json(),
          moduleStatsRes.json()
        ]);

        setStats(statsData);
        setProgressData(progressData);
        setModuleStats(moduleStatsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load analytics');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [courseId]);

  if (loading) return <div>Loading analytics...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!stats) return null;

  return (
    <div className="space-y-6">
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="progress">Progress</TabsTrigger>
          <TabsTrigger value="modules">Modules</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Total Enrollments</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.totalEnrollments}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Active Students</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.activeStudents}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Completion Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stats.completionRate}%</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Average Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="text-3xl font-bold">{stats.averageProgress}%</div>
                  <Progress value={stats.averageProgress} />
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="progress">
          <Card>
            <CardHeader>
              <CardTitle>Progress Over Time</CardTitle>
              <CardDescription>Course completion and active users over time</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={progressData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="completions"
                      stroke="#2563eb"
                      name="Completions"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="activeUsers"
                      stroke="#16a34a"
                      name="Active Users"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="modules" className="space-y-4">
          {moduleStats.map((module) => (
            <Card key={module.moduleId}>
              <CardHeader>
                <CardTitle>{module.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <div className="text-sm text-muted-foreground">Completions</div>
                    <div className="text-2xl font-bold">{module.completions}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Average Time</div>
                    <div className="text-2xl font-bold">{module.averageTime} min</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground">Completion Rate</div>
                    <div className="text-2xl font-bold">
                      {((module.completions / module.studentCount) * 100).toFixed(1)}%
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
} 