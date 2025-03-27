import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X, Bookmark, BookmarkPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { useSession } from 'next-auth/react';
import { toast } from 'sonner';

interface Material {
  id: string;
  type: 'video' | 'document';
  title: string;
  duration?: string;
  content?: string;
  videoUrl?: string;
}

interface Bookmark {
  id: string;
  time: number;
  label: string;
  timestamp: string;
}

interface MaterialProgress {
  progress: number;
  lastPosition: number;
  notes: string;
  bookmarks: Bookmark[];
}

interface MaterialViewerProps {
  material: Material;
  isOpen: boolean;
  onClose: () => void;
  onProgressUpdate: (progress: number) => void;
}

export function MaterialViewer({
  material,
  isOpen,
  onClose,
  onProgressUpdate,
}: MaterialViewerProps) {
  const { data: session, status } = useSession();
  const [progress, setProgress] = useState(0);
  const [lastPosition, setLastPosition] = useState(0);
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [notes, setNotes] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  // Fetch progress data when component mounts
  useEffect(() => {
    if (isOpen && status === 'authenticated' && material.id) {
      fetchProgressData();
    }
  }, [isOpen, material.id, status]);

  // Simulate progress updates for video content
  useEffect(() => {
    if (material.type === 'video' && isOpen) {
      // For demo: Simulate video progress updates
      const interval = setInterval(() => {
        setLastPosition((prev) => prev + 1);
        if (progress < 100) {
          const newProgress = Math.min(progress + 1, 100);
          setProgress(newProgress);
          onProgressUpdate(newProgress);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [material.type, isOpen, progress, onProgressUpdate]);

  // Auto-save progress every 10 seconds
  useEffect(() => {
    if (!isOpen || status !== 'authenticated') return;

    const saveInterval = setInterval(() => {
      saveProgress();
    }, 10000);

    return () => clearInterval(saveInterval);
  }, [isOpen, progress, lastPosition, bookmarks, notes, status]);

  // Save progress when closing
  const handleClose = async () => {
    if (status === 'authenticated') {
      await saveProgress();
    }
    onClose();
  };

  const fetchProgressData = async () => {
    if (!session?.user?.id) return;
    
    setIsLoading(true);
    try {
      const response = await fetch(`/api/materials/${material.id}`);
      
      if (response.ok) {
        const data: MaterialProgress = await response.json();
        setProgress(data.progress);
        setLastPosition(data.lastPosition);
        setNotes(data.notes || '');
        setBookmarks(Array.isArray(data.bookmarks) ? data.bookmarks : []);
      }
    } catch (error) {
      console.error('Error fetching material progress:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const saveProgress = async () => {
    if (!session?.user?.id) return;
    
    setIsSaving(true);
    try {
      const response = await fetch(`/api/materials/${material.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          progress,
          lastPosition,
          notes,
          bookmarks,
        }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to save progress');
      }
    } catch (error) {
      console.error('Error saving progress:', error);
      toast.error('Failed to save progress');
    } finally {
      setIsSaving(false);
    }
  };

  const addBookmark = () => {
    const newBookmark: Bookmark = {
      id: Date.now().toString(),
      time: lastPosition,
      label: `Bookmark at ${formatTime(lastPosition)}`,
      timestamp: formatTime(lastPosition),
    };
    
    setBookmarks([...bookmarks, newBookmark]);
    toast.success('Bookmark added');
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && handleClose()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 bg-black/50 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
        <Dialog.Content className="fixed left-[50%] top-[50%] z-50 grid w-full max-w-4xl translate-x-[-50%] translate-y-[-50%] gap-4 border bg-background p-6 shadow-lg duration-200 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%] sm:rounded-lg">
          <div className="flex items-center justify-between">
            <Dialog.Title className="text-lg font-semibold">
              {material.title}
            </Dialog.Title>
            <Dialog.Close asChild>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                onClick={handleClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>

          {isLoading ? (
            <div className="min-h-[400px] flex items-center justify-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary" />
            </div>
          ) : (
            <div className="min-h-[400px] space-y-4">
              {material.type === 'video' ? (
                <>
                  {material.videoUrl ? (
                    <video
                      className="w-full aspect-video"
                      controls
                      src={material.videoUrl}
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full aspect-video bg-muted">
                      <p className="text-muted-foreground">Video not available</p>
                    </div>
                  )}
                  <div className="flex items-center gap-2">
                    <Progress value={progress} className="w-full" />
                    <span className="text-sm whitespace-nowrap">{formatTime(lastPosition)}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={addBookmark}
                      className="flex items-center gap-1"
                    >
                      <BookmarkPlus className="h-4 w-4" />
                      Bookmark
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={saveProgress}
                      disabled={isSaving}
                    >
                      {isSaving ? 'Saving...' : 'Save Progress'}
                    </Button>
                  </div>
                </>
              ) : (
                <div className="prose dark:prose-invert max-w-none">
                  {material.content ? (
                    <div dangerouslySetInnerHTML={{ __html: material.content }} />
                  ) : (
                    <p className="text-muted-foreground">Content not available</p>
                  )}
                </div>
              )}

              {bookmarks.length > 0 && (
                <div className="mt-4 border-t pt-4">
                  <h3 className="text-sm font-medium mb-2">Bookmarks</h3>
                  <div className="space-y-2">
                    {bookmarks.map((bookmark) => (
                      <div 
                        key={bookmark.id}
                        className="flex items-center gap-2 p-2 rounded-md bg-muted"
                      >
                        <Bookmark className="h-4 w-4 text-primary" />
                        <span className="text-sm">{bookmark.label}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 