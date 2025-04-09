'use client';

import { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Lock, PlayCircle, FileText, Trophy } from 'lucide-react';

interface Module {
  id: string;
  title: string;
  type: 'video' | 'quiz' | 'assignment' | 'reading';
  duration: number;
  completed: boolean;
  locked: boolean;
}

interface Section {
  id: string;
  title: string;
  modules: Module[];
  progress: number;
}

export default function LearningPathPage() {
  const { data: session } = useSession();
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // TODO: Replace with actual API call
    const fetchLearningPath = async () => {
      try {
        const response = await fetch('/api/user/learning-path');
        const data = await response.json();
        setSections(data.sections);
      } catch (error) {
        console.error('Error fetching learning path:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLearningPath();
  }, []);

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'video':
        return <PlayCircle className="h-5 w-5" />;
      case 'quiz':
        return <Trophy className="h-5 w-5" />;
      case 'reading':
        return <FileText className="h-5 w-5" />;
      default:
        return <FileText className="h-5 w-5" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Learning Path</h1>
        <p className="text-muted-foreground">
          Track your progress and continue your learning journey
        </p>
      </div>

      <div className="grid gap-4">
        {sections.map((section) => (
          <Card key={section.id}>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle>{section.title}</CardTitle>
                <Badge variant="outline">{section.progress}% Complete</Badge>
              </div>
              <Progress value={section.progress} className="h-2" />
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {section.modules.map((module) => (
                  <div
                    key={module.id}
                    className={`flex items-center justify-between p-3 rounded-lg border ${
                      module.locked
                        ? 'bg-gray-50 opacity-75'
                        : module.completed
                        ? 'bg-green-50 border-green-100'
                        : 'bg-white hover:bg-gray-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`${
                        module.completed
                          ? 'text-green-500'
                          : module.locked
                          ? 'text-gray-400'
                          : 'text-primary'
                      }`}>
                        {module.completed ? (
                          <CheckCircle2 className="h-5 w-5" />
                        ) : module.locked ? (
                          <Lock className="h-5 w-5" />
                        ) : (
                          getModuleIcon(module.type)
                        )}
                      </div>
                      <div>
                        <p className={`font-medium ${
                          module.locked ? 'text-gray-500' : ''
                        }`}>
                          {module.title}
                        </p>
                        <p className="text-sm text-gray-500">
                          {module.duration} min • {module.type}
                        </p>
                      </div>
                    </div>
                    <Button
                      variant={module.completed ? "outline" : "default"}
                      disabled={module.locked}
                      onClick={() => {
                        // TODO: Navigate to module content
                        console.log('Navigate to module:', module.id);
                      }}
                    >
                      {module.completed ? 'Review' : 'Start'}
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
} 