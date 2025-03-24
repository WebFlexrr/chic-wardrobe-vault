
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { categories } from '@/data/products';
import { useIsMobile } from '@/hooks/use-mobile';

const Header = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCategoryHover = (categoryId: string) => {
    if (!isMobile) {
      setActiveCategory(categoryId);
    }
  };

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-2' : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-brand-600">
            CHIC<span className="text-brand-800">VAULT</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <Link to="/" className="text-gray-800 hover:text-brand-600 font-medium">
              Home
            </Link>
            {categories.map((category) => (
              <div 
                key={category.id} 
                className="relative group"
                onMouseEnter={() => handleCategoryHover(category.id)}
                onMouseLeave={() => setActiveCategory(null)}
              >
                <Link 
                  to={`/category/${category.slug}`} 
                  className="text-gray-800 hover:text-brand-600 font-medium"
                >
                  {category.name}
                </Link>
                {category.subcategories && activeCategory === category.id && (
                  <div className="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 animate-fade-in py-2">
                    {category.subcategories.map((subcategory) => (
                      <Link
                        key={subcategory.id}
                        to={`/category/${category.slug}/${subcategory.slug}`}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-brand-50 hover:text-brand-600"
                      >
                        {subcategory.name}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <Link to="/all-products" className="text-gray-800 hover:text-brand-600 font-medium">
              All Products
            </Link>
          </nav>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <Link to="/search" className="text-gray-800 hover:text-brand-600">
              <Search size={20} />
            </Link>
            <Link to="/wishlist" className="text-gray-800 hover:text-brand-600">
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="text-gray-800 hover:text-brand-600 relative">
              <ShoppingBag size={20} />
              <span className="absolute -top-2 -right-2 bg-brand-600 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                0
              </span>
            </Link>
            <Link to="/account" className="text-gray-800 hover:text-brand-600">
              <User size={20} />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-800 focus:outline-none" 
              onClick={toggleMobileMenu}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 animate-slide-in">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="/" 
                className="text-gray-800 hover:text-brand-600 font-medium py-2 border-b"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {categories.map((category) => (
                <div key={category.id} className="py-2 border-b">
                  <div 
                    className="flex justify-between items-center"
                    onClick={() => setActiveCategory(activeCategory === category.id ? null : category.id)}
                  >
                    <Link 
                      to={`/category/${category.slug}`} 
                      className="text-gray-800 hover:text-brand-600 font-medium"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {category.name}
                    </Link>
                    <button className="text-gray-600">
                      {activeCategory === category.id ? '-' : '+'}
                    </button>
                  </div>
                  {category.subcategories && activeCategory === category.id && (
                    <div className="mt-2 ml-4 flex flex-col space-y-2 animate-fade-in">
                      {category.subcategories.map((subcategory) => (
                        <Link
                          key={subcategory.id}
                          to={`/category/${category.slug}/${subcategory.slug}`}
                          className="text-sm text-gray-700 hover:text-brand-600"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {subcategory.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Link 
                to="/all-products" 
                className="text-gray-800 hover:text-brand-600 font-medium py-2 border-b"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Products
              </Link>
              <Link 
                to="/account" 
                className="text-gray-800 hover:text-brand-600 font-medium py-2 border-b"
                onClick={() => setMobileMenuOpen(false)}
              >
                My Account
              </Link>
              <Link 
                to="/wishlist" 
                className="text-gray-800 hover:text-brand-600 font-medium py-2 border-b"
                onClick={() => setMobileMenuOpen(false)}
              >
                Wishlist
              </Link>
              <Link 
                to="/cart" 
                className="text-gray-800 hover:text-brand-600 font-medium py-2 border-b"
                onClick={() => setMobileMenuOpen(false)}
              >
                Cart
              </Link>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
