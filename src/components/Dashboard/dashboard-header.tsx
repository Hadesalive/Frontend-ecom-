import { ReactNode } from "react";
import { Bars3Icon } from "@heroicons/react/24/outline";

interface DashboardHeaderProps {
  title: string;
  onMenuClick?: () => void;
  searchPlaceholder?: string;
  actions?: ReactNode;
  className?: string;
}

export function DashboardHeader({ 
  title, 
  onMenuClick, 
  searchPlaceholder = "Search…", 
  actions,
  className = "" 
}: DashboardHeaderProps) {
  return (
    <header 
      className={`sticky top-0 z-10 pb-3 bg-[--background]/80 backdrop-blur supports-[backdrop-filter]:bg-[--background]/70 border-b ${className}`} 
      style={{ borderColor: 'var(--color-border)' }}
    >
      <div className="flex items-center justify-between py-3">
        <div className="flex items-center gap-2">
          {onMenuClick && (
            <button
              className="lg:hidden inline-flex items-center justify-center h-9 w-9 rounded-md border border-[--color-border]"
              onClick={onMenuClick}
              aria-label="Open navigation"
            >
              <Bars3Icon className="h-5 w-5" />
            </button>
          )}
          <h1 className="text-xl md:text-2xl font-semibold">{title}</h1>
        </div>
        <div className="flex items-center gap-2">
          <input
            placeholder={searchPlaceholder}
            className="h-9 w-44 md:w-64 rounded-md px-3 bg-[--color-card] text-[--color-foreground] border border-[--color-border]"
          />
          {actions}
        </div>
      </div>
    </header>
  );
}
