import React from 'react';

interface Partner {
  id: string;
  name: string;
  logo: string;
}

const PartnerSection: React.FC = () => {

  const partners: Partner[] = [
    { id: '1', name: 'Tanzania Commission for Universities', logo: '/partners/tcu.png' },
    { id: '2', name: 'Ministry of Education', logo: '/partners/moe.png' },
    { id: '3', name: 'COSTECH', logo: '/partners/costech.png' },
    { id: '4', name: 'VETA', logo: '/partners/veta.png' },
    { id: '5', name: 'Vodacom Tanzania', logo: '/partners/vodacom.png' },
    { id: '6', name: 'CRDB Bank', logo: '/partners/crdb.png' },
    { id: '7', name: 'Airtel Tanzania', logo: '/partners/airtel.png' },
    { id: '8', name: 'Tigo Tanzania', logo: '/partners/tigo.png' },
    { id: '9', name: 'NMB Bank', logo: '/partners/nmb.png' },
    { id: '10', name: 'Twiga Cement', logo: '/partners/twiga.png' }
  ];

  // Duplicate partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section
      className="partner-section"
      style={{
        padding: '80px 20px',
        background: '#FFFFFF',
        borderTop: '1px solid #F3F4F6',
        borderBottom: '1px solid #F3F4F6',
        overflow: 'hidden'
      }}
    >
      <div
        className="container"
        style={{
          maxWidth: '1280px',
          margin: '0 auto'
        }}
      >
        {/* Section Header */}
        <div
          className="section-header"
          style={{
            textAlign: 'center',
            marginBottom: '48px'
          }}
        >
          <h2
            style={{
              fontSize: '42px',
              fontWeight: '800',
              lineHeight: '1.2',
              color: '#111827',
              marginBottom: '12px',
              letterSpacing: '-0.02em'
            }}
          >
            Our Trusted Partners
          </h2>
          <p
            style={{
              fontSize: '18px',
              color: '#6B7280',
              fontWeight: '400',
              lineHeight: '1.6'
            }}
          >
            Working together to empower Tanzanian youth with quality education
          </p>
        </div>

        {/* Infinite Scrolling Container */}
        <div
          className="scroll-container"
          style={{
            position: 'relative',
            width: '100%',
            overflow: 'hidden',
            maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
            WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
          }}
        >
          <div
            className="scroll-content"
            style={{
              display: 'flex',
              gap: '60px',
              alignItems: 'center',
              animation: 'scroll 40s linear infinite',
              willChange: 'transform'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.animationPlayState = 'paused';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.animationPlayState = 'running';
            }}
          >
            {duplicatedPartners.map((partner, index) => (
              <div
                key={`${partner.id}-${index}`}
                className="partner-logo-wrapper"
                style={{
                  flex: '0 0 auto',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '20px',
                  transition: 'all 0.3s ease'
                }}
              >
                <img
                  src={partner.logo}
                  alt={`${partner.name} logo`}
                  style={{
                    height: '60px',
                    width: 'auto',
                    maxWidth: '180px',
                    objectFit: 'contain',
                    filter: 'grayscale(100%) opacity(0.6)',
                    transition: 'filter 0.3s ease, transform 0.3s ease',
                    transform: 'translateZ(0)'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.filter = 'grayscale(0%) opacity(1)';
                    e.currentTarget.style.transform = 'scale(1.1) translateZ(0)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.filter = 'grayscale(100%) opacity(0.6)';
                    e.currentTarget.style.transform = 'scale(1) translateZ(0)';
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Optional: Partner Count Badge */}
        <div
          style={{
            textAlign: 'center',
            marginTop: '32px'
          }}
        >
          <span
            style={{
              display: 'inline-block',
              padding: '8px 20px',
              background: '#F3F4F6',
              borderRadius: '20px',
              fontSize: '14px',
              color: '#6B7280',
              fontWeight: '500'
            }}
          >
            Partnering with {partners.length}+ organizations
          </span>
        </div>
      </div>

      {/* CSS Keyframe Animation */}
      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .scroll-content {
          backface-visibility: hidden;
          perspective: 1000px;
        }

        /* Responsive adjustments */
        @media (max-width: 768px) {
          .scroll-content {
            gap: 40px !important;
            animation: scroll 30s linear infinite !important;
          }

          .partner-logo-wrapper img {
            height: 50px !important;
            max-width: 150px !important;
          }

          .section-header h2 {
            font-size: 32px !important;
          }

          .section-header p {
            font-size: 16px !important;
          }
        }

        @media (max-width: 480px) {
          .scroll-content {
            gap: 30px !important;
            animation: scroll 25s linear infinite !important;
          }

          .partner-logo-wrapper img {
            height: 40px !important;
            max-width: 120px !important;
          }
        }

        /* Reduced motion for accessibility */
        @media (prefers-reduced-motion: reduce) {
          .scroll-content {
            animation: none !important;
          }

          .partner-logo-wrapper img {
            filter: grayscale(0%) opacity(1) !important;
          }
        }
      `}</style>
    </section>
  );
};

export default PartnerSection;
