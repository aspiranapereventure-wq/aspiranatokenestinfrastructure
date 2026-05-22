import { motion } from "framer-motion";
import {
  Building, Landmark, TreePine, Gem, Ship, Factory,
  TrendingUp, Award, BarChart3, Receipt, Briefcase, Cpu,
} from "lucide-react";

const assets = [
  { icon: Building, title: "Real Estate", desc: "Institutional-grade tokenized property portfolios with fractional ownership structures." },
  { icon: Landmark, title: "Sukuk", desc: "Shariah-compliant yield infrastructure for Islamic capital markets." },
  { icon: TreePine, title: "Carbon Credits", desc: "ESG-linked environmental markets with verified offset tracking." },
  { icon: Gem, title: "Precious Metals", desc: "Digitally-backed gold, silver, and precious commodity vault receipts." },
  { icon: Ship, title: "Maritime Assets", desc: "Tokenized shipping vessels, containers, and port infrastructure." },
  { icon: Factory, title: "Commodities", desc: "Agricultural, energy, and raw material supply chain tokens." },
  { icon: TrendingUp, title: "Equity Securities", desc: "Private equity and venture stakes with automated cap-table management." },
  { icon: Award, title: "IP & Royalties", desc: "Intellectual property rights and recurring revenue stream tokens." },
  { icon: BarChart3, title: "Derivatives", desc: "Structured products, options, and synthetic exposure instruments." },
  { icon: Receipt, title: "Trade Finance", desc: "Invoice factoring, purchase orders, and supply-chain financing." },
  { icon: Briefcase, title: "Fund Units", desc: "Hedge fund, REIT, and collective investment scheme tokens." },
  { icon: Cpu, title: "Digital Infrastructure", desc: "Data centers, fiber assets, and compute resource tokenization." },
];

export default function AssetEcosystem() {
  return (
    <section id="assets" className="relative py-24 sm:py-32" style={{ background: "#0A1625" }}>
      <div className="absolute top-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to bottom, #07111F, transparent)" }} />
      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-14 text-center"
        >
          <span className="mb-3 inline-block text-[11px] font-mono-tab tracking-[0.25em]" style={{ color: "var(--gold)" }}>
            04 · ASSET UNIVERSE
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ color: "var(--text)" }}>
            Universal Asset Infrastructure
          </h2>
          <p className="mx-auto mt-4 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Twelve asset families supported by unified tokenization engines, compliance oracles, and cross-border settlement rails.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {assets.map((a, i) => (
            <motion.div
              key={a.title}
              initial={{ opacity: 0, y: 22 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-30px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-xl border p-5 backdrop-blur-sm transition-colors duration-300 hover:border-gold"
              style={{ background: "rgba(19,34,56,0.4)", borderColor: "rgba(212,175,55,0.08)" }}
            >
              <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(212,175,55,0.1), transparent 70%)" }} />
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: "rgba(212,175,55,0.1)" }}>
                  <a.icon className="h-5 w-5" style={{ color: "var(--gold)" }} />
                </div>
                <h3 className="mt-3 text-sm font-semibold" style={{ color: "var(--text)" }}>{a.title}</h3>
                <p className="mt-1 text-xs leading-relaxed" style={{ color: "var(--text-muted)" }}>{a.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}