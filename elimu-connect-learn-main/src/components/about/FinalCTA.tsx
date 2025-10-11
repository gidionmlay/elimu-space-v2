import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const FinalCTA: React.FC = () => {
  return (
    <section style={{
      padding: '100px 20px',
      background: 'linear-gradient(135deg, #3B82F6 0%, #8B5CF6 100%)',
      textAlign: 'center'
    }}>
      <div className="container" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <h2 style={{
          fontSize: '52px',
          fontWeight: '900',
          color: 'white',
          marginBottom: '24px',
          lineHeight: '1.2'
        }}>
          Ready to Join Our Community?
        </h2>

        <p style={{
          fontSize: '20px',
          color: 'rgba(255, 255, 255, 0.9)',
          marginBottom: '40px',
          lineHeight: '1.7'
        }}>
          Be part of Learner's education revolution. Start learning with Elimu Space today.
        </p>

        <button
          onClick={() => window.location.href = '/courses'}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '12px',
            padding: '18px 40px',
            background: 'white',
            color: '#8B5CF6',
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
          Get Started Now
          <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default FinalCTA;
