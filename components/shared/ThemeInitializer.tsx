"use client";

import * as React from 'react';

// Add this type declaration at the top
declare global {
  interface Window {
    toggleGlobalTheme?: () => void;
  }
}

export function ThemeInitializer() {
  React.useEffect(() => {
    // Force the theme to be applied immediately on client side
    const darkModeMediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const savedTheme = localStorage.getItem('theme');
    
    function applyTheme() {
      const html = document.documentElement;
      const prefersDark = darkModeMediaQuery.matches;
      const isDark = savedTheme === 'dark' || (!savedTheme && prefersDark);
      
      // Apply the theme class
      if (isDark) {
        html.classList.add('dark');
        document.body.classList.add('dark-mode');
        document.body.classList.remove('light-mode');
        
        // Force direct styles to all critical elements for immediate effect
        document.body.style.backgroundColor = '#0f172a'; // slate-950
        document.body.style.color = '#f8fafc'; // slate-50
        
        // Apply dark styles to all sections - covers the whole page
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
        
        // Reset light mode
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
        
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
    }
    
    // Apply theme on load
    applyTheme();
    
    // Create a global function that can be called from anywhere
    window.toggleGlobalTheme = () => {
      const isDark = document.documentElement.classList.contains('dark');
      localStorage.setItem('theme', isDark ? 'light' : 'dark');
      applyTheme();
    };
    
    // Listen for changes to the prefers-color-scheme media query
    darkModeMediaQuery.addEventListener('change', applyTheme);
    
    // Create a MutationObserver to watch for class changes on <html>
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          applyTheme();
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      darkModeMediaQuery.removeEventListener('change', applyTheme);
      observer.disconnect();
    };
  }, []);
  
  return null;
} 