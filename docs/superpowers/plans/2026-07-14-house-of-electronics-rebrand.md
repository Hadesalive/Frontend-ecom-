# House of Electronics — Rebrand & Site Completion Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebrand the existing "Topnotch Electronics" storefront to **House of Electronics** and complete its unfinished functionality (unified catalog, working cart/checkout, working search, real content pages, New Leone pricing) — without altering the loved design.

**Architecture:** Introduce three small pure modules (`currency`, `products`, cart logic) that are unit-tested, then a thin React cart context over the cart logic. Wire existing pages to these single sources of truth. Brand changes are concentrated in `globals.css` (accent tokens) and a new `BrandLogo` component; everything else inherits via existing CSS custom properties. No layout, spacing, or component-structure changes.

**Tech Stack:** Next.js 15 App Router, React 19, TypeScript, Tailwind v4, framer-motion. Add Vitest (dev-only) for unit tests. Pillow (Python, one-off) for logo processing.

## Global Constraints

- **Preserve the design exactly.** No changes to layout, spacing, component structure, or interactions. Only brand identity + missing functionality.
- **Display name:** `House of Electronics`. **Legal name:** `Type A House of Electronics (SL) Ltd.`
- **Accent:** `#2f6fb5` (light), `#659dd4` (dark). Never reintroduce orange (`#ff6b00` / `#ff7a00`).
- **Brand gradient (decorative fills only):** `#659dd4 → #70a68f`.
- **Tagline:** `Where technology comes home.`
- **Currency:** display all prices in New Leones via `formatPrice` from `src/lib/currency.ts`. Never hard-code `$`/USD formatting. Base numeric values stay as-is (USD magnitudes); conversion happens at format time.
- **No real payments / no backend.** Checkout success stays simulated.
- **Product catalog products/images unchanged** (Apple sample data stays; only price *formatting* changes).
- After each task: the code compiles (`npx tsc --noEmit` clean for touched files) and any new unit tests pass.

---

### Task 1: Test tooling + New Leone currency utility

**Files:**
- Modify: `package.json` (add `vitest` devDep + `test` script)
- Create: `vitest.config.ts`
- Create: `src/lib/currency.ts`
- Test: `src/lib/currency.test.ts`

**Interfaces:**
- Produces: `USD_TO_NLE: number`, `formatPrice(usd: number): string` (returns `"NLe 29,877"`-style).

- [ ] **Step 1: Install Vitest**

Run: `npm install -D vitest@^2`
Expected: adds `vitest` to devDependencies, no errors.

- [ ] **Step 2: Add test script**

In `package.json` `"scripts"`, add:

```json
"test": "vitest run"
```

- [ ] **Step 3: Create `vitest.config.ts`**

```ts
import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["src/**/*.test.ts"],
  },
});
```

- [ ] **Step 4: Write the failing test**

`src/lib/currency.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { formatPrice, USD_TO_NLE } from "@/lib/currency";

describe("formatPrice", () => {
  it("converts a USD base amount to NLe with thousands separators", () => {
    expect(formatPrice(1299)).toBe(`NLe ${(1299 * USD_TO_NLE).toLocaleString("en-US")}`);
  });
  it("rounds to a whole Leone", () => {
    expect(formatPrice(9.99)).toBe(`NLe ${Math.round(9.99 * USD_TO_NLE).toLocaleString("en-US")}`);
  });
  it("formats zero as NLe 0", () => {
    expect(formatPrice(0)).toBe("NLe 0");
  });
  it("uses an integer conversion rate", () => {
    expect(Number.isInteger(USD_TO_NLE)).toBe(true);
  });
});
```

- [ ] **Step 5: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/lib/currency`.

- [ ] **Step 6: Create `src/lib/currency.ts`**

```ts
// New Leone (NLe) display currency for the Sierra Leone storefront.
// Base product values are stored in USD magnitudes; we convert at format time
// so the whole catalog can be repriced by changing this single constant.
export const USD_TO_NLE = 23;

export function formatPrice(usd: number): string {
  const nle = Math.round(usd * USD_TO_NLE);
  return `NLe ${nle.toLocaleString("en-US")}`;
}
```

- [ ] **Step 7: Run test to verify it passes**

Run: `npm test`
Expected: PASS (4 tests).

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json vitest.config.ts src/lib/currency.ts src/lib/currency.test.ts
git commit -m "feat: add Vitest and New Leone currency utility"
```

---

### Task 2: Unified product catalog module

**Files:**
- Create: `src/lib/products.ts`
- Test: `src/lib/products.test.ts`
- Read for source data: `src/app/products/[slug]/page.tsx` (the `products` object, lines ~27–103) and `src/app/shop/page.tsx` (the `products` array, lines ~123–229)

**Interfaces:**
- Produces:
  - `type Product = { id: number; slug: string; name: string; price: number; originalPrice?: number; rating: number; reviews: number; image: string; images: string[]; category: string; badge?: string; inStock: boolean; description: string; features: string[]; specifications: Record<string, string> }`
  - `products: Product[]`
  - `getProductBySlug(slug: string): Product | undefined`
  - `getProductsByCategory(category: string): Product[]`
  - `searchProducts(query: string): Product[]`

- [ ] **Step 1: Write the failing test**

`src/lib/products.test.ts` (assertions are data-shape based, not hard-coded counts, so they survive catalog edits):

```ts
import { describe, it, expect } from "vitest";
import { products, getProductBySlug, getProductsByCategory, searchProducts } from "@/lib/products";

describe("product catalog", () => {
  it("every product has a unique, non-empty slug", () => {
    const slugs = products.map((p) => p.slug);
    expect(slugs.every((s) => s.length > 0)).toBe(true);
    expect(new Set(slugs).size).toBe(slugs.length);
  });
  it("every product's image is the first gallery image", () => {
    for (const p of products) {
      expect(p.images.length).toBeGreaterThan(0);
      expect(p.images[0]).toBe(p.image);
    }
  });
  it("getProductBySlug returns the matching product", () => {
    const first = products[0];
    expect(getProductBySlug(first.slug)?.slug).toBe(first.slug);
    expect(getProductBySlug("does-not-exist")).toBeUndefined();
  });
  it("getProductsByCategory returns only that category", () => {
    const cat = products[0].category;
    const result = getProductsByCategory(cat);
    expect(result.length).toBeGreaterThan(0);
    expect(result.every((p) => p.category === cat)).toBe(true);
  });
  it("searchProducts matches name or category, case-insensitively", () => {
    const term = products[0].name.split(" ")[0].toLowerCase();
    const result = searchProducts(term.toUpperCase());
    expect(result.some((p) => p.slug === products[0].slug)).toBe(true);
  });
  it("searchProducts returns [] for an empty query", () => {
    expect(searchProducts("   ")).toEqual([]);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/lib/products`.

- [ ] **Step 3: Create `src/lib/products.ts` — type + helpers**

Write the type and helpers exactly:

```ts
export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: string;
  badge?: string;
  inStock: boolean;
  description: string;
  features: string[];
  specifications: Record<string, string>;
};

export const products: Product[] = [
  // populated in Step 4
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}
```

- [ ] **Step 4: Populate `products` by consolidating the two existing sources**

The product-detail page's `products` object (keyed by slug, in `src/app/products/[slug]/page.tsx` ~lines 27–103) is the **rich source of truth**. The shop page's array (`src/app/shop/page.tsx` ~lines 123–229) is the **completeness source** (it may contain products the detail object lacks).

Do this concretely:
1. Copy every entry from the detail-page `products` object into the `products` array. For each, the object key becomes `slug`, and set `image` to `images[0]`.
2. Read the shop array. For any product there whose `name` is **not** already represented in the array, add a new `Product`: reuse its `id`, `name`, `price`, `originalPrice`, `rating`, `reviews`, `image`, `category`, `badge`, `inStock`; set `slug` = the name lowercased with spaces→`-` and non-alphanumerics removed (e.g. `iPad Pro 12.9"` → `ipad-pro-12-9`); set `images: [image]`; write a one-sentence `description`; set `features: []` and `specifications: {}` (detail page tolerates empty — verified in Task 8). Do **not** invent new products beyond what already exists in these two files.
3. Ensure every product has a `slug`, and that `image === images[0]`.

- [ ] **Step 5: Run test to verify it passes**

Run: `npm test`
Expected: PASS (currency + products suites green).

- [ ] **Step 6: Commit**

```bash
git add src/lib/products.ts src/lib/products.test.ts
git commit -m "feat: unified product catalog with slug/category/search helpers"
```

---

### Task 3: Cart logic (pure functions)

**Files:**
- Create: `src/components/cart/cart-logic.ts`
- Test: `src/components/cart/cart-logic.test.ts`

**Interfaces:**
- Consumes: `Product` from `@/lib/products`.
- Produces:
  - `type CartItem = { slug: string; name: string; price: number; originalPrice?: number; image: string; badge?: string; inStock: boolean; quantity: number }`
  - `toCartItem(p: Product, quantity: number): CartItem`
  - `addItem(items: CartItem[], p: Product, quantity: number): CartItem[]`
  - `removeItem(items: CartItem[], slug: string): CartItem[]`
  - `updateQty(items: CartItem[], slug: string, quantity: number): CartItem[]`
  - `cartCount(items: CartItem[]): number`
  - `cartSubtotal(items: CartItem[]): number`

- [ ] **Step 1: Write the failing test**

`src/components/cart/cart-logic.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { addItem, removeItem, updateQty, cartCount, cartSubtotal } from "@/components/cart/cart-logic";
import type { Product } from "@/lib/products";

const p = (slug: string, price: number): Product => ({
  id: 1, slug, name: slug, price, rating: 5, reviews: 0,
  image: "/x.png", images: ["/x.png"], category: "mac",
  inStock: true, description: "", features: [], specifications: {},
});

describe("cart logic", () => {
  it("adds a new item with the given quantity", () => {
    const items = addItem([], p("a", 100), 2);
    expect(items).toHaveLength(1);
    expect(items[0]).toMatchObject({ slug: "a", quantity: 2 });
  });
  it("merges quantity when adding an existing slug", () => {
    let items = addItem([], p("a", 100), 1);
    items = addItem(items, p("a", 100), 3);
    expect(items).toHaveLength(1);
    expect(items[0].quantity).toBe(4);
  });
  it("removes an item by slug", () => {
    const items = removeItem(addItem([], p("a", 100), 1), "a");
    expect(items).toHaveLength(0);
  });
  it("clamps updated quantity to a minimum of 1", () => {
    const items = updateQty(addItem([], p("a", 100), 1), "a", 0);
    expect(items[0].quantity).toBe(1);
  });
  it("counts total units and sums subtotal on base prices", () => {
    let items = addItem([], p("a", 100), 2);
    items = addItem(items, p("b", 50), 1);
    expect(cartCount(items)).toBe(3);
    expect(cartSubtotal(items)).toBe(250);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

Run: `npm test`
Expected: FAIL — cannot resolve `@/components/cart/cart-logic`.

- [ ] **Step 3: Implement `src/components/cart/cart-logic.ts`**

```ts
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
```

- [ ] **Step 4: Run test to verify it passes**

Run: `npm test`
Expected: PASS (all suites).

- [ ] **Step 5: Commit**

```bash
git add src/components/cart/cart-logic.ts src/components/cart/cart-logic.test.ts
git commit -m "feat: pure cart logic (add/remove/update/totals)"
```

---

### Task 4: Cart context/provider + mount in layout

**Files:**
- Create: `src/components/cart/cart-context.tsx`
- Modify: `src/app/layout.tsx`

**Interfaces:**
- Consumes: cart-logic functions, `Product`.
- Produces: `CartProvider` component; `useCart(): { items: CartItem[]; count: number; subtotal: number; addItem(p: Product, qty?: number): void; removeItem(slug: string): void; updateQty(slug: string, qty: number): void; clear(): void }`.

- [ ] **Step 1: Implement `src/components/cart/cart-context.tsx`**

```tsx
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
```

- [ ] **Step 2: Mount the provider in `src/app/layout.tsx`**

Add the import at the top:

```tsx
import { CartProvider } from "@/components/cart/cart-context";
```

Wrap `{children}` inside the `<body>`:

```tsx
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <CartProvider>{children}</CartProvider>
      </body>
```

- [ ] **Step 3: Verify the app still builds**

Run: `npm run build`
Expected: build succeeds (provider mounted, nothing consumes it yet).

- [ ] **Step 4: Commit**

```bash
git add src/components/cart/cart-context.tsx src/app/layout.tsx
git commit -m "feat: cart provider with localStorage persistence, mounted in layout"
```

---

### Task 5: BrandLogo component (logo asset already processed)

**Files:**
- Already created (committed): `public/assets/hoe-logo-mark.png` — the transparent mark
- Modify: `src/app/(ui)/components.tsx` (add `BrandLogo`)

**Interfaces:**
- Produces: `BrandLogo({ className?, showWordmark?, markClassName?, wordmarkClassName? }): JSX.Element` exported from `components.tsx`.

> **Note:** The logo asset is DONE. `public/assets/hoe-logo-mark.png` (356×394, transparent) was already generated and committed (commit `73daaf6`) from the user's black-background source (`2.jpeg`) by cropping to `(360, 336, 716, 730)` to drop the baked-in "Type A / House of Electronics (SL) LTD." text, then keying out the pure-black background (alpha ∝ pixel brightness × 1.9 gain, colors kept as observed). Verified to render cleanly on both white and black. Do NOT regenerate it. This task now only adds the `BrandLogo` component.

- [ ] **Step 1: Confirm the asset exists**

Run: `ls -l public/assets/hoe-logo-mark.png`
Expected: file exists (~356×394 transparent PNG).

- [ ] **Step 2: Add `BrandLogo` to `src/app/(ui)/components.tsx`**

Add near the other exports (keep existing imports of `Image`/`Link`):

```tsx
export function BrandLogo({
  showWordmark = true,
  className = "",
  markClassName = "h-10 w-auto",
  wordmarkClassName = "text-lg md:text-xl font-semibold tracking-tight",
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
        <span className={`${wordmarkClassName} text-[--color-foreground] leading-none`}>
          House of Electronics
        </span>
      ) : null}
    </span>
  );
}
```

- [ ] **Step 3: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add "src/app/(ui)/components.tsx"
git commit -m "feat: BrandLogo component (mark + House of Electronics wordmark)"
```

---

### Task 6: Brand identity swap (colors, names, logo wiring, cart badge)

**Files:**
- Modify: `src/app/globals.css`
- Modify: `src/app/layout.tsx`
- Modify: `src/app/(ui)/components.tsx` (Nav logo + cart badge, Footer/FooterLogo name)
- Modify: `src/app/page.tsx` (homepage hero copy, inline footer logo + name)
- Modify: `src/app/about/page.tsx`, `src/app/support/page.tsx`, `src/app/contact/page.tsx`
- Delete: `public/assets/topnotch-logo-dark.png`, `public/assets/topnotch-logo-light.png`
- (Note: the two unused `*-testimonials-demo.tsx` files that previously held brand strings were already deleted as a build-baseline fix — do NOT recreate them.)

**Interfaces:**
- Consumes: `BrandLogo` (Task 5), `useCart` (Task 4).

- [ ] **Step 1: Swap accent tokens in `globals.css`**

In `:root` (light), change:

```css
  --accent: #ff6b00;
  --accent-contrast: #ffffff;
```
to:
```css
  --accent: #2f6fb5;
  --accent-contrast: #ffffff;
```

In `html.theme-dark`, change:

```css
  --accent: #ff6b00;
  --accent-contrast: #000000;
```
to:
```css
  --accent: #659dd4;
  --accent-contrast: #000000;
```

- [ ] **Step 2: Add a brand-gradient utility to `globals.css`**

Append near the other utilities (e.g. after `.btn-accent`):

```css
.brand-gradient {
  background-image: linear-gradient(135deg, #659dd4 0%, #70a68f 100%);
}
```

- [ ] **Step 3: Scan for stray orange literals**

Run: `grep -rniI "ff6b00\|ff7a00\|orange" src`
Expected after fixes: no results in `src` (replace any hard-coded orange with `var(--accent)` or the `.brand-gradient` utility, matching the surrounding style approach).

- [ ] **Step 4: Update metadata in `src/app/layout.tsx`**

Replace the `metadata` object:

```tsx
export const metadata: Metadata = {
  title: "House of Electronics",
  description: "Where technology comes home. Premium electronics and expert repairs in Sierra Leone.",
};
```

- [ ] **Step 5: Wire `BrandLogo` + cart badge into `Nav` (`components.tsx`)**

- Add `useCart` import: `import { useCart } from "@/components/cart/cart-context";`
- Inside `Nav`, call it: `const { count } = useCart();`
- Replace the desktop logo `<Image ... />` (the one inside the `<Link href="/" ...>` at the top of the header) with `<BrandLogo markClassName="h-12 md:h-14 w-auto" />`. Keep the wrapping `<Link>` and its classes unchanged.
- Replace the mobile-sheet logo `<Image ... />` with `<BrandLogo markClassName="h-14 w-auto" />` (keep its container).
- Remove the now-unused `isDark`-based logo swapping only where it fed those images (the theme toggle logic itself stays).
- Add a count badge to **both** cart icon buttons (desktop + mobile). Wrap each cart `<Link href="/cart">…</Link>` icon so the badge overlays it; render only when `count > 0`:

```tsx
<span className="relative inline-flex">
  <ShoppingBagIcon className="h-5 w-5" style={{ /* keep existing color style */ }} />
  {count > 0 ? (
    <span
      className="absolute -top-2 -right-2 min-w-[18px] h-[18px] px-1 rounded-full text-[10px] font-semibold flex items-center justify-center"
      style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
    >
      {count}
    </span>
  ) : null}
</span>
```

- [ ] **Step 6: Update `FooterLogo` and `Footer` copy (`components.tsx`)**

- Replace the `FooterLogo` component body's `<Image>` with `<BrandLogo showWordmark={false} markClassName="h-16 sm:h-20 md:h-24 w-auto" />` (the footer already renders the name separately in text), OR keep `FooterLogo` as a thin wrapper returning `<BrandLogo .../>`. Ensure alt text no longer says "TopNotch".
- In the footer bottom bar, change the copyright line to the legal name:

```tsx
© {new Date().getFullYear()} Type A House of Electronics (SL) Ltd. All rights reserved.
```

- Change the footer description paragraph "Your trusted destination…" only if it names the old brand (it does not by default — leave copy unless it says Topnotch).

- [ ] **Step 7: Update homepage brand strings (`src/app/page.tsx`)**

- Line ~57 hero: `Premium devices. TopNotch service.` → `Where technology comes home.`
- Line ~60 subcopy `Curated Macs, iPads, iPhones, and accessories with expert support and repairs.` → keep structure, drop old-brand tone if present (this line has no brand name; leave as-is unless desired).
- Lines ~257–258 inline `FooterLogo`: replace the `<Image ...>` with `<BrandLogo showWordmark={false} markClassName="h-16 sm:h-20 md:h-24 w-auto" />` and remove the `topnotch-logo-*` `src`/alt.
- Line ~570 testimonial: `TopNotch Electronics has the best selection of Apple products…` → `House of Electronics has the best selection…` (keep the sentence; just the brand name).
- Line ~723 copyright: `© {…} TopNotch Electronics. All rights reserved.` → `© {…} Type A House of Electronics (SL) Ltd. All rights reserved.`

- [ ] **Step 8: Update remaining brand strings**

Replace every user-facing `TopNotch Electronics` / `Topnotch Electronics` / `TopNotch` with `House of Electronics` in:
- `src/app/about/page.tsx` (5)
- `src/app/support/page.tsx` (2)
- `src/app/contact/page.tsx` (1)

- [ ] **Step 9: Delete the old logo assets**

Run: `git rm public/assets/topnotch-logo-dark.png public/assets/topnotch-logo-light.png`

- [ ] **Step 10: Verify no brand/orange remnants and that it builds**

Run: `grep -rniI "topnotch" src ; grep -rniI "ff6b00\|ff7a00" src ; npm run build`
Expected: both greps return nothing; build succeeds.

- [ ] **Step 11: Commit**

```bash
git add -A
git commit -m "feat: rebrand to House of Electronics (accent, logo, names, cart badge)"
```

---

### Task 7: Currency rollout across pages

**Files:**
- Modify: `src/app/shop/page.tsx`, `src/app/products/[slug]/page.tsx`, `src/app/cart/page.tsx`, `src/app/checkout/page.tsx`, `src/app/categories/[slug]/page.tsx`, `src/app/page.tsx`

**Interfaces:**
- Consumes: `formatPrice` from `@/lib/currency`.

- [ ] **Step 1: Replace the duplicated `formatPrice` in five files**

In each of `shop/page.tsx`, `products/[slug]/page.tsx`, `cart/page.tsx`, `checkout/page.tsx`, `categories/[slug]/page.tsx`:
- Delete the local `function formatPrice(price: number) { … currency: "USD" … }` definition.
- Add at the top imports: `import { formatPrice } from "@/lib/currency";`
- Leave every `formatPrice(...)` call site unchanged (same signature: a number in USD base).

- [ ] **Step 2: Route the homepage price strings through NLe (`src/app/page.tsx`)**

The homepage stores prices as strings like `"$1,099"`. Replace the local `formatPrice(input?: string)` (~lines 174–180) body with a parser that delegates to the shared formatter:

```tsx
import { formatPrice as formatNle } from "@/lib/currency";

function formatPrice(input?: string) {
  if (!input) return "";
  const asNum = Number(String(input).replace(/[^0-9.]/g, ""));
  if (!Number.isFinite(asNum)) return input;
  return formatNle(asNum);
}
```

- [ ] **Step 3: Verify no USD formatting remains**

Run: `grep -rniI 'currency: "usd"\|style: "currency"' src`
Expected: no results.

- [ ] **Step 4: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: display all prices in New Leones via shared formatter"
```

---

### Task 8: Catalog wiring (shop links, product detail, categories)

**Files:**
- Modify: `src/app/shop/page.tsx`, `src/app/products/[slug]/page.tsx`, `src/app/categories/[slug]/page.tsx`

**Interfaces:**
- Consumes: `products`, `getProductBySlug`, `getProductsByCategory`, `type Product` from `@/lib/products`.

- [ ] **Step 1: Point the shop at the unified catalog and fix product links**

In `src/app/shop/page.tsx`:
- Add `import { products, type Product } from "@/lib/products";`
- Delete the local `const products = [ … ]` array (now sourced from the module). If a local `Product` interface exists, delete it and use the imported type.
- In the shop's `ProductCard`, change the two `<Link href={`/products/${product.id}`}>` occurrences to `href={`/products/${product.slug}`}`.

- [ ] **Step 2: Point the product-detail page at the catalog**

In `src/app/products/[slug]/page.tsx`:
- Add `import { getProductBySlug } from "@/lib/products";`
- Delete the inline `products` object (~lines 27–103) and the `getProductData` helper.
- Replace `const product = getProductData(resolvedParams.slug);` with:

```tsx
  const product = getProductBySlug(resolvedParams.slug);
  if (!product) {
    return (
      <div>
        <Nav />
        <section className="pt-24 pb-16 container-max text-center">
          <h1 className="text-3xl font-semibold">Product not found</h1>
          <p className="text-[--color-muted-foreground] mt-2">
            The product you are looking for doesn’t exist.
          </p>
          <Button asChild className="mt-6" style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}>
            <Link href="/shop">Back to Shop</Link>
          </Button>
        </section>
      </div>
    );
  }
```

- If the page renders `product.features` / `product.specifications`, guard for emptiness: only map when `product.features.length > 0` and `Object.keys(product.specifications).length > 0` (products backfilled in Task 2 may have empty arrays/objects). Wrap the existing sections in those conditionals; do not change their markup otherwise.

- [ ] **Step 3: Rebuild `categories/[slug]` as a real filtered grid**

Replace the entire contents of `src/app/categories/[slug]/page.tsx` with a client page that filters the catalog. It reuses the existing product-card visual language (mirroring the shop card) and fixes the Next 15 async `params` handling:

```tsx
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
        <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}>{product.badge}</span>
        ) : null}
        <button aria-label={fav ? "Remove from wishlist" : "Add to wishlist"} onClick={(e) => { e.preventDefault(); setFav((v) => !v); }} className="absolute right-3 top-3 rounded-full bg-[--color-background]/80 backdrop-blur p-1.5 border border-[--color-border] opacity-0 group-hover:opacity-100 transition-opacity">
          <HeartIcon className={`h-4 w-4 ${fav ? "fill-[--color-foreground] text-[--color-foreground]" : ""}`} />
        </button>
        {!product.inStock && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center"><span className="text-white font-semibold">Out of Stock</span></div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-3">
          <div>
            <div className="font-medium leading-none"><Link href={`/products/${product.slug}`} className="link hover:opacity-80">{product.name}</Link></div>
            <span className="block h-[2px] w-10 mt-2 rounded-full" style={{ background: "var(--accent)" }} />
            <div className="text-[13px] text-[--color-muted-foreground] mt-1">{formatPrice(product.price)}{product.originalPrice && (<span className="ml-2 line-through text-[11px]">{formatPrice(product.originalPrice)}</span>)}</div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <Button asChild variant="ghost" className="h-8 px-3 text-[--color-accent]"><Link href={`/products/${product.slug}`}>View</Link></Button>
            <Button size="sm" className="h-8 gap-1" disabled={!product.inStock} onClick={() => addItem(product)} style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}>
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
            No products in this category yet. <Link href="/shop" className="text-[--color-accent]">Browse all products</Link>.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {items.map((p) => (<CategoryCard key={p.slug} product={p} />))}
          </div>
        )}
      </section>
    </div>
  );
}
```

Note: footer category links use slugs like `laptops`/`phones`/`accessories`; catalog categories are `mac`/`iphone`/`ipad`/etc. Empty categories now render a clean empty state (correct behavior), so no 404s.

- [ ] **Step 4: Verify build + links**

Run: `npm run build`
Expected: succeeds. Manually confirm a shop card now links to `/products/<slug>` and the detail page renders.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: wire pages to unified catalog; fix product links; real category pages"
```

---

### Task 9: Cart wiring (product detail, shop, cart page, checkout)

**Files:**
- Modify: `src/app/products/[slug]/page.tsx`, `src/app/shop/page.tsx`, `src/app/cart/page.tsx`, `src/app/checkout/page.tsx`

**Interfaces:**
- Consumes: `useCart` from `@/components/cart/cart-context`.

- [ ] **Step 1: Product-detail "Add to cart" persists**

In `src/app/products/[slug]/page.tsx`:
- Add `import { useCart } from "@/components/cart/cart-context";`
- In the component: `const { addItem } = useCart();`
- In `handleAddToCart`, after the simulated delay and before showing the notification, add the item using the page's `quantity` state:

```tsx
    addItem(product, quantity);
```

(Keep the existing `isAddingToCart` / `showAddedNotification` UX exactly.)

- [ ] **Step 2: Shop card "Add" button persists**

In `src/app/shop/page.tsx` `ProductCard`:
- Ensure `import { useCart } from "@/components/cart/cart-context";` is present.
- `const { addItem } = useCart();` inside the card.
- Add `onClick={() => addItem(product)}` to the existing "Add" `<Button>` (keep its `disabled={!product.inStock}` and styles).

- [ ] **Step 3: Cart page reads real items**

In `src/app/cart/page.tsx`:
- Add `import { useCart } from "@/components/cart/cart-context";`
- Delete the `mockCartItems` array.
- Replace `const [cartItems, setCartItems] = useState(mockCartItems);` and the local `updateQuantity`/`removeItem` handlers with context:

```tsx
  const { items: cartItems, subtotal, updateQty, removeItem } = useCart();
```

- Change the `CartItem` component's props to key on `slug` instead of `id`: `onUpdateQuantity(item.slug, qty)`, `onRemove(item.slug)`, and iterate with `key={item.slug}`. Update the `CartItem` prop types from `id: number` usage to `slug: string`.
- Replace the local totals block:

```tsx
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;
```

(Keep this — `subtotal` now comes from context; the `> 100` threshold and `9.99` are USD base, consistent with the format layer.)
- Remove the now-unused `toggleFavorite` wiring only if it references removed state; keep the heart button local visual behavior.

- [ ] **Step 4: Checkout reads real items and clears on success**

In `src/app/checkout/page.tsx`:
- Add `import { useCart } from "@/components/cart/cart-context";`
- Delete `mockOrderItems`.
- In the component: `const { items: orderItems, subtotal, clear } = useCart();`
- Replace `mockOrderItems` references (the order-summary map and the subtotal calc) with `orderItems` and the context `subtotal`. Map items by `key={item.slug}` and show `item.quantity`.
- Keep `const shipping = subtotal > 100 ? 0 : 9.99; const tax = subtotal * 0.08; const total = subtotal + shipping + tax;`.
- In `handleSubmit`, after `setIsComplete(true)`, call `clear();` so the cart empties on a confirmed order.
- If `orderItems.length === 0`, the summary simply renders empty — acceptable; no extra guard required.

- [ ] **Step 5: Verify build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "feat: functional cart and checkout backed by cart context"
```

---

### Task 10: Functional search

**Files:**
- Modify: `src/app/search/page.tsx`

**Interfaces:**
- Consumes: `searchProducts`, `type Product` from `@/lib/products`; `formatPrice`; `useCart`.

- [ ] **Step 1: Implement live search**

Replace the entire contents of `src/app/search/page.tsx`:

```tsx
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
        <Image src={product.image} alt={product.name} fill className="object-cover transition-transform duration-500 group-hover:scale-[1.03]" sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw" />
        {product.badge ? (
          <span className="absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-medium" style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}>{product.badge}</span>
        ) : null}
      </div>
      <div className="p-4 flex items-center justify-between gap-3">
        <div>
          <div className="font-medium leading-none"><Link href={`/products/${product.slug}`} className="link hover:opacity-80">{product.name}</Link></div>
          <div className="text-[13px] text-[--color-muted-foreground] mt-1">{formatPrice(product.price)}</div>
        </div>
        <Button size="sm" className="h-8 gap-1" disabled={!product.inStock} onClick={() => addItem(product)} style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}>
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
          No products match “{query}”. <Link href="/shop" className="text-[--color-accent]">Browse all products</Link>.
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {results.map((p) => (<ResultCard key={p.slug} product={p} />))}
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
      <Suspense fallback={<div className="container-max pb-12 text-sm text-[--color-muted-foreground]">Loading…</div>}>
        <SearchInner />
      </Suspense>
    </div>
  );
}
```

- [ ] **Step 2: Verify build (Suspense around `useSearchParams` is required)**

Run: `npm run build`
Expected: succeeds with no "useSearchParams should be wrapped in a suspense boundary" error.

- [ ] **Step 3: Commit**

```bash
git add src/app/search/page.tsx
git commit -m "feat: functional catalog search"
```

---

### Task 11: Content pages (rewrite placeholders + build missing pages)

**Files:**
- Modify: `src/app/privacy/page.tsx`, `src/app/terms/page.tsx`, `src/app/shipping/page.tsx`, `src/app/returns/page.tsx`
- Create: `src/app/repairs/page.tsx`, `src/app/warranty/page.tsx`, `src/app/careers/page.tsx`, `src/app/press/page.tsx`

**Interfaces:**
- Consumes: `Nav`, `PageHeader` (and `Footer` if desired) from `../(ui)/components`.

All pages follow the existing pattern: `<Nav />`, `<PageHeader title=… subtitle=… />`, then `container-max` sections using the `elevated` card and `text-[--color-muted-foreground]` body text. Copy is real and brand-appropriate (House of Electronics, Sierra Leone, Freetown). Keep it concise; no placeholder text.

- [ ] **Step 1: Rewrite `privacy/page.tsx`**

```tsx
import { Nav, PageHeader } from "../(ui)/components";

export default function PrivacyPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Privacy Policy" subtitle="How House of Electronics collects, uses, and protects your information." />
      <section className="container-max pb-16 space-y-6 text-[15px] text-[--color-muted-foreground] leading-relaxed">
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Information we collect</h2>
          <p>We collect the details you provide when you place an order or contact us — your name, phone number, email, and delivery address — along with basic device and usage data that helps us keep the store fast and secure.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">How we use it</h2>
          <p>Your information is used to process orders, arrange delivery, provide warranty and repair support, and — only with your consent — to share offers from House of Electronics. We never sell your personal data.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Your rights</h2>
          <p>You may request access to, correction of, or deletion of your personal data at any time by contacting us. We retain records only as long as needed to serve you and to meet our legal obligations in Sierra Leone.</p>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 2: Rewrite `terms/page.tsx`**

```tsx
import { Nav, PageHeader } from "../(ui)/components";

export default function TermsPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Terms of Service" subtitle="The terms that govern your use of House of Electronics." />
      <section className="container-max pb-16 space-y-6 text-[15px] text-[--color-muted-foreground] leading-relaxed">
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Using our store</h2>
          <p>By browsing or ordering from House of Electronics you agree to these terms. You must provide accurate details when placing an order and be authorised to use your chosen payment method.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Orders &amp; pricing</h2>
          <p>All prices are shown in New Leones (NLe) and include applicable taxes unless stated otherwise. We may correct pricing errors and cancel affected orders with a full refund. Product availability is not guaranteed until your order is confirmed.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Liability</h2>
          <p>Products are covered by the warranty described on our Warranty page. To the extent permitted by law, House of Electronics is not liable for indirect or incidental losses arising from use of a product.</p>
        </div>
        <p className="text-sm">Type A House of Electronics (SL) Ltd.</p>
      </section>
    </div>
  );
}
```

- [ ] **Step 3: Rewrite `shipping/page.tsx`**

```tsx
import { Nav, PageHeader } from "../(ui)/components";

export default function ShippingPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Shipping Information" subtitle="Delivery options, timing, and coverage across Sierra Leone." />
      <section className="container-max pb-16 space-y-6 text-[15px] text-[--color-muted-foreground] leading-relaxed">
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Delivery within Freetown</h2>
          <p>Orders placed before 2:00 PM are typically delivered the same or next business day within Freetown. You will receive a call or message to confirm your delivery window.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Nationwide delivery</h2>
          <p>We ship to major towns across Sierra Leone via trusted courier partners, usually within 2–5 business days. Delivery fees are calculated at checkout based on your location.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Free shipping</h2>
          <p>Qualifying orders ship free — the threshold is shown in your cart. Store pickup at our Freetown location is always free.</p>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 4: Rewrite `returns/page.tsx`**

```tsx
import { Nav, PageHeader } from "../(ui)/components";

export default function ReturnsPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Returns & Exchanges" subtitle="Straightforward returns so you can buy with confidence." />
      <section className="container-max pb-16 space-y-6 text-[15px] text-[--color-muted-foreground] leading-relaxed">
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">14-day returns</h2>
          <p>Unopened items in their original packaging can be returned within 14 days of delivery for a refund or exchange. Bring your receipt or order confirmation.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Faulty items</h2>
          <p>If a device arrives faulty or develops a covered fault, we will repair, replace, or refund it under the terms on our Warranty page at no cost to you.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">How to start a return</h2>
          <p>Contact our Support Center with your order details and we will arrange collection or store drop-off and guide you through the rest.</p>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 5: Create `repairs/page.tsx` (fuller treatment)**

```tsx
import { Nav, PageHeader } from "../(ui)/components";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  { title: "Phone & tablet repair", desc: "Screen replacements, batteries, charging ports, and water-damage diagnostics for all major brands." },
  { title: "Laptop & computer repair", desc: "Upgrades, board-level repairs, storage and memory, OS reinstalls, and performance tune-ups." },
  { title: "Diagnostics & setup", desc: "Free diagnostics, data transfer, and device setup so you leave ready to go." },
];

export default function RepairsPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Repairs" subtitle="Expert repairs for phones, tablets, and computers — handled by certified technicians." />
      <section className="container-max pb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.title} className="elevated p-6 space-y-2">
            <span className="block h-[3px] w-10 rounded-full" style={{ background: "var(--accent)" }} />
            <h2 className="text-lg font-semibold text-[--color-foreground]">{s.title}</h2>
            <p className="text-[15px] text-[--color-muted-foreground] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </section>
      <section className="container-max pb-16">
        <div className="elevated p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-[--color-foreground]">Need a repair?</h3>
            <p className="text-[15px] text-[--color-muted-foreground] mt-1">Book a free diagnostic and get a clear quote before any work begins.</p>
          </div>
          <Button asChild style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}>
            <Link href="/support">Book a repair</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 6: Create `warranty/page.tsx`**

```tsx
import { Nav, PageHeader } from "../(ui)/components";

export default function WarrantyPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Warranty" subtitle="Every device from House of Electronics is covered." />
      <section className="container-max pb-16 space-y-6 text-[15px] text-[--color-muted-foreground] leading-relaxed">
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">12-month coverage</h2>
          <p>New devices include a 12-month warranty against manufacturing defects. If a covered fault appears, we will repair or replace the device free of charge.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">What’s covered</h2>
          <p>Hardware faults under normal use are covered. Accidental damage, liquid damage, and unauthorised repairs are not, but our Repairs team can still help at a fair price.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Making a claim</h2>
          <p>Contact our Support Center with your order details. Keep your receipt or order confirmation — it’s all you need to make a claim.</p>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 7: Create `careers/page.tsx`**

```tsx
import { Nav, PageHeader } from "../(ui)/components";

const roles = [
  { title: "Retail Sales Associate", location: "Freetown", type: "Full-time" },
  { title: "Repair Technician", location: "Freetown", type: "Full-time" },
  { title: "Delivery Rider", location: "Freetown", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Careers" subtitle="Help us bring technology home to Sierra Leone." />
      <section className="container-max pb-16 space-y-4">
        {roles.map((r) => (
          <div key={r.title} className="elevated p-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[--color-foreground]">{r.title}</h2>
              <p className="text-[14px] text-[--color-muted-foreground] mt-1">{r.location} · {r.type}</p>
            </div>
            <span className="text-[13px] font-medium" style={{ color: "var(--accent)" }}>Apply via Support</span>
          </div>
        ))}
        <p className="text-[15px] text-[--color-muted-foreground] pt-2">
          Don’t see your role? Reach out through our Support Center and tell us how you’d like to contribute.
        </p>
      </section>
    </div>
  );
}
```

- [ ] **Step 8: Create `press/page.tsx`**

```tsx
import { Nav, PageHeader } from "../(ui)/components";

export default function PressPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Press" subtitle="Media resources and company information for House of Electronics." />
      <section className="container-max pb-16 space-y-6 text-[15px] text-[--color-muted-foreground] leading-relaxed">
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">About us</h2>
          <p>Type A House of Electronics (SL) Ltd. is a Sierra Leone retailer of premium electronics and expert repairs, built on a simple promise: where technology comes home.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Media enquiries</h2>
          <p>For interviews, brand assets, or partnership enquiries, contact our team through the Support Center and we’ll respond promptly.</p>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 9: Verify build (all footer links now resolve)**

Run: `npm run build`
Expected: succeeds; routes `/repairs`, `/warranty`, `/careers`, `/press` compile.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "feat: real content pages (privacy/terms/shipping/returns) + repairs/warranty/careers/press"
```

---

### Task 12: Final verification

**Files:** none (verification only)

- [ ] **Step 1: Unit tests green**

Run: `npm test`
Expected: all suites pass (currency, products, cart-logic).

- [ ] **Step 2: Production build clean**

Run: `npm run build`
Expected: compiles with no type/lint errors.

- [ ] **Step 3: Brand/orange/USD grep is clean**

Run: `grep -rniI "topnotch" src ; grep -rniI "ff6b00\|ff7a00" src ; grep -rniI 'currency: "usd"' src`
Expected: all three return nothing.

- [ ] **Step 4: Manual walkthrough (light AND dark theme)**

Run: `npm run dev`, then in the browser confirm:
- Logo mark + "House of Electronics" wordmark render crisply on white and black; toggle theme.
- Accent is the new blue everywhere (buttons, links, active nav, focus rings); no orange remains.
- Add a product from a product page (with quantity) and from a shop card → nav cart badge count increases.
- Cart page shows the added items with NLe prices, working qty steppers and remove, and a correct NLe subtotal/shipping/tax/total.
- Checkout shows the same items and totals; submitting shows "Order Confirmed!" and the cart badge resets to 0 (cart cleared).
- Search (`/search`) filters as you type, shows results with NLe prices and a working Add button, and shows an empty state for nonsense queries.
- Every footer link resolves to a real page (privacy, terms, shipping, returns, repairs, warranty, careers, press, contact, support, about, shop, categories) — no 404s.
- Prices display as `NLe …` on home, shop, product detail, category, cart, and checkout.

- [ ] **Step 5: Final commit (if any verification fixes were made)**

```bash
git add -A
git commit -m "chore: final verification fixes for rebrand + completion"
```

---

## Notes for the implementer

- **USD→NLe rate** lives in one place (`USD_TO_NLE` in `src/lib/currency.ts`, currently `23`). Change it to reprice everything.
- **Two ProductCard implementations** (shop page + category page) are intentionally kept separate to avoid any visual risk to the loved design; both are corrected to use slugs, NLe, and the cart. This duplication is accepted for this pass.
- **Empty features/specs**: products backfilled from the shop array in Task 2 may have empty `features`/`specifications`; Task 8 Step 2 guards the detail-page sections so they don't render empty blocks.
- **Do not** change product names/images or introduce real payments — out of scope by explicit decision.
