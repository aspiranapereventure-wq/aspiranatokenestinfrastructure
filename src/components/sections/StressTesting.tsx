import { useEffect, useRef } from "react";
import { motion } from "framer-motion";

function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function MonteCarloChart() {
  const ref = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = canvas.clientWidth;
    const h = canvas.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.scale(dpr, dpr);

    ctx.clearRect(0, 0, w, h);
    // grid
    ctx.strokeStyle = "rgba(212,175,55,0.06)";
    ctx.lineWidth = 1;
    for (let i = 0; i <= 8; i++) {
      const y = (h / 8) * i;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y);
      ctx.stroke();
    }

    const paths = 250;
    const steps = 120;
    const rng = mulberry32(42);
    const start = h * 0.5;

    // paths
    for (let p = 0; p < paths; p++) {
      ctx.beginPath();
      let v = start;
      ctx.moveTo(0, v);
      const drift = (rng() - 0.5) * 0.4;
      for (let s = 1; s <= steps; s++) {
        v += (rng() - 0.5) * 8 + drift;
        const x = (w / steps) * s;
        ctx.lineTo(x, v);
      }
      const alpha = 0.05 + rng() * 0.05;
      ctx.strokeStyle = `rgba(212,175,55,${alpha})`;
      ctx.lineWidth = 0.8;
      ctx.stroke();
    }

    // median line
    ctx.beginPath();
    let v = start;
    ctx.moveTo(0, v);
    for (let s = 1; s <= steps; s++) {
      v += Math.sin(s * 0.08) * 1.2;
      ctx.lineTo((w / steps) * s, v);
    }
    ctx.strokeStyle = "#D4AF37";
    ctx.lineWidth = 1.6;
    ctx.stroke();
  }, []);
  return <canvas ref={ref} className="h-[300px] w-full" />;
}

export default function StressTesting() {
  return (
    <section id="stress" className="relative py-24 sm:py-32" style={{ background: "#08131F" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-10 grid gap-6 lg:grid-cols-[1fr_1.3fr] lg:items-center"
        >
          <div>
            <span className="mb-3 inline-block text-[11px] font-mono-tab tracking-[0.25em]" style={{ color: "var(--gold)" }}>
              06 · STRESS TESTING
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ color: "var(--text)" }}>
              Monte Carlo simulation, at portfolio scale.
            </h2>
            <p className="mt-4 max-w-xl" style={{ color: "var(--text-muted)" }}>
              10,000 simulated scenarios run nightly across every tokenized issuance — surfacing tail risk, drawdown corridors, and liquidity bottlenecks before they reach institutional desks.
            </p>
            <div className="mt-6 space-y-2">
              {[
                { l: "95% Confidence Band", v: "±4.2%" },
                { l: "99% VaR (24h)", v: "−1.8%" },
                { l: "Expected Shortfall", v: "−2.6%" },
                { l: "Max Drawdown Sim.", v: "−7.4%" },
              ].map((s) => (
                <div key={s.l} className="flex justify-between border-b pb-2 text-sm" style={{ borderColor: "rgba(212,175,55,0.08)" }}>
                  <span style={{ color: "var(--text-muted)" }}>{s.l}</span>
                  <span className="font-mono-tab" style={{ color: "var(--text)" }}>{s.v}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="rounded-2xl border p-4" style={{ background: "rgba(10,22,37,0.7)", borderColor: "rgba(212,175,55,0.15)" }}>
            <div className="mb-2 flex items-center justify-between">
              <span className="text-[10px] font-mono-tab tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>
                MONTE CARLO · 250 SHOWN / 10,000 RUN
              </span>
              <span className="text-[10px] font-mono-tab" style={{ color: "var(--gold)" }}>MEDIAN</span>
            </div>
            <MonteCarloChart />
          </div>
        </motion.div>
      </div>
    </section>
  );
}