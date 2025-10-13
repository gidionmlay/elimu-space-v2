import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
}

const GallerySection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<number | null>(null);

  const images: GalleryImage[] = [
    { id: '1', src: 'C:/Users/Gidion Mlay/Downloads/elimu space v2/elimu-connect-learn-main/src/assets/course1.png', alt: 'Students coding together', category: 'Learning' },
    { id: '2', src: 'C:/Users/Gidion Mlay/Downloads/elimu space v2/elimu-connect-learn-main/src/assets/workshop.jpg', alt: 'Tech workshop session', category: 'Events' },
    { id: '3', src: 'C:/Users/Gidion Mlay/Downloads/elimu space v2/elimu-connect-learn-main/src/assets/graduation.jpg', alt: 'Certificate ceremony', category: 'Achievements' },
    { id: '4', src: 'C:/Users/Gidion Mlay/Downloads/elimu space v2/elimu-connect-learn-main/src/assets/mentorship.jpg', alt: 'Mentorship session', category: 'Mentorship' },
    { id: '5', src: 'C:/Users/Gidion Mlay/Downloads/elimu space v2/elimu-connect-learn-main/src/assets/hackathon.jpg', alt: 'Hackathon participants', category: 'Events' },
    { id: '6', src: 'C:/Users/Gidion Mlay/Downloads/elimu space v2/elimu-connect-learn-main/src/assets/collaboration.jpg', alt: 'Team collaboration', category: 'Learning' },
    { id: '7', src: '/gallery/course2.png', alt: 'Student presentation', category: 'Achievements' },
    { id: '8', src: '/gallery/networking.jpg', alt: 'Networking event', category: 'Events' },
    { id: '9', src: '/gallery/lab.jpg', alt: 'Computer lab session', category: 'Learning' }
  ];

  const openLightbox = (index: number) => {
    setSelectedImage(index);
  };
 
  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const goToPrevious = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === 0 ? images.length - 1 : selectedImage - 1);
    }
  };

  const goToNext = () => {
    if (selectedImage !== null) {
      setSelectedImage(selectedImage === images.length - 1 ? 0 : selectedImage + 1);
    }
  };

  return (
    <section style={{
      padding: '100px 20px',
      background: '#F9FAFB'
    }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '900',
            color: '#111827',
            marginBottom: '16px'
          }}>
            Gallery of Success
          </h2>
          <p style={{
            fontSize: '18px',
            color: '#6B7280'
          }}>
            Moments that capture the journey of thousands of learners
          </p>
        </div>

        {/* Masonry Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 280px), 1fr))',
          gap: '1.5rem',
          gridAutoRows: '250px'
        }}>
          {images.map((image, index) => (
            <div
              key={image.id}
              onClick={() => openLightbox(index)}
              style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                cursor: 'pointer',
                gridRowEnd: index % 5 === 0 ? 'span 2' : 'span 1',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'scale(1.03)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
              }}
            >
              <img
                src={image.src}
                alt={image.alt}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'all 0.3s ease'
                }}
              />
              <div style={{
                position: 'absolute',
                inset: 0,
                background: 'linear-gradient(to top, rgba(0, 0, 0, 0.7) 0%, transparent 50%)',
                opacity: 0,
                transition: 'opacity 0.3s ease',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: '24px'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '1';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '0';
              }}
              >
                <span style={{
                  display: 'inline-block',
                  padding: '6px 12px',
                  background: '#F97316',
                  borderRadius: '8px',
                  fontSize: '14px',
                  fontWeight: '600',
                  color: 'white',
                  width: 'fit-content'
                }}>
                  {image.category}
                </span>
                <p style={{
                  fontSize: '16px',
                  color: 'white',
                  marginTop: '8px'
                }}>
                  {image.alt}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      {selectedImage !== null && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'rgba(0, 0, 0, 0.95)',
            zIndex: 9999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px',
            animation: 'fadeIn 0.3s ease'
          }}
          onClick={closeLightbox}
        >
          {/* Close Button */}
          <button
            onClick={closeLightbox}
            style={{
              position: 'absolute',
              top: '24px',
              right: '24px',
              width: '48px',
              height: '48px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <FontAwesomeIcon icon={faTimes} style={{ width: '24px', height: '24px' }} />
          </button>

          {/* Previous Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToPrevious();
            }}
            style={{
              position: 'absolute',
              left: '24px',
              width: '48px',
              height: '48px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <FontAwesomeIcon icon={faChevronLeft} style={{ width: '24px', height: '24px' }} />
          </button>

          {/* Image */}
          <img
            src={images[selectedImage].src}
            alt={images[selectedImage].alt}
            onClick={(e) => e.stopPropagation()}
            style={{
              maxWidth: '90%',
              maxHeight: '90vh',
              objectFit: 'contain',
              borderRadius: '12px',
              animation: 'zoomIn 0.3s ease'
            }}
          />

          {/* Next Button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              goToNext();
            }}
            style={{
              position: 'absolute',
              right: '24px',
              width: '48px',
              height: '48px',
              background: 'rgba(255, 255, 255, 0.1)',
              border: 'none',
              borderRadius: '50%',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.2)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255, 255, 255, 0.1)';
            }}
          >
            <FontAwesomeIcon icon={faChevronRight} style={{ width: '24px', height: '24px' }} />
          </button>

          {/* Image Info */}
          <div style={{
            position: 'absolute',
            bottom: '32px',
            left: '50%',
            transform: 'translateX(-50%)',
            textAlign: 'center',
            color: 'white'
          }}>
            <p style={{ fontSize: '18px', marginBottom: '8px' }}>{images[selectedImage].alt}</p>
            <p style={{ fontSize: '14px', opacity: 0.7 }}>
              {selectedImage + 1} / {images.length}
            </p>
          </div>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes zoomIn {
          from {
            opacity: 0;
            transform: scale(0.8);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
        }

        @media (max-width: 1024px) {
          h2 { font-size: 40px !important; }
        }
        
        @media (max-width: 768px) {
          h2 { font-size: 36px !important; }
          .container > div:last-child {
            grid-template-columns: repeat(auto-fit, minmax(min(100%, 240px), 1fr)) !important;
            gap: 1rem !important;
            grid-auto-rows: 200px !important;
          }
        }
        
        @media (max-width: 480px) {
          h2 { font-size: 28px !important; }
          .container > div:last-child {
            grid-auto-rows: 180px !important;
          }
        }
      `}</style>
    </section>
  );
};

export default GallerySection;
