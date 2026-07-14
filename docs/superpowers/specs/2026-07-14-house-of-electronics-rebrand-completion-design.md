# House of Electronics — Rebrand & Site Completion

**Date:** 2026-07-14
**Branch:** `feature/house-of-electronics-rebrand`
**Status:** Design — awaiting review

## Overview

Rebrand the existing "Topnotch Electronics" storefront to **House of Electronics**
(legal: *Type A House of Electronics (SL) Ltd.*) and complete the unfinished parts
of the site. The existing design and layout are loved and must be preserved
**exactly** — this work changes brand identity (name, logo, accent color, copy)
and fills in missing functionality (cart, search, content pages). No layout,
spacing, component structure, or interaction redesign.

### Goals

1. Swap the brand identity everywhere: name, logo, accent color, tagline, copy.
2. Make the cart and checkout genuinely functional (persisted, real totals) —
   without a backend or real payments.
3. Make search actually filter and return products.
4. Fill placeholder legal pages with real copy and build the four missing linked
   pages (repairs, warranty, careers, press).
5. Display prices in New Leones (NLe).

### Non-goals

- No changes to layout, visual structure, spacing, or component design.
- No real payment processing or backend/API (checkout success is simulated).
- No changes to the product catalog's products, names, or images (Apple sample
  data stays; only the price *formatting/currency* changes).
- No changes to the dashboard's data or structure beyond the brand token/color
  swap it inherits automatically.

## Part 1 — Brand identity

### Names

| Use | Value |
| --- | --- |
| Display name (nav, `<title>`, headings, copy) | **House of Electronics** |
| Legal name (footer ©, legal pages) | **Type A House of Electronics (SL) Ltd.** |

Replace every user-facing "Topnotch Electronics" / "TopNotch Electronics" /
"TNE" occurrence. Audit targets include `layout.tsx` metadata, `components.tsx`
(Nav, Footer, FooterLogo), homepage copy, about page, support page, and any
alt text.

### Color palette

The palette is derived from the logo gradient (blue `#659dd4` → teal `#70a68f`).
The logo tones are too light to carry white text accessibly, so — mirroring how
the current design uses orange — a **deepened blue** drives interactive elements
while the **true logo gradient** is used only for decorative fills.

| Token | Light theme | Dark theme | Role |
| --- | --- | --- | --- |
| `--accent` | `#2f6fb5` | `#659dd4` | Buttons, links, focus rings, active nav. Replaces `#ff6b00`. |
| `--accent-contrast` | `#ffffff` | `#000000` | Text/icon on accent. |
| Brand gradient | `#659dd4 → #70a68f` | same | Decorative hero/section fills only (never text bg). |

- Light accent `#2f6fb5` on white = 5.17:1 (passes WCAG AA for text).
- Dark accent `#659dd4` on black = 7.33:1.
- Implementation: edit the accent custom properties in `src/app/globals.css`
  (`:root` and `html.theme-dark`). Because the whole design references
  `--accent` / `--color-accent`, this is a near-single-source swap. Grep for any
  hard-coded `#ff6b00` / `#ff7a00` / `orange` literals and replace them too.
- Add a reusable brand-gradient utility (e.g. `.brand-gradient` in `globals.css`)
  for the few decorative spots that currently use a solid accent fill or an
  orange gradient, so the blue→teal identity appears without altering layout.

### Logo

The supplied asset is a square badge (hexagon "house + wifi" mark) on a white
background with tiny baked-in legal text. Processing:

1. From the source PNG, **knock out the white background** (pure white →
   transparent) and **crop to just the hexagon mark** (exclude the tiny bottom
   text). Output: `public/assets/hoe-logo-mark.png` (transparent, works on light
   and dark backgrounds — the mark's mid-tone blue/teal reads on both).
2. Create a `BrandLogo` component (in `src/app/(ui)/components.tsx` or
   `src/components/ui/`) that renders the mark image beside a styled text
   wordmark **"House of Electronics"** using `text-foreground` (auto-adapts to
   theme). Props for size and whether to show the wordmark (mark-only for tight
   spots if needed).
3. Replace the current theme-swapped `<Image>` logic in `Nav` (desktop + mobile
   sheet) and `FooterLogo` with `BrandLogo`. This removes the two-file
   light/dark swap since one transparent mark serves both. Keep the same
   heights/placement classes so the header/footer layout is unchanged.
4. Update `alt` text to "House of Electronics logo".
5. Old `topnotch-logo-*.png` files may remain in `public/assets` unused or be
   deleted; deletion is preferred once references are gone.

### Tagline & voice

- **Tagline:** *"Where technology comes home."*
- **Voice:** warm, premium, trustworthy — leaning into the "connected home"
  identity of the house+wifi mark. Replace the current
  *"Apple-quality devices and repairs."* metadata/hero framing with the new
  tagline and on-brand supporting copy (kept to the same lengths so layout is
  unaffected).

## Part 2 — Site completion

### 2.1 Unified product catalog

**Problem:** product data is duplicated — `shop/page.tsx` has an array (numeric
`id`, no `slug`) and `products/[slug]/page.tsx` has an object keyed by slug with
richer fields. They can drift, and cart/search need one source of truth.

**Solution:** create `src/lib/products.ts` exporting a single typed
`Product[]` (and helpers `getProductBySlug`, `getProductsByCategory`,
`searchProducts`). One canonical shape covering both current usages:

```
type Product = {
  id: number
  slug: string
  name: string
  price: number            // base amount (see currency)
  originalPrice?: number
  rating: number
  reviews: number
  image: string            // primary/thumbnail
  images: string[]         // gallery (>= [image])
  category: string
  badge?: string
  inStock: boolean
  description: string
  features: string[]
  specifications: Record<string, string>
}
```

Refactor `shop`, `products/[slug]`, `categories/[slug]`, and `search` to import
from this module. Product cards and detail rendering are **unchanged visually** —
only their data source changes. Ensure every product has a `slug` so shop cards
link correctly to detail pages.

### 2.2 Functional cart

- `CartProvider` (React context) in `src/components/cart/` (or `src/lib/`),
  persisting to `localStorage` under key `hoe-cart`, hydration-safe
  (`suppressHydrationWarning` pattern already used in layout).
- API: `items`, `addItem(product, qty)`, `removeItem(slug)`,
  `updateQty(slug, qty)`, `clear()`, derived `count`, `subtotal`.
- Mount `<CartProvider>` in `src/app/layout.tsx` wrapping `{children}`.
- **Nav cart icon** gains a live count badge (small, accent-colored) — additive,
  positioned on the existing icon, no layout shift.
- **Product detail + shop** "Add to cart" calls `addItem` and keeps the existing
  added-notification UX.
- **Cart page** replaces `mockCartItems` with real context items; qty steppers,
  remove, and totals all operate on context. Empty-cart state uses existing
  styling.
- **Checkout page** reads real items, computes subtotal + shipping + total from
  context; "Place order" calls `clear()` and shows the existing success screen.
  No payment integration.

### 2.3 Working search

- `/search` becomes functional: reads `?q=` (via `useSearchParams`), filters the
  unified catalog by name/category with `searchProducts`, and renders matches
  using the **existing product-card design** from shop. Live filtering as the
  user types; empty/no-results state in the current visual language. Keep the
  existing input styling. Wrap in `<Suspense>` as required for
  `useSearchParams`.

### 2.4 Content pages

Use the existing `PageHeader` + `elevated`/`container-max` layout language for
all. Real, brand-appropriate copy (House of Electronics, Sierra Leone context).

- **Rewrite placeholders:** `privacy`, `terms`, `shipping`, `returns`.
- **Build missing (footer-linked) pages:** `repairs`, `warranty`, `careers`,
  `press`. `repairs` gets a fuller treatment (the brand is repair-capable);
  the others are clean, real informational pages.

### 2.5 Currency (New Leones)

- Centralize formatting in `src/lib/currency.ts`: `formatPrice(amount)` →
  `"NLe 29,900"` style (thousands separators, no decimals for these magnitudes).
- Convert existing USD base prices to NLe via a single exported constant
  `USD_TO_NLE` (initial value ≈ `23`, rounded to clean values). Documented as an
  assumption — tune the constant to reprice everything at once.
- Replace all hard-coded `$`/USD formatting in shop, product detail, cart,
  checkout, and any homepage price with `formatPrice`.

## Affected files (indicative)

- `src/app/globals.css` — accent tokens, brand-gradient utility.
- `src/app/layout.tsx` — metadata (title/description), mount `CartProvider`.
- `src/app/(ui)/components.tsx` — `BrandLogo`, Nav/Footer name + cart badge.
- `src/lib/products.ts` — new unified catalog + helpers.
- `src/lib/currency.ts` — new formatter + rate.
- `src/components/cart/*` — new cart context/provider.
- `src/app/shop/page.tsx`, `src/app/products/[slug]/page.tsx`,
  `src/app/categories/[slug]/page.tsx`, `src/app/search/page.tsx`,
  `src/app/cart/page.tsx`, `src/app/checkout/page.tsx` — consume catalog/cart/
  currency.
- `src/app/{privacy,terms,shipping,returns}/page.tsx` — real copy.
- `src/app/{repairs,warranty,careers,press}/page.tsx` — new pages.
- `public/assets/hoe-logo-mark.png` — processed transparent mark.

## Verification

- `npm run build` passes (no type/lint errors); `npm run dev` renders.
- Manual walkthrough in light **and** dark themes:
  - Add items from product + shop pages → nav badge count updates → cart shows
    them with correct NLe totals → checkout total matches → place order clears
    cart and shows success.
  - Search returns correct filtered results and an empty state.
  - Every footer link resolves to a real page (no 404s).
  - No "Topnotch"/"$"/orange `#ff6b00` remnants (grep clean).
  - Logo mark renders crisply on white and black; wordmark legible in both.
- Accent contrast confirmed (5.17:1 light, 7.33:1 dark).

## Risks / assumptions

- **USD→NLe rate** is an assumption (`≈23`); prices are illustrative, tunable via
  one constant.
- **Logo background removal** assumes the source white is clean/near-pure; if
  edges show a halo, a small threshold/alpha-matte pass will be applied.
- Catalog remains Apple sample data by explicit decision; not a branding
  inconsistency to fix in this pass.
