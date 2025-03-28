
import { useToast } from './use-toast';
import { useAppStore } from '@/store';
import { Product } from '@/types';

export const useProductActions = () => {
  const { toast } = useToast();
  const { 
    addToCart, 
    cart, 
    addToWishlist, 
    removeFromWishlist, 
    isInWishlist 
  } = useAppStore();

  const handleQuickAddToCart = (product: Product) => {
    // By default add the first size and color
    const cartItem = {
      productId: product.id,
      quantity: 1,
      color: product.colors[0]?.name || 'Default',
      size: product.sizes[0] || 'One Size',
    };
    
    addToCart(cartItem);
    
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const handleToggleWishlist = (product: Product) => {
    const productInWishlist = isInWishlist(product.id);
    
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

  return {
    handleQuickAddToCart,
    handleToggleWishlist,
    isInWishlist,
  };
};
