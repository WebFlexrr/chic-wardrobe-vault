
import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroBanner from '@/components/home/HeroBanner';
import ProductSection from '@/components/home/ProductSection';
import CategoriesSection from '@/components/home/CategoriesSection';
import PromoSection from '@/components/home/PromoSection';
import FeaturedProduct from '@/components/home/FeaturedProduct';
import { getFeaturedProducts, getBestsellerProducts, getNewArrivals } from '@/data/products';

const Index = () => {
  const featuredProducts = getFeaturedProducts();
  const bestsellerProducts = getBestsellerProducts();
  const newArrivals = getNewArrivals();

  return (
    <Layout>
      <HeroBanner />
      
      <ProductSection
        title="New Arrivals"
        subtitle="Discover our latest styles for the season"
        products={newArrivals}
        viewAllLink="/all-products?filter=new-arrivals"
        bgColor="bg-white"
      />
      
      <CategoriesSection />
      
      <ProductSection
        title="Best Sellers"
        subtitle="Our most popular styles loved by customers"
        products={bestsellerProducts}
        viewAllLink="/all-products?filter=best-sellers"
        bgColor="bg-gray-50"
      />
      
      <PromoSection />
      
      <FeaturedProduct product={featuredProducts[0]} />
    </Layout>
  );
};

export default Index;
