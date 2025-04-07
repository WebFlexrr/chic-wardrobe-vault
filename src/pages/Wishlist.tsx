
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, X } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { useAppStore } from '@/store';
import { getProductById } from '@/data/products';
import { toast } from 'sonner';

const Wishlist = () => {
  // Fake wishlist items with IDs from products.ts
  const wishlistItems = [
    {
      productId: "p1", // Matches IDs from data/products.ts
      addedAt: new Date()
    },
    {
      productId: "p2", 
      addedAt: new Date()
    },
    {
      productId: "p7",
      addedAt: new Date()
    },
    {
      productId: "p5",
      addedAt: new Date()
    },
    {
      productId: "p10",
      addedAt: new Date()
    },
    {
      productId: "p3",
      addedAt: new Date()
    }
  ];
  
  const hasItems = wishlistItems.length > 0;
  const { addToCart } = useAppStore();

  const handleAddToCart = (productId: string) => {
    addToCart({
      productId,
      quantity: 1,
      color: 'default',
      size: 'M'
    });
    toast.success("Added to cart");
  };

  const handleRemoveFromWishlist = (productId: string) => {
    // This would remove from wishlist - demo only
    toast.success("Removed from wishlist");
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-20">
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
              <Button asChild className="bg-primary-600 hover:bg-primary-700">
                <Link to="/all-products">Explore Products</Link>
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {wishlistItems.map((item) => {
              const product = getProductById(item.productId);
              if (!product) return null;
              
              return (
                <Card key={item.productId} className="group relative">
                  <div className="absolute top-3 right-3 z-10">
                    <button
                      onClick={() => handleRemoveFromWishlist(item.productId)}
                      className="bg-white p-2 rounded-full shadow hover:bg-gray-100"
                      aria-label="Remove from wishlist"
                    >
                      <X size={16} />
                    </button>
                  </div>
                  
                  <Link to={`/product/${product.id}`}>
                    <div className="aspect-[3/4] overflow-hidden">
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  
                  <CardContent className="pt-4">
                    <Link to={`/product/${product.id}`} className="hover:text-primary-600">
                      <h3 className="font-medium line-clamp-1">{product.name}</h3>
                    </Link>
                    <p className="text-sm text-gray-500 mb-2">{product.category}</p>
                    <p className="font-medium">${product.price.toFixed(2)}</p>
                  </CardContent>
                  
                  <CardFooter className="pt-0">
                    <Button 
                      onClick={() => handleAddToCart(product.id)}
                      className="w-full bg-primary-600 hover:bg-primary-700 flex items-center justify-center gap-2"
                    >
                      <ShoppingBag size={16} />
                      Add to Cart
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Wishlist;
