import { useState, useEffect } from 'react';
import { toast } from 'sonner';

interface Bookmark {
  id: string;
  time: number;
  label: string;
  timestamp: string;
}

interface MaterialData {
  progress: number;
  notes: string;
  bookmarks: Bookmark[];
  lastPosition: number;
}

interface UseMaterialDataProps {
  materialId: number;
  onProgressUpdate?: (progress: number) => void;
}

export function useMaterialData({ materialId, onProgressUpdate }: UseMaterialDataProps) {
  const [data, setData] = useState<MaterialData>({
    progress: 0,
    notes: '',
    bookmarks: [],
    lastPosition: 0,
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/materials/${materialId}`);
        if (!response.ok) {
          throw new Error('Failed to fetch material data');
        }
        const responseData = await response.json();
        setData({
          ...responseData,
          bookmarks: responseData.bookmarks ? JSON.parse(responseData.bookmarks) : [],
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [materialId]);

  const updateProgress = async (newProgress: number) => {
    try {
      const response = await fetch(`/api/materials/${materialId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ progress: newProgress }),
      });

      if (!response.ok) {
        throw new Error('Failed to update progress');
      }

      setData(prev => ({ ...prev, progress: newProgress }));
      onProgressUpdate?.(newProgress);
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update progress');
    }
  };

  const updateNotes = async (newNotes: string) => {
    try {
      const response = await fetch(`/api/materials/${materialId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ notes: newNotes }),
      });

      if (!response.ok) {
        throw new Error('Failed to update notes');
      }

      setData(prev => ({ ...prev, notes: newNotes }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to update notes');
    }
  };

  const addBookmark = async (newBookmark: Omit<Bookmark, 'id'>) => {
    try {
      const bookmark: Bookmark = {
        ...newBookmark,
        id: crypto.randomUUID(),
      };

      const updatedBookmarks = [...data.bookmarks, bookmark];

      const response = await fetch(`/api/materials/${materialId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookmarks: JSON.stringify(updatedBookmarks) }),
      });

      if (!response.ok) {
        throw new Error('Failed to add bookmark');
      }

      setData(prev => ({
        ...prev,
        bookmarks: updatedBookmarks,
      }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to add bookmark');
    }
  };

  const removeBookmark = async (bookmarkId: string) => {
    try {
      const updatedBookmarks = data.bookmarks.filter(b => b.id !== bookmarkId);

      const response = await fetch(`/api/materials/${materialId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookmarks: JSON.stringify(updatedBookmarks) }),
      });

      if (!response.ok) {
        throw new Error('Failed to remove bookmark');
      }

      setData(prev => ({
        ...prev,
        bookmarks: updatedBookmarks,
      }));
    } catch (err) {
      toast.error(err instanceof Error ? err.message : 'Failed to remove bookmark');
    }
  };

  const updateLastPosition = async (newPosition: number) => {
    try {
      const response = await fetch(`/api/materials/${materialId}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ lastPosition: newPosition }),
      });

      if (!response.ok) {
        throw new Error('Failed to update last position');
      }

      setData(prev => ({ ...prev, lastPosition: newPosition }));
    } catch (err) {
      console.error('Failed to update last position:', err);
    }
  };

  return {
    data,
    isLoading,
    error,
    updateProgress,
    updateNotes,
    addBookmark,
    removeBookmark,
    updateLastPosition,
  };
} 