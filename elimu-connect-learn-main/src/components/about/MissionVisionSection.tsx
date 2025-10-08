import React, { useEffect, useRef, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBullseye, faLightbulb } from '@fortawesome/free-solid-svg-icons';

const MissionVisionSection: React.FC = () => {
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

  return (
    <section
      id="mission"
      ref={sectionRef}
      style={{
        padding: '120px 20px',
        background: 'linear-gradient(180deg, #F9FAFB 0%, #FFFFFF 100%)',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <div className="container" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '80px',
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s ease'
        }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '900',
            color: '#111827',
            marginBottom: '16px'
          }}>
            Our Purpose & Direction
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#6B7280',
            maxWidth: '700px',
            margin: '0 auto'
          }}>
            Driving educational transformation across Tanzania
          </p>
        </div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '48px'
        }}>
          {/* Mission Card */}
          <div
            style={{
              padding: '48px',
              background: 'white',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: '1px solid #E5E7EB',
              transition: 'all 0.4s ease',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '0.1s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(59, 130, 246, 0.15)';
              e.currentTarget.style.borderColor = '#3B82F6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.borderColor = '#E5E7EB';
            }}
          >
            <div style={{
              width: '72px',
              height: '72px',
              background: '#3B82F615',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <FontAwesomeIcon icon={faBullseye} style={{ width: '36px', height: '36px', color: '#3B82F6' }} />
            </div>

            <h3 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '16px'
            }}>
              Our Mission
            </h3>

            <p style={{
              fontSize: '17px',
              color: '#6B7280',
              lineHeight: '1.8'
            }}>
              To democratize quality education across Tanzania by providing accessible, affordable, and industry-relevant learning experiences that empower youth to build successful careers in the digital economy.
            </p>
          </div>

          {/* Vision Card */}
          <div
            style={{
              padding: '48px',
              background: 'white',
              borderRadius: '24px',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08)',
              border: '1px solid #E5E7EB',
              transition: 'all 0.4s ease',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
              transitionDelay: '0.2s'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.boxShadow = '0 20px 60px rgba(139, 92, 246, 0.15)';
              e.currentTarget.style.borderColor = '#8B5CF6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 8px 32px rgba(0, 0, 0, 0.08)';
              e.currentTarget.style.borderColor = '#E5E7EB';
            }}
          >
            <div style={{
              width: '72px',
              height: '72px',
              background: '#8B5CF615',
              borderRadius: '18px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: '24px'
            }}>
              <FontAwesomeIcon icon={faLightbulb} style={{ width: '36px', height: '36px', color: '#8B5CF6' }} />
            </div>

            <h3 style={{
              fontSize: '28px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '16px'
            }}>
              Our Vision
            </h3>

            <p style={{
              fontSize: '17px',
              color: '#6B7280',
              lineHeight: '1.8'
            }}>
              To become Africa's leading digital learning platform, recognized for transforming lives through education and creating a generation of skilled, confident, and globally competitive professionals.
            </p>
          </div>
        </div>
      </div>

      <style jsx>{`
        @media (max-width: 768px) {
          .container > div:last-child {
            grid-template-columns: 1fr !important;
          }

          h2 {
            font-size: 36px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default MissionVisionSection;
