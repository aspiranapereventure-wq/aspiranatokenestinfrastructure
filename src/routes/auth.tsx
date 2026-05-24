import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import EcosystemPanel from "@/components/auth/EcosystemPanel";
import ParticleField from "@/components/auth/ParticleField";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Access Institutional Infrastructure — Aspirana Tokenest" },
      { name: "description", content: "Authenticated access to Aspirana Tokenest sovereign infrastructure layer." },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AuthPage,
});

const COUNTRIES = [
  "Malaysia","United Arab Emirates","Switzerland","Hong Kong","Singapore",
  "United Kingdom","United States","Saudi Arabia","Qatar","Indonesia",
  "Brunei","Japan","Germany","France","Other",
];

const ROLES = [
  "Institutional Investor","Family Office","Sovereign / Government","Asset Manager",
  "Compliance Officer","Banking Partner","Strategic Partner","Other",
];

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"login" | "signup" | "forgot">("signup");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState(COUNTRIES[0]);
  const [role, setRole] = useState(ROLES[0]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/" });
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (session) navigate({ to: "/" });
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            emailRedirectTo: window.location.origin,
            data: { full_name: fullName, country, role },
          },
        });
        if (error) throw error;
        setInfo("Verification email sent. Check your inbox to activate institutional access.");
      } else if (mode === "login") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: `${window.location.origin}/reset-password`,
        });
        if (error) throw error;
        setInfo("Password reset link sent. Check your email.");
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Authentication failed";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main
      className="relative grid min-h-screen grid-cols-1 overflow-hidden lg:grid-cols-2"
      style={{ background: "#07111F" }}
    >
      {/* Global background */}
      <ParticleField density={70} />
      <div className="pointer-events-none absolute inset-0 institutional-grid-live opacity-40" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 15% 30%, rgba(212,175,55,0.10), transparent 45%), radial-gradient(circle at 85% 70%, rgba(59,130,246,0.10), transparent 45%)",
        }}
      />

      {/* LEFT — Auth panel */}
      <section className="relative z-10 flex min-h-screen items-center justify-center px-4 py-10 sm:px-8 lg:border-r lg:border-[var(--gold-line)]">
        <div className="w-full max-w-[460px]">
        {/* Header */}
        <div className="mb-8 text-center">
          <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[var(--gold-line)] bg-[var(--surface)]/60 px-3 py-1 backdrop-blur-sm">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--status-green)] animate-pulse-dot" />
            <span className="font-mono-tab text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
              Secure Gateway · Tier I
            </span>
          </div>
          <div className="font-display text-2xl tracking-wide text-[var(--text)]">
            ASPIRANA <span className="text-gold italic">Tokenest</span>
          </div>
          <h1 className="mt-5 font-display text-3xl leading-tight text-[var(--text)] sm:text-4xl">
            Access Institutional
            <br />
            <span className="italic text-gold">Infrastructure</span>
          </h1>
          <p className="mt-3 text-sm text-[var(--text-muted)]">
            Unified gateway for tokenized real-world asset infrastructure, compliance, liquidity, and institutional intelligence.
          </p>
        </div>

        {/* Card */}
        <div className="relative rounded-xl border border-[var(--gold-line)] bg-[var(--surface)]/80 p-6 backdrop-blur-xl shadow-2xl">
          <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-[var(--gold)]/60 to-transparent" />

          {/* Mode toggle */}
          <div className="mb-5 grid grid-cols-2 gap-1 rounded-md border border-[var(--gold-line)] bg-[var(--bg-deep)] p-1">
            {(["signup", "login"] as const).map((m) => (
              <button
                key={m}
                type="button"
                onClick={() => { setMode(m); setError(null); setInfo(null); }}
                className={`rounded-[5px] py-2 text-xs font-medium uppercase tracking-[0.18em] transition-colors ${
                  mode === m
                    ? "bg-[var(--gold)] text-[var(--bg)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                {m === "signup" ? "Sign Up" : "Login"}
              </button>
            ))}
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            {mode === "signup" && (
              <>
                <Field label="Full Name">
                  <input
                    required
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Datuk Ahmad bin Abdullah"
                    className={inputCls}
                  />
                </Field>
                <Field label="Country">
                  <select value={country} onChange={(e) => setCountry(e.target.value)} className={inputCls}>
                    {COUNTRIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </Field>
                <Field label="Role">
                  <select value={role} onChange={(e) => setRole(e.target.value)} className={inputCls}>
                    {ROLES.map((r) => <option key={r} value={r}>{r}</option>)}
                  </select>
                </Field>
              </>
            )}

            <Field label="Email">
              <input
                required
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@institution.com"
                className={inputCls}
                autoComplete="email"
              />
            </Field>

            {mode !== "forgot" && (
              <Field label="Password">
                <input
                  required
                  type="password"
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className={inputCls}
                  autoComplete={mode === "signup" ? "new-password" : "current-password"}
                />
              </Field>
            )}

            {mode === "login" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => { setMode("forgot"); setError(null); setInfo(null); }}
                  className="font-mono-tab text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-gold"
                >
                  Forgot password?
                </button>
              </div>
            )}

            {mode === "forgot" && (
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => { setMode("login"); setError(null); setInfo(null); }}
                  className="font-mono-tab text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)] hover:text-gold"
                >
                  ← Back to login
                </button>
              </div>
            )}

            {error && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {error}
              </div>
            )}
            {info && (
              <div className="rounded-md border border-[var(--gold)]/30 bg-[var(--gold)]/5 px-3 py-2 text-xs text-gold">
                {info}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 w-full overflow-hidden rounded-md bg-[var(--gold)] py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--bg)] transition-all hover:bg-[var(--gold-dim)] disabled:opacity-60 glow-gold"
            >
              {loading
                ? "Authenticating…"
                : mode === "signup"
                ? "Request Access"
                : mode === "login"
                ? "Enter Infrastructure"
                : "Send Reset Link"}
            </button>
          </form>

          {/* Footer compliance */}
          <div className="mt-5 flex items-center justify-between border-t border-[var(--gold-line)] pt-4">
            <span className="font-mono-tab text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              AES-256 · TLS 1.3
            </span>
            <span className="font-mono-tab text-[10px] uppercase tracking-[0.18em] text-[var(--text-muted)]">
              VARA · SC · FINMA
            </span>
          </div>
        </div>

        <p className="mt-6 text-center text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)]">
          By proceeding you accept institutional terms of access
        </p>
        </div>
      </section>

      {/* RIGHT — Ecosystem panel */}
      <section className="relative z-10 hidden min-h-screen lg:block">
        <EcosystemPanel />
      </section>

      {/* Mobile ecosystem (compact) */}
      <section className="relative z-10 lg:hidden">
        <EcosystemPanel />
      </section>
    </main>
  );
}

const inputCls =
  "w-full rounded-md border border-[var(--gold-line)] bg-[var(--bg-deep)] px-3 py-2.5 text-sm text-[var(--text)] placeholder-[var(--text-muted)]/60 outline-none transition-colors focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono-tab text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">
        {label}
      </span>
      {children}
    </label>
  );
}