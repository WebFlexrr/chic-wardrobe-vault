
import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Instagram, Twitter, Mail } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Footer = () => {
  return (
    <footer className="bg-gray-50 pt-16 pb-8">
      <div className="container mx-auto px-4">
        {/* Newsletter */}
        <div className="max-w-3xl mx-auto mb-16 text-center">
          <h3 className="text-2xl font-bold mb-2">Subscribe to Our Newsletter</h3>
          <p className="text-gray-600 mb-6">Stay updated with our latest styles and offers</p>
          <div className="flex flex-col sm:flex-row gap-2 max-w-md mx-auto">
            <Input 
              type="email" 
              placeholder="Your email address" 
              className="flex-grow border-gray-300 focus:border-brand-500 focus:ring focus:ring-brand-200 focus:ring-opacity-50"
            />
            <Button 
              className="bg-brand-600 hover:bg-brand-700 text-white focus:ring-4 focus:ring-brand-200"
            >
              Subscribe
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* About */}
          <div>
            <h4 className="text-lg font-bold mb-4">About CHIC VAULT</h4>
            <p className="text-gray-600 mb-4">
              We curate high-quality fashion pieces for the modern professional woman, 
              focusing on elegance, comfort, and timeless style.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-600 hover:text-brand-600">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-600">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-600">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-600 hover:text-brand-600">
                <Mail size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-600 hover:text-brand-600 story-link">Home</Link>
              </li>
              <li>
                <Link to="/all-products" className="text-gray-600 hover:text-brand-600 story-link">Shop</Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-600 hover:text-brand-600 story-link">About Us</Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-600 hover:text-brand-600 story-link">Contact</Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-600 hover:text-brand-600 story-link">Blog</Link>
              </li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-lg font-bold mb-4">Customer Service</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/shipping-policy" className="text-gray-600 hover:text-brand-600 story-link">
                  Shipping Policy
                </Link>
              </li>
              <li>
                <Link to="/return-policy" className="text-gray-600 hover:text-brand-600 story-link">
                  Return Policy
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-600 hover:text-brand-600 story-link">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/size-guide" className="text-gray-600 hover:text-brand-600 story-link">
                  Size Guide
                </Link>
              </li>
              <li>
                <Link to="/track-order" className="text-gray-600 hover:text-brand-600 story-link">
                  Track Your Order
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-bold mb-4">Contact Info</h4>
            <ul className="space-y-2 text-gray-600">
              <li>123 Fashion Avenue, New York, NY 10001</li>
              <li>Phone: +1 (555) 123-4567</li>
              <li>Email: support@chicvault.com</li>
              <li>Monday-Friday: 9:00 AM - 6:00 PM EST</li>
              <li>Saturday: 10:00 AM - 4:00 PM EST</li>
              <li>Sunday: Closed</li>
            </ul>
          </div>
        </div>

        {/* Payment & Copyright */}
        <div className="pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-600 text-sm mb-4 md:mb-0">
              © {new Date().getFullYear()} CHIC VAULT. All rights reserved.
            </p>
            <div className="flex items-center space-x-4">
              <span className="text-gray-600 text-sm">We Accept:</span>
              <div className="flex space-x-2">
                <div className="w-10 h-6 bg-blue-900 rounded"></div>
                <div className="w-10 h-6 bg-yellow-500 rounded"></div>
                <div className="w-10 h-6 bg-red-600 rounded"></div>
                <div className="w-10 h-6 bg-green-600 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
