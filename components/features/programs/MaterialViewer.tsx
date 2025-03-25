'use client';

import { useState, useRef, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import {
  PlayCircle,
  FileText,
  CheckCircle,
  Clock,
  Forward,
  Rewind,
  MessageSquare,
  Bookmark,
  BookmarkPlus,
  Search,
} from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useMaterialData } from '@/hooks/useMaterialData';
import { LoadingSpinner } from '@/components/shared/LoadingSpinner';
import { toast } from 'sonner';

interface Bookmark {
  id: string;
  time: number;
  label: string;
  timestamp: string;
}

interface Material {
  id: number;
  type: 'video' | 'document';
  title: string;
  duration?: string;
  content?: string;
  videoUrl?: string;
}

interface MaterialViewerProps {
  material: Material;
  isOpen: boolean;
  onClose: () => void;
  onProgressUpdate: (progress: number) => void;
}

export function MaterialViewer({ material, isOpen, onClose, onProgressUpdate }: MaterialViewerProps) {
  const {
    data: { progress, notes, bookmarks, lastPosition },
    isLoading,
    error,
    updateProgress,
    updateNotes,
    addBookmark,
    removeBookmark,
    updateLastPosition,
  } = useMaterialData({
    materialId: material.id,
    onProgressUpdate,
  });

  const [currentTime, setCurrentTime] = useState(0);
  const [playbackSpeed, setPlaybackSpeed] = useState('1');
  const [showNotes, setShowNotes] = useState(false);
  const [isAddingBookmark, setIsAddingBookmark] = useState(false);
  const [bookmarkLabel, setBookmarkLabel] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const videoRef = useRef<HTMLVideoElement>(null);

  // Set initial video position
  useEffect(() => {
    if (isOpen && material.type === 'video' && videoRef.current && lastPosition > 0) {
      videoRef.current.currentTime = lastPosition;
    }
  }, [isOpen, material.type, lastPosition]);

  // Save video position periodically
  useEffect(() => {
    if (material.type === 'video') {
      const interval = setInterval(() => {
        if (videoRef.current) {
          updateLastPosition(videoRef.current.currentTime);
        }
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [material.type]);

  const handleProgressUpdate = (newProgress: number) => {
    updateProgress(newProgress);
  };

  const handleAddBookmark = () => {
    if (!videoRef.current || !bookmarkLabel.trim()) return;

    addBookmark({
      time: videoRef.current.currentTime,
      label: bookmarkLabel.trim(),
      timestamp: formatTime(videoRef.current.currentTime),
    });

    setBookmarkLabel('');
    setIsAddingBookmark(false);
    toast.success('Bookmark added');
  };

  const handleRemoveBookmark = (bookmarkId: string) => {
    removeBookmark(bookmarkId);
    toast.success('Bookmark removed');
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleKeyPress = (e: KeyboardEvent) => {
    if (!videoRef.current) return;

    switch (e.key.toLowerCase()) {
      case ' ':
        e.preventDefault();
        videoRef.current.paused ? videoRef.current.play() : videoRef.current.pause();
        break;
      case 'arrowleft':
        e.preventDefault();
        videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 10);
        break;
      case 'arrowright':
        e.preventDefault();
        videoRef.current.currentTime = Math.min(
          videoRef.current.duration,
          videoRef.current.currentTime + 10
        );
        break;
      case 'n':
        e.preventDefault();
        setShowNotes(prev => !prev);
        break;
      case 'b':
        e.preventDefault();
        setIsAddingBookmark(prev => !prev);
        break;
    }
  };

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', handleKeyPress);
      return () => window.removeEventListener('keydown', handleKeyPress);
    }
  }, [isOpen]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = parseFloat(playbackSpeed);
    }
  }, [playbackSpeed]);

  // Filter bookmarks based on search query
  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.label.toLowerCase().includes(searchQuery.toLowerCase()) ||
      bookmark.timestamp.includes(searchQuery)
  );

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <LoadingSpinner className="mx-auto h-8 w-8" />
            <p className="mt-4 text-sm text-muted-foreground">Loading material data...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="max-w-4xl h-[80vh] flex items-center justify-center">
          <div className="text-center">
            <p className="text-sm text-red-500">{error}</p>
            <Button
              variant="outline"
              onClick={onClose}
              className="mt-4"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        if (videoRef.current) {
          updateLastPosition(videoRef.current.currentTime);
        }
      }
      onClose();
    }}>
      <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {material.type === 'video' ? (
                <PlayCircle className="h-5 w-5 text-primary" />
              ) : (
                <FileText className="h-5 w-5 text-primary" />
              )}
              <span>{material.title}</span>
            </div>
            {material.type === 'video' && (
              <div className="flex items-center space-x-4">
                <Select value={playbackSpeed} onValueChange={setPlaybackSpeed}>
                  <SelectTrigger className="w-[100px]">
                    <SelectValue placeholder="Speed" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0.5">0.5x</SelectItem>
                    <SelectItem value="1">1x</SelectItem>
                    <SelectItem value="1.5">1.5x</SelectItem>
                    <SelectItem value="2">2x</SelectItem>
                  </SelectContent>
                </Select>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setShowNotes(prev => !prev)}
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Notes
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setIsAddingBookmark(prev => !prev)}
                >
                  <BookmarkPlus className="h-4 w-4 mr-2" />
                  Bookmark
                </Button>
              </div>
            )}
          </DialogTitle>
        </DialogHeader>

        <div className="flex-1 overflow-y-auto">
          <div className="grid grid-cols-1 md:grid-cols-[2fr,1fr] gap-4">
            <div className="space-y-4">
              {material.type === 'video' && material.videoUrl && (
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800">
                    <video
                      ref={videoRef}
                      src={material.videoUrl}
                      className="w-full h-full"
                      controls
                      onTimeUpdate={(e) => {
                        const video = e.currentTarget;
                        setCurrentTime(video.currentTime);
                        const newProgress = (video.currentTime / video.duration) * 100;
                        handleProgressUpdate(newProgress);
                      }}
                    />
                  </div>
                  <div className="flex items-center justify-between px-4">
                    <div className="flex items-center space-x-4">
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {formatTime(currentTime)}
                      </span>
                      <Progress value={progress} className="w-48" />
                      <span className="text-sm text-gray-500 dark:text-gray-400">
                        {material.duration}
                      </span>
                    </div>
                    {progress === 100 ? (
                      <Badge variant="success" className="flex items-center space-x-1">
                        <CheckCircle className="h-3 w-3" />
                        <span>Completed</span>
                      </Badge>
                    ) : (
                      <Badge variant="secondary" className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>In Progress</span>
                      </Badge>
                    )}
                  </div>
                  <div className="px-4 text-sm text-gray-500 dark:text-gray-400">
                    <p>Keyboard shortcuts:</p>
                    <ul className="list-disc list-inside">
                      <li>Space - Play/Pause</li>
                      <li>Left Arrow - Rewind 10s</li>
                      <li>Right Arrow - Forward 10s</li>
                      <li>N - Toggle Notes</li>
                      <li>B - Add Bookmark</li>
                    </ul>
                  </div>
                </div>
              )}

              {material.type === 'document' && material.content && (
                <div className="prose dark:prose-invert max-w-none p-4">
                  <div dangerouslySetInnerHTML={{ __html: material.content }} />
                </div>
              )}
            </div>

            <div className="space-y-4">
              {(showNotes || material.type === 'video') && (
                <div className="p-4 border rounded-lg">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <Search className="h-4 w-4 text-gray-500" />
                      <Input
                        type="search"
                        placeholder="Search notes and bookmarks..."
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        className="h-8"
                      />
                    </div>
                  </div>
                </div>
              )}

              {showNotes && (
                <div className="space-y-4 p-4 border rounded-lg">
                  <h3 className="font-semibold">Notes</h3>
                  <Textarea
                    value={notes}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => updateNotes(e.target.value)}
                    placeholder="Take notes here..."
                    className="min-h-[300px]"
                  />
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Notes are saved automatically
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {notes.length} characters
                    </p>
                  </div>
                </div>
              )}

              {material.type === 'video' && (
                <div className="space-y-4 p-4 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold">Bookmarks</h3>
                    <span className="text-sm text-gray-500">
                      {filteredBookmarks.length} of {bookmarks.length}
                    </span>
                  </div>
                  {isAddingBookmark ? (
                    <div className="space-y-2">
                      <Textarea
                        value={bookmarkLabel}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => 
                          setBookmarkLabel(e.target.value)
                        }
                        placeholder="Enter bookmark description..."
                        className="min-h-[80px]"
                      />
                      <div className="flex space-x-2">
                        <Button size="sm" onClick={handleAddBookmark}>
                          Save
                        </Button>
                        <Button 
                          size="sm" 
                          variant="outline" 
                          onClick={() => {
                            setIsAddingBookmark(false);
                            setBookmarkLabel('');
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : filteredBookmarks.length === 0 ? (
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {searchQuery
                        ? 'No bookmarks match your search.'
                        : 'No bookmarks yet. Add one to mark important moments.'}
                    </p>
                  ) : (
                    <div className="space-y-2">
                      {filteredBookmarks.map((bookmark) => (
                        <Button
                          key={bookmark.id}
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => handleRemoveBookmark(bookmark.id)}
                        >
                          <Bookmark className="h-4 w-4 mr-2" />
                          <div className="flex-1 text-left">
                            <div className="font-medium">{bookmark.label}</div>
                            <div className="text-xs text-gray-500">
                              {bookmark.timestamp}
                            </div>
                          </div>
                        </Button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
          {progress !== 100 && (
            <Button onClick={() => handleProgressUpdate(100)}>
              Mark as Completed
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
} 