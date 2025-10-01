import { Nav, PageHeader } from "../(ui)/components";

export default function ShippingPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Shipping Policy" />
      <section className="container-max pb-12 elevated p-6 text-[15px] text-[--color-muted-foreground]">
        <p>Shipping details placeholder.</p>
      </section>
    </div>
  );
}


