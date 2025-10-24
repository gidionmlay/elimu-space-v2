import React from 'react';
import Header from '@/components/Header';
import FooterRedesign from '@/components/FooterRedesign';
import CoursesHero from '@/components/modern/CoursesHero';
import CategoryFilter from '@/components/modern/CategoryFilter';
import FeaturedCourses from '@/components/modern/FeaturedCourses';
import AllCoursesGrid from '@/components/modern/AllCoursesGrid';
import RequestCourseCTA from '@/components/modern/RequestCourseCTA';

const CoursesPage: React.FC = () => {
  return (
    <div className="w-full max-w-full overflow-x-hidden">
      <Header showCourseSearch={false} />
      
      {/* New Course Page Sections */}
      <CoursesHero />
      <CategoryFilter />
      <FeaturedCourses />
      <AllCoursesGrid />
      <RequestCourseCTA />

      {/* Reuse existing Footer */}
      <FooterRedesign />
    </div>
  );
};

export default CoursesPage;
