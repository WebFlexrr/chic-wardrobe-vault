
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';
import { getProductsByCategory, categories } from '@/data/products';
import { 
  ChevronDown, 
  SlidersHorizontal, 
  X, 
  Grid3X3, 
  LayoutList,
  ChevronRight
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';

const Category = () => {
  const { categorySlug, subcategorySlug } = useParams<{ categorySlug: string; subcategorySlug?: string }>();
  const [products, setProducts] = useState(getProductsByCategory(categorySlug || ''));
  const [showFilters, setShowFilters] = useState(false);
  const [priceRange, setPriceRange] = useState([0, 200]);
  const [sortOrder, setSortOrder] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  
  const category = categories.find(cat => cat.slug === categorySlug);
  const subcategory = category?.subcategories?.find(sub => sub.slug === subcategorySlug);
  
  // Simulated subcategories if they don't exist in the data
  const displaySubcategories = category?.subcategories || [
    { id: '1', name: 'Casual', slug: 'casual' },
    { id: '2', name: 'Formal', slug: 'formal' },
    { id: '3', name: 'Evening', slug: 'evening' },
    { id: '4', name: 'Seasonal', slug: 'seasonal' }
  ];
  
  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const applyFilters = () => {
    // Filter logic would go here
    setShowFilters(false);
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center text-sm text-gray-600">
            <a href="/" className="hover:text-brand-700">Home</a>
            <ChevronRight size={14} className="mx-2" />
            <a href="/all-products" className="hover:text-brand-700">All Products</a>
            {category && (
              <>
                <ChevronRight size={14} className="mx-2" />
                <span className="font-medium text-gray-900">{category.name}</span>
              </>
            )}
            {subcategory && (
              <>
                <ChevronRight size={14} className="mx-2" />
                <span className="font-medium text-gray-900">{subcategory.name}</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Banner */}
      <div 
        className="bg-cover bg-center h-80 relative"
        style={{ backgroundImage: `url(${category?.featuredImage || category?.image || '/assets/categories/placeholder.jpg'})` }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="text-center text-white max-w-2xl px-4">
            <h1 className="text-4xl md:text-5xl font-playfair font-bold mb-4">
              {subcategory ? subcategory.name : category?.name || 'Products'}
            </h1>
            <p className="text-lg md:text-xl font-light">
              {category?.description || 'Explore our exclusive collection crafted with care and attention to detail.'}
            </p>
          </div>
        </div>
      </div>

      {/* Subcategory chips */}
      <div className="bg-white py-6 border-b">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto pb-2 space-x-3 no-scrollbar">
           <Link to={`/category/${category.slug}`}> <button  className="category-filter-chip active whitespace-nowrap">
              All {category?.name || 'Products'}
            </button>
            </Link>
            
            {displaySubcategories.map((subcat) => (
               <Link key={subcat.id}  to={`/category/${category.slug}/${subcat.slug}`}><button 
                
                className={`category-filter-chip whitespace-nowrap ${subcategorySlug === subcat.slug ? 'active' : ''}`}
              >
                {subcat.name}
              </button>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters for Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <div className="sticky top-24">
              <h2 className="text-xl font-medium mb-6 font-playfair">Filters</h2>
              
              {/* Price Range */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Price Range</h3>
                  <div className="px-2">
                    <Slider
                      defaultValue={[0, 200]}
                      max={500}
                      step={10}
                      value={priceRange}
                      onValueChange={setPriceRange}
                      className="mb-6"
                    />
                    <div className="flex justify-between mt-2 text-sm text-gray-600">
                      <span>${priceRange[0]}</span>
                      <span>${priceRange[1]}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Colors */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Colors</h3>
                  <div className="space-y-3">
                    <div className="flex items-center">
                      <Checkbox id="color-black" className="border-2" />
                      <label htmlFor="color-black" className="ml-3 text-sm cursor-pointer">Black</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="color-blue" className="border-2" />
                      <label htmlFor="color-blue" className="ml-3 text-sm cursor-pointer">Blue</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="color-green" className="border-2" />
                      <label htmlFor="color-green" className="ml-3 text-sm cursor-pointer">Green</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="color-red" className="border-2" />
                      <label htmlFor="color-red" className="ml-3 text-sm cursor-pointer">Red</label>
                    </div>
                    <div className="flex items-center">
                      <Checkbox id="color-white" className="border-2" />
                      <label htmlFor="color-white" className="ml-3 text-sm cursor-pointer">White</label>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              {/* Sizes */}
              <Card className="mb-6">
                <CardContent className="pt-6">
                  <h3 className="font-medium mb-4">Sizes</h3>
                  <div className="grid grid-cols-3 gap-2">
                    {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                      <div 
                        key={size}
                        className="border border-gray-300 rounded-md text-center py-2 cursor-pointer hover:border-black hover:bg-black hover:text-white transition-all duration-200"
                      >
                        {size}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Apply Button */}
              <Button className="w-full bg-black hover:bg-gray-800 text-white">
                Apply Filters
              </Button>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            {/* Mobile filter and sort controls */}
            <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
              <Button 
                variant="outline"
                className="flex items-center md:hidden"
                onClick={toggleFilters}
              >
                <SlidersHorizontal size={16} className="mr-2" />
                Filters
              </Button>
              
              <div className="flex items-center space-x-4">
                <div className="hidden md:flex items-center space-x-2">
                  <button 
                    onClick={() => setViewMode('grid')} 
                    className={`p-1.5 border rounded ${viewMode === 'grid' ? 'bg-gray-100' : ''}`}
                  >
                    <Grid3X3 size={18} />
                  </button>
                  <button 
                    onClick={() => setViewMode('list')} 
                    className={`p-1.5 border rounded ${viewMode === 'list' ? 'bg-gray-100' : ''}`}
                  >
                    <LayoutList size={18} />
                  </button>
                </div>
                
                <div className="flex items-center">
                  <span className="text-sm text-gray-600 mr-2 hidden sm:inline">Sort by:</span>
                  <select 
                    className="border border-gray-300 rounded-md px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-black"
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
            </div>
            
            <p className="text-sm text-gray-500 mb-6">Showing {products.length} results</p>
            
            {/* Product grid */}
            <div className={`
              ${viewMode === 'grid' 
                ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8'
                : 'space-y-6'}
            `}>
              {products.map((product) => (
                <div key={product.id} className={viewMode === 'list' ? 'border-b pb-6' : ''}>
                  <ProductCard key={product.id} product={product} />
                </div>
              ))}
            </div>
            
            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <div className="flex gap-2">
                <Button variant="outline" className="px-4 text-gray-700 border-gray-300">Prev</Button>
                <Button className="bg-black hover:bg-gray-800 px-4">1</Button>
                <Button variant="outline" className="px-4 text-gray-700 border-gray-300">2</Button>
                <Button variant="outline" className="px-4 text-gray-700 border-gray-300">3</Button>
                <Button variant="outline" className="px-4 text-gray-700 border-gray-300">Next</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile Filters Drawer */}
      <div className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity ${showFilters ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
        <div className={`absolute right-0 top-0 bottom-0 w-80 bg-white transform transition-transform h-full ${showFilters ? 'translate-x-0' : 'translate-x-full'}`}>
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium font-playfair">Filters</h2>
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
            
            <Separator className="my-4" />
            
            {/* Colors */}
            <div className="mb-8">
              <h3 className="font-medium mb-4">Colors</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <Checkbox id="mobile-color-black" className="border-2" />
                  <label htmlFor="mobile-color-black" className="ml-3 text-sm cursor-pointer">Black</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="mobile-color-blue" className="border-2" />
                  <label htmlFor="mobile-color-blue" className="ml-3 text-sm cursor-pointer">Blue</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="mobile-color-green" className="border-2" />
                  <label htmlFor="mobile-color-green" className="ml-3 text-sm cursor-pointer">Green</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="mobile-color-red" className="border-2" />
                  <label htmlFor="mobile-color-red" className="ml-3 text-sm cursor-pointer">Red</label>
                </div>
                <div className="flex items-center">
                  <Checkbox id="mobile-color-white" className="border-2" />
                  <label htmlFor="mobile-color-white" className="ml-3 text-sm cursor-pointer">White</label>
                </div>
              </div>
            </div>
            
            <Separator className="my-4" />
            
            {/* Sizes */}
            <div className="mb-8">
              <h3 className="font-medium mb-4">Sizes</h3>
              <div className="grid grid-cols-3 gap-2">
                {['XS', 'S', 'M', 'L', 'XL', 'XXL'].map((size) => (
                  <div 
                    key={size}
                    className="border border-gray-300 rounded-md text-center py-2 cursor-pointer hover:border-black hover:bg-black hover:text-white transition-all duration-200"
                  >
                    {size}
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-200 bg-white">
            <div className="flex gap-3">
              <Button 
                variant="outline"
                className="flex-1"
                onClick={toggleFilters}
              >
                Cancel
              </Button>
              <Button 
                className="flex-1 bg-black hover:bg-gray-800"
                onClick={applyFilters}
              >
                Apply
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Category;
