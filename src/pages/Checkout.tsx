
import React, { useState, useEffect } from 'react';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { getProductById } from '@/data/products';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';

const Checkout = () => {
  // Checkout steps
  const steps = ["Information", "Shipping", "Payment"];
  const [currentStep, setCurrentStep] = useState(0);
  const [isCompleting, setIsCompleting] = useState(false);
  const navigate = useNavigate();
  
  // Form state
  const [email, setEmail] = useState("user@example.com");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [nameOnCard, setNameOnCard] = useState("");
  
  const { cart } = useAppStore();
  
  useEffect(() => {
    // If cart is empty, redirect to cart page
    if (cart.length === 0) {
      navigate('/cart');
      toast.error("Your cart is empty");
    }
  }, [cart, navigate]);
  
  const calculateSubtotal = (): number => {
    return cart.reduce((total, item) => {
      const product = getProductById(item.productId);
      return total + (product?.price || 0) * item.quantity;
    }, 0);
  };
  
  const subtotal: number = calculateSubtotal();
  const shipping: number = 0; // Free shipping
  const tax: number = subtotal * 0.1; // 10% tax
  const total: number = subtotal + shipping + tax;

  const handleNextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleCompletePurchase = () => {
    setIsCompleting(true);
    
    // Simulate processing and redirect
    setTimeout(() => {
      toast.success("Order placed successfully!");
      navigate('/account/orders');
    }, 2000);
  };
  
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Checkout</h1>
        
        {/* Checkout Progress */}
        <div className="mb-8">
          <div className="flex justify-between relative mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex flex-col items-center z-10">
                <div 
                  className={`w-10 h-10 rounded-full flex items-center justify-center border-2
                    ${index < currentStep 
                      ? 'bg-primary-600 border-primary-600 text-white' 
                      : index === currentStep 
                        ? 'border-primary-600 text-primary-600' 
                        : 'border-gray-300 text-gray-300'
                    }`}
                >
                  {index < currentStep ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`text-sm mt-2 ${index <= currentStep ? 'text-primary-600 font-medium' : 'text-gray-400'}`}>
                  {step}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-0">
              <div 
                className="h-full bg-primary-600 transition-all" 
                style={{ width: `${(currentStep) * 50}%` }}
              />
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Information Step */}
            {currentStep === 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input 
                      id="email" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      placeholder="your@email.com" 
                    />
                  </div>
                  
                  <div className="flex items-center space-x-2 text-sm">
                    <input type="checkbox" id="createAccount" className="rounded border-gray-300" />
                    <Label htmlFor="createAccount">Create an account for faster checkout next time</Label>
                  </div>
                  
                  <div className="pt-4">
                    <CardTitle className="mb-4">Shipping Address</CardTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input 
                          id="firstName" 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)}
                          placeholder="John" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input 
                          id="lastName" 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)}
                          placeholder="Doe" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2 mt-4">
                      <Label htmlFor="address">Address</Label>
                      <Input 
                        id="address" 
                        value={address} 
                        onChange={(e) => setAddress(e.target.value)}
                        placeholder="123 Main St" 
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                      <div className="space-y-2">
                        <Label htmlFor="city">City</Label>
                        <Input 
                          id="city" 
                          value={city} 
                          onChange={(e) => setCity(e.target.value)}
                          placeholder="San Francisco" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="state">State</Label>
                        <Input 
                          id="state" 
                          value={state} 
                          onChange={(e) => setState(e.target.value)}
                          placeholder="California" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="zip">ZIP Code</Label>
                        <Input 
                          id="zip" 
                          value={zipCode} 
                          onChange={(e) => setZipCode(e.target.value)}
                          placeholder="94103" 
                        />
                      </div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <Button onClick={handleNextStep} className="bg-primary-600 hover:bg-primary-700">
                    Continue to Shipping
                    <ChevronRight className="ml-2" size={16} />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Shipping Step */}
            {currentStep === 1 && (
              <Card>
                <CardHeader>
                  <CardTitle>Shipping Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between border rounded-md p-4 bg-primary-50">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="shipping-standard" 
                          name="shipping-method" 
                          className="mr-3"
                          defaultChecked 
                        />
                        <div>
                          <Label htmlFor="shipping-standard" className="font-medium">Standard Shipping</Label>
                          <p className="text-sm text-gray-500">Delivery in 3-5 business days</p>
                        </div>
                      </div>
                      <span>Free</span>
                    </div>
                    <div className="flex items-center justify-between border rounded-md p-4">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="shipping-express" 
                          name="shipping-method" 
                          className="mr-3" 
                        />
                        <div>
                          <Label htmlFor="shipping-express" className="font-medium">Express Shipping</Label>
                          <p className="text-sm text-gray-500">Delivery in 1-2 business days</p>
                        </div>
                      </div>
                      <span>$12.99</span>
                    </div>
                    <div className="flex items-center justify-between border rounded-md p-4">
                      <div className="flex items-center">
                        <input 
                          type="radio" 
                          id="shipping-nextday" 
                          name="shipping-method" 
                          className="mr-3" 
                        />
                        <div>
                          <Label htmlFor="shipping-nextday" className="font-medium">Next Day Delivery</Label>
                          <p className="text-sm text-gray-500">Order by 2pm for delivery tomorrow</p>
                        </div>
                      </div>
                      <span>$24.99</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back to Information
                  </Button>
                  <Button onClick={handleNextStep} className="bg-primary-600 hover:bg-primary-700">
                    Continue to Payment
                    <ChevronRight className="ml-2" size={16} />
                  </Button>
                </CardFooter>
              </Card>
            )}
            
            {/* Payment Step */}
            {currentStep === 2 && (
              <Card>
                <CardHeader>
                  <CardTitle>Payment Method</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input 
                      id="cardNumber" 
                      value={cardNumber} 
                      onChange={(e) => setCardNumber(e.target.value)}
                      placeholder="1234 5678 9012 3456" 
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-2 md:col-span-2">
                      <Label htmlFor="expiryDate">Expiry Date</Label>
                      <Input 
                        id="expiryDate" 
                        value={expiryDate} 
                        onChange={(e) => setExpiryDate(e.target.value)}
                        placeholder="MM/YY" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input 
                        id="cvv" 
                        value={cvv} 
                        onChange={(e) => setCvv(e.target.value)}
                        placeholder="123" 
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="nameOnCard">Name on Card</Label>
                    <Input 
                      id="nameOnCard" 
                      value={nameOnCard} 
                      onChange={(e) => setNameOnCard(e.target.value)}
                      placeholder="John Doe" 
                    />
                  </div>
                  <div className="flex items-center space-x-2 text-sm mt-4">
                    <input type="checkbox" id="saveCard" className="rounded border-gray-300" />
                    <Label htmlFor="saveCard">Save this card for future purchases</Label>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" onClick={handlePreviousStep}>
                    Back to Shipping
                  </Button>
                  <Button 
                    onClick={handleCompletePurchase} 
                    className="bg-primary-600 hover:bg-primary-700"
                    disabled={isCompleting}
                  >
                    {isCompleting ? "Processing..." : "Complete Purchase"}
                  </Button>
                </CardFooter>
              </Card>
            )}
          </div>
          
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>Order Summary</span>
                  <span className="text-sm font-normal text-primary-600 hover:underline">
                    <Link to="/cart">Edit Cart</Link>
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="max-h-60 overflow-auto space-y-3">
                  {cart.map((item) => {
                    const product = getProductById(item.productId);
                    if (!product) return null;
                    
                    return (
                      <div key={item.productId} className="flex items-center gap-4">
                        <div className="w-16 h-16 bg-gray-100 rounded overflow-hidden flex-shrink-0">
                          <img 
                            src={product.images[0]} 
                            alt={product.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium line-clamp-1">{product.name}</p>
                          <p className="text-sm text-gray-500">
                            {item.color} / {item.size} / Qty: {item.quantity}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">
                            ${(product.price * item.quantity).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
                
                <div className="pt-4 space-y-2">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Taxes</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  
                  <div className="pt-2 mt-2">
                    <div className="flex justify-between items-center border-t border-b py-2 font-bold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-4">
                  <input
                    type="text"
                    placeholder="Discount code"
                    className="w-full p-2.5 border rounded-md"
                  />
                  <Button variant="outline" className="w-full mt-2">
                    Apply Discount
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Checkout;
