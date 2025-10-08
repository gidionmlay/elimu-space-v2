import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAward, faBriefcase, faSitemap, faTrophy } from '@fortawesome/free-solid-svg-icons';
import { IconDefinition } from '@fortawesome/fontawesome-svg-core';

interface Opportunity {
  icon: IconDefinition;
  title: string;
  description: string;
  color: string;
}

const OpportunitiesTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const opportunities: Opportunity[] = [
    {
      icon: faAward,
      title: 'Get Certified & Recognized',
      description: 'Earn internationally recognized certificates that boost your credibility with employers worldwide',
      color: '#F59E0B'
    },
    {
      icon: faBriefcase,
      title: 'Access Internships & Mentorship',
      description: 'Connect with industry professionals and gain real-world experience through our internship programs',
      color: '#3B82F6'
    },
    {
      icon: faSitemap,
      title: 'Join a Thriving Community',
      description: 'Network with thousands of learners, alumni, and employers in Tanzania\'s fastest-growing tech ecosystem',
      color: '#8B5CF6'
    },
    {
      icon: faTrophy,
      title: 'Launch Your Career',
      description: 'Get hired by top companies or start your own business with skills that matter in today\'s job market',
      color: '#10B981'
    }
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 20px',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)',
        position: 'relative'
      }}
    >
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease'
        }}>
          <h2 style={{
            fontSize: '52px',
            fontWeight: '900',
            color: '#111827',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            Opportunities You Unlock
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#6B7280',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Real-world benefits that open doors to your dream career
          </p>
        </div>

        {/* Timeline */}
        <div style={{ position: 'relative' }}>
          {/* Vertical Line */}
          <div
            className="timeline-line"
            style={{
              position: 'absolute',
              left: '50%',
              top: 0,
              bottom: 0,
              width: '3px',
              background: 'linear-gradient(180deg, #F97316 0%, #EA580C 100%)',
              transform: 'translateX(-50%)'
            }}
          />

          {/* Timeline Items */}
          {opportunities.map((item, index) => {
            const isLeft = index % 2 === 0;

            return (
              <div
                key={index}
                style={{
                  display: 'grid',
                  gridTemplateColumns: isLeft ? '1fr auto 1fr' : '1fr auto 1fr',
                  gap: '32px',
                  marginBottom: index < opportunities.length - 1 ? '80px' : '0',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  transition: `all 0.8s ease ${index * 0.15}s`
                }}
              >
                {/* Left Content */}
                <div style={{ textAlign: isLeft ? 'right' : 'left', order: isLeft ? 1 : 3 }}>
                  {isLeft && (
                    <div
                      style={{
                        padding: '32px',
                        background: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(-8px)';
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
                        e.currentTarget.style.borderColor = item.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                        e.currentTarget.style.borderColor = '#E5E7EB';
                      }}
                    >
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: '12px'
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        color: '#6B7280',
                        lineHeight: '1.7'
                      }}>
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>

                {/* Center Icon */}
                <div style={{
                  width: '72px',
                  height: '72px',
                  background: `${item.color}15`,
                  border: `3px solid ${item.color}`,
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  position: 'relative',
                  zIndex: 1,
                  flexShrink: 0,
                  order: 2
                }}>
                  <FontAwesomeIcon icon={item.icon} style={{ width: '32px', height: '32px', color: item.color }} />
                </div>

                {/* Right Content */}
                <div style={{ textAlign: isLeft ? 'left' : 'right', order: isLeft ? 3 : 1 }}>
                  {!isLeft && (
                    <div
                      style={{
                        padding: '32px',
                        background: '#FFFFFF',
                        border: '1px solid #E5E7EB',
                        borderRadius: '16px',
                        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                        transition: 'all 0.3s ease'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateX(8px)';
                        e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
                        e.currentTarget.style.borderColor = item.color;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateX(0)';
                        e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
                        e.currentTarget.style.borderColor = '#E5E7EB';
                      }}
                    >
                      <h3 style={{
                        fontSize: '24px',
                        fontWeight: '700',
                        color: '#111827',
                        marginBottom: '12px'
                      }}>
                        {item.title}
                      </h3>
                      <p style={{
                        fontSize: '16px',
                        color: '#6B7280',
                        lineHeight: '1.7'
                      }}>
                        {item.description}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          h2 { font-size: 36px !important; }
          .timeline-line { display: none !important; }
          .container > div > div {
            grid-template-columns: auto 1fr !important;
            gap: 16px !important;
          }
          .container > div > div > div {
            text-align: left !important;
            order: 3 !important;
          }
          .container > div > div > div:nth-child(2) {
            order: 1 !important;
          }
        }
      `}</style>
    </section>
  );
};

export default OpportunitiesTimeline;
