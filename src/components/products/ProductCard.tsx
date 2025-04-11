
import React from "react";
import { Link } from "react-router-dom";
import { Heart, ShoppingBag } from "lucide-react";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { useProductActions } from "@/hooks/use-product-actions";
import { Badge } from "../ui/badge";
import { useAppStore } from "@/store";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { handleQuickAddToCart, handleToggleWishlist, isInWishlist } = useProductActions();
  const productInWishlist = isInWishlist(product.id);
  
  const mainImage =
    product.images && product.images.length > 0
      ? product.images[0]
      : "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=600";
  const hoverImage =
    product.images && product.images.length > 1 ? product.images[1] : mainImage;

  return (
    <Link to={`/product/${product.id}`} className="product-card group">
      {/* Badges */}
      {product.newArrival && (
        <div className="absolute top-2 left-2 z-10 bg-brand-600 text-white px-2 py-1 text-xs rounded">
          New
        </div>
      )}
      {product.originalPrice && product.originalPrice > product.price && (
        <div className="absolute top-2 right-2 z-10 bg-red-500 text-white px-2 py-1 text-xs rounded">
          {Math.round(
            ((product.originalPrice - product.price) / product.originalPrice) *
              100
          )}
          % OFF
        </div>
      )}

      {/* Image */}
      <div className="product-card-image-container relative aspect-square overflow-hidden rounded-md">
        <img
          src={mainImage}
          alt={product.name}
          className="product-card-image transition-opacity duration-300 group-hover:opacity-0 w-full h-full object-cover"
        />
        <img
          src={hoverImage}
          alt={`${product.name} - alternate view`}
          className="product-card-image absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100 w-full h-full object-cover"
        />

        {/* Hover overlay with buttons */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
          <div className="flex gap-2 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleToggleWishlist(product);
              }}
              className={`rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-md ${
                productInWishlist 
                  ? "bg-primary-100 text-primary-600 hover:bg-primary-200" 
                  : "bg-white text-gray-800 hover:bg-brand-50"
              }`}
              size="icon"
              aria-label={productInWishlist ? "Remove from wishlist" : "Add to wishlist"}
            >
              <Heart size={18} className={productInWishlist ? "fill-primary-600" : ""} />
            </Button>
            <Button
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleQuickAddToCart(product);
              }}
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
      <div className="p-4 flex flex-col gap-6">
        <div className="w-full flex flex-col ">
          {product.bestseller && <span className="w-fit font-bold text-sm text-primary">Best Sellers</span>}
          <h3 className="font-semibold text-gray-800 mb-1 transition-colors group-hover:text-brand-600">
            {product.name}
          </h3>
          <p className="truncate text-sm">{product.description}</p>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className=" text-xl text-gray-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-gray-500 line-through text-sm">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center">
            <span className="text-yellow-400">★</span>
            <span className="text-sm text-gray-600 ml-1">{product.rating}</span>
          </div>
        </div>
        <div className="w-full flex flex-col gap-3">
          <Button 
            className="w-full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleQuickAddToCart(product);
            }}
          > 
            Add to Cart
          </Button>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
