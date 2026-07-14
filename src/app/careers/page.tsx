import { Nav, PageHeader } from "../(ui)/components";

const roles = [
  { title: "Retail Sales Associate", location: "Freetown", type: "Full-time" },
  { title: "Repair Technician", location: "Freetown", type: "Full-time" },
  { title: "Delivery Rider", location: "Freetown", type: "Full-time" },
];

export default function CareersPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Careers" subtitle="Help us bring technology home to Sierra Leone." />
      <section className="container-max pb-16 space-y-4">
        {roles.map((r) => (
          <div key={r.title} className="elevated p-6 flex items-center justify-between gap-4">
            <div>
              <h2 className="text-lg font-semibold text-[--color-foreground]">{r.title}</h2>
              <p className="text-[14px] text-[--color-muted-foreground] mt-1">{r.location} · {r.type}</p>
            </div>
            <span className="text-[13px] font-medium" style={{ color: "var(--accent)" }}>Apply via Support</span>
          </div>
        ))}
        <p className="text-[15px] text-[--color-muted-foreground] pt-2">
          Don’t see your role? Reach out through our Support Center and tell us how you’d like to contribute.
        </p>
      </section>
    </div>
  );
}
