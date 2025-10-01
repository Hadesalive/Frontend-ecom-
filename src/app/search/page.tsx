import { Nav, PageHeader } from "../(ui)/components";

export default function SearchPage() {
  return (
    <div>
      <Nav />
      <PageHeader title="Search" />
      <section className="container-max pb-12 space-y-4">
        <input className="elevated h-12 w-full px-4" placeholder="Search products" />
        <div className="text-[--color-muted-foreground] text-sm">Type to explore the catalog.</div>
      </section>
    </div>
  );
}


