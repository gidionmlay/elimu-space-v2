import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuoteLeft, faStar, faChevronLeft, faChevronRight, faUser } from '@fortawesome/free-solid-svg-icons';

interface Testimonial {
  id: number;
  name: string;
  role?: string;
  location?: string;
  avatar: string;
  quote: string;
}

const TestimonialsCarousel: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [cardsToShow, setCardsToShow] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Leonard R. Sebeo",
      role: "Recent Graduate",
      location: "Dar es Salaam",
      avatar: "placeholder",
      quote:
        "Before joining Elimu Space, I knew nothing about writing a CV. But through the innovative approach, I learned how to create a strong CV and now have the confidence to apply for my own and even guide others on the basics of CV writing. I truly appreciate Elimu Space Platform for investing in both soft and technical skills that have shaped my learning journey.",
    },
    {
      id: 2,
      name: "Rhobi Kilongo",
      role: "Campus Ambassador",
      location: "Mwanza",
      avatar: "placeholder",
      quote:
        "Being part of Elimu Platform through programs like Campus Ambassador and Unikonekt has been an incredible experience. I've gained valuable skills, grown personally, and expanded my network. I highly recommend it to any young person preparing for the job market.",
    },
    {
      id: 3,
      name: "Fadhil Athuman Katunzi",
      role: "University Graduate",
      location: "Arusha",
      avatar: "placeholder",
      quote:
        "After graduating university, I thought I knew how to present myself and write a good CV. But through Elimu Platform, I learned so much more — from making a strong impression on recruiters to understanding what employers really look for.",
    },
    {
      id: 4,
      name: "Amina Hassan",
      role: "Freelance Developer",
      location: "Dodoma",
      avatar: "placeholder",
      quote:
        "Elimu Space helped me transition from university to freelancing. The web development courses were practical and taught in Swahili, making it easy to understand. Now I earn a good income working remotely.",
    },
    {
      id: 5,
      name: "Joseph Mwangi",
      role: "Small Business Owner",
      location: "Mbeya",
      avatar: "placeholder",
      quote:
        "The entrepreneurship course completely changed my mindset. I learned how to plan, budget, and market my business. In 6 months, my sales increased by 300%. This platform is a game-changer for young entrepreneurs.",
    },
  ];

  // Update cards to show based on screen size
  useEffect(() => {
    const updateCardsToShow = () => {
      if (window.innerWidth >= 1024) {
        setCardsToShow(3);
      } else if (window.innerWidth >= 768) {
        setCardsToShow(2);
      } else {
        setCardsToShow(1);
      }
    };

    updateCardsToShow();
    window.addEventListener("resize", updateCardsToShow);
    return () => window.removeEventListener("resize", updateCardsToShow);
  }, []);

  const totalSlides = Math.ceil(testimonials.length / cardsToShow);

  const goToSlide = (index: number) => {
    setCurrentIndex(Math.max(0, Math.min(index, totalSlides - 1)));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % totalSlides);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + totalSlides) % totalSlides);
  };

  // Touch handlers for swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) {
      nextSlide();
    }
    if (touchStart - touchEnd < -75) {
      prevSlide();
    }
  };

  const visibleTestimonials = testimonials.slice(
    currentIndex * cardsToShow,
    (currentIndex + 1) * cardsToShow
  );

  return (
    <section className="bg-[#f5f3f0] py-16 px-4">
      <div className="max-w-[1280px] mx-auto">
        {/* Section Title */}
        <h2 className="text-3xl md:text-4xl font-bold text-center text-[#1e293b] mb-12">
          What Our Students Say
        </h2>

        {/* Carousel Container */}
        <div className="relative">
          {/* Navigation Arrows - Desktop Only */}
          <button
            onClick={prevSlide}
            className="hidden lg:flex absolute left-[-60px] top-1/2 -translate-y-1/2 z-10
                       w-11 h-11 items-center justify-center rounded-full bg-white
                       shadow-[0_2px_8px_rgba(0,0,0,0.1)]
                       hover:bg-[#16a085] hover:shadow-[0_4px_12px_rgba(22,160,133,0.3)]
                       transition-all duration-300 cursor-pointer group"
            aria-label="Previous testimonials"
          >
            <FontAwesomeIcon icon={faChevronLeft} className="w-6 h-6 text-[#1e293b] group-hover:text-white transition-colors duration-300" />
          </button>

          <button
            onClick={nextSlide}
            className="hidden lg:flex absolute right-[-60px] top-1/2 -translate-y-1/2 z-10
                       w-11 h-11 items-center justify-center rounded-full bg-white
                       shadow-[0_2px_8px_rgba(0,0,0,0.1)]
                       hover:bg-[#16a085] hover:shadow-[0_4px_12px_rgba(22,160,133,0.3)]
                       transition-all duration-300 cursor-pointer group"
            aria-label="Next testimonials"
          >
            <FontAwesomeIcon icon={faChevronRight} className="w-6 h-6 text-[#1e293b] group-hover:text-white transition-colors duration-300" />
          </button>

          {/* Cards Container */}
          <div
            ref={containerRef}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6"
          >
            {visibleTestimonials.map((testimonial) => (
              <div
                key={testimonial.id}
                className="bg-white rounded-xl p-8 md:p-10 min-h-[400px] flex flex-col justify-between
                           shadow-[0_2px_8px_rgba(0,0,0,0.06)]
                           hover:shadow-[0_8px_16px_rgba(0,0,0,0.1)] hover:-translate-y-1
                           transition-all duration-300 will-change-transform"
              >
                {/* Quote Icon */}
                <div className="mb-4">
                  <FontAwesomeIcon icon={faQuoteLeft} className="w-10 h-10 text-[#16a085] opacity-80" />
                </div>

                {/* Quote Text */}
                <p className="text-[#64748b] text-[15px] leading-[1.7] italic mb-6 flex-grow text-left">
                  "{testimonial.quote}"
                </p>

                {/* Author Section */}
                <div className="flex items-center gap-3">
                  {/* Avatar */}
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#16a085] to-[#0d9488] flex-shrink-0 flex items-center justify-center">
                    <FontAwesomeIcon icon={faUser} className="w-8 h-8 text-white" />
                  </div>

                  <div>
                    <h4 className="text-[#1e293b] text-lg font-bold leading-tight m-0">
                      {testimonial.name}
                    </h4>
                    {testimonial.role && (
                      <p className="text-[#64748b] text-sm mt-1 m-0">
                        {testimonial.role}
                        {testimonial.location && `, ${testimonial.location}`}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Navigation Dots */}
          <div className="flex justify-center items-center gap-2 mt-8">
            {Array.from({ length: totalSlides }).map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`transition-all duration-300 cursor-pointer
                           ${
                             index === currentIndex
                               ? "w-6 h-2.5 bg-[#16a085] rounded-[5px]"
                               : "w-2.5 h-2.5 bg-[#cbd5e1] rounded-full hover:bg-[#16a085]/50"
                           }`}
                aria-label={`Go to slide ${index + 1}`}
                aria-current={index === currentIndex ? "true" : "false"}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
