'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { Assignment, AssignmentSubmission } from '@prisma/client';

interface AssignmentWithSubmission extends Assignment {
  submissions: AssignmentSubmission[];
}

export function AssignmentList({ courseId }: { courseId: string }) {
  const { data: session } = useSession();
  const [assignments, setAssignments] = useState<AssignmentWithSubmission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const response = await fetch(`/api/courses/${courseId}/assignments`);
        if (!response.ok) throw new Error('Failed to fetch assignments');
        const data = await response.json();
        setAssignments(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load assignments');
      } finally {
        setLoading(false);
      }
    }

    fetchAssignments();
  }, [courseId]);

  if (loading) {
    return <div>Loading assignments...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      {assignments.map((assignment) => {
        const submission = assignment.submissions[0];
        const isSubmitted = !!submission;
        const isGraded = submission?.status === 'graded';
        const isOverdue = new Date(assignment.dueDate) < new Date() && !isSubmitted;

        return (
          <Card key={assignment.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{assignment.title}</CardTitle>
                <div className="flex items-center gap-2">
                  {isOverdue && <Badge variant="destructive">Overdue</Badge>}
                  {isSubmitted && <Badge variant={isGraded ? 'default' : 'secondary'}>
                    {isGraded ? 'Graded' : 'Submitted'}
                  </Badge>}
                </div>
              </div>
              <CardDescription>
                Due: {format(new Date(assignment.dueDate), 'PPP')}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
                {assignment.description}
              </p>
              <div className="flex gap-2">
                <Button variant="outline" asChild>
                  <a href={`/courses/${courseId}/assignments/${assignment.id}`}>
                    {isSubmitted ? 'View Submission' : 'Submit Assignment'}
                  </a>
                </Button>
                {isGraded && submission.grade && (
                  <Badge variant="outline">
                    Grade: {submission.grade}%
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 