
import * as z from 'zod';

export const contactSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  createAccount: z.boolean().optional(),
});

export const shippingSchema = z.object({
  firstName: z.string().min(2, "First name is required"),
  lastName: z.string().min(2, "Last name is required"),
  address: z.string().min(5, "Address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  zipCode: z.string().min(5, "Valid ZIP code is required"),
});

export const paymentMethodSchema = z.object({
  method: z.enum(['creditCard', 'paypal', 'razorpay', 'phonepe', 'googlepay', 'bhimUPI']),
  cardNumber: z.string().optional(),
  expiryDate: z.string().optional(),
  cvv: z.string().optional(),
  nameOnCard: z.string().optional(),
  upiId: z.string().optional(),
  savePaymentMethod: z.boolean().optional(),
});

export const checkoutSchema = z.object({
  contact: contactSchema,
  shipping: shippingSchema,
  shippingMethod: z.enum(['standard', 'express', 'nextday']),
  payment: paymentMethodSchema,
});

export type CheckoutFormValues = z.infer<typeof checkoutSchema>;
