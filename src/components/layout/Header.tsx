
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store';
import { useIsMobile } from '@/hooks/use-mobile';
import DesktopNavigation from './header/DesktopNavigation';
import MobileNavigation from './header/MobileNavigation';
import HeaderIcons from './header/HeaderIcons';
import SearchBar from './header/SearchBar';

// Sample products for search suggestions
const sampleProducts = [
  { id: 'p1', name: 'Classic White T-Shirt' },
  { id: 'p2', name: 'Black Denim Jeans' },
  { id: 'p3', name: 'Summer Floral Dress' },
  { id: 'p7', name: 'Leather Jacket' },
  { id: 'p5', name: 'Pleated Midi Skirt' },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchSuggestions, setSearchSuggestions] = useState<Array<{ id: string; name: string }>>([]);
  const isMobile = useIsMobile();
  
  const { search, setSearchOpen } = useAppStore();
  const { isSearchOpen, searchQuery } = search;

  useEffect(() => {
    // Filter products based on search query
    if (searchQuery && searchQuery.length > 1) {
      const filtered = sampleProducts.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchSuggestions(filtered);
    } else {
      setSearchSuggestions([]);
    }
  }, [searchQuery]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 flex items-center bg-white shadow-md h-20"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-primary-600">
            <img src={"/logo.png"} alt="Logo" width={80} />
          </Link>

          {/* Desktop Navigation */}
          <DesktopNavigation />

          {/* Icons */}
          <HeaderIcons 
            onSearchToggle={toggleSearch} 
            mobileMenuOpen={mobileMenuOpen} 
            onMobileMenuToggle={toggleMobileMenu} 
          />
        </div>

        {/* Search Bar */}
        <SearchBar 
          searchSuggestions={searchSuggestions}
          setSearchSuggestions={setSearchSuggestions}
        />
      </div>

      {/* Mobile Menu */}
      <MobileNavigation 
        isOpen={mobileMenuOpen} 
        onClose={() => setMobileMenuOpen(false)} 
      />
    </header>
  );
};

export default Header;
