'use client';

import { useState } from 'react';

export function SkipLink() {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <a
      href="#main-content"
      className={`
        fixed top-2 left-2 z-[100]
        bg-primary-600 text-white
        px-4 py-2 rounded-md
        opacity-0 pointer-events-none
        focus:opacity-100 focus:pointer-events-auto
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2
      `}
      onFocus={() => setIsFocused(true)}
      onBlur={() => setIsFocused(false)}
    >
      Skip to main content
    </a>
  );
} 