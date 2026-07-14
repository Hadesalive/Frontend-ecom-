"use client";
import Link from "next/link";
import { Nav, BrandLogo } from "./(ui)/components";
import { formatPrice as formatNle } from "@/lib/currency";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { ShoppingBagIcon, HeartIcon, ComputerDesktopIcon, DevicePhoneMobileIcon, RectangleStackIcon, ClockIcon, SpeakerWaveIcon, Cog6ToothIcon, ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";
import { useEffect, useState } from "react";

function Hero() {
  const [parallax, setParallax] = useState(0);
  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)");
    const onScroll = () => {
      if (!mq.matches) {
        setParallax(0);
        return;
      }
      const y = window.scrollY;
      const offset = Math.min(60, y * 0.12);
      setParallax(offset);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onChange = () => onScroll();
    mq.addEventListener?.("change", onChange);
    return () => {
      window.removeEventListener("scroll", onScroll);
      mq.removeEventListener?.("change", onChange);
    };
  }, []);
  return (
    <section id="hero" className="relative overflow-hidden min-h-[75svh] sm:min-h-[92svh] md:min-h-[110svh] lg:min-h-[120svh]">
      <div className="absolute inset-0 -z-10">
        <div style={{ transform: `translateY(${parallax}px)` }} className="will-change-transform h-full w-full">
          <Image
            src="https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=1920&auto=format&fit=crop"
            alt="Tech workspace with devices"
            fill
            className="object-cover"
            sizes="100vw"
            placeholder="blur"
            blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0nMzIwJyBoZWlnaHQ9JzE4MCcgeG1sbnM9J2h0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnJz48cmVjdCB3aWR0aD0nMzIwJyBoZWlnaHQ9JzE4MCcgZmlsbD0nI2U2ZTZlNicvPjxyZWN0IHdpZHRoPSczMjAnIGhlaWdodD0nMTgwJyBmaWxsPSIjZmZmZmZmIiBmaWxsLW9wYWNpdHk9JzAuMycvPjwvc3ZnPiA="
            style={{ objectPosition: "50% 20%" }}
            priority
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/70 to-background/95" />
        <div className="absolute inset-0" style={{
          background:
            "radial-gradient(1200px 400px at 50% 10%, rgba(0,0,0,0.25), transparent 60%)"
        }} />
      </div>
      <div className="container-max min-h-[75svh] sm:min-h-[92svh] md:min-h-[110svh] lg:min-h-[120svh] pt-14 md:pt-10 pb-12 md:pb-20 flex items-center">
        <div className="max-w-4xl mx-auto text-center rounded-2xl px-4 sm:px-0">
          <h1 className="text-balance mx-auto max-w-3xl text-2xl sm:text-5xl md:text-6xl lg:text-7xl leading-[1.15] md:leading-[1.05] font-bold tracking-tight mb-2">
            Where technology comes home.
        </h1>
          <p className="text-balance text-[14px] sm:text-lg text-[--color-muted-foreground] mb-5 mx-auto max-w-sm md:max-w-xl">
            Curated Macs, iPads, iPhones, and accessories with expert support and repairs.
          </p>
          <div className="w-full sm:w-auto mx-auto px-4 sm:px-0">
            <div className="flex flex-col items-center gap-2">
              <Button
                asChild
                className="group px-7 md:px-10 h-11 md:h-12 text-[15px] md:text-base rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.14)] hover:shadow-[0_10px_30px_rgba(0,0,0,0.18)] transition-shadow"
                style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}
              >
                <Link href="/shop" aria-label="Shop the collection">
                  <span className="inline-flex items-center gap-2">
                    Shop the collection
                    <ChevronRightIcon className="h-5 w-5 translate-x-0 group-hover:translate-x-0.5 transition-transform" />
                  </span>
                </Link>
              </Button>
              <Link
                href="#grid"
                aria-label="Explore categories"
                className="inline-flex items-center gap-2 text-sm md:text-base text-[--color-foreground]/80 hover:text-[--color-foreground] transition-colors"
              >
                Explore categories
                <ChevronRightIcon className="h-4 w-4" />
              </Link>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-1.5 sm:gap-3 text-[11px] sm:text-xs text-[--color-muted-foreground] mt-2">
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  Free delivery $100+
                </span>
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  12‑month warranty
                </span>
                <span className="inline-flex items-center justify-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} />
                  Secure checkout
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function NewArrivals() {
  const items: ProductItem[] = [
    { title: "MacBook Air M3", price: "$1,099", image: "/assets/photo-1598094670018-abf669538033.avif", href: "/products/macbook-air-m3" },
    { title: "iPhone 15", price: "$799", image: "/assets/photo-1585565804112-f201f68c48b4.avif", href: "/products/iphone-15-pro" },
    { title: "iPad mini", price: "$499", image: "/assets/photo-1594344141311-8ea00ba55612.avif", href: "/shop" },
    { title: "AirPods 3", price: "$179", image: "/assets/photo-1585565804112-f201f68c48b4.avif", href: "/shop" },
  ];
  const [index, setIndex] = useState(0);
  const prev = () => setIndex((i) => (i - 1 + items.length) % items.length);
  const next = () => setIndex((i) => (i + 1) % items.length);
  return (
    <section className="py-16" style={{ 
      background: 'var(--background)' 
    }}>
      <div className="container-max">
        {/* New Arrivals */}
        <div className="mb-12">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl md:text-3xl font-semibold">New arrivals</h2>
            <div className="flex gap-2">
              <button aria-label="Previous" onClick={prev} className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-[--color-border] hover:bg-[--color-muted]">
                <ChevronLeftIcon className="h-5 w-5" />
              </button>
              <button aria-label="Next" onClick={next} className="h-9 w-9 inline-flex items-center justify-center rounded-full border border-[--color-border] hover:bg-[--color-muted]">
                <ChevronRightIcon className="h-5 w-5" />
              </button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.slice(index).concat(items.slice(0, index)).slice(0, 3).map((p) => (
              <Product key={p.title} {...p} />
            ))}
          </div>
        </div>

        {/* Shop by Category */}
        <div>
          <h2 className="text-2xl md:text-3xl font-semibold mb-6">Shop by category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
            {[{
              name: 'Mac', icon: ComputerDesktopIcon, href: '/shop?cat=mac'
            },{
              name: 'iPhone', icon: DevicePhoneMobileIcon, href: '/shop?cat=iphone'
            },{
              name: 'iPad', icon: RectangleStackIcon, href: '/shop?cat=ipad'
            },{
              name: 'Watch', icon: ClockIcon, href: '/shop?cat=watch'
            },{
              name: 'Audio', icon: SpeakerWaveIcon, href: '/shop?cat=audio'
            },{
              name: 'Accessories', icon: Cog6ToothIcon, href: '/shop?cat=accessories'
            }].map(({name, icon: Icon, href}) => (
              <Link key={name} href={href} className="group rounded-2xl border border-[--color-border] hover:border-[--ring] transition-all duration-300 p-4 flex flex-col items-center justify-center gap-2 hover:shadow-lg hover:scale-105 hover:-translate-y-1">
                <span className="rounded-full h-12 w-12 flex items-center justify-center bg-[--color-muted] group-hover:bg-[--accent]/10 group-hover:scale-110 transition-all duration-300" style={{ color: 'var(--accent)' }}>
                  <Icon className="h-6 w-6 group-hover:scale-110 transition-transform duration-300" />
                </span>
                <span className="text-sm font-medium group-hover:text-[--accent] transition-colors duration-300">{name}</span>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type ProductItem = { title: string; image: string; price?: string; href?: string; badge?: string };

function formatPrice(input?: string) {
  if (!input) return undefined;
  const asNum = Number(String(input).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(asNum)) return input;
  return formatNle(asNum);
}

function Product({ title, image, price, href = "/shop" , badge }: ProductItem & { index?: number }) {
  const [fav, setFav] = useState(false);
  return (
    <Card className="group transition-all duration-300 border-none bg-transparent shadow-none p-0 h-full">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={image}
          alt={title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/35 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        {badge ? (
          <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium border border-transparent"
            style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}>
            {badge}
          </span>
        ) : null}
        <button aria-label={fav ? "Remove from wishlist" : "Add to wishlist"} onClick={(e) => { e.preventDefault(); setFav((v) => !v); }}
          className="absolute right-3 top-3 rounded-full bg-[--color-background]/80 backdrop-blur p-1.5 border border-[--color-border] opacity-0 group-hover:opacity-100 transition-opacity">
          <HeartIcon className={`h-4 w-4 ${fav ? 'fill-[--color-foreground] text-[--color-foreground]' : ''}`} />
        </button>
        <div className="pointer-events-none absolute inset-x-0 -bottom-6 mx-auto w-[92%] h-12 rounded-full bg-black/0 blur-xl opacity-0 group-hover:opacity-20 transition-opacity" />
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-medium leading-none">
              <Link href={href} className="link hover:opacity-80">{title}</Link>
            </div>
            <span className="block h-[2px] w-10 mt-2 rounded-full" style={{ background: 'var(--accent)' }} />
            {price ? (
              <div className="text-[13px] text-[--color-muted-foreground] mt-1">{formatPrice(price)}</div>
            ) : null}
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button asChild variant="ghost" className="h-8 px-3 text-[--color-accent]">
              <Link href={href}>View</Link>
            </Button>
            <Button size="sm" className="h-8 gap-1" style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}>
              <ShoppingBagIcon className="h-4 w-4" />
              Add
            </Button>
          </div>
        </div>
        <div className="mt-3 border-t" style={{ borderColor: 'color-mix(in oklab, var(--accent) 30%, var(--color-border))' }} />
        <div className="pt-2 pb-2 flex items-center gap-4 text-[12px] text-[--color-muted-foreground]">
          <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} /> Free shipping</span>
          <span className="inline-flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full" style={{ background: 'var(--accent)' }} /> 12‑mo warranty</span>
      </div>
    </div>
    </Card>
  );
}

function FooterLogo() {
  return (
    <BrandLogo showWordmark={false} markClassName="h-16 sm:h-20 md:h-24 w-auto" />
  );
}

export default function Home() {
  return (
    <div>
      <Nav />
      <Hero />
      
      {/* Section Divider */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/20 dark:via-[--accent]/40 to-transparent"></div>
      </div>
      
      <NewArrivals />
      
      {/* Section Divider */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/25 dark:via-[--accent]/50 to-transparent"></div>
      </div>
      
      
      <section id="grid" className="py-16" style={{ 
        background: 'var(--muted)' 
      }}>
        <div className="container-max">
        <div className="mb-6 flex items-end justify-between">
          <h2 className="text-2xl md:text-3xl font-semibold">Featured</h2>
          <Link href="/shop" className="text-[15px] link underline underline-offset-4">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {([
            { title: "MacBook Pro 14", price: "$1,799", image: "/assets/photo-1598094670018-abf669538033.avif", badge: "Hot", href: "/shop" },
            { title: "iPhone 15 Pro", price: "$999", image: "/assets/photo-1585565804112-f201f68c48b4.avif", badge: "New", href: "/products/iphone-15-pro" },
            { title: "iPad Air", price: "$599", image: "/assets/photo-1594344141311-8ea00ba55612.avif" },
            { title: "Apple Watch", price: "$399", image: "/assets/photo-1598094670018-abf669538033.avif" },
            { title: "AirPods Pro", price: "$249", image: "/assets/photo-1585565804112-f201f68c48b4.avif" },
            { title: "Magic Accessories", price: "$129", image: "/assets/photo-1594344141311-8ea00ba55612.avif" },
          ] as ProductItem[]).map((p, i) => (
            <Product key={p.title} {...p} index={i} />
          ))}
        </div>
        </div>
      </section>

      {/* Section Divider */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/35 dark:via-[--accent]/70 to-transparent"></div>
      </div>

      {/* Featured Collections */}
      <section className="py-16" style={{ 
        background: 'var(--background)' 
      }}>
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Featured Collections</h2>
            <p className="text-[--color-muted-foreground] max-w-2xl mx-auto">
              Curated bundles designed for specific workflows and use cases. Everything you need, perfectly matched.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Mac Studio Collection */}
            <div className="group relative overflow-hidden rounded-2xl border border-[--color-border] hover:border-[--ring] transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/assets/photo-1598094670018-abf669538033.avif"
                  alt="Mac Studio Collection"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">Mac Studio Collection</h3>
                  <p className="text-white/90 text-sm mb-3">Mac Studio, Studio Display, Magic accessories</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">$4,999</span>
                    <Button size="sm" className="bg-white text-black hover:bg-white/90">
                      View Collection
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* iPhone Ecosystem */}
            <div className="group relative overflow-hidden rounded-2xl border border-[--color-border] hover:border-[--ring] transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/assets/photo-1585565804112-f201f68c48b4.avif"
                  alt="iPhone Ecosystem"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">iPhone Ecosystem</h3>
                  <p className="text-white/90 text-sm mb-3">iPhone 15 Pro, AirPods Pro, Apple Watch, MagSafe</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">$2,199</span>
                    <Button size="sm" className="bg-white text-black hover:bg-white/90">
                      View Collection
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            {/* Creative Pro Kit */}
            <div className="group relative overflow-hidden rounded-2xl border border-[--color-border] hover:border-[--ring] transition-all duration-300 hover:shadow-xl hover:scale-105">
              <div className="aspect-[4/3] relative">
                <Image
                  src="/assets/photo-1594344141311-8ea00ba55612.avif"
                  alt="Creative Pro Kit"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-xl font-bold text-white mb-1">Creative Pro Kit</h3>
                  <p className="text-white/90 text-sm mb-3">iPad Pro, Apple Pencil, Magic Keyboard, Pro Display</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">$3,299</span>
                    <Button size="sm" className="bg-white text-black hover:bg-white/90">
                      View Collection
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section Divider */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/40 dark:via-[--accent]/80 to-transparent"></div>
      </div>

      {/* Sale & Promotions */}
      <section className="py-16" style={{ 
        background: 'var(--muted)' 
      }}>
        <div className="container-max">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[--accent]/10 text-[--accent] text-sm font-medium mb-4">
              <span className="w-2 h-2 bg-[--accent] rounded-full animate-pulse"></span>
              Limited Time Offers
            </div>
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">Special Deals & Promotions</h2>
            <p className="text-[--color-muted-foreground] max-w-2xl mx-auto">
              Don&apos;t miss out on these exclusive offers. Limited time deals on our most popular products.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Flash Sale */}
            <div className="group relative overflow-hidden rounded-2xl border border-[--color-border] hover:border-[--ring] transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48 w-full">
                <Image
                  src="/assets/photo-1598094670018-abf669538033.avif"
                  alt="MacBook Air M3"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-[--accent] text-white text-xs font-bold rounded-full">
                    -18%
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1">MacBook Air M3</h3>
                <p className="text-sm text-[--color-muted-foreground] mb-4">Lightning fast performance in a sleek design</p>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-[--accent]">$899</span>
                  <span className="text-sm text-[--color-muted-foreground] line-through">$1,099</span>
                </div>
                <Button className="w-full" style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}>
                  Shop Now
                </Button>
              </div>
            </div>

            {/* Bundle Deal */}
            <div className="group relative overflow-hidden rounded-2xl border border-[--color-border] hover:border-[--ring] transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48 w-full">
                <Image
                  src="/assets/photo-1585565804112-f201f68c48b4.avif"
                  alt="iPhone + AirPods Bundle"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-[--accent] text-white text-xs font-bold rounded-full">
                    Bundle
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1">iPhone + AirPods Bundle</h3>
                <p className="text-sm text-[--color-muted-foreground] mb-4">Complete mobile experience</p>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-[--accent]">$1,199</span>
                  <span className="text-sm text-[--color-muted-foreground] line-through">$1,398</span>
                </div>
                <Button variant="outline" className="w-full border-[--accent] text-[--accent] hover:bg-[--accent] hover:text-white">
                  View Bundle
                </Button>
              </div>
            </div>

            {/* Trade-in Offer */}
            <div className="group relative overflow-hidden rounded-2xl border border-[--color-border] hover:border-[--ring] transition-all duration-300 hover:shadow-lg">
              <div className="relative h-48 w-full">
                <Image
                  src="/assets/photo-1594344141311-8ea00ba55612.avif"
                  alt="Trade-In Program"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-4 right-4">
                  <span className="px-3 py-1 bg-[--accent] text-white text-xs font-bold rounded-full">
                    Trade-in
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-lg font-semibold mb-1">Trade-In Program</h3>
                <p className="text-sm text-[--color-muted-foreground] mb-4">Get credit for your old device</p>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-2xl font-bold text-[--accent]">Up to $800</span>
                  <span className="text-sm text-[--color-muted-foreground]">credit</span>
                </div>
                <Button variant="outline" className="w-full border-[--accent] text-[--accent] hover:bg-[--accent] hover:text-white">
                  Check Value
                </Button>
              </div>
            </div>
          </div>

          {/* Additional Promo Banner */}
          <div className="mt-12 relative overflow-hidden rounded-2xl border-2 border-[--accent] bg-gradient-to-r from-[--accent]/20 to-[--accent]/10 p-8 text-center">
            <div className="relative z-10">
              <h3 className="text-2xl md:text-3xl font-bold text-[--accent] mb-2">Free Delivery on Orders Over $100</h3>
              <p className="text-[--color-muted-foreground] mb-6">Plus free returns and 12-month warranty on all products</p>
              <Button size="lg" style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }} className="hover:opacity-90">
                Shop All Products
              </Button>
            </div>
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/10 to-transparent"></div>
          </div>
        </div>
      </section>
      
      {/* Section Divider */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/50 dark:via-[--accent]/90 to-transparent"></div>
      </div>

      {/* Testimonials */}
      <section className="py-16" style={{ 
        background: 'var(--background)' 
      }}>
        <div className="container-max">
          <div className="text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-semibold mb-4">What our customers say</h2>
            <p className="text-[--color-muted-foreground] max-w-2xl mx-auto">
              Don&apos;t just take our word for it. Here&apos;s what our satisfied customers have to say about their experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-[--color-card] border border-[--color-border] rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-[--color-foreground] mb-4">
                &quot;Amazing service! My MacBook repair was done quickly and professionally. The team really knows their stuff.&quot;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[--accent] flex items-center justify-center text-white font-semibold">
                  S
                </div>
                <div>
                  <div className="font-semibold text-[--color-foreground]">Sarah Johnson</div>
                  <div className="text-sm text-[--color-muted-foreground]">MacBook Pro Owner</div>
                </div>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-[--color-card] border border-[--color-border] rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-[--color-foreground] mb-4">
                &quot;House of Electronics has the best selection of Apple products. Great prices and fast shipping!&quot;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[--accent] flex items-center justify-center text-white font-semibold">
                  M
                </div>
                <div>
                  <div className="font-semibold text-[--color-foreground]">Mike Chen</div>
                  <div className="text-sm text-[--color-muted-foreground]">iPhone User</div>
                </div>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-[--color-card] border border-[--color-border] rounded-2xl p-6">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.957a1 1 0 00.95.69h4.162c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.957c.3.921-.755 1.688-1.54 1.118l-3.37-2.448a1 1 0 00-1.175 0l-3.37 2.448c-.784.57-1.838-.197-1.54-1.118l1.287-3.957a1 1 0 00-.364-1.118L2.05 9.384c-.783-.57-.38-1.81.588-1.81h4.162a1 1 0 00.95-.69l1.286-3.957z" />
                  </svg>
                ))}
              </div>
              <blockquote className="text-[--color-foreground] mb-4">
                &quot;Excellent customer service and product quality. I&apos;ve been a customer for years and always satisfied.&quot;
              </blockquote>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[--accent] flex items-center justify-center text-white font-semibold">
                  E
                </div>
                <div>
                  <div className="font-semibold text-[--color-foreground]">Emily Rodriguez</div>
                  <div className="text-sm text-[--color-muted-foreground]">iPad Pro Owner</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section Divider */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/40 dark:via-[--accent]/80 to-transparent"></div>
      </div>

      {/* CTA Section */}
      <section className="py-20" style={{ 
        background: 'var(--muted)' 
      }}>
        <div className="container-max">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
              Ready to upgrade your tech?
            </h2>
            <p className="text-lg md:text-xl text-[--color-muted-foreground] mb-8 max-w-2xl mx-auto">
              Discover our latest collection of premium electronics and accessories. 
              We are here to help you find the perfect tech solution.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button asChild size="lg" className="px-8 py-4 text-lg h-auto" style={{ background: 'var(--accent)', color: 'var(--accent-contrast)' }}>
                <Link href="/shop">Browse Shop</Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="px-8 py-4 text-lg h-auto">
                <Link href="/about">Learn More</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Section Divider */}
      <div className="relative h-px overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[--accent]/50 dark:via-[--accent]/90 to-transparent"></div>
      </div>
      
      {/* Footer */}
      <footer className="border-t" style={{ 
        background: 'var(--background)' 
      }}>
        <div className="container-max py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="space-y-4">
              <div>
                <FooterLogo />
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your trusted destination for premium electronic gadgets and cutting-edge technology.
              </p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 0 1-1.93.07 4.28 4.28 0 0 0 4 2.98 8.521 8.521 0 0 1-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.7 21 8.12 21 16 21 20.33 14.46 20.33 8.79c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.174-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.402.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.357-.629-2.746-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24.009 12.017 24.009c6.624 0 11.99-5.367 11.99-11.988C24.007 5.367 18.641.001.012.001z"/>
                  </svg>
                </Button>
                <Button variant="ghost" size="icon" className="h-10 w-10">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </Button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="/shop" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Shop All</Link></li>
                <li><Link href="/categories/laptops" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Laptops</Link></li>
                <li><Link href="/categories/phones" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Phones</Link></li>
                <li><Link href="/categories/accessories" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Accessories</Link></li>
                <li><Link href="/repairs" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Repairs</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Contact Us</Link></li>
                <li><Link href="/shipping" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Shipping Info</Link></li>
                <li><Link href="/returns" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Returns & Exchanges</Link></li>
                <li><Link href="/support" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Support Center</Link></li>
                <li><Link href="/warranty" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Warranty</Link></li>
              </ul>
            </div>

            {/* Company */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Company</h3>
              <ul className="space-y-2">
                <li><Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors text-sm">About Us</Link></li>
                <li><Link href="/careers" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Careers</Link></li>
                <li><Link href="/press" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Press</Link></li>
                <li><Link href="/privacy" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Privacy Policy</Link></li>
                <li><Link href="/terms" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Terms of Service</Link></li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="mt-12 pt-8 border-t border-border/50">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-muted-foreground text-sm">
                © {new Date().getFullYear()} Type A House of Electronics (SL) Ltd. All rights reserved.
              </p>
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>Secure Checkout</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                  </svg>
                  <span>Premium Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
