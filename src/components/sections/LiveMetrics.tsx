import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Activity, Globe2, Users, Waves, Cpu, ShieldCheck } from "lucide-react";

const metrics = [
  { icon: Activity, label: "Tokenized Assets", value: 2.4, prefix: "RM ", suffix: "B", decimals: 1 },
  { icon: Users, label: "Institutional Participants", value: 142, prefix: "", suffix: "", decimals: 0 },
  { icon: Globe2, label: "Jurisdictions Connected", value: 5, prefix: "", suffix: "", decimals: 0 },
  { icon: Waves, label: "Liquidity Processed", value: 184, prefix: "RM ", suffix: "M", decimals: 0 },
  { icon: Cpu, label: "AI Nodes Online", value: 38, prefix: "", suffix: "", decimals: 0 },
  { icon: ShieldCheck, label: "Compliance Sync", value: 99.998, prefix: "", suffix: "%", decimals: 3 },
];

export default function LiveMetrics() {
  return (
    <section id="metrics" className="relative py-24 sm:py-28" style={{ background: "#07111F" }}>
      <div className="absolute inset-0 institutional-grid-live opacity-30" />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          className="mb-12 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end"
        >
          <div>
            <span className="mb-3 inline-block text-[11px] font-mono-tab tracking-[0.25em]" style={{ color: "var(--gold)" }}>
              02 · OPERATIONAL TELEMETRY
            </span>
            <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl" style={{ color: "var(--text)" }}>
              Live Institutional Throughput
            </h2>
          </div>
          <div className="flex items-center gap-2 rounded-full border px-3 py-1.5"
            style={{ borderColor: "rgba(34,197,94,0.3)", background: "rgba(34,197,94,0.06)" }}>
            <span className="h-1.5 w-1.5 rounded-full animate-pulse-dot" style={{ background: "var(--status-green)" }} />
            <span className="text-[10px] font-mono-tab tracking-[0.22em]" style={{ color: "var(--status-green)" }}>
              STREAM · LIVE
            </span>
          </div>
        </motion.div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="group relative overflow-hidden rounded-xl border p-6 backdrop-blur-sm transition-colors hover:border-gold"
              style={{ background: "rgba(19,34,56,0.55)", borderColor: "rgba(212,175,55,0.12)" }}
            >
              <div className="absolute inset-x-0 top-0 h-px" style={{ background: "linear-gradient(90deg, transparent, rgba(212,175,55,0.5), transparent)" }} />
              <div className="flex items-center justify-between">
                <div className="flex h-9 w-9 items-center justify-center rounded-md" style={{ background: "rgba(212,175,55,0.1)" }}>
                  <m.icon className="h-4 w-4" style={{ color: "var(--gold)" }} />
                </div>
                <span className="text-[10px] font-mono-tab tracking-[0.2em] animate-counter-tick" style={{ color: "var(--status-green)" }}>
                  ● LIVE
                </span>
              </div>
              <p className="mt-5 text-[10px] tracking-[0.2em] uppercase" style={{ color: "var(--text-muted)" }}>
                {m.label}
              </p>
              <p className="mt-2 text-3xl font-bold font-mono-tab" style={{ color: "var(--text)" }}>
                <CountUp end={m.value} duration={2.6} delay={0.2 + i * 0.08} decimals={m.decimals} prefix={m.prefix} suffix={m.suffix} separator="," />
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}