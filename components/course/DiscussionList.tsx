'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { format } from 'date-fns';
import { useSession } from 'next-auth/react';
import { Discussion, Comment } from '@prisma/client';

interface DiscussionWithComments extends Discussion {
  comments: (Comment & {
    user: {
      name: string | null;
      image: string | null;
    };
  })[];
  user: {
    name: string | null;
    image: string | null;
  };
}

export function DiscussionList({ courseId }: { courseId: string }) {
  const { data: session } = useSession();
  const [discussions, setDiscussions] = useState<DiscussionWithComments[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchDiscussions() {
      try {
        const response = await fetch(`/api/courses/${courseId}/discussions`);
        if (!response.ok) throw new Error('Failed to fetch discussions');
        const data = await response.json();
        setDiscussions(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load discussions');
      } finally {
        setLoading(false);
      }
    }

    fetchDiscussions();
  }, [courseId]);

  if (loading) {
    return <div>Loading discussions...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Course Discussions</h2>
        <Button asChild>
          <a href={`/courses/${courseId}/discussions/new`}>New Discussion</a>
        </Button>
      </div>

      {discussions.map((discussion) => (
        <Card key={discussion.id}>
          <CardHeader>
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={discussion.user.image || undefined} />
                <AvatarFallback>
                  {discussion.user.name?.charAt(0) || 'U'}
                </AvatarFallback>
              </Avatar>
              <div>
                <CardTitle>{discussion.title}</CardTitle>
                <CardDescription>
                  Posted by {discussion.user.name} on{' '}
                  {format(new Date(discussion.createdAt), 'PPP')}
                </CardDescription>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {discussion.content}
            </p>
            <div className="space-y-4">
              {discussion.comments.map((comment) => (
                <div key={comment.id} className="flex gap-2">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={comment.user.image || undefined} />
                    <AvatarFallback>
                      {comment.user.name?.charAt(0) || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{comment.user.name}</span>
                      <span className="text-xs text-gray-500">
                        {format(new Date(comment.createdAt), 'PPP')}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="mt-4" asChild>
              <a href={`/courses/${courseId}/discussions/${discussion.id}`}>
                View Discussion
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
} 