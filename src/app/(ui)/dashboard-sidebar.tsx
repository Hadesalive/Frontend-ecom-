"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BrandLogo } from "./components";
import {
  Squares2X2Icon,
  ShoppingBagIcon,
  CubeIcon,
  UsersIcon,
  ChartBarIcon,
  TagIcon,
  SquaresPlusIcon,
  AdjustmentsVerticalIcon,
  ArchiveBoxIcon,
} from "@heroicons/react/24/outline";

export const defaultSidebarItems = [
  { name: "Overview", href: "/dashboard", icon: Squares2X2Icon },
  { name: "Orders", href: "/dashboard/orders", icon: ShoppingBagIcon },
  { name: "Products", href: "/dashboard/products", icon: CubeIcon },
  { name: "Customers", href: "/dashboard/customers", icon: UsersIcon },
  { name: "Reports", href: "/dashboard/reports", icon: ChartBarIcon },
  { name: "Categories", href: "/dashboard/categories", icon: SquaresPlusIcon },
  { name: "Inventory", href: "/dashboard/inventory", icon: ArchiveBoxIcon },
  { name: "Discounts", href: "/dashboard/discounts", icon: TagIcon },
  { name: "Settings", href: "/dashboard/settings", icon: AdjustmentsVerticalIcon },
];

function isActive(pathname: string, href: string): boolean {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname === href || pathname.startsWith(href + "/");
}

export function DashboardSidebar({
  items = defaultSidebarItems,
  drawer = false,
  onNavigate,
}: {
  items?: typeof defaultSidebarItems;
  drawer?: boolean;
  onNavigate?: () => void;
}) {
  const pathname = usePathname() ?? "/dashboard";
  const wrapperClasses = drawer
    ? "px-3 pt-3 pb-4 h-full overflow-auto"
    : "px-3 lg:px-4 h-fit lg:h-[calc(100vh-6rem)] sticky top-0 pt-3.5 border-r";
  return (
    <aside className={wrapperClasses} style={{ borderColor: drawer ? undefined : "var(--color-border)" }}>
      <div className="h-14 flex items-center mb-3 px-1 overflow-hidden">
        <Link href="/dashboard" aria-label="House of Electronics" className="flex items-center min-w-0">
          <BrandLogo markClassName="h-8 w-auto shrink-0" wordmarkClassName="text-sm font-semibold tracking-tight truncate text-[--color-foreground]" />
        </Link>
      </div>
      <nav className="space-y-0.5 mt-2">
        {items.map(({ name, href, icon: Icon }) => {
          const active = isActive(pathname, href);
          return (
            <Link
              key={name}
              href={href}
              onClick={onNavigate}
              className="relative w-full flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-md text-left transition-colors duration-200 text-[--color-foreground] text-sm md:text-[15px] hover:bg-[--color-muted]"
              aria-current={active ? "page" : undefined}
            >
              <span
                className="absolute left-1 top-1/2 -translate-y-1/2 h-6 rounded-full transition-all duration-300"
                style={{ width: active ? "3px" : "0px", background: "var(--accent)" }}
              />
              <Icon className="h-5 w-5 transition-colors duration-200" style={{ color: active ? "var(--accent)" : "var(--color-foreground)" }} />
              <span className={`transition-colors duration-200 ${active ? "font-semibold" : ""}`}>{name}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
