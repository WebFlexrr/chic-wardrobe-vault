
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { getProductsByCategory, categories } from '@/data/products';
import { ChevronDown, SlidersHorizontal, X } from 'lucide-react';

const Category = () => {
  const { categorySlug, subcategorySlug } = useParams<{ categorySlug: string; subcategorySlug?: string }>();
  const [products, setProducts] = useState(getProductsByCategory(categorySlug || ''));
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortOrder, setSortOrder] = useState('featured');
  
  const category = categories.find(cat => cat.slug === categorySlug);
  const subcategory = category?.subcategories?.find(sub => sub.slug === subcategorySlug);
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const applyFilters = () => {
    // Filter logic would go here
    setShowFilters(false);
  };

  return (
    <Layout>
      {/* Banner */}
      <div 
        className="bg-cover bg-center h-64 relative"
        style={{ backgroundImage: `url(${category?.featuredImage || category?.image || '/assets/categories/placeholder.jpg'})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-2">
              {subcategory ? subcategory.name : category?.name || 'Products'}
            </h1>
            <p className="text-lg">
              {category?.description || 'Explore our collection'}
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters for Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-xl font-bold mb-6">Filters</h2>
              
              {/* Price Range */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Price Range</h3>
                <div className="px-2">
                  <Slider
                    defaultValue={[0, 200]}
                    max={500}
                    step={10}
                    value={priceRange}
                    onValueChange={setPriceRange}
                  />
                  <div className="flex justify-between mt-2 text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                </div>
              </div>
              
              {/* Colors */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Colors</h3>
                <div className="space-y-2">
                  <div className="flex items-center">
                    <Checkbox id="color-black" />
                    <label htmlFor="color-black" className="ml-2 text-sm cursor-pointer">Black</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="color-blue" />
                    <label htmlFor="color-blue" className="ml-2 text-sm cursor-pointer">Blue</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="color-green" />
                    <label htmlFor="color-green" className="ml-2 text-sm cursor-pointer">Green</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="color-red" />
                    <label htmlFor="color-red" className="ml-2 text-sm cursor-pointer">Red</label>
                  </div>
                  <div className="flex items-center">
                    <Checkbox id="color-white" />
                    <label htmlFor="color-white" className="ml-2 text-sm cursor-pointer">White</label>
                  </div>
                </div>
              </div>
              
              {/* Sizes */}
              <div className="mb-8">
                <h3 className="font-medium mb-4">Sizes</h3>
                <div className="grid grid-cols-3 gap-2">
                  {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                    <div 
                      key={size}
                      className="border border-gray-300 rounded-md text-center py-2 cursor-pointer hover:border-brand-500 hover:bg-brand-50"
                    >
                      {size}
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Apply Button */}
              <Button className="w-full bg-brand-600 hover:bg-brand-700">Apply Filters</Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Mobile filter and sort controls */}
            <div className="flex justify-between items-center mb-6">
              <Button 
                variant="outline"
                className="flex items-center md:hidden"
                onClick={toggleFilters}
              >
                <SlidersHorizontal size={16} className="mr-2" />
                Filters
              </Button>
              
              <div className="flex items-center">
                <span className="text-sm text-gray-600 mr-2 hidden sm:inline">Sort by:</span>
                <select 
                  className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(e.target.value)}
                >
                  <option value="featured">Featured</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="newest">Newest</option>
                </select>
              </div>
            </div>
            
            {/* Product grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <Button variant="outline" className="px-4">Prev</Button>
                <Button className="bg-brand-600 hover:bg-brand-700 px-4">1</Button>
                <Button variant="outline" className="px-4">2</Button>
                <Button variant="outline" className="px-4">3</Button>
                <Button variant="outline" className="px-4">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Filters Drawer */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${showFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute right-0 top-0 bottom-0 w-80 bg-white transform transition-transform ${showFilters ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-bold">Filters</h2>
            <button onClick={toggleFilters} className="text-gray-500 hover:text-gray-800">
              <X size={24} />
            </button>
          </div>
          
          <div className="p-4 overflow-y-auto h-[calc(100%-80px)]">
            {/* Price Range */}
            <div className="mb-8">
              <h3 className="font-medium mb-4">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[0, 200]}
                  max={500}
                  step={10}
                  value={priceRange}
                  onValueChange={setPriceRange}
                />
                <div className="flex justify-between mt-2 text-sm text-gray-600">
                  <span>${priceRange[0]}</span>
                  <span>${priceRange[1]}</span>
                </div>
              </div>
            </div>
            
            {/* Colors */}
            <div className="mb-8">
              <h3 className="font-medium mb-4">Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="mobile-color-black" />
                  <label htmlFor="mobile-color-black" className="ml-2 text-sm cursor-pointer">Black</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="mobile-color-blue" />
                  <label htmlFor="mobile-color-blue" className="ml-2 text-sm cursor-pointer">Blue</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="mobile-color-green" />
                  <label htmlFor="mobile-color-green" className="ml-2 text-sm cursor-pointer">Green</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="mobile-color-red" />
                  <label htmlFor="mobile-color-red" className="ml-2 text-sm cursor-pointer">Red</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="mobile-color-white" />
                  <label htmlFor="mobile-color-white" className="ml-2 text-sm cursor-pointer">White</label>
                </div>
              </div>
            </div>
            
            {/* Sizes */}
            <div className="mb-8">
              <h3 className="font-medium mb-4">Sizes</h3>
              <div className="grid grid-cols-3 gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <div 
                    key={size}
                    className="border border-gray-300 rounded-md text-center py-2 cursor-pointer hover:border-brand-500 hover:bg-brand-50"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <Button 
              className="w-full bg-brand-600 hover:bg-brand-700"
              onClick={applyFilters}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
