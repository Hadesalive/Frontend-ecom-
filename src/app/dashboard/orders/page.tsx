import Link from "next/link";
import { listOrders } from "@/lib/data";
import { formatPrice } from "@/lib/currency";
import { TableCard } from "@/components/Dashboard/table-card";
import { StatusBadge, EmptyState } from "../_components/bits";

export const dynamic = "force-dynamic";

export default async function OrdersPage() {
  const orders = await listOrders();

  if (orders.length === 0) {
    return <EmptyState title="No orders yet" hint="Orders placed in the store will appear here." />;
  }

  const columns = [
    { key: "number", label: "Order" },
    { key: "date", label: "Date" },
    { key: "customer", label: "Customer" },
    { key: "items", label: "Items" },
    { key: "total", label: "Total" },
    { key: "status", label: "Status" },
  ];

  const data = orders.map((o) => ({
    number: (
      <Link href={`/dashboard/orders/${o.id}`} className="font-medium text-[--accent] hover:underline">
        {o.number}
      </Link>
    ),
    date: new Date(o.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
    customer: o.name,
    items: o.items.reduce((s, it) => s + it.quantity, 0),
    total: formatPrice(o.total),
    status: <StatusBadge status={o.status} />,
  }));

  return <TableCard title={`All orders (${orders.length})`} columns={columns} data={data} />;
}
