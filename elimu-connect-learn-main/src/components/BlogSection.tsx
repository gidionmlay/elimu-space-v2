import React, { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faClock, faUser, faCalendar, faBookOpen, faLightbulb, faRocket, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import businessTanzania from "@/assets/articles/bussiness in tanzania.jpg";
import masterMpesa from "@/assets/articles/master mpesa.jpg";
import webDevelopment from "@/assets/articles/web development.png";
import articleVideo from "@/assets/articles/video/article video.mp4";

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
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);
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
      excerpt: 'A comprehensive step-by-step guide for young entrepreneurs looking to start their business journey with practical tips, local insights, and real success stories from Tanzania.',
      category: 'Entrepreneurship',
      image: businessTanzania,
      author: 'Sarah Mwalimu',
      date: 'Jan 15, 2025',
      readTime: '5 min',
      slug: 'start-business-tanzania'
    },
    {
      id: '2',
      title: 'Mastering M-Pesa: Beyond Basic Transactions',
      excerpt: 'Advanced tips and strategies for using mobile money services effectively and safely to grow your business, manage finances, and unlock new opportunities.',
      category: 'Digital Finance',
      image: masterMpesa,
      author: 'John Kinyua',
      date: 'Jan 12, 2025',
      readTime: '7 min',
      slug: 'mpesa-advanced-tips'
    },
    {
      id: '3',
      title: 'Building Your First Website: HTML & CSS Basics',
      excerpt: 'Learn the fundamentals of web development with practical examples, hands-on projects, and start your journey as a professional web developer.',
      category: 'Digital Skills',
      image: webDevelopment,
      author: 'Grace Mollel',
      date: 'Jan 10, 2025',
      readTime: '8 min',
      slug: 'html-css-basics'
    }
  ];

  return (
    <>
      <section 
        ref={sectionRef}
        className="blog-section" 
        style={{
          padding: '120px 20px',
          background: 'linear-gradient(135deg, #FFFFFF 0%, #F8FAFC 50%, #F1F5F9 100%)',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        {/* Background Elements */}
        <div style={{
          position: 'absolute',
          top: '-50%',
          right: '-20%',
          width: '600px',
          height: '600px',
          background: 'radial-gradient(circle, rgba(249, 115, 22, 0.1) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }} />
        <div style={{
          position: 'absolute',
          bottom: '-30%',
          left: '-15%',
          width: '400px',
          height: '400px',
          background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, transparent 70%)',
          borderRadius: '50%',
          zIndex: 0
        }} />

        <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          {/* Section Header */}
          <div 
            className="section-header" 
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: '64px',
              gap: '32px',
              flexWrap: 'wrap',
              opacity: isVisible ? 1 : 0,
              transform: isVisible ? 'translateY(0)' : 'translateY(30px)',
              transition: 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            <motion.div 
              className="header-content" 
              style={{ flex: 1, minWidth: '300px' }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <div style={{
                  width: '48px',
                  height: '48px',
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  borderRadius: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)'
                }}>
                  <FontAwesomeIcon icon={faBookOpen} className="w-6 h-6 text-white" />
                </div>
                <span style={{
                  fontSize: '14px',
                  fontWeight: '600',
                  color: '#F97316',
                  textTransform: 'uppercase',
                  letterSpacing: '1px'
                }}>
                  Knowledge Hub
                </span>
              </div>
              
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-4">
                Learn Beyond the Classroom
              </h2>
              
              <p className="text-center text-gray-600 max-w-2xl mx-auto">
                Discover insights, stories, and mentorship moments that inspire lifelong learning and real-world growth.
              </p>
            </motion.div>

            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '16px',
              alignItems: 'flex-end'
            }}>
              <a
                href="/blog"
                className="view-all-btn"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '16px 32px',
                  background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                  border: 'none',
                  borderRadius: '16px',
                  color: 'white',
                  fontWeight: '600',
                  fontSize: '16px',
                  textDecoration: 'none',
                  transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                  boxShadow: '0 8px 24px rgba(249, 115, 22, 0.3)',
                  whiteSpace: 'nowrap',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-2px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 12px 32px rgba(249, 115, 22, 0.4)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(249, 115, 22, 0.3)';
                }}
              >
                <span>Explore All Articles</span>
                <FontAwesomeIcon icon={faArrowRight} className="w-5 h-5" />
              </a>
              
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '14px',
                color: '#64748B',
                fontWeight: '500'
              }}>
                <FontAwesomeIcon icon={faLightbulb} className="w-4 h-4" />
                <span>Updated weekly</span>
              </div>
            </div>
          </div>

          {/* Video + Quote Section */}
          <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center mt-12">
            <motion.video 
              autoPlay 
              loop 
              muted 
              playsInline 
              className="rounded-xl shadow-md w-full object-cover h-72 md:h-96"
              src={articleVideo}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              onError={(e) => {
                // Fallback to placeholder if video doesn't exist
                const video = e.currentTarget;
                video.style.display = 'none';
                const placeholder = video.nextElementSibling as HTMLElement;
                if (placeholder) placeholder.style.display = 'flex';
              }}
            />
            {/* Video Placeholder */}
            <div 
              className="placeholder"
              style={{
                display: 'none',
                height: '288px',
                background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                borderRadius: '16px',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '18px',
                fontWeight: '600',
                textAlign: 'center',
                padding: '20px'
              }}
            >
              <div>
                <FontAwesomeIcon icon={faRocket} className="w-12 h-12 mb-4" />
                <div>Video Coming Soon</div>
                <div style={{ fontSize: '14px', opacity: 0.8, marginTop: '8px' }}>
                  Inspiring learning moments
                </div>
              </div>
            </div>
            
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
              viewport={{ once: true }}
              style={{ padding: '20px' }}
            >
              <div style={{
                position: 'relative',
                background: 'rgba(255, 255, 255, 0.8)',
                backdropFilter: 'blur(20px)',
                borderRadius: '20px',
                padding: '32px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
              }}>
                <FontAwesomeIcon 
                  icon={faQuoteLeft} 
                  className="w-8 h-8 text-orange-500 mb-4" 
                  style={{ opacity: 0.7 }}
                />
                <blockquote className="text-lg italic text-gray-800 mb-6 leading-relaxed">
                  "Elimu Space helped me turn my passion into a career. It's more than learning — it's about building confidence, connecting with mentors, and discovering opportunities I never knew existed. The community here truly believes in your potential."
                </blockquote>
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  paddingTop: '16px',
                  borderTop: '1px solid #E2E8F0'
                }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: '50%',
                    background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'white',
                    fontSize: '18px',
                    fontWeight: '600'
                  }}>
                    S
                  </div>
                  <div>
                    <div style={{
                      fontSize: '16px',
                      fontWeight: '600',
                      color: '#1F2937',
                      marginBottom: '4px'
                    }}>
                      Sarah Mwalimu
                    </div>
                    <div style={{
                      fontSize: '14px',
                      color: '#6B7280'
                    }}>
                      Digital Marketing Graduate, Now Freelancer
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </section>

          {/* Blog Grid */}
          <div 
            className="blog-grid" 
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 380px), 1fr))',
              gap: '32px',
              alignItems: 'start'
            }}
          >
            {articles.map((article, index) => (
              <article
                key={article.id}
                className="blog-card"
                style={{
                  background: 'rgba(255, 255, 255, 0.8)',
                  backdropFilter: 'blur(20px)',
                  borderRadius: '24px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 24px rgba(0, 0, 0, 0.06)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                  cursor: 'pointer',
                  opacity: isVisible ? 1 : 0,
                  transform: isVisible ? 'translateY(0)' : 'translateY(40px)',
                  animation: isVisible ? `fadeInUp 0.8s ease-out ${index * 0.2}s both` : 'none',
                  position: 'relative'
                }}
                onMouseEnter={(e) => {
                  setHoveredCard(article.id);
                  e.currentTarget.style.transform = 'translateY(-8px) scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 20px 48px rgba(0, 0, 0, 0.12)';
                  e.currentTarget.style.borderColor = 'rgba(249, 115, 22, 0.3)';
                }}
                onMouseLeave={(e) => {
                  setHoveredCard(null);
                  e.currentTarget.style.transform = 'translateY(0) scale(1)';
                  e.currentTarget.style.boxShadow = '0 4px 24px rgba(0, 0, 0, 0.06)';
                  e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.2)';
                }}
              >
                {/* Image Container */}
                <div style={{
                  position: 'relative',
                  overflow: 'hidden',
                  height: '224px',
                  background: 'linear-gradient(135deg, #F1F5F9 0%, #E2E8F0 100%)',
                  borderRadius: '16px'
                }}>
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-56 object-cover rounded-xl shadow-md blog-image"
                    style={{
                      transition: 'transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
                      filter: hoveredCard === article.id ? 'brightness(1.1) saturate(1.1)' : 'brightness(1) saturate(1)'
                    }}
                  />
                  
                  {/* Gradient Overlay */}
                  <div style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(180deg, transparent 0%, rgba(0, 0, 0, 0.1) 100%)',
                    opacity: hoveredCard === article.id ? 0.3 : 0,
                    transition: 'opacity 0.3s ease'
                  }} />
                  
                  {/* Category Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    left: '20px',
                    padding: '8px 16px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    color: 'white',
                    background: getCategoryColor(article.category),
                    boxShadow: '0 4px 16px rgba(0, 0, 0, 0.2)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    transform: hoveredCard === article.id ? 'scale(1.05)' : 'scale(1)',
                    transition: 'transform 0.3s ease'
                  }}>
                    {article.category}
                  </div>

                  {/* Read Time Badge */}
                  <div style={{
                    position: 'absolute',
                    top: '20px',
                    right: '20px',
                    padding: '6px 12px',
                    borderRadius: '16px',
                    fontSize: '11px',
                    fontWeight: '600',
                    color: '#64748B',
                    background: 'rgba(255, 255, 255, 0.9)',
                    backdropFilter: 'blur(8px)',
                    border: '1px solid rgba(255, 255, 255, 0.3)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}>
                    <FontAwesomeIcon icon={faClock} className="w-3 h-3" />
                    {article.readTime}
                  </div>
                </div>

                {/* Content */}
                <div style={{ padding: '32px' }}>
                  <h3 style={{
                    fontSize: '24px',
                    fontWeight: '700',
                    lineHeight: '1.3',
                    color: '#0F172A',
                    margin: '0 0 16px',
                    transition: 'color 0.3s ease',
                    display: '-webkit-box',
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    <a
                      href={`/blog/${article.slug}`}
                      style={{ 
                        color: 'inherit', 
                        textDecoration: 'none',
                        transition: 'color 0.3s ease'
                      }}
                      onMouseOver={(e) => e.currentTarget.style.color = '#F97316'}
                      onMouseOut={(e) => e.currentTarget.style.color = '#0F172A'}
                    >
                      {article.title}
                    </a>
                  </h3>

                  <p style={{
                    fontSize: '16px',
                    lineHeight: '1.7',
                    color: '#64748B',
                    marginBottom: '24px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {article.excerpt}
                  </p>

                  {/* Author & Meta Info */}
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    paddingTop: '20px',
                    marginBottom: '20px',
                    borderTop: '1px solid #E2E8F0',
                    fontSize: '14px',
                    color: '#64748B',
                    flexWrap: 'wrap'
                  }}>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '8px',
                      fontWeight: '500'
                    }}>
                      <div style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '50%',
                        background: 'linear-gradient(135deg, #F97316 0%, #EA580C 100%)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'white',
                        fontSize: '12px',
                        fontWeight: '600'
                      }}>
                        {article.author.charAt(0)}
                      </div>
                      <span>{article.author}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FontAwesomeIcon icon={faCalendar} className="w-4 h-4" />
                      <span>{article.date}</span>
                    </div>
                  </div>

                  {/* Read More Button */}
                  <a
                    href={`/blog/${article.slug}`}
                    className="read-more-btn"
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#F97316',
                      fontWeight: '600',
                      fontSize: '15px',
                      textDecoration: 'none',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      padding: '8px 0',
                      borderRadius: '8px'
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
                    <span>Read Full Article</span>
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
            transform: translateY(40px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .read-more-btn::after {
          content: '';
          position: absolute;
          bottom: 4px;
          left: 0;
          width: 0;
          height: 2px;
          background: linear-gradient(90deg, #F97316 0%, #EA580C 100%);
          transition: width 0.3s ease;
          border-radius: 1px;
        }

        .read-more-btn:hover::after {
          width: 100%;
        }

        .blog-card:hover .blog-image {
          transform: scale(1.05);
        }

        .blog-image {
          transition: transform 0.5s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .blog-card:hover .blog-image {
          transform: scale(1.05);
        }

        .view-all-btn::before {
          content: '';
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: left 0.5s ease;
        }

        .view-all-btn:hover::before {
          left: 100%;
        }

        /* Video + Quote Section Responsive */
        @media (max-width: 768px) {
          .grid.grid-cols-1.md\\:grid-cols-2 {
            gap: 24px !important;
          }
          
          .grid.grid-cols-1.md\\:grid-cols-2 video {
            height: 240px !important;
          }
          
          .grid.grid-cols-1.md\\:grid-cols-2 .placeholder {
            height: 240px !important;
          }
        }

        /* Responsive Design */
        @media (max-width: 1200px) {
          .blog-grid {
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 350px), 1fr)) !important;
            gap: 24px !important;
          }
        }

        @media (max-width: 768px) {
          .blog-section {
            padding: 80px 16px !important;
          }

          .blog-grid {
            grid-template-columns: 1fr !important;
            gap: 24px !important;
          }

          .section-header {
            flex-direction: column !important;
            align-items: flex-start !important;
            gap: 24px !important;
            margin-bottom: 48px !important;
          }

          .section-header h2 {
            font-size: clamp(28px, 8vw, 40px) !important;
          }

          .section-header p {
            font-size: 18px !important;
          }

          .view-all-btn {
            width: 100% !important;
            justify-content: center !important;
          }
          
          .blog-card {
            border-radius: 20px !important;
          }

          .blog-card .blog-image {
            height: 200px !important;
          }
        }

        @media (max-width: 480px) {
          .blog-section {
            padding: 60px 12px !important;
          }

          .blog-card {
            border-radius: 16px !important;
          }

          .blog-card .blog-image {
            height: 180px !important;
          }

          .blog-card .content {
            padding: 24px !important;
          }
        }

        /* Enhanced animations */
        .blog-card {
          will-change: transform, box-shadow;
        }

        .blog-image {
          will-change: transform, filter;
        }

        /* Accessibility improvements */
        @media (prefers-reduced-motion: reduce) {
          .blog-card,
          .blog-image,
          .view-all-btn,
          .read-more-btn {
            transition: none !important;
            animation: none !important;
          }
        }

        /* Dark mode support */
        @media (prefers-color-scheme: dark) {
          .blog-section {
            background: linear-gradient(135deg, #0F172A 0%, #1E293B 50%, #334155 100%) !important;
          }
          
          .blog-card {
            background: rgba(30, 41, 59, 0.8) !important;
            border-color: rgba(255, 255, 255, 0.1) !important;
          }
          
          .section-header h2 {
            color: #F8FAFC !important;
          }
          
          .section-header p {
            color: #94A3B8 !important;
          }
        }
      `}</style>
    </>
  );
};

export default BlogSection;
