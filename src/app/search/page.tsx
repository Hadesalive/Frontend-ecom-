"use client";

import { Suspense, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { Nav, PageHeader } from "../(ui)/components";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingBag as ShoppingBagIcon } from "lucide-react";
import { searchProducts, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/currency";
import { useCart } from "@/components/cart/cart-context";

function ResultCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <Card className="group transition-all duration-300 border-none bg-transparent shadow-none p-0 h-full">
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />
        {product.badge ? (
          <span
            className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium"
            style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
          >
            {product.badge}
          </span>
        ) : null}
      </div>
      <div className="p-4 flex items-center justify-between gap-3">
        <div>
          <div className="font-medium leading-none">
            <Link href={`/products/${product.slug}`} className="link hover:opacity-80">
              {product.name}
            </Link>
          </div>
          <div className="text-[13px] text-[--color-muted-foreground] mt-1">{formatPrice(product.price)}</div>
        </div>
        <Button
          size="sm"
          className="h-8 gap-1"
          disabled={!product.inStock}
          onClick={() => addItem(product)}
          style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
        >
          <ShoppingBagIcon className="h-4 w-4" /> Add
        </Button>
      </div>
    </Card>
  );
}

function SearchInner() {
  const params = useSearchParams();
  const [query, setQuery] = useState(params.get("q") ?? "");
  const results = searchProducts(query);
  return (
    <section className="container-max pb-12 space-y-6">
      <input
        className="elevated h-12 w-full px-4"
        placeholder="Search products"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        autoFocus
      />
      {query.trim() === "" ? (
        <div className="text-[--color-muted-foreground] text-sm">Type to explore the catalog.</div>
      ) : results.length === 0 ? (
        <div className="elevated p-10 text-center text-[--color-muted-foreground]">
          No products match “{query}”.{" "}
          <Link href="/shop" className="text-[--color-accent]">
            Browse all products
          </Link>
          .
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((p) => (
            <ResultCard key={p.slug} product={p} />
          ))}
        </div>
      )}
    </section>
  );
}

export default function SearchPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Search" />
      <Suspense
        fallback={<div className="container-max pb-12 text-sm text-[--color-muted-foreground]">Loading…</div>}
      >
        <SearchInner />
      </Suspense>
    </div>
  );
}
