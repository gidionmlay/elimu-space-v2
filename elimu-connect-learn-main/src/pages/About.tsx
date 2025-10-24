import React from 'react';
import Header from '@/components/Header';
import FooterRedesign from '@/components/FooterRedesign';
import PartnerSection from '@/components/PartnerSection';
import StickyNavigation from '@/components/about/StickyNavigation';
import HeroSection from '@/components/about/HeroSection';
import MissionVisionSection from '@/components/about/MissionVisionSection';
import CoreValuesSection from '@/components/about/CoreValuesSection';
import ImpactStatistics from '@/components/about/ImpactStatistics';
import TeamSection from '@/components/about/TeamSection';
import FinalCTA from '@/components/about/FinalCTA';

const About = () => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden">
      {/* REUSE EXISTING HEADER - without course search section */}
      <Header showCourseSearch={false} />

      {/* NEW SECTIONS */}
      <StickyNavigation />
      <HeroSection />
      <MissionVisionSection />
      <CoreValuesSection />
      <ImpactStatistics />

      {/* TEAM SECTION */}
      <TeamSection />

      {/* REUSE EXISTING PARTNER SECTION */}
      <PartnerSection />

      <FinalCTA />

      {/* REUSE EXISTING FOOTER */}
      <FooterRedesign />
    </div>
  );
};

export default About;
