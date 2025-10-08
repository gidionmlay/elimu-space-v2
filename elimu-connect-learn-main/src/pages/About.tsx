import React from 'react';
import HeaderHero from '@/components/HeaderHero';
import FooterRedesign from '@/components/FooterRedesign';
import PartnerSection from '@/components/PartnerSection';
import StickyNavigation from '@/components/about/StickyNavigation';
import HeroSection from '@/components/about/HeroSection';
import MissionVisionSection from '@/components/about/MissionVisionSection';
import CoreValuesSection from '@/components/about/CoreValuesSection';
import ImpactStatistics from '@/components/about/ImpactStatistics';
import FinalCTA from '@/components/about/FinalCTA';

const About = () => {
  return (
    <div className="min-h-screen">
      {/* REUSE EXISTING HEADER */}
      <HeaderHero />

      {/* NEW SECTIONS */}
      <StickyNavigation />
      <HeroSection />
      <MissionVisionSection />
      <CoreValuesSection />
      <ImpactStatistics />

      {/* REUSE EXISTING PARTNER SECTION */}
      <PartnerSection />

      <FinalCTA />

      {/* REUSE EXISTING FOOTER */}
      <FooterRedesign />
    </div>
  );
};

export default About;
