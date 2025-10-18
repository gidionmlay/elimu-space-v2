// Course image imports
import digitalMarketingMastery from '@/assets/course/Digital Marketing Mastery.jpg';
import graphicsDesignBranding from '@/assets/course/Graphics design and branding.jpg';
import entrepreneurBusinessSkills from '@/assets/course/Enterpreneur and bussiness skills.jpg';
import financeEssential from '@/assets/course/finance essential.jpg';
import confidentCommunication from '@/assets/course/confident communication.jpg';
import careerLaunchpad from '@/assets/course/Career launchpad.jpg';
import dataAnalyst from '@/assets/course/Data Analyst.jpg';
import softSkillsLeadership from '@/assets/course/soft skills and leadership.jpg';

// Default placeholder image as data URL
const defaultCourseImageSvg = `data:image/svg+xml;base64,${btoa(`
<svg width="400" height="225" viewBox="0 0 400 225" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="400" height="225" fill="url(#gradient)"/>
  <defs>
    <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F97316;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#EA580C;stop-opacity:1" />
    </linearGradient>
  </defs>
  <text x="200" y="120" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-size="24" font-weight="bold">Course Image</text>
</svg>
`)}`;

// Course image mapping
export const courseImages: Record<string, string> = {
  'digital-marketing-mastery': digitalMarketingMastery,
  'graphic-design-branding': graphicsDesignBranding,
  'entrepreneurship-business-skills': entrepreneurBusinessSkills,
  'finance-essentials': financeEssential,
  'confident-communication': confidentCommunication,
  'career-launchpad': careerLaunchpad,
  'data-analytics-essentials': dataAnalyst,
  'soft-skills-leadership': softSkillsLeadership,
};

// Function to get course image with fallback
export const getCourseImage = (courseId: string, fallbackImage?: string): string => {
  return courseImages[courseId] || fallbackImage || defaultCourseImageSvg;
};

// Function to get course image by title (case-insensitive matching)
export const getCourseImageByTitle = (title: string): string => {
  const normalizedTitle = title.toLowerCase().replace(/[^a-z0-9]/g, '');
  
  // Try to match by title patterns
  if (normalizedTitle.includes('digitalmarketing')) return courseImages['digital-marketing-mastery'];
  if (normalizedTitle.includes('graphicdesign') || normalizedTitle.includes('branding')) return courseImages['graphic-design-branding'];
  if (normalizedTitle.includes('entrepreneur') || normalizedTitle.includes('business')) return courseImages['entrepreneurship-business-skills'];
  if (normalizedTitle.includes('finance')) return courseImages['finance-essentials'];
  if (normalizedTitle.includes('communication')) return courseImages['confident-communication'];
  if (normalizedTitle.includes('career') || normalizedTitle.includes('launchpad')) return courseImages['career-launchpad'];
  if (normalizedTitle.includes('data') || normalizedTitle.includes('analytics')) return courseImages['data-analytics-essentials'];
  if (normalizedTitle.includes('softskills') || normalizedTitle.includes('leadership')) return courseImages['soft-skills-leadership'];
  
  return defaultCourseImageSvg;
};

export default courseImages;
