import { Nav, PageHeader } from "../(ui)/components";

export default function ShippingPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Shipping Information" subtitle="Delivery options, timing, and coverage across Sierra Leone." />
      <section className="container-max pb-16 space-y-6 text-[15px] text-[--color-muted-foreground] leading-relaxed">
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Delivery within Freetown</h2>
          <p>Orders placed before 2:00 PM are typically delivered the same or next business day within Freetown. You will receive a call or message to confirm your delivery window.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Nationwide delivery</h2>
          <p>We ship to major towns across Sierra Leone via trusted courier partners, usually within 2–5 business days. Delivery fees are calculated at checkout based on your location.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Free shipping</h2>
          <p>Qualifying orders ship free — the threshold is shown in your cart. Store pickup at our Freetown location is always free.</p>
        </div>
      </section>
    </div>
  );
}
