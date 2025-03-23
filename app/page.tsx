import React from 'react';
import Hero from '@/components/home/Hero';
import Features from '@/components/home/Features';
import TieredJourney from '@/components/home/TieredJourney';
import FeaturedTracks from '@/components/home/FeaturedTracks';
import PartnerShowcase from '@/components/home/PartnerShowcase';
import TestimonialCarousel from '@/components/home/TestimonialCarousel';

export default function Home() {
  return (
    <div className="w-full">
      <Hero />
      <Features />
      <TieredJourney />
      
      {/* Uncomment these components as they're developed */}
      {/* <FeaturedTracks /> */}
      <PartnerShowcase />
      <TestimonialCarousel />
    </div>
  );
}