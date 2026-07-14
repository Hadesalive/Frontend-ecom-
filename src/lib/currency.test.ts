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
