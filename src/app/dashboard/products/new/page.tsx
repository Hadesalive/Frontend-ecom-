import Link from "next/link";
import { createProductAction } from "../../actions";
import { ProductForm } from "../_form";

export default function NewProductPage() {
  return (
    <div className="space-y-4">
      <Link href="/dashboard/products" className="text-sm text-[--color-muted-foreground] hover:text-[--color-foreground]">
        ← Products
      </Link>
      <h2 className="text-2xl font-semibold">New product</h2>
      <ProductForm action={createProductAction} submitLabel="Create product" />
    </div>
  );
}
