
import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { toast } = useToast();
  const mainImage = product.images && product.images.length > 0 
    ? product.images[0] 
    : 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600';
  const hoverImage = product.images && product.images.length > 1 
    ? product.images[1] 
    : mainImage;

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to cart logic would go here
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    // Add to wishlist logic would go here
    toast({
      title: "Added to wishlist",
      description: `${product.name} has been added to your wishlist.`,
    });
  };

  return (
    <Link to={`/product/${product.id}`} className="product-card group">
      {/* Badges */}
      {product.newArrival && (
        <div className="absolute top-2 left-2 z-10 bg-brand-600 text-white px-2 py-1 text-xs rounded">New</div>
      )}
      {product.originalPrice && product.originalPrice > product.price && (
        <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 text-xs rounded">
          {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
        </div>
      )}
      
      {/* Image */}
      <div className="product-card-image-container">
        <img 
          src={mainImage} 
          alt={product.name} 
          className="product-card-image transition-opacity duration-300 group-hover:opacity-0"
        />
        <img
          src={hoverImage}
          alt={`${product.name} - alternate view`}
          className="product-card-image absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        />
        
        {/* Hover overlay with buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Button 
              onClick={handleAddToWishlist}
              className="bg-white text-gray-800 hover:bg-brand-50 rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-md"
              size="icon"
              aria-label="Add to wishlist"
            >
              <Heart size={18} />
            </Button>
            <Button 
              onClick={handleAddToCart}
              className="bg-white text-gray-800 hover:bg-brand-50 rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-md"
              size="icon"
              aria-label="Add to cart"
            >
              <ShoppingBag size={18} />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-4">
        <h3 className="font-medium text-gray-800 mb-1 transition-colors group-hover:text-brand-600">{product.name}</h3>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold text-gray-900">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
