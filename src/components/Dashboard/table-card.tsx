import { ReactNode } from "react";

interface TableColumn {
  key: string;
  label: string;
  className?: string;
}

interface TableRow {
  [key: string]: string | number | ReactNode;
}

interface TableCardProps {
  title: string;
  columns: TableColumn[];
  data: TableRow[];
  className?: string;
  headerActions?: ReactNode;
}

export function TableCard({ title, columns, data, className = "", headerActions }: TableCardProps) {
  return (
    <div className={`rounded-xl bg-[--color-card] border border-[--color-border] overflow-hidden ${className}`}>
      <div className="p-5 border-b border-[--color-border] font-medium flex items-center justify-between">
        <span>{title}</span>
        {headerActions && <div>{headerActions}</div>}
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-[--color-muted-foreground] border-b border-[--color-border]">
              {columns.map((column) => (
                <th key={column.key} className={`px-5 py-3 ${column.className || ""}`}>
                  {column.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, index) => (
              <tr key={index} className="border-b border-[--color-border]">
                {columns.map((column) => (
                  <td key={column.key} className={`px-5 py-3 ${column.className || ""}`}>
                    {row[column.key]}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
