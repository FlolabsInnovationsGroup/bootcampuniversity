/**
 * Helper function to get conditional class names
 * @param classes Array of class names or objects with conditions
 * @returns Concatenated class names
 */
export function cn(...classes: (string | boolean | undefined | null | { [key: string]: boolean })[]) {
    return classes
      .filter(Boolean)
      .map((entry) => {
        if (entry && typeof entry === 'object' && !Array.isArray(entry)) {
          return Object.entries(entry)
            .filter(([_, value]) => Boolean(value))
            .map(([key]) => key)
            .join(' ');
        }
        return entry;
      })
      .join(' ');
  }
  
  /**
   * Get color classes based on theme color name
   * @param type The type of Tailwind class (bg, text, etc.)
   * @param color The color name (blue, indigo, etc.)
   * @returns The appropriate Tailwind class
   */
  export function getColorClass(type: string, color: string) {
    const colorMap: Record<string, Record<string, string>> = {
      bg: {
        blue: 'bg-blue-600',
        indigo: 'bg-indigo-600',
        teal: 'bg-teal-600',
        purple: 'bg-purple-600',
        orange: 'bg-orange-600',
      },
      'bg-light': {
        blue: 'bg-blue-100',
        indigo: 'bg-indigo-100',
        teal: 'bg-teal-100',
        purple: 'bg-purple-100',
        orange: 'bg-orange-100',
      },
      'bg-gradient': {
        blue: 'bg-gradient-to-r from-blue-600 to-blue-400',
        indigo: 'bg-gradient-to-r from-indigo-600 to-indigo-400',
        teal: 'bg-gradient-to-r from-teal-600 to-teal-400',
        purple: 'bg-gradient-to-r from-purple-600 to-purple-400',
        orange: 'bg-gradient-to-r from-orange-600 to-orange-400',
      },
      border: {
        blue: 'border-blue-600',
        indigo: 'border-indigo-600',
        teal: 'border-teal-600',
        purple: 'border-purple-600',
        orange: 'border-orange-600',
      },
      text: {
        blue: 'text-blue-600',
        indigo: 'text-indigo-600',
        teal: 'text-teal-600',
        purple: 'text-purple-600',
        orange: 'text-orange-600',
      },
      'text-light': {
        blue: 'text-blue-500',
        indigo: 'text-indigo-500',
        teal: 'text-teal-500',
        purple: 'text-purple-500',
        orange: 'text-orange-500',
      },
      hover: {
        blue: 'hover:bg-blue-700',
        indigo: 'hover:bg-indigo-700',
        teal: 'hover:bg-teal-700',
        purple: 'hover:bg-purple-700',
        orange: 'hover:bg-orange-700',
      },
      'hover-text': {
        blue: 'hover:text-blue-800',
        indigo: 'hover:text-indigo-800',
        teal: 'hover:text-teal-800',
        purple: 'hover:text-purple-800',
        orange: 'hover:text-orange-800',
      },
    };
  
    return colorMap[type]?.[color] || '';
  }