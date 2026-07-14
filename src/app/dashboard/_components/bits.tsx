import Link from "next/link";
import { ReactNode } from "react";

const STATUS_COLORS: Record<string, string> = {
  Paid: "#2f6fb5",
  Fulfilled: "#16a34a",
  Pending: "#d97706",
  Refunded: "#6b7280",
  Cancelled: "#dc2626",
};

export function StatusBadge({ status }: { status: string }) {
  const color = STATUS_COLORS[status] ?? "#6b7280";
  return (
    <span
      className="inline-flex items-center gap-1.5 text-xs font-medium px-2 py-0.5 rounded-full"
      style={{ background: `color-mix(in oklab, ${color} 14%, var(--background))`, color }}
    >
      <span className="h-1.5 w-1.5 rounded-full" style={{ background: color }} />
      {status}
    </span>
  );
}

export function LinkButton({ href, children, variant = "accent" }: { href: string; children: ReactNode; variant?: "accent" | "ghost" }) {
  const style =
    variant === "accent"
      ? { background: "var(--accent)", color: "var(--accent-contrast)", borderColor: "transparent" }
      : { background: "transparent", color: "var(--color-foreground)", borderColor: "var(--color-border)" };
  return (
    <Link
      href={href}
      className="inline-flex items-center justify-center h-9 px-4 rounded-md text-sm font-medium border"
      style={style}
    >
      {children}
    </Link>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="rounded-xl border border-[--color-border] bg-[--color-card] p-10 text-center">
      <p className="font-medium">{title}</p>
      {hint ? <p className="text-sm text-[--color-muted-foreground] mt-1">{hint}</p> : null}
    </div>
  );
}
