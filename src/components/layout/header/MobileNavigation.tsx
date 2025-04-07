
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

interface MobileNavigationProps {
  isOpen: boolean;
  onClose: () => void;
}

const MobileNavigation = ({ isOpen, onClose }: MobileNavigationProps) => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  if (!isOpen) return null;

  return (
    <div className="md:hidden bg-white shadow-lg absolute top-full left-0 right-0 animate-slide-in z-50">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col space-y-4">
          <Link 
            to="/" 
            className="text-gray-800 hover:text-primary-600 font-medium py-2 border-b"
            onClick={onClose}
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
                  className="text-gray-800 hover:text-primary-600 font-medium"
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
                      className="text-sm text-gray-700 hover:text-primary-600"
                      onClick={onClose}
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
            className="text-gray-800 hover:text-primary-600 font-medium py-2 border-b"
            onClick={onClose}
          >
            All Products
          </Link>
          <Link 
            to="/account" 
            className="text-gray-800 hover:text-primary-600 font-medium py-2 border-b"
            onClick={onClose}
          >
            My Account
          </Link>
          <Link 
            to="/wishlist" 
            className="text-gray-800 hover:text-primary-600 font-medium py-2 border-b"
            onClick={onClose}
          >
            Wishlist
          </Link>
          <Link 
            to="/cart" 
            className="text-gray-800 hover:text-primary-600 font-medium py-2 border-b"
            onClick={onClose}
          >
            Cart
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default MobileNavigation;
