import { Nav, PageHeader } from "../../(ui)/components";
import Link from "next/link";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  const title = params.slug.replaceAll("-", " ");
  const items = Array.from({ length: 6 }).map((_, i) => `${title} ${i + 1}`);
  return (
    <div>
      <Nav />
      <PageHeader title={title.charAt(0).toUpperCase() + title.slice(1)} />
      <section className="container-max pb-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {items.map((t, i) => (
          <Link key={i} href={`/products/${t.toLowerCase().replaceAll(' ', '-')}`} className="elevated p-6 block">
            <div className="h-40 rounded-[10px] bg-[--color-muted] mb-3" />
            <div className="font-medium">{t}</div>
          </Link>
        ))}
      </section>
    </div>
  );
}


