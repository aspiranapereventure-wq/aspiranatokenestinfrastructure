import { motion } from "framer-motion";
import { Landmark, Building2, HeartHandshake, Scale } from "lucide-react";

const pillars = [
  { icon: Landmark, title: "Sovereign Treasury Integration", desc: "Direct rails for sovereign wealth, central bank pilots, and state-linked treasury vehicles." },
  { icon: Building2, title: "Waqf & Endowment Infrastructure", desc: "Perpetual asset structures with Shariah-governed yield distribution and on-chain transparency." },
  { icon: HeartHandshake, title: "Government Partnerships", desc: "Bilateral frameworks with regulators across MENA, ASEAN, and EU jurisdictions." },
  { icon: Scale, title: "Public-Mandate Settlement", desc: "Settlement rails authorized for institutional and public-mandate flows of capital." },
];

export default function SovereignExpansion() {
  return (
    <section id="sovereign" className="relative py-24 sm:py-32" style={{ background: "#060E1A" }}>
      <div className="absolute inset-0" style={{
        background: "radial-gradient(circle at 80% 30%, rgba(212,175,55,0.10), transparent 55%), radial-gradient(circle at 10% 80%, rgba(59,130,246,0.06), transparent 55%)",
      }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 max-w-3xl"
        >
          <span className="mb-3 inline-block text-[11px] font-mono-tab tracking-[0.25em]" style={{ color: "var(--gold)" }}>
            09 · SOVEREIGN EXPANSION
          </span>
          <h2 className="font-display text-4xl font-medium tracking-tight sm:text-5xl lg:text-6xl" style={{ color: "var(--text)" }}>
            Built for <span className="italic" style={{ color: "var(--gold)" }}>sovereign-scale</span> capital.
          </h2>
          <p className="mt-5 text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-muted)" }}>
            Aspirana Tokenest extends beyond markets — it is engineered as national infrastructure for treasuries, waqf endowments, and bilateral capital corridors.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2">
          {pillars.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.55, delay: i * 0.1 }}
              whileHover={{ y: -3 }}
              className="group relative overflow-hidden rounded-2xl border p-7 transition-colors hover:border-gold"
              style={{ background: "rgba(14,27,46,0.7)", borderColor: "rgba(212,175,55,0.1)" }}
            >
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-700 group-hover:opacity-100" style={{ background: "rgba(212,175,55,0.2)" }} />
              <div className="relative flex items-start gap-4">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg border" style={{ background: "rgba(212,175,55,0.08)", borderColor: "rgba(212,175,55,0.2)" }}>
                  <p.icon className="h-5 w-5" style={{ color: "var(--gold)" }} />
                </div>
                <div>
                  <h3 className="font-display text-2xl font-medium" style={{ color: "var(--text)" }}>{p.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>{p.desc}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}