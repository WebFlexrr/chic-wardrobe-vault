
import React from 'react';
import { 
  Accordion, 
  AccordionContent, 
  AccordionItem, 
  AccordionTrigger 
} from "@/components/ui/accordion";
import { 
  CreditCard, 
  Banknote, 
  SmartphoneNfc,
  Phone,
  ArrowRightLeft
} from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Control } from 'react-hook-form';
import { CheckoutFormValues } from '@/schemas/checkoutSchema';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';

interface PaymentMethodsProps {
  control: Control<CheckoutFormValues>;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ control }) => {
  return (
    <Accordion type="single" defaultValue="creditCard" className="w-full">
      <AccordionItem value="creditCard" className="border rounded-md p-2 mb-3">
        <FormField
          control={control}
          name="payment.method"
          render={({ field }) => (
            <>
              <AccordionTrigger className="px-3 py-2 flex items-center">
                <div className="flex items-center flex-1">
                  <input
                    type="radio"
                    className="mr-3"
                    id="payment-card"
                    checked={field.value === "creditCard"}
                    onChange={() => field.onChange("creditCard")}
                  />
                  <CreditCard className="mr-3 h-5 w-5 text-gray-500" />
                  <Label htmlFor="payment-card">Credit / Debit Card</Label>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-4">
                <div className="space-y-4">
                  <FormField
                    control={control}
                    name="payment.cardNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="1234 5678 9012 3456" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-3 gap-4">
                    <FormField
                      control={control}
                      name="payment.expiryDate"
                      render={({ field }) => (
                        <FormItem className="col-span-2">
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={control}
                      name="payment.cvv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input type="password" placeholder="123" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={control}
                    name="payment.nameOnCard"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl>
                          <Input placeholder="John Doe" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </>
          )}
        />
      </AccordionItem>

      <AccordionItem value="paypal" className="border rounded-md p-2 mb-3">
        <FormField
          control={control}
          name="payment.method"
          render={({ field }) => (
            <>
              <AccordionTrigger className="px-3 py-2 flex items-center">
                <div className="flex items-center flex-1">
                  <input
                    type="radio"
                    className="mr-3"
                    id="payment-paypal"
                    checked={field.value === "paypal"}
                    onChange={() => field.onChange("paypal")}
                  />
                  <div className="mr-3 h-5 w-5 flex items-center justify-center text-[#003087]">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="currentColor" d="M19.554 9.488c.121.563.106 1.246-.04 2.051-.582 2.978-2.477 4.466-5.683 4.466h-.442a.666.666 0 0 0-.444.166.72.72 0 0 0-.24.429l-.041.183-.553 3.479-.021.151a.706.706 0 0 1-.247.429.666.666 0 0 1-.443.166H8.872a.564.564 0 0 1-.493-.251.664.664 0 0 1-.07-.526l.799-5.076v-.281c0-.36.075-.664.217-.903.142-.24.347-.415.608-.517.152-.061.313-.104.479-.134.151-.031.352-.051.608-.061h1.147c.443 0 .886-.01 1.329-.031 1.329-.061 2.478-.393 3.427-.995s1.659-1.469 2.108-2.579c.099-.229.185-.459.26-.688h-.603a7.37 7.37 0 0 0-.148-.056 3.506 3.506 0 0 0-.148-.056H12.6s.01-.031.021-.031a.618.618 0 0 0 .148-.126.9.9 0 0 0 .148-.258 1.668 1.668 0 0 0 .357-.893z" />
                      <path fill="currentColor" d="M18.052 6.223c.216.061.422.134.619.227a3.35 3.35 0 0 1 .619.356c.198.14.383.313.56.517.173.198.336.422.481.664.124.188.228.391.33.603h.781c.313-1.329.346-2.478.124-3.433-.228-.955-.633-1.659-1.232-2.121a5.082 5.082 0 0 0-1.833-.895 8.86 8.86 0 0 0-2.081-.258H8.933a.978.978 0 0 0-.956.798L4.367 18.371c-.061.313-.011.547.148.712.148.154.364.227.665.227h3.531l.886-5.612-.03.031c-.01-.154.011-.288.061-.422.104-.309.365-.464.781-.464h1.626c3.175 0 5.653-1.286 7.414-3.858.124-.186.238-.361.332-.542-.381-.134-.79-.191-1.229-.191h-.02l-.48-.029z" />
                    </svg>
                  </div>
                  <Label htmlFor="payment-paypal">PayPal</Label>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-4">
                <div className="text-center p-4">
                  <p>You will be redirected to PayPal to complete your payment.</p>
                </div>
              </AccordionContent>
            </>
          )}
        />
      </AccordionItem>

      <AccordionItem value="razorpay" className="border rounded-md p-2 mb-3">
        <FormField
          control={control}
          name="payment.method"
          render={({ field }) => (
            <>
              <AccordionTrigger className="px-3 py-2 flex items-center">
                <div className="flex items-center flex-1">
                  <input
                    type="radio"
                    className="mr-3"
                    id="payment-razorpay"
                    checked={field.value === "razorpay"}
                    onChange={() => field.onChange("razorpay")}
                  />
                  <div className="mr-3 h-5 w-5 flex items-center justify-center text-[#072654]">
                    <ArrowRightLeft className="h-5 w-5" />
                  </div>
                  <Label htmlFor="payment-razorpay">Razorpay</Label>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-4">
                <div className="text-center p-4">
                  <p>You will be redirected to Razorpay to complete your payment.</p>
                </div>
              </AccordionContent>
            </>
          )}
        />
      </AccordionItem>

      <AccordionItem value="phonepe" className="border rounded-md p-2 mb-3">
        <FormField
          control={control}
          name="payment.method"
          render={({ field }) => (
            <>
              <AccordionTrigger className="px-3 py-2 flex items-center">
                <div className="flex items-center flex-1">
                  <input
                    type="radio"
                    className="mr-3"
                    id="payment-phonepe"
                    checked={field.value === "phonepe"}
                    onChange={() => field.onChange("phonepe")}
                  />
                  <div className="mr-3 h-5 w-5 flex items-center justify-center text-[#5f259f]">
                    <Phone className="h-5 w-5" />
                  </div>
                  <Label htmlFor="payment-phonepe">PhonePe UPI</Label>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-4">
                <div className="text-center p-4">
                  <p>Scan QR code with PhonePe app or enter your UPI ID.</p>
                  <FormField
                    control={control}
                    name="payment.upiId"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>PhonePe UPI ID</FormLabel>
                        <FormControl>
                          <Input placeholder="username@ybl" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </>
          )}
        />
      </AccordionItem>

      <AccordionItem value="googlepay" className="border rounded-md p-2 mb-3">
        <FormField
          control={control}
          name="payment.method"
          render={({ field }) => (
            <>
              <AccordionTrigger className="px-3 py-2 flex items-center">
                <div className="flex items-center flex-1">
                  <input
                    type="radio"
                    className="mr-3"
                    id="payment-googlepay"
                    checked={field.value === "googlepay"}
                    onChange={() => field.onChange("googlepay")}
                  />
                  <div className="mr-3 h-5 w-5 flex items-center justify-center">
                    <svg viewBox="0 0 24 24" width="20" height="20">
                      <path fill="#4285F4" d="M20.64 12.2c0-.63-.06-1.25-.16-1.84H12v3.49h4.84a4.14 4.14 0 0 1-1.8 2.71v2.26h2.92c1.71-1.57 2.68-3.88 2.68-6.62z"/>
                      <path fill="#34A853" d="M12 21c2.43 0 4.47-.8 5.96-2.18l-2.92-2.26c-.8.54-1.84.86-3.04.86-2.34 0-4.32-1.58-5.03-3.7h-3.02v2.34A8.98 8.98 0 0 0 12 21z"/>
                      <path fill="#FBBC05" d="M6.97 13.72a5.44 5.44 0 0 1-.3-1.72c0-.6.11-1.18.3-1.72V7.94H3.96A8.98 8.98 0 0 0 3 12c0 1.45.35 2.82.96 4.04l3.01-2.32z"/>
                      <path fill="#EA4335" d="M12 7.58c1.32 0 2.5.45 3.44 1.35l2.58-2.59A8.98 8.98 0 0 0 12 3a8.98 8.98 0 0 0-8.04 5.04l3.01 2.32C7.68 8.58 9.66 7.58 12 7.58z"/>
                    </svg>
                  </div>
                  <Label htmlFor="payment-googlepay">Google Pay</Label>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-4">
                <div className="text-center p-4">
                  <p>Scan QR code with Google Pay or enter your UPI ID.</p>
                  <FormField
                    control={control}
                    name="payment.upiId"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>UPI ID</FormLabel>
                        <FormControl>
                          <Input placeholder="username@okicici" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </>
          )}
        />
      </AccordionItem>

      <AccordionItem value="bhimUPI" className="border rounded-md p-2">
        <FormField
          control={control}
          name="payment.method"
          render={({ field }) => (
            <>
              <AccordionTrigger className="px-3 py-2 flex items-center">
                <div className="flex items-center flex-1">
                  <input
                    type="radio"
                    className="mr-3"
                    id="payment-bhim"
                    checked={field.value === "bhimUPI"}
                    onChange={() => field.onChange("bhimUPI")}
                  />
                  <div className="mr-3 h-5 w-5 flex items-center justify-center">
                    <SmartphoneNfc className="h-5 w-5 text-[#2262CC]" />
                  </div>
                  <Label htmlFor="payment-bhim">BHIM UPI</Label>
                </div>
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-4">
                <div className="text-center p-4">
                  <p>Scan QR code with BHIM UPI app or enter your UPI ID.</p>
                  <FormField
                    control={control}
                    name="payment.upiId"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>UPI ID</FormLabel>
                        <FormControl>
                          <Input placeholder="username@upi" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </AccordionContent>
            </>
          )}
        />
      </AccordionItem>
    </Accordion>
  );
};

export default PaymentMethods;
