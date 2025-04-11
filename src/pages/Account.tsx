
import React, { useState } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Link, useNavigate } from 'react-router-dom';
import { Card, CardContent } from '@/components/ui/card';
import { User, Package, CreditCard, MapPin, LogOut, Settings, Heart, Eye } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useAuth } from '@/contexts/AuthContext';

const Account = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");
  
  const [profileData, setProfileData] = useState({
    fullName: user?.name || 'John Doe',
    email: user?.email || 'john.doe@example.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setProfileData({
      ...profileData,
      [name]: value
    });
  };
  
  const handleSaveChanges = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle save changes logic
    console.log('Profile data saved:', profileData);
    // Show success message or handle errors
  };
  
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle password update logic
    console.log('Password update:', {
      currentPassword: profileData.currentPassword,
      newPassword: profileData.newPassword,
      confirmPassword: profileData.confirmPassword
    });
    // Show success message or handle errors
  };
  
  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-12 mt-12">
        <h1 className="text-3xl font-bold mb-8">My Account</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="md:col-span-3">
            <Card>
              <CardContent className="pt-6">
                <div className="flex flex-col items-center pb-6 border-b border-gray-200 mb-6">
                  <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 mb-4">
                    <User size={40} />
                  </div>
                  <h2 className="text-xl font-semibold">{profileData.fullName}</h2>
                  <p className="text-gray-500 text-sm">{profileData.email}</p>
                </div>
                
                <nav className="flex flex-col space-y-1">
                  <button 
                    onClick={() => setActiveTab("profile")} 
                    className={`flex items-center px-4 py-3 text-left rounded-md transition-colors ${activeTab === "profile" ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`}
                  >
                    <User className="mr-3" size={18} />
                    Profile
                  </button>
                  
                  <Link 
                    to="/account/orders" 
                    className="flex items-center px-4 py-3 text-left rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Package className="mr-3" size={18} />
                    Orders
                  </Link>
                  
                  <Link 
                    to="/account/addresses" 
                    className="flex items-center px-4 py-3 text-left rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <MapPin className="mr-3" size={18} />
                    Addresses
                  </Link>
                  
                  <Link 
                    to="/wishlist" 
                    className="flex items-center px-4 py-3 text-left rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <Heart className="mr-3" size={18} />
                    Wishlist
                  </Link>
                  
                  <Link 
                    to="/account/payment-methods" 
                    className="flex items-center px-4 py-3 text-left rounded-md hover:bg-gray-50 transition-colors"
                  >
                    <CreditCard className="mr-3" size={18} />
                    Payment Methods
                  </Link>
                  
                  <Separator className="my-2" />
                  
                  <button 
                    onClick={() => setActiveTab("settings")}
                    className={`flex items-center px-4 py-3 text-left rounded-md transition-colors ${activeTab === "settings" ? 'bg-primary-50 text-primary-700' : 'hover:bg-gray-50'}`}
                  >
                    <Settings className="mr-3" size={18} />
                    Settings
                  </button>
                  
                  <button 
                    onClick={handleLogout}
                    className="flex items-center px-4 py-3 text-left rounded-md hover:bg-gray-50 text-destructive transition-colors"
                  >
                    <LogOut className="mr-3" size={18} />
                    Sign Out
                  </button>
                </nav>
              </CardContent>
            </Card>
          </div>
          
          {/* Main Content */}
          <div className="md:col-span-9">
            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="mb-6">
                <TabsTrigger value="profile">Profile Information</TabsTrigger>
                <TabsTrigger value="settings">Password & Security</TabsTrigger>
              </TabsList>
              
              <TabsContent value="profile">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
                    <form onSubmit={handleSaveChanges} className="space-y-4">
                      <div>
                        <label htmlFor="fullName" className="block text-sm font-medium text-gray-700 mb-1">
                          Full Name
                        </label>
                        <Input
                          id="fullName"
                          name="fullName"
                          value={profileData.fullName}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                          Email Address
                        </label>
                        <Input
                          type="email"
                          id="email"
                          name="email"
                          value={profileData.email}
                          onChange={handleInputChange}
                          className="w-full"
                        />
                      </div>
                      
                      <div className="pt-4">
                        <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
                          Save Changes
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="settings">
                <Card>
                  <CardContent className="pt-6">
                    <h2 className="text-xl font-semibold mb-6">Change Password</h2>
                    <form onSubmit={handlePasswordUpdate} className="space-y-4">
                      <div>
                        <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Current Password
                        </label>
                        <div className="relative">
                          <Input
                            type={showCurrentPassword ? "text" : "password"}
                            id="currentPassword"
                            name="currentPassword"
                            value={profileData.currentPassword}
                            onChange={handleInputChange}
                            className="w-full pr-10"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          New Password
                        </label>
                        <div className="relative">
                          <Input
                            type={showNewPassword ? "text" : "password"}
                            id="newPassword"
                            name="newPassword"
                            value={profileData.newPassword}
                            onChange={handleInputChange}
                            className="w-full pr-10"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 mb-1">
                          Confirm New Password
                        </label>
                        <div className="relative">
                          <Input
                            type={showConfirmPassword ? "text" : "password"}
                            id="confirmPassword"
                            name="confirmPassword"
                            value={profileData.confirmPassword}
                            onChange={handleInputChange}
                            className="w-full pr-10"
                          />
                          <button
                            type="button"
                            className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          >
                            <Eye size={18} />
                          </button>
                        </div>
                      </div>
                      
                      <div className="pt-4">
                        <Button type="submit" className="bg-primary-600 hover:bg-primary-700">
                          Update Password
                        </Button>
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Account;
