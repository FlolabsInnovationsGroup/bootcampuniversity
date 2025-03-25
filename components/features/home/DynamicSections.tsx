'use client';

import dynamic from 'next/dynamic';
import { AnimatedSection } from '@/components/shared/AnimatedSection';

// Loading component for dynamic imports
const LoadingPlaceholder = () => (
  <div className="min-h-[600px] animate-pulse bg-slate-100 dark:bg-slate-800/50 rounded-2xl" />
);

// Dynamically import heavier components with explicit SSR setting
const Testimonials = dynamic(() => import('@/components/features/home/Testimonials'), {
  loading: LoadingPlaceholder,
  ssr: false
});

const Apply = dynamic(() => import('@/components/features/home/Apply'), {
  loading: LoadingPlaceholder,
  ssr: false
});

export function DynamicTestimonials() {
  return (
    <AnimatedSection background="grid">
      <Testimonials />
    </AnimatedSection>
  );
}

export function DynamicApply() {
  return (
    <AnimatedSection background="light" className="bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-950/50 dark:to-slate-900">
      <Apply />
    </AnimatedSection>
  );
} 