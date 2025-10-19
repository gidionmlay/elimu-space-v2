/**
 * TeamSection Component
 * Optimized team showcase with refined marquee animation
 * Displays exactly 4 compact team cards with slow, elegant scrolling
 */

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Linkedin, Twitter, Instagram, Mail } from 'lucide-react';
import imaniAvatar from '@/assets/avatars/imani_p.jpg';
import gidiionAvatar from '@/assets/avatars/gidiion.jpg';
import suzanAvatar from '@/assets/avatars/suzani.jpg';
import godfreyAvatar from '@/assets/avatars/godfrey_chussi.jpg';

interface TeamMember {
  id: number;
  name: string;
  role: string;
  description: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    instagram?: string;
    email?: string;
  };
}

// Only 4 team members as requested
const teamMembers: TeamMember[] = [
  {
    id: 1,
    name: 'Imani Penza',
    role: 'Chief Executive Officer',
    description: 'Passionate about democratizing education and empowering youth through technology.',
    image: imaniAvatar,
    social: {
      linkedin: 'https://linkedin.com/in/imani-penza',
      twitter: 'https://twitter.com/imanipenza',
      email: 'imani@elimuspace.co.tz'
    }
  },
  {
    id: 2,
    name: 'Gidion John Mlay',
    role: 'Lead Course Developer',
    description: 'Expert in creating engaging content that bridges theory and real-world application.',
    image: gidiionAvatar,
    social: {
      linkedin: 'https://linkedin.com/in/gidion-john-mlay',
      instagram: 'https://www.instagram.com/_gidionmlay/#',
      email: 'gidionmlay5@gmail.com'
    }
  },
  {
    id: 3,
    name: 'Suzani Mwame',
    role: 'Head of Student Success',
    description: 'Dedicated to ensuring every learner achieves their goals and career aspirations.',
    image: suzanAvatar,
    social: {
      linkedin: 'https://linkedin.com/in/suzani-mwame',
      twitter: 'https://twitter.com/suzanimwame',
      instagram: 'https://instagram.com/suzani.learns'
    }
  },
  {
    id: 4,
    name: 'Jeofrey Chussi',
    role: 'Head of Partnerships',
    description: 'Building strategic partnerships to expand opportunities for our learning community.',
    image: godfreyAvatar,
    social: {
      linkedin: 'https://linkedin.com/in/jeofrey-chussi',
      twitter: 'https://twitter.com/jeofrey_chussi',
      email: 'jeofrey@elimuspace.co.tz'
    }
  }
];

interface TeamCardProps {
  member: TeamMember;
}

const TeamCard: React.FC<TeamCardProps> = ({ member }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      className="relative bg-white rounded-2xl shadow-lg overflow-hidden group flex-shrink-0 w-[250px] sm:w-[265px] h-[340px]"
      whileHover={{ y: -6, scale: 1.02 }}
      transition={{ duration: 0.3 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
    >
      {/* Profile Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={member.image}
          alt={member.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Hover Overlay with Social Icons */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-gradient-to-t from-[#1f2937]/95 via-[#1f2937]/70 to-transparent flex items-end justify-center pb-6"
        >
          <motion.div
            initial={{ y: 15, opacity: 0 }}
            animate={{ y: isHovered ? 0 : 15, opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
            className="flex gap-2.5"
          >
            {member.social.linkedin && (
              <a
                href={member.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label={`${member.name} LinkedIn`}
              >
                <Linkedin className="w-4 h-4 text-[#22c55e]" />
              </a>
            )}
            {member.social.twitter && (
              <a
                href={member.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label={`${member.name} Twitter`}
              >
                <Twitter className="w-4 h-4 text-[#3b82f6]" />
              </a>
            )}
            {member.social.instagram && (
              <a
                href={member.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label={`${member.name} Instagram`}
              >
                <Instagram className="w-4 h-4 text-[#22c55e]" />
              </a>
            )}
            {member.social.email && (
              <a
                href={`mailto:${member.social.email}`}
                className="w-9 h-9 bg-white/90 hover:bg-white rounded-full flex items-center justify-center transition-all hover:scale-110"
                aria-label={`Email ${member.name}`}
              >
                <Mail className="w-4 h-4 text-[#1f2937]" />
              </a>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Team Member Info */}
      <div className="p-4 bg-white h-[calc(340px-192px)]">
        <h3 className="text-lg font-bold text-[#1f2937] mb-1 font-poppins leading-tight">
          {member.name}
        </h3>
        <p className="text-[#22c55e] font-semibold mb-2 text-xs uppercase tracking-wide">
          {member.role}
        </p>
        <p className="text-gray-600 text-xs leading-relaxed font-inter line-clamp-3">
          {member.description}
        </p>
      </div>

      {/* Bottom Accent */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-[#22c55e] via-[#3b82f6] to-[#22c55e] transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />
    </motion.div>
  );
};

const TeamSection: React.FC = () => {
  const [isPaused, setIsPaused] = useState(false);

  // Duplicate the array multiple times for seamless infinite loop
  const duplicatedMembers = [...teamMembers, ...teamMembers, ...teamMembers, ...teamMembers];

  return (
    <section className="py-20 bg-gradient-to-br from-[#f9fafb] via-white to-[#f9fafb] overflow-hidden">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-[#1f2937] mb-4 font-poppins">
            Meet Our Team
          </h2>
          <div className="w-24 h-1 bg-gradient-to-r from-[#22c55e] to-[#3b82f6] mx-auto mb-6 rounded-full" />
          <p className="text-lg text-gray-600 max-w-2xl mx-auto font-inter">
            A passionate group of educators, technologists, and innovators dedicated to
            transforming education in Tanzania and beyond.
          </p>
        </motion.div>

        {/* Marquee Container */}
        <div className="relative">
          {/* Left Fade Gradient */}
          <div className="absolute left-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-r from-[#f9fafb] via-[#f9fafb]/90 to-transparent z-10 pointer-events-none" />

          {/* Right Fade Gradient */}
          <div className="absolute right-0 top-0 bottom-0 w-24 md:w-32 bg-gradient-to-l from-[#f9fafb] via-[#f9fafb]/90 to-transparent z-10 pointer-events-none" />

          {/* Marquee Wrapper */}
          <div
            className="overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Desktop View - Continuous Marquee (25-30s per loop) */}
            <motion.div
              className="hidden md:flex gap-6"
              animate={{
                x: isPaused ? undefined : [0, -1150] // (265px card + 24px gap) * 4 cards ≈ 1156px
              }}
              transition={{
                x: {
                  repeat: Infinity,
                  repeatType: "loop",
                  duration: 28, // 28 seconds for slow, elegant scroll
                  ease: "linear"
                }
              }}
            >
              {duplicatedMembers.map((member, index) => (
                <TeamCard key={`${member.id}-${index}`} member={member} />
              ))}
            </motion.div>

            {/* Tablet View - Show 2-3 cards with scroll */}
            <div className="hidden sm:flex md:hidden overflow-x-auto gap-6 pb-4 snap-x snap-mandatory scrollbar-hide px-4 w-full max-w-full">
              {teamMembers.map((member) => (
                <div key={member.id} className="snap-center flex-shrink-0">
                  <TeamCard member={member} />
                </div>
              ))}
            </div>

            {/* Mobile View - Show 1 card at a time */}
            <div className="sm:hidden flex overflow-x-auto gap-4 pb-4 snap-x snap-mandatory scrollbar-hide px-4 w-full max-w-full">
              {teamMembers.map((member) => (
                <div key={member.id} className="snap-center flex-shrink-0">
                  <TeamCard member={member} />
                </div>
              ))}
            </div>
          </div>

          {/* Hover to Pause Indicator */}
          <div className="text-center mt-6 hidden md:block">
            <p className="text-sm text-gray-500 font-inter">
              {isPaused ? '⏸ Paused — Resume on hover out' : '▶ Hover over cards to pause'}
            </p>
          </div>
        </div>

        {/* Team Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {[
            { number: '4', label: 'Team Members' },
            { number: '10+', label: 'Years Experience' },
            { number: '50K+', label: 'Students Taught' },
            { number: '100%', label: 'Dedicated to Success' }
          ].map((stat, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
              className="text-center p-5 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <h3 className="text-3xl md:text-4xl font-bold text-[#22c55e] mb-2 font-poppins">
                {stat.number}
              </h3>
              <p className="text-xs md:text-sm text-gray-600 font-inter">{stat.label}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Custom CSS for smooth animation and utilities */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}} />
    </section>
  );
};

export default TeamSection;
