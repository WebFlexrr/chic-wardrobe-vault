
import React from 'react';
import { Link, useParams } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Truck, Package, CreditCard, Calendar } from 'lucide-react';

const OrderDetails = () => {
  const { id } = useParams<{ id: string }>();
  
  // In a real app, you would fetch the order details from an API using the ID
  // For now, we'll just use placeholder content
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button asChild variant="outline" className="mr-4">
            <Link to="/account/orders">
              <ArrowLeft className="mr-2" size={16} />
              Back to Orders
            </Link>
          </Button>
          <h1 className="text-3xl font-bold">Order #{id}</h1>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Order Status */}
            <Card>
              <CardHeader>
                <CardTitle>Order Status</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col md:flex-row justify-between space-y-4 md:space-y-0">
                  <div className="flex items-center">
                    <Calendar className="mr-2 text-brand-600" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">Order Date</div>
                      <div className="font-medium">March 24, 2023</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Truck className="mr-2 text-brand-600" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">Shipping Status</div>
                      <div className="font-medium">Processing</div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Package className="mr-2 text-brand-600" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">Estimated Delivery</div>
                      <div className="font-medium">March 30, 2023</div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 pt-6 border-t">
                  <div className="flex items-center">
                    <CreditCard className="mr-2 text-brand-600" size={20} />
                    <div>
                      <div className="text-sm text-gray-500">Payment Method</div>
                      <div className="font-medium">Credit Card (•••• 1234)</div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Order Items */}
            <Card>
              <CardHeader>
                <CardTitle>Order Items</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 text-center py-6">No items to display</p>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            {/* Order Summary */}
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
            </Card>
            
            {/* Shipping Address */}
            <Card className="mt-6">
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent>
                <address className="not-italic">
                  <p>John Doe</p>
                  <p>123 Main St</p>
                  <p>Anytown, CA 12345</p>
                  <p>United States</p>
                </address>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetails;
