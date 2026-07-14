import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { verifyPassword, startSession, getSession } from "@/lib/auth";
import { BrandLogo } from "../(ui)/components";

async function login(formData: FormData) {
  "use server";
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const user = await prisma.adminUser.findUnique({ where: { email } });
  if (!user || !verifyPassword(password, user.passwordHash)) {
    redirect("/login?error=1");
  }
  await startSession(email);
  redirect("/dashboard");
}

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  if (await getSession()) redirect("/dashboard");
  const { error } = await searchParams;

  return (
    <main className="min-h-screen flex items-center justify-center px-4" style={{ background: "var(--background)" }}>
      <div className="w-full max-w-sm">
        <div className="flex justify-center mb-8">
          <Link href="/" aria-label="House of Electronics">
            <BrandLogo markClassName="h-14 w-auto" />
          </Link>
        </div>
        <div className="elevated p-6 sm:p-8">
          <h1 className="text-xl font-semibold text-center">Admin sign in</h1>
          <p className="text-[13px] text-[--color-muted-foreground] text-center mt-1 mb-6">
            Sign in to manage House of Electronics.
          </p>
          {error ? (
            <div
              className="mb-4 text-[13px] rounded-lg px-3 py-2"
              style={{ background: "color-mix(in oklab, #dc2626 12%, var(--background))", color: "#dc2626" }}
            >
              Invalid email or password.
            </div>
          ) : null}
          <form action={login} className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium mb-1">Email</label>
              <input
                id="email" name="email" type="email" required autoComplete="username"
                defaultValue="admin@houseofelectronics.sl"
                className="w-full h-11 px-3 rounded-lg bg-[--color-card] border border-[--color-border] focus:outline-none focus:border-[--accent]"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium mb-1">Password</label>
              <input
                id="password" name="password" type="password" required autoComplete="current-password"
                className="w-full h-11 px-3 rounded-lg bg-[--color-card] border border-[--color-border] focus:outline-none focus:border-[--accent]"
              />
            </div>
            <button
              type="submit"
              className="w-full h-11 rounded-lg font-semibold"
              style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}
            >
              Sign in
            </button>
          </form>
        </div>
        <p className="text-center text-[12px] text-[--color-muted-foreground] mt-4">
          <Link href="/" className="hover:text-[--color-foreground]">← Back to store</Link>
        </p>
      </div>
    </main>
  );
}
