import { ProductRow } from "@/lib/data";

function Field({ label, children, hint }: { label: string; children: React.ReactNode; hint?: string }) {
  return (
    <label className="block">
      <span className="block text-sm font-medium mb-1">{label}</span>
      {children}
      {hint ? <span className="block text-[12px] text-[--color-muted-foreground] mt-1">{hint}</span> : null}
    </label>
  );
}

const inputCls =
  "w-full h-10 px-3 rounded-md bg-[--background] border border-[--color-border] focus:outline-none focus:border-[--accent]";
const areaCls =
  "w-full px-3 py-2 rounded-md bg-[--background] border border-[--color-border] focus:outline-none focus:border-[--accent]";

export function ProductForm({
  product,
  action,
  submitLabel,
}: {
  product?: ProductRow;
  action: (fd: FormData) => void | Promise<void>;
  submitLabel: string;
}) {
  return (
    <form action={action} className="space-y-5 max-w-3xl">
      {product ? <input type="hidden" name="id" value={product.id} /> : null}

      <div className="grid sm:grid-cols-2 gap-5">
        <Field label="Name">
          <input name="name" required defaultValue={product?.name ?? ""} className={inputCls} />
        </Field>
        <Field label="Slug" hint="URL id, e.g. macbook-air-m3">
          <input name="slug" required defaultValue={product?.slug ?? ""} className={inputCls} />
        </Field>
        <Field label="Category" hint="mac, iphone, ipad, watch, audio, accessories">
          <input name="category" required defaultValue={product?.category ?? ""} className={inputCls} />
        </Field>
        <Field label="Badge (optional)">
          <input name="badge" defaultValue={product?.badge ?? ""} className={inputCls} />
        </Field>
        <Field label="Price (USD base)" hint="Displayed to customers in New Leones">
          <input name="price" type="number" step="0.01" required defaultValue={product?.price ?? ""} className={inputCls} />
        </Field>
        <Field label="Original price (optional)">
          <input name="originalPrice" type="number" step="0.01" defaultValue={product?.originalPrice ?? ""} className={inputCls} />
        </Field>
        <Field label="Stock">
          <input name="stock" type="number" defaultValue={product?.stock ?? 0} className={inputCls} />
        </Field>
        <Field label="Rating / Reviews">
          <div className="flex gap-2">
            <input name="rating" type="number" step="0.1" defaultValue={product?.rating ?? 0} className={inputCls} placeholder="Rating" />
            <input name="reviews" type="number" defaultValue={product?.reviews ?? 0} className={inputCls} placeholder="Reviews" />
          </div>
        </Field>
      </div>

      <Field label="Primary image path" hint="e.g. /assets/photo-....avif">
        <input name="image" required defaultValue={product?.image ?? ""} className={inputCls} />
      </Field>
      <Field label="Gallery images" hint="One path per line (primary first)">
        <textarea name="images" rows={3} defaultValue={(product?.images ?? []).join("\n")} className={areaCls} />
      </Field>
      <Field label="Description">
        <textarea name="description" rows={3} defaultValue={product?.description ?? ""} className={areaCls} />
      </Field>
      <Field label="Features" hint="One feature per line">
        <textarea name="features" rows={4} defaultValue={(product?.features ?? []).join("\n")} className={areaCls} />
      </Field>
      <Field label="Specifications" hint="One per line as Key: Value">
        <textarea
          name="specifications"
          rows={5}
          defaultValue={Object.entries(product?.specifications ?? {}).map(([k, v]) => `${k}: ${v}`).join("\n")}
          className={areaCls}
        />
      </Field>

      <div className="flex gap-3 pt-2">
        <button type="submit" className="h-10 px-5 rounded-md font-semibold" style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}>
          {submitLabel}
        </button>
      </div>
    </form>
  );
}
