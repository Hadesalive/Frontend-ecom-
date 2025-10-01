import { Nav, PageHeader } from "../(ui)/components";

export default function ReturnsPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Returns & Refunds" />
      <section className="container-max pb-12 elevated p-6 text-[15px] text-[--color-muted-foreground]">
        <p>Returns policy placeholder.</p>
      </section>
    </div>
  );
}


