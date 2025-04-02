'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { GripVertical, Plus, X } from 'lucide-react';

interface Section {
  id: string;
  title: string;
  order: number;
  modules: Module[];
}

interface Module {
  id: string;
  title: string;
  order: number;
  sectionId: string;
}

export function SectionManager({ courseId }: { courseId: string }) {
  const [sections, setSections] = useState<Section[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [newSectionTitle, setNewSectionTitle] = useState('');

  useEffect(() => {
    fetchSections();
  }, [courseId]);

  async function fetchSections() {
    try {
      const response = await fetch(`/api/courses/${courseId}/sections`);
      if (!response.ok) throw new Error('Failed to fetch sections');
      const data = await response.json();
      setSections(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load sections');
    } finally {
      setLoading(false);
    }
  }

  async function handleAddSection(e: React.FormEvent) {
    e.preventDefault();
    if (!newSectionTitle.trim()) return;

    try {
      const response = await fetch(`/api/courses/${courseId}/sections`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: newSectionTitle,
          order: sections.length
        })
      });

      if (!response.ok) throw new Error('Failed to create section');
      
      const newSection = await response.json();
      setSections([...sections, newSection]);
      setNewSectionTitle('');
    } catch (err) {
      console.error('Error creating section:', err);
    }
  }

  async function handleDeleteSection(sectionId: string) {
    try {
      const response = await fetch(`/api/courses/${courseId}/sections/${sectionId}`, {
        method: 'DELETE'
      });

      if (!response.ok) throw new Error('Failed to delete section');
      
      setSections(sections.filter(section => section.id !== sectionId));
    } catch (err) {
      console.error('Error deleting section:', err);
    }
  }

  async function handleDragEnd(result: any) {
    if (!result.destination) return;

    const items = Array.from(sections);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSections(items);

    try {
      await fetch(`/api/courses/${courseId}/sections/reorder`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sections: items.map((section, index) => ({
            id: section.id,
            order: index
          }))
        })
      });
    } catch (err) {
      console.error('Error reordering sections:', err);
    }
  }

  if (loading) return <div>Loading sections...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Course Sections</CardTitle>
          <CardDescription>Organize your course content into sections</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAddSection} className="flex gap-2 mb-4">
            <div className="flex-1">
              <Label htmlFor="newSection" className="sr-only">New Section Title</Label>
              <Input
                id="newSection"
                placeholder="Enter section title"
                value={newSectionTitle}
                onChange={(e) => setNewSectionTitle(e.target.value)}
              />
            </div>
            <Button type="submit">
              <Plus className="h-4 w-4 mr-2" />
              Add Section
            </Button>
          </form>

          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="sections">
              {(provided) => (
                <div
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                  className="space-y-2"
                >
                  {sections.map((section, index) => (
                    <Draggable
                      key={section.id}
                      draggableId={section.id}
                      index={index}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          className="border rounded-lg p-4"
                        >
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <div {...provided.dragHandleProps}>
                                <GripVertical className="h-5 w-5 text-gray-400" />
                              </div>
                              <h3 className="font-medium">{section.title}</h3>
                            </div>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => handleDeleteSection(section.id)}
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </div>
                          <div className="pl-7">
                            {section.modules.map((module) => (
                              <div
                                key={module.id}
                                className="flex items-center justify-between py-2"
                              >
                                <span className="text-sm">{module.title}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardContent>
      </Card>
    </div>
  );
} 