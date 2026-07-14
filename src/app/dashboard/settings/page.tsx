import { getSession } from "@/lib/auth";
import { changePasswordAction, logoutAction } from "../actions";

export const dynamic = "force-dynamic";

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string; ok?: string }>;
}) {
  const session = await getSession();
  const { error, ok } = await searchParams;

  return (
    <div className="space-y-6 max-w-2xl">
      <div className="rounded-xl border border-[--color-border] bg-[--color-card] p-5">
        <h2 className="font-medium mb-4">Store</h2>
        <dl className="text-sm grid grid-cols-[140px_1fr] gap-y-2">
          <dt className="text-[--color-muted-foreground]">Legal name</dt>
          <dd>Type A House of Electronics (SL) Ltd.</dd>
          <dt className="text-[--color-muted-foreground]">Display name</dt>
          <dd>House of Electronics</dd>
          <dt className="text-[--color-muted-foreground]">Currency</dt>
          <dd>New Leone (NLe)</dd>
          <dt className="text-[--color-muted-foreground]">Location</dt>
          <dd>Freetown, Sierra Leone</dd>
          <dt className="text-[--color-muted-foreground]">Signed in as</dt>
          <dd>{session?.email}</dd>
        </dl>
      </div>

      <div className="rounded-xl border border-[--color-border] bg-[--color-card] p-5">
        <h2 className="font-medium mb-4">Change password</h2>
        {ok ? (
          <div className="mb-4 text-[13px] rounded-lg px-3 py-2" style={{ background: "color-mix(in oklab, #16a34a 12%, var(--background))", color: "#16a34a" }}>
            Password updated.
          </div>
        ) : null}
        {error ? (
          <div className="mb-4 text-[13px] rounded-lg px-3 py-2" style={{ background: "color-mix(in oklab, #dc2626 12%, var(--background))", color: "#dc2626" }}>
            {error === "wrong" ? "Current password is incorrect." : "New password must be at least 6 characters."}
          </div>
        ) : null}
        <form action={changePasswordAction} className="space-y-4">
          <label className="block">
            <span className="block text-sm font-medium mb-1">Current password</span>
            <input name="current" type="password" required className="w-full h-10 px-3 rounded-md bg-[--background] border border-[--color-border]" />
          </label>
          <label className="block">
            <span className="block text-sm font-medium mb-1">New password</span>
            <input name="next" type="password" required minLength={6} className="w-full h-10 px-3 rounded-md bg-[--background] border border-[--color-border]" />
          </label>
          <button type="submit" className="h-10 px-5 rounded-md font-semibold" style={{ background: "var(--accent)", color: "var(--accent-contrast)" }}>
            Update password
          </button>
        </form>
      </div>

      <div className="rounded-xl border border-[--color-border] bg-[--color-card] p-5 flex items-center justify-between">
        <div>
          <h2 className="font-medium">Session</h2>
          <p className="text-sm text-[--color-muted-foreground]">Sign out of the admin dashboard.</p>
        </div>
        <form action={logoutAction}>
          <button type="submit" className="h-10 px-5 rounded-md border border-[--color-border] hover:bg-[--color-muted]">Sign out</button>
        </form>
      </div>
    </div>
  );
}
