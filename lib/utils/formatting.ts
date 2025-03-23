/**
 * Format a date to a readable string
 * @param date Date to format
 * @returns Formatted date string
 */
export function formatDate(date: Date | string): string {
    const dateObj = typeof date === 'string' ? new Date(date) : date;
    return new Intl.DateTimeFormat('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    }).format(dateObj);
  }
  
  /**
   * Format a duration in minutes to a readable string
   * @param minutes Duration in minutes
   * @returns Formatted duration string
   */
  export function formatDuration(minutes: number): string {
    if (minutes < 60) {
      return `${minutes} min${minutes === 1 ? '' : 's'}`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours} hour${hours === 1 ? '' : 's'}`;
    }
    
    return `${hours} hour${hours === 1 ? '' : 's'} ${remainingMinutes} min${remainingMinutes === 1 ? '' : 's'}`;
  }
  
  /**
   * Truncate text to a specified length
   * @param text Text to truncate
   * @param maxLength Maximum length
   * @returns Truncated text
   */
  export function truncateText(text: string, maxLength: number): string {
    if (text.length <= maxLength) return text;
    return text.slice(0, maxLength) + '...';
  }
  
  // types/index.ts
  export interface NavItem {
    title: string;
    href: string;
    description?: string;
  }
  
  export interface MainNavItem extends NavItem {}
  
  export interface SidebarNavItem extends NavItem {}
  
  export interface Option {
    label: string;
    value: string;
    icon?: React.ComponentType<{ className?: string }>;
  }
  
  export interface PageMeta {
    title: string;
    description: string;
    cardImage?: string;
  }
  
  export interface LearningResource {
    title: string;
    description: string;
    url: string;
    type: 'video' | 'article' | 'tutorial' | 'course' | 'documentation';
    duration?: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    provider: string;
    logo?: string;
  }
  
  export interface FAQ {
    question: string;
    answer: string;
  }
  
  export interface Testimonial {
    name: string;
    role: string;
    company?: string;
    content: string;
    avatar?: string;
    track?: string;
  }