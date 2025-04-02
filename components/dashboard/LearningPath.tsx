'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Clock, Users, BookOpen, CheckCircle2, Lock, Calendar, Award } from 'lucide-react';
import Link from 'next/link';
import { format } from 'date-fns';

interface LearningPath {
  id: string;
  title: string;
  description: string;
  courses: LearningPathCourse[];
  progress: number;
  totalHours: number;
  completedHours: number;
  startDate: Date;
  endDate: Date;
  instructor: {
    name: string;
    image: string;
    title: string;
  };
}

interface LearningPathCourse {
  id: string;
  title: string;
  description: string;
  level: 'beginner' | 'intermediate' | 'advanced';
  estimatedHours: number;
  isCompleted: boolean;
  isLocked: boolean;
  order: number;
  prerequisites: string[];
  rating: number;
  reviews: number;
  startDate: Date;
  endDate: Date;
  instructor: {
    name: string;
    image: string;
  };
  requirements: string[];
}

export function LearningPath() {
  const [learningPaths, setLearningPaths] = useState<LearningPath[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedPath, setSelectedPath] = useState<string | null>(null);

  useEffect(() => {
    fetchLearningPaths();
  }, []);

  async function fetchLearningPaths() {
    try {
      const response = await fetch('/api/learning-paths');
      if (!response.ok) throw new Error('Failed to fetch learning paths');
      const data = await response.json();
      setLearningPaths(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load learning paths');
    } finally {
      setLoading(false);
    }
  }

  function getLevelBadge(level: string) {
    const colors = {
      beginner: 'bg-green-100 text-green-800',
      intermediate: 'bg-yellow-100 text-yellow-800',
      advanced: 'bg-red-100 text-red-800',
    };
    return colors[level as keyof typeof colors] || 'bg-gray-100 text-gray-800';
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Learning Paths</CardTitle>
        <CardDescription>Follow structured paths to achieve your learning goals</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="space-y-4">
          {learningPaths.map((path) => (
            <div key={path.id} className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <h3 className="font-medium text-lg">{path.title}</h3>
                    <Badge variant="secondary">
                      {Math.round(path.progress)}% Complete
                    </Badge>
                  </div>
                  <div className="flex items-center gap-2">
                    <Avatar>
                      <AvatarImage src={path.instructor.image} />
                      <AvatarFallback>{path.instructor.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-medium">{path.instructor.name}</div>
                      <div className="text-muted-foreground">{path.instructor.title}</div>
                    </div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {path.description}
                </p>
                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{format(new Date(path.startDate), 'MMM d')} - {format(new Date(path.endDate), 'MMM d, yyyy')}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{path.completedHours}/{path.totalHours} hours</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="h-4 w-4" />
                    <span>120 enrolled</span>
                  </div>
                </div>
                <Progress value={path.progress} />
              </div>

              <div className="space-y-2">
                {path.courses.map((course) => (
                  <div
                    key={course.id}
                    className={`flex items-center gap-4 p-4 rounded-lg border ${
                      course.isLocked ? 'opacity-50' : 'hover:bg-muted/50'
                    }`}
                  >
                    <div className="flex items-center gap-2 flex-1">
                      {course.isCompleted ? (
                        <CheckCircle2 className="h-5 w-5 text-green-500" />
                      ) : course.isLocked ? (
                        <Lock className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <BookOpen className="h-5 w-5 text-primary" />
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="font-medium">{course.title}</h4>
                          <Badge className={getLevelBadge(course.level)}>
                            {course.level}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {course.description}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 text-yellow-500" />
                            <span>{course.rating.toFixed(1)} ({course.reviews} reviews)</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-4 w-4" />
                            <span>{course.estimatedHours} hours</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Calendar className="h-4 w-4" />
                            <span>{format(new Date(course.startDate), 'MMM d')} - {format(new Date(course.endDate), 'MMM d')}</span>
                          </div>
                        </div>
                        {course.prerequisites.length > 0 && (
                          <div className="mt-2">
                            <span className="text-xs text-muted-foreground">Prerequisites: </span>
                            {course.prerequisites.map((prereq, index) => (
                              <Badge key={index} variant="outline" className="mr-1">
                                {prereq}
                              </Badge>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src={course.instructor.image} />
                        <AvatarFallback>{course.instructor.name[0]}</AvatarFallback>
                      </Avatar>
                      {!course.isLocked && (
                        <Button variant="ghost" size="icon" asChild>
                          <Link href={`/courses/${course.id}`}>
                            <Award className="h-4 w-4" />
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 