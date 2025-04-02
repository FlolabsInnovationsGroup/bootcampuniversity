'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star, Download, BookOpen, FileText, Video, Link as LinkIcon, Eye, ThumbsUp, MessageSquare, Share2, Search } from 'lucide-react';
import { format } from 'date-fns';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';

interface Resource {
  id: string;
  title: string;
  description: string;
  type: 'document' | 'video' | 'link' | 'book';
  url: string;
  courseId?: string;
  courseTitle?: string;
  tags: string[];
  createdAt: string;
  rating: number;
  reviews: number;
  views: number;
  likes: number;
  comments: number;
  author: {
    name: string;
    image: string;
    role: string;
  };
  lastAccessed?: string;
  progress?: number;
  version?: string;
  size?: string;
  duration?: string;
}

export function ResourceLibrary() {
  const [resources, setResources] = useState<Resource[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchResources();
  }, []);

  async function fetchResources() {
    try {
      const response = await fetch('/api/resources');
      if (!response.ok) throw new Error('Failed to fetch resources');
      const data = await response.json();
      setResources(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load resources');
    } finally {
      setLoading(false);
    }
  }

  async function handleLike(resourceId: string) {
    try {
      const response = await fetch(`/api/resources/${resourceId}/like`, {
        method: 'POST',
      });

      if (!response.ok) throw new Error('Failed to like resource');
      await fetchResources();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to like resource');
    }
  }

  async function handleShare(resourceId: string) {
    try {
      if (navigator.share) {
        await navigator.share({
          title: resources.find(r => r.id === resourceId)?.title,
          url: `/resources/${resourceId}`,
        });
      } else {
        await navigator.clipboard.writeText(`${window.location.origin}/resources/${resourceId}`);
        alert('Link copied to clipboard!');
      }
    } catch (err) {
      console.error('Error sharing:', err);
    }
  }

  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.description.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTags = selectedTags.length === 0 ||
                       selectedTags.some(tag => resource.tags.includes(tag));

    const matchesType = selectedType === 'all' || resource.type === selectedType;

    return matchesSearch && matchesTags && matchesType;
  });

  const allTags = [...new Set(resources.flatMap(resource => resource.tags))];

  function getResourceIcon(type: Resource['type']) {
    switch (type) {
      case 'document':
        return <FileText className="h-5 w-5" />;
      case 'video':
        return <Video className="h-5 w-5" />;
      case 'link':
        return <LinkIcon className="h-5 w-5" />;
      case 'book':
        return <BookOpen className="h-5 w-5" />;
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Resource Library</CardTitle>
        <CardDescription>Access your learning materials and resources</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {error && (
          <div className="text-red-500 text-sm">{error}</div>
        )}

        <div className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-9"
              />
            </div>
            <Select value={selectedType} onValueChange={setSelectedType}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="document">Documents</SelectItem>
                <SelectItem value="video">Videos</SelectItem>
                <SelectItem value="link">Links</SelectItem>
                <SelectItem value="book">Books</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex flex-wrap gap-2">
            {allTags.map((tag) => (
              <Badge
                key={tag}
                variant={selectedTags.includes(tag) ? 'default' : 'outline'}
                className="cursor-pointer"
                onClick={() => {
                  setSelectedTags(prev =>
                    prev.includes(tag)
                      ? prev.filter(t => t !== tag)
                      : [...prev, tag]
                  );
                }}
              >
                {tag}
              </Badge>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredResources.map((resource) => (
              <div
                key={resource.id}
                className="flex flex-col p-4 rounded-lg border space-y-3"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    {getResourceIcon(resource.type)}
                    <h3 className="font-medium">{resource.title}</h3>
                  </div>
                  <div className="flex items-center gap-1">
                    <Button variant="ghost" size="icon" onClick={() => handleLike(resource.id)}>
                      <ThumbsUp className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" onClick={() => handleShare(resource.id)}>
                      <Share2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground">
                  {resource.description}
                </p>

                {resource.courseTitle && (
                  <div className="text-sm">
                    <span className="font-medium">Course:</span> {resource.courseTitle}
                  </div>
                )}

                <div className="flex items-center gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 text-yellow-500" />
                    <span>{resource.rating.toFixed(1)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye className="h-4 w-4" />
                    <span>{resource.views}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="h-4 w-4" />
                    <span>{resource.likes}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <MessageSquare className="h-4 w-4" />
                    <span>{resource.comments}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-6 w-6">
                      <AvatarImage src={resource.author.image} />
                      <AvatarFallback>{resource.author.name[0]}</AvatarFallback>
                    </Avatar>
                    <div className="text-sm">
                      <div className="font-medium">{resource.author.name}</div>
                      <div className="text-muted-foreground">{resource.author.role}</div>
                    </div>
                  </div>
                  <Button variant="ghost" size="icon" asChild>
                    <a href={resource.url} target="_blank" rel="noopener noreferrer">
                      <Download className="h-4 w-4" />
                    </a>
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {resource.tags.map((tag) => (
                    <Badge key={tag} variant="secondary">
                      {tag}
                    </Badge>
                  ))}
                </div>

                {resource.progress !== undefined && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span>Progress</span>
                      <span>{resource.progress}%</span>
                    </div>
                    <Progress value={resource.progress} />
                  </div>
                )}

                <div className="text-xs text-muted-foreground">
                  {resource.version && <span>Version {resource.version} • </span>}
                  {resource.size && <span>{resource.size} • </span>}
                  {resource.duration && <span>{resource.duration} • </span>}
                  Last accessed: {resource.lastAccessed ? format(new Date(resource.lastAccessed), 'MMM d, yyyy') : 'Never'}
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 