"use client";

import { Nav } from "../(ui)/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  CreditCard, 
  Lock, 
  ArrowLeft,
  CheckCircle,
  Truck,
  Shield,
  RotateCcw,
  ShoppingBag as ShoppingBagIcon
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

// Mock order data - in real app this would come from context/state management
const mockOrderItems = [
  {
    id: 1,
    name: "MacBook Air M3",
    price: 1299,
    image: "/assets/photo-1598094670018-abf669538033.avif",
    quantity: 1,
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 999,
    image: "/assets/photo-1585565804112-f201f68c48b4.avif",
    quantity: 1,
    badge: "New"
  }
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [isComplete, setIsComplete] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: ""
  });

  const subtotal = mockOrderItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsProcessing(false);
    setIsComplete(true);
  };

  if (isComplete) {
    return (
      <div>
        <Nav />
        
        {/* Success Page */}
        <section className="pt-24 pb-8" style={{ background: 'var(--background)' }}>
          <div className="container-max">
            <div className="max-w-2xl mx-auto text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 200, damping: 15 }}
                className="w-20 h-20 mx-auto mb-6 rounded-full flex items-center justify-center"
                style={{ background: 'var(--accent)' }}
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
              
              <h1 className="text-4xl font-bold mb-4 text-[--color-foreground]">Order Confirmed!</h1>
              <p className="text-lg text-[--color-muted-foreground] mb-8">
                Thank you for your purchase. We&apos;ve sent you a confirmation email with your order details.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button asChild size="lg" style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}>
                  <Link href="/shop">Continue Shopping</Link>
                </Button>
                <Button asChild variant="outline" size="lg">
                  <Link href="/dashboard">View Orders</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div>
      <Nav />
      
              {/* Header */}
              <section className="pt-24 pb-8" style={{ background: 'var(--background)' }}>
                <div className="container-max">
                  <div className="mb-8">
                    <h1 className="text-4xl font-bold">Checkout</h1>
                    <p className="text-[--color-muted-foreground] mt-2">
                      Complete your purchase securely
                    </p>
                  </div>
                </div>
              </section>

      {/* Checkout Form */}
      <section className="py-8" style={{ background: 'var(--background)' }}>
        <div className="container-max">
          <div className="grid lg:grid-cols-[1fr_400px] gap-8">
            {/* Checkout Form */}
            <div className="space-y-8">
              <form onSubmit={handleSubmit} className="space-y-8">
                {/* Contact Information */}
                <Card className="border" style={{ 
                  background: 'var(--background)', 
                  borderColor: 'color-mix(in oklab, var(--accent) 20%, var(--color-border))' 
                }}>
                  <CardHeader>
                    <CardTitle className="text-xl">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={formData.firstName}
                          onChange={(e) => handleInputChange("firstName", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input
                          id="lastName"
                          value={formData.lastName}
                          onChange={(e) => handleInputChange("lastName", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => handleInputChange("email", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                  </CardContent>
                </Card>

                {/* Shipping Address */}
                <Card className="border" style={{ 
                  background: 'var(--background)', 
                  borderColor: 'color-mix(in oklab, var(--accent) 20%, var(--color-border))' 
                }}>
                  <CardHeader>
                    <CardTitle className="text-xl">Shipping Address</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="address">Street Address</Label>
                      <Input
                        id="address"
                        value={formData.address}
                        onChange={(e) => handleInputChange("address", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <Label htmlFor="city">City</Label>
                        <Input
                          id="city"
                          value={formData.city}
                          onChange={(e) => handleInputChange("city", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="state">State</Label>
                        <Input
                          id="state"
                          value={formData.state}
                          onChange={(e) => handleInputChange("state", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode">Postal Code</Label>
                        <Input
                          id="postalCode"
                          value={formData.postalCode}
                          onChange={(e) => handleInputChange("postalCode", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card className="border" style={{ 
                  background: 'var(--background)', 
                  borderColor: 'color-mix(in oklab, var(--accent) 20%, var(--color-border))' 
                }}>
                  <CardHeader>
                    <CardTitle className="text-xl flex items-center gap-2">
                      <CreditCard className="w-5 h-5" style={{ color: 'var(--accent)' }} />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="cardNumber">Card Number</Label>
                      <Input
                        id="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) => handleInputChange("cardNumber", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="nameOnCard">Name on Card</Label>
                      <Input
                        id="nameOnCard"
                        value={formData.nameOnCard}
                        onChange={(e) => handleInputChange("nameOnCard", e.target.value)}
                        required
                        className="mt-1"
                      />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="expiryDate">Expiry Date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) => handleInputChange("expiryDate", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label htmlFor="cvv">CVV</Label>
                        <Input
                          id="cvv"
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) => handleInputChange("cvv", e.target.value)}
                          required
                          className="mt-1"
                        />
                      </div>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-[--color-muted-foreground]">
                      <Lock className="w-4 h-4" style={{ color: 'var(--accent)' }} />
                      <span>Your payment information is secure and encrypted</span>
                    </div>
                  </CardContent>
                </Card>

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-lg"
                  disabled={isProcessing}
                  style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}
                >
                  {isProcessing ? (
                    <motion.div
                      className="flex items-center gap-2"
                      animate={{ opacity: [1, 0.5, 1] }}
                      transition={{ duration: 1, repeat: Infinity }}
                    >
                      <ShoppingBagIcon className="w-5 h-5" />
                      Processing Payment...
                    </motion.div>
                  ) : (
                    <>
                      <CreditCard className="w-5 h-5 mr-2" />
                      Complete Purchase
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-32">
              <Card className="border" style={{ 
                background: 'var(--background)', 
                borderColor: 'color-mix(in oklab, var(--accent) 20%, var(--color-border))' 
              }}>
                <CardHeader>
                  <CardTitle className="text-xl">Order Summary</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Order Items */}
                  <div className="space-y-4">
                    {mockOrderItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                          {item.badge && (
                            <div className="absolute top-1 left-1 text-[8px] px-1 py-0.5 rounded" style={{ 
                              background: 'var(--accent)', 
                              color: 'var(--accent-contrast)' 
                            }}>
                              {item.badge}
                            </div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm text-[--color-foreground] truncate">
                            {item.name}
                          </h4>
                          <p className="text-sm text-[--color-muted-foreground]">
                            Qty: {item.quantity}
                          </p>
                          <p className="text-sm font-semibold" style={{ color: 'var(--accent)' }}>
                            {formatPrice(item.price * item.quantity)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Totals */}
                  <div className="space-y-3 pt-4 border-t" style={{ borderColor: 'color-mix(in oklab, var(--accent) 30%, var(--color-border))' }}>
                    <div className="flex justify-between">
                      <span className="text-[--color-foreground]">Subtotal</span>
                      <span className="text-[--color-foreground]">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[--color-foreground]">Shipping</span>
                      <span>
                        {shipping === 0 ? (
                          <span className="text-green-600 font-medium">Free</span>
                        ) : (
                          <span className="text-[--color-foreground]">{formatPrice(shipping)}</span>
                        )}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[--color-foreground]">Tax</span>
                      <span className="text-[--color-foreground]">{formatPrice(tax)}</span>
                    </div>
                    <div className="flex justify-between text-lg font-semibold pt-3 border-t" style={{ borderColor: 'color-mix(in oklab, var(--accent) 30%, var(--color-border))' }}>
                      <span className="text-[--color-foreground]">Total</span>
                      <span style={{ color: 'var(--accent)' }}>{formatPrice(total)}</span>
                    </div>
                  </div>

                  {/* Trust Signals */}
                  <div className="grid grid-cols-3 gap-4 pt-6 border-t" style={{ borderColor: 'color-mix(in oklab, var(--accent) 30%, var(--color-border))' }}>
                    <div className="text-center">
                      <Truck className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--accent)' }} />
                      <p className="text-xs text-[--color-muted-foreground]">Free Shipping</p>
                    </div>
                    <div className="text-center">
                      <Shield className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--accent)' }} />
                      <p className="text-xs text-[--color-muted-foreground]">Secure Payment</p>
                    </div>
                    <div className="text-center">
                      <RotateCcw className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--accent)' }} />
                      <p className="text-xs text-[--color-muted-foreground]">Easy Returns</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
          </div>
      </section>
    </div>
  );
}


