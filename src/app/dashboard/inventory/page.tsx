import { listProducts } from "@/lib/data";
import { setStockAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function InventoryPage() {
  const products = await listProducts();
  const lowStock = products.filter((p) => p.stock > 0 && p.stock <= 5).length;
  const outOfStock = products.filter((p) => p.stock === 0).length;

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center gap-4">
        <h2 className="text-lg font-medium">Inventory</h2>
        <span className="text-sm text-[--color-muted-foreground]">{lowStock} low · {outOfStock} out of stock</span>
      </div>

      <div className="rounded-xl border border-[--color-border] bg-[--color-card] overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead>
              <tr className="text-left text-[--color-muted-foreground] border-b border-[--color-border]">
                <th className="px-5 py-3">Product</th>
                <th className="px-5 py-3">Category</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Update stock</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p.id} className="border-b border-[--color-border]">
                  <td className="px-5 py-3">
                    <div className="font-medium">{p.name}</div>
                    <div className="text-[12px] text-[--color-muted-foreground]">{p.slug}</div>
                  </td>
                  <td className="px-5 py-3 capitalize">{p.category}</td>
                  <td className="px-5 py-3">
                    {p.stock === 0 ? (
                      <span className="text-[#dc2626]">Out of stock</span>
                    ) : p.stock <= 5 ? (
                      <span className="text-[#d97706]">Low ({p.stock})</span>
                    ) : (
                      <span className="text-[#16a34a]">In stock ({p.stock})</span>
                    )}
                  </td>
                  <td className="px-5 py-3">
                    <form action={setStockAction} className="flex items-center justify-end gap-2">
                      <input type="hidden" name="id" value={p.id} />
                      <input
                        name="stock"
                        type="number"
                        defaultValue={p.stock}
                        className="h-9 w-24 px-2 rounded-md bg-[--background] border border-[--color-border]"
                      />
                      <button type="submit" className="h-9 px-3 rounded-md border border-[--color-border] hover:bg-[--color-muted]">
                        Save
                      </button>
                    </form>
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
