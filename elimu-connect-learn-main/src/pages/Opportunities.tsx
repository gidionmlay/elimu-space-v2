import React from 'react';
import HeaderHero from '@/components/HeaderHero';
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
    <div className="min-h-screen">
      {/* REUSE EXISTING HEADER - without course search section */}
      <HeaderHero showCourseSearch={false} />

      {/* NEW SECTIONS */}
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
