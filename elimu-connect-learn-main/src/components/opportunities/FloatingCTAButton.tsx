import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const FloatingCTAButton: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
      setIsVisible(scrollPercentage > 30);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!isVisible) return null;

  return (
    <button
      onClick={() => window.location.href = '/courses'}
      style={{
        position: 'fixed',
        bottom: '32px',
        right: '32px',
        zIndex: 1000,
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        padding: '16px 28px',
        background: '#F97316',
        color: 'white',
        border: 'none',
        borderRadius: '50px',
        fontSize: '16px',
        fontWeight: '700',
        cursor: 'pointer',
        boxShadow: '0 8px 24px rgba(249, 115, 22, 0.4)',
        transition: 'all 0.3s ease',
        animation: 'slideInRight 0.5s ease-out'
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
      Enroll Now
      <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />

      <style jsx>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(100px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        @media (max-width: 768px) {
          button {
            bottom: 16px !important;
            right: 16px !important;
            font-size: 14px !important;
            padding: 14px 24px !important;
          }
        }
      `}</style>
    </button>
  );
};

export default FloatingCTAButton;
