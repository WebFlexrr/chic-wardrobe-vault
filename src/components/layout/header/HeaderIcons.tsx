
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingBag, Heart, User, Search, Menu, X } from 'lucide-react';
import { useAppStore } from '@/store';

interface HeaderIconsProps {
  onSearchToggle: () => void;
  mobileMenuOpen: boolean;
  onMobileMenuToggle: () => void;
}

const HeaderIcons = ({ onSearchToggle, mobileMenuOpen, onMobileMenuToggle }: HeaderIconsProps) => {
  const { cart, wishlist } = useAppStore();
  const cartItemCount = cart.reduce((count, item) => count + item.quantity, 0);
  const wishlistCount = wishlist.length;

  return (
    <div className="flex items-center space-x-5">
      <button 
        onClick={onSearchToggle} 
        className="text-gray-800 hover:text-primary-600"
        aria-label="Search"
      >
        <Search size={20} />
      </button>
      <Link to="/wishlist" className="text-gray-800 hover:text-primary-600 relative" aria-label="Wishlist">
        <Heart size={20} />
        {wishlistCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {wishlistCount}
          </span>
        )}
      </Link>
      <Link to="/cart" className="text-gray-800 hover:text-primary-600 relative" aria-label="Cart">
        <ShoppingBag size={20} />
        {cartItemCount > 0 && (
          <span className="absolute -top-2 -right-2 bg-primary-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {cartItemCount}
          </span>
        )}
      </Link>
      <Link to="/account" className="text-gray-800 hover:text-primary-600" aria-label="Account">
        <User size={20} />
      </Link>

      {/* Mobile Menu Button */}
      <button 
        className="md:hidden text-gray-800 focus:outline-none" 
        onClick={onMobileMenuToggle}
        aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
      >
        {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
      </button>
    </div>
  );
};

export default HeaderIcons;
