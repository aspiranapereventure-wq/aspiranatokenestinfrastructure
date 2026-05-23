import { motion } from "framer-motion";
import { Building2, Linkedin, Github, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";

const NAV = ["Infrastructure", "Assets", "Liquidity", "Compliance", "Intelligence"];

function XIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} fill="currentColor" aria-hidden>
      <path d="M18.244 2H21.5l-7.5 8.57L23 22h-6.93l-5.43-7.1L4.4 22H1.14l8.04-9.19L1 2h7.1l4.9 6.49L18.244 2Zm-1.21 18h1.93L7.06 4H5.04l12 16Z" />
    </svg>
  );
}

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.1 }}
      className="fixed inset-x-0 top-0 z-40 border-b backdrop-blur-xl"
      style={{
        background: "rgba(7, 17, 31, 0.85)",
        borderColor: "rgba(212, 175, 55, 0.12)",
      }}
    >
      <div className="mx-auto grid max-w-7xl grid-cols-2 items-center gap-4 px-4 py-3 sm:px-6 lg:grid-cols-3 lg:px-8">
        {/* LEFT: Logo + infra status */}
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <div
              className="flex h-9 w-9 items-center justify-center rounded-lg"
              style={{ background: "rgba(212, 175, 55, 0.15)" }}
            >
              <Building2 className="h-5 w-5" style={{ color: "var(--gold)" }} />
            </div>
            <div className="flex flex-col leading-none">
              <span className="text-sm font-bold tracking-[0.15em]" style={{ color: "var(--text)" }}>
                ASPIRANA
              </span>
              <span className="text-[10px] tracking-[0.32em]" style={{ color: "var(--gold)" }}>
                TOKENEST
              </span>
            </div>
          </div>
          <div
            className="hidden items-center gap-2 rounded-full border px-2.5 py-1 md:flex"
            style={{ borderColor: "rgba(34,197,94,0.25)", background: "rgba(34,197,94,0.06)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full animate-pulse-dot" style={{ background: "var(--status-green)" }} />
            <span className="text-[10px] font-mono-tab tracking-[0.18em]" style={{ color: "var(--status-green)" }}>
              INFRA · ACTIVE
            </span>
          </div>
        </div>

        {/* CENTER: nav */}
        <div className="hidden items-center justify-center gap-7 lg:flex">
          {NAV.map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              className="group relative text-[11px] font-medium tracking-[0.18em] transition-colors"
              style={{ color: "var(--text-muted)" }}
            >
              <span className="transition-colors group-hover:text-gold">{item.toUpperCase()}</span>
              <span
                className="pointer-events-none absolute -bottom-1 left-0 h-px w-0 transition-all duration-300 group-hover:w-full"
                style={{ background: "var(--gold)" }}
              />
            </a>
          ))}
        </div>

        {/* RIGHT: socials + status */}
        <div className="flex items-center justify-end gap-3">
          <div className="hidden items-center gap-1 md:flex">
            {[
              { Icon: Linkedin, href: "https://www.linkedin.com" },
              { Icon: XIcon, href: "https://x.com" },
              { Icon: Github, href: "https://github.com" },
            ].map(({ Icon, href }, i) => (
              <a
                key={i}
                href={href}
                target="_blank"
                rel="noreferrer"
                className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-white/5"
                style={{ color: "var(--text-muted)" }}
              >
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
          <div
            className="hidden items-center gap-2 rounded-md border px-3 py-1.5 lg:flex"
            style={{ borderColor: "rgba(212, 175, 55, 0.18)", background: "rgba(212,175,55,0.05)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full animate-pulse-dot" style={{ background: "var(--status-green)" }} />
            <span className="text-[10px] font-mono-tab tracking-[0.2em]" style={{ color: "var(--text)" }}>
              SYSTEM&nbsp;<span style={{ color: "var(--status-green)" }}>OPERATIONAL</span>
            </span>
          </div>
          <button
            type="button"
            onClick={() => supabase.auth.signOut()}
            title="Sign out"
            className="flex h-8 w-8 items-center justify-center rounded-md transition-colors hover:bg-white/5"
            style={{ color: "var(--text-muted)" }}
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </motion.nav>
  );
}