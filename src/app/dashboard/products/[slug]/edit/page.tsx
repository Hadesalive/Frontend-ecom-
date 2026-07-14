import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug } from "@/lib/data";
import { updateProductAction } from "../../../actions";
import { ProductForm } from "../../_form";

export const dynamic = "force-dynamic";

export default async function EditProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) notFound();

  return (
    <div className="space-y-4">
      <Link href={`/dashboard/products/${product.slug}`} className="text-sm text-[--color-muted-foreground] hover:text-[--color-foreground]">
        ← {product.name}
      </Link>
      <h2 className="text-2xl font-semibold">Edit {product.name}</h2>
      <ProductForm product={product} action={updateProductAction} submitLabel="Save changes" />
    </div>
  );
}
