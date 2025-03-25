import { cn } from '@/lib/utils';

interface LoadingPlaceholderProps {
  className?: string;
  width?: string;
  height?: string;
}

export function LoadingPlaceholder({
  className = '',
  width = 'w-full',
  height = 'h-4',
}: LoadingPlaceholderProps) {
  return (
    <div
      className={`${width} ${height} bg-gray-200 dark:bg-gray-700 rounded animate-pulse ${className}`}
    />
  );
}

interface LoadingCardProps {
  lines?: number;
  className?: string;
  imageHeight?: string;
  showImage?: boolean;
}

export function LoadingCard({
  lines = 3,
  className,
  imageHeight = 'h-48',
  showImage = true,
}: LoadingCardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden',
        'animate-pulse bg-gray-100 dark:bg-gray-900',
        className
      )}
    >
      {showImage && (
        <div className={cn('bg-gray-200 dark:bg-gray-800', imageHeight)} />
      )}
      <div className="p-4 space-y-3">
        <div className="h-4 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
        {Array.from({ length: lines - 1 }).map((_, i) => (
          <div
            key={i}
            className="h-3 bg-gray-200 dark:bg-gray-800 rounded"
            style={{
              width: `${Math.random() * 20 + 70}%`,
            }}
          />
        ))}
      </div>
    </div>
  );
}

interface LoadingGridProps {
  items?: number;
  columns?: number;
  gap?: string;
  className?: string;
}

export function LoadingGrid({
  items = 6,
  columns = 3,
  gap = 'gap-6',
  className,
}: LoadingGridProps) {
  return (
    <div
      className={cn(
        'grid',
        `grid-cols-1 sm:grid-cols-2 lg:grid-cols-${columns}`,
        gap,
        className
      )}
    >
      {Array.from({ length: items }).map((_, i) => (
        <LoadingCard key={i} />
      ))}
    </div>
  );
}

export function LoadingSpinner({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'animate-spin rounded-full border-2 border-current border-t-transparent',
        'h-4 w-4 text-primary',
        className
      )}
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
}

export function LoadingDots() {
  return (
    <span className="space-x-1">
      {Array.from({ length: 3 }).map((_, i) => (
        <span
          key={i}
          className="inline-block h-1 w-1 animate-bounce rounded-full bg-current"
          style={{
            animationDelay: `${i * 0.1}s`,
            animationDuration: '0.8s',
          }}
        />
      ))}
    </span>
  );
}

export function LoadingBar({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'h-1 w-full overflow-hidden rounded-full bg-gray-200 dark:bg-gray-800',
        className
      )}
    >
      <div className="h-full w-1/3 animate-loading-bar rounded-full bg-primary" />
    </div>
  );
}

export function LoadingPage() {
  return (
    <div className="flex min-h-[50vh] items-center justify-center">
      <div className="text-center">
        <LoadingSpinner className="mx-auto h-8 w-8" />
        <p className="mt-4 text-sm text-muted-foreground">Loading...</p>
      </div>
    </div>
  );
} 