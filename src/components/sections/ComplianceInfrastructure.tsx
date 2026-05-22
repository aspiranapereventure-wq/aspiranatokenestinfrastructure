import { motion } from "framer-motion";
import { ShieldCheck, FileCheck, Globe, Scale, Lock } from "lucide-react";

const nodes = [
  { id: "kyc", label: "KYC / KYB", icon: ShieldCheck, x: 50, y: 18 },
  { id: "aml", label: "AML Oracle", icon: Lock, x: 84, y: 38 },
  { id: "mica", label: "MiCA Engine", icon: FileCheck, x: 78, y: 76 },
  { id: "vara", label: "VARA Pathway", icon: Scale, x: 22, y: 76 },
  { id: "erc", label: "ERC-3643 Registry", icon: Globe, x: 16, y: 38 },
];

const edges: [string, string][] = [
  ["kyc", "aml"], ["kyc", "erc"], ["aml", "mica"], ["mica", "vara"], ["vara", "erc"],
  ["kyc", "mica"], ["aml", "vara"],
];

export default function ComplianceInfrastructure() {
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));
  return (
    <section id="compliance" className="relative py-24 sm:py-32" style={{ background: "#07111F" }}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 text-center"
        >
          <span className="mb-3 inline-block text-[11px] font-mono-tab tracking-[0.25em]" style={{ color: "var(--gold)" }}>
            03 · COMPLIANCE INFRASTRUCTURE
          </span>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl" style={{ color: "var(--text)" }}>
            A regulator-grade compliance mesh.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl" style={{ color: "var(--text-muted)" }}>
            Five compliance primitives operate as a single mesh — every transaction is verified against jurisdiction-specific policy before it ever touches the settlement layer.
          </p>
        </motion.div>

        <div className="grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          {/* Graph */}
          <div className="relative h-[440px] overflow-hidden rounded-2xl border p-4"
            style={{ background: "rgba(10,22,37,0.7)", borderColor: "rgba(212,175,55,0.15)" }}>
            <div className="absolute left-4 top-3 text-[10px] font-mono-tab tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
              POLICY MESH · 2,847 CHECKS/MIN
            </div>
            <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
              {edges.map(([a, b], i) => {
                const A = byId[a], B = byId[b];
                return (
                  <line key={i} x1={A.x} y1={A.y} x2={B.x} y2={B.y}
                    stroke="rgba(212,175,55,0.3)" strokeWidth="0.18"
                    strokeDasharray="0.6 1.2">
                    <animate attributeName="stroke-dashoffset" from="0" to="-6" dur={`${3 + i * 0.2}s`} repeatCount="indefinite" />
                  </line>
                );
              })}
            </svg>
            {nodes.map((n, i) => (
              <motion.div
                key={n.id}
                initial={{ opacity: 0, scale: 0.6 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${n.x}%`, top: `${n.y}%` }}
              >
                <div className="relative flex flex-col items-center gap-2">
                  <div className="absolute -inset-3 rounded-full animate-pulse-glow" style={{ background: "rgba(212,175,55,0.18)", filter: "blur(8px)" }} />
                  <div className="relative flex h-12 w-12 items-center justify-center rounded-full border"
                    style={{ background: "rgba(19,34,56,0.95)", borderColor: "var(--gold)" }}>
                    <n.icon className="h-5 w-5" style={{ color: "var(--gold)" }} />
                  </div>
                  <span className="rounded border px-2 py-0.5 text-[10px] font-mono-tab tracking-[0.15em] whitespace-nowrap"
                    style={{ background: "rgba(7,17,31,0.9)", borderColor: "rgba(212,175,55,0.2)", color: "var(--text)" }}>
                    {n.label}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Status panel */}
          <div className="rounded-2xl border p-6" style={{ background: "rgba(19,34,56,0.5)", borderColor: "rgba(212,175,55,0.12)" }}>
            <p className="text-[10px] font-mono-tab tracking-[0.22em]" style={{ color: "var(--text-muted)" }}>POLICY STATUS</p>
            <div className="mt-5 space-y-4">
              {[
                { l: "MiCA", v: "READY", c: "var(--status-green)" },
                { l: "VARA", v: "PATHWAY", c: "var(--gold)" },
                { l: "ERC-3643", v: "DEPLOYED", c: "var(--status-green)" },
                { l: "ISO 27001", v: "CERTIFIED", c: "var(--status-green)" },
                { l: "SOC 2 Type II", v: "IN AUDIT", c: "var(--status-blue)" },
                { l: "Shariah Board", v: "ACTIVE", c: "var(--status-green)" },
              ].map((p) => (
                <div key={p.l} className="flex items-center justify-between border-b pb-3" style={{ borderColor: "rgba(212,175,55,0.08)" }}>
                  <span className="text-sm" style={{ color: "var(--text)" }}>{p.l}</span>
                  <div className="flex items-center gap-2">
                    <span className="h-1.5 w-1.5 rounded-full animate-pulse-dot" style={{ background: p.c }} />
                    <span className="text-[11px] font-mono-tab tracking-[0.2em]" style={{ color: p.c }}>{p.v}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}