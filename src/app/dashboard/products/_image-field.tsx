"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { uploadProductImage } from "./_upload-action";

export function ImageField({ defaultImages = [] }: { defaultImages?: string[] }) {
  const [images, setImages] = useState<string[]>(defaultImages);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pathInput, setPathInput] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  async function onFiles(files: FileList | null) {
    if (!files || files.length === 0) return;
    setBusy(true);
    setError(null);
    for (const file of Array.from(files)) {
      const fd = new FormData();
      fd.set("file", file);
      const res = await uploadProductImage(fd);
      if ("url" in res) setImages((cur) => [...cur, res.url]);
      else setError(res.error);
    }
    setBusy(false);
    if (fileRef.current) fileRef.current.value = "";
  }

  function addPath() {
    const p = pathInput.trim();
    if (p) {
      setImages((cur) => [...cur, p]);
      setPathInput("");
    }
  }
  function remove(i: number) {
    setImages((cur) => cur.filter((_, idx) => idx !== i));
  }
  function makePrimary(i: number) {
    setImages((cur) => {
      const copy = [...cur];
      const [x] = copy.splice(i, 1);
      return [x, ...copy];
    });
  }

  return (
    <div className="space-y-3">
      {/* Consumed by productFromForm (image = first, images = all) */}
      <input type="hidden" name="image" value={images[0] ?? ""} />
      <textarea name="images" value={images.join("\n")} readOnly hidden />

      {images.length > 0 ? (
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {images.map((src, i) => (
            <div key={`${src}-${i}`} className="relative group rounded-lg overflow-hidden border border-[--color-border] bg-[--color-muted]">
              <div className="relative aspect-square">
                <Image src={src} alt={`Image ${i + 1}`} fill className="object-cover" sizes="120px" unoptimized={!src.startsWith("/")} />
              </div>
              {i === 0 ? (
                <span className="absolute top-1 left-1 text-[10px] px-1.5 py-0.5 rounded-full" style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}>
                  Primary
                </span>
              ) : null}
              <div className="absolute inset-x-0 bottom-0 flex opacity-0 group-hover:opacity-100 transition-opacity">
                {i !== 0 ? (
                  <button type="button" onClick={() => makePrimary(i)} className="flex-1 text-[10px] py-1 bg-black/60 text-white hover:bg-black/80">
                    Make primary
                  </button>
                ) : null}
                <button type="button" onClick={() => remove(i)} className="flex-1 text-[10px] py-1 bg-black/60 text-white hover:bg-[#dc2626]">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-[13px] text-[--color-muted-foreground]">No images yet.</p>
      )}

      <div className="flex flex-wrap items-center gap-3">
        <input
          ref={fileRef}
          type="file"
          accept="image/*"
          multiple
          onChange={(e) => onFiles(e.target.files)}
          disabled={busy}
          className="text-sm file:mr-3 file:h-9 file:px-3 file:rounded-md file:border file:border-[--color-border] file:bg-[--color-card] file:text-[--color-foreground] file:text-sm"
        />
        {busy ? <span className="text-sm text-[--color-muted-foreground]">Uploading…</span> : null}
      </div>

      <div className="flex items-center gap-2">
        <input
          value={pathInput}
          onChange={(e) => setPathInput(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              addPath();
            }
          }}
          placeholder="…or paste an image path/URL (e.g. /assets/photo.avif)"
          className="flex-1 h-10 px-3 rounded-md bg-[--background] border border-[--color-border] text-sm"
        />
        <button type="button" onClick={addPath} className="h-10 px-4 rounded-md border border-[--color-border] hover:bg-[--color-muted] text-sm">
          Add
        </button>
      </div>

      {error ? (
        <p className="text-[13px]" style={{ color: "#dc2626" }}>{error}</p>
      ) : null}
    </div>
  );
}
