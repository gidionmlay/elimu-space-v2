import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faQuoteLeft } from '@fortawesome/free-solid-svg-icons';

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  rating: number;
  quote: string;
}

const TestimonialsMarquee: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: '1',
      name: 'Amina Hassan',
      role: 'Web Developer',
      location: 'Dar es Salaam',
      rating: 5,
      quote: 'Elimu Space changed my life. I went from zero coding knowledge to landing my first developer job in 6 months!'
    },
    {
      id: '2',
      name: 'John Mwakasege',
      role: 'Data Analyst',
      location: 'Arusha',
      rating: 5,
      quote: 'The mentorship program connected me with industry experts. Now I work at one of Tanzania\'s top tech companies!'
    },
    {
      id: '3',
      name: 'Grace Kimaro',
      role: 'UI/UX Designer',
      location: 'Mwanza',
      rating: 5,
      quote: 'The courses are practical and relevant. I built a portfolio that impressed employers and got hired immediately!'
    },
    {
      id: '4',
      name: 'Daniel Moshi',
      role: 'Digital Marketer',
      location: 'Dodoma',
      rating: 5,
      quote: 'Elimu Space gave me the skills and confidence to start my own digital marketing agency. Forever grateful!'
    },
    {
      id: '5',
      name: 'Rehema Juma',
      role: 'Software Engineer',
      location: 'Dar es Salaam',
      rating: 5,
      quote: 'World-class education at affordable prices. The AI-powered learning adapted to my schedule perfectly!'
    },
    {
      id: '6',
      name: 'Michael Kayombo',
      role: 'Full Stack Developer',
      location: 'Mbeya',
      rating: 5,
      quote: 'The hands-on projects prepared me for real-world challenges. I landed a remote job with a US company!'
    }
  ];

  const duplicated = [...testimonials, ...testimonials];

  return (
    <section style={{
      padding: '100px 0',
      background: '#FFFFFF',
      overflow: 'hidden'
    }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '900',
            color: '#111827',
            marginBottom: '16px'
          }}>
            What Our Learners Say
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#6B7280'
          }}>
            Real stories from real students who transformed their futures
          </p>
        </div>
      </div>

      {/* Marquee Container */}
      <div style={{
        position: 'relative',
        width: '100%',
        maskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)',
        WebkitMaskImage: 'linear-gradient(to right, transparent, black 10%, black 90%, transparent)'
      }}>
        <div
          style={{
            display: 'flex',
            gap: '32px',
            animation: 'scroll 60s linear infinite'
          }}
          onMouseEnter={(e) => e.currentTarget.style.animationPlayState = 'paused'}
          onMouseLeave={(e) => e.currentTarget.style.animationPlayState = 'running'}
        >
          {duplicated.map((t, i) => (
            <div
              key={`${t.id}-${i}`}
              style={{
                flex: '0 0 auto',
                width: '400px',
                padding: '32px',
                background: '#FFFFFF',
                border: '1px solid #E5E7EB',
                borderRadius: '16px',
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-8px)';
                e.currentTarget.style.boxShadow = '0 12px 32px rgba(0, 0, 0, 0.12)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.08)';
              }}
            >
              <FontAwesomeIcon icon={faQuoteLeft} style={{ width: '32px', height: '32px', color: '#F97316', marginBottom: '20px' }} />
              <p style={{ fontSize: '16px', lineHeight: '1.7', color: '#374151', marginBottom: '24px', fontStyle: 'italic' }}>
                "{t.quote}"
              </p>
              <div style={{ display: 'flex', gap: '4px', marginBottom: '20px' }}>
                {[...Array(t.rating)].map((_, i) => (
                  <FontAwesomeIcon key={i} icon={faStar} style={{ width: '16px', height: '16px', color: '#F59E0B' }} />
                ))}
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  borderRadius: '50%',
                  background: '#F3F4F6',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '18px',
                  fontWeight: '600',
                  color: '#F97316'
                }}>
                  {t.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: '600', color: '#111827' }}>{t.name}</div>
                  <div style={{ fontSize: '14px', color: '#6B7280' }}>{t.role}, {t.location}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
};

export default TestimonialsMarquee;
