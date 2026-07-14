import Link from "next/link";
import { listCustomers } from "@/lib/data";
import { formatPrice } from "@/lib/currency";
import { TableCard } from "@/components/Dashboard/table-card";
import { EmptyState } from "../_components/bits";

export const dynamic = "force-dynamic";

export default async function CustomersPage() {
  const customers = await listCustomers();
  if (customers.length === 0) {
    return <EmptyState title="No customers yet" hint="Customers are created automatically when orders are placed." />;
  }

  const columns = [
    { key: "name", label: "Customer" },
    { key: "email", label: "Email" },
    { key: "orders", label: "Orders" },
    { key: "spent", label: "Total spent" },
    { key: "joined", label: "Joined" },
  ];

  const data = customers.map((c) => ({
    name: (
      <Link href={`/dashboard/customers/${c.id}`} className="font-medium text-[--accent] hover:underline">
        {c.name}
      </Link>
    ),
    email: c.email,
    orders: c.orderCount,
    spent: formatPrice(c.totalSpent),
    joined: new Date(c.createdAt).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }),
  }));

  return <TableCard title={`Customers (${customers.length})`} columns={columns} data={data} />;
}
