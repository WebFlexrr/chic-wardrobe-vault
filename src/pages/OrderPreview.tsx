import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Circle, X, ChevronRight, Package, CreditCard, Calendar, Truck, Receipt } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/components/ui/table';
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
  
  // Helper function to check if order status is not one of the specified values
  const shouldShowEstimatedDelivery = () => {
    return order.status !== 'delivered' && order.status !== 'cancelled';
  };
  
  // Helper function to check if order can be canceled
  const canCancelOrder = () => {
    return order.status !== 'cancelled' && order.status !== 'delivered';
  };
  
  // Get status badge color
  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case 'delivered':
        return <Badge className="bg-green-500">Delivered</Badge>;
      case 'shipped':
        return <Badge className="bg-blue-500">Shipped</Badge>;
      case 'processing':
        return <Badge className="bg-yellow-500">Processing</Badge>;
      case 'pending':
        return <Badge className="bg-orange-500">Pending</Badge>;
      case 'cancelled':
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get payment status badge
  const getPaymentBadge = (status: PaymentStatus) => {
    switch (status) {
      case 'paid':
        return <Badge className="bg-green-500">Paid</Badge>;
      case 'pending':
        return <Badge className="bg-yellow-500">Pending</Badge>;
      case 'failed':
        return <Badge variant="destructive">Failed</Badge>;
      case 'refunded':
        return <Badge className="bg-blue-500">Refunded</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8 space-y-8">
        <div className="max-w-6xl mx-auto">
          {/* Order Header with Summary */}
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
              <div>
                <div className="flex items-center gap-3">
                  <h1 className="text-3xl font-bold">Order {order.orderNumber}</h1>
                  {getStatusBadge(order.status)}
                </div>
                <p className="text-gray-600 mt-1">
                  Placed on {formatDate(order.createdAt)}
                </p>
              </div>
              <Button variant="outline" asChild className="mt-4 md:mt-0">
                <Link to="/account/orders">View All Orders</Link>
              </Button>
            </div>
            
            {/* Order Status Summary */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-2">
              <div className="flex flex-col items-center md:items-start gap-1 p-4 rounded-md bg-gray-50">
                <div className="flex items-center gap-2 text-gray-500">
                  <Receipt className="h-5 w-5" />
                  <span className="text-sm">Order Status</span>
                </div>
                <span className="font-medium">{order.status.charAt(0).toUpperCase() + order.status.slice(1)}</span>
              </div>
              
              <div className="flex flex-col items-center md:items-start gap-1 p-4 rounded-md bg-gray-50">
                <div className="flex items-center gap-2 text-gray-500">
                  <CreditCard className="h-5 w-5" />
                  <span className="text-sm">Payment</span>
                </div>
                <span className="font-medium">{getPaymentBadge(order.paymentStatus)}</span>
              </div>
              
              <div className="flex flex-col items-center md:items-start gap-1 p-4 rounded-md bg-gray-50">
                <div className="flex items-center gap-2 text-gray-500">
                  <Calendar className="h-5 w-5" />
                  <span className="text-sm">Order Date</span>
                </div>
                <span className="font-medium">{formatDate(order.createdAt)}</span>
              </div>
              
              {order.status !== 'cancelled' && order.status !== 'delivered' && (
                <div className="flex flex-col items-center md:items-start gap-1 p-4 rounded-md bg-gray-50">
                  <div className="flex items-center gap-2 text-gray-500">
                    <Truck className="h-5 w-5" />
                    <span className="text-sm">Expected Delivery</span>
                  </div>
                  <span className="font-medium">{formatDate(order.estimatedDelivery || '')}</span>
                </div>
              )}
            </div>
          </div>
          
          {/* Order Status Tracker */}
          {order.status !== 'cancelled' && (
            <Card className="mb-6">
              <CardHeader className="pb-0">
                <CardTitle className="text-xl">Order Progress</CardTitle>
              </CardHeader>
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
                
                {/* Tracking Info */}
                {shouldShowEstimatedDelivery() && order.trackingNumber && (
                  <div className="mt-6 text-center bg-gray-50 p-4 rounded-md">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-center gap-4">
                      <div>
                        <p className="text-sm text-gray-500">Tracking Number:</p>
                        <p className="font-medium">{order.trackingNumber}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500">Estimated Delivery:</p>
                        <p className="font-medium">{formatDate(order.estimatedDelivery || '')}</p>
                      </div>
                      <Button size="sm">Track Package</Button>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
          
          {/* Main 2-Column Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Left Column (2/3 width) */}
            <div className="lg:col-span-2 space-y-6">
              {/* Order Items Card with Enhanced Details */}
              <Card>
                <CardHeader className="border-b">
                  <CardTitle className="text-xl">Order Items ({order.items.reduce((count, item) => count + item.quantity, 0)})</CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Product</TableHead>
                        <TableHead>Details</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {order.items.map((item) => (
                        <TableRow key={`${item.productId}-${item.color}-${item.size}`}>
                          <TableCell>
                            <div className="flex gap-3">
                              <div className="w-20 h-20 bg-gray-100 rounded-md overflow-hidden">
                                <img 
                                  src={item.image} 
                                  alt={item.name}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="flex flex-col">
                                <h3 className="font-medium">{item.name}</h3>
                                <p className="text-sm text-gray-500">SKU: {item.productId.substring(0, 8)}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="space-y-1">
                              <p className="text-sm">
                                <span className="text-gray-500">Color:</span> {item.color}
                              </p>
                              <p className="text-sm">
                                <span className="text-gray-500">Size:</span> {item.size}
                              </p>
                              <p className="text-sm">
                                <span className="text-gray-500">Qty:</span> {item.quantity}
                              </p>
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <p className="font-medium">${item.price.toFixed(2)}</p>
                            <p className="text-sm text-gray-500">Total: ${(item.price * item.quantity).toFixed(2)}</p>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
              
              {/* Shipping and Payment Info Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <Truck className="h-5 w-5" />
                      Shipping Address
                    </CardTitle>
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
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <CreditCard className="h-5 w-5" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <p className="font-medium text-base">Payment Method</p>
                        <div className="flex items-center gap-2 mt-1">
                          {order.paymentMethod.type === 'credit_card' ? (
                            <>
                              <CreditCard className="h-4 w-4" />
                              <span>Credit Card ending in {order.paymentMethod.cardNumber?.slice(-4)}</span>
                            </>
                          ) : (
                            order.paymentMethod.type.charAt(0).toUpperCase() + order.paymentMethod.type.slice(1).replace('_', ' ')
                          )}
                        </div>
                      </div>
                      
                      <div>
                        <p className="font-medium text-base">Billing Address</p>
                        <address className="not-italic mt-1 text-sm">
                          {order.billingAddress.firstName} {order.billingAddress.lastName}<br />
                          {order.billingAddress.addressLine1}<br />
                          {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.postalCode}
                        </address>
                      </div>
                      
                      <div>
                        <p className="font-medium text-base">Payment Status</p>
                        <div className="mt-1">
                          {getPaymentBadge(order.paymentStatus)}
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
            
            {/* Right Column (1/3 width) - Order Summary */}
            <div className="space-y-6">
              {/* Order Summary Card */}
              <Card className="sticky top-6">
                <CardHeader className="border-b">
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="pt-4">
                  <div className="space-y-3">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Subtotal ({order.items.reduce((count, item) => count + item.quantity, 0)} items)</span>
                      <span>${order.subtotal.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Shipping</span>
                      <span>{order.shipping === 0 ? 'Free' : `$${order.shipping.toFixed(2)}`}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-500">Tax</span>
                      <span>${order.tax.toFixed(2)}</span>
                    </div>
                    {order.discount > 0 && (
                      <div className="flex justify-between text-green-600 text-sm">
                        <span>Discount</span>
                        <span>-${order.discount.toFixed(2)}</span>
                      </div>
                    )}
                    <Separator className="my-3" />
                    <div className="flex justify-between font-medium text-base">
                      <span>Total</span>
                      <span>${order.total.toFixed(2)}</span>
                    </div>
                  </div>
                  
                  {/* Actions */}
                  <div className="mt-6 space-y-3">
                    {shouldShowEstimatedDelivery() && (
                      <Button className="w-full flex items-center justify-center gap-2">
                        <Truck className="h-4 w-4" />
                        Track Order
                      </Button>
                    )}
                    <Button variant="outline" className="w-full flex items-center justify-center gap-2">
                      <Receipt className="h-4 w-4" />
                      Download Invoice
                    </Button>
                    {canCancelOrder() && (
                      <Button variant="outline" className="w-full text-red-600 border-red-200 hover:bg-red-50">
                        Cancel Order
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
              
              {/* Need Help Card */}
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">Need Help?</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <p className="text-sm">Have questions about your order?</p>
                    <Button variant="link" className="p-0 h-auto text-primary">Contact Customer Support</Button>
                  </div>
                  <div>
                    <p className="text-sm">Want to return an item?</p>
                    <Button variant="link" className="p-0 h-auto text-primary">Start Return Process</Button>
                  </div>
                </CardContent>
              </Card>
              
              {/* Continue Shopping Link */}
              <div>
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
