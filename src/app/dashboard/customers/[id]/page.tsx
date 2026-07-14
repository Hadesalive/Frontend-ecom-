import Link from "next/link";
import { notFound } from "next/navigation";
import { getCustomer } from "@/lib/data";
import { formatPrice } from "@/lib/currency";
import { KPICard } from "@/components/Dashboard/kpi-card";
import { StatusBadge } from "../../_components/bits";

export const dynamic = "force-dynamic";

export default async function CustomerDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const customer = await getCustomer(Number(id));
  if (!customer) notFound();

  return (
    <div className="space-y-6">
      <div>
        <Link href="/dashboard/customers" className="text-sm text-[--color-muted-foreground] hover:text-[--color-foreground]">
          ← Customers
        </Link>
        <h2 className="text-2xl font-semibold mt-1">{customer.name}</h2>
        <p className="text-sm text-[--color-muted-foreground]">{customer.email}{customer.phone ? ` · ${customer.phone}` : ""}</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <KPICard title="Orders" value={customer.orders.length} />
        <KPICard title="Total spent" value={formatPrice(customer.totalSpent)} />
        <KPICard title="Customer since" value={new Date(customer.createdAt).toLocaleDateString("en-GB", { month: "short", year: "numeric" })} />
      </div>

      <div className="rounded-xl border border-[--color-border] bg-[--color-card] overflow-hidden">
        <div className="p-5 border-b border-[--color-border] font-medium">Order history</div>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-[--color-muted-foreground] border-b border-[--color-border]">
              <th className="px-5 py-3">Order</th>
              <th className="px-5 py-3">Date</th>
              <th className="px-5 py-3">Total</th>
              <th className="px-5 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {customer.orders.map((o) => (
              <tr key={o.id} className="border-b border-[--color-border]">
                <td className="px-5 py-3">
                  <Link href={`/dashboard/orders/${o.id}`} className="text-[--accent] hover:underline font-medium">{o.number}</Link>
                </td>
                <td className="px-5 py-3">{new Date(o.createdAt).toLocaleDateString("en-GB")}</td>
                <td className="px-5 py-3">{formatPrice(o.total)}</td>
                <td className="px-5 py-3"><StatusBadge status={o.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
