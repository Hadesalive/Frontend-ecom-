import { getDashboardStats } from "@/lib/data";
import { formatPrice } from "@/lib/currency";
import { KPICard } from "@/components/Dashboard/kpi-card";
import { ChartCard } from "@/components/Dashboard/chart-card";
import { ListCard } from "@/components/Dashboard/list-card";
import { SalesLineChart, StatusDonutChart, CategoryBarChart } from "../_components/charts";

export const dynamic = "force-dynamic";

const CATEGORY_LABELS: Record<string, string> = {
  mac: "Mac", iphone: "iPhone", ipad: "iPad", watch: "Watch", audio: "Audio", accessories: "Accessories", other: "Other",
};

export default async function ReportsPage() {
  const stats = await getDashboardStats();
  const statusEntries = Object.entries(stats.statusMix);
  const catEntries = Object.entries(stats.catUnits);
  const avgOrder = stats.ordersCount ? stats.revenue / stats.ordersCount : 0;

  return (
    <section className="grid grid-cols-1 md:grid-cols-6 gap-4">
      <KPICard title="Revenue (paid + fulfilled)" value={formatPrice(stats.revenue)} className="md:col-span-2" />
      <KPICard title="Total orders" value={stats.ordersCount} className="md:col-span-2" />
      <KPICard title="Avg. order value" value={formatPrice(avgOrder)} className="md:col-span-2" />

      <ChartCard title="Revenue trend (last 7 days)" className="md:col-span-4">
        <SalesLineChart labels={stats.weeklySales.map((d) => d.label)} data={stats.weeklySales.map((d) => d.total)} />
      </ChartCard>
      <ChartCard title="Order status mix" className="md:col-span-2">
        {statusEntries.length ? (
          <StatusDonutChart labels={statusEntries.map(([k]) => k)} data={statusEntries.map(([, v]) => v)} />
        ) : (
          <p className="text-sm text-[--color-muted-foreground]">No data.</p>
        )}
      </ChartCard>

      <ChartCard title="Units sold by category" className="md:col-span-3">
        {catEntries.length ? (
          <CategoryBarChart labels={catEntries.map(([k]) => CATEGORY_LABELS[k] ?? k)} data={catEntries.map(([, v]) => v)} />
        ) : (
          <p className="text-sm text-[--color-muted-foreground]">No data.</p>
        )}
      </ChartCard>
      <ListCard
        title="Top customers by spend"
        className="md:col-span-3"
        items={stats.topCustomers.map((c, i) => ({ id: String(i), label: c.name, value: formatPrice(c.total) }))}
      />
    </section>
  );
}
