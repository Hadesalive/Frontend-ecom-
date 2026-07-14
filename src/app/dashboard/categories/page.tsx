import Link from "next/link";
import { listCategories } from "@/lib/data";
import { EmptyState } from "../_components/bits";

export const dynamic = "force-dynamic";

const LABELS: Record<string, string> = {
  mac: "Mac", iphone: "iPhone", ipad: "iPad", watch: "Watch", audio: "Audio", accessories: "Accessories",
};

export default async function CategoriesPage() {
  const categories = await listCategories();
  if (categories.length === 0) {
    return <EmptyState title="No categories" hint="Add products to see categories here." />;
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Categories ({categories.length})</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {categories.map((c) => (
          <div key={c.category} className="rounded-xl border border-[--color-border] bg-[--color-card] p-5">
            <div className="h-2 w-16 rounded-full mb-3" style={{ background: "var(--accent)" }} />
            <div className="text-lg font-semibold capitalize">{LABELS[c.category] ?? c.category}</div>
            <div className="text-sm text-[--color-muted-foreground] mt-1">{c.count} product{c.count === 1 ? "" : "s"}</div>
            <div className="flex gap-3 mt-4 text-sm">
              <Link href={`/categories/${c.category}`} className="text-[--accent] hover:underline">View in store →</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
