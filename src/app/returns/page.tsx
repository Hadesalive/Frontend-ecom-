import { Nav, PageHeader } from "../(ui)/components";

export default function ReturnsPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Returns & Exchanges" subtitle="Straightforward returns so you can buy with confidence." />
      <section className="container-max pb-16 space-y-6 text-[15px] text-[--color-muted-foreground] leading-relaxed">
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">14-day returns</h2>
          <p>Unopened items in their original packaging can be returned within 14 days of delivery for a refund or exchange. Bring your receipt or order confirmation.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">Faulty items</h2>
          <p>If a device arrives faulty or develops a covered fault, we will repair, replace, or refund it under the terms on our Warranty page at no cost to you.</p>
        </div>
        <div className="elevated p-6 space-y-3">
          <h2 className="text-lg font-semibold text-[--color-foreground]">How to start a return</h2>
          <p>Contact our Support Center with your order details and we will arrange collection or store drop-off and guide you through the rest.</p>
        </div>
      </section>
    </div>
  );
}
