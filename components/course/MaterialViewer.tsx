'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { FileText, Video, Link as LinkIcon, CheckCircle } from 'lucide-react';
import { useSession } from 'next-auth/react';

interface Material {
  id: string;
  type: 'article' | 'video' | 'resource';
  title: string;
  description: string;
  content?: string;
  url?: string;
  order: number;
}

interface MaterialProgress {
  id: string;
  materialId: string;
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED';
}

export function MaterialViewer({ courseId, sectionId }: { courseId: string; sectionId: string }) {
  const { data: session } = useSession();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [progress, setProgress] = useState<MaterialProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const [materialsRes, progressRes] = await Promise.all([
          fetch(`/api/courses/${courseId}/sections/${sectionId}/materials`),
          fetch(`/api/courses/${courseId}/materials/progress`)
        ]);

        if (!materialsRes.ok) throw new Error('Failed to fetch materials');
        if (!progressRes.ok) throw new Error('Failed to fetch progress');

        const materialsData = await materialsRes.json();
        const progressData = await progressRes.json();

        setMaterials(materialsData);
        setProgress(progressData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load materials');
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [courseId, sectionId]);

  async function handleMarkComplete(materialId: string) {
    try {
      const response = await fetch(`/api/courses/${courseId}/materials/${materialId}/progress`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'COMPLETED' })
      });

      if (!response.ok) throw new Error('Failed to update progress');

      const updatedProgress = await response.json();
      setProgress(prev => 
        prev.map(p => p.materialId === materialId ? updatedProgress : p)
      );
    } catch (err) {
      console.error('Error updating progress:', err);
    }
  }

  if (loading) return <div>Loading materials...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {materials.map((material) => {
        const materialProgress = progress.find(p => p.materialId === material.id);
        const isCompleted = materialProgress?.status === 'COMPLETED';

        return (
          <Card key={material.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {material.type === 'article' && <FileText className="h-5 w-5" />}
                  {material.type === 'video' && <Video className="h-5 w-5" />}
                  {material.type === 'resource' && <LinkIcon className="h-5 w-5" />}
                  <CardTitle className="text-lg">{material.title}</CardTitle>
                </div>
                {isCompleted && (
                  <CheckCircle className="h-5 w-5 text-green-500" />
                )}
              </div>
              <CardDescription>{material.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {material.type === 'article' && material.content && (
                  <div className="prose dark:prose-invert max-w-none">
                    {material.content}
                  </div>
                )}

                {material.type === 'video' && material.url && (
                  <div className="aspect-video">
                    <iframe
                      src={material.url}
                      className="w-full h-full"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                {material.type === 'resource' && material.url && (
                  <Button variant="outline" asChild>
                    <a href={material.url} target="_blank" rel="noopener noreferrer">
                      Open Resource
                    </a>
                  </Button>
                )}

                {!isCompleted && (
                  <Button
                    onClick={() => handleMarkComplete(material.id)}
                    className="mt-4"
                  >
                    Mark as Complete
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
} 