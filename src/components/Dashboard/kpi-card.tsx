import { ReactNode } from "react";

interface KPICardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  className?: string;
}

export function KPICard({ title, value, icon, className = "" }: KPICardProps) {
  return (
    <div className={`p-5 rounded-xl bg-[--color-card] border border-[--color-border] ${className}`}>
      <div className="h-2 w-16 rounded-full mb-3" style={{ background: 'var(--accent)' }} />
      <div className="text-sm text-[--color-muted-foreground]">{title}</div>
      <div className="text-3xl font-semibold mt-2">{value}</div>
      {icon && <div className="mt-2">{icon}</div>}
    </div>
  );
}
