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
