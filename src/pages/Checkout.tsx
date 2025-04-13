
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Link } from 'react-router-dom';
import { useAppStore } from '@/store';
import { getProductById } from '@/data/products';
import { Separator } from '@/components/ui/separator';
import { ChevronRight, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner';
import { 
  Form, 
  FormControl, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import PaymentMethods from '@/components/checkout/PaymentMethods';
import PaymentLoader from '@/components/common/PaymentLoader';
import { 
  checkoutSchema, 
  CheckoutFormValues
} from '@/schemas/checkoutSchema';

const Checkout = () => {
  // Checkout steps
  const steps = ["Information", "Shipping", "Payment"];
  const [currentStep, setCurrentStep] = useState(0);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const navigate = useNavigate();
  
  const { cart, clearCart } = useAppStore();
  
  const form = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      contact: {
        email: "user@example.com",
        createAccount: false,
      },
      shipping: {
        firstName: "",
        lastName: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
      },
      shippingMethod: "standard",
      payment: {
        method: "creditCard",
        cardNumber: "",
        expiryDate: "",
        cvv: "",
        nameOnCard: "",
        upiId: "",
        savePaymentMethod: false,
      },
    },
  });
  
  useEffect(() => {
    // If cart is empty, redirect to cart page
    if (cart.length === 0) {
      navigate('/cart');
      toast.error("Your cart is empty");
    }
    
    // Save cart items to localStorage for order preview
    localStorage.setItem('cartItems', JSON.stringify(cart));
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
    if (currentStep === 0) {
      // Validate contact and shipping fields
      form.trigger(['contact', 'shipping']);
      const contactValid = !form.getFieldState('contact').invalid;
      const shippingValid = !form.getFieldState('shipping').invalid;
      
      if (contactValid && shippingValid) {
        setCurrentStep(1);
      }
    } else if (currentStep === 1) {
      // Just move to payment step, shipping method selection is optional
      setCurrentStep(2);
    }
  };

  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const onSubmit = (data: CheckoutFormValues) => {
    console.log("Form data:", data);
    setIsProcessingPayment(true);
    
    // Simulate payment processing
    setTimeout(() => {
      // Generate a random order ID
      const orderId = Math.floor(10000 + Math.random() * 90000).toString();
      
      toast.success("Payment successful!");
      setIsProcessingPayment(false);
      
      // Navigate to order preview page with the order ID
      navigate(`/order-preview/${orderId}`);
    }, 3000);
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
                      ? 'bg-primary border-primary text-white' 
                      : index === currentStep 
                        ? 'border-primary text-primary' 
                        : 'border-gray-300 text-gray-300'
                    }`}
                >
                  {index < currentStep ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    index + 1
                  )}
                </div>
                <span className={`text-sm mt-2 ${index <= currentStep ? 'text-primary font-medium' : 'text-gray-400'}`}>
                  {step}
                </span>
              </div>
            ))}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-0">
              <div 
                className="h-full bg-primary transition-all" 
                style={{ width: `${(currentStep) * 50}%` }}
              />
            </div>
          </div>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                {/* Information Step */}
                {currentStep === 0 && (
                  <Card>
                    <CardHeader>
                      <CardTitle>Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <FormField
                        control={form.control}
                        name="contact.email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input placeholder="your@email.com" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <div className="flex items-center space-x-2 text-sm">
                        <FormField
                          control={form.control}
                          name="contact.createAccount"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300"
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Create an account for faster checkout next time
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                      
                      <div className="pt-4">
                        <CardTitle className="mb-4">Shipping Address</CardTitle>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <FormField
                            control={form.control}
                            name="shipping.firstName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>First Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="John" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="shipping.lastName"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Last Name</FormLabel>
                                <FormControl>
                                  <Input placeholder="Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-2 mt-4">
                          <FormField
                            control={form.control}
                            name="shipping.address"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                  <Input placeholder="123 Main St" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
                          <FormField
                            control={form.control}
                            name="shipping.city"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>City</FormLabel>
                                <FormControl>
                                  <Input placeholder="San Francisco" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="shipping.state"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>State</FormLabel>
                                <FormControl>
                                  <Input placeholder="California" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="shipping.zipCode"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>ZIP Code</FormLabel>
                                <FormControl>
                                  <Input placeholder="94103" {...field} />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-end">
                      <Button 
                        type="button"
                        onClick={handleNextStep} 
                        className="bg-primary hover:bg-primary/90"
                      >
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
                        <FormField
                          control={form.control}
                          name="shippingMethod"
                          render={({ field }) => (
                            <FormItem>
                              <FormControl>
                                <div className="space-y-4">
                                  <div className={`flex items-center justify-between border rounded-md p-4 ${
                                    field.value === 'standard' ? 'bg-primary-50' : ''
                                  }`}>
                                    <div className="flex items-center">
                                      <input 
                                        type="radio" 
                                        id="shipping-standard" 
                                        className="mr-3"
                                        checked={field.value === 'standard'}
                                        onChange={() => field.onChange('standard')}
                                      />
                                      <div>
                                        <FormLabel htmlFor="shipping-standard" className="font-medium">Standard Shipping</FormLabel>
                                        <p className="text-sm text-gray-500">Delivery in 3-5 business days</p>
                                      </div>
                                    </div>
                                    <span>Free</span>
                                  </div>
                                  
                                  <div className={`flex items-center justify-between border rounded-md p-4 ${
                                    field.value === 'express' ? 'bg-primary-50' : ''
                                  }`}>
                                    <div className="flex items-center">
                                      <input 
                                        type="radio" 
                                        id="shipping-express" 
                                        className="mr-3"
                                        checked={field.value === 'express'}
                                        onChange={() => field.onChange('express')}
                                      />
                                      <div>
                                        <FormLabel htmlFor="shipping-express" className="font-medium">Express Shipping</FormLabel>
                                        <p className="text-sm text-gray-500">Delivery in 1-2 business days</p>
                                      </div>
                                    </div>
                                    <span>$12.99</span>
                                  </div>
                                  
                                  <div className={`flex items-center justify-between border rounded-md p-4 ${
                                    field.value === 'nextday' ? 'bg-primary-50' : ''
                                  }`}>
                                    <div className="flex items-center">
                                      <input 
                                        type="radio" 
                                        id="shipping-nextday" 
                                        className="mr-3"
                                        checked={field.value === 'nextday'}
                                        onChange={() => field.onChange('nextday')}
                                      />
                                      <div>
                                        <FormLabel htmlFor="shipping-nextday" className="font-medium">Next Day Delivery</FormLabel>
                                        <p className="text-sm text-gray-500">Order by 2pm for delivery tomorrow</p>
                                      </div>
                                    </div>
                                    <span>$24.99</span>
                                  </div>
                                </div>
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={handlePreviousStep}>
                        Back to Information
                      </Button>
                      <Button type="button" onClick={handleNextStep} className="bg-primary hover:bg-primary/90">
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
                    <CardContent className="space-y-6">
                      <PaymentMethods control={form.control} />
                      
                      <div className="flex items-center space-x-2 text-sm mt-4">
                        <FormField
                          control={form.control}
                          name="payment.savePaymentMethod"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                              <FormControl>
                                <input
                                  type="checkbox"
                                  className="rounded border-gray-300"
                                  checked={field.value}
                                  onChange={field.onChange}
                                />
                              </FormControl>
                              <div className="space-y-1 leading-none">
                                <FormLabel>
                                  Save this payment method for future purchases
                                </FormLabel>
                              </div>
                            </FormItem>
                          )}
                        />
                      </div>
                    </CardContent>
                    <CardFooter className="flex justify-between">
                      <Button variant="outline" type="button" onClick={handlePreviousStep}>
                        Back to Shipping
                      </Button>
                      <Button 
                        type="submit" 
                        className="bg-primary hover:bg-primary/90"
                        disabled={isProcessingPayment}
                      >
                        {isProcessingPayment ? "Processing..." : "Complete Purchase"}
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
                      <span className="text-sm font-normal text-primary hover:underline">
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
                      <Input
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
          </form>
        </Form>
        
        {/* Payment Processing Loader */}
        <PaymentLoader isProcessing={isProcessingPayment} />
      </div>
    </Layout>
  );
};

export default Checkout;
