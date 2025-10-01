"use client";

import { Nav } from "../(ui)/components";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { 
  Search, 
  Grid3X3, 
  List, 
  Heart as HeartIcon,
  ShoppingBag as ShoppingBagIcon} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

function formatPrice(price: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  }).format(price);
}

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  badge: string;
  inStock: boolean;
}

function ProductCard({ product }: { product: Product }) {
  const [fav, setFav] = useState(false);
  return (
    <Card className="group transition-all duration-300 border-none bg-transparent shadow-none p-0 h-full">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium border border-transparent"
            style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}>
            {product.badge}
          </span>
        ) : null}
        <button aria-label={fav ? "Remove from wishlist" : "Add to wishlist"} onClick={(e) => { e.preventDefault(); setFav((v) => !v); }}
          className="absolute right-3 top-3 rounded-full bg-[--color-background]/80 backdrop-blur p-1.5 border border-[--color-border] opacity-0 group-hover:opacity-100 transition-opacity">
          <HeartIcon className={`h-4 w-4 ${fav ? 'fill-[--color-foreground] text-[--color-foreground]' : ''}`} />
        </button>
        <div className="pointer-events-none absolute inset-x-0 -bottom-6 mx-auto w-[92%] h-12 rounded-full bg-black/0 blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="text-white font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-medium leading-none">
              <Link href={`/products/${product.id}`} className="link hover:opacity-80">{product.name}</Link>
            </div>
            <span className="block h-[2px] w-10 mt-2 rounded-full" style={{ background: 'var(--accent)' }} />
            <div className="text-[13px] text-[--color-muted-foreground] mt-1">
              {formatPrice(product.price)}
              {product.originalPrice && (
                <span className="ml-2 line-through text-[11px]">
                  {formatPrice(product.originalPrice)}
                </span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button asChild variant="ghost" className="h-8 px-3 text-[--color-accent]">
              <Link href={`/products/${product.id}`}>View</Link>
            </Button>
            <Button 
              size="sm" 
              className="h-8 gap-1" 
              disabled={!product.inStock}
              style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}
            >
              <ShoppingBagIcon className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
        <div className="mt-3 border-t" style={{ borderColor: 'color-mix(in oklab, var(--accent) 30%, var(--color-border))' }} />
        <div className="pt-2 pb-2 flex items-center gap-4 text-[12px] text-[--color-muted-foreground]">
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
    </Card>
  );
}

const categories = [
  { slug: "mac", name: "Mac", count: 24 },
  { slug: "iphone", name: "iPhone", count: 18 },
  { slug: "ipad", name: "iPad", count: 12 },
  { slug: "watch", name: "Watch", count: 8 },
  { slug: "audio", name: "Audio", count: 15 },
  { slug: "accessories", name: "Accessories", count: 32 },
];

const products = [
  {
    id: 1,
    name: "MacBook Air M3",
    price: 1299,
    originalPrice: 1499,
    rating: 4.8,
    reviews: 124,
    image: "/assets/photo-1598094670018-abf669538033.avif",
    category: "mac",
    badge: "Best Seller",
    inStock: true
  },
  {
    id: 2,
    name: "iPhone 15 Pro",
    price: 999,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 89,
    image: "/assets/photo-1585565804112-f201f68c48b4.avif",
    category: "iphone",
    badge: "New",
    inStock: true
  },
  {
    id: 3,
    name: "iPad Pro 12.9\"",
    price: 1099,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 67,
    image: "/assets/photo-1594344141311-8ea00ba55612.avif",
    category: "ipad",
    badge: "Sale",
    inStock: true
  },
  {
    id: 4,
    name: "Apple Watch Series 9",
    price: 399,
    originalPrice: 449,
    rating: 4.6,
    reviews: 156,
    image: "/assets/photo-1598094670018-abf669538033.avif",
    category: "watch",
    badge: "Popular",
    inStock: false
  },
  {
    id: 5,
    name: "AirPods Pro 2nd Gen",
    price: 249,
    originalPrice: 279,
    rating: 4.8,
    reviews: 203,
    image: "/assets/photo-1585565804112-f201f68c48b4.avif",
    category: "audio",
    badge: "Limited",
    inStock: true
  },
  {
    id: 6,
    name: "Magic Keyboard",
    price: 99,
    originalPrice: 129,
    rating: 4.5,
    reviews: 78,
    image: "/assets/photo-1594344141311-8ea00ba55612.avif",
    category: "accessories",
    badge: "Deal",
    inStock: true
  },
  {
    id: 7,
    name: "Mac Studio M2 Ultra",
    price: 3999,
    originalPrice: 4499,
    rating: 4.9,
    reviews: 45,
    image: "/assets/photo-1598094670018-abf669538033.avif",
    category: "mac",
    badge: "Pro",
    inStock: true
  },
  {
    id: 8,
    name: "iPhone 15",
    price: 799,
    originalPrice: 899,
    rating: 4.7,
    reviews: 112,
    image: "/assets/photo-1585565804112-f201f68c48b4.avif",
    category: "iphone",
    badge: "Trending",
    inStock: true
  }
];

const sortOptions = [
  { value: "featured", label: "Featured" },
  { value: "price-low", label: "Price: Low to High" },
  { value: "price-high", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
  { value: "newest", label: "Newest First" }
];

export default function ShopPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [] = useState(false);
  const [, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  return (
    <div>
      <Nav />
      
      {/* Hero Section with Image */}
      <section id="hero" className="relative pt-24 pb-32 overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="/assets/photo-1598094670018-abf669538033.avif"
            alt="Electronics Shop"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
        
        <div className="relative container-max">
          <div className="text-center text-white">
            <h1 className="text-6xl lg:text-8xl font-bold mb-8">Shop</h1>
            <p className="text-2xl text-white/90 max-w-3xl mx-auto mb-16">
              The best way to buy the products you love
            </p>
            
            {/* Search */}
            <div className="max-w-lg mx-auto relative">
              <Search className="absolute left-6 top-1/2 transform -translate-y-1/2 text-[--color-muted-foreground] w-6 h-6" />
              <Input
                placeholder="Search products"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-16 h-16 text-xl border-2 border-white/30 rounded-2xl bg-white/10 backdrop-blur-sm text-white placeholder:text-white/70 focus:border-[--accent] focus:bg-white/20"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Apple-style Shop Page */}
      <section className="py-20" style={{ background: 'var(--background)' }}>
        <div className="container-max">
          {/* Filters */}
          <div className="mb-12">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <div className="flex flex-wrap gap-3">
                <Button
                  variant={selectedCategory === "all" ? "default" : "outline"}
                  onClick={() => setSelectedCategory("all")}
                  className="h-12 px-6"
                  style={selectedCategory === "all" ? { background: 'var(--accent)', color: 'var(--accent-contrast)' } : {}}
                >
                  All Products
                </Button>
                {categories.map((category) => (
                  <Button
                    key={category.slug}
                    variant={selectedCategory === category.slug ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category.slug)}
                    className="h-12 px-6"
                    style={selectedCategory === category.slug ? { background: 'var(--accent)', color: 'var(--accent-contrast)' } : {}}
                  >
                    {category.name}
                  </Button>
                ))}
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm text-[--color-muted-foreground]">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-4 py-2 border border-[--color-border] rounded-lg bg-[--color-background] text-[--color-foreground] focus:border-[--accent] focus:outline-none"
                  >
                    {sortOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("grid")}
                    className="h-12 w-12"
                  >
                    <Grid3X3 className="w-5 h-5" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "outline"}
                    size="icon"
                    onClick={() => setViewMode("list")}
                    className="h-12 w-12"
                  >
                    <List className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <p className="text-[--color-muted-foreground]">
                Showing {sortedProducts.length} of {products.length} products
              </p>
            </div>
          </div>

          {/* Featured Products */}
          <div>
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-3xl font-semibold">Featured Products</h2>
              <Button variant="ghost" className="text-[--accent]">
                View All
              </Button>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {sortedProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}