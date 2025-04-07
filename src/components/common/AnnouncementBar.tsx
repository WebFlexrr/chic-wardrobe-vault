
import React, { useState } from 'react';
import { X } from 'lucide-react';

const AnnouncementBar = () => {
  const [isVisible, setIsVisible] = useState(true);
  
  if (!isVisible) return null;
  
  return (
    <div className="bg-primary-600 text-white py-2 px-4 text-center relative">
      <p className="text-sm">
        <span className="font-semibold">Spring Sale!</span> Use code SPRING25 for 25% off all new arrivals
      </p>
      <button 
        onClick={() => setIsVisible(false)} 
        className="absolute right-2 top-1/2 -translate-y-1/2 text-white hover:text-white/80"
        aria-label="Close announcement"
      >
        <X size={16} />
      </button>
    </div>
  );
};

export default AnnouncementBar;
