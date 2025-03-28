
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
      className="py-28 bg-cover bg-center relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80')" }}
    >
      <div className="absolute inset-0 bg-gradient-to-r from-brand-900/80 to-purple-900/70"></div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-2xl mx-auto text-center text-white">
          <h2 
            className={`text-3xl md:text-5xl font-bold mb-6 transition-all duration-700 transform ${
              isVisible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'
            }`}
          >
            Autumn Is Coming
          </h2>
          <p 
            className={`text-lg md:text-xl mb-10 max-w-xl mx-auto transition-all duration-700 delay-300 transform ${
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
