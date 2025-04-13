
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Circle, X, ChevronRight } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { useAppStore } from '@/store';
import { getProductById } from '@/data/products';
import { OrderStatus, PaymentStatus, Order } from '@/types';

// Sample order data - in a real app, this would come from your API/database
const generateOrderId = () => {
  return `#${Math.floor(10000 + Math.random() * 90000)}`;
};

const OrderPreview: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { clearCart } = useAppStore();
  
  // In a real app, you'd fetch this data from your backend
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Simulate fetching order data
    setTimeout(() => {
      // If no ID is provided, redirect to orders
      if (!id) {
        navigate('/account/orders');
        return;
      }
      
      // Mock order data - in a real app, you'd fetch this based on the ID
      const mockOrder: Order = {
        id: id,
        userId: 'user123',
        orderNumber: id,
        items: JSON.parse(localStorage.getItem('cartItems') || '[]').map((item: any) => {
          const product = getProductById(item.productId);
          return {
            productId: item.productId,
            name: product?.name || 'Product',
            quantity: item.quantity,
            size: item.size,
            color: item.color,
            price: product?.price || 0,
            image: product?.images[0] || '',
          };
        }),
        shippingAddress: {
          id: 'addr1',
          userId: 'user123',
          type: 'shipping',
          firstName: 'John',
          lastName: 'Doe',
          addressLine1: '123 Main St',
          addressLine2: 'Apt 4B',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'USA',
          phone: '123-456-7890',
          isDefault: true,
        },
        billingAddress: {
          id: 'addr1',
          userId: 'user123',
          type: 'billing',
          firstName: 'John',
          lastName: 'Doe',
          addressLine1: '123 Main St',
          addressLine2: 'Apt 4B',
          city: 'New York',
          state: 'NY',
          postalCode: '10001',
          country: 'USA',
          phone: '123-456-7890',
          isDefault: true,
        },
        paymentMethod: {
          id: 'pm1',
          userId: 'user123',
          type: 'credit_card',
          cardNumber: '****1234',
          nameOnCard: 'John Doe',
          expiryDate: '12/25',
          isDefault: true,
        },
        subtotal: JSON.parse(localStorage.getItem('cartItems') || '[]').reduce((total: number, item: any) => {
          const product = getProductById(item.productId);
          return total + (product?.price || 0) * item.quantity;
        }, 0),
        discount: 0,
        shipping: 0,
        tax: JSON.parse(localStorage.getItem('cartItems') || '[]').reduce((total: number, item: any) => {
          const product = getProductById(item.productId);
          return total + ((product?.price || 0) * item.quantity * 0.1);
        }, 0),
        total: JSON.parse(localStorage.getItem('cartItems') || '[]').reduce((total: number, item: any) => {
          const product = getProductById(item.productId);
          return total + ((product?.price || 0) * item.quantity * 1.1);
        }, 0),
        status: 'processing',
        paymentStatus: 'paid',
        trackingNumber: 'TRK' + Math.floor(1000000 + Math.random() * 9000000),
        estimatedDelivery: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      setOrder(mockOrder);
      setLoading(false);
      
      // Clear the cart after showing the order
      // In a real app, you would do this after successful order placement
      clearCart();
      localStorage.removeItem('cartItems');
    }, 1000);
  }, [id, navigate, clearCart]);
  
  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 flex justify-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        </div>
      </Layout>
    );
  }
  
  if (!order) {
    return (
      <Layout>
        <div className="container mx-auto px-4 py-16 text-center">
          <h1 className="text-2xl font-bold mb-4">Order Not Found</h1>
          <p className="mb-6">Sorry, we couldn't find the order you're looking for.</p>
          <Button asChild>
            <Link to="/account/orders">View All Orders</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  // Map status to appropriate icon and color
  const getStatusIcon = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return <Check className="h-6 w-6 text-green-500" />;
      case 'shipped':
        return <Circle className="h-6 w-6 text-blue-500 fill-blue-500" />;
      case 'cancelled':
        return <X className="h-6 w-6 text-red-500" />;
      default:
        return <Circle className="h-6 w-6 text-yellow-500 fill-yellow-500" />;
    }
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Header with Order Status */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold flex items-center gap-2">
                Order {order.orderNumber}
                {order.status === 'cancelled' && (
                  <span className="text-sm bg-red-100 text-red-800 px-2 py-1 rounded">Cancelled</span>
                )}
              </h1>
              <p className="text-gray-600 mt-1">
                Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </p>
            </div>
            <Button variant="outline" asChild className="mt-4 md:mt-0">
              <Link to="/account/orders">View All Orders</Link>
            </Button>
          </div>
          
          {/* Order Status Tracker */}
          {order.status !== 'cancelled' && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="relative">
                  <div className="flex justify-between mb-2">
                    <div className="text-center flex-1">
                      <div className="relative inline-flex items-center justify-center w-10 h-10 rounded-full bg-green-100 mb-2">
                        <Check className="h-6 w-6 text-green-500" />
                      </div>
                      <p className="text-sm font-medium">Order Placed</p>
                    </div>
                    
                    <div className="text-center flex-1">
                      <div className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full ${
                        order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' 
                          ? 'bg-green-100' : 'bg-gray-100'
                      } mb-2`}>
                        {order.status === 'processing' || order.status === 'shipped' || order.status === 'delivered' ? (
                          <Check className="h-6 w-6 text-green-500" />
                        ) : (
                          <span className="h-6 w-6 flex items-center justify-center font-medium">2</span>
                        )}
                      </div>
                      <p className="text-sm font-medium">Processing</p>
                    </div>
                    
                    <div className="text-center flex-1">
                      <div className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full ${
                        order.status === 'shipped' || order.status === 'delivered' 
                          ? 'bg-green-100' : 'bg-gray-100'
                      } mb-2`}>
                        {order.status === 'shipped' || order.status === 'delivered' ? (
                          <Check className="h-6 w-6 text-green-500" />
                        ) : (
                          <span className="h-6 w-6 flex items-center justify-center font-medium">3</span>
                        )}
                      </div>
                      <p className="text-sm font-medium">Shipped</p>
                    </div>
                    
                    <div className="text-center flex-1">
                      <div className={`relative inline-flex items-center justify-center w-10 h-10 rounded-full ${
                        order.status === 'delivered' ? 'bg-green-100' : 'bg-gray-100'
                      } mb-2`}>
                        {order.status === 'delivered' ? (
                          <Check className="h-6 w-6 text-green-500" />
                        ) : (
                          <span className="h-6 w-6 flex items-center justify-center font-medium">4</span>
                        )}
                      </div>
                      <p className="text-sm font-medium">Delivered</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200">
                    <div 
                      className="h-full bg-green-500"
                      style={{ 
                        width: order.status === 'pending' ? '0%' : 
                               order.status === 'processing' ? '33%' : 
                               order.status === 'shipped' ? '67%' : 
                               '100%' 
                      }}
                    />
                  </div>
                </div>
                
                {/* Estimated Delivery */}
                {order.status !== 'delivered' && order.status !== 'cancelled' && (
                  <div className="mt-6 text-center">
                    <p className="text-gray-600">
                      Estimated delivery by <span className="font-medium">{new Date(order.estimatedDelivery).toLocaleDateString('en-US', { 
                        year: 'numeric', 
                        month: 'long', 
                        day: 'numeric' 
                      })}</span>
                    </p>
                    {order.trackingNumber && (
                      <p className="text-sm mt-2">
                        Tracking Number: <span className="font-medium">{order.trackingNumber}</span>
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Order Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Order Items</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="divide-y">
                    {order.items.map((item) => (
                      <li key={`${item.productId}-${item.color}-${item.size}`} className="py-4 flex gap-4">
                        <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                          <img 
                            src={item.image} 
                            alt={item.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-medium">{item.name}</h3>
                          <p className="text-sm text-gray-500">
                            {item.color} / {item.size}
                          </p>
                          <p className="text-sm text-gray-500">
                            Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${(item.price * item.quantity).toFixed(2)}</p>
                        </div>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
              
              {/* Shipping and Billing Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <address className="not-italic">
                      <p className="font-medium">{order.shippingAddress.firstName} {order.shippingAddress.lastName}</p>
                      <p>{order.shippingAddress.addressLine1}</p>
                      {order.shippingAddress.addressLine2 && <p>{order.shippingAddress.addressLine2}</p>}
                      <p>{order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}</p>
                      <p>{order.shippingAddress.country}</p>
                      <p className="mt-2">{order.shippingAddress.phone}</p>
                    </address>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader>
                    <CardTitle>Payment Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="font-medium">
                      {order.paymentMethod.type === 'credit_card' ? 'Credit Card' : 
                       order.paymentMethod.type === 'paypal' ? 'PayPal' : 
                       'Online Payment'}
                    </p>
                    
                    {order.paymentMethod.type === 'credit_card' && (
                      <p className="text-gray-600">{order.paymentMethod.cardNumber}</p>
                    )}
                    
                    <div className="mt-4">
                      <p className="text-sm">Payment Status</p>
                      <p className={`font-medium ${
                        order.paymentStatus === 'paid' ? 'text-green-600' : 
                        order.paymentStatus === 'pending' ? 'text-yellow-600' : 
                        'text-red-600'
                      }`}>
                        {order.paymentStatus === 'paid' ? 'Paid' : 
                         order.paymentStatus === 'pending' ? 'Pending' : 
                         'Failed'}
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Order Summary */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Order Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Shipping</span>
                      <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>${order.tax.toFixed(2)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-green-600">
                        <span>Discount</span>
                        <span>-${order.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator className="my-2" />
                    <div className="flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="mt-6 space-y-4">
                    <Button className="w-full">Track Order</Button>
                    <Button variant="outline" className="w-full">Download Invoice</Button>
                    {order.status !== 'cancelled' && order.status !== 'delivered' && (
                      <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              <div className="mt-6">
                <Button variant="link" asChild className="flex items-center p-0">
                  <Link to="/all-products">
                    <ChevronRight className="mr-1 h-4 w-4 rotate-180" />
                    Continue Shopping
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderPreview;
