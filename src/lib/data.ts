import "server-only";
import { prisma } from "@/lib/db";

// ---------- Types ----------

export type ProductRow = {
  id: number;
  slug: string;
  name: string;
  price: number;
  originalPrice: number | null;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: string;
  badge: string | null;
  inStock: boolean;
  stock: number;
  description: string;
  features: string[];
  specifications: Record<string, string>;
};

type PrismaProduct = {
  id: number; slug: string; name: string; price: number; originalPrice: number | null;
  rating: number; reviews: number; image: string; images: string; category: string;
  badge: string | null; inStock: boolean; stock: number; description: string;
  features: string; specifications: string;
};

function parseProduct(p: PrismaProduct): ProductRow {
  return {
    id: p.id, slug: p.slug, name: p.name, price: p.price, originalPrice: p.originalPrice,
    rating: p.rating, reviews: p.reviews, image: p.image,
    images: safeJson<string[]>(p.images, []),
    category: p.category, badge: p.badge, inStock: p.inStock, stock: p.stock,
    description: p.description,
    features: safeJson<string[]>(p.features, []),
    specifications: safeJson<Record<string, string>>(p.specifications, {}),
  };
}

function safeJson<T>(raw: string, fallback: T): T {
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

// ---------- Products ----------

export async function listProducts(): Promise<ProductRow[]> {
  const rows = await prisma.product.findMany({ orderBy: { id: "asc" } });
  return rows.map(parseProduct);
}

export async function getProduct(id: number): Promise<ProductRow | null> {
  const row = await prisma.product.findUnique({ where: { id } });
  return row ? parseProduct(row) : null;
}

export async function getProductBySlug(slug: string): Promise<ProductRow | null> {
  const row = await prisma.product.findUnique({ where: { slug } });
  return row ? parseProduct(row) : null;
}

export type ProductInput = {
  slug: string; name: string; price: number; originalPrice?: number | null;
  rating?: number; reviews?: number; image: string; images?: string[];
  category: string; badge?: string | null; inStock?: boolean; stock?: number;
  description?: string; features?: string[]; specifications?: Record<string, string>;
};

export async function createProduct(input: ProductInput): Promise<ProductRow> {
  const row = await prisma.product.create({
    data: {
      slug: input.slug, name: input.name, price: input.price,
      originalPrice: input.originalPrice ?? null, rating: input.rating ?? 0,
      reviews: input.reviews ?? 0, image: input.image,
      images: JSON.stringify(input.images ?? [input.image]),
      category: input.category, badge: input.badge ?? null,
      inStock: input.inStock ?? true, stock: input.stock ?? 0,
      description: input.description ?? "",
      features: JSON.stringify(input.features ?? []),
      specifications: JSON.stringify(input.specifications ?? {}),
    },
  });
  return parseProduct(row);
}

export async function updateProduct(id: number, input: ProductInput): Promise<ProductRow> {
  const row = await prisma.product.update({
    where: { id },
    data: {
      slug: input.slug, name: input.name, price: input.price,
      originalPrice: input.originalPrice ?? null, rating: input.rating ?? 0,
      reviews: input.reviews ?? 0, image: input.image,
      images: JSON.stringify(input.images ?? [input.image]),
      category: input.category, badge: input.badge ?? null,
      inStock: input.inStock ?? true, stock: input.stock ?? 0,
      description: input.description ?? "",
      features: JSON.stringify(input.features ?? []),
      specifications: JSON.stringify(input.specifications ?? {}),
    },
  });
  return parseProduct(row);
}

export async function deleteProduct(id: number): Promise<void> {
  await prisma.product.delete({ where: { id } });
}

export async function setStock(id: number, stock: number): Promise<void> {
  await prisma.product.update({ where: { id }, data: { stock, inStock: stock > 0 } });
}

export async function listCategories(): Promise<{ category: string; count: number }[]> {
  const grouped = await prisma.product.groupBy({ by: ["category"], _count: { _all: true } });
  return grouped
    .map((g) => ({ category: g.category, count: g._count._all }))
    .sort((a, b) => b.count - a.count);
}

// ---------- Orders ----------

export type OrderRow = {
  id: number; number: string; name: string; email: string;
  address: string | null; city: string | null;
  subtotal: number; shipping: number; tax: number; total: number;
  status: string; createdAt: string; customerId: number;
  items: { id: number; name: string; price: number; quantity: number; productSlug: string | null }[];
};

export async function listOrders(): Promise<OrderRow[]> {
  const rows = await prisma.order.findMany({
    orderBy: { createdAt: "desc" },
    include: { items: true },
  });
  return rows.map(serializeOrder);
}

export async function getOrder(id: number): Promise<OrderRow | null> {
  const row = await prisma.order.findUnique({ where: { id }, include: { items: true } });
  return row ? serializeOrder(row) : null;
}

type PrismaOrder = {
  id: number; number: string; name: string; email: string; address: string | null;
  city: string | null; subtotal: number; shipping: number; tax: number; total: number;
  status: string; createdAt: Date; customerId: number;
  items: { id: number; name: string; price: number; quantity: number; productSlug: string | null }[];
};

function serializeOrder(o: PrismaOrder): OrderRow {
  return {
    id: o.id, number: o.number, name: o.name, email: o.email, address: o.address,
    city: o.city, subtotal: o.subtotal, shipping: o.shipping, tax: o.tax, total: o.total,
    status: o.status, createdAt: o.createdAt.toISOString(), customerId: o.customerId,
    items: o.items,
  };
}

export const ORDER_STATUSES = ["Pending", "Paid", "Fulfilled", "Refunded", "Cancelled"] as const;

export async function updateOrderStatus(id: number, status: string): Promise<void> {
  await prisma.order.update({ where: { id }, data: { status } });
}

export type CheckoutInput = {
  name: string; email: string; address?: string; city?: string;
  items: { slug: string; name: string; price: number; quantity: number }[];
};

export async function createOrderFromCheckout(input: CheckoutInput): Promise<{ number: string }> {
  const subtotal = input.items.reduce((s, it) => s + it.price * it.quantity, 0);
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const customer = await prisma.customer.upsert({
    where: { email: input.email },
    update: { name: input.name },
    create: { name: input.name, email: input.email },
  });

  const count = await prisma.order.count();
  const number = `HOE-${String(1000 + count + 1).padStart(4, "0")}`;

  await prisma.order.create({
    data: {
      number, customerId: customer.id, name: input.name, email: input.email,
      address: input.address ?? null, city: input.city ?? null,
      subtotal, shipping, tax, total, status: "Paid",
      items: {
        create: input.items.map((it) => ({
          productSlug: it.slug, name: it.name, price: it.price, quantity: it.quantity,
        })),
      },
    },
  });

  // Decrement stock where we can
  for (const it of input.items) {
    await prisma.product
      .update({ where: { slug: it.slug }, data: { stock: { decrement: it.quantity } } })
      .catch(() => {});
  }

  return { number };
}

// ---------- Customers ----------

export type CustomerRow = {
  id: number; name: string; email: string; phone: string | null;
  createdAt: string; orderCount: number; totalSpent: number;
};

export async function listCustomers(): Promise<CustomerRow[]> {
  const rows = await prisma.customer.findMany({
    orderBy: { createdAt: "desc" },
    include: { orders: { select: { total: true } } },
  });
  return rows.map((c) => ({
    id: c.id, name: c.name, email: c.email, phone: c.phone,
    createdAt: c.createdAt.toISOString(),
    orderCount: c.orders.length,
    totalSpent: c.orders.reduce((s, o) => s + o.total, 0),
  }));
}

export async function getCustomer(id: number) {
  const c = await prisma.customer.findUnique({
    where: { id },
    include: { orders: { orderBy: { createdAt: "desc" }, include: { items: true } } },
  });
  if (!c) return null;
  return {
    id: c.id, name: c.name, email: c.email, phone: c.phone,
    createdAt: c.createdAt.toISOString(),
    orders: c.orders.map(serializeOrder),
    totalSpent: c.orders.reduce((s, o) => s + o.total, 0),
  };
}

// ---------- Discounts ----------

export async function listDiscounts() {
  const rows = await prisma.discount.findMany({ orderBy: { createdAt: "desc" } });
  return rows.map((d) => ({
    id: d.id, code: d.code, type: d.type, value: d.value, active: d.active,
    createdAt: d.createdAt.toISOString(),
  }));
}

export async function createDiscount(data: { code: string; type: string; value: number }) {
  await prisma.discount.create({ data: { code: data.code.toUpperCase(), type: data.type, value: data.value } });
}

export async function toggleDiscount(id: number) {
  const d = await prisma.discount.findUnique({ where: { id } });
  if (d) await prisma.discount.update({ where: { id }, data: { active: !d.active } });
}

export async function deleteDiscount(id: number) {
  await prisma.discount.delete({ where: { id } });
}

// ---------- Dashboard stats ----------

const REVENUE_STATUSES = ["Paid", "Fulfilled"];

export async function getDashboardStats() {
  const [orders, customersCount, productsCount] = await Promise.all([
    prisma.order.findMany({ include: { items: true } }),
    prisma.customer.count(),
    prisma.product.count(),
  ]);

  const revenue = orders
    .filter((o) => REVENUE_STATUSES.includes(o.status))
    .reduce((s, o) => s + o.total, 0);

  const ordersCount = orders.length;

  // Weekly sales — last 7 days buckets (Mon..Sun style, but simple 7-day rolling)
  const now = new Date();
  const days: { label: string; total: number }[] = [];
  for (let i = 6; i >= 0; i--) {
    const day = new Date(now);
    day.setHours(0, 0, 0, 0);
    day.setDate(day.getDate() - i);
    const next = new Date(day);
    next.setDate(day.getDate() + 1);
    const total = orders
      .filter((o) => o.createdAt >= day && o.createdAt < next)
      .reduce((s, o) => s + o.total, 0);
    days.push({ label: day.toLocaleDateString("en-US", { weekday: "short" }), total });
  }

  // Status mix
  const statusMix: Record<string, number> = {};
  for (const o of orders) statusMix[o.status] = (statusMix[o.status] ?? 0) + 1;

  // Category sales (units)
  const catUnits: Record<string, number> = {};
  const productCats = new Map((await prisma.product.findMany()).map((p) => [p.slug, p.category]));
  for (const o of orders) {
    for (const it of o.items) {
      const cat = (it.productSlug && productCats.get(it.productSlug)) || "other";
      catUnits[cat] = (catUnits[cat] ?? 0) + it.quantity;
    }
  }

  // Top customers by spend
  const spendByCustomer = new Map<number, { name: string; total: number }>();
  for (const o of orders) {
    const cur = spendByCustomer.get(o.customerId) ?? { name: o.name, total: 0 };
    cur.total += o.total;
    spendByCustomer.set(o.customerId, cur);
  }
  const topCustomers = [...spendByCustomer.values()]
    .sort((a, b) => b.total - a.total)
    .slice(0, 5);

  const recentOrders = orders
    .slice()
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, 6)
    .map((o) => ({ id: o.id, number: o.number, name: o.name, total: o.total, status: o.status }));

  return {
    revenue, ordersCount, customersCount, productsCount,
    weeklySales: days, statusMix, catUnits, topCustomers, recentOrders,
  };
}
