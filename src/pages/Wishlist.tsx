
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

const Wishlist = () => {
  // This would normally be managed with a wishlist state
  const wishlistItems = [];
  const hasItems = wishlistItems.length > 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Wishlist</h1>
        
        {!hasItems ? (
          <Card className="text-center p-8">
            <CardContent className="pt-6">
              <Heart className="mx-auto mb-4 text-gray-400" size={64} />
              <h2 className="text-2xl font-semibold mb-2">Your wishlist is empty</h2>
              <p className="text-gray-500 mb-6">
                Save your favorite items to come back to them later.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild className="bg-brand-600 hover:bg-brand-700">
                <Link to="/all-products">Explore Products</Link>
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Wishlist items would go here */}
            <p className="col-span-full text-gray-500 text-center py-12">No items in wishlist yet</p>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
