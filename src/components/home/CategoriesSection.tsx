
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '@/data/products';

const CategoriesSection = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title inline-block">Shop By Category</h2>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Explore our curated collections designed for modern professional women
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category) => (
            <Link 
              key={category.id} 
              to={`/category/${category.slug}`}
              className="relative overflow-hidden rounded-lg shadow-md hover-scale group h-64"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10"></div>
              <img 
                src={category.image || '/assets/categories/placeholder.jpg'} 
                alt={category.name} 
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20 text-white">
                <h3 className="text-xl font-bold">{category.name}</h3>
                <p className="text-sm mt-1 text-gray-200">{category.description}</p>
                <span className="inline-block mt-2 text-sm font-medium border-b border-white transition-colors group-hover:border-brand-400 group-hover:text-brand-200">
                  Explore Collection
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategoriesSection;
