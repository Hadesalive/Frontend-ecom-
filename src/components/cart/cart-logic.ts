import type { Product } from "@/lib/products";

export type CartItem = {
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  badge?: string;
  inStock: boolean;
  quantity: number;
};

export function toCartItem(p: Product, quantity: number): CartItem {
  return {
    slug: p.slug,
    name: p.name,
    price: p.price,
    originalPrice: p.originalPrice,
    image: p.image,
    badge: p.badge,
    inStock: p.inStock,
    quantity,
  };
}

export function addItem(items: CartItem[], p: Product, quantity: number): CartItem[] {
  const existing = items.find((it) => it.slug === p.slug);
  if (existing) {
    return items.map((it) =>
      it.slug === p.slug ? { ...it, quantity: it.quantity + quantity } : it
    );
  }
  return [...items, toCartItem(p, quantity)];
}

export function removeItem(items: CartItem[], slug: string): CartItem[] {
  return items.filter((it) => it.slug !== slug);
}

export function updateQty(items: CartItem[], slug: string, quantity: number): CartItem[] {
  const q = Math.max(1, Math.floor(quantity));
  return items.map((it) => (it.slug === slug ? { ...it, quantity: q } : it));
}

export function cartCount(items: CartItem[]): number {
  return items.reduce((sum, it) => sum + it.quantity, 0);
}

export function cartSubtotal(items: CartItem[]): number {
  return items.reduce((sum, it) => sum + it.price * it.quantity, 0);
}
