import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import ParticleField from "@/components/auth/ParticleField";

export const Route = createFileRoute("/reset-password")({
  head: () => ({
    meta: [
      { title: "Reset Password — Aspirana Tokenest" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ResetPasswordPage,
});

function ResetPasswordPage() {
  const navigate = useNavigate();
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Supabase exchanges recovery token automatically on this URL via hash
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event) => {
      if (event === "PASSWORD_RECOVERY" || event === "SIGNED_IN") setReady(true);
    });
    supabase.auth.getSession().then(({ data }) => { if (data.session) setReady(true); });
    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (password !== confirm) { setError("Passwords do not match"); return; }
    setLoading(true);
    try {
      const { error } = await supabase.auth.updateUser({ password });
      if (error) throw error;
      navigate({ to: "/" });
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "Failed to reset password");
    } finally { setLoading(false); }
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10" style={{ background: "#07111F" }}>
      <ParticleField density={50} />
      <div className="pointer-events-none absolute inset-0 institutional-grid-live opacity-40" />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold)]/10 blur-[120px] animate-pulse-glow" />

      <div className="relative z-10 w-full max-w-[440px]">
        <div className="mb-6 text-center">
          <div className="font-display text-2xl tracking-wide text-[var(--text)]">
            ASPIRANA <span className="text-gold italic">Tokenest</span>
          </div>
          <h1 className="mt-4 font-display text-3xl text-[var(--text)]">
            Reset <span className="italic text-gold">Credentials</span>
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">
            Set a new institutional access password.
          </p>
        </div>

        <div className="rounded-xl border border-[var(--gold-line)] bg-[var(--surface)]/80 p-6 backdrop-blur-xl">
          {!ready ? (
            <p className="text-center text-sm text-[var(--text-muted)]">Verifying recovery link…</p>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3">
              <label className="block">
                <span className="mb-1.5 block font-mono-tab text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">New Password</span>
                <input required type="password" minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} autoComplete="new-password" />
              </label>
              <label className="block">
                <span className="mb-1.5 block font-mono-tab text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">Confirm Password</span>
                <input required type="password" minLength={8} value={confirm} onChange={(e) => setConfirm(e.target.value)} className={inputCls} autoComplete="new-password" />
              </label>
              {error && (
                <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">{error}</div>
              )}
              <button type="submit" disabled={loading} className="w-full rounded-md bg-[var(--gold)] py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--bg)] hover:bg-[var(--gold-dim)] disabled:opacity-60 glow-gold">
                {loading ? "Updating…" : "Update Password"}
              </button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

const inputCls =
  "w-full rounded-md border border-[var(--gold-line)] bg-[var(--bg-deep)] px-3 py-2.5 text-sm text-[var(--text)] placeholder-[var(--text-muted)]/60 outline-none transition-colors focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/40";