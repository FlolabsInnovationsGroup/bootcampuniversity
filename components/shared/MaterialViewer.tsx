import { useEffect, useState } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

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

export function MaterialViewer({
  material,
  isOpen,
  onClose,
  onProgressUpdate,
}: MaterialViewerProps) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (material.type === 'video') {
      // Simulate video progress updates
      const interval = setInterval(() => {
        setProgress((prev) => {
          const newProgress = Math.min(prev + 1, 100);
          onProgressUpdate(newProgress);
          return newProgress;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [material.type, onProgressUpdate]);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
                onClick={onClose}
              >
                <X className="h-4 w-4" />
              </Button>
            </Dialog.Close>
          </div>

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
                <Progress value={progress} className="w-full" />
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
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
} 