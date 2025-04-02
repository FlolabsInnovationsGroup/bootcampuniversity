'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import Link from 'next/link';

interface CourseEnrollmentProps {
  courseId: string;
  courseTitle: string;
  courseDescription: string;
  price: number;
  isEnrolled: boolean;
  enrollmentProgress?: number;
  prerequisites?: string[];
}

export function CourseEnrollment({
  courseId,
  courseTitle,
  courseDescription,
  price,
  isEnrolled,
  enrollmentProgress,
  prerequisites = []
}: CourseEnrollmentProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleEnroll() {
    if (!session) {
      // Redirect to login
      window.location.href = '/auth/signin';
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/courses/${courseId}/enroll`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to enroll in course');
      }

      // Refresh the page to show enrolled state
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to enroll in course');
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Enrollment</CardTitle>
        <CardDescription>Get started with your learning journey</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isEnrolled ? (
          <div className="space-y-4">
            <Alert>
              <CheckCircle2 className="h-4 w-4" />
              <AlertTitle>You're enrolled!</AlertTitle>
              <AlertDescription>
                Continue your learning journey
              </AlertDescription>
            </Alert>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Course Progress</span>
                <span>{enrollmentProgress}%</span>
              </div>
              <Progress value={enrollmentProgress} />
            </div>

            <Button asChild className="w-full">
              <Link href={`/courses/${courseId}/learn`}>
                Continue Learning
              </Link>
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="space-y-2">
              <h3 className="font-medium">{courseTitle}</h3>
              <p className="text-sm text-muted-foreground">
                {courseDescription}
              </p>
            </div>

            {prerequisites.length > 0 && (
              <div className="space-y-2">
                <h4 className="text-sm font-medium">Prerequisites</h4>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  {prerequisites.map((prereq, index) => (
                    <li key={index}>{prereq}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-sm">Price</span>
                <span className="font-medium">
                  {price === 0 ? 'Free' : `$${price}`}
                </span>
              </div>
            </div>

            <Button
              onClick={handleEnroll}
              disabled={loading}
              className="w-full"
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Enrolling...
                </>
              ) : (
                'Enroll Now'
              )}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
} 