
import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useAppStore } from '@/store';
import { getProductById } from '@/data/products';

interface SearchBarProps {
  searchSuggestions: Array<{ id: string; name: string }>;
  setSearchSuggestions: React.Dispatch<React.SetStateAction<Array<{ id: string; name: string }>>>;
}

const SearchBar = ({ searchSuggestions, setSearchSuggestions }: SearchBarProps) => {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const { search, setSearchOpen, setSearchQuery } = useAppStore();
  const { isSearchOpen, searchQuery } = search;

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  // Close search suggestions on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setSearchSuggestions([]);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setSearchSuggestions]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search submitted:', search.searchQuery);
    setSearchOpen(false);
    setSearchSuggestions([]);
  };

  const handleSuggestionClick = (productId: string) => {
    setSearchOpen(false);
    setSearchSuggestions([]);
  };

  if (!isSearchOpen) return null;

  return (
    <div 
      ref={searchContainerRef}
      className="absolute left-0 right-0 bg-white shadow-md mt-2 py-4 px-4 animate-fade-in z-50"
    >
      <form onSubmit={handleSearchSubmit} className="max-w-xl mx-auto relative">
        <div className="flex">
          <Input
            ref={searchInputRef}
            type="text"
            placeholder="Search for products..."
            className="flex-grow"
            value={search.searchQuery}
            onChange={handleSearchChange}
          />
          <Button type="submit" className="ml-2 bg-primary-600 hover:bg-primary-700">
            Search
          </Button>
          <Button 
            type="button" 
            variant="outline" 
            className="ml-2" 
            onClick={() => setSearchOpen(false)}
          >
            Cancel
          </Button>
        </div>
        
        {/* Search suggestions */}
        {searchSuggestions.length > 0 && (
          <div className="absolute top-full left-0 right-0 bg-white shadow-lg rounded-b-md mt-1 z-50 max-h-72 overflow-y-auto">
            <div className="py-2">
              {searchSuggestions.map(product => (
                <Link 
                  key={product.id} 
                  to={`/product/${product.id}`}
                  className="flex items-center px-4 py-2 hover:bg-gray-50"
                  onClick={() => handleSuggestionClick(product.id)}
                >
                  <div className="w-10 h-10 bg-gray-100 mr-3 rounded overflow-hidden">
                    {getProductById(product.id)?.images[0] && (
                      <img 
                        src={getProductById(product.id)?.images[0]} 
                        alt={product.name}
                        className="w-full h-full object-cover"
                      />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{product.name}</p>
                    <p className="text-xs text-gray-500">
                      ${getProductById(product.id)?.price.toFixed(2)}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
