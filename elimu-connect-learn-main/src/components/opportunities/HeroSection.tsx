import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faPlay, faStar } from '@fortawesome/free-solid-svg-icons';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      minHeight: '700px',
      display: 'flex',
      alignItems: 'center',
      overflow: 'hidden',
      background: '#000'
    }}>
      {/* Background Video */}
      <video
        autoPlay
        muted
        loop
        playsInline
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          zIndex: 0
        }}
      >
        <source src="/videos/opportunities-hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'linear-gradient(135deg, rgba(249, 115, 22, 0.85) 0%, rgba(234, 88, 12, 0.75) 100%)',
        zIndex: 1
      }} />

      {/* Dot Pattern Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '50px 50px',
        opacity: 0.3,
        zIndex: 1
      }} />

      {/* Content */}
      <div className="container" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        padding: '0 20px',
        position: 'relative',
        zIndex: 2,
        textAlign: 'center'
      }}>
        <div style={{
          opacity: isVisible ? 1 : 0,
          transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
          transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '10px 24px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '32px',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            animation: 'fadeInScale 0.8s ease-out'
          }}>
            <FontAwesomeIcon icon={faStar} className="w-4 h-4" />
            Join 10,000+ Tanzanian Youth
          </div>

          {/* Main Headline */}
          <h1 style={{
            fontSize: '72px',
            fontWeight: '900',
            color: 'white',
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
            textShadow: '0 4px 20px rgba(0, 0, 0, 0.3)',
            animation: 'fadeInScale 1s ease-out 0.2s both'
          }}>
            Your Future Starts Here
          </h1>

          {/* Subtitle */}
          <p style={{
            fontSize: '24px',
            color: 'rgba(255, 255, 255, 0.95)',
            maxWidth: '800px',
            margin: '0 auto 48px',
            lineHeight: '1.6',
            animation: 'fadeInScale 1s ease-out 0.4s both'
          }}>
            Transform your career with world-class skills, mentorship, and opportunities designed for Tanzania's digital economy
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeInScale 1s ease-out 0.6s both'
          }}>
            <button
              onClick={() => window.location.href = '/courses'}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 40px',
                background: 'white',
                color: '#F97316',
                border: 'none',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px) scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0) scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
              }}
            >
              Explore Opportunities
              <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
            </button>

            <button
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '12px',
                padding: '18px 40px',
                background: 'rgba(255, 255, 255, 0.15)',
                backdropFilter: 'blur(10px)',
                color: 'white',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                borderRadius: '12px',
                fontSize: '18px',
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
              Watch Stories
            </button>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div style={{
          position: 'absolute',
          bottom: '40px',
          left: '50%',
          transform: 'translateX(-50%)',
          animation: 'bounce 2s infinite'
        }}>
          <div style={{
            width: '30px',
            height: '50px',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '20px',
            position: 'relative'
          }}>
            <div style={{
              width: '6px',
              height: '10px',
              background: 'white',
              borderRadius: '3px',
              position: 'absolute',
              top: '8px',
              left: '50%',
              transform: 'translateX(-50%)',
              animation: 'scrollDown 2s infinite'
            }} />
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInScale {
          from {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }

        @keyframes scrollDown {
          0%, 100% { top: 8px; opacity: 1; }
          50% { top: 20px; opacity: 0; }
        }

        @media (max-width: 768px) {
          h1 { font-size: 42px !important; }
          p { font-size: 18px !important; }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
