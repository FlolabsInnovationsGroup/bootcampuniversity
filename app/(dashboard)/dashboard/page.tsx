'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Activity,
  Users,
  BookOpen,
  Calendar,
  ArrowUp,
  ArrowDown,
  Clock,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LoadingSpinner } from '@/components/shared/LoadingPlaceholder';

interface DashboardData {
  stats: {
    totalCourses: number;
    completedCourses: number;
    activeUsers: number;
    averageProgress: number;
  };
  recentActivity: Array<{
    id: number;
    type: 'completion' | 'started' | 'achievement';
    course: string;
    timestamp: Date;
  }>;
  upcomingSchedule: Array<{
    id: number;
    title: string;
    startTime: Date;
    duration: string;
    type: string;
  }>;
}

// Mock data - replace with real API calls
const fetchDashboardData = async (): Promise<DashboardData> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  return {
    stats: {
      totalCourses: 12,
      completedCourses: 5,
      activeUsers: 156,
      averageProgress: 68,
    },
    recentActivity: [
      {
        id: 1,
        type: 'completion',
        course: 'Introduction to Innovation',
        timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
      },
      {
        id: 2,
        type: 'started',
        course: 'Design Thinking Fundamentals',
        timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
      },
      {
        id: 3,
        type: 'achievement',
        course: 'Problem Solving Methods',
        timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
      },
    ],
    upcomingSchedule: [
      {
        id: 1,
        title: 'Innovation Workshop',
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 24), // Tomorrow
        duration: '2 hours',
        type: 'workshop',
      },
      {
        id: 2,
        title: 'Mentor Meeting',
        startTime: new Date(Date.now() + 1000 * 60 * 60 * 48), // Day after tomorrow
        duration: '1 hour',
        type: 'meeting',
      },
    ],
  };
};

export default function DashboardPage() {
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboardData = async () => {
    try {
      const result = await fetchDashboardData();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load dashboard data');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Card className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
          <Button
            onClick={() => {
              setError(null);
              setIsLoading(true);
              loadDashboardData();
            }}
          >
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  if (!data) return null;

  const { stats, recentActivity, upcomingSchedule } = data;

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Total Courses
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats.totalCourses}
                </h3>
              </div>
              <div className="h-12 w-12 bg-blue-100 dark:bg-blue-900/20 rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={(stats.completedCourses / stats.totalCourses) * 100} />
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                {stats.completedCourses} completed
              </p>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Active Users
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats.activeUsers}
                </h3>
              </div>
              <div className="h-12 w-12 bg-green-100 dark:bg-green-900/20 rounded-full flex items-center justify-center">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <ArrowUp className="h-4 w-4 text-green-500 mr-1" />
              <span className="text-sm text-green-500">12% increase</span>
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Average Progress
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {stats.averageProgress}%
                </h3>
              </div>
              <div className="h-12 w-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center">
                <Activity className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4">
              <Progress value={stats.averageProgress} className="bg-purple-100 dark:bg-purple-900/20" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  Upcoming Events
                </p>
                <h3 className="text-2xl font-semibold text-gray-900 dark:text-white">
                  {upcomingSchedule.length}
                </h3>
              </div>
              <div className="h-12 w-12 bg-orange-100 dark:bg-orange-900/20 rounded-full flex items-center justify-center">
                <Calendar className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="mt-4">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Next: {upcomingSchedule[0]?.title}
              </p>
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Recent Activity and Schedule */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Activity
            </h3>
            <div className="space-y-4">
              {recentActivity.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start space-x-3 text-sm"
                >
                  <div className="mt-0.5">
                    {activity.type === 'completion' ? (
                      <CheckCircle2 className="h-5 w-5 text-green-500" />
                    ) : activity.type === 'started' ? (
                      <Activity className="h-5 w-5 text-blue-500" />
                    ) : (
                      <BookOpen className="h-5 w-5 text-purple-500" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-gray-900 dark:text-white">
                      {activity.type === 'completion'
                        ? 'Completed'
                        : activity.type === 'started'
                        ? 'Started'
                        : 'Achieved milestone in'}{' '}
                      <span className="font-medium">{activity.course}</span>
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {new Date(activity.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Upcoming Schedule
            </h3>
            <div className="space-y-4">
              {upcomingSchedule.map((event) => (
                <div
                  key={event.id}
                  className="flex items-start space-x-3 text-sm"
                >
                  <div className="mt-0.5">
                    <Clock className="h-5 w-5 text-gray-400" />
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-gray-900 dark:text-white font-medium">
                      {event.title}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      {new Date(event.startTime).toLocaleDateString()} at{' '}
                      {new Date(event.startTime).toLocaleTimeString()} •{' '}
                      {event.duration}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
} 