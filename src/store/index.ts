import { create } from 'zustand';
import { getProductById } from '@/data/products';
import { Product } from '@/types';

interface CartItem {
  productId: string;
  quantity: number;
  color: string;
  size: string;
}

interface WishlistItem {
  productId: string;
}

interface SearchState {
  isSearchOpen: boolean;
  searchQuery: string;
}

interface AppState {
  // Cart State
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (productId: string) => void;
  updateCartItemQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  
  // Wishlist State
  wishlist: WishlistItem[];
  addToWishlist: (productId: string) => void;
  removeFromWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  
  // Search State
  search: SearchState;
  setSearchOpen: (isOpen: boolean) => void;
  setSearchQuery: (query: string) => void;
}

export const useAppStore = create<AppState>((set, get) => ({
  // Cart State
  cart: [],
  addToCart: (item) => {
    const { cart } = get();
    const existingItemIndex = cart.findIndex(
      (cartItem) => cartItem.productId === item.productId && 
                   cartItem.color === item.color && 
                   cartItem.size === item.size
    );

    if (existingItemIndex > -1) {
      // Update quantity if item already exists
      const updatedCart = [...cart];
      updatedCart[existingItemIndex].quantity += item.quantity;
      set({ cart: updatedCart });
    } else {
      // Add new item to cart
      set({ cart: [...cart, item] });
    }
  },
  removeFromCart: (productId) => {
    set({ cart: get().cart.filter(item => item.productId !== productId) });
  },
  updateCartItemQuantity: (productId, quantity) => {
    set({ 
      cart: get().cart.map(item => 
        item.productId === productId ? { ...item, quantity } : item
      ) 
    });
  },
  clearCart: () => set({ cart: [] }),
  
  // Wishlist State
  wishlist: [],
  addToWishlist: (productId) => {
    const { wishlist } = get();
    if (!wishlist.some(item => item.productId === productId)) {
      set({ wishlist: [...wishlist, { productId }] });
    }
  },
  removeFromWishlist: (productId) => {
    set({ wishlist: get().wishlist.filter(item => item.productId !== productId) });
  },
  isInWishlist: (productId) => {
    return get().wishlist.some(item => item.productId === productId);
  },
  
  // Search State
  search: {
    isSearchOpen: false,
    searchQuery: '',
  },
  setSearchOpen: (isOpen) => {
    set({ search: { ...get().search, isSearchOpen: isOpen } });
  },
  setSearchQuery: (query) => {
    set({ search: { ...get().search, searchQuery: query } });
  },
}));

// Helper functions that use the store
export const getCartTotal = (): number => {
  const store = useAppStore.getState();
  return store.cart.reduce((total, item) => {
    const product = getProductById(item.productId);
    return total + (product?.price || 0) * item.quantity;
  }, 0);
};

export const getCartItemCount = (): number => {
  const store = useAppStore.getState();
  return store.cart.reduce((count, item) => count + item.quantity, 0);
};
