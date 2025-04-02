'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useSession } from 'next-auth/react';

interface Module {
  id: string;
  title: string;
  order: number;
}

interface ModuleProgressType {
  id: string;
  userId: string;
  moduleId: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
  progress: number;
  createdAt: string;
  updatedAt: string;
  completedAt: string | null;
  enrollmentId: string;
  module: Module;
}

export function ProgressTracker({ courseId }: { courseId: string }) {
  const { data: session } = useSession();
  const [progress, setProgress] = useState<ModuleProgressType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProgress() {
      try {
        const response = await fetch(`/api/courses/${courseId}/progress`);
        if (!response.ok) throw new Error('Failed to fetch progress');
        const data = await response.json();
        setProgress(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load progress');
      } finally {
        setLoading(false);
      }
    }

    fetchProgress();
  }, [courseId]);

  if (loading) {
    return <div>Loading progress...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  const totalModules = progress.length;
  const completedModules = progress.filter(p => p.status === 'COMPLETED').length;
  const progressPercentage = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Progress</CardTitle>
        <CardDescription>
          Track your progress through the course modules
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(progressPercentage)}%</span>
            </div>
            <Progress value={progressPercentage} />
          </div>

          <div className="space-y-2">
            {progress
              .sort((a, b) => a.module.order - b.module.order)
              .map((item) => (
                <div
                  key={item.module.id}
                  className="flex items-center justify-between p-2 rounded-lg border"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{item.module.title}</span>
                  </div>
                  <Badge
                    variant={
                      item.status === 'COMPLETED'
                        ? 'default'
                        : item.status === 'IN_PROGRESS'
                        ? 'secondary'
                        : 'outline'
                    }
                  >
                    {item.status === 'COMPLETED'
                      ? 'Completed'
                      : item.status === 'IN_PROGRESS'
                      ? 'In Progress'
                      : 'Not Started'}
                  </Badge>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 