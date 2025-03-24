
import React, { useState } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import ProductCard from '@/components/products/ProductCard';
import { products, getFeaturedProducts, getBestsellerProducts, getNewArrivals } from '@/data/products';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Search } from 'lucide-react';

const AllProducts = () => {
  const [searchParams] = useSearchParams();
  const filterParam = searchParams.get('filter') || 'all';
  const [searchTerm, setSearchTerm] = useState('');
  
  let displayProducts = products;
  if (filterParam === 'featured') {
    displayProducts = getFeaturedProducts();
  } else if (filterParam === 'best-sellers') {
    displayProducts = getBestsellerProducts();
  } else if (filterParam === 'new-arrivals') {
    displayProducts = getNewArrivals();
  }
  
  if (searchTerm) {
    displayProducts = displayProducts.filter(product => 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <Layout>
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-8 text-center">All Products</h1>
        
        {/* Search Bar */}
        <div className="max-w-lg mx-auto mb-10">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <Input
              type="text"
              placeholder="Search products..."
              className="pl-10 border-gray-300 focus:border-brand-500 focus:ring focus:ring-brand-200 focus:ring-opacity-50"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Product Tabs */}
        <Tabs defaultValue={filterParam} className="mb-10">
          <TabsList className="w-full max-w-xl mx-auto grid grid-cols-4">
            <TabsTrigger value="all" asChild>
              <Link to="/all-products">All</Link>
            </TabsTrigger>
            <TabsTrigger value="new-arrivals" asChild>
              <Link to="/all-products?filter=new-arrivals">New Arrivals</Link>
            </TabsTrigger>
            <TabsTrigger value="best-sellers" asChild>
              <Link to="/all-products?filter=best-sellers">Best Sellers</Link>
            </TabsTrigger>
            <TabsTrigger value="featured" asChild>
              <Link to="/all-products?filter=featured">Featured</Link>
            </TabsTrigger>
          </TabsList>
        </Tabs>
        
        {/* Product Grid */}
        {displayProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {displayProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <h3 className="text-xl font-medium mb-4">No products found</h3>
            <p className="text-gray-600 mb-6">Try adjusting your search or filter to find what you're looking for.</p>
            <Button 
              asChild 
              className="bg-brand-600 hover:bg-brand-700"
            >
              <Link to="/all-products">View All Products</Link>
            </Button>
          </div>
        )}
        
        {/* Pagination (simplified) */}
        {displayProducts.length > 0 && (
          <div className="flex justify-center mt-12">
            <div className="flex gap-2">
              <Button variant="outline" className="px-4">Prev</Button>
              <Button className="bg-brand-600 hover:bg-brand-700 px-4">1</Button>
              <Button variant="outline" className="px-4">2</Button>
              <Button variant="outline" className="px-4">3</Button>
              <Button variant="outline" className="px-4">Next</Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AllProducts;
