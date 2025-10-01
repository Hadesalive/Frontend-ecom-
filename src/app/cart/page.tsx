"use client";

import { Nav } from "../(ui)/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingBag as ShoppingBagIcon,
  Plus,
  Minus,
  Trash2,
  Heart as HeartIcon,
  ArrowLeft,
  Truck,
  Shield,
  RotateCcw
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";

// Mock cart data - in real app this would come from context/state management
const mockCartItems = [
  {
    id: 1,
    name: "MacBook Air M3",
    price: 1299,
    originalPrice: 1499,
    image: "/assets/photo-1598094670018-abf669538033.avif",
    quantity: 1,
    inStock: true,
    badge: "Best Seller"
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 999,
    originalPrice: 1199,
    image: "/assets/photo-1585565804112-f201f68c48b4.avif",
    quantity: 2,
    inStock: true,
    badge: "New"
  },
  {
    id: 3,
    name: "iPad Pro 12.9\"",
    price: 1099,
    originalPrice: null,
    image: "/assets/photo-1594344141311-8ea00ba55612.avif",
    quantity: 1,
    inStock: false,
    badge: "Limited"
  }
];

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

function CartItem({ item, onUpdateQuantity, onRemove, onToggleFavorite }: {
  item: typeof mockCartItems[0];
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
  onToggleFavorite: (id: number) => void;
}) {
  const [isFavorited, setIsFavorited] = useState(false);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20, scale: 0.95 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group transition-all duration-300 border-none bg-transparent shadow-none p-0">
        <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 p-4 sm:p-6 rounded-2xl border" style={{ 
          background: 'var(--background)', 
          borderColor: 'color-mix(in oklab, var(--accent) 20%, var(--color-border))' 
        }}>
          {/* Product Image */}
          <div className="relative w-full sm:w-24 h-48 sm:h-24 rounded-xl overflow-hidden flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
            {item.badge && (
              <Badge 
                className="absolute top-2 left-2 text-[10px] px-1.5 py-0.5"
                style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}
              >
                {item.badge}
              </Badge>
            )}
            {!item.inStock && (
              <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                <span className="text-white font-semibold text-sm">Out of Stock</span>
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-lg text-[--color-foreground] truncate">
                  {item.name}
                </h3>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xl font-bold" style={{ color: 'var(--accent)' }}>
                    {formatPrice(item.price)}
                  </span>
                  {item.originalPrice && (
                    <span className="text-sm text-[--color-muted-foreground] line-through">
                      {formatPrice(item.originalPrice)}
                    </span>
                  )}
                </div>
              </div>
              
              {/* Actions */}
              <div className="flex items-center gap-2 ml-0 sm:ml-4">
                <button
                  onClick={() => onToggleFavorite(item.id)}
                  className={`p-2 rounded-full transition-colors ${
                    isFavorited 
                      ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' 
                      : 'hover:bg-gray-100 dark:hover:bg-gray-800'
                  }`}
                >
                  <HeartIcon className={`w-4 h-4 ${isFavorited ? 'fill-current' : ''}`} />
                </button>
                <button
                  onClick={() => onRemove(item.id)}
                  className="p-2 rounded-full hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500 hover:text-red-600 transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 sm:gap-4 mt-4">
              <div className="flex items-center border rounded-lg" style={{ borderColor: 'var(--color-border)' }}>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))}
                  className="h-8 w-8"
                  disabled={item.quantity <= 1}
                >
                  <Minus className="w-3 h-3" />
                </Button>
                <span className="px-3 py-1 text-sm font-medium min-w-[2rem] text-center">
                  {item.quantity}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                  className="h-8 w-8"
                  disabled={!item.inStock}
                >
                  <Plus className="w-3 h-3" />
                </Button>
              </div>
              
              <div className="text-sm text-[--color-muted-foreground]">
                Total: <span className="font-semibold text-[--color-foreground]">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="mt-4 pt-4 border-t" style={{ borderColor: 'color-mix(in oklab, var(--accent) 30%, var(--color-border))' }}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-[12px] text-[--color-muted-foreground]">
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} /> 
                  Free shipping
                </span>
                <span className="inline-flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} /> 
                  12‑mo warranty
                </span>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function CartPage() {
  const [cartItems, setCartItems] = useState(mockCartItems);
  const router = useRouter();

  const updateQuantity = (id: number, quantity: number) => {
    setCartItems(items => 
      items.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const toggleFavorite = (id: number) => {
    // In real app, this would update the item's favorite status
    console.log('Toggle favorite for item:', id);
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    router.push("/checkout");
  };

  return (
    <div>
      <Nav />
      
      {/* Header */}
      <section className="pt-24 pb-8" style={{ background: 'var(--background)' }}>
        <div className="container-max">
          <div className="flex items-center gap-4 mb-8">
            <div>
              <h1 className="text-4xl font-bold">Shopping Cart</h1>
              <p className="text-[--color-muted-foreground] mt-2">
                {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Cart Content */}
      <section className="py-8" style={{ background: 'var(--background)' }}>
        <div className="container-max">
          <div className="grid lg:grid-cols-[1fr_400px] gap-6 lg:gap-8">
            {/* Cart Items */}
            <div className="space-y-6">
              {cartItems.length === 0 ? (
                <Card className="p-12 text-center border" style={{ 
                  background: 'var(--background)', 
                  borderColor: 'color-mix(in oklab, var(--accent) 20%, var(--color-border))' 
                }}>
                  <ShoppingBagIcon className="w-16 h-16 mx-auto mb-4" style={{ color: 'var(--accent)' }} />
                  <h3 className="text-xl font-semibold mb-2 text-[--color-foreground]">Your cart is empty</h3>
                  <p className="text-[--color-muted-foreground] mb-6">
                    Looks like you haven&apos;t added any items to your cart yet.
                  </p>
                  <Button asChild style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}>
                    <Link href="/shop">Continue Shopping</Link>
                  </Button>
                </Card>
              ) : (
                <AnimatePresence mode="popLayout">
                  {cartItems.map((item) => (
                    <CartItem
                      key={item.id}
                      item={item}
                      onUpdateQuantity={updateQuantity}
                      onRemove={removeItem}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:sticky lg:top-32 order-first lg:order-none">
              <Card className="p-4 sm:p-6 border" style={{ 
                background: 'var(--background)', 
                borderColor: 'color-mix(in oklab, var(--accent) 20%, var(--color-border))' 
              }}>
                <h3 className="text-xl font-semibold mb-6">Order Summary</h3>
                
                <div className="space-y-4">
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
                  <div className="border-t pt-4" style={{ borderColor: 'color-mix(in oklab, var(--accent) 30%, var(--color-border))' }}>
                    <div className="flex justify-between text-lg font-semibold">
                      <span className="text-[--color-foreground]">Total</span>
                      <span style={{ color: 'var(--accent)' }}>{formatPrice(total)}</span>
                    </div>
                  </div>
                </div>

                <Button
                  className="w-full h-12 text-base sm:text-lg mt-6"
                  disabled={cartItems.length === 0}
                  onClick={handleCheckout}
                  style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}
                >
                  <ShoppingBagIcon className="w-5 h-5 mr-2" />
                  Proceed to Checkout
                </Button>

                {/* Trust Signals */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mt-6 pt-6 border-t" style={{ borderColor: 'color-mix(in oklab, var(--accent) 30%, var(--color-border))' }}>
                  <div className="text-center">
                    <Truck className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--accent)' }} />
                    <p className="text-xs text-[--color-muted-foreground]">Free Shipping</p>
                  </div>
                  <div className="text-center">
                    <Shield className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--accent)' }} />
                    <p className="text-xs text-[--color-muted-foreground]">Secure Checkout</p>
                  </div>
                  <div className="text-center">
                    <RotateCcw className="w-5 h-5 mx-auto mb-1" style={{ color: 'var(--accent)' }} />
                    <p className="text-xs text-[--color-muted-foreground]">Easy Returns</p>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}


