import { listDiscounts } from "@/lib/data";
import { createDiscountAction, toggleDiscountAction, deleteDiscountAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function DiscountsPage() {
  const discounts = await listDiscounts();

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-[--color-border] bg-[--color-card] p-5">
        <h2 className="font-medium mb-4">Create discount</h2>
        <form action={createDiscountAction} className="flex flex-wrap items-end gap-3">
          <label className="block">
            <span className="block text-sm font-medium mb-1">Code</span>
            <input name="code" required placeholder="WELCOME10" className="h-10 px-3 rounded-md bg-[--background] border border-[--color-border] uppercase" />
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Type</span>
            <select name="type" className="h-10 px-3 rounded-md bg-[--background] border border-[--color-border]">
              <option value="percent">Percent %</option>
              <option value="fixed">Fixed (USD base)</option>
            </select>
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">Value</span>
            <input name="value" type="number" step="0.01" required className="h-10 w-28 px-3 rounded-md bg-[--background] border border-[--color-border]" />
          </label>
          <button type="submit" className="h-10 px-5 rounded-md font-semibold" style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}>
            Add
          </button>
        </form>
      </div>

      <div className="rounded-xl border border-[--color-border] bg-[--color-card] overflow-hidden">
        <div className="p-5 border-b border-[--color-border] font-medium">Discount codes ({discounts.length})</div>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-[--color-muted-foreground] border-b border-[--color-border]">
              <th className="px-5 py-3">Code</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3">Value</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {discounts.map((d) => (
              <tr key={d.id} className="border-b border-[--color-border]">
                <td className="px-5 py-3 font-mono font-medium">{d.code}</td>
                <td className="px-5 py-3 capitalize">{d.type}</td>
                <td className="px-5 py-3">{d.type === "percent" ? `${d.value}%` : d.value}</td>
                <td className="px-5 py-3">
                  <span style={{ color: d.active ? "#16a34a" : "#6b7280" }}>{d.active ? "Active" : "Inactive"}</span>
                </td>
                <td className="px-5 py-3">
                  <div className="flex items-center justify-end gap-2">
                    <form action={toggleDiscountAction}>
                      <input type="hidden" name="id" value={d.id} />
                      <button type="submit" className="h-8 px-3 rounded-md border border-[--color-border] hover:bg-[--color-muted]">
                        {d.active ? "Disable" : "Enable"}
                      </button>
                    </form>
                    <form action={deleteDiscountAction}>
                      <input type="hidden" name="id" value={d.id} />
                      <button type="submit" className="h-8 px-3 rounded-md border border-[--color-border] text-[#dc2626] hover:bg-[color-mix(in_oklab,#dc2626_10%,var(--background))]">
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
  );
}
