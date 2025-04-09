'use client';

import { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DroppableProvided, DraggableProvided } from '@hello-pangea/dnd';
import { Plus, GripVertical, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { useToast } from '@/components/ui/use-toast';
import { useSearchParams } from 'next/navigation';

interface Module {
  id: string;
  title: string;
  description: string;
  type: 'video' | 'quiz' | 'assignment' | 'reading';
  duration: number;
  order: number;
}

interface Section {
  id: string;
  title: string;
  modules: Module[];
  isExpanded?: boolean;
}

export default function CurriculumBuilder() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const courseId = searchParams.get('courseId');
  const [sections, setSections] = useState<Section[]>([]);
  const [newSectionTitle, setNewSectionTitle] = useState('');
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!courseId) {
      toast({
        title: 'Error',
        description: 'Course ID is required',
        variant: 'destructive',
      });
      return;
    }

    const loadCurriculum = async () => {
      try {
        const response = await fetch(`/api/admin/curriculum?courseId=${courseId}`);
        if (!response.ok) throw new Error('Failed to load curriculum');
        
        const data = await response.json();
        if (data?.sections) {
          setSections(data.sections.map((section: any) => ({
            ...section,
            isExpanded: true
          })));
        }
      } catch (error) {
        console.error('Error loading curriculum:', error);
        toast({
          title: 'Error',
          description: 'Failed to load curriculum',
          variant: 'destructive',
        });
      } finally {
        setLoading(false);
      }
    };

    loadCurriculum();
  }, [courseId, toast]);

  const saveCurriculum = async () => {
    if (!courseId) return;

    setSaving(true);
    try {
      const response = await fetch(`/api/admin/curriculum?courseId=${courseId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sections),
      });

      if (!response.ok) throw new Error('Failed to save curriculum');

      toast({
        title: 'Success',
        description: 'Curriculum saved successfully',
      });
    } catch (error) {
      console.error('Error saving curriculum:', error);
      toast({
        title: 'Error',
        description: 'Failed to save curriculum',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const addSection = () => {
    if (!newSectionTitle.trim()) return;
    
    setSections([
      ...sections,
      {
        id: Date.now().toString(),
        title: newSectionTitle,
        modules: [],
        isExpanded: true
      }
    ]);
    setNewSectionTitle('');
  };

  const addModule = (sectionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          modules: [
            ...section.modules,
            {
              id: Date.now().toString(),
              title: 'New Module',
              description: '',
              type: 'video',
              duration: 0,
              order: section.modules.length
            }
          ]
        };
      }
      return section;
    }));
  };

  const toggleSection = (sectionId: string) => {
    setSections(sections.map(section => {
      if (section.id === sectionId) {
        return {
          ...section,
          isExpanded: !section.isExpanded
        };
      }
      return section;
    }));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const { source, destination } = result;
    const sourceSection = sections.find(s => s.id === source.droppableId);
    const destSection = sections.find(s => s.id === destination.droppableId);

    if (!sourceSection || !destSection) return;

    const newSections = [...sections];
    const sourceIndex = newSections.findIndex(s => s.id === sourceSection.id);
    const destIndex = newSections.findIndex(s => s.id === destSection.id);

    const [movedModule] = sourceSection.modules.splice(source.index, 1);
    destSection.modules.splice(destination.index, 0, movedModule);

    // Update order numbers
    destSection.modules = destSection.modules.map((module, index) => ({
      ...module,
      order: index
    }));

    newSections[sourceIndex] = sourceSection;
    newSections[destIndex] = destSection;
    setSections(newSections);
  };

  if (loading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <div className="animate-spin h-12 w-12 border-4 border-primary border-t-transparent rounded-full"></div>
      </div>
    );
  }

  if (!courseId) {
    return (
      <div className="text-center py-12">
        <h2 className="text-xl font-semibold text-gray-900">Course ID Required</h2>
        <p className="mt-2 text-gray-600">Please provide a course ID to manage its curriculum.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Curriculum Builder</h1>
          <p className="text-muted-foreground">
            Create and organize your course content
          </p>
        </div>
        <Button onClick={saveCurriculum} disabled={saving}>
          {saving ? 'Saving...' : 'Save Curriculum'}
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Add New Section</CardTitle>
          <CardDescription>
            Sections help organize your course content into logical groups
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              placeholder="Enter section title"
              value={newSectionTitle}
              onChange={(e) => setNewSectionTitle(e.target.value)}
              className="max-w-sm"
            />
            <Button onClick={addSection}>Add Section</Button>
          </div>
        </CardContent>
      </Card>

      <DragDropContext onDragEnd={handleDragEnd}>
        {sections.map((section) => (
          <Card key={section.id} className="mb-4">
            <CardHeader className="cursor-pointer" onClick={() => toggleSection(section.id)}>
              <div className="flex items-center justify-between">
                <CardTitle>{section.title}</CardTitle>
                <Button variant="ghost" size="icon">
                  {section.isExpanded ? <ChevronUp /> : <ChevronDown />}
                </Button>
              </div>
            </CardHeader>
            {section.isExpanded && (
              <CardContent>
                <Droppable droppableId={section.id}>
                  {(provided: DroppableProvided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {section.modules.map((module, index) => (
                        <Draggable
                          key={module.id}
                          draggableId={module.id}
                          index={index}
                        >
                          {(provided: DraggableProvided) => (
                            <div
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="flex items-center gap-2 p-2 bg-gray-50 rounded-md"
                            >
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-move"
                              >
                                <GripVertical className="h-5 w-5 text-gray-400" />
                              </div>
                              <Input
                                value={module.title}
                                onChange={(e) => {
                                  const newSections = [...sections];
                                  newSections[sections.findIndex(s => s.id === section.id)]
                                    .modules[index].title = e.target.value;
                                  setSections(newSections);
                                }}
                                className="flex-1"
                              />
                              <Select
                                value={module.type}
                                onValueChange={(value: any) => {
                                  const newSections = [...sections];
                                  newSections[sections.findIndex(s => s.id === section.id)]
                                    .modules[index].type = value;
                                  setSections(newSections);
                                }}
                              >
                                <SelectTrigger className="w-32">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="video">Video</SelectItem>
                                  <SelectItem value="quiz">Quiz</SelectItem>
                                  <SelectItem value="assignment">Assignment</SelectItem>
                                  <SelectItem value="reading">Reading</SelectItem>
                                </SelectContent>
                              </Select>
                              <Input
                                type="number"
                                placeholder="Duration (min)"
                                value={module.duration}
                                onChange={(e) => {
                                  const newSections = [...sections];
                                  newSections[sections.findIndex(s => s.id === section.id)]
                                    .modules[index].duration = parseInt(e.target.value) || 0;
                                  setSections(newSections);
                                }}
                                className="w-32"
                              />
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => {
                                  const newSections = [...sections];
                                  newSections[sections.findIndex(s => s.id === section.id)]
                                    .modules.splice(index, 1);
                                  setSections(newSections);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                      <Button
                        variant="outline"
                        className="w-full mt-2"
                        onClick={() => addModule(section.id)}
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add Module
                      </Button>
                    </div>
                  )}
                </Droppable>
              </CardContent>
            )}
          </Card>
        ))}
      </DragDropContext>
    </div>
  );
} 