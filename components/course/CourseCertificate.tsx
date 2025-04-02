'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Download, Share2 } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface CertificateProps {
  courseId: string;
  courseTitle: string;
  completionDate: string;
  certificateId: string;
  studentName: string;
}

export function CourseCertificate({
  courseId,
  courseTitle,
  completionDate,
  certificateId,
  studentName
}: CertificateProps) {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleDownload() {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/courses/${courseId}/certificate/download`);
      if (!response.ok) throw new Error('Failed to download certificate');

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${courseTitle.replace(/\s+/g, '_')}_Certificate.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to download certificate');
    } finally {
      setLoading(false);
    }
  }

  async function handleShare() {
    try {
      if (navigator.share) {
        await navigator.share({
          title: `${courseTitle} Certificate`,
          text: `I completed ${courseTitle} on Innovation Bootcamp University!`,
          url: `${window.location.origin}/certificates/${certificateId}`
        });
      } else {
        await navigator.clipboard.writeText(
          `${window.location.origin}/certificates/${certificateId}`
        );
        alert('Certificate link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing certificate:', err);
    }
  }

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10" />
      <CardHeader className="relative">
        <CardTitle className="text-center text-2xl">Certificate of Completion</CardTitle>
        <CardDescription className="text-center">
          This certifies that
        </CardDescription>
      </CardHeader>
      <CardContent className="relative">
        <div className="space-y-6 text-center">
          <div>
            <h2 className="text-3xl font-serif font-bold text-primary">
              {studentName}
            </h2>
            <p className="mt-2 text-muted-foreground">
              has successfully completed
            </p>
          </div>

          <div>
            <h3 className="text-2xl font-medium">
              {courseTitle}
            </h3>
            <p className="mt-1 text-sm text-muted-foreground">
              Completed on {new Date(completionDate).toLocaleDateString()}
            </p>
          </div>

          <div className="pt-4">
            <p className="text-sm text-muted-foreground">
              Certificate ID: {certificateId}
            </p>
          </div>

          <div className="flex justify-center gap-4 pt-6">
            <Button
              onClick={handleDownload}
              disabled={loading}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download PDF
            </Button>
            <Button
              onClick={handleShare}
              variant="outline"
              className="gap-2"
            >
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>

          {error && (
            <div className="text-red-500 text-sm">{error}</div>
          )}
        </div>
      </CardContent>
    </Card>
  );
} 