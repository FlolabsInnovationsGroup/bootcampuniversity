import React, { useState } from 'react';
import NextImage, { ImageProps as NextImageProps } from 'next/image';
import { cn } from '@/lib/utils';

interface ImageProps extends Omit<NextImageProps, 'onError' | 'onLoad'> {
  fallbackSrc?: string;
}

export function Image({ className, fallbackSrc = '/logos/logo-fallback.svg', ...props }: ImageProps) {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  return (
    <div className={cn('relative', className)}>
      <NextImage
        {...props}
        className={cn(
          'transition-opacity duration-300',
          loading ? 'opacity-0' : 'opacity-100',
          props.className
        )}
        onError={() => {
          setError(true);
          setLoading(false);
          if (fallbackSrc && props.src !== fallbackSrc) {
            const imgElement = document.querySelector(`[src="${props.src}"]`) as HTMLImageElement;
            if (imgElement) {
              imgElement.src = fallbackSrc;
            }
          }
        }}
        onLoad={() => setLoading(false)}
      />
      {loading && (
        <div className="absolute inset-0 bg-slate-100 dark:bg-slate-800 animate-pulse rounded-lg" />
      )}
    </div>
  );
} 