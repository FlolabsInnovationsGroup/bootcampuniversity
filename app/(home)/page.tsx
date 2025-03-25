import Hero from '@/components/features/home/Hero';
import Features from '@/components/features/home/Features';
import TieredJourney from '@/components/features/home/TieredJourney';
import PartnerShowcase from '@/components/features/home/PartnerShowcase';
import FeaturedTracks from '@/components/features/home/FeaturedTracks';
import FAQ from '@/components/features/home/FAQ';
import { AnimatedSection } from '@/components/shared/AnimatedSection';
import { BackgroundDecorations } from '@/components/shared/BackgroundDecorations';
import { DynamicTestimonials, DynamicApply } from '@/components/features/home/DynamicSections';

export default function HomePage() {
  return (
    <main className="relative w-full overflow-hidden" suppressHydrationWarning>
      <BackgroundDecorations />
      
      <AnimatedSection>
        <Hero />
      </AnimatedSection>

      <AnimatedSection background="light">
        <Features />
      </AnimatedSection>

      <AnimatedSection background="grid">
        <FeaturedTracks />
      </AnimatedSection>

      <AnimatedSection background="grid">
        <TieredJourney />
      </AnimatedSection>

      <AnimatedSection background="gradient">
        <PartnerShowcase />
      </AnimatedSection>

      <DynamicTestimonials />

      <AnimatedSection background="light">
        <FAQ />
      </AnimatedSection>

      <DynamicApply />
    </main>
  );
} 