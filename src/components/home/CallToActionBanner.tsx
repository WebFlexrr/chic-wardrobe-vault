
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const CallToActionBanner = () => {
  return (
    <section className="py-16 bg-primary-500 relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="text-white max-w-xl">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Join Our Community</h2>
            <p className="text-lg mb-6 text-white/90">
              Subscribe to our newsletter and get exclusive access to new collections, special offers, and styling tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="email"
                placeholder="Your email address"
                className="px-4 py-3 rounded-md w-full text-black focus:outline-none focus:ring-2 focus:ring-white"
              />
              <Button className="bg-black hover:bg-gray-800 text-white px-8 py-3 font-medium">
                Subscribe
              </Button>
            </div>
            <p className="text-sm mt-3 text-white/80">
              By subscribing, you agree to our Privacy Policy and consent to receive updates from our company.
            </p>
          </div>
          <div className="hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80" 
              alt="Join Our Community" 
              className="max-w-[300px] rounded-lg shadow-lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CallToActionBanner;
