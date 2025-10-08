import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBook, faLaptop, faBriefcase, faPalette, faRocket, faSeedling, faMoneyBillWave, faHeart } from '@fortawesome/free-solid-svg-icons';

const CategoryFilter: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('all');

  const categories = [
    { id: 'all', label: 'All Courses', icon: <FontAwesomeIcon icon={faBook} className="w-4 h-4 text-blue-600" />, count: 150 },
    { id: 'technology', label: 'Technology', icon: <FontAwesomeIcon icon={faLaptop} className="w-4 h-4 text-blue-600" />, count: 45 },
    { id: 'business', label: 'Business', icon: <FontAwesomeIcon icon={faBriefcase} className="w-4 h-4 text-green-600" />, count: 38 },
    { id: 'design', label: 'Design', icon: <FontAwesomeIcon icon={faPalette} className="w-4 h-4 text-purple-600" />, count: 22 },
    { id: 'career', label: 'Career Skills', icon: <FontAwesomeIcon icon={faRocket} className="w-4 h-4 text-orange-600" />, count: 30 },
    { id: 'agriculture', label: 'Agriculture', icon: <FontAwesomeIcon icon={faSeedling} className="w-4 h-4 text-green-600" />, count: 15 },
    { id: 'finance', label: 'Finance', icon: <FontAwesomeIcon icon={faMoneyBillWave} className="w-4 h-4 text-green-600" />, count: 18 },
    { id: 'health', label: 'Health', icon: <FontAwesomeIcon icon={faHeart} className="w-4 h-4 text-red-600" />, count: 12 }
  ];

  return (
    <section style={{
      padding: '24px 20px',
      background: '#FFFFFF',
      borderBottom: '1px solid #E5E7EB',
      position: 'sticky',
      top: '0',
      zIndex: 9,
      boxShadow: '0 2px 4px rgba(0, 0, 0, 0.04)'
    }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        <div
          className="category-scroll"
          style={{
            display: 'flex',
            gap: '12px',
            overflowX: 'auto',
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
            WebkitOverflowScrolling: 'touch',
            paddingBottom: '4px'
          }}
        >
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              style={{
                flex: '0 0 auto',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                padding: '10px 20px',
                background: activeCategory === category.id ? '#F97316' : 'white',
                color: activeCategory === category.id ? 'white' : '#6B7280',
                border: `2px solid ${activeCategory === category.id ? '#F97316' : '#E5E7EB'}`,
                borderRadius: '24px',
                fontSize: '14px',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.borderColor = '#F97316';
                  e.currentTarget.style.color = '#F97316';
                  e.currentTarget.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (activeCategory !== category.id) {
                  e.currentTarget.style.borderColor = '#E5E7EB';
                  e.currentTarget.style.color = '#6B7280';
                  e.currentTarget.style.transform = 'translateY(0)';
                }
              }}
            >
              <span style={{ fontSize: '18px' }}>{category.icon}</span>
              <span>{category.label}</span>
              <span style={{
                padding: '2px 8px',
                borderRadius: '12px',
                fontSize: '12px',
                background: activeCategory === category.id ? 'rgba(255, 255, 255, 0.2)' : '#F3F4F6',
                color: activeCategory === category.id ? 'white' : '#6B7280',
                fontWeight: '600'
              }}>
                {category.count}
              </span>
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .category-scroll::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default CategoryFilter;
