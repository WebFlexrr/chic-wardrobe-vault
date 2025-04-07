
import React, { useEffect, useState } from 'react';
import Header from './Header';
import Footer from './Footer';
import AnnouncementBar from '../common/AnnouncementBar';
import PromoPopup from '../common/PromoPopup';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const [showPromo, setShowPromo] = useState(false);
  
  useEffect(() => {
    // Check if popup has been shown before
    const hasSeenPromo = localStorage.getItem('promoPopupClosed');
    
    if (!hasSeenPromo) {
      // Show promo popup after a short delay
      const timer = setTimeout(() => {
        setShowPromo(true);
      }, 2000);
      
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <div className="flex flex-col min-h-screen">
      <AnnouncementBar />
      <Header />
      <main className="flex-grow pt-20">
        {children}
      </main>
      <Footer />
      {showPromo && <PromoPopup />}
    </div>
  );
};

export default Layout;
