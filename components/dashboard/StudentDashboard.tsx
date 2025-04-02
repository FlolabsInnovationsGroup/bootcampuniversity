'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Calendar, BookOpen, Clock, Trophy } from 'lucide-react';
import Link from 'next/link';

interface EnrolledCourse {
  id: string;
  title: string;
  progress: number;
  lastAccessed: string;
  nextModule: {
    id: string;
    title: string;
  } | null;
  upcomingAssignments: {
    id: string;
    title: string;
    dueDate: string;
  }[];
}

interface Achievement {
  id: string;
  title: string;
  description: string;
  earnedAt: string;
  icon: string;
}

export function StudentDashboard() {
  const [courses, setCourses] = useState<EnrolledCourse[]>([]);
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [coursesRes, achievementsRes] = await Promise.all([
          fetch('/api/dashboard/enrolled-courses'),
          fetch('/api/dashboard/achievements')
        ]);

        if (!coursesRes.ok || !achievementsRes.ok) {
          throw new Error('Failed to fetch dashboard data');
        }

        const [coursesData, achievementsData] = await Promise.all([
          coursesRes.json(),
          achievementsRes.json()
        ]);

        setCourses(coursesData);
        setAchievements(achievementsData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load dashboard');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <div>Loading dashboard...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Active Courses</CardTitle>
            <CardDescription>Your current learning progress</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{courses.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Study Time</CardTitle>
            <CardDescription>This week&apos;s learning hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">12.5h</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Achievements</CardTitle>
            <CardDescription>Milestones reached</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{achievements.length}</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Continue Learning</CardTitle>
              <CardDescription>Pick up where you left off</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.map((course) => (
                  <div key={course.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-medium">{course.title}</h3>
                        {course.nextModule && (
                          <p className="text-sm text-muted-foreground">
                            Next: {course.nextModule.title}
                          </p>
                        )}
                      </div>
                      <Button asChild>
                        <Link href={`/courses/${course.id}`}>
                          Continue
                        </Link>
                      </Button>
                    </div>
                    <Progress value={course.progress} className="mt-2" />
                    <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Clock className="h-4 w-4" />
                        <span>Last accessed {new Date(course.lastAccessed).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <BookOpen className="h-4 w-4" />
                        <span>{course.progress}% complete</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Upcoming Deadlines</CardTitle>
              <CardDescription>Assignments due soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {courses.flatMap(course => 
                  course.upcomingAssignments.map(assignment => (
                    <div key={assignment.id} className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">{assignment.title}</p>
                          <p className="text-sm text-muted-foreground">{course.title}</p>
                        </div>
                      </div>
                      <div className="text-sm">
                        Due {new Date(assignment.dueDate).toLocaleDateString()}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Achievements</CardTitle>
              <CardDescription>Your latest accomplishments</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements.slice(0, 5).map((achievement) => (
                  <div key={achievement.id} className="flex items-center gap-3">
                    <Trophy className="h-8 w-8 text-yellow-400" />
                    <div>
                      <p className="font-medium">{achievement.title}</p>
                      <p className="text-sm text-muted-foreground">
                        {achievement.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
} 