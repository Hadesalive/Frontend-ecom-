import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth";
import { DashboardShell } from "./_components/shell";

export default async function DashboardRootLayout({ children }: { children: React.ReactNode }) {
  const session = await getSession();
  if (!session) redirect("/login");
  return <DashboardShell>{children}</DashboardShell>;
}
