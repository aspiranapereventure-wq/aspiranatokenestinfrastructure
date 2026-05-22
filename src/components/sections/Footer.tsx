import { motion } from "framer-motion";
import { Building2, ExternalLink, CheckCircle2, Linkedin, Github, Send } from "lucide-react";

const nodes = [
  { c: "Malaysia", flag: "🇲🇾", lat: "4ms" },
  { c: "Dubai", flag: "🇦🇪", lat: "12ms" },
  { c: "Switzerland", flag: "🇨🇭", lat: "18ms" },
  { c: "Hong Kong", flag: "🇭🇰", lat: "22ms" },
  { c: "London", flag: "🇬🇧", lat: "28ms" },
];

const compliance = ["MiCA Ready", "VARA Pathway", "ERC-3643", "ISO 27001", "Shariah-Compliant"];

const cols = [
  { title: "Platform", links: ["Infrastructure", "Asset Ecosystem", "Tokenization Engine", "Settlement Rails"] },
  { title: "Governance", links: ["Compliance Framework", "Risk Management", "Audit Reports", "Legal Structure"] },
  { title: "Institutional", links: ["Investor Access", "API Documentation", "Partner Program", "Due Diligence"] },
];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.93l-5.43-7.1L4.4 22H1.14l8.04-9.19L1 2h7.1l4.9 6.49L18.244 2Zm-1.21 18h1.93L7.06 4H5.04l12 16Z" />
    </svg>
  );
}

export default function Footer() {
  return (
    <footer className="relative border-t" style={{ background: "#060E1A", borderColor: "rgba(212,175,55,0.1)" }}>
      {/* LIVE NODES strip */}
      <div className="border-b" style={{ borderColor: "rgba(212,175,55,0.08)" }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-8 gap-y-3 px-4 py-4 sm:px-6 lg:px-8">
          <span className="text-[10px] font-mono-tab tracking-[0.25em]" style={{ color: "var(--gold)" }}>
            LIVE NODES ·
          </span>
          {nodes.map((n) => (
            <div key={n.c} className="flex items-center gap-2">
              <span className="h-1.5 w-1.5 rounded-full animate-pulse-dot" style={{ background: "var(--status-green)" }} />
              <span className="text-[11px]" style={{ color: "var(--text)" }}>{n.flag} {n.c}</span>
              <span className="text-[10px] font-mono-tab" style={{ color: "var(--text-muted)" }}>{n.lat}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Compliance strip */}
      <div className="border-b" style={{ borderColor: "rgba(212,175,55,0.08)" }}>
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-6 gap-y-2 px-4 py-3 sm:px-6 lg:px-8">
          <span className="text-[10px] font-mono-tab tracking-[0.25em]" style={{ color: "var(--gold)" }}>
            COMPLIANCE ·
          </span>
          {compliance.map((c) => (
            <div key={c} className="flex items-center gap-1.5">
              <CheckCircle2 className="h-3.5 w-3.5" style={{ color: "var(--status-green)" }} />
              <span className="text-[11px]" style={{ color: "var(--text-muted)" }}>{c}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid gap-12 lg:grid-cols-4"
        >
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg" style={{ background: "rgba(212,175,55,0.15)" }}>
                <Building2 className="h-5 w-5" style={{ color: "var(--gold)" }} />
              </div>
              <div className="flex flex-col leading-none">
                <span className="text-sm font-bold tracking-[0.15em]" style={{ color: "var(--text)" }}>ASPIRANA</span>
                <span className="text-[10px] tracking-[0.32em]" style={{ color: "var(--gold)" }}>TOKENEST</span>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed" style={{ color: "var(--text-muted)" }}>
              Born in Malaysia. Operated Globally.
            </p>
            <p className="mt-2 text-xs leading-relaxed" style={{ color: "rgba(148,163,184,0.6)" }}>
              The sovereign infrastructure layer for institutional tokenized asset markets.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {[
                { Icon: Linkedin, href: "https://www.linkedin.com" },
                { Icon: XIcon, href: "https://x.com" },
                { Icon: Github, href: "https://github.com" },
                { Icon: Send, href: "https://t.me" },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-8 w-8 items-center justify-center rounded-md border transition-colors hover:border-gold"
                  style={{ borderColor: "rgba(212,175,55,0.12)", color: "var(--text-muted)" }}
                >
                  <Icon className="h-4 w-4" />
                </a>
              ))}
            </div>
          </div>

          {cols.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs font-semibold tracking-[0.2em]" style={{ color: "var(--text)" }}>
                {section.title.toUpperCase()}
              </h4>
              <ul className="mt-4 flex flex-col gap-2.5">
                {section.links.map((link) => (
                  <li key={link}>
                    <a href="#" className="group inline-flex items-center gap-1 text-sm transition-colors hover:text-gold" style={{ color: "var(--text-muted)" }}>
                      {link}
                      <ExternalLink className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </motion.div>

        {/* Terminal line */}
        <div className="mt-10 rounded-md border px-4 py-3 font-mono-tab text-[11px]"
          style={{ background: "rgba(7,17,31,0.7)", borderColor: "rgba(212,175,55,0.1)", color: "var(--text-muted)" }}>
          <span style={{ color: "var(--status-green)" }}>$</span>{" "}
          system.status = <span style={{ color: "var(--status-green)" }}>OPERATIONAL</span>
          {"   "}uptime: <span style={{ color: "var(--text)" }}>99.998%</span>
          {"   "}build: <span style={{ color: "var(--text)" }}>v2.0.1</span>
          {"   "}commit: <span style={{ color: "var(--text)" }}>a4f2c91</span>
          {"   "}region: <span style={{ color: "var(--gold)" }}>MY · AE · CH · HK · UK</span>
        </div>

        <div className="mt-6 flex flex-col items-center justify-between gap-3 border-t pt-5 sm:flex-row" style={{ borderColor: "rgba(212,175,55,0.06)" }}>
          <div className="text-[11px]" style={{ color: "rgba(148,163,184,0.6)" }}>
            © {new Date().getFullYear()} Aspirana Tokenest Sdn Bhd. All rights reserved.
          </div>
          <div className="flex gap-6">
            {["Privacy Policy", "Terms of Service", "Regulatory Disclosures"].map((item) => (
              <a key={item} href="#" className="text-[11px] tracking-wide transition-colors hover:text-gold" style={{ color: "rgba(148,163,184,0.6)" }}>
                {item}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}