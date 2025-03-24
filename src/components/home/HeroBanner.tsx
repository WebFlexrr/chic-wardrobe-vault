
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

interface Slide {
  image: string;
  title: string;
  subtitle: string;
  cta: string;
  link: string;
}

const slides: Slide[] = [
  {
    image: '/lovable-uploads/10b76dac-4d78-496a-8549-7a7208b335ab.png',
    title: 'FIND YOUR PERFECT STYLE',
    subtitle: 'Office attire with an edge for the modern professional',
    cta: 'Shop Now',
    link: '/category/dresses'
  },
  {
    image: '/assets/hero-2.jpg',
    title: 'AUTUMN COLLECTION',
    subtitle: 'Discover our new arrivals for the season',
    cta: 'Explore',
    link: '/category/outerwear'
  },
  {
    image: '/assets/hero-3.jpg',
    title: 'ELEGANCE REDEFINED',
    subtitle: 'Timeless pieces for the sophisticated woman',
    cta: 'View Collection',
    link: '/category/tops'
  }
];

const HeroBanner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 6000);

    return () => clearInterval(interval);
  }, [currentSlide]);

  const nextSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  const prevSlide = () => {
    if (isAnimating) return;
    
    setIsAnimating(true);
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
    
    setTimeout(() => {
      setIsAnimating(false);
    }, 600);
  };

  return (
    <div className="relative w-full h-[70vh] md:h-[85vh] overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slide.image})`, 
              transform: index === currentSlide ? 'scale(1.1)' : 'scale(1)',
              transition: 'transform 10s ease-out'
            }}
          />
          <div className="hero-overlay"></div>
          <div className="hero-content">
            <div 
              className={`max-w-2xl transition-all duration-1000 ease-out ${
                index === currentSlide ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
              }`}
            >
              <h1 className="text-2xl md:text-5xl font-extrabold mb-4">
                {slide.title}
              </h1>
              <p className="text-lg md:text-2xl mb-8 max-w-lg">
                {slide.subtitle}
              </p>
              <Button 
                asChild
                size="lg"
                className="bg-white text-gray-900 hover:bg-gray-100 font-semibold rounded-sm px-8 hover-scale"
              >
                <Link to={slide.link}>{slide.cta}</Link>
              </Button>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full transition-all duration-300"
        aria-label="Previous slide"
      >
        <ChevronLeft size={isMobile ? 20 : 24} className="text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 backdrop-blur-sm p-2 rounded-full transition-all duration-300"
        aria-label="Next slide"
      >
        <ChevronRight size={isMobile ? 20 : 24} className="text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'w-8 bg-white' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;
