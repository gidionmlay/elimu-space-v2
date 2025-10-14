import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight, faRocket } from '@fortawesome/free-solid-svg-icons';

const HeroSection: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="hero-section">
      {/* Soft Gradient Background */}
      <div className="hero-background" />
      
      {/* Content Container */}
      <div className="hero-container">
        {/* Left Side - Text Content */}
        <div 
          className="hero-content"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(-30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
          }}
        >
          {/* Main Headline */}
          <h1 className="hero-headline">
            Unlock Your Future: Access the Best Career-Defining Opportunities.
          </h1>

          {/* Supporting Description */}
          <p className="hero-description">
            Gain real-world skills and personalized mentorship through our platform, 
            designed to ensure your career growth and job readiness.
          </p>

          {/* CTA Buttons */}
          <div className="hero-cta-group">
            <button
              className="hero-btn hero-btn-primary"
              onClick={() => window.location.href = '/courses'}
              aria-label="Explore Training Programs"
            >
              Explore Training Programs
              <FontAwesomeIcon icon={faArrowRight} className="hero-btn-icon" />
            </button>

            <button
              className="hero-btn hero-btn-secondary"
              onClick={() => window.location.href = '/register'}
              aria-label="Start Your Journey"
            >
              <FontAwesomeIcon icon={faRocket} className="hero-btn-icon" />
              Start Your Journey
            </button>
          </div>
        </div>

        {/* Right Side - Animated Visual */}
        <div 
          className="hero-visual"
          style={{
            opacity: isVisible ? 1 : 0,
            transform: isVisible ? 'translateX(0)' : 'translateX(30px)',
            transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1) 0.2s'
          }}
        >
          <div className="circle-container">
            {/* Outer Dashed Circle */}
            <div className="circle-outer">
              {/* "Anytime" Text - Left */}
              <span className="circle-text circle-text-anytime">
                Anytime
              </span>
              
              {/* "Anywhere" Text - Top Right */}
              <span className="circle-text circle-text-anywhere">
                Anywhere
              </span>
            </div>

            {/* Inner Solid Circle */}
            <div className="circle-inner">
              <div className="circle-center-icon">
                <svg 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2"
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .hero-section {
          position: relative;
          min-height: 100vh;
          display: flex;
          align-items: center;
          padding: 120px 20px 80px;
          overflow: hidden;
        }

        .hero-background {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            135deg,
            #f0fdf4 0%,
            #dcfce7 25%,
            #ffffff 50%,
            #f0fdf4 75%,
            #e8f5e9 100%
          );
          z-index: 0;
        }

        .hero-background::before {
          content: '';
          position: absolute;
          inset: 0;
          background-image: 
            radial-gradient(circle at 20% 30%, rgba(30, 142, 90, 0.08) 0%, transparent 50%),
            radial-gradient(circle at 80% 70%, rgba(30, 142, 90, 0.06) 0%, transparent 50%);
        }

        .hero-container {
          max-width: 1280px;
          margin: 0 auto;
          width: 100%;
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 60px;
          align-items: center;
          position: relative;
          z-index: 1;
        }

        .hero-content {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .hero-headline {
          font-size: 56px;
          font-weight: 800;
          line-height: 1.15;
          color: #0c3b2e;
          letter-spacing: -0.02em;
          margin: 0;
        }

        .hero-description {
          font-size: 20px;
          line-height: 1.7;
          color: #35594d;
          margin: 0;
          max-width: 540px;
        }

        .hero-cta-group {
          display: flex;
          gap: 16px;
          margin-top: 16px;
          flex-wrap: wrap;
        }

        .hero-btn {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 16px 32px;
          font-size: 16px;
          font-weight: 600;
          border-radius: 12px;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
          border: none;
          outline: none;
          position: relative;
        }

        .hero-btn:focus-visible {
          outline: 3px solid #1e8e5a;
          outline-offset: 2px;
        }

        .hero-btn-primary {
          background: #1e8e5a;
          color: white;
          box-shadow: 0 4px 14px rgba(30, 142, 90, 0.25);
        }

        .hero-btn-primary:hover {
          background: #16754a;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(30, 142, 90, 0.35);
        }

        .hero-btn-primary:active {
          transform: translateY(0);
        }

        .hero-btn-secondary {
          background: transparent;
          color: #1e8e5a;
          border: 2px solid #1e8e5a;
        }

        .hero-btn-secondary:hover {
          background: #1e8e5a;
          color: white;
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(30, 142, 90, 0.25);
        }

        .hero-btn-secondary:active {
          transform: translateY(0);
        }

        .hero-btn-icon {
          width: 18px;
          height: 18px;
          transition: transform 0.3s ease;
        }

        .hero-btn-primary:hover .hero-btn-icon {
          transform: translateX(4px);
        }

        .hero-btn-secondary:hover .hero-btn-icon {
          transform: rotate(12deg) scale(1.1);
        }

        .hero-visual {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .circle-container {
          position: relative;
          width: 400px;
          height: 400px;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .circle-outer {
          position: absolute;
          width: 100%;
          height: 100%;
          border: 3px dashed #1e8e5a;
          border-radius: 50%;
          animation: rotateCircle 7s linear infinite;
          will-change: transform;
        }

        .circle-outer:hover {
          animation-play-state: paused;
        }

        .circle-inner {
          position: relative;
          width: 280px;
          height: 280px;
          background: linear-gradient(135deg, #1e8e5a 0%, #16754a 100%);
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          box-shadow: 0 20px 60px rgba(30, 142, 90, 0.25);
          z-index: 2;
        }

        .circle-center-icon {
          width: 100px;
          height: 100px;
          color: white;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .circle-center-icon svg {
          width: 100%;
          height: 100%;
          filter: drop-shadow(0 4px 12px rgba(0, 0, 0, 0.1));
        }

        .circle-text {
          position: absolute;
          font-size: 24px;
          font-weight: 700;
          color: #1e8e5a;
          letter-spacing: 0.02em;
          text-transform: uppercase;
          white-space: nowrap;
          text-shadow: 0 2px 8px rgba(255, 255, 255, 0.8);
        }

        .circle-text-anytime {
          left: -80px;
          top: 50%;
          transform: translateY(-50%);
        }

        .circle-text-anywhere {
          right: -90px;
          top: 20%;
          transform: translateY(-50%);
        }

        @keyframes rotateCircle {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }

        /* Responsive Design */
        @media (max-width: 1024px) {
          .hero-container {
            grid-template-columns: 1fr;
            gap: 80px;
            text-align: center;
          }

          .hero-content {
            align-items: center;
          }

          .hero-headline {
            font-size: 48px;
          }

          .hero-description {
            font-size: 18px;
          }

          .hero-cta-group {
            justify-content: center;
          }

          .circle-container {
            width: 350px;
            height: 350px;
          }

          .circle-inner {
            width: 240px;
            height: 240px;
          }

          .circle-center-icon {
            width: 80px;
            height: 80px;
          }

          .circle-text {
            font-size: 20px;
          }

          .circle-text-anytime {
            left: -70px;
          }

          .circle-text-anywhere {
            right: -75px;
          }
        }

        @media (max-width: 768px) {
          .hero-section {
            padding: 100px 16px 60px;
          }

          .hero-headline {
            font-size: 36px;
          }

          .hero-description {
            font-size: 16px;
          }

          .hero-btn {
            padding: 14px 28px;
            font-size: 15px;
          }

          .circle-container {
            width: 300px;
            height: 300px;
          }

          .circle-inner {
            width: 200px;
            height: 200px;
          }

          .circle-center-icon {
            width: 60px;
            height: 60px;
          }

          .circle-text {
            font-size: 18px;
          }

          .circle-text-anytime {
            left: -60px;
          }

          .circle-text-anywhere {
            right: -65px;
          }
        }

        @media (max-width: 480px) {
          .hero-headline {
            font-size: 28px;
          }

          .hero-description {
            font-size: 15px;
          }

          .hero-cta-group {
            flex-direction: column;
            width: 100%;
          }

          .hero-btn {
            width: 100%;
            justify-content: center;
          }

          .circle-container {
            width: 260px;
            height: 260px;
          }

          .circle-inner {
            width: 180px;
            height: 180px;
          }

          .circle-text {
            font-size: 16px;
          }

          .circle-text-anytime {
            left: -50px;
          }

          .circle-text-anywhere {
            right: -55px;
          }
        }
      `}</style>
    </section>
  );
};

export default HeroSection;
