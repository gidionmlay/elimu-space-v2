import HeaderHero from "@/components/HeaderHero";
import PopularCourses from "@/components/PopularCourses";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import BlogSection from "@/components/BlogSection";
import PartnerSection from "@/components/PartnerSection";
import FooterRedesign from "@/components/FooterRedesign";

const Index = () => {
  return (
    <div className="min-h-screen w-full max-w-full overflow-x-hidden">
      <HeaderHero />
      <PopularCourses />
      <TestimonialsCarousel />
      <BlogSection />
      <PartnerSection />
      <FooterRedesign />
    </div>
  );
};

export default Index;
