import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGraduationCap, faWhatsapp } from '@fortawesome/free-solid-svg-icons';
import { faWhatsapp as fabWhatsapp } from '@fortawesome/free-brands-svg-icons';

const FloatingActionButtons: React.FC = () => {
  const navigate = useNavigate();

  const handleEnrollClick = () => {
    navigate('/courses');
  };

  const handleWhatsAppClick = () => {
    window.open('https://wa.me/255768423139', '_blank', 'noopener,noreferrer');
  };

  return (
    <>
      <style>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes pulse-glow {
          0%, 100% {
            box-shadow: 0 10px 25px -5px rgba(59, 130, 246, 0.4), 
                        0 8px 10px -6px rgba(59, 130, 246, 0.4);
          }
          50% {
            box-shadow: 0 20px 35px -5px rgba(59, 130, 246, 0.6), 
                        0 10px 15px -6px rgba(59, 130, 246, 0.6);
          }
        }

        .fab-enroll {
          animation: float 3s ease-in-out infinite;
        }

        .fab-whatsapp {
          animation: float 3s ease-in-out infinite 1.5s;
        }

        .fab-enroll:hover {
          animation: pulse-glow 1.5s ease-in-out infinite;
        }

        @media (max-width: 768px) {
          .fab-container {
            transform: scale(0.9);
          }
        }
      `}</style>

      <div className="fab-container fixed left-4 bottom-20 z-50 flex flex-col gap-4">
        {/* Enroll Now Button */}
        <div className="group relative">
          <button
            onClick={handleEnrollClick}
            className="fab-enroll flex items-center gap-3 px-5 py-3 
                     bg-gradient-to-r from-[#3B82F6] to-[#2563EB] 
                     hover:from-[#2563EB] hover:to-[#1D4ED8]
                     text-white font-bold rounded-full 
                     shadow-lg shadow-blue-400/40
                     hover:shadow-xl hover:shadow-blue-400/60
                     hover:scale-105
                     transition-all duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-2"
            aria-label="Enroll Now"
          >
            <FontAwesomeIcon icon={faGraduationCap} className="w-5 h-5" />
            <span className="text-base">Enroll Now</span>
          </button>
          
          {/* Tooltip */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 
                        px-3 py-1.5 bg-gray-900 text-white text-sm rounded-md
                        opacity-0 group-hover:opacity-100 pointer-events-none
                        transition-opacity duration-200 whitespace-nowrap">
            Join a Course
            <div className="absolute right-full top-1/2 -translate-y-1/2 
                          border-4 border-transparent border-r-gray-900"></div>
          </div>
        </div>

        {/* WhatsApp Support Button */}
        <div className="group relative">
          <button
            onClick={handleWhatsAppClick}
            className="fab-whatsapp flex items-center justify-center 
                     w-14 h-14 
                     bg-[#25D366] hover:bg-[#20BA5A]
                     text-white rounded-full 
                     shadow-md shadow-green-300/40
                     hover:shadow-lg hover:shadow-green-300/50
                     hover:scale-105
                     transition-all duration-300 ease-in-out
                     focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2"
            aria-label="Chat on WhatsApp"
          >
            <FontAwesomeIcon icon={fabWhatsapp} className="w-7 h-7" />
          </button>
          
          {/* Tooltip */}
          <div className="absolute left-full ml-3 top-1/2 -translate-y-1/2 
                        px-3 py-1.5 bg-gray-900 text-white text-sm rounded-md
                        opacity-0 group-hover:opacity-100 pointer-events-none
                        transition-opacity duration-200 whitespace-nowrap">
            Chat on WhatsApp
            <div className="absolute right-full top-1/2 -translate-y-1/2 
                          border-4 border-transparent border-r-gray-900"></div>
          </div>
        </div>
      </div>
    </>
  );
};

export default FloatingActionButtons;

