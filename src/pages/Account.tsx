
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Package, CreditCard, MapPin, LogOut } from 'lucide-react';

const Account = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Overview */}
          <Card className="md:col-span-3">
            <CardHeader>
              <CardTitle>Profile Overview</CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col md:flex-row items-center gap-6">
              <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                <User size={40} />
              </div>
              <div>
                <h2 className="text-xl font-semibold">Welcome, Guest</h2>
                <p className="text-gray-500">guest@example.com</p>
                <Button variant="outline" size="sm" className="mt-2">
                  Edit Profile
                </Button>
              </div>
            </CardContent>
          </Card>
          
          {/* Orders */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Package className="mr-2" size={20} />
                Orders
              </CardTitle>
              <CardDescription>View and track your orders</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/account/orders">View Orders</Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Payment Methods */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <CreditCard className="mr-2" size={20} />
                Payment Methods
              </CardTitle>
              <CardDescription>Manage your payment methods</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/account/payment-methods">View Payment Methods</Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Addresses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <MapPin className="mr-2" size={20} />
                Addresses
              </CardTitle>
              <CardDescription>Manage your shipping addresses</CardDescription>
            </CardHeader>
            <CardContent>
              <Button asChild variant="outline" className="w-full">
                <Link to="/account/addresses">View Addresses</Link>
              </Button>
            </CardContent>
          </Card>
          
          {/* Sign Out Button */}
          <Card className="md:col-span-3 bg-gray-50">
            <CardContent className="p-6">
              <Button variant="outline" className="w-full flex items-center justify-center text-gray-700">
                <LogOut className="mr-2" size={16} />
                Sign Out
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
