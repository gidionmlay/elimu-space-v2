import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faUsers, faStar, faRocket } from '@fortawesome/free-solid-svg-icons';

const CoreValuesSection: React.FC = () => {
  const values = [
    { icon: faHeart, title: 'Excellence', description: 'Commitment to the highest quality in everything we do', color: '#F97316' },
    { icon: faUsers, title: 'Inclusivity', description: 'Education accessible to everyone, regardless of background', color: '#3B82F6' },
    { icon: faStar, title: 'Innovation', description: 'Continuously improving through technology and creativity', color: '#F59E0B' },
    { icon: faRocket, title: 'Impact', description: 'Measuring success by the lives we transform', color: '#10B981' }
  ];

  return (
    <section id="values" style={{ padding: '120px 20px', background: '#FFFFFF' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '80px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '900', color: '#111827', marginBottom: '16px' }}>
            Our Core Values
          </h2>
          <p style={{ fontSize: '18px', color: '#6B7280' }}>
            The principles that guide everything we do
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '32px' }}>
          {values.map((value, idx) => (
            <div key={idx} style={{
              padding: '40px',
              background: 'white',
              border: '1px solid #E5E7EB',
              borderRadius: '20px',
              textAlign: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-8px)';
              e.currentTarget.style.borderColor = value.color;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.borderColor = '#E5E7EB';
            }}>
              <div style={{
                width: '64px',
                height: '64px',
                background: `${value.color}15`,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 24px'
              }}>
                <FontAwesomeIcon icon={value.icon} style={{ width: '28px', height: '28px', color: value.color }} />
              </div>
              <h3 style={{ fontSize: '22px', fontWeight: '700', color: '#111827', marginBottom: '12px' }}>
                {value.title}
              </h3>
              <p style={{ fontSize: '15px', color: '#6B7280', lineHeight: '1.6' }}>
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoreValuesSection;
