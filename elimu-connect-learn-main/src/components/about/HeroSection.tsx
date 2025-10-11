import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlay } from '@fortawesome/free-solid-svg-icons';

const HeroSection: React.FC = () => {
  return (
    <section id="hero" style={{
      padding: '120px 20px 80px',
      background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '40px 40px',
        opacity: 0.3
      }} />

      <div className="container" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '80px',
          alignItems: 'center'
        }}>
          {/* Left Side - Content */}
          <div style={{
            animation: 'fadeInLeft 1s ease-out'
          }}>
            <div style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              borderRadius: '24px',
              color: 'white',
              fontSize: '14px',
              fontWeight: '600',
              marginBottom: '24px'
            }}>
              About Elimu Space
            </div>

            <h1 style={{
              fontSize: '64px',
              fontWeight: '900',
              color: 'white',
              lineHeight: '1.1',
              marginBottom: '24px',
              letterSpacing: '-0.02em'
            }}>
              Who We Are
            </h1>

            <p style={{
              fontSize: '20px',
              color: 'rgba(255, 255, 255, 0.9)',
              lineHeight: '1.7',
              marginBottom: '40px'
            }}>
              Empowering learners across Africa to innovate and grow through accessible, world-class digital education designed for Africa's future.
            </p>

            <div style={{
              display: 'flex',
              gap: '16px',
              flexWrap: 'wrap'
            }}>
              <button
                onClick={() => window.location.href = '/courses'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 32px',
                  background: 'white',
                  color: '#8B5CF6',
                  border: 'none',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.3)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
                }}
              >
                Explore Our Courses
                <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
              </button>

              <button
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 32px',
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(10px)',
                  color: 'white',
                  border: '2px solid rgba(255, 255, 255, 0.3)',
                  borderRadius: '12px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.25)';
                  e.currentTarget.style.transform = 'translateY(-4px)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                <FontAwesomeIcon icon={faPlay} className="w-5 h-5" />
                Watch Our Story
              </button>
            </div>
          </div>

          {/* Right Side - Video */}
          <div style={{
            position: 'relative',
            borderRadius: '20px',
            overflow: 'hidden',
            boxShadow: '0 20px 60px rgba(0, 0, 0, 0.3)',
            animation: 'fadeInRight 1s ease-out'
          }}>
            <video
              autoPlay
              muted
              loop
              playsInline
              style={{
                width: '100%',
                height: 'auto',
                display: 'block'
              }}
            >
              <source src="/videos/about-hero.mp4" type="video/mp4" />
            </video>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInLeft {
          from {
            opacity: 0;
            transform: translateX(-40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @keyframes fadeInRight {
          from {
            opacity: 0;
            transform: translateX(40px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 1024px) {
          .container > div {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }

          h1 {
            font-size: 48px !important;
          }

          p {
            font-size: 18px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
