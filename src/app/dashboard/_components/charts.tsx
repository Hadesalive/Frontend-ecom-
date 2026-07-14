"use client";

import { useEffect, useState } from "react";
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
  type ChartOptions,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, ArcElement, Tooltip, Legend);

function useAccent() {
  const [accent, setAccent] = useState("#2f6fb5");
  useEffect(() => {
    const v = getComputedStyle(document.documentElement).getPropertyValue("--accent").trim();
    if (v) setAccent(v);
  }, []);
  return accent;
}

const lineOptions: ChartOptions<"line"> = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { x: { grid: { display: false } }, y: { grid: { color: "rgba(127,127,127,0.2)" } } },
};
const barOptions: ChartOptions<"bar"> = {
  responsive: true,
  plugins: { legend: { display: false } },
  scales: { x: { grid: { display: false } }, y: { grid: { color: "rgba(127,127,127,0.2)" } } },
};

export function SalesLineChart({ labels, data }: { labels: string[]; data: number[] }) {
  const accent = useAccent();
  return (
    <Line
      data={{ labels, datasets: [{ label: "Sales", data, borderColor: accent, backgroundColor: "transparent", tension: 0.35 }] }}
      options={lineOptions}
    />
  );
}

export function StatusDonutChart({ labels, data }: { labels: string[]; data: number[] }) {
  const accent = useAccent();
  return (
    <Doughnut
      data={{
        labels,
        datasets: [
          {
            data,
            backgroundColor: [accent, "rgba(127,127,127,0.5)", "rgba(127,127,127,0.35)", "rgba(127,127,127,0.22)", "rgba(127,127,127,0.12)"],
            borderWidth: 0,
          },
        ],
      }}
      options={{ plugins: { legend: { display: false } }, cutout: "70%" }}
    />
  );
}

export function CategoryBarChart({ labels, data }: { labels: string[]; data: number[] }) {
  const accent = useAccent();
  return (
    <Bar data={{ labels, datasets: [{ label: "Units", data, backgroundColor: accent, borderRadius: 6 }] }} options={barOptions} />
  );
}
