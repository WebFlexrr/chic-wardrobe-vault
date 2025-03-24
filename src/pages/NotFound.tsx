
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';

const NotFound = () => {
  return (
    <Layout>
      <div className="min-h-[70vh] flex flex-col items-center justify-center px-4">
        <h1 className="text-9xl font-extrabold text-gray-900 mb-4">404</h1>
        <h2 className="text-2xl md:text-4xl font-bold text-gray-800 mb-6 text-center">
          Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-lg text-center">
          The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Button 
            asChild
            className="bg-brand-600 hover:bg-brand-700"
            size="lg"
          >
            <Link to="/">Go to Homepage</Link>
          </Button>
          <Button 
            asChild
            variant="outline"
            className="border-brand-600 text-brand-600 hover:bg-brand-50"
            size="lg"
          >
            <Link to="/all-products">Explore Products</Link>
          </Button>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
