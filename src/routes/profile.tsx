import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useUserRole } from "@/hooks/useUserRole";
import ParticleField from "@/components/auth/ParticleField";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export const Route = createFileRoute("/profile")({
  head: () => ({
    meta: [
      { title: "Institutional Profile — Aspirana Tokenest" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: ProfilePage,
});

const COUNTRIES = ["Malaysia","United Arab Emirates","Switzerland","Hong Kong","Singapore","United Kingdom","United States","Saudi Arabia","Qatar","Indonesia","Brunei","Japan","Germany","France","Other"];
const ROLES = ["Institutional Investor","Family Office","Sovereign / Government","Asset Manager","Compliance Officer","Banking Partner","Strategic Partner","Other"];

function ProfilePage() {
  const navigate = useNavigate();
  const { roles } = useUserRole();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [fullName, setFullName] = useState("");
  const [country, setCountry] = useState("");
  const [role, setRole] = useState("");

  useEffect(() => {
    const load = async () => {
      const { data: sess } = await supabase.auth.getSession();
      if (!sess.session) { navigate({ to: "/auth" }); return; }
      const uid = sess.session.user.id;
      const { data, error } = await supabase.from("profiles").select("*").eq("id", uid).maybeSingle();
      if (error) setError(error.message);
      if (data) {
        setEmail(data.email ?? "");
        setFullName(data.full_name ?? "");
        setCountry(data.country ?? COUNTRIES[0]);
        setRole(data.role ?? ROLES[0]);
      }
      setLoading(false);
    };
    load();
  }, [navigate]);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true); setError(null); setInfo(null);
    const { data: sess } = await supabase.auth.getSession();
    const uid = sess.session?.user.id;
    if (!uid) { setError("Session expired"); setSaving(false); return; }
    const { error } = await supabase.from("profiles").update({
      full_name: fullName, country, role, updated_at: new Date().toISOString(),
    }).eq("id", uid);
    if (error) setError(error.message); else setInfo("Profile saved.");
    setSaving(false);
  };

  return (
    <main className="relative min-h-screen overflow-hidden" style={{ background: "#07111F" }}>
      <ParticleField density={40} />
      <div className="pointer-events-none absolute inset-0 institutional-grid-live opacity-30" />

      <div className="relative z-10 mx-auto max-w-2xl px-4 py-12 sm:px-6">
        <Link to="/" className="mb-6 inline-flex items-center gap-2 font-mono-tab text-[10px] uppercase tracking-[0.22em] text-[var(--text-muted)] hover:text-gold">
          <ArrowLeft className="h-3 w-3" /> Back to Infrastructure
        </Link>

        <div className="mb-6">
          <h1 className="font-display text-3xl text-[var(--text)] sm:text-4xl">
            Institutional <span className="italic text-gold">Profile</span>
          </h1>
          <p className="mt-2 text-sm text-[var(--text-muted)]">Manage your counterparty identity and access metadata.</p>
        </div>

        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-[var(--gold-line)] bg-[var(--surface)]/70 px-3 py-1.5 backdrop-blur-sm">
          <ShieldCheck className="h-3.5 w-3.5 text-gold" />
          <span className="font-mono-tab text-[10px] uppercase tracking-[0.22em] text-[var(--text)]">
            Access Tier: {roles.length ? roles.join(" · ") : "investor"}
          </span>
        </div>

        <form onSubmit={handleSave} className="rounded-xl border border-[var(--gold-line)] bg-[var(--surface)]/80 p-6 backdrop-blur-xl space-y-4">
          {loading ? (
            <p className="text-sm text-[var(--text-muted)]">Loading…</p>
          ) : (
            <>
              <Field label="Email (read-only)">
                <input value={email} disabled className={inputCls + " opacity-60"} />
              </Field>
              <Field label="Full Name">
                <input required value={fullName} onChange={(e) => setFullName(e.target.value)} className={inputCls} />
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
              {error && <div className="rounded-md border border-red-500/30 bg-red-500/10 px-3 py-2 text-xs text-red-300">{error}</div>}
              {info && <div className="rounded-md border border-[var(--gold)]/30 bg-[var(--gold)]/5 px-3 py-2 text-xs text-gold">{info}</div>}
              <button type="submit" disabled={saving} className="w-full rounded-md bg-[var(--gold)] py-3 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--bg)] hover:bg-[var(--gold-dim)] disabled:opacity-60 glow-gold">
                {saving ? "Saving…" : "Save Profile"}
              </button>
            </>
          )}
        </form>
      </div>
    </main>
  );
}

const inputCls =
  "w-full rounded-md border border-[var(--gold-line)] bg-[var(--bg-deep)] px-3 py-2.5 text-sm text-[var(--text)] outline-none transition-colors focus:border-[var(--gold)] focus:ring-1 focus:ring-[var(--gold)]/40";

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono-tab text-[10px] uppercase tracking-[0.2em] text-[var(--text-muted)]">{label}</span>
      {children}
    </label>
  );
}