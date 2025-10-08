import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPaperPlane, faCheckCircle } from '@fortawesome/free-solid-svg-icons';

const RequestCourseCTA: React.FC = () => {
  return (
    <section style={{
      background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
      padding: '80px 20px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      {/* Decorative Elements */}
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-80px',
        left: '-80px',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(255, 255, 255, 0.08) 0%, transparent 70%)',
        borderRadius: '50%'
      }} />

      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '48px',
          alignItems: 'center'
        }}>
          {/* Left Side - Content */}
          <div>
            <h2 style={{
              fontSize: '42px',
              fontWeight: '900',
              color: 'white',
              marginBottom: '16px',
              lineHeight: '1.2',
              letterSpacing: '-0.01em'
            }}>
              Can't Find Your Course?
            </h2>
            <p style={{
              fontSize: '18px',
              color: 'rgba(255, 255, 255, 0.9)',
              marginBottom: '32px',
              lineHeight: '1.6'
            }}>
              We're always expanding our course catalog. Tell us what you'd like to learn and we'll do our best to create it for you.
            </p>

            {/* Features List */}
            <div style={{ marginBottom: '32px' }}>
              {[
                'Courses tailored to Tanzanian market needs',
                'Expert instructors with real-world experience',
                'Certificate upon completion',
                'Lifetime access to course materials'
              ].map((feature, index) => (
                <div
                  key={index}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    marginBottom: '12px',
                    color: 'white',
                    fontSize: '15px'
                  }}
                >
                  <FontAwesomeIcon icon={faCheckCircle} style={{ width: '20px', height: '20px', flexShrink: 0 }} />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Side - Form */}
          <div style={{
            background: 'white',
            borderRadius: '16px',
            padding: '40px',
            boxShadow: '0 20px 40px rgba(0, 0, 0, 0.2)'
          }}>
            <h3 style={{
              fontSize: '24px',
              fontWeight: '700',
              color: '#111827',
              marginBottom: '24px'
            }}>
              Request a Course
            </h3>

            <form style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Your Name *
                </label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#F97316'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Email Address *
                </label>
                <input
                  type="email"
                  placeholder="your.email@example.com"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#F97316'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Course Topic *
                </label>
                <input
                  type="text"
                  placeholder="e.g., Mobile App Development, Data Science"
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    transition: 'border-color 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#F97316'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                />
              </div>

              <div>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#374151',
                  marginBottom: '8px'
                }}>
                  Additional Details
                </label>
                <textarea
                  placeholder="Tell us more about what you'd like to learn..."
                  rows={4}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '2px solid #E5E7EB',
                    borderRadius: '8px',
                    fontSize: '15px',
                    outline: 'none',
                    resize: 'vertical',
                    transition: 'border-color 0.3s ease',
                    fontFamily: 'inherit'
                  }}
                  onFocus={(e) => e.currentTarget.style.borderColor = '#F97316'}
                  onBlur={(e) => e.currentTarget.style.borderColor = '#E5E7EB'}
                />
              </div>

              <button
                type="submit"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '10px',
                  width: '100%',
                  padding: '16px',
                  background: '#F97316',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  fontSize: '16px',
                  fontWeight: '700',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  boxShadow: '0 4px 12px rgba(249, 115, 22, 0.3)'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = '#EA580C';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 6px 16px rgba(249, 115, 22, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = '#F97316';
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.3)';
                }}
              >
                <FontAwesomeIcon icon={faPaperPlane} style={{ width: '18px', height: '18px' }} />
                Submit Request
              </button>
            </form>

            <p style={{
              marginTop: '16px',
              fontSize: '13px',
              color: '#6B7280',
              textAlign: 'center'
            }}>
              We typically respond within 24-48 hours
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RequestCourseCTA;
