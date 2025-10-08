import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlay } from '@fortawesome/free-solid-svg-icons';

const LearnersInAction: React.FC = () => {
  return (
    <section style={{
      position: 'relative',
      height: '70vh',
      minHeight: '600px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      overflow: 'hidden'
    }}>
      {/* Parallax Video */}
      <div style={{
        position: 'absolute',
        top: '-10%',
        left: 0,
        width: '100%',
        height: '120%',
        zIndex: 0
      }}>
        <video
          autoPlay
          muted
          loop
          playsInline
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover'
          }}
        >
          <source src="/videos/learners-studying.mp4" type="video/mp4" />
        </video>
      </div>

      {/* Dark Overlay */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'rgba(0, 0, 0, 0.6)',
        zIndex: 1
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        textAlign: 'center',
        padding: '0 20px'
      }}>
        <h2 style={{
          fontSize: '56px',
          fontWeight: '900',
          color: 'white',
          marginBottom: '24px',
          textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
          animation: 'fadeIn 1s ease-out'
        }}>
          Meet the Faces of Change
        </h2>
        <p style={{
          fontSize: '20px',
          color: 'rgba(255, 255, 255, 0.9)',
          maxWidth: '600px',
          margin: '0 auto 40px',
          animation: 'fadeIn 1s ease-out 0.2s both'
        }}>
          Real Tanzanian youth transforming their futures with Elimu Space
        </p>

        <button
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '18px 40px',
            background: '#F97316',
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            fontSize: '18px',
            fontWeight: '700',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            boxShadow: '0 8px 24px rgba(249, 115, 22, 0.4)',
            animation: 'fadeIn 1s ease-out 0.4s both'
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = 'scale(1.05)';
            e.currentTarget.style.boxShadow = '0 12px 32px rgba(249, 115, 22, 0.5)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 115, 22, 0.4)';
          }}
        >
          <FontAwesomeIcon icon={faPlay} className="w-6 h-6" />
          Watch Their Stories
        </button>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 768px) {
          h2 { font-size: 36px !important; }
          p { font-size: 16px !important; }
        }
      `}</style>
    </section>
  );
};

export default LearnersInAction;
