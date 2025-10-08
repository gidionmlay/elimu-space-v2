import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGlobe, faBriefcase, faBrain, faUsers } from '@fortawesome/free-solid-svg-icons';

const WhyElimuSpace: React.FC = () => {
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

  const features = [
    {
      icon: faGlobe,
      title: 'Global-Standard Learning',
      description: 'World-class education accessible right here in Tanzania with internationally recognized certifications',
      color: '#3B82F6',
      delay: '0s'
    },
    {
      icon: faBriefcase,
      title: 'Career-Ready Programs',
      description: 'Industry-aligned courses with mentorship from professionals to launch your tech career',
      color: '#F59E0B',
      delay: '0.1s'
    },
    {
      icon: faBrain,
      title: 'AI-Powered Learning',
      description: 'Personalized learning paths powered by AI that adapts to your pace and style',
      color: '#8B5CF6',
      delay: '0.2s'
    },
    {
      icon: faUsers,
      title: 'Strong Partnerships',
      description: 'Direct connections with top companies and organizations for internships and jobs',
      color: '#10B981',
      delay: '0.3s'
    }
  ];

  return (
    <section
      ref={sectionRef}
      style={{
        padding: '120px 20px',
        background: 'linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background Glow */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(249, 115, 22, 0.05) 0%, transparent 50%)',
        pointerEvents: 'none'
      }} />

      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative' }}>
        {/* Header */}
        <div style={{
          textAlign: 'center',
          marginBottom: '80px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          <h2 style={{
            fontSize: '52px',
            fontWeight: '900',
            color: '#111827',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>
            Why Elimu Space Is Your Gateway
          </h2>
          <p style={{
            fontSize: '20px',
            color: '#6B7280',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            We're more than an e-learning platform—we're your partner in building a successful future
          </p>
        </div>

        {/* Glassmorphism Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '32px'
        }}>
          {features.map((feature, index) => (
            <div
              key={index}
              style={{
                padding: '40px',
                background: 'rgba(255, 255, 255, 0.7)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '24px',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                cursor: 'pointer',
                opacity: isVisible ? 1 : 0,
                transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                transitionDelay: feature.delay,
                position: 'relative',
                overflow: 'hidden'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-12px) scale(1.02)';
                e.currentTarget.style.boxShadow = '0 20px 60px rgba(0, 0, 0, 0.15)';
                e.currentTarget.style.borderColor = feature.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
                e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)';
              }}
            >
              {/* Glow Effect */}
              <div style={{
                position: 'absolute',
                top: '-50px',
                right: '-50px',
                width: '200px',
                height: '200px',
                background: `radial-gradient(circle, ${feature.color}20 0%, transparent 70%)`,
                borderRadius: '50%',
                pointerEvents: 'none'
              }} />

              {/* Icon */}
              <div style={{
                width: '64px',
                height: '64px',
                background: `${feature.color}15`,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: '24px',
                position: 'relative'
              }}>
                <FontAwesomeIcon icon={feature.icon} style={{ width: '32px', height: '32px', color: feature.color }} />
              </div>

              {/* Content */}
              <h3 style={{
                fontSize: '24px',
                fontWeight: '700',
                color: '#111827',
                marginBottom: '12px',
                lineHeight: '1.3'
              }}>
                {feature.title}
              </h3>
              <p style={{
                fontSize: '16px',
                color: '#6B7280',
                lineHeight: '1.7'
              }}>
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          h2 { font-size: 36px !important; }
          .container > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  );
};

export default WhyElimuSpace;
