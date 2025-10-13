import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClock, faUser, faCalendar } from "@fortawesome/free-solid-svg-icons";

interface BlogArticle {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  image: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
}

const BlogSection: React.FC = () => {
  const getCategoryColor = (category: string): string => {
    const colors: { [key: string]: string } = {
      'Entrepreneurship': 'linear-gradient(135deg, #F59E0B 0%, #D97706 100%)',
      'Digital Finance': 'linear-gradient(135deg, #3B82F6 0%, #2563EB 100%)',
      'Digital Skills': 'linear-gradient(135deg, #8B5CF6 0%, #7C3AED 100%)',
      'Agriculture': 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
      'Soft Skills': 'linear-gradient(135deg, #EC4899 0%, #DB2777 100%)'
    };
    return colors[category] || 'linear-gradient(135deg, #6B7280 0%, #4B5563 100%)';
  };

  const articles: BlogArticle[] = [
    {
      id: '1',
      title: 'How to Start Your First Business in Tanzania',
      excerpt: 'A step-by-step guide for young entrepreneurs looking to start their business journey with practical tips and local insights.',
      category: 'Entrepreneurship',
      image: '/blog/business-startup.jpg',
      author: 'Sarah Mwalimu',
      date: 'Jan 15, 2025',
      readTime: '5 min',
      slug: 'start-business-tanzania'
    },
    {
      id: '2',
      title: 'Mastering M-Pesa: Beyond Basic Transactions',
      excerpt: 'Advanced tips for using mobile money services effectively and safely to grow your business and manage finances.',
      category: 'Digital Finance',
      image: '/blog/mpesa-tips.jpg',
      author: 'John Kinyua',
      date: 'Jan 12, 2025',
      readTime: '7 min',
      slug: 'mpesa-advanced-tips'
    },
    {
      id: '3',
      title: 'Building Your First Website: HTML & CSS Basics',
      excerpt: 'Learn the fundamentals of web development with practical examples and start your journey as a web developer.',
      category: 'Digital Skills',
      image: '/blog/web-development.jpg',
      author: 'Grace Mollel',
      date: 'Jan 10, 2025',
      readTime: '8 min',
      slug: 'html-css-basics'
    }
  ];

  return (
    <>
      <section className="blog-section" style={{
        padding: '80px 20px',
        background: 'linear-gradient(180deg, #FFFFFF 0%, #F9FAFB 100%)'
      }}>
        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
          {/* Section Header */}
          <div className="section-header" style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '48px',
            gap: '32px',
            flexWrap: 'wrap'
          }}>
            <div className="header-content">
              <h2 style={{
                fontSize: '48px',
                fontWeight: '800',
                lineHeight: '1.2',
                color: '#111827',
                marginBottom: '12px',
                letterSpacing: '-0.02em'
              }}>
                Learn Beyond the Classroom
              </h2>
              <p style={{
                fontSize: '18px',
                color: '#6B7280',
                fontWeight: '400',
                lineHeight: '1.6'
              }}>
                Insights, tips, and success stories for Tanzanian youth
              </p>
            </div>

            <a
              href="/blog"
              className="view-all-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '12px 28px',
                background: '#F97316',
                border: '2px solid #F97316',
                borderRadius: '8px',
                color: 'white',
                fontWeight: '600',
                fontSize: '15px',
                textDecoration: 'none',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(249, 115, 22, 0.25)',
                whiteSpace: 'nowrap'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = '#EA580C';
                e.currentTarget.style.transform = 'translateX(4px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(249, 115, 22, 0.35)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = '#F97316';
                e.currentTarget.style.transform = 'translateX(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(249, 115, 22, 0.25)';
              }}
            >
              View All Articles
              <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
            </a>
          </div>

          {/* Blog Grid */}
          <div className="blog-grid" style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 320px), 1fr))',
            gap: '1.5rem',
            alignItems: 'start'
          }}>
            {articles.map((article, index) => (
              <article
                key={article.id}
                className="blog-card"
                style={{
                  background: 'white',
                  borderRadius: '16px',
                  overflow: 'hidden',
                  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.08)',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s both`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-12px)';
                  e.currentTarget.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
                  const overlay = e.currentTarget.querySelector('.image-overlay') as HTMLElement;
                  if (overlay) overlay.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.08)';
                  const overlay = e.currentTarget.querySelector('.image-overlay') as HTMLElement;
                  if (overlay) overlay.style.opacity = '0';
                }}
              >
                {/* Image Container */}
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  height: '240px',
                  background: '#F3F4F6'
                }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="blog-image"
                    style={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transition: 'transform 0.4s ease'
                    }}
                  />
                  <div
                    className="image-overlay"
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      right: 0,
                      bottom: 0,
                      background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.4) 100%)',
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                      pointerEvents: 'none'
                    }}
                  />
                  <span style={{
                    position: 'absolute',
                    top: '16px',
                    left: '16px',
                    padding: '6px 14px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '600',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: 'white',
                    background: getCategoryColor(article.category),
                    boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
                    zIndex: 2,
                    backdropFilter: 'blur(8px)'
                  }}>
                    {article.category}
                  </span>
                </div>

                {/* Content */}
                <div style={{ padding: '24px' }}>
                  <h3 style={{
                    fontSize: '22px',
                    fontWeight: '700',
                    lineHeight: '1.4',
                    color: '#1F2937',
                    margin: '0 0 12px',
                    transition: 'color 0.3s ease'
                  }}>
                    <a
                      href={`/blog/${article.slug}`}
                      style={{ color: 'inherit', textDecoration: 'none' }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#F97316'}
                      onMouseOut={(e) => e.currentTarget.style.color = '#1F2937'}
                    >
                      {article.title}
                    </a>
                  </h3>

                  <p style={{
                    fontSize: '15px',
                    lineHeight: '1.7',
                    color: '#6B7280',
                    marginBottom: '20px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {article.excerpt}
                  </p>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '16px',
                    paddingTop: '16px',
                    marginBottom: '16px',
                    borderTop: '1px solid #E5E7EB',
                    fontSize: '13px',
                    color: '#9CA3AF',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FontAwesomeIcon icon={faUser} className="w-4 h-4" />
                      <span>{article.author}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FontAwesomeIcon icon={faClock} className="w-4 h-4" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <a
                    href={`/blog/${article.slug}`}
                    className="read-more-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#F97316',
                      fontWeight: '600',
                      fontSize: '14px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      position: 'relative'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.color = '#EA580C';
                      e.currentTarget.style.gap = '12px';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.color = '#F97316';
                      e.currentTarget.style.gap = '8px';
                    }}
                  >
                    Read More
                    <FontAwesomeIcon icon={faArrowRight} className="w-4 h-4" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CSS Styles */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .read-more-btn::after {
          content: '';
          position: absolute;
          bottom: -2px;
          left: 0;
          width: 0;
          height: 2px;
          background: #F97316;
          transition: width 0.3s ease;
        }

        .read-more-btn:hover::after {
          width: calc(100% - 28px);
        }

        .blog-card:hover .blog-image {
          transform: scale(1.08);
        }

        @media (max-width: 1024px) {
          .blog-grid {
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 280px), 1fr)) !important;
            gap: 1.25rem !important;
          }

          .section-header h2 {
            font-size: 40px !important;
          }
        }

        @media (max-width: 768px) {
          .blog-section {
            padding: 60px 16px !important;
          }

          .blog-grid {
            gap: 1rem !important;
          }

          .section-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 16px !important;
          }

          .section-header h2 {
            font-size: 32px !important;
          }

          .section-header p {
            font-size: 16px !important;
          }

          .view-all-btn {
            width: 100% !important;
            justify-content: center !important;
          }
          
          .blog-card {
            min-height: auto !important;
          }
        }
      `}</style>
    </>
  );
};

export default BlogSection;
