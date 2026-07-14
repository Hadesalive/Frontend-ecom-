"use server";

import { createOrderFromCheckout, type CheckoutInput } from "@/lib/data";

export async function placeOrderAction(input: CheckoutInput): Promise<{ ok: true; number: string } | { ok: false; error: string }> {
  try {
    if (!input.name || !input.email || input.items.length === 0) {
      return { ok: false, error: "Missing order details." };
    }
    const { number } = await createOrderFromCheckout(input);
    return { ok: true, number };
  } catch (e) {
    console.error("placeOrderAction failed", e);
    return { ok: false, error: "Could not place order. Please try again." };
  }
}
