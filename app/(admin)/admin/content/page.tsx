'use client';

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GraduationCap, BookOpen, FileText, FolderPlus, Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/components/ui/use-toast';

interface Course {
  id: string;
  materialsCount: number;
}

export default function ContentPage() {
  const [stats, setStats] = useState({
    coursesCount: 0,
    materialsCount: 0,
    resourcesCount: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchContentStats = async () => {
      try {
        // In a production app, we would fetch this from an API
        const coursesResponse = await fetch('/api/admin/courses');
        if (!coursesResponse.ok) {
          throw new Error('Failed to fetch courses');
        }
        const courses: Course[] = await coursesResponse.json();
        
        setStats({
          coursesCount: courses.length,
          materialsCount: courses.reduce((total: number, course: Course) => total + course.materialsCount, 0),
          resourcesCount: 52, // We'll use a static number for now
        });
      } catch (error) {
        console.error('Error fetching content stats:', error);
        toast({
          title: 'Error',
          description: 'Failed to load content statistics',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    fetchContentStats();
  }, [toast]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight">Content Management</h1>
        <Button asChild>
          <Link href="/admin/content/courses">
            <FolderPlus className="mr-2 h-4 w-4" />
            Create New Content
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Link href="/admin/content/courses">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Courses</CardTitle>
              <GraduationCap className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage courses and learning paths in the platform.
              </p>
              <div className="mt-4 font-medium text-sm">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                ) : (
                  `${stats.coursesCount} Course${stats.coursesCount !== 1 ? 's' : ''}`
                )}
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/content/materials">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Learning Materials</CardTitle>
              <FileText className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage videos, articles, and other learning materials.
              </p>
              <div className="mt-4 font-medium text-sm">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                ) : (
                  `${stats.materialsCount} Material${stats.materialsCount !== 1 ? 's' : ''}`
                )}
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/admin/content/resources">
          <Card className="hover:bg-muted/50 transition-colors cursor-pointer h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-lg font-medium">Resources</CardTitle>
              <BookOpen className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Manage downloadable resources and supplementary materials.
              </p>
              <div className="mt-4 font-medium text-sm">
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin inline mr-2" />
                ) : (
                  `${stats.resourcesCount} Resource${stats.resourcesCount !== 1 ? 's' : ''}`
                )}
              </div>
            </CardContent>
          </Card>
        </Link>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Updates</CardTitle>
          <CardDescription>Latest content changes and additions.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-4">
              <div>
                <p className="font-medium">Introduction to Design Thinking</p>
                <p className="text-sm text-muted-foreground">
                  Course updated with new materials
                </p>
              </div>
              <div className="text-sm text-muted-foreground">2 hours ago</div>
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-4">
              <div>
                <p className="font-medium">Problem Solving Techniques</p>
                <p className="text-sm text-muted-foreground">
                  New video added to module 3
                </p>
              </div>
              <div className="text-sm text-muted-foreground">Yesterday</div>
            </div>
            <div className="grid grid-cols-[1fr_auto] items-center gap-4 border-b pb-4">
              <div>
                <p className="font-medium">Innovation Principles</p>
                <p className="text-sm text-muted-foreground">
                  Course created with 5 modules
                </p>
              </div>
              <div className="text-sm text-muted-foreground">3 days ago</div>
            </div>
            <div className="flex justify-center">
              <Button variant="outline" size="sm">
                View All
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
