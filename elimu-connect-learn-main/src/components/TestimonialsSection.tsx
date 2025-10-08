import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faChevronLeft, faChevronRight, faQuoteLeft } from "@fortawesome/free-solid-svg-icons";
import { Button } from "@/components/ui/button";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Import avatar images
import aminaAvatar from "@/assets/avatars/amina.jpg";
import josephAvatar from "@/assets/avatars/joseph.jpg";
import graceAvatar from "@/assets/avatars/grace.jpg";
import ibrahimAvatar from "@/assets/avatars/ibrahim.jpg";

interface Testimonial {
  id: string;
  name: string;
  role: string;
  location: string;
  avatar: string;
  quote: string;
  rating: number;
  course: string;
}

interface TestimonialProps {
  testimonials?: Testimonial[];
  autoPlay?: boolean;
  showRating?: boolean;
}

const defaultTestimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Amina Hassan',
    role: 'Recent Graduate',
    location: 'Dar es Salaam',
    avatar: aminaAvatar,
    quote: 'Elimu Space helped me learn web development. Now I work as a freelancer and earn good money!',
    rating: 5,
    course: 'Web Development'
  },
  {
    id: '2',
    name: 'Joseph Mwangi',
    role: 'Small Business Owner',
    location: 'Arusha',
    avatar: josephAvatar,
    quote: 'The entrepreneurship course changed my mindset. My business has grown 300% in 6 months.',
    rating: 5,
    course: 'Entrepreneurship'
  },
  {
    id: '3',
    name: 'Grace Mollel',
    role: 'University Student',
    location: 'Mwanza',
    avatar: graceAvatar,
    quote: 'Perfect for learning during my free time. The mobile money course helped me start my fintech idea.',
    rating: 5,
    course: 'Digital Finance'
  },
  {
    id: '4',
    name: 'Ibrahim Khamis',
    role: 'Youth Leader',
    location: 'Zanzibar',
    avatar: ibrahimAvatar,
    quote: 'Affordable, practical, and in Swahili! Exactly what Tanzanian youth need.',
    rating: 5,
    course: 'Digital Literacy'
  }
];

const TestimonialsSection = ({ 
  testimonials = defaultTestimonials, 
  autoPlay = true, 
  showRating = true 
}: TestimonialProps) => {
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 60 },
    visible: { opacity: 1, y: 0 }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, index) => (
      <FontAwesomeIcon
        key={index}
        icon={faStar}
        className={`w-4 h-4 ${
          index < rating
            ? "fill-tanzania-gold text-tanzania-gold"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  const TestimonialCard = ({ testimonial, index }: { testimonial: Testimonial; index: number }) => (
    <motion.div
      variants={itemVariants}
      className="glass-card p-6 rounded-2xl transition-all duration-300 hover:shadow-card group cursor-pointer h-full"
      style={{
        background: "rgba(255, 255, 255, 0.95)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(255, 255, 255, 0.2)",
        boxShadow: "0 8px 32px rgba(37, 99, 235, 0.1)"
      }}
      whileHover={{ 
        y: -4, 
        rotate: index % 2 === 0 ? 1 : -1,
        boxShadow: "0 12px 40px rgba(37, 99, 235, 0.15)"
      }}
      transition={{ duration: 0.3 }}
    >
      {/* Quote icon */}
      <div className="mb-4">
        <FontAwesomeIcon icon={faQuoteLeft} className="w-8 h-8 text-primary/30" />
      </div>

      {/* Quote text */}
      <blockquote className="text-foreground text-base leading-relaxed mb-6 font-medium">
        "{testimonial.quote}"
      </blockquote>

      {/* Rating */}
      {showRating && (
        <div className="flex items-center gap-1 mb-4">
          {renderStars(testimonial.rating)}
        </div>
      )}

      {/* User info */}
      <div className="flex items-center gap-4">
        <img
          src={testimonial.avatar}
          alt={`${testimonial.name} avatar`}
          className="w-14 h-14 rounded-full object-cover border-3 border-primary shadow-lg"
        />
        <div className="flex-1">
          <h4 className="font-semibold text-foreground text-lg">
            {testimonial.name}
          </h4>
          <p className="text-muted-foreground text-sm">
            {testimonial.role} • {testimonial.location}
          </p>
          {testimonial.course && (
            <div className="mt-2">
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary">
                {testimonial.course}
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );

  return (
    <section ref={ref} className="py-20 bg-gradient-to-br from-background to-accent">
      <div className="container mx-auto px-4">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants}>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-poppins font-bold text-foreground mb-4">
              Wanafunzi Wanasema Nini?
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Success stories from Tanzanian youth who transformed their lives through practical skills training
            </p>
          </motion.div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="relative"
        >
          {/* Desktop: Carousel with navigation */}
          <div className="hidden md:block">
            <Carousel
              opts={{
                align: "start",
                loop: autoPlay,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={testimonial.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                    <TestimonialCard testimonial={testimonial} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center gap-4 mt-8">
                <CarouselPrevious className="relative translate-y-0 left-0" />
                <CarouselNext className="relative translate-y-0 right-0" />
              </div>
            </Carousel>
          </div>

          {/* Mobile: Single card carousel */}
          <div className="md:hidden">
            <Carousel
              opts={{
                align: "center",
                loop: autoPlay,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={testimonial.id} className="basis-full px-4">
                    <TestimonialCard testimonial={testimonial} index={index} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="flex items-center justify-center gap-4 mt-8">
                <CarouselPrevious className="relative translate-y-0 left-0" />
                <CarouselNext className="relative translate-y-0 right-0" />
              </div>
            </Carousel>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          variants={itemVariants}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="text-center mt-16"
        >
          <Button size="lg" className="px-8 py-4 text-lg font-semibold">
            Jiunge na Wanafunzi 50,000+
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialsSection;