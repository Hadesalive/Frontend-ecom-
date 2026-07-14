import Link from "next/link";
import { getDashboardStats } from "@/lib/data";
import { formatPrice } from "@/lib/currency";
import { KPICard } from "@/components/Dashboard/kpi-card";
import { ChartCard } from "@/components/Dashboard/chart-card";
import { ListCard } from "@/components/Dashboard/list-card";
import { TableCard } from "@/components/Dashboard/table-card";
import { SalesLineChart, StatusDonutChart, CategoryBarChart } from "./_components/charts";
import { StatusBadge } from "./_components/bits";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  mac: "Mac",
  iphone: "iPhone",
  ipad: "iPad",
  watch: "Watch",
  audio: "Audio",
  accessories: "Accessories",
  other: "Other",
};

export default async function DashboardOverviewPage() {
  const stats = await getDashboardStats();

  const statusEntries = Object.entries(stats.statusMix);
  const catEntries = Object.entries(stats.catUnits);

  const topCustomers = stats.topCustomers.map((c, i) => ({
    id: String(i),
    label: c.name,
    value: formatPrice(c.total),
  }));

  const tableColumns = [
    { key: "number", label: "Order" },
    { key: "customer", label: "Customer" },
    { key: "total", label: "Total" },
    { key: "status", label: "Status" },
  ];

  const tableData = stats.recentOrders.map((o) => ({
    number: (
      <Link href={`/dashboard/orders/${o.id}`} className="font-medium text-[--accent] hover:underline">
        {o.number}
      </Link>
    ),
    customer: o.name,
    total: formatPrice(o.total),
    status: <StatusBadge status={o.status} />,
  }));

  return (
    <section className="grid grid-cols-1 md:grid-cols-6 gap-4">
      <KPICard title="Revenue" value={formatPrice(stats.revenue)} className="md:col-span-3" />
      <KPICard title="Orders" value={stats.ordersCount} className="md:col-span-1" />
      <KPICard title="Customers" value={stats.customersCount} className="md:col-span-1" />
      <KPICard title="Products" value={stats.productsCount} className="md:col-span-1" />

      <ChartCard title="Sales (last 7 days)" className="md:col-span-4">
        <SalesLineChart labels={stats.weeklySales.map((d) => d.label)} data={stats.weeklySales.map((d) => d.total)} />
      </ChartCard>

      <ChartCard title="Order status mix" className="md:col-span-2">
        {statusEntries.length ? (
          <StatusDonutChart labels={statusEntries.map(([k]) => k)} data={statusEntries.map(([, v]) => v)} />
        ) : (
          <p className="text-sm text-[--color-muted-foreground]">No orders yet.</p>
        )}
      </ChartCard>

      <ListCard title="Top customers" items={topCustomers} className="md:col-span-3" />

      <ChartCard title="Units sold by category" className="md:col-span-3">
        {catEntries.length ? (
          <CategoryBarChart
            labels={catEntries.map(([k]) => CATEGORY_LABELS[k] ?? k)}
            data={catEntries.map(([, v]) => v)}
          />
        ) : (
          <p className="text-sm text-[--color-muted-foreground]">No sales yet.</p>
        )}
      </ChartCard>

      <TableCard title="Recent orders" columns={tableColumns} data={tableData} className="md:col-span-6" />
    </section>
  );
}
