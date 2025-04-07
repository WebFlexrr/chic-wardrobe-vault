
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Plus, Edit, Trash } from 'lucide-react';
import { toast } from 'sonner';

// Sample address data
const sampleAddresses = [
  {
    id: 1,
    name: "Home",
    street: "123 Main Street",
    city: "San Francisco",
    state: "CA",
    zipCode: "94105",
    country: "United States",
    default: true
  },
  {
    id: 2,
    name: "Office",
    street: "456 Market Street, Suite 300",
    city: "San Francisco",
    state: "CA",
    zipCode: "94103",
    country: "United States",
    default: false
  },
  {
    id: 3,
    name: "Parents' Home",
    street: "789 Oak Drive",
    city: "Los Angeles",
    state: "CA",
    zipCode: "90001",
    country: "United States",
    default: false
  }
];

const AddressList = () => {
  const [addresses, setAddresses] = useState(sampleAddresses);
  
  const handleDeleteAddress = (id: number) => {
    setAddresses(addresses.filter(address => address.id !== id));
    toast.success("Address deleted successfully");
  };
  
  const handleSetDefault = (id: number) => {
    setAddresses(addresses.map(address => ({
      ...address,
      default: address.id === id
    })));
    toast.success("Default address updated");
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Your Addresses</h1>
          <Button asChild variant="outline">
            <Link to="/account">Back to Account</Link>
          </Button>
        </div>
        
        <div className="mb-6">
          <Button className="bg-primary-600 hover:bg-primary-700">
            <Plus className="mr-2" size={16} />
            Add New Address
          </Button>
        </div>
        
        {addresses.length === 0 ? (
          <Card className="text-center p-8">
            <CardContent className="pt-6">
              <MapPin className="mx-auto mb-4 text-gray-400" size={64} />
              <h2 className="text-2xl font-semibold mb-2">No addresses yet</h2>
              <p className="text-gray-500 mb-6">
                Add a shipping address to make checkout faster.
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {addresses.map((address) => (
              <Card key={address.id}>
                <CardHeader className="pb-2">
                  <CardTitle className="flex justify-between items-center">
                    <span>{address.name}</span>
                    {address.default && (
                      <span className="bg-primary-50 text-primary-600 text-xs px-2 py-1 rounded-full">
                        Default
                      </span>
                    )}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <address className="not-italic">
                    <p>{address.street}</p>
                    <p>
                      {address.city}, {address.state} {address.zipCode}
                    </p>
                    <p>{address.country}</p>
                  </address>
                  
                  <div className="flex space-x-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      <Edit className="mr-1" size={14} />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1 text-destructive"
                      onClick={() => handleDeleteAddress(address.id)}
                    >
                      <Trash className="mr-1" size={14} />
                      Delete
                    </Button>
                  </div>
                  
                  {!address.default && (
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="w-full mt-2 text-primary-600"
                      onClick={() => handleSetDefault(address.id)}
                    >
                      Set as default
                    </Button>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default AddressList;
