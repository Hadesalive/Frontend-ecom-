export type Product = {
  id: number;
  slug: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  images: string[];
  category: string;
  badge?: string;
  inStock: boolean;
  description: string;
  features: string[];
  specifications: Record<string, string>;
};

export const products: Product[] = [
  // From the product-detail page's rich `products` object (src/app/products/[slug]/page.tsx)
  {
    id: 1,
    slug: "macbook-air-m3",
    name: "MacBook Air M3",
    price: 1299,
    originalPrice: 1499,
    rating: 4.8,
    reviews: 124,
    image: "/assets/photo-1598094670018-abf669538033.avif",
    images: [
      "/assets/photo-1598094670018-abf669538033.avif",
      "/assets/photo-1585565804112-f201f68c48b4.avif",
      "/assets/photo-1594344141311-8ea00ba55612.avif",
    ],
    category: "mac",
    badge: "Best Seller",
    inStock: true,
    description:
      "The MacBook Air with M3 chip delivers exceptional performance in an incredibly thin and light design. Perfect for everything from everyday tasks to creative projects.",
    features: [
      "M3 chip with 8-core CPU and 8-core GPU",
      "13.6-inch Liquid Retina display",
      "Up to 18 hours of battery life",
      "8GB unified memory",
      "256GB SSD storage",
      "1080p FaceTime HD camera",
      "Touch ID",
    ],
    specifications: {
      Display: "13.6-inch Liquid Retina display",
      Processor: "Apple M3 chip",
      Memory: "8GB unified memory",
      Storage: "256GB SSD",
      Graphics: "8-core GPU",
      Camera: "1080p FaceTime HD camera",
      Battery: "Up to 18 hours",
      Weight: "2.7 pounds (1.24 kg)",
    },
  },
  {
    id: 2,
    slug: "iphone-15-pro",
    name: "iPhone 15 Pro",
    price: 999,
    originalPrice: 1199,
    rating: 4.9,
    reviews: 89,
    image: "/assets/photo-1585565804112-f201f68c48b4.avif",
    images: [
      "/assets/photo-1585565804112-f201f68c48b4.avif",
      "/assets/photo-1598094670018-abf669538033.avif",
      "/assets/photo-1594344141311-8ea00ba55612.avif",
    ],
    category: "iphone",
    badge: "New",
    inStock: true,
    description:
      "The iPhone 15 Pro features the A17 Pro chip, titanium design, and advanced camera system. Built for pro users who demand the best.",
    features: [
      "A17 Pro chip with 6-core CPU",
      "6.1-inch Super Retina XDR display",
      "Pro camera system with 48MP main camera",
      "Titanium design",
      "Action Button",
      "USB-C connector",
      "5G capable",
    ],
    specifications: {
      Display: "6.1-inch Super Retina XDR",
      Processor: "A17 Pro chip",
      Storage: "128GB, 256GB, 512GB, 1TB",
      Camera: "48MP Main, 12MP Ultra Wide, 12MP Telephoto",
      Battery: "Up to 23 hours video playback",
      Materials: "Titanium with Ceramic Shield",
      Connectivity: "5G, Wi-Fi 6E, Bluetooth 5.3",
    },
  },

  // From the shop page's `products` array (src/app/shop/page.tsx) — products not already
  // represented above. Slugs derived from name; description/features/specifications are
  // filled in minimally since the shop array doesn't provide them.
  {
    id: 3,
    slug: "ipad-pro-12-9",
    name: 'iPad Pro 12.9"',
    price: 1099,
    originalPrice: 1299,
    rating: 4.7,
    reviews: 67,
    image: "/assets/photo-1594344141311-8ea00ba55612.avif",
    images: ["/assets/photo-1594344141311-8ea00ba55612.avif"],
    category: "ipad",
    badge: "Sale",
    inStock: true,
    description:
      "The iPad Pro 12.9-inch delivers pro-level performance and a stunning Liquid Retina XDR display in a versatile, all-day tablet.",
    features: [],
    specifications: {},
  },
  {
    id: 4,
    slug: "apple-watch-series-9",
    name: "Apple Watch Series 9",
    price: 399,
    originalPrice: 449,
    rating: 4.6,
    reviews: 156,
    image: "/assets/photo-1598094670018-abf669538033.avif",
    images: ["/assets/photo-1598094670018-abf669538033.avif"],
    category: "watch",
    badge: "Popular",
    inStock: false,
    description:
      "Apple Watch Series 9 brings advanced health tracking, a brighter display, and powerful new gestures to your wrist.",
    features: [],
    specifications: {},
  },
  {
    id: 5,
    slug: "airpods-pro-2nd-gen",
    name: "AirPods Pro 2nd Gen",
    price: 249,
    originalPrice: 279,
    rating: 4.8,
    reviews: 203,
    image: "/assets/photo-1585565804112-f201f68c48b4.avif",
    images: ["/assets/photo-1585565804112-f201f68c48b4.avif"],
    category: "audio",
    badge: "Limited",
    inStock: true,
    description:
      "AirPods Pro 2nd Gen deliver richer sound, smarter noise cancellation, and a more personalized listening experience.",
    features: [],
    specifications: {},
  },
  {
    id: 6,
    slug: "magic-keyboard",
    name: "Magic Keyboard",
    price: 99,
    originalPrice: 129,
    rating: 4.5,
    reviews: 78,
    image: "/assets/photo-1594344141311-8ea00ba55612.avif",
    images: ["/assets/photo-1594344141311-8ea00ba55612.avif"],
    category: "accessories",
    badge: "Deal",
    inStock: true,
    description:
      "The Magic Keyboard offers a comfortable, responsive typing experience with a scissor mechanism and a stable, level key feel.",
    features: [],
    specifications: {},
  },
  {
    id: 7,
    slug: "mac-studio-m2-ultra",
    name: "Mac Studio M2 Ultra",
    price: 3999,
    originalPrice: 4499,
    rating: 4.9,
    reviews: 45,
    image: "/assets/photo-1598094670018-abf669538033.avif",
    images: ["/assets/photo-1598094670018-abf669538033.avif"],
    category: "mac",
    badge: "Pro",
    inStock: true,
    description:
      "Mac Studio with M2 Ultra delivers extreme performance and extensive connectivity in a compact pro desktop.",
    features: [],
    specifications: {},
  },
  {
    id: 8,
    slug: "iphone-15",
    name: "iPhone 15",
    price: 799,
    originalPrice: 899,
    rating: 4.7,
    reviews: 112,
    image: "/assets/photo-1585565804112-f201f68c48b4.avif",
    images: ["/assets/photo-1585565804112-f201f68c48b4.avif"],
    category: "iphone",
    badge: "Trending",
    inStock: true,
    description:
      "iPhone 15 features the powerful A16 Bionic chip, a 48MP main camera, and Dynamic Island in a durable, colorful design.",
    features: [],
    specifications: {},
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  return products.filter((p) => p.category === category);
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q)
  );
}
