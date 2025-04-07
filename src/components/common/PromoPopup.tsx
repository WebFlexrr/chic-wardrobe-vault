
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PromoPopupProps {
  delay?: number; // Delay in milliseconds before showing popup
}

const PromoPopup: React.FC<PromoPopupProps> = ({ delay = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    // Check if popup has been closed before
    const popupClosed = localStorage.getItem('promoPopupClosed');
    
    if (!popupClosed) {
      const timer = setTimeout(() => {
        setIsVisible(true);
      }, delay);
      
      return () => clearTimeout(timer);
    }
  }, [delay]);
  
  const closePopup = () => {
    setIsVisible(false);
    // Store in localStorage that popup was closed
    localStorage.setItem('promoPopupClosed', 'true');
    
    // Optional: Make popup show again after certain time
    // setTimeout(() => localStorage.removeItem('promoPopupClosed'), 24 * 60 * 60 * 1000); // 24 hours
  };
  
  if (!isVisible) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 animate-fade-in">
      <div className="relative bg-white p-8 rounded-lg shadow-xl max-w-md w-full mx-4 animate-scale-in">
        <button 
          onClick={closePopup}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
          aria-label="Close popup"
        >
          <X size={24} />
        </button>
        
        <div className="text-center">
          <h3 className="text-xl md:text-2xl font-bold mb-2 text-primary-700">Special Offer</h3>
          <p className="text-3xl md:text-4xl font-bold text-primary-900 mb-4">GET 20% OFF</p>
          <p className="text-gray-600 mb-6">Use code <span className="font-bold text-black">WELCOME20</span> at checkout</p>
          
          <div className="border-t border-b border-dashed border-gray-300 py-4 my-4">
            <p className="text-sm text-gray-500">Valid for first-time customers. Expires in 48 hours.</p>
          </div>
          
          <Button 
            onClick={closePopup} 
            className="w-full bg-primary-600 hover:bg-primary-700 text-white py-3"
          >
            Shop Now
          </Button>
          
          <button 
            onClick={closePopup}
            className="mt-4 text-sm text-gray-500 hover:underline"
          >
            No thanks, I'll pay full price
          </button>
        </div>
      </div>
    </div>
  );
};

export default PromoPopup;
