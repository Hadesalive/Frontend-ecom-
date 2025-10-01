import { Nav, PageHeader } from "../(ui)/components";

export default function TermsPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Terms of Service" />
      <section className="container-max pb-12 elevated p-6 text-[15px] text-[--color-muted-foreground]">
        <p>Terms placeholder content.</p>
      </section>
    </div>
  );
}


