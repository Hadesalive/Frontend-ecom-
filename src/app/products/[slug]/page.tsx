"use client";

import { Nav } from "../../(ui)/components";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Star, 
  Heart as HeartIcon,
  ShoppingBag as ShoppingBagIcon,
  ArrowLeft,
  Share,
  Truck,
  Shield,
  RotateCcw,
  CheckCircle,
  Plus,
  Minus
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, use } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Mock product data - in real app this would come from API/database
const getProductData = (slug: string) => {
  const products = {
    "macbook-air-m3": {
      id: 1,
      name: "MacBook Air M3",
      price: 1299,
      originalPrice: 1499,
      rating: 4.8,
      reviews: 124,
      images: [
        "/assets/photo-1598094670018-abf669538033.avif",
        "/assets/photo-1585565804112-f201f68c48b4.avif",
        "/assets/photo-1594344141311-8ea00ba55612.avif"
      ],
      category: "mac",
      badge: "Best Seller",
      inStock: true,
      description: "The MacBook Air with M3 chip delivers exceptional performance in an incredibly thin and light design. Perfect for everything from everyday tasks to creative projects.",
      features: [
        "M3 chip with 8-core CPU and 8-core GPU",
        "13.6-inch Liquid Retina display",
        "Up to 18 hours of battery life",
        "8GB unified memory",
        "256GB SSD storage",
        "1080p FaceTime HD camera",
        "Touch ID"
      ],
      specifications: {
        "Display": "13.6-inch Liquid Retina display",
        "Processor": "Apple M3 chip",
        "Memory": "8GB unified memory",
        "Storage": "256GB SSD",
        "Graphics": "8-core GPU",
        "Camera": "1080p FaceTime HD camera",
        "Battery": "Up to 18 hours",
        "Weight": "2.7 pounds (1.24 kg)"
      }
    },
    "iphone-15-pro": {
      id: 2,
      name: "iPhone 15 Pro",
      price: 999,
      originalPrice: 1199,
      rating: 4.9,
      reviews: 89,
      images: [
        "/assets/photo-1585565804112-f201f68c48b4.avif",
        "/assets/photo-1598094670018-abf669538033.avif",
        "/assets/photo-1594344141311-8ea00ba55612.avif"
      ],
      category: "iphone",
      badge: "New",
      inStock: true,
      description: "The iPhone 15 Pro features the A17 Pro chip, titanium design, and advanced camera system. Built for pro users who demand the best.",
      features: [
        "A17 Pro chip with 6-core CPU",
        "6.1-inch Super Retina XDR display",
        "Pro camera system with 48MP main camera",
        "Titanium design",
        "Action Button",
        "USB-C connector",
        "5G capable"
      ],
      specifications: {
        "Display": "6.1-inch Super Retina XDR",
        "Processor": "A17 Pro chip",
        "Storage": "128GB, 256GB, 512GB, 1TB",
        "Camera": "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
        "Battery": "Up to 23 hours video playback",
        "Materials": "Titanium with Ceramic Shield",
        "Connectivity": "5G, Wi-Fi 6E, Bluetooth 5.3"
      }
    }
  };
  
  return products[slug as keyof typeof products] || products["macbook-air-m3"];
};

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const resolvedParams = use(params);
  const product = getProductData(resolvedParams.slug);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isFavorited, setIsFavorited] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);
  const [showAddedNotification, setShowAddedNotification] = useState(false);

  const handleAddToCart = async () => {
    setIsAddingToCart(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    setIsAddingToCart(false);
    setShowAddedNotification(true);
    
    // Hide notification after 3 seconds
    setTimeout(() => setShowAddedNotification(false), 3000);
  };

  return (
    <div>
      <Nav />
      
      {/* Breadcrumb */}
      <section className="pt-24 pb-8" style={{ background: 'var(--background)' }}>
        <div className="container-max">
          <div className="flex items-center gap-2 text-sm text-[--color-muted-foreground] mb-8">
            <Link href="/" className="hover:text-[--accent] transition-colors">Home</Link>
            <span>/</span>
            <Link href="/shop" className="hover:text-[--accent] transition-colors">Shop</Link>
            <span>/</span>
            <span className="text-[--color-foreground]">{product.name}</span>
          </div>
        </div>
      </section>

      {/* Product Details */}
      <section className="py-8" style={{ background: 'var(--background)' }}>
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Product Images */}
            <div className="space-y-4">
              <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute top-4 left-4">
                  <Badge 
                    className="bg-[--accent] text-white border-0"
                    style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}
                  >
                    {product.badge}
                  </Badge>
                </div>
                <button 
                  onClick={() => setIsFavorited(!isFavorited)}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center hover:bg-white transition-colors"
                >
                  <HeartIcon className={`w-5 h-5 ${isFavorited ? 'fill-[--accent] text-[--accent]' : 'text-[--color-muted-foreground]'}`} />
                </button>
              </div>
              
              {/* Thumbnail Images */}
              <div className="grid grid-cols-3 gap-4">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                      selectedImage === index 
                        ? 'border-[--accent]' 
                        : 'border-transparent hover:border-[--color-border]'
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} view ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Info */}
            <div className="space-y-8">
              <div>
                <h1 className="text-4xl font-bold mb-4">{product.name}</h1>
                <div className="flex items-center gap-4 mb-6">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < Math.floor(product.rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-[--color-muted-foreground]">({product.reviews} reviews)</span>
                </div>
                <div className="flex items-center gap-4 mb-8">
                  <span className="text-4xl font-bold text-[--accent]">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="text-xl text-[--color-muted-foreground] line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>
                <p className="text-lg text-[--color-muted-foreground] leading-relaxed">
                  {product.description}
                </p>
              </div>

              {/* Quantity Selector */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Quantity</h3>
                <div className="flex items-center gap-4">
                  <div className="flex items-center border border-[--color-border] rounded-lg">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="h-12 w-12"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                    <span className="px-4 py-3 text-lg font-medium">{quantity}</span>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setQuantity(quantity + 1)}
                      className="h-12 w-12"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="text-sm text-[--color-muted-foreground]">
                    {product.inStock ? (
                      <span className="flex items-center gap-2 text-green-600">
                        <CheckCircle className="w-4 h-4" />
                        In Stock
                      </span>
                    ) : (
                      <span className="text-red-600">Out of Stock</span>
                    )}
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4">
                <Button
                  size="lg"
                  className="flex-1 h-14 text-lg relative overflow-hidden"
                  disabled={!product.inStock || isAddingToCart}
                  onClick={handleAddToCart}
                  style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}
                >
                  <motion.div
                    className="flex items-center justify-center"
                    animate={isAddingToCart ? { scale: 0.8 } : { scale: 1 }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      animate={isAddingToCart ? { rotate: 360 } : { rotate: 0 }}
                      transition={{ duration: 1, repeat: isAddingToCart ? Infinity : 0, ease: "linear" }}
                    >
                      <ShoppingBagIcon className="w-5 h-5 mr-2" />
                    </motion.div>
                    {isAddingToCart ? "Adding..." : "Add to Cart"}
                  </motion.div>
                  
                  {/* Loading overlay */}
                  <AnimatePresence>
                    {isAddingToCart && (
                      <motion.div
                        className="absolute inset-0 bg-white/20"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                      />
                    )}
                  </AnimatePresence>
                </Button>
                <Button
                  variant="outline"
                  size="lg"
                  className="h-14 px-6"
                >
                  <Share className="w-5 h-5" />
                </Button>
              </div>

              {/* Trust Signals */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-[--color-border]">
                <div className="text-center">
                  <Truck className="w-6 h-6 mx-auto mb-2 text-[--accent]" />
                  <p className="text-sm font-medium">Free Shipping</p>
                  <p className="text-xs text-[--color-muted-foreground]">On orders over $100</p>
                </div>
                <div className="text-center">
                  <Shield className="w-6 h-6 mx-auto mb-2 text-[--accent]" />
                  <p className="text-sm font-medium">2-Year Warranty</p>
                  <p className="text-xs text-[--color-muted-foreground]">Full coverage</p>
                </div>
                <div className="text-center">
                  <RotateCcw className="w-6 h-6 mx-auto mb-2 text-[--accent]" />
                  <p className="text-sm font-medium">30-Day Returns</p>
                  <p className="text-xs text-[--color-muted-foreground]">No questions asked</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features & Specifications */}
      <section className="py-16" style={{ background: 'color-mix(in oklab, var(--background) 95%, var(--accent) 5%)' }}>
        <div className="container-max">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Features */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Key Features</h2>
              <ul className="space-y-4">
                {product.features.map((feature, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-[--accent] mt-0.5 flex-shrink-0" />
                    <span className="text-[--color-muted-foreground]">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-3xl font-bold mb-8">Specifications</h2>
              <div className="space-y-4">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key} className="flex justify-between py-3 border-b border-[--color-border]">
                    <span className="font-medium text-[--color-foreground]">{key}</span>
                    <span className="text-[--color-muted-foreground]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Notification */}
      <AnimatePresence>
        {showAddedNotification && (
          <motion.div
            className="fixed top-20 left-1/2 transform -translate-x-1/2 z-50"
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ 
              duration: 0.3, 
              ease: [0.16, 1, 0.3, 1] // Apple's custom easing
            }}
          >
            <div 
              className="backdrop-blur-xl rounded-2xl shadow-2xl px-6 py-3 border"
              style={{
                background: 'color-mix(in oklab, var(--background) 85%, var(--accent) 15%)',
                borderColor: 'color-mix(in oklab, var(--accent) 20%, var(--color-border))'
              }}
            >
              <span 
                className="text-sm font-medium tracking-wide"
                style={{ color: 'var(--color-foreground)' }}
              >
                Added to cart
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}


