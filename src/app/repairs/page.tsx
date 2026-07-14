import { Nav, PageHeader } from "../(ui)/components";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const services = [
  { title: "Phone & tablet repair", desc: "Screen replacements, batteries, charging ports, and water-damage diagnostics for all major brands." },
  { title: "Laptop & computer repair", desc: "Upgrades, board-level repairs, storage and memory, OS reinstalls, and performance tune-ups." },
  { title: "Diagnostics & setup", desc: "Free diagnostics, data transfer, and device setup so you leave ready to go." },
];

export default function RepairsPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Repairs" subtitle="Expert repairs for phones, tablets, and computers — handled by certified technicians." />
      <section className="container-max pb-10 grid grid-cols-1 md:grid-cols-3 gap-6">
        {services.map((s) => (
          <div key={s.title} className="elevated p-6 space-y-2">
            <span className="block h-[3px] w-10 rounded-full" style={{ background: "var(--accent)" }} />
            <h2 className="text-lg font-semibold text-[--color-foreground]">{s.title}</h2>
            <p className="text-[15px] text-[--color-muted-foreground] leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </section>
      <section className="container-max pb-16">
        <div className="elevated p-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl font-semibold text-[--color-foreground]">Need a repair?</h3>
            <p className="text-[15px] text-[--color-muted-foreground] mt-1">Book a free diagnostic and get a clear quote before any work begins.</p>
          </div>
          <Button asChild style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}>
            <Link href="/support">Book a repair</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
