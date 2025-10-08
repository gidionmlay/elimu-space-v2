import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faUsers } from '@fortawesome/free-solid-svg-icons';

const FinalCTA: React.FC = () => {
  return (
    <section style={{
      padding: '100px 20px',
      background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Background Pattern */}
      <div style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 1px, transparent 1px)',
        backgroundSize: '30px 30px',
        opacity: 0.4
      }} />

      {/* Animated Circles */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: '50%',
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-150px',
        left: '-150px',
        width: '500px',
        height: '500px',
        background: 'rgba(255, 255, 255, 0.05)',
        borderRadius: '50%',
        animation: 'float 8s ease-in-out infinite reverse'
      }} />

      <div className="container" style={{
        maxWidth: '1280px',
        margin: '0 auto',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{
          textAlign: 'center',
          maxWidth: '800px',
          margin: '0 auto'
        }}>
          {/* Badge */}
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '8px 20px',
            background: 'rgba(255, 255, 255, 0.2)',
            backdropFilter: 'blur(10px)',
            borderRadius: '24px',
            color: 'white',
            fontSize: '14px',
            fontWeight: '600',
            marginBottom: '24px',
            border: '1px solid rgba(255, 255, 255, 0.3)'
          }}>
            <FontAwesomeIcon icon={faUsers} className="w-4 h-4" />
            Join the Movement
          </div>

          {/* Main Heading */}
          <h2 style={{
            fontSize: '56px',
            fontWeight: '900',
            color: 'white',
            lineHeight: '1.2',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
            animation: 'fadeInUp 0.8s ease-out'
          }}>
            Ready to Transform Your Future?
          </h2>

          {/* Subtitle */}
          <p style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.95)',
            lineHeight: '1.6',
            marginBottom: '48px',
            animation: 'fadeInUp 0.8s ease-out 0.2s both'
          }}>
            Join thousands of Tanzanian youth who are building successful careers with Elimu Space. Your journey starts with a single click.
          </p>

          {/* CTA Buttons */}
          <div style={{
            display: 'flex',
            gap: '16px',
            justifyContent: 'center',
            flexWrap: 'wrap',
            animation: 'fadeInUp 0.8s ease-out 0.4s both'
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
                e.currentTarget.style.transform = 'scale(1.05)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.2)';
              }}
            >
              Browse Courses
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
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = 'rgba(255, 255, 255, 0.15)';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <FontAwesomeIcon icon={faUsers} className="w-5 h-5" />
              Join Our Community
            </button>
          </div>

          {/* Stats */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '32px',
            marginTop: '80px',
            animation: 'fadeInUp 0.8s ease-out 0.6s both'
          }}>
            <div>
              <div style={{
                fontSize: '48px',
                fontWeight: '900',
                color: 'white',
                marginBottom: '8px'
              }}>
                10,000+
              </div>
              <div style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                Active Learners
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '48px',
                fontWeight: '900',
                color: 'white',
                marginBottom: '8px'
              }}>
                500+
              </div>
              <div style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                Courses Available
              </div>
            </div>
            <div>
              <div style={{
                fontSize: '48px',
                fontWeight: '900',
                color: 'white',
                marginBottom: '8px'
              }}>
              95%
              </div>
              <div style={{
                fontSize: '16px',
                color: 'rgba(255, 255, 255, 0.9)'
              }}>
                Success Rate
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(5deg);
          }
        }

        @media (max-width: 768px) {
          h2 { font-size: 36px !important; }
          p { font-size: 16px !important; }
        }
      `}</style>
    </section>
  );
};

export default FinalCTA;
