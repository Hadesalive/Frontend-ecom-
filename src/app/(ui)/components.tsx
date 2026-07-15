"use client";
import { useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { HomeIcon, ShoppingBagIcon, LifebuoyIcon, InformationCircleIcon, UserCircleIcon, SunIcon, MoonIcon, Bars3Icon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Sheet, SheetContent, SheetTrigger, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import Image from "next/image";
import { useCart } from "@/components/cart/cart-context";

export function Nav() {
  const { count } = useCart();
  const [isDark, setIsDark] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOverHero, setIsOverHero] = useState(false);
  useEffect(() => {
    try {
      const pref = localStorage.getItem("tne-theme");
      const shouldDark = pref === "dark";
      if (shouldDark) document.documentElement.classList.add("theme-dark");
      setIsDark(shouldDark);
    } catch {}
    const onScroll = () => setIsScrolled(window.scrollY > 100);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    // Observe hero section visibility to decide transparency at top only over hero
    const hero = document.getElementById("hero");
    let obs: IntersectionObserver | null = null;
    if (hero) {
      obs = new IntersectionObserver(
        (entries) => {
          const e = entries[0];
          setIsOverHero(e.isIntersecting && e.intersectionRatio > 0.1);
        },
        { root: null, threshold: [0, 0.1, 0.2] }
      );
      obs.observe(hero);
    }
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (obs && hero) obs.unobserve(hero);
    };
  }, []);
  const toggleTheme = () => {
    const el = document.documentElement;
    const dark = el.classList.toggle("theme-dark");
    setIsDark(dark);
    try { localStorage.setItem("tne-theme", dark ? "dark" : "light"); } catch {}
  };
  const items = useMemo(
    () => [
      { name: "Home", url: "/", icon: HomeIcon },
      { name: "Shop", url: "/shop", icon: ShoppingBagIcon },
      { name: "Support", url: "/support", icon: LifebuoyIcon },
      { name: "About", url: "/about", icon: InformationCircleIcon },
    ],
    []
  );
  const pathname = usePathname();
  return (
    <>
      <header className={`fixed top-0 inset-x-0 z-50 transition-all ${
        isScrolled || !isOverHero
          ? "bg-background/65 backdrop-blur-md supports-[backdrop-filter]:bg-background/65"
          : "bg-transparent backdrop-blur-0"
      }`}>
        <div className="container-max h-20 flex items-center justify-between">
          <Link href="/" aria-label="House of Electronics" className="flex items-center">
            <BrandLogo
              markClassName="h-12 md:h-14 w-auto"
              wordmarkClassName={`text-lg md:text-xl font-semibold tracking-tight ${
                !isScrolled && isOverHero && !isDark ? "text-white" : "text-[--color-foreground]"
              }`}
            />
          </Link>
          <nav className="hidden md:flex items-center gap-4 text-[15px]">
            {items.map((it) => {
              // Special logic for shop-related pages
              const isShopActive = it.url === "/shop" && (pathname === "/shop" || pathname?.startsWith("/products/") || pathname?.startsWith("/categories/"));
              const isActive = pathname === it.url || (it.url !== "/" && pathname?.startsWith(it.url)) || isShopActive;
              return (
                <div key={it.url} className="relative">
                  <Link
                    href={it.url}
                    className={`relative inline-flex items-center h-9 px-4 rounded-full font-medium transition-colors border ${
                      isActive
                        ? "bg-muted text-primary border-transparent"
                        : !isScrolled && isOverHero && !isDark
                          ? "text-white border-white/20 hover:bg-white/10"
                          : "text-[--color-foreground] border-transparent hover:bg-muted"
                    }`}
                  >
                    {it.name}
                    {isActive && (
                      <motion.div
                        layoutId="lamp"
                        className="absolute inset-0 w-full bg-primary/5 rounded-full -z-10"
                        initial={false}
                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                      >
                        <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-1 bg-primary rounded-t-full">
                          <div className="absolute w-12 h-6 bg-primary/20 rounded-full blur-md -top-2 -left-2" />
                          <div className="absolute w-8 h-6 bg-primary/20 rounded-full blur-md -top-1" />
                          <div className="absolute w-4 h-4 bg-primary/20 rounded-full blur-sm top-0 left-2" />
                        </div>
                      </motion.div>
                    )}
                  </Link>
                </div>
              );
            })}
          </nav>
          
          {/* Mobile Menu & Cart */}
          <div className="flex items-center gap-1 md:hidden">
            <Button asChild variant="ghost" size="icon" className={`h-9 w-9 ${!isScrolled && isOverHero && !isDark ? "text-white" : ""}`} aria-label="Cart">
              <Link href="/cart">
                <span className="relative inline-flex">
                  <ShoppingBagIcon
                    className="h-5 w-5"
                    style={{
                      color: pathname === "/cart"
                        ? 'var(--accent)'
                        : !isScrolled && isOverHero && !isDark
                          ? 'white'
                          : 'var(--color-foreground)'
                    }}
                  />
                  {count > 0 ? (
                    <span
                      className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-semibold flex items-center justify-center"
                      style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
                    >
                      {count}
                    </span>
                  ) : null}
                </span>
              </Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={`h-9 w-9 ${!isScrolled && isOverHero && !isDark ? "text-white" : ""}`}
                  aria-label="Open menu"
                >
                  <Bars3Icon className="h-5 w-5" />
                </Button>
              </SheetTrigger>
            <SheetContent side="right" className="w-full h-full" aria-label="Mobile navigation">
              <SheetHeader className="sr-only">
                <SheetTitle>Mobile navigation menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col h-full">
                {/* Mobile Logo */}
                <div className="flex items-center justify-center py-6 border-b" style={{ borderColor: 'var(--color-border)' }}>
                  <BrandLogo markClassName="h-14 w-auto" />
                </div>
                
                {/* Mobile Navigation */}
                <nav className="flex-1 py-6">
                  <div className="space-y-2">
                    {items.map((it) => {
                      const isShopActive = it.url === "/shop" && (pathname === "/shop" || pathname?.startsWith("/products/") || pathname?.startsWith("/categories/"));
                      const isActive = pathname === it.url || (it.url !== "/" && pathname?.startsWith(it.url)) || isShopActive;
                      return (
                        <Link
                          key={it.url}
                          href={it.url}
                          className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                            isActive
                              ? "bg-muted text-primary"
                              : "text-[--color-foreground] hover:bg-muted"
                          }`}
                        >
                          <it.icon className="h-5 w-5" />
                          <span className="font-medium">{it.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                </nav>
                
                {/* Mobile Actions */}
                <div className="border-t py-6 space-y-4" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="flex items-center justify-between px-4">
                    <span className="text-sm font-medium">Theme</span>
                    <Button variant="ghost" size="icon" onClick={toggleTheme} className="h-8 w-8">
                      {isDark ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
                    </Button>
                  </div>
                  <div className="flex items-center justify-between px-4">
                    <span className="text-sm font-medium">Account</span>
                    <Link href="/dashboard" className="h-8 w-8">
                      <Avatar className="h-8 w-8">
                        <AvatarImage src="" alt="" />
                        <AvatarFallback>
                          <UserCircleIcon className="h-5 w-5" />
                        </AvatarFallback>
                      </Avatar>
                    </Link>
                  </div>
                </div>
              </div>
            </SheetContent>
            </Sheet>
          </div>
          
          <div className="hidden md:flex items-center gap-1 md:gap-2">
            <Button variant="ghost" size="icon" className={`h-9 w-9 ${!isScrolled && isOverHero && !isDark ? "text-white" : ""}`} aria-label="Toggle theme" onClick={toggleTheme}>
              {isDark ? <SunIcon className="h-5 w-5" /> : <MoonIcon className="h-5 w-5" />}
            </Button>
            <Button asChild variant="ghost" size="icon" className={`h-9 w-9 ${!isScrolled && isOverHero && !isDark ? "text-white" : ""}`} aria-label="Cart">
              <Link href="/cart">
                <span className="relative inline-flex">
                  <ShoppingBagIcon
                    className="h-5 w-5"
                    style={{
                      color: pathname === "/cart"
                        ? 'var(--accent)'
                        : !isScrolled && isOverHero && !isDark
                          ? 'white'
                          : 'var(--color-foreground)'
                    }}
                  />
                  {count > 0 ? (
                    <span
                      className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-semibold flex items-center justify-center"
                      style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
                    >
                      {count}
                    </span>
                  ) : null}
                </span>
              </Link>
            </Button>
            <Link href="/dashboard" aria-label="Account" className="ml-1">
              <Avatar className="h-8 w-8">
                <AvatarImage src="" alt="" />
                <AvatarFallback>
                  <UserCircleIcon className="h-6 w-6" />
                </AvatarFallback>
              </Avatar>
            </Link>
          </div>
        </div>
        {isScrolled ? (
          <div className="pointer-events-none h-px shadow-[inset_0_-1px_0_0_var(--color-border)]" />
        ) : null}
      </header>
    </>
  );
}

export function PageHeader({ title, subtitle }: { title: string; subtitle?: string }) {
  return (
    <section className="container-max pt-10 pb-6">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-tight">{title}</h1>
      {subtitle ? (
        <p className="text-[15px] text-[--color-muted-foreground] mt-2 max-w-[720px]">{subtitle}</p>
      ) : null}
    </section>
  );
}

export function BrandLogo({
  showWordmark = true,
  className = "",
  markClassName = "h-10 w-auto",
  wordmarkClassName = "text-lg md:text-xl font-semibold tracking-tight text-[--color-foreground]",
}: {
  showWordmark?: boolean;
  className?: string;
  markClassName?: string;
  wordmarkClassName?: string;
}) {
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <Image
        src="/assets/hoe-logo-mark.png"
        alt="House of Electronics logo"
        width={356}
        height={394}
        className={markClassName}
        priority
      />
      {showWordmark ? (
        <span className={`${wordmarkClassName} leading-none`}>
          House of Electronics
        </span>
      ) : null}
    </span>
  );
}

// Exact FooterLogo extracted from homepage
export function FooterLogo() {
  return (
    <BrandLogo showWordmark={false} markClassName="h-16 sm:h-20 md:h-24 w-auto" />
  );
}

export function Footer() {
  return (
    <footer className="border-t" style={{ background: 'var(--background)' }}>
      <div className="container-max py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
              <li><Link href="/categories/mac" className="text-muted-foreground hover:text-foreground transition-colors text-sm">Mac</Link></li>
              <li><Link href="/categories/iphone" className="text-muted-foreground hover:text-foreground transition-colors text-sm">iPhone</Link></li>
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
  );
}


