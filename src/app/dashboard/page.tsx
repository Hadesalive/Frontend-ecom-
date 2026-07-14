"use client";

import { useState } from "react";
import { DashboardSidebar } from "../(ui)/dashboard-sidebar";
import { Line, Doughnut, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";
import type { ChartOptions } from "chart.js";
import { DashboardLayout } from "@/components/Dashboard/dashboard-layout";
import { DashboardHeader } from "@/components/Dashboard/dashboard-header";
import { MobileDrawer } from "@/components/Dashboard/mobile-drawer";
import { KPICard } from "@/components/Dashboard/kpi-card";
import { ChartCard } from "@/components/Dashboard/chart-card";
import { ListCard } from "@/components/Dashboard/list-card";
import { TableCard } from "@/components/Dashboard/table-card";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

export default function DashboardPage() {
  const [active, setActive] = useState("Overview");
  const accent = (typeof window !== 'undefined' ? getComputedStyle(document.documentElement).getPropertyValue('--accent') : '') || '#2f6fb5';
  const lineOptions: ChartOptions<'line'> = { responsive: true, plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(127,127,127,0.2)' } } } };
  const doughnutOptions: ChartOptions<'doughnut'> = { plugins: { legend: { display: false } } };
  const barOptions: ChartOptions<'bar'> = { plugins: { legend: { display: false } }, scales: { x: { grid: { display: false } }, y: { grid: { color: 'rgba(127,127,127,0.2)' } } } };

  // Mock data (can be replaced with API later)
  const weeklySales = [1200, 1900, 700, 1500, 2200, 1800, 2400];
  const orderStatus = { completed: 52, pending: 35, cancelled: 13 };
  const categorySales = { mac: 14, iphone: 19, ipad: 11, watch: 7, audio: 9, accessories: 15 };
  const recentOrders = Array.from({ length: 6 }).map((_, i) => ({
    id: `#TN${i + 1}23`,
    customer: ["Jane Appleseed", "Mike Chen", "Aisha Kamara", "Fatmata Sesay", "John Koroma", "Mary Conteh"][i % 6],
    total: [199, 349, 129, 89, 429, 249][i % 6],
    status: ["Paid", "Paid", "Pending", "Paid", "Refunded", "Paid"][i % 6],
  }));
  const revenue = weeklySales.reduce((a, b) => a + b, 0);
  const ordersCount = recentOrders.length + 24;
  const customersCount = 128;

  const handleMenuClick = () => {
    const el = document.getElementById('dashboard-drawer') as HTMLDialogElement | null;
    if (el?.showModal) el.showModal();
  };

  const handleSidebarSelect = (name: string) => {
    setActive(name);
    (document.getElementById('dashboard-drawer') as HTMLDialogElement)?.close();
  };

  const headerActions = (
    <>
      <button className="btn btn-ghost">Export</button>
      <button className="btn btn-accent">New</button>
    </>
  );

  const topCustomers = recentOrders.slice(0, 5).map((order) => ({
    id: order.id,
    label: order.customer,
    value: `$${order.total.toFixed(2)}`
  }));

  const tableColumns = [
    { key: 'id', label: 'Order' },
    { key: 'customer', label: 'Customer' },
    { key: 'total', label: 'Total' },
    { key: 'status', label: 'Status' }
  ];

  const tableData = recentOrders.map((order) => ({
    id: order.id,
    customer: order.customer,
    total: `$${order.total.toFixed(2)}`,
    status: <span style={{ color: 'var(--accent)' }}>{order.status}</span>
  }));

  return (
    <DashboardLayout
      sidebar={<DashboardSidebar active={active} onSelect={setActive} />}
      header={
        <DashboardHeader
          title={active}
          onMenuClick={handleMenuClick}
          actions={headerActions}
        />
      }
      mobileDrawer={
        <MobileDrawer id="dashboard-drawer" title="Navigation">
          <DashboardSidebar 
            active={active} 
            onSelect={handleSidebarSelect} 
            drawer 
          />
        </MobileDrawer>
      }
    >
      {/* Dashboard grid inspired by reference layout */}
      <section className="grid grid-cols-1 md:grid-cols-6 gap-4">
        {/* Small KPI cards */}
        <KPICard 
          title="Revenue" 
          value={`$${(revenue/100).toFixed(2)}`} 
          className="md:col-span-2" 
        />
        <KPICard 
          title="Orders" 
          value={ordersCount} 
          className="md:col-span-2" 
        />
        <KPICard 
          title="Customers" 
          value={customersCount} 
          className="md:col-span-2" 
        />

        {/* Large line chart */}
        <ChartCard 
          title="Sales (last 7 days)" 
          className="md:col-span-4"
        >
          <Line
            data={{
              labels: ["Mon","Tue","Wed","Thu","Fri","Sat","Sun"],
              datasets: [{
                label: "Sales",
                data: weeklySales.map(v=>v/100),
                borderColor: accent,
                backgroundColor: 'transparent',
                tension: 0.35,
              }]
            }}
            options={lineOptions}
          />
        </ChartCard>

        {/* Donut KPI */}
        <ChartCard 
          title="Order status mix" 
          className="md:col-span-2"
        >
          <Doughnut
            data={{
              labels: ['Completed','Pending','Cancelled'],
              datasets: [{
                data: [orderStatus.completed, orderStatus.pending, orderStatus.cancelled],
                backgroundColor: [
                  accent,
                  'rgba(127,127,127,0.35)',
                  'rgba(127,127,127,0.2)'
                ],
                borderWidth: 0,
              }]
            }}
            options={{ ...doughnutOptions, cutout: '70%' }}
          />
        </ChartCard>

        {/* List & Small bar chart */}
        <ListCard 
          title="Top customers" 
          items={topCustomers}
          className="md:col-span-3"
        />
        <ChartCard 
          title="Sales by category" 
          className="md:col-span-3"
        >
          <Bar
            data={{
              labels: ['Mac','iPhone','iPad','Watch','Audio','Accessories'],
              datasets: [{
                label: 'Category Sales',
                data: [categorySales.mac, categorySales.iphone, categorySales.ipad, categorySales.watch, categorySales.audio, categorySales.accessories],
                backgroundColor: accent,
                borderRadius: 6,
              }]
            }}
            options={barOptions}
          />
        </ChartCard>

        {/* Recent Orders table full width below */}
        <TableCard 
          title="Recent Orders" 
          columns={tableColumns}
          data={tableData}
          className="md:col-span-6"
        />
      </section>
    </DashboardLayout>
  );
}


