'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  BookOpen, 
  Clock, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  PlayCircle,
  FileText,
  BarChart3
} from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { LoadingSpinner } from '@/components/shared/LoadingPlaceholder';
import { Badge } from '@/components/ui/badge';
import { MaterialViewer } from '@/components/shared/MaterialViewer';

interface Assignment {
  id: number;
  title: string;
  dueDate: Date;
  status: 'pending' | 'submitted' | 'graded';
  grade?: number;
}

interface Material {
  id: number;
  type: 'video' | 'document';
  title: string;
  duration?: string;
  content?: string;
  videoUrl?: string;
}

interface Module {
  id: number;
  title: string;
  description: string;
  duration: string;
  progress: number;
  materials: Material[];
  assignments: Assignment[];
}

interface Program {
  id: number;
  title: string;
  description: string;
  progress: number;
  startDate: Date;
  endDate: Date;
  modules: Module[];
  nextSession?: {
    title: string;
    date: Date;
    type: 'lecture' | 'workshop' | 'mentoring';
  };
}

// Mock data - replace with API call
const fetchUserPrograms = async (): Promise<Program[]> => {
  await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
  return [
    {
      id: 1,
      title: 'Full-Stack Development Track',
      description: 'Master modern web development with React, Node.js, and cloud technologies.',
      progress: 65,
      startDate: new Date('2024-01-15'),
      endDate: new Date('2024-07-15'),
      modules: [
        {
          id: 1,
          title: 'Frontend Fundamentals',
          description: 'Learn the core concepts of modern frontend development.',
          duration: '4 weeks',
          progress: 100,
          materials: [
            {
              id: 1,
              type: 'video',
              title: 'Introduction to React',
              duration: '45 min',
            },
            {
              id: 2,
              type: 'document',
              title: 'React Best Practices Guide',
            },
          ],
          assignments: [
            {
              id: 1,
              title: 'Build a React Component Library',
              dueDate: new Date('2024-02-01'),
              status: 'graded',
              grade: 95,
            },
          ],
        },
        {
          id: 2,
          title: 'Backend Development',
          description: 'Master server-side programming and API development.',
          duration: '6 weeks',
          progress: 45,
          materials: [
            {
              id: 3,
              type: 'video',
              title: 'Node.js Fundamentals',
              duration: '60 min',
            },
            {
              id: 4,
              type: 'document',
              title: 'API Design Guidelines',
            },
          ],
          assignments: [
            {
              id: 2,
              title: 'Create a RESTful API',
              dueDate: new Date('2024-03-15'),
              status: 'pending',
            },
          ],
        },
      ],
      nextSession: {
        title: 'Advanced API Security',
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2), // 2 days from now
        type: 'lecture',
      },
    },
    {
      id: 2,
      title: 'Cloud Architecture Specialization',
      description: 'Learn to design and implement scalable cloud solutions.',
      progress: 25,
      startDate: new Date('2024-02-01'),
      endDate: new Date('2024-08-01'),
      modules: [
        {
          id: 3,
          title: 'Cloud Fundamentals',
          description: 'Understanding cloud computing concepts and services.',
          duration: '3 weeks',
          progress: 75,
          materials: [
            {
              id: 5,
              type: 'video',
              title: 'Introduction to Cloud Computing',
              duration: '50 min',
            },
            {
              id: 6,
              type: 'document',
              title: 'Cloud Service Models Overview',
            },
          ],
          assignments: [
            {
              id: 3,
              title: 'Design a Cloud Architecture',
              dueDate: new Date('2024-03-01'),
              status: 'submitted',
            },
          ],
        },
      ],
      nextSession: {
        title: 'Containerization Workshop',
        date: new Date(Date.now() + 1000 * 60 * 60 * 24 * 4), // 4 days from now
        type: 'workshop',
      },
    },
  ];
};

export default function MyProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedProgram, setSelectedProgram] = useState<Program | null>(null);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);

  const loadPrograms = async () => {
    try {
      const data = await fetchUserPrograms();
      setPrograms(data);
      if (data.length > 0) {
        setSelectedProgram(data[0]);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load programs');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadPrograms();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Card className="p-6 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-500 dark:text-gray-400 mb-4">{error}</p>
          <Button
            onClick={() => {
              setError(null);
              setIsLoading(true);
              loadPrograms();
            }}
          >
            Try Again
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            My Learning Tracks
          </h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track your progress and access your course materials
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Programs List */}
        <div className="lg:col-span-1 space-y-4">
          {programs.map((program) => (
            <motion.div
              key={program.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <Card
                className={`p-4 cursor-pointer transition-colors ${
                  selectedProgram?.id === program.id
                    ? 'border-primary-500 dark:border-primary-400'
                    : 'hover:border-gray-300 dark:hover:border-gray-600'
                }`}
                onClick={() => setSelectedProgram(program)}
              >
                <div className="flex items-start justify-between">
                  <div className="space-y-1">
                    <h3 className="font-semibold text-gray-900 dark:text-white">
                      {program.title}
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Progress value={program.progress} className="w-24" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {program.progress}%
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Program Details */}
        {selectedProgram && (
          <div className="lg:col-span-2 space-y-6">
            <Card className="p-6">
              <div className="space-y-4">
                <div className="flex items-start justify-between">
                  <div>
                    <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                      {selectedProgram.title}
                    </h2>
                    <p className="text-gray-500 dark:text-gray-400 mt-1">
                      {selectedProgram.description}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Overall Progress
                    </div>
                    <div className="text-2xl font-semibold text-gray-900 dark:text-white">
                      {selectedProgram.progress}%
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-4 text-sm">
                  <div className="flex items-center text-gray-500 dark:text-gray-400">
                    <Calendar className="h-4 w-4 mr-1" />
                    {new Date(selectedProgram.startDate).toLocaleDateString()} -{' '}
                    {new Date(selectedProgram.endDate).toLocaleDateString()}
                  </div>
                  {selectedProgram.nextSession && (
                    <Badge variant="secondary" className="flex items-center">
                      <Clock className="h-3 w-3 mr-1" />
                      Next: {selectedProgram.nextSession.title} on{' '}
                      {new Date(selectedProgram.nextSession.date).toLocaleDateString()}
                    </Badge>
                  )}
                </div>
              </div>
            </Card>

            {/* Modules */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                Modules
              </h3>
              {selectedProgram.modules.map((module) => (
                <Card key={module.id} className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h4 className="font-semibold text-gray-900 dark:text-white">
                          {module.title}
                        </h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {module.description}
                        </p>
                      </div>
                      <Badge>
                        <Clock className="h-3 w-3 mr-1" />
                        {module.duration}
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-2">
                      <Progress value={module.progress} />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {module.progress}%
                      </span>
                    </div>

                    {/* Materials */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Materials
                      </h5>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {module.materials.map((material) => (
                          <Button
                            key={material.id}
                            variant="outline"
                            className="justify-start"
                            onClick={() => setSelectedMaterial(material)}
                          >
                            {material.type === 'video' ? (
                              <PlayCircle className="h-4 w-4 mr-2" />
                            ) : (
                              <FileText className="h-4 w-4 mr-2" />
                            )}
                            <div className="truncate">
                              <span className="mr-2">{material.title}</span>
                              {material.duration && (
                                <span className="text-gray-500 dark:text-gray-400">
                                  ({material.duration})
                                </span>
                              )}
                            </div>
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Assignments */}
                    <div className="space-y-2">
                      <h5 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Assignments
                      </h5>
                      <div className="space-y-2">
                        {module.assignments.map((assignment) => (
                          <div
                            key={assignment.id}
                            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800/50 rounded-lg"
                          >
                            <div className="flex items-center space-x-3">
                              {assignment.status === 'graded' ? (
                                <CheckCircle2 className="h-5 w-5 text-green-500" />
                              ) : assignment.status === 'submitted' ? (
                                <Clock className="h-5 w-5 text-yellow-500" />
                              ) : (
                                <BarChart3 className="h-5 w-5 text-gray-400" />
                              )}
                              <div>
                                <div className="font-medium text-gray-900 dark:text-white">
                                  {assignment.title}
                                </div>
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                                </div>
                              </div>
                            </div>
                            {assignment.status === 'graded' && (
                              <Badge variant="default" className="bg-green-500">
                                Grade: {assignment.grade}%
                              </Badge>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        )}
      </div>

      {selectedMaterial && (
        <MaterialViewer
          material={selectedMaterial as any}
          isOpen={!!selectedMaterial}
          onClose={() => setSelectedMaterial(null)}
          onProgressUpdate={(progress: number) => {
            // Update progress logic here
            console.log('Progress updated:', progress);
          }}
        />
      )}
    </div>
  );
}