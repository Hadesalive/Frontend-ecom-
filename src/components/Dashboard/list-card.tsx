import { ReactNode } from "react";

interface ListItem {
  id: string;
  label: string;
  value: string | ReactNode;
  icon?: ReactNode;
}

interface ListCardProps {
  title: string;
  items: ListItem[];
  className?: string;
  headerActions?: ReactNode;
}

export function ListCard({ title, items, className = "", headerActions }: ListCardProps) {
  return (
    <div className={`p-5 rounded-xl bg-[--color-card] border border-[--color-border] ${className}`}>
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-medium">{title}</h3>
        {headerActions && <div>{headerActions}</div>}
      </div>
      <ul className="space-y-3 text-sm">
        {items.map((item) => (
          <li key={item.id} className="flex items-center justify-between">
            <span className="flex items-center gap-3">
              {item.icon || (
                <span 
                  className="inline-block h-2 w-2 rounded-full" 
                  style={{ background: 'var(--accent)' }} 
                />
              )}
              <span className="font-medium">{item.label}</span>
            </span>
            <span className="text-[--color-muted-foreground]">{item.value}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
