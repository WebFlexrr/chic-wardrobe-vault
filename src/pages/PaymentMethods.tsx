
import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plus, CreditCard, Edit, Trash } from 'lucide-react';

const PaymentMethods = () => {
  // Mock data - in a real app this would come from your API or state management
  const paymentMethods = [];
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Payment Methods</h1>
          <Button asChild variant="outline">
            <Link to="/account">Back to Account</Link>
          </Button>
        </div>
        
        <div className="mb-6">
          <Button className="bg-brand-600 hover:bg-brand-700">
            <Plus className="mr-2" size={16} />
            Add Payment Method
          </Button>
        </div>
        
        {paymentMethods.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent className="pt-6">
              <CreditCard className="mx-auto mb-4 text-gray-400" size={64} />
              <h2 className="text-2xl font-semibold mb-2">No payment methods yet</h2>
              <p className="text-gray-500 mb-6">
                Add a payment method to make checkout faster.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {paymentMethods.map((method) => (
              <Card key={method.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>{method.cardType}</span>
                    {method.default && (
                      <span className="bg-brand-50 text-brand-600 text-xs px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="flex items-center">
                      <CreditCard className="mr-2 text-gray-400" size={16} />
                      <span>•••• •••• •••• {method.last4}</span>
                    </div>
                    <p className="text-sm text-gray-500">
                      Expires: {method.expiryMonth}/{method.expiryYear}
                    </p>
                  </div>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-1" size={14} />
                      Edit
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1 text-destructive">
                      <Trash className="mr-1" size={14} />
                      Delete
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

export default PaymentMethods;
