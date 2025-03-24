
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ExternalLink } from 'lucide-react';

const OrderList = () => {
  // Mock data for orders - in a real application this would come from an API
  const orders = [];

  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Orders</h1>
          <Button asChild variant="outline">
            <Link to="/account">Back to Account</Link>
          </Button>
        </div>
        
        {orders.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent className="pt-6">
              <Package className="mx-auto mb-4 text-gray-400" size={64} />
              <h2 className="text-2xl font-semibold mb-2">No orders yet</h2>
              <p className="text-gray-500 mb-6">
                When you place orders, they will appear here.
              </p>
              <Button asChild className="bg-brand-600 hover:bg-brand-700">
                <Link to="/all-products">Start Shopping</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {orders.map((order) => (
              <Card key={order.id}>
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row justify-between">
                    <CardTitle>Order #{order.id}</CardTitle>
                    <div className="text-sm text-gray-500">
                      {order.date}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  {/* Order info would go here */}
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mt-2">
                    <div>
                      <div className="text-sm text-gray-500">Status:</div>
                      <div className="font-medium">{order.status}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500">Total:</div>
                      <div className="font-medium">${order.total}</div>
                    </div>
                    <Button asChild variant="outline" className="mt-4 md:mt-0">
                      <Link to={`/account/orders/${order.id}`}>
                        View Details
                        <ExternalLink className="ml-1" size={16} />
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default OrderList;
