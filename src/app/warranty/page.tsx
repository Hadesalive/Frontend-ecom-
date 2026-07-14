import { Nav, PageHeader } from "../(ui)/components";

export default function WarrantyPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Warranty" subtitle="Every device from House of Electronics is covered." />
      <section className="container-max pb-16 space-y-6 text-[15px] text-[--color-muted-foreground] leading-relaxed">
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">12-month coverage</h2>
          <p>New devices include a 12-month warranty against manufacturing defects. If a covered fault appears, we will repair or replace the device free of charge.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">What’s covered</h2>
          <p>Hardware faults under normal use are covered. Accidental damage, liquid damage, and unauthorised repairs are not, but our Repairs team can still help at a fair price.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Making a claim</h2>
          <p>Contact our Support Center with your order details. Keep your receipt or order confirmation — it’s all you need to make a claim.</p>
        </div>
      </section>
    </div>
  );
}
