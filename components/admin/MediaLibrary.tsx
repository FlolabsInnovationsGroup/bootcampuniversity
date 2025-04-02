import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Image, Video, FileText, MoreVertical, Upload, Folder } from 'lucide-react';

interface MediaItem {
  id: string;
  name: string;
  type: 'image' | 'video' | 'document';
  url: string;
  size: number;
  createdAt: string;
  thumbnailUrl?: string;
}

interface MediaLibraryProps {
  items: MediaItem[];
  onUpload: (files: FileList) => Promise<void>;
  onDelete: (id: string) => Promise<void>;
  onCreateFolder: (name: string) => Promise<void>;
}

export function MediaLibrary({ items, onUpload, onDelete, onCreateFolder }: MediaLibraryProps) {
  const [view, setView] = useState<'grid' | 'list'>('grid');
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      onUpload(files);
    }
  };

  const formatFileSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-6 w-6" />;
      case 'video':
        return <Video className="h-6 w-6" />;
      default:
        return <FileText className="h-6 w-6" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex gap-4">
          <div className="relative">
            <Input
              type="file"
              multiple
              className="hidden"
              id="upload-files"
              onChange={handleFileUpload}
            />
            <Button asChild>
              <label htmlFor="upload-files" className="cursor-pointer">
                <Upload className="mr-2 h-4 w-4" />
                Upload Files
              </label>
            </Button>
          </div>
          <Button variant="outline" onClick={() => onCreateFolder('New Folder')}>
            <Folder className="mr-2 h-4 w-4" />
            New Folder
          </Button>
        </div>
      </div>

      <div className={view === 'grid' ? 'grid grid-cols-4 gap-4' : 'space-y-2'}>
        {items.map((item) => (
          <Card
            key={item.id}
            className={`
              ${view === 'grid' ? 'p-4' : 'p-2'}
              ${selectedItems.includes(item.id) ? 'ring-2 ring-primary' : ''}
              hover:bg-muted/50 cursor-pointer
            `}
            onClick={() => {
              setSelectedItems((prev) =>
                prev.includes(item.id)
                  ? prev.filter((id) => id !== item.id)
                  : [...prev, item.id]
              );
            }}
          >
            <div className={view === 'grid' ? 'space-y-4' : 'flex items-center gap-4'}>
              <div className="relative aspect-square w-full max-w-[100px] overflow-hidden rounded-lg bg-muted">
                {item.thumbnailUrl ? (
                  <img
                    src={item.thumbnailUrl}
                    alt={item.name}
                    className="object-cover"
                  />
                ) : (
                  <div className="flex h-full items-center justify-center">
                    {getFileIcon(item.type)}
                  </div>
                )}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center justify-between">
                  <p className="font-medium truncate">{item.name}</p>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          window.open(item.url, '_blank');
                        }}
                      >
                        View
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        className="text-red-600"
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(item.id);
                        }}
                      >
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
                <div className="flex text-xs text-muted-foreground">
                  <p>{formatFileSize(item.size)}</p>
                  <span className="mx-1">•</span>
                  <p>{new Date(item.createdAt).toLocaleDateString()}</p>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
} 