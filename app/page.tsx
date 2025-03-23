import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import TieredJourney from '@/components/home/TieredJourney';
import FeaturedTracks from '@/components/home/FeaturedTracks';
import PartnerShowcase from '@/components/home/PartnerShowcase';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';
import Apply from '@/components/home/Apply';

export default function Home() {
  return (
    <main className="relative w-full overflow-hidden">
      {/* Background decorations */}
      <div className="pointer-events-none absolute inset-0 bg-mesh-gradient opacity-40" />
      
      {/* Hero Section */}
      <section className="relative">
        <Hero />
      </section>

      {/* Features Section with offset background */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-slate-50/50 dark:bg-slate-950/50" />
        <Features />
      </section>

      {/* Tiered Journey Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid opacity-[0.03]" />
        <TieredJourney />
      </section>

      {/* Partner Showcase with gradient background */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-slate-50/80 to-transparent dark:via-slate-950/80" />
        <PartnerShowcase />
      </section>

      {/* Testimonials Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-grid opacity-[0.03]" />
        <TestimonialCarousel />
      </section>

      {/* Application Section */}
      <section className="relative py-20 sm:py-32">
        <div className="absolute inset-0 bg-gradient-to-b from-slate-50/50 to-white dark:from-slate-950/50 dark:to-slate-900" />
        <Apply />
      </section>

      {/* Future sections to be added */}
      {/* <section className="relative py-20 sm:py-32">
        <FeaturedTracks />
      </section> */}
    </main>
  );
}