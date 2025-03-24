
import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PromoSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <section 
      ref={sectionRef}
      className="py-24 bg-cover bg-center relative"
      style={{ backgroundImage: "url('/assets/promo-bg.jpg')" }}
    >
      <div className="absolute inset-0 bg-brand-900/70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 
            className={`text-3xl md:text-4xl font-bold mb-4 transition-all duration-700 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Autumn Is Coming
          </h2>
          <p 
            className={`text-lg mb-8 max-w-xl mx-auto transition-all duration-700 delay-300 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Discover our new autumn collection featuring elegant office wear designed for the modern professional woman. Style and comfort redefined.
          </p>
          <div 
            className={`transition-all duration-700 delay-500 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            <Button 
              asChild
              size="lg"
              className="bg-white text-brand-800 hover:bg-gray-100 hover-scale"
            >
              <Link to="/category/outerwear">Explore Collection</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PromoSection;
