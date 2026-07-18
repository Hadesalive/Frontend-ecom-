"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { Nav, Footer } from "./(ui)/components";
import { products, getCategories, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/currency";
import { useCart } from "@/components/cart/cart-context";
import { ArrowRightIcon, ArrowUpRightIcon, PlusIcon } from "@heroicons/react/24/outline";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

/* ---------------------------------- Hero ---------------------------------- */

const HEADLINE: { text: string; className: string }[] = [
  { text: "Where", className: "font-medium text-[--color-muted-foreground]" },
  { text: "technology", className: "font-medium text-[--color-muted-foreground]" },
  { text: "comes home.", className: "font-black text-[--color-foreground]" },
];

function Hero({ featured }: { featured: Product }) {
  return (
    <section id="home-hero" className="border-b" style={{ borderColor: "var(--color-border)" }}>
      <div className="container-max pt-32 md:pt-40">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 items-end pb-14 md:pb-20">
          {/* Type block */}
          <div>
            <p
              data-hero="eyebrow"
              className="font-mono text-[11px] md:text-xs uppercase tracking-[0.28em] text-[--color-muted-foreground]"
            >
              Freetown, Sierra Leone — Est. 2018
            </p>
            <h1 className="mt-6 uppercase tracking-tight leading-[0.98] text-[2.75rem] sm:text-6xl lg:text-7xl xl:text-[5.25rem]">
              {HEADLINE.map((line) => (
                <span key={line.text} className="block overflow-hidden">
                  <span data-hero="line" className={`block ${line.className}`}>
                    {line.text}
                  </span>
                </span>
              ))}
            </h1>
            <p
              data-hero="sub"
              className="mt-6 max-w-md text-[15px] md:text-base text-[--color-muted-foreground] leading-relaxed"
            >
              Genuine devices, honest prices, and expert repairs — delivered across Sierra Leone.
            </p>
            <div data-hero="cta" className="mt-8 flex flex-wrap items-stretch gap-3">
              <Link
                href="/shop"
                className="inline-flex items-center gap-3 h-12 px-6 font-mono text-[13px] uppercase tracking-[0.18em] transition-opacity hover:opacity-90"
                style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
              >
                Shop now <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link
                href="/repairs"
                className="inline-flex items-center gap-3 h-12 px-6 font-mono text-[13px] uppercase tracking-[0.18em] border text-[--color-foreground] transition-colors hover:border-[--color-foreground]"
                style={{ borderColor: "var(--color-border)" }}
              >
                Book a repair
              </Link>
            </div>
          </div>

          {/* Featured product stage */}
          <div data-hero="stage">
            <Link
              data-hero="stage-inner"
              href={`/products/${featured.slug}`}
              className="group block border"
              style={{ borderColor: "var(--color-border)" }}
            >
              <div className="relative aspect-[4/3] overflow-hidden bg-[--color-muted]">
                <Image
                  src={featured.image}
                  alt={featured.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                  priority
                />
              </div>
              <div
                className="flex items-center justify-between gap-4 border-t px-4 py-3.5 bg-[--color-card]"
                style={{ borderColor: "var(--color-border)" }}
              >
                <div className="min-w-0">
                  <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[--color-muted-foreground]">
                    Featured
                  </p>
                  <p className="mt-1 font-bold truncate">{featured.name}</p>
                </div>
                <span className="shelf-tag">{formatPrice(featured.price)}</span>
              </div>
            </Link>
          </div>
        </div>
      </div>

      {/* Spec strip */}
      <div className="border-t" style={{ borderColor: "var(--color-border)" }}>
        <div
          data-hero="strip"
          className="container-max grid grid-cols-2 md:grid-cols-4 font-mono text-[10px] md:text-[11px] uppercase tracking-[0.2em] text-[--color-muted-foreground]"
        >
          <span className="py-3.5 pr-4">Free delivery {formatPrice(100)}+</span>
          <span className="py-3.5 px-4 border-l" style={{ borderColor: "var(--color-border)" }}>
            12-month warranty
          </span>
          <span className="py-3.5 px-4 border-l" style={{ borderColor: "var(--color-border)" }}>
            Genuine parts
          </span>
          <span className="py-3.5 px-4 border-l hidden md:block" style={{ borderColor: "var(--color-border)" }}>
            Repairs in-house
          </span>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------ Section header ----------------------------- */

function SectionHead({
  eyebrow,
  title,
  href,
  linkLabel,
}: {
  eyebrow: string;
  title: string;
  href?: string;
  linkLabel?: string;
}) {
  return (
    <div className="gsap-reveal flex items-end justify-between gap-6">
      <div>
        <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[--color-muted-foreground]">{eyebrow}</p>
        <h2 className="mt-3 text-3xl md:text-4xl font-black uppercase tracking-tight">{title}</h2>
      </div>
      {href && linkLabel ? (
        <Link
          href={href}
          className="hidden sm:inline-flex items-center gap-2 pb-1 font-mono text-[12px] uppercase tracking-[0.18em] border-b border-[--color-foreground] text-[--color-foreground] transition-colors hover:text-[--accent] hover:border-[--accent]"
        >
          {linkLabel} <ArrowRightIcon className="h-3.5 w-3.5" />
        </Link>
      ) : null}
    </div>
  );
}

/* -------------------------------- Categories ------------------------------- */

function Categories() {
  const cats = getCategories();
  return (
    <section className="container-max py-16 md:py-24">
      <SectionHead eyebrow="Browse" title="Shop by category" href="/shop" linkLabel="All products" />
      <div
        className="gsap-reveal mt-8 grid grid-cols-2 md:grid-cols-3 border-t border-l"
        style={{ borderColor: "var(--color-border)" }}
      >
        {cats.map((c) => (
          <Link
            key={c.slug}
            href={`/categories/${c.slug}`}
            className="group border-b border-r p-5 md:p-7 transition-colors hover:bg-[--color-muted]"
            style={{ borderColor: "var(--color-border)" }}
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[--color-muted-foreground]">
              {String(c.count).padStart(2, "0")} {c.count === 1 ? "item" : "items"}
            </p>
            <div className="mt-8 md:mt-12 flex items-end justify-between gap-3">
              <span className="text-lg md:text-2xl font-bold tracking-tight">{c.name}</span>
              <ArrowUpRightIcon className="h-4 w-4 md:h-5 md:w-5 shrink-0 text-[--color-muted-foreground] transition-all group-hover:text-[--accent] group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Products -------------------------------- */

function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <div className="group flex flex-col border-b border-r" style={{ borderColor: "var(--color-border)" }}>
      <Link href={`/products/${product.slug}`} className="relative block aspect-square overflow-hidden bg-[--color-muted]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 25vw, 50vw"
        />
        {product.badge ? (
          <span
            className="absolute left-3 top-3 px-2 py-1 font-mono text-[9px] uppercase tracking-[0.2em]"
            style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
          >
            {product.badge}
          </span>
        ) : null}
        {!product.inStock ? (
          <div className="absolute inset-0 flex items-center justify-center bg-black/45">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-white">Out of stock</span>
          </div>
        ) : null}
      </Link>
      <div className="flex items-center justify-between gap-3 p-4">
        <div className="min-w-0">
          <Link
            href={`/products/${product.slug}`}
            className="block truncate font-semibold transition-colors hover:text-[--accent]"
          >
            {product.name}
          </Link>
          <p className="mt-1 font-mono text-[12px] text-[--color-muted-foreground]">{formatPrice(product.price)}</p>
        </div>
        <button
          aria-label={`Add ${product.name} to cart`}
          disabled={!product.inStock}
          onClick={() => addItem(product)}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center border transition-colors hover:bg-[--accent] hover:text-[--accent-contrast] hover:border-transparent disabled:opacity-40"
          style={{ borderColor: "var(--color-border)" }}
        >
          <PlusIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
}

function NewArrivals() {
  const items = products.slice(0, 8);
  return (
    <section className="container-max pb-16 md:pb-24">
      <SectionHead eyebrow="Catalog" title="New arrivals" href="/shop" linkLabel="View all" />
      <div
        className="gsap-reveal mt-8 grid grid-cols-2 lg:grid-cols-4 border-t border-l"
        style={{ borderColor: "var(--color-border)" }}
      >
        {items.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </div>
    </section>
  );
}

/* --------------------------------- Repairs --------------------------------- */

const SERVICES: [string, string][] = [
  ["Diagnostics", "Free"],
  ["Battery replacement", `From ${formatPrice(49)}`],
  ["Screen repair", `From ${formatPrice(79)}`],
  ["Data recovery", `From ${formatPrice(99)}`],
  ["Cleaning & thermal service", `From ${formatPrice(39)}`],
];

function RepairsBand() {
  return (
    <section className="border-t bg-[--color-muted]" style={{ borderColor: "var(--color-border)" }}>
      <div className="container-max grid gap-12 py-16 md:py-24 lg:grid-cols-2 lg:gap-16">
        <div className="gsap-reveal">
          <p className="font-mono text-[11px] uppercase tracking-[0.28em] text-[--color-muted-foreground]">Service</p>
          <h2 className="mt-3 text-4xl md:text-5xl uppercase tracking-tight leading-[1.02]">
            <span className="block font-black">Repairs,</span>
            <span className="block font-medium text-[--color-muted-foreground]">done properly.</span>
          </h2>
          <p className="mt-5 max-w-md text-[15px] text-[--color-muted-foreground] leading-relaxed">
            Certified technicians, genuine parts, and a free diagnostic before any work begins.
          </p>
          <Link
            href="/repairs"
            className="mt-8 inline-flex items-center gap-3 h-12 px-6 font-mono text-[13px] uppercase tracking-[0.18em] transition-opacity hover:opacity-90"
            style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
          >
            Book a repair <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
        <ul className="gsap-reveal self-center divide-y border-y" style={{ borderColor: "var(--color-border)" }}>
          {SERVICES.map(([name, price]) => (
            <li
              key={name}
              className="flex items-center justify-between gap-4 py-4"
              style={{ borderColor: "var(--color-border)" }}
            >
              <span className="font-semibold">{name}</span>
              <span className="font-mono text-[12px] uppercase tracking-[0.12em] text-[--color-muted-foreground]">
                {price}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ----------------------------------- Page ----------------------------------- */

export default function Home() {
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: "power3.out" } });
      tl.from('[data-hero="eyebrow"]', { y: 16, autoAlpha: 0, duration: 0.5 })
        .from('[data-hero="line"]', { yPercent: 110, duration: 0.7, stagger: 0.1 }, "-=0.2")
        .from('[data-hero="sub"]', { y: 14, autoAlpha: 0, duration: 0.5 }, "-=0.35")
        .from('[data-hero="cta"]', { y: 14, autoAlpha: 0, duration: 0.5 }, "-=0.35")
        .from('[data-hero="stage"]', { y: 32, autoAlpha: 0, duration: 0.8 }, "-=0.55")
        .from('[data-hero="strip"] > *', { y: 10, autoAlpha: 0, stagger: 0.05, duration: 0.4 }, "-=0.4");

      gsap.utils.toArray<HTMLElement>(".gsap-reveal").forEach((el) => {
        gsap.from(el, {
          autoAlpha: 0,
          y: 28,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 86%", once: true },
        });
      });
    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={mainRef}>
      <Nav />
      <main>
        <Hero featured={products[0]} />
        <Categories />
        <NewArrivals />
        <RepairsBand />
      </main>
      <Footer />
    </div>
  );
}
