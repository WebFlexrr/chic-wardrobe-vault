
import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { categories } from '@/data/products';
import { useIsMobile } from '@/hooks/use-mobile';
import { useAppStore } from '@/store';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const isMobile = useIsMobile();
  const searchInputRef = useRef<HTMLInputElement>(null);
  
  const { search, setSearchOpen, setSearchQuery, cart } = useAppStore();
  const { isSearchOpen } = search;
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const handleCategoryHover = (categoryId: string) => {
    if (!isMobile) {
      setActiveCategory(categoryId);
    }
  };

  const toggleSearch = () => {
    setSearchOpen(!isSearchOpen);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Search submitted:', search.searchQuery);
    setSearchOpen(false);
  };

  return (
    <header 
      className="fixed top-0 left-0 right-0 z-50 bg-white shadow-md py-3"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="text-2xl font-bold text-brand-600">
            CHIC<span className="text-brand-800">VAULT</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
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
                  <div className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden z-50 animate-fade-in py-3">
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
          <div className="flex items-center space-x-5">
            <button 
              onClick={toggleSearch} 
              className="text-gray-800 hover:text-brand-600"
              aria-label="Search"
            >
              <Search size={20} />
            </button>
            <Link to="/wishlist" className="text-gray-800 hover:text-brand-600" aria-label="Wishlist">
              <Heart size={20} />
            </Link>
            <Link to="/cart" className="text-gray-800 hover:text-brand-600 relative" aria-label="Cart">
              <ShoppingBag size={20} />
              {cartItemCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </Link>
            <Link to="/account" className="text-gray-800 hover:text-brand-600" aria-label="Account">
              <User size={20} />
            </Link>

            {/* Mobile Menu Button */}
            <button 
              className="md:hidden text-gray-800 focus:outline-none" 
              onClick={toggleMobileMenu}
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="absolute left-0 right-0 bg-white shadow-md mt-2 py-4 px-4 animate-fade-in">
            <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto">
              <div className="flex">
                <Input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search for products..."
                  className="flex-grow"
                  value={search.searchQuery}
                  onChange={handleSearchChange}
                />
                <Button type="submit" className="ml-2 bg-brand-600 hover:bg-brand-700">
                  Search
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className="ml-2" 
                  onClick={() => setSearchOpen(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          </div>
        )}
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
