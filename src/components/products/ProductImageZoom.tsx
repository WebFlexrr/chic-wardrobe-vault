
import React, { useState, useRef } from 'react';

interface ProductImageZoomProps {
  src: string;
  alt: string;
}

const ProductImageZoom: React.FC<ProductImageZoomProps> = ({ src, alt }) => {
  const [isZoomed, setIsZoomed] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLDivElement>(null);

  const handleMouseEnter = () => {
    setIsZoomed(true);
  };

  const handleMouseLeave = () => {
    setIsZoomed(false);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!imageRef.current) return;
    
    const { left, top, width, height } = imageRef.current.getBoundingClientRect();
    const x = (e.clientX - left) / width;
    const y = (e.clientY - top) / height;
    
    setPosition({ x, y });
  };

  return (
    <div 
      ref={imageRef}
      className="relative overflow-hidden bg-gray-100 rounded-lg aspect-square cursor-zoom-in"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
    >
      <img 
        src={src} 
        alt={alt} 
        className="w-full h-full object-cover transition-all duration-200"
      />
      
      {isZoomed && (
        <div 
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${src})`,
            backgroundPosition: `${position.x * 100}% ${position.y * 100}%`,
            backgroundSize: '200%',
            backgroundRepeat: 'no-repeat',
            zIndex: 10
          }}
        />
      )}
    </div>
  );
};

export default ProductImageZoom;
