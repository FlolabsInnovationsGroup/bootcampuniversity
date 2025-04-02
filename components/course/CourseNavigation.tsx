'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronRight, BookOpen, Video, FileText } from 'lucide-react';
import Link from 'next/link';

interface Section {
  id: string;
  title: string;
  modules: Module[];
}

interface Module {
  id: string;
  title: string;
  type: 'video' | 'article' | 'quiz';
  duration: number;
  isCompleted: boolean;
  isLocked: boolean;
}

interface CourseNavigationProps {
  courseId: string;
  sections: Section[];
  currentModuleId?: string;
}

export function CourseNavigation({
  courseId,
  sections,
  currentModuleId
}: CourseNavigationProps) {
  const [expandedSections, setExpandedSections] = useState<string[]>([]);

  function toggleSection(sectionId: string) {
    setExpandedSections(prev =>
      prev.includes(sectionId)
        ? prev.filter(id => id !== sectionId)
        : [...prev, sectionId]
    );
  }

  function getModuleIcon(type: Module['type']) {
    switch (type) {
      case 'video':
        return <Video className="h-4 w-4" />;
      case 'article':
        return <FileText className="h-4 w-4" />;
      case 'quiz':
        return <BookOpen className="h-4 w-4" />;
    }
  }

  return (
    <Card className="sticky top-4">
      <CardContent className="p-0">
        <div className="divide-y">
          {sections.map((section) => (
            <div key={section.id}>
              <button
                onClick={() => toggleSection(section.id)}
                className="flex w-full items-center justify-between p-4 hover:bg-muted/50"
              >
                <span className="font-medium">{section.title}</span>
                {expandedSections.includes(section.id) ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </button>

              {expandedSections.includes(section.id) && (
                <div className="space-y-1 pb-2">
                  {section.modules.map((module) => (
                    <Link
                      key={module.id}
                      href={`/courses/${courseId}/learn/${module.id}`}
                      className={`flex items-center gap-2 px-4 py-2 text-sm ${
                        module.id === currentModuleId
                          ? 'bg-primary/10 text-primary'
                          : 'hover:bg-muted/50'
                      } ${module.isLocked ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                      <div className="flex items-center gap-2 flex-1">
                        {getModuleIcon(module.type)}
                        <span>{module.title}</span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {module.duration} min
                      </span>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
} 