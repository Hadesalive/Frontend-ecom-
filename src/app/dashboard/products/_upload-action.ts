"use server";

import { put } from "@vercel/blob";
import { getSession } from "@/lib/auth";

export async function uploadProductImage(
  formData: FormData
): Promise<{ url: string } | { error: string }> {
  const session = await getSession();
  if (!session) return { error: "Unauthorized." };

  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) return { error: "No file selected." };
  if (!file.type.startsWith("image/")) return { error: "Please choose an image file." };
  if (file.size > 8 * 1024 * 1024) return { error: "Image must be under 8 MB." };

  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return { error: "Image storage is not configured yet (missing Blob token)." };
  }

  try {
    const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "-");
    const blob = await put(`products/${safeName}`, file, {
      access: "public",
      addRandomSuffix: true,
    });
    return { url: blob.url };
  } catch (e) {
    console.error("uploadProductImage failed", e);
    return { error: "Upload failed. Please try again." };
  }
}
