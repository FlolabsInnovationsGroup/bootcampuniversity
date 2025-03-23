import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

/**
 * Combines and merges CSS classes with Tailwind CSS classes
 * Handles conditional classes, merges tailwind utilities and removes conflicts
 * @param inputs - Array of class names, objects, or falsy values
 * @returns Merged and deduplicated class string
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
} 