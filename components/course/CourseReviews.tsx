'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, StarHalf, StarOff } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage?: string;
  rating: number;
  comment: string;
  createdAt: string;
}

interface CourseReviewsProps {
  courseId: string;
}

export function CourseReviews({ courseId }: CourseReviewsProps) {
  const { data: session } = useSession();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReviews();
  }, [courseId]);

  async function fetchReviews() {
    try {
      const response = await fetch(`/api/courses/${courseId}/reviews`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      const data = await response.json();
      setReviews(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load reviews');
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitReview() {
    if (!session) {
      // Redirect to login
      window.location.href = '/auth/signin';
      return;
    }

    if (rating === 0) {
      setError('Please select a rating');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch(`/api/courses/${courseId}/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          rating,
          comment: newReview,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to submit review');
      }

      // Refresh reviews
      await fetchReviews();
      setNewReview('');
      setRating(0);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Course Reviews</CardTitle>
        <CardDescription>
          {reviews.length} reviews • Average rating: {averageRating.toFixed(1)}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        {session && (
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="focus:outline-none"
                >
                  {star <= (hoverRating || rating) ? (
                    <Star className="h-6 w-6 text-yellow-400 fill-current" />
                  ) : (
                    <Star className="h-6 w-6 text-gray-300" />
                  )}
                </button>
              ))}
            </div>

            <Textarea
              placeholder="Share your experience with this course..."
              value={newReview}
              onChange={(e) => setNewReview(e.target.value)}
              className="min-h-[100px]"
            />

            <Button
              onClick={handleSubmitReview}
              disabled={submitting || !newReview.trim()}
            >
              {submitting ? 'Submitting...' : 'Submit Review'}
            </Button>
          </div>
        )}

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="space-y-2">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={review.userImage} />
                  <AvatarFallback>
                    {review.userName.slice(0, 2).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">{review.userName}</div>
                  <div className="text-sm text-muted-foreground">
                    {formatDistanceToNow(new Date(review.createdAt), { addSuffix: true })}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star}>
                    {star <= review.rating ? (
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                    ) : (
                      <Star className="h-4 w-4 text-gray-300" />
                    )}
                  </span>
                ))}
              </div>

              <p className="text-sm">{review.comment}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 