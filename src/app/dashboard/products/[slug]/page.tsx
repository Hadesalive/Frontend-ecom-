import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data";
import { formatPrice } from "@/lib/currency";
import { deleteProductAction, setStockAction } from "../../actions";
import { LinkButton } from "../../_components/bits";

export const dynamic = "force-dynamic";

export default async function ProductManagePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  const stockLabel =
    product.stock === 0 ? "Out of stock" : product.stock <= 5 ? `Low (${product.stock})` : `In stock (${product.stock})`;
  const stockColor = product.stock === 0 ? "#dc2626" : product.stock <= 5 ? "#d97706" : "#16a34a";

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <Link href="/dashboard/products" className="text-sm text-[--color-muted-foreground] hover:text-[--color-foreground]">
            ← Products
          </Link>
          <h2 className="text-2xl font-semibold mt-1">{product.name}</h2>
          <p className="text-sm text-[--color-muted-foreground]">{product.slug}</p>
        </div>
        <div className="flex items-center gap-2">
          <LinkButton href={`/dashboard/products/${product.slug}/edit`}>Edit</LinkButton>
          <LinkButton href={`/products/${product.slug}`} variant="ghost">View in store ↗</LinkButton>
          <form action={deleteProductAction}>
            <input type="hidden" name="id" value={product.id} />
            <button
              type="submit"
              className="h-9 px-4 rounded-md text-sm font-medium border border-[--color-border] text-[#dc2626] hover:bg-[color-mix(in_oklab,#dc2626_10%,var(--background))]"
            >
              Delete
            </button>
          </form>
        </div>
      </div>

      <div className="grid lg:grid-cols-[320px_1fr] gap-6">
        {/* Media + quick facts */}
        <div className="space-y-4">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden bg-[--color-muted] border border-[--color-border]">
            <Image src={product.image} alt={product.name} fill className="object-cover" sizes="320px" />
          </div>
          {product.images.length > 1 ? (
            <div className="grid grid-cols-4 gap-2">
              {product.images.map((img, i) => (
                <div key={i} className="relative aspect-square rounded-md overflow-hidden bg-[--color-muted] border border-[--color-border]">
                  <Image src={img} alt={`${product.name} ${i + 1}`} fill className="object-cover" sizes="80px" />
                </div>
              ))}
            </div>
          ) : null}

          <div className="rounded-xl border border-[--color-border] bg-[--color-card] p-5 space-y-2 text-sm">
            <Row label="Price" value={formatPrice(product.price)} accent />
            {product.originalPrice ? <Row label="Original" value={<span className="line-through">{formatPrice(product.originalPrice)}</span>} /> : null}
            <Row label="Category" value={<span className="capitalize">{product.category}</span>} />
            {product.badge ? <Row label="Badge" value={product.badge} /> : null}
            <Row label="Rating" value={`${product.rating} (${product.reviews} reviews)`} />
            <Row label="Stock" value={<span style={{ color: stockColor }}>{stockLabel}</span>} />
          </div>

          {/* Quick stock update */}
          <div className="rounded-xl border border-[--color-border] bg-[--color-card] p-5">
            <h3 className="font-medium mb-3 text-sm">Adjust stock</h3>
            <form action={setStockAction} className="flex items-center gap-2">
              <input type="hidden" name="id" value={product.id} />
              <input name="stock" type="number" defaultValue={product.stock} className="h-9 w-24 px-2 rounded-md bg-[--background] border border-[--color-border]" />
              <button type="submit" className="h-9 px-3 rounded-md border border-[--color-border] hover:bg-[--color-muted] text-sm">Save</button>
            </form>
          </div>
        </div>

        {/* Details */}
        <div className="space-y-6">
          <div className="rounded-xl border border-[--color-border] bg-[--color-card] p-5">
            <h3 className="font-medium mb-2">Description</h3>
            <p className="text-sm text-[--color-muted-foreground] leading-relaxed">
              {product.description || "No description."}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            <div className="rounded-xl border border-[--color-border] bg-[--color-card] p-5">
              <h3 className="font-medium mb-3">Features</h3>
              {product.features.length ? (
                <ul className="space-y-2 text-sm text-[--color-muted-foreground]">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full shrink-0" style={{ background: "var(--accent)" }} />
                      {f}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-[--color-muted-foreground]">None listed.</p>
              )}
            </div>
            <div className="rounded-xl border border-[--color-border] bg-[--color-card] p-5">
              <h3 className="font-medium mb-3">Specifications</h3>
              {Object.keys(product.specifications).length ? (
                <dl className="text-sm space-y-2">
                  {Object.entries(product.specifications).map(([k, v]) => (
                    <div key={k} className="flex justify-between gap-3 border-b border-[--color-border] pb-2 last:border-0 last:pb-0">
                      <dt className="text-[--color-muted-foreground]">{k}</dt>
                      <dd className="text-right">{v}</dd>
                    </div>
                  ))}
                </dl>
              ) : (
                <p className="text-sm text-[--color-muted-foreground]">None listed.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function Row({ label, value, accent }: { label: string; value: React.ReactNode; accent?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[--color-muted-foreground]">{label}</span>
      <span className="font-medium" style={accent ? { color: "var(--accent)" } : undefined}>
        {value}
      </span>
    </div>
  );
}
