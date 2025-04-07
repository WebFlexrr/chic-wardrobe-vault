
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { ShoppingCart, X, Minus, Plus } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { getProductById } from '@/data/products';
import { Separator } from '@/components/ui/separator';

const Cart = () => {
  // Demo cart items
  const demoCartItems = [
    {
      productId: "p3",
      quantity: 1,
      color: "Black",
      size: "M"
    },
    {
      productId: "p5",
      quantity: 2,
      color: "White",
      size: "S"
    }
  ];
  
  const hasItems = demoCartItems.length > 0;
  
  const handleRemoveItem = (productId: string) => {
    console.log('Remove item:', productId);
  };
  
  const handleQuantityChange = (productId: string, newQuantity: number) => {
    console.log('Update quantity:', { productId, newQuantity });
  };
  
  const calculateSubtotal = () => {
    return demoCartItems.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };
  
  const shipping = 0; // Free shipping
  const tax = calculateSubtotal() * 0.1; // 10% tax
  const total = calculateSubtotal() + shipping + tax;

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 mt-20">
        <h1 className="text-3xl font-bold mb-8">Your Shopping Cart</h1>
        
        {!hasItems ? (
          <Card className="text-center p-8">
            <CardContent className="pt-6">
              <ShoppingCart className="mx-auto mb-4 text-gray-400" size={64} />
              <h2 className="text-2xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-500 mb-6">
                Looks like you haven't added any items to your cart yet.
              </p>
            </CardContent>
            <CardFooter className="flex justify-center">
              <Button asChild className="bg-primary-600 hover:bg-primary-700">
                <Link to="/all-products">Start Shopping</Link>
              </Button>
            </CardFooter>
          </Card>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              <Card>
                <CardContent className="pt-6">
                  {demoCartItems.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    
                    return (
                      <div key={item.productId} className="flex flex-col sm:flex-row gap-4 py-4 border-b last:border-0">
                        <div className="w-full sm:w-24 h-24 bg-gray-100 rounded overflow-hidden">
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        
                        <div className="flex-grow">
                          <div className="flex justify-between">
                            <Link to={`/product/${product.id}`} className="font-medium hover:text-primary-600">
                              {product.name}
                            </Link>
                            <button 
                              onClick={() => handleRemoveItem(product.id)}
                              className="text-gray-400 hover:text-gray-600"
                              aria-label="Remove item"
                            >
                              <X size={18} />
                            </button>
                          </div>
                          
                          <p className="text-sm text-gray-500 mb-2">
                            {item.color} / {item.size}
                          </p>
                          
                          <div className="flex justify-between items-center mt-2">
                            <div className="flex items-center border rounded-md">
                              <button 
                                onClick={() => item.quantity > 1 && handleQuantityChange(product.id, item.quantity - 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                                disabled={item.quantity <= 1}
                              >
                                <Minus size={16} />
                              </button>
                              <span className="px-3 py-1 min-w-[2rem] text-center">{item.quantity}</span>
                              <button 
                                onClick={() => handleQuantityChange(product.id, item.quantity + 1)}
                                className="px-3 py-1 text-gray-600 hover:bg-gray-100"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                            
                            <p className="font-medium">
                              ${(product.price * item.quantity).toFixed(2)}
                            </p>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Link to="/all-products" className="text-sm text-primary-600 hover:underline">
                    Continue Shopping
                  </Link>
                </CardFooter>
              </Card>
            </div>
            <div>
              <Card>
                <CardContent className="pt-6">
                  <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${calculateSubtotal().toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${tax.toFixed(2)}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  <div className="mt-6 space-y-4">
                    <input
                      type="text"
                      placeholder="Discount code"
                      className="w-full p-2.5 border rounded-md"
                    />
                    <Button variant="outline" className="w-full">
                      Apply Discount
                    </Button>
                  </div>
                </CardContent>
                <CardFooter>
                  <Button asChild className="w-full bg-primary-600 hover:bg-primary-700">
                    <Link to="/checkout">Proceed to Checkout</Link>
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
