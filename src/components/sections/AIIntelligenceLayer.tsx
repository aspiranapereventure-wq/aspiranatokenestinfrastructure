import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Brain, AlertTriangle, TrendingUp, Activity } from "lucide-react";

const LOG_LINES = [
  "[14:08:22] signal.scan  — RWA portfolio drift: 0.4σ",
  "[14:08:23] policy.match — MiCA Art.7 verified for 38 issuances",
  "[14:08:24] risk.eval   — sukuk-MY-04 yield spread → 2.1%",
  "[14:08:25] liquidity   — bridge MY↔CH at 18ms, capacity 92%",
  "[14:08:26] ai.signal   — recommend hedge: 7% to CHF custody",
  "[14:08:27] compliance  — VARA pathway: 12 issuers in review",
  "[14:08:28] settle.ok   — batch #18,442 routed in 1.6s",
];

const HEATMAP = Array.from({ length: 8 * 14 }, (_, i) => {
  const v = (Math.sin(i * 0.7) + 1) / 2;
  return v;
});

export default function AIIntelligenceLayer() {
  const [shown, setShown] = useState(1);
  useEffect(() => {
    const t = setInterval(() => setShown((s) => (s >= LOG_LINES.length ? 1 : s + 1)), 900);
    return () => clearInterval(t);
  }, []);

  return (
    <section id="intelligence" className="relative py-24 sm:py-32" style={{ background: "#07111F" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 grid gap-6 lg:grid-cols-[1fr_1.3fr]"
        >
          <div>
            <span className="mb-3 inline-block text-[11px] font-mono-tab tracking-[0.25em]" style={{ color: "var(--gold)" }}>
              05 · INTELLIGENCE LAYER
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ color: "var(--text)" }}>
              An AI co-pilot for sovereign portfolios.
            </h2>
            <p className="mt-4 max-w-xl" style={{ color: "var(--text-muted)" }}>
              The intelligence layer continuously monitors portfolio drift, jurisdictional exposure, and policy events — surfacing actionable signals before risk crystallizes.
            </p>
            <div className="mt-8 grid grid-cols-2 gap-3">
              {[
                { Icon: Brain, l: "Signals / day", v: "1,284" },
                { Icon: AlertTriangle, l: "Risk flags", v: "07" },
                { Icon: TrendingUp, l: "Alpha capture", v: "+3.4%" },
                { Icon: Activity, l: "Models live", v: "12" },
              ].map((s) => (
                <div key={s.l} className="rounded-lg border p-3" style={{ background: "rgba(19,34,56,0.55)", borderColor: "rgba(212,175,55,0.12)" }}>
                  <s.Icon className="h-4 w-4" style={{ color: "var(--gold)" }} />
                  <p className="mt-2 text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--text-muted)" }}>{s.l}</p>
                  <p className="mt-1 text-xl font-bold font-mono-tab" style={{ color: "var(--text)" }}>{s.v}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-4">
            {/* Terminal */}
            <div className="rounded-2xl border p-4 font-mono-tab" style={{ background: "rgba(6,14,26,0.95)", borderColor: "rgba(212,175,55,0.15)" }}>
              <div className="flex items-center justify-between border-b pb-2" style={{ borderColor: "rgba(212,175,55,0.1)" }}>
                <div className="flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full" style={{ background: "#ef4444" }} />
                  <span className="h-2 w-2 rounded-full" style={{ background: "#eab308" }} />
                  <span className="h-2 w-2 rounded-full" style={{ background: "#22c55e" }} />
                </div>
                <span className="text-[10px] tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>tokenest.ai // terminal</span>
              </div>
              <div className="mt-3 space-y-1 text-[12px]" style={{ color: "var(--text)" }}>
                {LOG_LINES.slice(0, shown).map((l, i) => (
                  <div key={i} style={{ color: i === shown - 1 ? "var(--gold)" : "var(--text-muted)" }}>
                    {l}
                  </div>
                ))}
                <div className="inline-block h-3 w-1.5 animate-pulse-dot align-middle" style={{ background: "var(--gold)" }} />
              </div>
            </div>

            {/* Heatmap */}
            <div className="rounded-2xl border p-4" style={{ background: "rgba(19,34,56,0.5)", borderColor: "rgba(212,175,55,0.12)" }}>
              <div className="mb-3 flex items-center justify-between">
                <span className="text-[10px] font-mono-tab tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>EXPOSURE HEATMAP · 7d</span>
                <span className="text-[10px] font-mono-tab" style={{ color: "var(--gold)" }}>● LIVE</span>
              </div>
              <div className="grid grid-cols-14 gap-[3px]" style={{ gridTemplateColumns: "repeat(14, minmax(0, 1fr))" }}>
                {HEATMAP.map((v, i) => (
                  <div key={i} className="aspect-square rounded-sm"
                    style={{ background: `rgba(212,175,55,${0.1 + v * 0.7})` }} />
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}