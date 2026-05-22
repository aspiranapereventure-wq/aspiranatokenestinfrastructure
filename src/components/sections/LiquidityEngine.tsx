import { motion } from "framer-motion";
import CountUp from "react-countup";
import { Activity, Zap, Layers } from "lucide-react";

const destinations = [
  { label: "Malaysia", y: 60 },
  { label: "Dubai", y: 130 },
  { label: "Switzerland", y: 200 },
  { label: "Hong Kong", y: 270 },
  { label: "London", y: 340 },
];

export default function LiquidityEngine() {
  return (
    <section id="liquidity" className="relative py-24 sm:py-32" style={{ background: "#08131F" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 grid gap-6 lg:grid-cols-[1fr_1.1fr]"
        >
          <div>
            <span className="mb-3 inline-block text-[11px] font-mono-tab tracking-[0.25em]" style={{ color: "var(--gold)" }}>
              02 · LIQUIDITY ENGINE
            </span>
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ color: "var(--text)" }}>
              Capital, routed at <span style={{ color: "var(--gold)" }}>institutional speed</span>.
            </h2>
            <p className="mt-4 max-w-xl text-base" style={{ color: "var(--text-muted)" }}>
              The routing engine continuously settles flow across five jurisdictions through ERC-3643 rails — matching liquidity to compliance windows in milliseconds.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {[
                { Icon: Activity, label: "Throughput / min", val: 1247, sfx: "" },
                { Icon: Zap, label: "Avg Settle", val: 1.8, sfx: "s" },
                { Icon: Layers, label: "Pools Online", val: 38, sfx: "" },
              ].map((s) => (
                <div key={s.label} className="rounded-lg border p-3" style={{ background: "rgba(19,34,56,0.55)", borderColor: "rgba(212,175,55,0.12)" }}>
                  <s.Icon className="h-4 w-4" style={{ color: "var(--gold)" }} />
                  <p className="mt-2 text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--text-muted)" }}>{s.label}</p>
                  <p className="mt-1 text-xl font-bold font-mono-tab" style={{ color: "var(--text)" }}>
                    <CountUp end={s.val} duration={2.4} decimals={s.val < 10 ? 1 : 0} suffix={s.sfx} />
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Routing SVG */}
          <div className="relative h-[420px] rounded-2xl border p-4"
            style={{ background: "rgba(10,22,37,0.7)", borderColor: "rgba(212,175,55,0.15)" }}>
            <div className="absolute left-4 top-3 text-[10px] font-mono-tab tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
              ROUTING MATRIX · LIVE
            </div>
            <svg viewBox="0 0 600 400" className="h-full w-full">
              {/* source */}
              <g>
                <circle cx="80" cy="200" r="22" fill="rgba(212,175,55,0.15)" stroke="#D4AF37" strokeWidth="1.5" />
                <circle cx="80" cy="200" r="6" fill="#D4AF37">
                  <animate attributeName="r" values="4;8;4" dur="2s" repeatCount="indefinite" />
                </circle>
                <text x="80" y="248" textAnchor="middle" fontSize="10" fill="#94A3B8" fontFamily="monospace" letterSpacing="2">SOURCE</text>
              </g>
              {destinations.map((d, i) => (
                <g key={d.label}>
                  <path
                    d={`M 102 200 C 250 200, 350 ${d.y}, 500 ${d.y}`}
                    stroke="rgba(212,175,55,0.25)"
                    strokeWidth="1"
                    fill="none"
                  />
                  <path
                    d={`M 102 200 C 250 200, 350 ${d.y}, 500 ${d.y}`}
                    stroke="#D4AF37"
                    strokeWidth="1.5"
                    fill="none"
                    strokeDasharray="4 10"
                    opacity="0.9"
                  >
                    <animate attributeName="stroke-dashoffset" from="0" to="-140" dur={`${2 + i * 0.3}s`} repeatCount="indefinite" />
                  </path>
                  <circle cx="500" cy={d.y} r="9" fill="rgba(34,197,94,0.18)" stroke="#22c55e" strokeWidth="1" />
                  <circle cx="500" cy={d.y} r="3" fill="#22c55e">
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="1.5s" repeatCount="indefinite" begin={`${i * 0.3}s`} />
                  </circle>
                  <text x="516" y={d.y + 3} fontSize="11" fill="#E8EEF7" fontFamily="monospace">{d.label}</text>
                </g>
              ))}
              <defs>
                <linearGradient id="grid-fade" x1="0" x2="1">
                  <stop offset="0%" stopColor="#D4AF37" stopOpacity="0" />
                  <stop offset="50%" stopColor="#D4AF37" stopOpacity="0.5" />
                  <stop offset="100%" stopColor="#D4AF37" stopOpacity="0" />
                </linearGradient>
              </defs>
              <line x1="0" y1="380" x2="600" y2="380" stroke="url(#grid-fade)" strokeWidth="1" />
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}