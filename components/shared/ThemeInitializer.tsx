"use client";

import * as React from 'react';
import { useTheme } from 'next-themes';

// Add this type declaration at the top
declare global {
  interface Window {
    toggleGlobalTheme?: () => void;
  }
}

export function ThemeInitializer() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    
    // Force the theme to be applied immediately on client side
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    const html = document.documentElement;
    
    function applyTheme() {
      const prefersDark = false; // Always prefer light mode
      const isDark = savedTheme === 'dark'; // Only use dark if explicitly saved
      
      // Add transition class before theme changes
      html.classList.add('transitioning-theme');
      
      // Apply the theme class
      if (isDark) {
        html.classList.add('dark');
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        
        // Force direct styles to critical elements for immediate effect
        document.body.style.setProperty('--background-color', '#0f172a');
        document.body.style.setProperty('--text-color', '#f8fafc');
        
        // Apply dark styles to all sections
        const sections = document.querySelectorAll('section, div, header, footer, main');
        sections.forEach(section => {
          if (section instanceof HTMLElement) {
            section.dataset.theme = 'dark';
            if (section.classList.contains('bg-white')) {
              section.classList.remove('bg-white');
              section.classList.add('dark:bg-slate-900');
            }
          }
        });
      } else {
        html.classList.remove('dark');
        document.body.classList.add('light-mode');
        document.body.classList.remove('dark-mode');
        
        // Reset light mode styles
        document.body.style.removeProperty('--background-color');
        document.body.style.removeProperty('--text-color');
        
        // Apply light styles to all sections
        const sections = document.querySelectorAll('section, div, header, footer, main');
        sections.forEach(section => {
          if (section instanceof HTMLElement) {
            section.dataset.theme = 'light';
            if (section.classList.contains('dark:bg-slate-900') && !section.classList.contains('bg-white')) {
              section.classList.add('bg-white');
            }
          }
        });
      }
      
      // Remove transition class after theme changes
      setTimeout(() => {
        html.classList.remove('transitioning-theme');
      }, 200);
    }
    
    // Apply theme on load
    applyTheme();
    
    // Create a global function that can be called from anywhere
    window.toggleGlobalTheme = () => {
      const newTheme = theme === 'dark' ? 'light' : 'dark';
      setTheme(newTheme);
      localStorage.setItem('theme', newTheme);
      applyTheme();
    };
    
    // Listen for system theme changes - but don't automatically apply them
    darkModeMediaQuery.addEventListener('change', (e) => {
      // Don't automatically change theme based on system preference
      // Only apply if user has manually chosen a theme
    });
    
    // Create a MutationObserver to watch for class changes on <html>
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class' && !html.classList.contains('transitioning-theme')) {
          applyTheme();
        }
      });
    });
    
    observer.observe(html, { 
      attributes: true,
      attributeFilter: ['class']
    });
    
    // Add CSS variables for smooth transitions
    const style = document.createElement('style');
    style.textContent = `
      :root {
        --theme-transition-duration: 200ms;
        --theme-transition-ease: cubic-bezier(0.4, 0, 0.2, 1);
      }
      
      .transitioning-theme * {
        transition: background-color var(--theme-transition-duration) var(--theme-transition-ease),
                    border-color var(--theme-transition-duration) var(--theme-transition-ease),
                    color var(--theme-transition-duration) var(--theme-transition-ease),
                    fill var(--theme-transition-duration) var(--theme-transition-ease),
                    stroke var(--theme-transition-duration) var(--theme-transition-ease),
                    opacity var(--theme-transition-duration) var(--theme-transition-ease),
                    box-shadow var(--theme-transition-duration) var(--theme-transition-ease) !important;
      }
      
      /* Prevent transition on page load */
      .no-transitions * {
        transition: none !important;
      }
    `;
    document.head.appendChild(style);
    
    // Add no-transitions class on load and remove it after a delay
    html.classList.add('no-transitions');
    setTimeout(() => {
      html.classList.remove('no-transitions');
    }, 100);
    
    return () => {
      darkModeMediaQuery.removeEventListener('change', applyTheme);
      observer.disconnect();
      style.remove();
    };
  }, [theme, setTheme]);

  // Prevent hydration mismatch
  if (!mounted) {
    return null;
  }

  return null;
} 