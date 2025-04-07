
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const DesktopNavigation = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const handleCategoryHover = (categoryId: string) => {
    setActiveCategory(categoryId);
  };

  return (
    <nav className="hidden md:flex items-center space-x-8">
      <Link to="/" className="text-gray-800 hover:text-primary-600 font-medium">
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
            className="text-gray-800 hover:text-primary-600 font-medium"
          >
            {category.name}
          </Link>
          {category.subcategories && activeCategory === category.id && (
            <div 
              className="absolute left-0 mt-2 w-64 bg-white shadow-lg rounded-md overflow-hidden z-50 animate-fade-in py-3"
              onClick={(e) => e.stopPropagation()}
            >
              {category.subcategories.map((subcategory) => (
                <Link
                  key={subcategory.id}
                  to={`/category/${category.slug}/${subcategory.slug}`}
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-primary-50 hover:text-primary-600"
                >
                  {subcategory.name}
                </Link>
              ))}
            </div>
          )}
        </div>
      ))}
      <Link to="/all-products" className="text-gray-800 hover:text-primary-600 font-medium">
        All Products
      </Link>
    </nav>
  );
};

export default DesktopNavigation;
