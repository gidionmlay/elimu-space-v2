import React, { useState, useEffect } from 'react';

const StickyNavigation: React.FC = () => {
  const [activeSection, setActiveSection] = useState('hero');

  const sections = [
    { id: 'hero', label: 'About' },
    { id: 'mission', label: 'Mission' },
    { id: 'journey', label: 'Journey' },
    { id: 'values', label: 'Values' },
    { id: 'team', label: 'Team' },
    { id: 'impact', label: 'Impact' }
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;

      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 100,
        behavior: 'smooth'
      });
    }
  };

  return (
    <nav style={{
      position: 'sticky',
      top: '0px',
      zIndex: 100,
      background: 'rgba(245, 245, 245, 0.95)',
      backdropFilter: 'blur(10px)',
      borderBottom: '1px solid #E5E7EB',
      padding: '16px 0',
      boxShadow: '0 2px 8px rgba(13, 59, 102, 0.1)'
    }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 20px' }}>
        <div style={{
          display: 'flex',
          gap: '32px',
          justifyContent: 'center',
          overflowX: 'auto'
        }}>
          {sections.map(section => (
            <button
              key={section.id}
              onClick={() => scrollToSection(section.id)}
              style={{
                padding: '8px 16px',
                background: activeSection === section.id ? '#0D3B66' : 'transparent',
                color: activeSection === section.id ? 'white' : '#0D3B66',
                border: 'none',
                borderRadius: '8px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeSection !== section.id) {
                  e.currentTarget.style.background = 'rgba(13, 59, 102, 0.1)';
                  e.currentTarget.style.color = '#0A2A4A';
                }
              }}
              onMouseLeave={(e) => {
                if (activeSection !== section.id) {
                  e.currentTarget.style.background = 'transparent';
                  e.currentTarget.style.color = '#0D3B66';
                }
              }}
            >
              {section.label}
            </button>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default StickyNavigation;
