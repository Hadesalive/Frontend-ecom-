import Link from "next/link";
import Image from "next/image";
import { listProducts } from "@/lib/data";
import { formatPrice } from "@/lib/currency";
import { deleteProductAction } from "../actions";
import { LinkButton } from "../_components/bits";

export const dynamic = "force-dynamic";

export default async function ProductsPage() {
  const products = await listProducts();

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium">Products ({products.length})</h2>
        <LinkButton href="/dashboard/products/new">+ New product</LinkButton>
      </div>

      <div className="rounded-xl border border-[--color-border] bg-[--color-card] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-[--color-muted-foreground] border-b border-[--color-border]">
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Price</th>
                <th className="px-5 py-3">Stock</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-[--color-border]">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-10 w-10 rounded-md overflow-hidden bg-[--color-muted] shrink-0">
                        <Image src={p.image} alt={p.name} fill className="object-cover" sizes="40px" />
                      </div>
                      <div>
                        <div className="font-medium">{p.name}</div>
                        <div className="text-[12px] text-[--color-muted-foreground]">{p.slug}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3 capitalize">{p.category}</td>
                  <td className="px-5 py-3">{formatPrice(p.price)}</td>
                  <td className="px-5 py-3">
                    {p.stock > 0 ? (
                      <span>{p.stock}</span>
                    ) : (
                      <span className="text-[#dc2626]">Out</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/dashboard/products/${p.id}/edit`} className="h-8 px-3 inline-flex items-center rounded-md border border-[--color-border] hover:bg-[--color-muted]">
                        Edit
                      </Link>
                      <form action={deleteProductAction}>
                        <input type="hidden" name="id" value={p.id} />
                        <button type="submit" className="h-8 px-3 inline-flex items-center rounded-md border border-[--color-border] text-[#dc2626] hover:bg-[color-mix(in_oklab,#dc2626_10%,var(--background))]">
                          Delete
                        </button>
                      </form>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
