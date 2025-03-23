"use client";

import * as React from "react";
import { Moon, Sun } from "lucide-react";

// Extend Window interface to include our custom function
declare global {
  interface Window {
    toggleDarkMode?: () => void;
    toggleGlobalTheme?: () => void;
  }
}

export function ThemeSwitch() {
  const [mounted, setMounted] = React.useState(false);
  
  // Set up theme toggle function that manipulates DOM directly and forces the entire page to update
  const toggleTheme = () => {
    // Use the global function if available
    if (typeof window !== "undefined" && window.toggleGlobalTheme) {
      window.toggleGlobalTheme();
      // Force re-render
      setMounted(prevState => !prevState);
      return;
    }
    
    // Fallback if the global function isn't available
    const html = document.documentElement;
    const isDark = html.classList.contains('dark');
    
    if (isDark) {
      html.classList.remove('dark');
      localStorage.setItem('theme', 'light');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#ffffff');
    } else {
      html.classList.add('dark');
      localStorage.setItem('theme', 'dark');
      document.querySelector('meta[name="theme-color"]')?.setAttribute('content', '#0f172a');
    }
    
    // Force re-render
    setMounted(prevState => !prevState);
  };
  
  // Check if we're on client side
  React.useEffect(() => {
    setMounted(true);
  }, []);
  
  // Determine current theme for icon display
  const isDarkMode = mounted ? document.documentElement.classList.contains('dark') : false;
  
  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="w-10 h-10 p-2 rounded-lg bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 flex items-center justify-center"
    >
      {isDarkMode ? (
        <Moon className="h-5 w-5 text-slate-300" />
      ) : (
        <Sun className="h-5 w-5 text-amber-500" />
      )}
      <span className="sr-only">
        {isDarkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      </span>
    </button>
  );
} 