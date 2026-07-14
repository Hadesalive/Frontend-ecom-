"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { DashboardSidebar, defaultSidebarItems } from "../../(ui)/dashboard-sidebar";
import { DashboardLayout } from "@/components/Dashboard/dashboard-layout";
import { DashboardHeader } from "@/components/Dashboard/dashboard-header";
import { MobileDrawer } from "@/components/Dashboard/mobile-drawer";
import { ArrowRightOnRectangleIcon } from "@heroicons/react/24/outline";
import { logoutAction } from "../actions";

function titleFor(pathname: string): string {
  const match = defaultSidebarItems
    .filter((it) => pathname === it.href || pathname.startsWith(it.href + "/"))
    .sort((a, b) => b.href.length - a.href.length)[0];
  return match?.name ?? "Dashboard";
}

export function DashboardShell({ children }: { children: ReactNode }) {
  const pathname = usePathname() ?? "/dashboard";
  const title = titleFor(pathname);

  const openDrawer = () => {
    const el = document.getElementById("dashboard-drawer") as HTMLDialogElement | null;
    el?.showModal?.();
  };
  const closeDrawer = () => {
    (document.getElementById("dashboard-drawer") as HTMLDialogElement | null)?.close();
  };

  const headerActions = (
    <form action={logoutAction}>
      <button
        type="submit"
        className="inline-flex items-center gap-1.5 h-9 px-3 rounded-md border border-[--color-border] text-sm hover:bg-[--color-muted]"
      >
        <ArrowRightOnRectangleIcon className="h-4 w-4" />
        <span className="hidden sm:inline">Sign out</span>
      </button>
    </form>
  );

  return (
    <DashboardLayout
      sidebar={<DashboardSidebar />}
      header={<DashboardHeader title={title} onMenuClick={openDrawer} actions={headerActions} />}
      mobileDrawer={
        <MobileDrawer id="dashboard-drawer" title="Navigation">
          <DashboardSidebar drawer onNavigate={closeDrawer} />
        </MobileDrawer>
      }
    >
      {children}
    </DashboardLayout>
  );
}
