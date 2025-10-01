import { ReactNode } from "react";

interface DashboardLayoutProps {
  sidebar: ReactNode;
  header: ReactNode;
  children: ReactNode;
  mobileDrawer?: ReactNode;
  className?: string;
}

export function DashboardLayout({ 
  sidebar, 
  header, 
  children, 
  mobileDrawer,
  className = "" 
}: DashboardLayoutProps) {
  return (
    <div className={`py-6 ${className}`}>
      <div className="grid grid-cols-1 lg:grid-cols-[240px_1fr] gap-0 lg:gap-0 items-start">
        {/* Left Sidebar (desktop) */}
        <div className="hidden lg:block">
          {sidebar}
        </div>
        
        {/* Main Column */}
        <main className="space-y-8 px-4 md:px-8 lg:px-10">
          {header}
          {children}
        </main>
      </div>
      
      {/* Mobile drawer */}
      {mobileDrawer}
    </div>
  );
}
