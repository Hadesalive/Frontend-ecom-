import "dotenv/config";
import { PrismaClient } from "@prisma/client";
import { scryptSync, randomBytes } from "node:crypto";
import { products as catalog } from "../src/lib/products";

const prisma = new PrismaClient();

function hashPassword(password: string): string {
  const salt = randomBytes(16).toString("hex");
  const hash = scryptSync(password, salt, 64).toString("hex");
  return `${salt}:${hash}`;
}

const SAMPLE_CUSTOMERS = [
  { name: "Aisha Kamara", email: "aisha.kamara@example.sl", phone: "+232 76 100 200" },
  { name: "Mohamed Sesay", email: "m.sesay@example.sl", phone: "+232 77 300 400" },
  { name: "Fatmata Conteh", email: "fatmata.conteh@example.sl", phone: "+232 78 500 600" },
  { name: "John Koroma", email: "john.koroma@example.sl", phone: "+232 79 700 800" },
  { name: "Mariama Bangura", email: "mariama.b@example.sl", phone: "+232 76 900 100" },
];

const STATUSES = ["Paid", "Fulfilled", "Pending", "Paid", "Refunded", "Fulfilled"];

async function main() {
  console.log("Seeding database…");

  // Reset (idempotent seed)
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.customer.deleteMany();
  await prisma.product.deleteMany();
  await prisma.discount.deleteMany();
  await prisma.adminUser.deleteMany();

  // Products from the storefront catalog
  for (const p of catalog) {
    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        price: p.price,
        originalPrice: p.originalPrice ?? null,
        rating: p.rating,
        reviews: p.reviews,
        image: p.image,
        images: JSON.stringify(p.images),
        category: p.category,
        badge: p.badge ?? null,
        inStock: p.inStock,
        stock: p.inStock ? 20 + Math.round(p.rating * 3) : 0,
        description: p.description,
        features: JSON.stringify(p.features),
        specifications: JSON.stringify(p.specifications),
      },
    });
  }
  console.log(`  ${catalog.length} products`);

  // Customers
  const customers = [];
  for (const c of SAMPLE_CUSTOMERS) {
    customers.push(await prisma.customer.create({ data: c }));
  }
  console.log(`  ${customers.length} customers`);

  // Orders (deterministic sample spread over the past ~30 days)
  const dbProducts = await prisma.product.findMany();
  let orderSeq = 1;
  for (let i = 0; i < 18; i++) {
    const customer = customers[i % customers.length];
    const picks = [dbProducts[i % dbProducts.length], dbProducts[(i * 2 + 1) % dbProducts.length]];
    const items = picks.map((p, idx) => ({
      productSlug: p.slug,
      name: p.name,
      price: p.price,
      quantity: ((i + idx) % 2) + 1,
    }));
    const subtotal = items.reduce((s, it) => s + it.price * it.quantity, 0);
    const shipping = subtotal > 100 ? 0 : 9.99;
    const tax = subtotal * 0.08;
    const total = subtotal + shipping + tax;
    const daysAgo = (i * 37) % 30;
    const createdAt = new Date(Date.now() - daysAgo * 24 * 60 * 60 * 1000);

    await prisma.order.create({
      data: {
        number: `HOE-${String(1000 + orderSeq++).padStart(4, "0")}`,
        customerId: customer.id,
        name: customer.name,
        email: customer.email,
        address: "12 Wilkinson Road",
        city: "Freetown",
        subtotal,
        shipping,
        tax,
        total,
        status: STATUSES[i % STATUSES.length],
        createdAt,
        items: { create: items },
      },
    });
  }
  console.log("  18 orders");

  // Discounts
  await prisma.discount.createMany({
    data: [
      { code: "WELCOME10", type: "percent", value: 10, active: true },
      { code: "FREESHIP", type: "fixed", value: 9.99, active: true },
      { code: "SALLONE", type: "percent", value: 15, active: false },
    ],
  });
  console.log("  3 discounts");

  // Admin user
  const email = process.env.ADMIN_EMAIL || "admin@houseofelectronics.sl";
  const password = process.env.ADMIN_PASSWORD || "admin1234";
  await prisma.adminUser.create({ data: { email, passwordHash: hashPassword(password) } });
  console.log(`  admin user: ${email}`);

  console.log("Seed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
