
import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '@/data/products';
import Layout from '@/components/layout/Layout';
import { Heart, Share2, ShoppingBag, ChevronRight, Star, Truck, RotateCcw, ShieldCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from '@/hooks/use-toast';
import { useAppStore } from '@/store';
import { toast } from 'sonner';

const Product = () => {
  const { id } = useParams<{ id: string }>();
  const product = getProductById(id || '');
  const { toast } = useToast();
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useAppStore();
  
  const [selectedColor, setSelectedColor] = useState(product?.colors[0].name || '');
  const [selectedSize, setSelectedSize] = useState(product?.sizes[0] || '');
  const [quantity, setQuantity] = useState(1);
  const [mainImage, setMainImage] = useState(product?.images[0] || '');
  
  const productInWishlist = product ? isInWishlist(product.id) : false;

  if (!product) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Product Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the product you're looking for.</p>
          <Button asChild>
            <Link to="/all-products">Continue Shopping</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const handleAddToCart = () => {
    addToCart({
      productId: product.id,
      quantity: quantity,
      color: selectedColor,
      size: selectedSize,
    });
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleAddToWishlist = () => {
    if (productInWishlist) {
      removeFromWishlist(product.id);
      toast({
        title: "Removed from wishlist",
        description: `${product.name} has been removed from your wishlist.`,
      });
    } else {
      addToWishlist(product.id);
      toast({
        title: "Added to wishlist",
        description: `${product.name} has been added to your wishlist.`,
      });
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const changeMainImage = (image: string) => {
    setMainImage(image);
  };

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        {/* Breadcrumbs */}
        <div className="text-sm text-gray-500 mb-6 flex items-center">
          <Link to="/" className="hover:text-brand-600">Home</Link>
          <ChevronRight size={12} className="mx-2" />
          <Link to={`/category/${product.category.toLowerCase()}`} className="hover:text-brand-600">
            {product.category}
          </Link>
          {product.subcategory && (
            <>
              <ChevronRight size={12} className="mx-2" />
              <Link 
                to={`/category/${product.category.toLowerCase()}/${product.subcategory.toLowerCase()}`} 
                className="hover:text-brand-600"
              >
                {product.subcategory}
              </Link>
            </>
          )}
          <ChevronRight size={12} className="mx-2" />
          <span className="text-gray-800">{product.name}</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-gray-100">
              <img 
                src={mainImage} 
                alt={product.name} 
                className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
              />
            </div>
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <div 
                  key={index}
                  className={`aspect-square rounded-md overflow-hidden cursor-pointer border-2 transition-all ${
                    mainImage === image ? 'border-brand-600' : 'border-transparent hover:border-gray-300'
                  }`}
                  onClick={() => changeMainImage(image)}
                >
                  <img 
                    src={image} 
                    alt={`${product.name} view ${index + 1}`} 
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.name}</h1>
            
            <div className="flex items-center mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    size={16} 
                    className={i < Math.floor(product.rating) ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">{product.rating} ({product.reviews.length} reviews)</span>
            </div>
            
            <div className="mb-6">
              <div className="flex items-center">
                <span className="text-2xl font-bold text-gray-900">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                  <span className="ml-2 text-gray-500 line-through">${product.originalPrice.toFixed(2)}</span>
                )}
                {product.originalPrice && (
                  <span className="ml-2 bg-red-100 text-red-600 text-xs px-2 py-1 rounded">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </span>
                )}
              </div>
              <p className="text-sm text-gray-500 mt-1">
                {product.stock > 0 ? (
                  <span className="text-green-600">In Stock ({product.stock} available)</span>
                ) : (
                  <span className="text-red-600">Out of Stock</span>
                )}
              </p>
            </div>
            
            <p className="text-gray-600 mb-6">{product.description}</p>
            
            {/* Colors */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Colors</h3>
              <div className="flex gap-2">
                {product.colors.map((color) => (
                  <button 
                    key={color.name}
                    className={`w-10 h-10 rounded-full border-2 transition-all ${
                      selectedColor === color.name ? 'border-brand-600 shadow-md' : 'border-transparent'
                    }`}
                    style={{ backgroundColor: color.value }}
                    onClick={() => setSelectedColor(color.name)}
                    title={color.name}
                    aria-label={`Select ${color.name} color`}
                  ></button>
                ))}
              </div>
            </div>
            
            {/* Sizes */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="text-sm font-medium text-gray-700">Sizes</h3>
                <button className="text-sm text-brand-600 hover:text-brand-700">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button 
                    key={size}
                    className={`w-12 h-12 flex items-center justify-center rounded-md border transition-all ${
                      selectedSize === size 
                        ? 'border-brand-600 bg-brand-50 text-brand-700' 
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onClick={() => setSelectedSize(size)}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Quantity */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-gray-700 mb-2">Quantity</h3>
              <div className="flex items-center">
                <button 
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-l-md"
                  onClick={decreaseQuantity}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <div className="w-16 h-10 flex items-center justify-center border-t border-b border-gray-300">
                  {quantity}
                </div>
                <button 
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-r-md"
                  onClick={increaseQuantity}
                  disabled={quantity >= product.stock}
                >
                  +
                </button>
              </div>
            </div>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-6">
              <Button 
                className="flex-1 bg-brand-600 hover:bg-brand-700 text-white py-3 h-12"
                onClick={handleAddToCart}
                disabled={product.stock === 0}
              >
                <ShoppingBag size={18} className="mr-2" />
                {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </Button>
              <Button 
                variant="outline"
                className="flex-1 border-brand-600 text-brand-600 hover:bg-brand-50 py-3 h-12"
                onClick={handleAddToWishlist}
              >
                <Heart size={18} className="mr-2" />
                Add to Wishlist
              </Button>
            </div>
            
            {/* Product Benefits */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-b border-gray-200 py-6 mb-8">
              <div className="flex items-center">
                <Truck size={20} className="text-brand-600 mr-2" />
                <span className="text-sm">Free shipping on orders over $100</span>
              </div>
              <div className="flex items-center">
                <RotateCcw size={20} className="text-brand-600 mr-2" />
                <span className="text-sm">30-day easy returns</span>
              </div>
              <div className="flex items-center">
                <ShieldCheck size={20} className="text-brand-600 mr-2" />
                <span className="text-sm">2-year warranty</span>
              </div>
            </div>
            
            {/* Social Share */}
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">Share:</span>
              <a href="#" className="text-gray-500 hover:text-blue-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-400">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
              </a>
              <a href="#" className="text-gray-500 hover:text-red-600">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Product Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="description">
            <TabsList className="w-full border-b border-gray-200">
              <TabsTrigger value="description" className="text-base py-3">Description</TabsTrigger>
              <TabsTrigger value="reviews" className="text-base py-3">Reviews ({product.reviews.length})</TabsTrigger>
              <TabsTrigger value="shipping" className="text-base py-3">Shipping & Returns</TabsTrigger>
            </TabsList>
            <TabsContent value="description" className="pt-6">
              <div className="prose max-w-none">
                <h3 className="text-xl font-semibold mb-4">Product Details</h3>
                <p className="mb-4">{product.description}</p>
                <p className="mb-4">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
                <h4 className="text-lg font-medium mt-6 mb-2">Fabric & Care</h4>
                <ul className="list-disc pl-5 mb-4">
                  <li>Premium quality fabric</li>
                  <li>Machine wash cold</li>
                  <li>Tumble dry low</li>
                  <li>Do not bleach</li>
                  <li>Iron on low heat if needed</li>
                </ul>
              </div>
            </TabsContent>
            <TabsContent value="reviews" className="pt-6">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h3 className="text-xl font-semibold">Customer Reviews</h3>
                  <Button variant="outline">Write a Review</Button>
                </div>
                
                <div className="space-y-6">
                  {product.reviews.length > 0 ? (
                    product.reviews.map((review) => (
                      <div key={review.id} className="border-b border-gray-200 pb-6">
                        <div className="flex justify-between items-start mb-2">
                          <div>
                            <h4 className="font-medium">{review.userName}</h4>
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star 
                                  key={i} 
                                  size={14} 
                                  className={i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} 
                                />
                              ))}
                              <span className="ml-2 text-sm text-gray-500">
                                {new Date(review.date).toLocaleDateString('en-US', { 
                                  year: 'numeric', 
                                  month: 'long', 
                                  day: 'numeric' 
                                })}
                              </span>
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500">No reviews yet. Be the first to review this product!</p>
                  )}
                </div>
              </div>
            </TabsContent>
            <TabsContent value="shipping" className="pt-6">
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-medium mb-2">Shipping Information</h3>
                  <p className="text-gray-600">We offer free standard shipping on all orders over $100. For orders under $100, a flat rate of $8.95 applies.</p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600">
                    <li>Standard Shipping: 3-5 business days</li>
                    <li>Express Shipping: 1-2 business days ($12.95)</li>
                    <li>Next Day Delivery: Available for orders placed before 12pm EST ($19.95)</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="text-lg font-medium mb-2">Return Policy</h3>
                  <p className="text-gray-600">We offer a 30-day return policy for all unworn and unwashed items with original tags attached. Return shipping is free for store credit, or $7.95 for refunds to the original payment method.</p>
                  <p className="text-gray-600 mt-2">For more information, please visit our <Link to="/return-policy" className="text-brand-600 hover:underline">Return Policy</Link> page.</p>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Product;
