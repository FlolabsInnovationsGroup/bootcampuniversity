'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { useToast } from '@/components/ui/use-toast';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { 
  Loader2, 
  BookOpen, 
  Edit, 
  Trash2, 
  Plus, 
  Search, 
  FileText, 
  Video, 
  Package, 
  AlertTriangle,
  RefreshCw,
  ArrowLeft
} from 'lucide-react';
import { LoadingSpinner } from '@/components/shared/LoadingPlaceholder';
import Link from 'next/link';

interface Course {
  id: string;
  title: string;
}

interface Material {
  id: string;
  title: string;
  description: string | null;
  type: string;
  content: string | null;
  duration: number | null;
  order: number;
  courseId: string;
  createdAt: string;
  updatedAt: string;
  course: {
    title: string;
  };
}

export default function MaterialsManagementPage() {
  const { data: session, status } = useSession();
  const [materials, setMaterials] = useState<Material[]>([]);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [courseFilter, setCourseFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentMaterial, setCurrentMaterial] = useState<Material | null>(null);
  const [newMaterial, setNewMaterial] = useState({
    title: '',
    description: '',
    type: 'video',
    content: '',
    duration: '',
    order: '',
    courseId: '',
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  // Add sorting functionality
  const [sortColumn, setSortColumn] = useState('order');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const toggleSort = (column: string) => {
    if (sortColumn === column) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortDirection('asc');
    }
  };

  const fetchCourses = async () => {
    try {
      const response = await fetch('/api/admin/courses');
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setCourses(data);
      
      // If we have courses and no courseId selected yet, select the first one
      if (data.length > 0 && newMaterial.courseId === '') {
        setNewMaterial(prev => ({ ...prev, courseId: data[0].id }));
      }
    } catch (err) {
      console.error('Failed to fetch courses:', err);
      toast({
        title: 'Error',
        description: 'Failed to load courses. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const fetchMaterials = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const url = courseFilter !== 'all'
        ? `/api/admin/materials?courseId=${courseFilter}`
        : '/api/admin/materials';
        
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
      
      const data = await response.json();
      setMaterials(data);
    } catch (err) {
      console.error('Failed to fetch materials:', err);
      setError(err instanceof Error ? err.message : 'Failed to load materials');
      toast({
        title: 'Error',
        description: 'Failed to load materials. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchCourses();
    }
  }, [session]);

  useEffect(() => {
    if (session?.user?.role === 'admin') {
      fetchMaterials();
    }
  }, [session, courseFilter]);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const getMaterialIcon = (type: string) => {
    switch (type) {
      case 'video': return <Video className="h-4 w-4" />;
      case 'text': return <FileText className="h-4 w-4" />;
      case 'quiz': return <Package className="h-4 w-4" />;
      case 'file': return <FileText className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const filteredMaterials = materials.filter((material) => {
    const matchesSearch = material.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         (material.description && material.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesType = typeFilter === 'all' || material.type === typeFilter;
    return matchesSearch && matchesType;
  });

  // Add sorting functionality
  const sortedMaterials = [...filteredMaterials].sort((a, b) => {
    // Handle different column sorts
    if (sortColumn === 'title') {
      return sortDirection === 'asc' 
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title);
    }
    if (sortColumn === 'type') {
      return sortDirection === 'asc'
        ? a.type.localeCompare(b.type)
        : b.type.localeCompare(a.type);
    }
    if (sortColumn === 'course') {
      return sortDirection === 'asc'
        ? a.course.title.localeCompare(b.course.title)
        : b.course.title.localeCompare(a.course.title);
    }
    if (sortColumn === 'order') {
      return sortDirection === 'asc'
        ? a.order - b.order
        : b.order - a.order;
    }
    if (sortColumn === 'updatedAt') {
      return sortDirection === 'asc'
        ? new Date(a.updatedAt).getTime() - new Date(b.updatedAt).getTime()
        : new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    }
    return 0;
  });

  const handleCreateMaterial = async () => {
    setSaving(true);
    
    try {
      // Convert string values to appropriate types
      const materialData = {
        ...newMaterial,
        duration: newMaterial.duration ? parseInt(newMaterial.duration) : null,
        order: parseInt(newMaterial.order || '0'),
      };
      
      const response = await fetch('/api/admin/materials', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(materialData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }
      
      const createdMaterial = await response.json();
      
      setMaterials([...materials, createdMaterial]);
      setNewMaterial({
        title: '',
        description: '',
        type: 'video',
        content: '',
        duration: '',
        order: '',
        courseId: courses.length > 0 ? courses[0].id : '',
      });
      setIsCreateDialogOpen(false);
      
      toast({
        title: 'Material created',
        description: `${createdMaterial.title} has been successfully created.`,
      });
    } catch (err) {
      console.error('Failed to create material:', err);
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to create material',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleEditMaterial = async () => {
    if (!currentMaterial) return;
    
    setSaving(true);
    
    try {
      // Convert string values to appropriate types for the current material
      const materialData = {
        id: currentMaterial.id,
        title: currentMaterial.title,
        description: currentMaterial.description,
        type: currentMaterial.type,
        content: currentMaterial.content,
        duration: typeof currentMaterial.duration === 'number' ? currentMaterial.duration : null,
        order: currentMaterial.order,
        courseId: currentMaterial.courseId,
      };
      
      const response = await fetch('/api/admin/materials', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(materialData),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }
      
      const updatedMaterial = await response.json();
      
      const updatedMaterials = materials.map(material => 
        material.id === currentMaterial.id ? updatedMaterial : material
      );
      
      setMaterials(updatedMaterials);
      setIsEditDialogOpen(false);
      
      toast({
        title: 'Material updated',
        description: `${currentMaterial.title} has been successfully updated.`,
      });
    } catch (err) {
      console.error('Failed to update material:', err);
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to update material',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteMaterial = async () => {
    if (!currentMaterial) return;
    
    setSaving(true);
    
    try {
      const response = await fetch(`/api/admin/materials?id=${currentMaterial.id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Error ${response.status}: ${response.statusText}`);
      }
      
      const updatedMaterials = materials.filter(material => material.id !== currentMaterial.id);
      
      setMaterials(updatedMaterials);
      setIsDeleteDialogOpen(false);
      
      toast({
        title: 'Material deleted',
        description: `${currentMaterial.title} has been successfully deleted.`,
        variant: 'destructive',
      });
    } catch (err) {
      console.error('Failed to delete material:', err);
      toast({
        title: 'Error',
        description: err instanceof Error ? err.message : 'Failed to delete material',
        variant: 'destructive',
      });
    } finally {
      setSaving(false);
    }
  };

  const handleRefresh = () => {
    fetchMaterials();
  };

  if (status === 'loading') {
    return (
      <div className="flex h-[50vh] items-center justify-center">
        <LoadingSpinner className="h-8 w-8" />
      </div>
    );
  }

  if (!session?.user || session.user.role !== 'admin') {
    return (
      <Card className="border-destructive">
        <CardHeader>
          <div className="flex items-center gap-2 text-destructive">
            <AlertTriangle />
            <CardTitle>Access Denied</CardTitle>
          </div>
          <CardDescription>
            You don't have permission to access this page.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>Please contact an administrator if you believe this is an error.</p>
        </CardContent>
        <CardFooter>
          <Button variant="outline" onClick={() => window.history.back()}>
            Go Back
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" asChild>
          <Link href="/admin/content">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Learning Materials</h1>
          <p className="text-muted-foreground">
            Manage learning materials for your courses.
          </p>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <Select value={courseFilter} onValueChange={setCourseFilter}>
            <SelectTrigger className="w-[200px]">
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Courses</SelectItem>
              {courses.map((course) => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Filter by type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="video">Video</SelectItem>
              <SelectItem value="text">Text</SelectItem>
              <SelectItem value="quiz">Quiz</SelectItem>
              <SelectItem value="file">File</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh}>
            <RefreshCw className="mr-2 h-4 w-4" /> Refresh
          </Button>
          <Button onClick={() => setIsCreateDialogOpen(true)}>
            <Plus className="mr-2 h-4 w-4" /> Add Material
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <div>
              <CardTitle>Materials</CardTitle>
              <CardDescription>
                {sortedMaterials.length} material{sortedMaterials.length !== 1 ? 's' : ''} found
              </CardDescription>
            </div>
            <div className="relative w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search materials..."
                className="pl-8"
                value={searchTerm}
                onChange={handleSearch}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {loading ? (
              <div className="flex justify-center py-10">
                <LoadingSpinner className="h-8 w-8" />
              </div>
            ) : error ? (
              <div className="text-center py-10">
                <AlertTriangle className="mx-auto h-12 w-12 text-destructive" />
                <h3 className="mt-2 text-lg font-semibold">Failed to load materials</h3>
                <p className="text-muted-foreground mb-4">{error}</p>
                <Button onClick={handleRefresh}>
                  <RefreshCw className="mr-2 h-4 w-4" /> Retry
                </Button>
              </div>
            ) : filteredMaterials.length === 0 ? (
              <div className="text-center py-10">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
                <h3 className="mt-2 text-lg font-semibold">No materials found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filters to find what you're looking for.
                </p>
              </div>
            ) : (
              <div className="rounded-md border">
                <div className="relative w-full overflow-auto">
                  <table className="w-full caption-bottom text-sm">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th 
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer hover:bg-muted/70"
                          onClick={() => toggleSort('title')}
                        >
                          <div className="flex items-center">
                            Title
                            {sortColumn === 'title' && (
                              sortDirection === 'asc' ? ' ↑' : ' ↓'
                            )}
                          </div>
                        </th>
                        <th 
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer hover:bg-muted/70"
                          onClick={() => toggleSort('type')}
                        >
                          <div className="flex items-center">
                            Type
                            {sortColumn === 'type' && (
                              sortDirection === 'asc' ? ' ↑' : ' ↓'
                            )}
                          </div>
                        </th>
                        <th 
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer hover:bg-muted/70"
                          onClick={() => toggleSort('course')}
                        >
                          <div className="flex items-center">
                            Course
                            {sortColumn === 'course' && (
                              sortDirection === 'asc' ? ' ↑' : ' ↓'
                            )}
                          </div>
                        </th>
                        <th 
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer hover:bg-muted/70"
                          onClick={() => toggleSort('order')}
                        >
                          <div className="flex items-center">
                            Order
                            {sortColumn === 'order' && (
                              sortDirection === 'asc' ? ' ↑' : ' ↓'
                            )}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Duration</th>
                        <th 
                          className="h-12 px-4 text-left align-middle font-medium cursor-pointer hover:bg-muted/70"
                          onClick={() => toggleSort('updatedAt')}
                        >
                          <div className="flex items-center">
                            Updated
                            {sortColumn === 'updatedAt' && (
                              sortDirection === 'asc' ? ' ↑' : ' ↓'
                            )}
                          </div>
                        </th>
                        <th className="h-12 px-4 text-left align-middle font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {sortedMaterials.map((material) => (
                        <tr key={material.id} className="border-b hover:bg-muted/50">
                          <td className="p-4 align-middle">{material.title}</td>
                          <td className="p-4 align-middle capitalize">
                            <div className="flex items-center gap-2">
                              {getMaterialIcon(material.type)}
                              {material.type}
                            </div>
                          </td>
                          <td className="p-4 align-middle">{material.course.title}</td>
                          <td className="p-4 align-middle">{material.order}</td>
                          <td className="p-4 align-middle">
                            {material.duration ? `${material.duration} min` : '-'}
                          </td>
                          <td className="p-4 align-middle">{new Date(material.updatedAt).toLocaleDateString()}</td>
                          <td className="p-4 align-middle">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => {
                                  setCurrentMaterial(material);
                                  setIsEditDialogOpen(true);
                                }}
                              >
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => {
                                  setCurrentMaterial(material);
                                  setIsDeleteDialogOpen(true);
                                }}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Create Material Dialog */}
      <Dialog open={isCreateDialogOpen} onOpenChange={setIsCreateDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Material</DialogTitle>
            <DialogDescription>
              Add learning materials to your courses. Fill out the form below to get started.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="courseId">Course</Label>
              <Select 
                value={newMaterial.courseId}
                onValueChange={(value) => setNewMaterial({...newMaterial, courseId: value})}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map((course) => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="title">Title</Label>
              <Input 
                id="title" 
                value={newMaterial.title}
                onChange={(e) => setNewMaterial({...newMaterial, title: e.target.value})}
                placeholder="Enter material title"
              />
            </div>
            
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="description">Description</Label>
              <Textarea 
                id="description" 
                value={newMaterial.description}
                onChange={(e) => setNewMaterial({...newMaterial, description: e.target.value})}
                placeholder="Enter material description"
                rows={3}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="type">Type</Label>
                <Select 
                  value={newMaterial.type}
                  onValueChange={(value) => setNewMaterial({...newMaterial, type: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="video">Video</SelectItem>
                    <SelectItem value="text">Text</SelectItem>
                    <SelectItem value="quiz">Quiz</SelectItem>
                    <SelectItem value="file">File</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="order">Display Order</Label>
                <Input 
                  id="order" 
                  type="number"
                  value={newMaterial.order}
                  onChange={(e) => setNewMaterial({...newMaterial, order: e.target.value})}
                  placeholder="Enter display order"
                />
              </div>
            </div>
            
            <div className="grid w-full items-center gap-1.5">
              <Label htmlFor="content">Content URL or Text</Label>
              <Input 
                id="content" 
                value={newMaterial.content}
                onChange={(e) => setNewMaterial({...newMaterial, content: e.target.value})}
                placeholder={newMaterial.type === 'video' ? 'Enter video URL' : 'Enter content URL or text'}
              />
            </div>
            
            {newMaterial.type === 'video' && (
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="duration">Duration (minutes)</Label>
                <Input 
                  id="duration" 
                  type="number"
                  value={newMaterial.duration}
                  onChange={(e) => setNewMaterial({...newMaterial, duration: e.target.value})}
                  placeholder="Enter duration in minutes"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateMaterial} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Material'
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit Material Dialog */}
      {currentMaterial && (
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Material</DialogTitle>
              <DialogDescription>
                Update the details for this material.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="edit-courseId">Course</Label>
                <Select 
                  value={currentMaterial.courseId}
                  onValueChange={(value) => setCurrentMaterial({...currentMaterial, courseId: value})}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select course" />
                  </SelectTrigger>
                  <SelectContent>
                    {courses.map((course) => (
                      <SelectItem key={course.id} value={course.id}>
                        {course.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="edit-title">Title</Label>
                <Input 
                  id="edit-title" 
                  value={currentMaterial.title}
                  onChange={(e) => setCurrentMaterial({...currentMaterial, title: e.target.value})}
                />
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="edit-description">Description</Label>
                <Textarea 
                  id="edit-description" 
                  value={currentMaterial.description || ''}
                  onChange={(e) => setCurrentMaterial({...currentMaterial, description: e.target.value})}
                  rows={3}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="edit-type">Type</Label>
                  <Select 
                    value={currentMaterial.type}
                    onValueChange={(value) => setCurrentMaterial({...currentMaterial, type: value})}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="video">Video</SelectItem>
                      <SelectItem value="text">Text</SelectItem>
                      <SelectItem value="quiz">Quiz</SelectItem>
                      <SelectItem value="file">File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="edit-order">Display Order</Label>
                  <Input 
                    id="edit-order" 
                    type="number"
                    value={currentMaterial.order.toString()}
                    onChange={(e) => setCurrentMaterial({...currentMaterial, order: parseInt(e.target.value) || 0})}
                  />
                </div>
              </div>
              
              <div className="grid w-full items-center gap-1.5">
                <Label htmlFor="edit-content">Content URL or Text</Label>
                <Input 
                  id="edit-content" 
                  value={currentMaterial.content || ''}
                  onChange={(e) => setCurrentMaterial({...currentMaterial, content: e.target.value})}
                />
              </div>
              
              {currentMaterial.type === 'video' && (
                <div className="grid w-full items-center gap-1.5">
                  <Label htmlFor="edit-duration">Duration (minutes)</Label>
                  <Input 
                    id="edit-duration" 
                    type="number"
                    value={currentMaterial.duration?.toString() || ''}
                    onChange={(e) => setCurrentMaterial({...currentMaterial, duration: parseInt(e.target.value) || null})}
                  />
                </div>
              )}
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsEditDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleEditMaterial} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  'Save Changes'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Material Dialog */}
      {currentMaterial && (
        <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Material</DialogTitle>
              <DialogDescription>
                Are you sure you want to delete this material? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <div className="py-4">
              <p className="font-medium">{currentMaterial.title}</p>
              <p className="text-sm text-muted-foreground mt-1 flex items-center gap-2">
                {getMaterialIcon(currentMaterial.type)}
                <span className="capitalize">{currentMaterial.type}</span> in {currentMaterial.course.title}
              </p>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDeleteMaterial} disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Deleting...
                  </>
                ) : (
                  'Delete Material'
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
} 