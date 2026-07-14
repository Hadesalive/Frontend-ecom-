"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import * as data from "@/lib/data";
import { prisma } from "@/lib/db";
import { endSession, getSession, hashPassword, verifyPassword } from "@/lib/auth";

async function requireAdmin() {
  const s = await getSession();
  if (!s) redirect("/login");
}

function num(fd: FormData, k: string): number {
  return Number(fd.get(k) ?? 0) || 0;
}
function str(fd: FormData, k: string): string {
  return String(fd.get(k) ?? "").trim();
}
function lines(fd: FormData, k: string): string[] {
  return String(fd.get(k) ?? "")
    .split("\n")
    .map((s) => s.trim())
    .filter(Boolean);
}

function productFromForm(fd: FormData): data.ProductInput {
  const specs: Record<string, string> = {};
  for (const line of lines(fd, "specifications")) {
    const idx = line.indexOf(":");
    if (idx > 0) specs[line.slice(0, idx).trim()] = line.slice(idx + 1).trim();
  }
  const images = lines(fd, "images");
  const image = str(fd, "image") || images[0] || "";
  const stock = num(fd, "stock");
  return {
    slug: str(fd, "slug"),
    name: str(fd, "name"),
    price: num(fd, "price"),
    originalPrice: str(fd, "originalPrice") ? num(fd, "originalPrice") : null,
    rating: num(fd, "rating"),
    reviews: num(fd, "reviews"),
    image,
    images: images.length ? images : image ? [image] : [],
    category: str(fd, "category"),
    badge: str(fd, "badge") || null,
    inStock: stock > 0,
    stock,
    description: str(fd, "description"),
    features: lines(fd, "features"),
    specifications: specs,
  };
}

export async function createProductAction(fd: FormData) {
  await requireAdmin();
  const input = productFromForm(fd);
  await data.createProduct(input);
  revalidatePath("/dashboard/products");
  redirect(`/dashboard/products/${input.slug}`);
}

export async function updateProductAction(fd: FormData) {
  await requireAdmin();
  const id = num(fd, "id");
  const input = productFromForm(fd);
  await data.updateProduct(id, input);
  revalidatePath("/dashboard/products");
  revalidatePath(`/dashboard/products/${input.slug}`);
  redirect(`/dashboard/products/${input.slug}`);
}

export async function deleteProductAction(fd: FormData) {
  await requireAdmin();
  await data.deleteProduct(num(fd, "id"));
  revalidatePath("/dashboard/products");
  redirect("/dashboard/products");
}

export async function setStockAction(fd: FormData) {
  await requireAdmin();
  await data.setStock(num(fd, "id"), num(fd, "stock"));
  revalidatePath("/dashboard/inventory");
}

export async function updateOrderStatusAction(fd: FormData) {
  await requireAdmin();
  const id = num(fd, "id");
  await data.updateOrderStatus(id, str(fd, "status"));
  revalidatePath(`/dashboard/orders/${id}`);
  revalidatePath("/dashboard/orders");
  revalidatePath("/dashboard");
}

export async function createDiscountAction(fd: FormData) {
  await requireAdmin();
  await data.createDiscount({ code: str(fd, "code"), type: str(fd, "type") || "percent", value: num(fd, "value") });
  revalidatePath("/dashboard/discounts");
}

export async function toggleDiscountAction(fd: FormData) {
  await requireAdmin();
  await data.toggleDiscount(num(fd, "id"));
  revalidatePath("/dashboard/discounts");
}

export async function deleteDiscountAction(fd: FormData) {
  await requireAdmin();
  await data.deleteDiscount(num(fd, "id"));
  revalidatePath("/dashboard/discounts");
}

export async function changePasswordAction(fd: FormData) {
  const session = await getSession();
  if (!session) redirect("/login");
  const current = str(fd, "current");
  const next = str(fd, "next");
  const user = await prisma.adminUser.findUnique({ where: { email: session.email } });
  if (!user || !verifyPassword(current, user.passwordHash)) {
    redirect("/dashboard/settings?error=wrong");
  }
  if (next.length < 6) {
    redirect("/dashboard/settings?error=short");
  }
  await prisma.adminUser.update({ where: { email: session.email }, data: { passwordHash: hashPassword(next) } });
  redirect("/dashboard/settings?ok=1");
}

export async function logoutAction() {
  await endSession();
  redirect("/login");
}
