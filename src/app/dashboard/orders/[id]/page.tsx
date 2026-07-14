import Link from "next/link";
import { notFound } from "next/navigation";
import { getOrder, ORDER_STATUSES } from "@/lib/data";
import { formatPrice } from "@/lib/currency";
import { updateOrderStatusAction } from "../../actions";
import { StatusBadge } from "../../_components/bits";

export const dynamic = "force-dynamic";

export default async function OrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await getOrder(Number(id));
  if (!order) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Link href="/dashboard/orders" className="text-sm text-[--color-muted-foreground] hover:text-[--color-foreground]">
            ← All orders
          </Link>
          <h2 className="text-2xl font-semibold mt-1 flex items-center gap-3">
            {order.number} <StatusBadge status={order.status} />
          </h2>
          <p className="text-sm text-[--color-muted-foreground] mt-1">
            {new Date(order.createdAt).toLocaleString("en-GB")}
          </p>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1fr_320px] gap-6">
        {/* Items */}
        <div className="rounded-xl border border-[--color-border] bg-[--color-card] overflow-hidden">
          <div className="p-5 border-b border-[--color-border] font-medium">Items</div>
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-[--color-muted-foreground] border-b border-[--color-border]">
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Qty</th>
                <th className="px-5 py-3 text-right">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.items.map((it) => (
                <tr key={it.id} className="border-b border-[--color-border]">
                  <td className="px-5 py-3">
                    {it.productSlug ? (
                      <Link href={`/products/${it.productSlug}`} className="hover:text-[--accent]">{it.name}</Link>
                    ) : (
                      it.name
                    )}
                  </td>
                  <td className="px-5 py-3">{formatPrice(it.price)}</td>
                  <td className="px-5 py-3">{it.quantity}</td>
                  <td className="px-5 py-3 text-right">{formatPrice(it.price * it.quantity)}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="p-5 space-y-2 text-sm">
            <div className="flex justify-between"><span className="text-[--color-muted-foreground]">Subtotal</span><span>{formatPrice(order.subtotal)}</span></div>
            <div className="flex justify-between"><span className="text-[--color-muted-foreground]">Shipping</span><span>{order.shipping === 0 ? "Free" : formatPrice(order.shipping)}</span></div>
            <div className="flex justify-between"><span className="text-[--color-muted-foreground]">Tax</span><span>{formatPrice(order.tax)}</span></div>
            <div className="flex justify-between font-semibold pt-2 border-t border-[--color-border]">
              <span>Total</span><span style={{ color: "var(--accent)" }}>{formatPrice(order.total)}</span>
            </div>
          </div>
        </div>

        {/* Customer + status */}
        <div className="space-y-6">
          <div className="rounded-xl border border-[--color-border] bg-[--color-card] p-5">
            <h3 className="font-medium mb-3">Customer</h3>
            <p className="text-sm">{order.name}</p>
            <p className="text-sm text-[--color-muted-foreground]">{order.email}</p>
            {order.address ? (
              <p className="text-sm text-[--color-muted-foreground] mt-2">{order.address}{order.city ? `, ${order.city}` : ""}</p>
            ) : null}
            <Link href={`/dashboard/customers/${order.customerId}`} className="text-sm text-[--accent] hover:underline mt-3 inline-block">
              View customer →
            </Link>
          </div>

          <div className="rounded-xl border border-[--color-border] bg-[--color-card] p-5">
            <h3 className="font-medium mb-3">Update status</h3>
            <form action={updateOrderStatusAction} className="flex gap-2">
              <input type="hidden" name="id" value={order.id} />
              <select
                name="status"
                defaultValue={order.status}
                className="flex-1 h-10 px-3 rounded-md bg-[--background] border border-[--color-border]"
              >
                {ORDER_STATUSES.map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
              <button type="submit" className="h-10 px-4 rounded-md font-medium" style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}>
                Save
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
