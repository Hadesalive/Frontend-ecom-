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
