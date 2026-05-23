import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";

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
  const [mode, setMode] = useState<"login" | "signup">("signup");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
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
      className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 py-10"
      style={{ background: "#07111F" }}
    >
      {/* Animated background */}
      <div className="pointer-events-none absolute inset-0 institutional-grid-live opacity-60" />
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(212,175,55,0.10), transparent 45%), radial-gradient(circle at 80% 70%, rgba(59,130,246,0.10), transparent 45%)",
        }}
      />
      <div className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--gold)]/10 blur-[120px] animate-pulse-glow" />

      <div className="relative z-10 w-full max-w-[460px]">
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
            Authenticated access for sovereign, institutional and strategic counterparties.
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
                onClick={() => { setMode(m); setError(null); }}
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

            {error && (
              <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="group relative mt-2 w-full overflow-hidden rounded-md bg-[var(--gold)] py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--bg)] transition-all hover:bg-[var(--gold-dim)] disabled:opacity-60 glow-gold"
            >
              {loading ? "Authenticating…" : mode === "signup" ? "Request Access" : "Enter Infrastructure"}
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