'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Award, Clock } from 'lucide-react';
import Link from 'next/link';

interface Module {
  id: string;
  title: string;
  isCompleted: boolean;
  estimatedDuration: number;
}

interface CourseCompletionProps {
  courseId: string;
  courseTitle: string;
}

export function CourseCompletion({ courseId, courseTitle }: CourseCompletionProps) {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCourseProgress();
  }, [courseId]);

  async function fetchCourseProgress() {
    try {
      const response = await fetch(`/api/courses/${courseId}/progress`);
      if (!response.ok) throw new Error('Failed to fetch course progress');
      const data = await response.json();
      setModules(data.modules);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load course progress');
    } finally {
      setLoading(false);
    }
  }

  const completedModules = modules.filter(module => module.isCompleted).length;
  const totalModules = modules.length;
  const progress = totalModules > 0 ? (completedModules / totalModules) * 100 : 0;
  const totalDuration = modules.reduce((acc, module) => acc + module.estimatedDuration, 0);
  const completedDuration = modules
    .filter(module => module.isCompleted)
    .reduce((acc, module) => acc + module.estimatedDuration, 0);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Progress</CardTitle>
        <CardDescription>Track your learning journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Overall Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <CheckCircle2 className="h-4 w-4" />
                <span>Modules Completed</span>
              </div>
              <div className="text-2xl font-bold">
                {completedModules} / {totalModules}
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4" />
                <span>Time Spent</span>
              </div>
              <div className="text-2xl font-bold">
                {Math.round(completedDuration / 60)}h
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium">Module Progress</h3>
          <div className="space-y-2">
            {modules.map((module) => (
              <div key={module.id} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {module.isCompleted ? (
                    <CheckCircle2 className="h-4 w-4 text-green-500" />
                  ) : (
                    <div className="h-4 w-4 rounded-full border-2 border-gray-300" />
                  )}
                  <span className="text-sm">{module.title}</span>
                </div>
                <span className="text-sm text-muted-foreground">
                  {module.estimatedDuration} min
                </span>
              </div>
            ))}
          </div>
        </div>

        {progress === 100 && (
          <div className="space-y-4">
            <div className="flex items-center gap-2 text-green-500">
              <Award className="h-5 w-5" />
              <span className="font-medium">Course Completed!</span>
            </div>
            <Button asChild className="w-full">
              <Link href={`/courses/${courseId}/certificate`}>
                View Certificate
              </Link>
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 