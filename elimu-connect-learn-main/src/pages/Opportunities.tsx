import React from 'react';
import Header from '@/components/Header';
import FooterRedesign from '@/components/FooterRedesign';
import PartnerSection from '@/components/PartnerSection';
import HeroSection from '@/components/opportunities/HeroSection';
import WhyElimuSpace from '@/components/opportunities/WhyElimuSpace';
import LearnersInAction from '@/components/opportunities/LearnersInAction';
import TestimonialsMarquee from '@/components/opportunities/TestimonialsMarquee';
import OpportunitiesTimeline from '@/components/opportunities/OpportunitiesTimeline';
import GallerySection from '@/components/opportunities/GallerySection';
import FinalCTA from '@/components/opportunities/FinalCTA';
import FloatingCTAButton from '@/components/opportunities/FloatingCTAButton';

const Opportunities = () => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden">
      {/* NAVBAR ONLY - No hero section or course search */}
      <Header showCourseSearch={false} showHeroSection={false} />

      {/* NEW HERO SECTION - Appears right after navbar */}
      <HeroSection />
      <WhyElimuSpace />
      <LearnersInAction />
      <TestimonialsMarquee />
      <OpportunitiesTimeline />

      {/* REUSE EXISTING PARTNER SECTION */}
      <PartnerSection />

      <GallerySection />
      <FinalCTA />
      <FloatingCTAButton />

      {/* REUSE EXISTING FOOTER */}
      <FooterRedesign />
    </div>
  );
};

export default Opportunities;
