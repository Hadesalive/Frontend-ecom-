import { ReactNode } from "react";

interface MobileDrawerProps {
  id: string;
  title: string;
  children: ReactNode;
  className?: string;
}

export function MobileDrawer({ id, title, children, className = "" }: MobileDrawerProps) {
  const handleClose = (e: React.MouseEvent) => {
    const dialog = e.currentTarget.closest('dialog') as HTMLDialogElement;
    dialog?.close();
  };

  return (
    <dialog 
      id={id} 
      className={`lg:hidden p-0 rounded-xl shadow-xl bg-[--background] border border-[--color-border] w-[90vw] max-w-sm ${className}`}
    >
      <div className="p-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium">{title}</span>
          <button 
            className="h-8 w-8 rounded-md border border-[--color-border]" 
            onClick={handleClose}
          >
            ✕
          </button>
        </div>
      </div>
      {children}
    </dialog>
  );
}
