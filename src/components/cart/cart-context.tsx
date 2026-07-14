"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import type { Product } from "@/lib/products";
import {
  type CartItem,
  addItem as addItemLogic,
  removeItem as removeItemLogic,
  updateQty as updateQtyLogic,
  cartCount,
  cartSubtotal,
} from "./cart-logic";

const STORAGE_KEY = "hoe-cart";

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  addItem: (product: Product, quantity?: number) => void;
  removeItem: (slug: string) => void;
  updateQty: (slug: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setItems(JSON.parse(raw) as CartItem[]);
    } catch {}
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items, hydrated]);

  const addItem = useCallback(
    (product: Product, quantity = 1) => setItems((cur) => addItemLogic(cur, product, quantity)),
    []
  );
  const removeItem = useCallback((slug: string) => setItems((cur) => removeItemLogic(cur, slug)), []);
  const updateQty = useCallback(
    (slug: string, quantity: number) => setItems((cur) => updateQtyLogic(cur, slug, quantity)),
    []
  );
  const clear = useCallback(() => setItems([]), []);

  const value = useMemo<CartContextValue>(
    () => ({
      items,
      count: cartCount(items),
      subtotal: cartSubtotal(items),
      addItem,
      removeItem,
      updateQty,
      clear,
    }),
    [items, addItem, removeItem, updateQty, clear]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within a CartProvider");
  return ctx;
}
