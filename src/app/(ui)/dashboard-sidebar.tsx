"use client";

import { FooterLogo } from "./components";
import { 
  Squares2X2Icon,
  ShoppingBagIcon,
  CubeIcon,
  UsersIcon,
  ChartBarIcon,
  TagIcon,
  SquaresPlusIcon,
  AdjustmentsVerticalIcon
} from "@heroicons/react/24/outline";

export const defaultSidebarItems = [
  { name: "Overview", icon: Squares2X2Icon },
  { name: "Orders", icon: ShoppingBagIcon },
  { name: "Products", icon: CubeIcon },
  { name: "Customers", icon: UsersIcon },
  { name: "Reports", icon: ChartBarIcon },
  { name: "Categories", icon: SquaresPlusIcon },
  { name: "Inventory", icon: CubeIcon },
  { name: "Discounts", icon: TagIcon },
  { name: "Settings", icon: AdjustmentsVerticalIcon },
];

export function DashboardSidebar({
  active,
  onSelect,
  items = defaultSidebarItems,
  drawer = false,
}: {
  active: string;
  onSelect: (name: string) => void;
  items?: typeof defaultSidebarItems;
  drawer?: boolean;
}) {
  const wrapperClasses = drawer
    ? "px-3 pt-3 pb-4 h-full overflow-auto"
    : "px-3 lg:px-4 h-fit lg:h-[calc(100vh-6rem)] sticky top-0 pt-3.5 border-r";
  return (
    <aside className={wrapperClasses} style={{ borderColor: drawer ? undefined : 'var(--color-border)' }}>
      <div className="h-12 flex items-center mb-2 px-1">
        <FooterLogo />
      </div>
      <nav className="space-y-0.5 mt-2">
        {items.map(({ name, icon: Icon }) => (
          <button
            key={name}
            onClick={() => onSelect(name)}
            className={`relative w-full flex items-center gap-3 pl-4 pr-3 py-2.5 rounded-md text-left transition-colors duration-200 text-[--color-foreground] text-sm md:text-[15px]`}
            aria-current={active === name ? "page" : undefined}
          >
            <span className="absolute left-1 top-1/2 -translate-y-1/2 h-6 rounded-full transition-all duration-300" style={{ width: active === name ? '3px' : '0px', background: 'var(--accent)' }} />
            <Icon className="h-5 w-5 transition-colors duration-200" style={{ color: active === name ? 'var(--accent)' : 'var(--color-foreground)' }} />
            <span className={`transition-colors duration-200 ${active === name ? 'font-semibold' : ''}`}>{name}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}


