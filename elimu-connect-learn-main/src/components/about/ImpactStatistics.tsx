import React, { useEffect, useRef, useState } from 'react';

const ImpactStatistics: React.FC = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState({ students: 0, courses: 0, success: 0, partners: 0 });

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible) {
          setIsVisible(true);
          animateCounters();
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const animateCounters = () => {
    const duration = 2000;
    const targets = { students: 10000, courses: 500, success: 95, partners: 50 };
    const start = Date.now();

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - start) / duration, 1);

      setCounts({
        students: Math.floor(targets.students * progress),
        courses: Math.floor(targets.courses * progress),
        success: Math.floor(targets.success * progress),
        partners: Math.floor(targets.partners * progress)
      });

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    animate();
  };

  const stats = [
    { label: 'Active Students', value: `${counts.students.toLocaleString()}+`, color: '#F97316' },
    { label: 'Courses Offered', value: `${counts.courses}+`, color: '#3B82F6' },
    { label: 'Success Rate', value: `${counts.success}%`, color: '#10B981' },
    { label: 'Partner Organizations', value: `${counts.partners}+`, color: '#8B5CF6' }
  ];

  return (
    <section id="impact" ref={sectionRef} style={{
      padding: '100px 20px',
      background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
      position: 'relative'
    }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{ fontSize: '48px', fontWeight: '900', color: 'white', marginBottom: '16px' }}>
            Our Impact in Numbers
          </h2>
          <p style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)' }}>
            Real results that matter
          </p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '48px' }}>
          {stats.map((stat, idx) => (
            <div key={idx} style={{ textAlign: 'center' }}>
              <div style={{
                fontSize: '56px',
                fontWeight: '900',
                color: 'white',
                marginBottom: '12px',
                animation: 'fadeInUp 0.6s ease-out'
              }}>
                {stat.value}
              </div>
              <div style={{ fontSize: '18px', color: 'rgba(255,255,255,0.9)', fontWeight: '600' }}>
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ImpactStatistics;
