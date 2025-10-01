import { ReactNode } from "react";

interface ChartCardProps {
  title: string;
  children: ReactNode;
  className?: string;
  headerActions?: ReactNode;
}

export function ChartCard({ title, children, className = "", headerActions }: ChartCardProps) {
  return (
    <div className={`p-5 rounded-xl bg-[--color-card] border border-[--color-border] ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">{title}</h3>
        {headerActions && <div>{headerActions}</div>}
      </div>
      {children}
    </div>
  );
}
