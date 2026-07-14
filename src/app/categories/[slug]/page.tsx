"use client";

import { use, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Nav, PageHeader } from "../../(ui)/components";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Heart as HeartIcon, ShoppingBag as ShoppingBagIcon } from "lucide-react";
import { getProductsByCategory, type Product } from "@/lib/products";
import { formatPrice } from "@/lib/currency";
import { useCart } from "@/components/cart/cart-context";

function CategoryCard({ product }: { product: Product }) {
  const [fav, setFav] = useState(false);
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
        <button
          aria-label={fav ? "Remove from wishlist" : "Add to wishlist"}
          onClick={(e) => {
            e.preventDefault();
            setFav((v) => !v);
          }}
          className="absolute right-3 top-3 rounded-full bg-[--color-background]/80 backdrop-blur p-1.5 border border-[--color-border] opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <HeartIcon className={`h-4 w-4 ${fav ? "fill-[--color-foreground] text-[--color-foreground]" : ""}`} />
        </button>
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
              <Link href={`/products/${product.slug}`} className="link hover:opacity-80">
                {product.name}
              </Link>
            </div>
            <span className="block h-[2px] w-10 mt-2 rounded-full" style={{ background: "var(--accent)" }} />
            <div className="text-[13px] text-[--color-muted-foreground] mt-1">
              {formatPrice(product.price)}
              {product.originalPrice && (
                <span className="ml-2 line-through text-[11px]">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button asChild variant="ghost" className="h-8 px-3 text-[--color-accent]">
              <Link href={`/products/${product.slug}`}>View</Link>
            </Button>
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
        </div>
      </div>
    </Card>
  );
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const title = slug.replaceAll("-", " ");
  const items = getProductsByCategory(slug);
  return (
    <div>
      <Nav />
      <PageHeader title={title.charAt(0).toUpperCase() + title.slice(1)} />
      <section className="container-max pb-12">
        {items.length === 0 ? (
          <div className="elevated p-10 text-center text-[--color-muted-foreground]">
            No products in this category yet.{" "}
            <Link href="/shop" className="text-[--color-accent]">
              Browse all products
            </Link>
            .
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => (
              <CategoryCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
