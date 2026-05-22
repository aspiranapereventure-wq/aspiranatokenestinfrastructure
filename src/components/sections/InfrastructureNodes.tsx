import { motion } from "framer-motion";
import { MapPin, Wifi, Clock } from "lucide-react";

const nodes = [
  { city: "Malaysia", role: "Headquarters & Regulatory Hub", status: "Active", latency: "4ms", flag: "🇲🇾" },
  { city: "Dubai", role: "MENA Expansion Node", status: "Active", latency: "12ms", flag: "🇦🇪" },
  { city: "Switzerland", role: "European Custody & Banking", status: "Active", latency: "18ms", flag: "🇨🇭" },
  { city: "Hong Kong", role: "APAC Liquidity Center", status: "Active", latency: "22ms", flag: "🇭🇰" },
  { city: "London", role: "Global Institutional Sales", status: "Active", latency: "28ms", flag: "🇬🇧" },
];

export default function InfrastructureNodes() {
  return (
    <section id="infrastructure" className="relative py-24 sm:py-32" style={{ background: "#07111F" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7 }}
          className="mb-16 text-center"
        >
          <span className="mb-3 inline-block text-[11px] font-mono-tab tracking-[0.25em]" style={{ color: "var(--gold)" }}>
            01 · GLOBAL PRESENCE
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ color: "var(--text)" }}>
            Cross-Border Infrastructure Nodes
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-base" style={{ color: "var(--text-muted)" }}>
            Distributed compliance and liquidity infrastructure operating across five strategic jurisdictions, enabling seamless cross-border asset tokenization and settlement.
          </p>
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {nodes.map((n, i) => (
            <motion.div
              key={n.city}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -4 }}
              className="group relative rounded-xl border p-6 backdrop-blur-sm transition-colors duration-300 hover:border-gold"
              style={{ background: "rgba(19,34,56,0.5)", borderColor: "rgba(212,175,55,0.1)" }}
            >
              <div className="absolute inset-0 rounded-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                style={{ background: "radial-gradient(circle at 50% 0%, rgba(212,175,55,0.12), transparent 70%)" }} />
              <div className="relative">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg" style={{ background: "rgba(212,175,55,0.1)" }}>
                      <MapPin className="h-5 w-5" style={{ color: "var(--gold)" }} />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold" style={{ color: "var(--text)" }}>{n.city}</h3>
                      <p className="text-xs" style={{ color: "var(--text-muted)" }}>{n.role}</p>
                    </div>
                  </div>
                  <span className="text-2xl">{n.flag}</span>
                </div>
                <div className="mt-4 flex items-center gap-4 border-t pt-4" style={{ borderColor: "rgba(212,175,55,0.08)" }}>
                  <div className="flex items-center gap-1.5">
                    <Wifi className="h-3.5 w-3.5" style={{ color: "var(--status-green)" }} />
                    <span className="text-[11px] font-medium font-mono-tab" style={{ color: "var(--status-green)" }}>{n.status.toUpperCase()}</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Clock className="h-3.5 w-3.5" style={{ color: "var(--text-muted)" }} />
                    <span className="text-[11px] font-mono-tab" style={{ color: "var(--text-muted)" }}>{n.latency}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="relative hidden rounded-xl border p-6 sm:block"
            style={{
              background: "rgba(19,34,56,0.3)",
              borderColor: "rgba(212,175,55,0.15)",
              backgroundImage:
                "radial-gradient(circle at 30% 40%, rgba(212,175,55,0.08) 0%, transparent 50%), radial-gradient(circle at 70% 60%, rgba(59,130,246,0.06) 0%, transparent 50%)",
            }}
          >
            <div className="flex h-full flex-col items-center justify-center text-center">
              <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" className="opacity-70" style={{ color: "var(--gold)" }}>
                <circle cx="12" cy="12" r="10" />
                <path d="M2 12h20" />
                <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
              </svg>
              <p className="mt-3 text-[11px] font-mono-tab tracking-[0.25em]" style={{ color: "var(--gold)" }}>5 ACTIVE NODES</p>
              <p className="mt-1 text-[11px]" style={{ color: "var(--text-muted)" }}>Global mesh · 99.998% uptime</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}