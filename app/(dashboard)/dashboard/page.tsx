'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { LineChart } from '@/components/ui/charts';
import {
  BookOpen,
  Clock,
  Trophy,
  Calendar,
  Star,
  ArrowRight,
  CheckCircle2,
  PlayCircle,
} from 'lucide-react';

interface CourseProgress {
  id: string;
  title: string;
  progress: number;
  nextModule: string;
  totalModules: number;
  completedModules: number;
}

interface UpcomingTask {
  id: string;
  title: string;
  courseTitle: string;
  dueDate: string;
  type: 'assignment' | 'quiz' | 'reading' | 'video';
}

interface RecommendedCourse {
  id: string;
  title: string;
  description: string;
  category: string;
  level: string;
  image?: string;
}

export default function StudentDashboard() {
  const [courseProgress, setCourseProgress] = useState<CourseProgress[]>([]);
  const [upcomingTasks, setUpcomingTasks] = useState<UpcomingTask[]>([]);
  const [recommendedCourses, setRecommendedCourses] = useState<RecommendedCourse[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [progressResponse, tasksResponse, recommendationsResponse] = await Promise.all([
          fetch('/api/user/courses/progress'),
          fetch('/api/user/tasks/upcoming'),
          fetch('/api/user/courses/recommended')
        ]);

        if (progressResponse.ok) {
          const progressData = await progressResponse.json();
          setCourseProgress(progressData.courses);
        }

        if (tasksResponse.ok) {
          const tasksData = await tasksResponse.json();
          setUpcomingTasks(tasksData.tasks);
        }

        if (recommendationsResponse.ok) {
          const recommendationsData = await recommendationsResponse.json();
          setRecommendedCourses(recommendationsData.courses);
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
          <h1 className="text-2xl font-bold tracking-tight">My Learning Dashboard</h1>
          <p className="text-muted-foreground">
            Track your progress and stay on top of your learning goals
          </p>
        </div>
        <Button>
          Resume Learning
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Courses in Progress</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{courseProgress.length}</div>
            <p className="text-xs text-muted-foreground">Active enrollments</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Study Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12.5h</div>
            <p className="text-xs text-muted-foreground">This week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Achievements</CardTitle>
            <Trophy className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Badges earned</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Next Due</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2d</div>
            <p className="text-xs text-muted-foreground">Until next deadline</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Course Progress</CardTitle>
            <CardDescription>Your active courses and their completion status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {courseProgress.map((course) => (
              <div key={course.id} className="space-y-2">
                <div className="flex justify-between">
                  <div>
                    <h3 className="font-medium">{course.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      Next up: {course.nextModule}
                    </p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {course.completedModules}/{course.totalModules} modules
                  </div>
                </div>
                <Progress value={course.progress} className="h-2" />
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Upcoming Tasks</CardTitle>
            <CardDescription>Deadlines and assignments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {upcomingTasks.map((task) => (
                <div key={task.id} className="flex items-start space-x-4">
                  <div className="rounded-full p-2 bg-primary/10">
                    {task.type === 'assignment' && <CheckCircle2 className="h-4 w-4 text-primary" />}
                    {task.type === 'quiz' && <Star className="h-4 w-4 text-primary" />}
                    {task.type === 'video' && <PlayCircle className="h-4 w-4 text-primary" />}
                    {task.type === 'reading' && <BookOpen className="h-4 w-4 text-primary" />}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-medium">{task.title}</h4>
                    <p className="text-xs text-muted-foreground">{task.courseTitle}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">{task.dueDate}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recommended for You</CardTitle>
          <CardDescription>Based on your interests and progress</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            {recommendedCourses.map((course) => (
              <Card key={course.id}>
                {course.image && (
                  <div className="aspect-video w-full overflow-hidden rounded-t-lg">
                    <img
                      src={course.image}
                      alt={course.title}
                      className="h-full w-full object-cover"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-lg">{course.title}</CardTitle>
                  <CardDescription>{course.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">{course.category}</span>
                    <span className="text-muted-foreground">{course.level}</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Learning Activity</CardTitle>
          <CardDescription>Your study time over the past weeks</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <LineChart
            data={[
              { name: 'Week 1', value: 8 },
              { name: 'Week 2', value: 12 },
              { name: 'Week 3', value: 10 },
              { name: 'Week 4', value: 15 },
              { name: 'Week 5', value: 12.5 },
            ]}
          />
        </CardContent>
      </Card>
    </div>
  );
} 