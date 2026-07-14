import Link from "next/link";
import { notFound } from "next/navigation";
import { getProduct } from "@/lib/data";
import { updateProductAction } from "../../../actions";
import { ProductForm } from "../../_form";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const product = await getProduct(Number(id));
  if (!product) notFound();

  return (
    <div className="space-y-4">
      <Link href="/dashboard/products" className="text-sm text-[--color-muted-foreground] hover:text-[--color-foreground]">
        ← Products
      </Link>
      <h2 className="text-2xl font-semibold">Edit {product.name}</h2>
      <ProductForm product={product} action={updateProductAction} submitLabel="Save changes" />
    </div>
  );
}
