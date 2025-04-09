'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Video, FileText, Link as LinkIcon, Upload } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface Section {
  id: string;
  title: string;
  order: number;
}

export default function NewContentPage({ params }: { params: { courseId: string } }) {
  const router = useRouter();
  const [contentType, setContentType] = useState('article');
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [content, setContent] = useState('');
  const [url, setUrl] = useState('');
  const [sectionId, setSectionId] = useState('');
  const [sections, setSections] = useState<Section[]>([]);
  const [videoFile, setVideoFile] = useState<File | null>(null);

  // Fetch course sections
  useEffect(() => {
    async function fetchSections() {
      try {
        const response = await fetch(`/api/courses/${params.courseId}/sections`);
        if (!response.ok) throw new Error('Failed to fetch sections');
        const data = await response.json();
        setSections(data);
        if (data.length > 0) {
          setSectionId(data[0].id);
        }
      } catch (error) {
        console.error('Error fetching sections:', error);
      }
    }
    fetchSections();
  }, [params.courseId]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('type', contentType);
      formData.append('sectionId', sectionId);

      if (contentType === 'article') {
        formData.append('content', content);
      } else if (contentType === 'video') {
        if (url) {
          formData.append('url', url);
        } else if (videoFile) {
          formData.append('file', videoFile);
        }
      } else if (contentType === 'resource') {
        formData.append('url', url);
      }

      const response = await fetch(`/api/courses/${params.courseId}/content`, {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        throw new Error('Failed to create content');
      }

      router.push(`/admin/courses/${params.courseId}`);
      router.refresh();
    } catch (error) {
      console.error('Error creating content:', error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Add Course Content</h1>
        <p className="text-muted-foreground">
          Add new learning materials to your course
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <Card>
          <CardHeader>
            <CardTitle>Content Type</CardTitle>
            <CardDescription>Choose the type of content you want to add</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              <Button
                type="button"
                variant={contentType === 'article' ? 'default' : 'outline'}
                className="flex flex-col items-center justify-center gap-2 h-24"
                onClick={() => setContentType('article')}
              >
                <FileText className="h-8 w-8" />
                <span>Article</span>
              </Button>
              <Button
                type="button"
                variant={contentType === 'video' ? 'default' : 'outline'}
                className="flex flex-col items-center justify-center gap-2 h-24"
                onClick={() => setContentType('video')}
              >
                <Video className="h-8 w-8" />
                <span>Video</span>
              </Button>
              <Button
                type="button"
                variant={contentType === 'resource' ? 'default' : 'outline'}
                className="flex flex-col items-center justify-center gap-2 h-24"
                onClick={() => setContentType('resource')}
              >
                <LinkIcon className="h-8 w-8" />
                <span>External Resource</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content Details</CardTitle>
            <CardDescription>Enter the details for your content</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter a title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Enter a description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="section">Course Section</Label>
              <Select value={sectionId} onValueChange={setSectionId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a section" />
                </SelectTrigger>
                <SelectContent>
                  {sections.map((section) => (
                    <SelectItem key={section.id} value={section.id}>
                      {section.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Content</CardTitle>
            <CardDescription>Add your content based on the selected type</CardDescription>
          </CardHeader>
          <CardContent>
            {contentType === 'article' && (
              <div className="space-y-2">
                <Label>Article Content</Label>
                <Textarea
                  placeholder="Write your article content here..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="min-h-[300px]"
                  required
                />
              </div>
            )}

            {contentType === 'video' && (
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label>Video Source</Label>
                  <Tabs defaultValue="url" className="w-full">
                    <TabsList>
                      <TabsTrigger value="url">External URL</TabsTrigger>
                      <TabsTrigger value="upload">Upload Video</TabsTrigger>
                    </TabsList>
                    <TabsContent value="url">
                      <div className="space-y-2">
                        <Label htmlFor="video-url">Video URL</Label>
                        <Input
                          id="video-url"
                          type="url"
                          placeholder="Enter video URL (YouTube, Vimeo, etc.)"
                          value={url}
                          onChange={(e) => setUrl(e.target.value)}
                        />
                      </div>
                    </TabsContent>
                    <TabsContent value="upload">
                      <div className="space-y-2">
                        <Label htmlFor="video-file">Upload Video</Label>
                        <div className="flex items-center justify-center w-full">
                          <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <Upload className="w-8 h-8 mb-4 text-gray-500" />
                              <p className="mb-2 text-sm text-gray-500">
                                <span className="font-semibold">Click to upload</span> or drag and drop
                              </p>
                              <p className="text-xs text-gray-500">MP4, WebM or OGG (MAX. 800MB)</p>
                            </div>
                            <input
                              id="video-file"
                              type="file"
                              className="hidden"
                              accept="video/*"
                              onChange={(e) => setVideoFile(e.target.files?.[0] || null)}
                            />
                          </label>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </div>
            )}

            {contentType === 'resource' && (
              <div className="space-y-2">
                <Label htmlFor="resource-url">Resource URL</Label>
                <Input
                  id="resource-url"
                  type="url"
                  placeholder="Enter resource URL"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  required
                />
              </div>
            )}
          </CardContent>
        </Card>

        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={loading}
          >
            Cancel
          </Button>
          <Button type="submit" disabled={loading}>
            {loading ? 'Adding Content...' : 'Add to Course'}
          </Button>
        </div>
      </form>
    </div>
  );
} 