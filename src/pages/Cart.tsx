
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Trash2, ShoppingBag, ArrowRight } from 'lucide-react';

const Cart = () => {
  // This would normally be managed with a cart state, but for now we'll use placeholder data
  const [cartItems, setCartItems] = React.useState([]);
  const hasItems = cartItems.length > 0;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {!hasItems ? (
          <Card className="text-center p-8">
            <CardHeader>
              <CardTitle className="text-2xl">Your cart is empty</CardTitle>
            </CardHeader>
            <CardContent>
              <ShoppingBag className="mx-auto mb-4 text-gray-400" size={64} />
              <p className="text-gray-500 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild className="bg-brand-600 hover:bg-brand-700">
                <Link to="/all-products">Start Shopping</Link>
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Cart items would go here */}
              <p className="text-gray-500 text-center py-12">No items in cart yet</p>
            </div>
            
            <div className="lg:col-span-1">
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>$0.00</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Tax</span>
                    <span>$0.00</span>
                  </div>
                  <div className="border-t pt-4 flex justify-between font-bold">
                    <span>Total</span>
                    <span>$0.00</span>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-brand-600 hover:bg-brand-700 flex items-center justify-center">
                    Proceed to Checkout <ArrowRight className="ml-2" size={16} />
                  </Button>
                </CardFooter>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
