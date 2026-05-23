import { motion } from "framer-motion";
import { ArrowRight, Lock } from "lucide-react";

export default function CTAGateway() {
  return (
    <section id="gateway" className="relative overflow-hidden py-28 sm:py-36" style={{ background: "#07111F" }}>
      <div className="absolute inset-0 institutional-grid-live opacity-40" />
      <div className="absolute left-1/2 top-1/2 h-[40rem] w-[40rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl animate-pulse-glow" style={{ background: "rgba(212,175,55,0.12)" }} />

      <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.8 }}
        >
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border px-3 py-1.5 mx-auto"
            style={{ borderColor: "rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.06)" }}>
            <Lock className="h-3 w-3" style={{ color: "var(--gold)" }} />
            <span className="text-[10px] font-mono-tab tracking-[0.22em]" style={{ color: "var(--gold)" }}>
              INSTITUTIONAL ACCESS · BY INVITATION
            </span>
          </div>

          <h2 className="font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl lg:text-[5.5rem]" style={{ color: "var(--text)" }}>
            Step into the <span className="italic" style={{ color: "var(--gold)" }}>sovereign layer.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-base leading-relaxed sm:text-lg" style={{ color: "var(--text-muted)" }}>
            Investor briefings, infrastructure documentation, and gateway credentials are issued to qualified institutional counterparties.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <button
              className="group inline-flex items-center justify-center gap-2 rounded-md px-8 py-4 text-sm font-semibold tracking-wide transition-transform duration-300 hover:scale-[1.02] glow-gold-strong"
              style={{ background: "var(--gold)", color: "#07111F" }}
            >
              Request Institutional Access
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              className="inline-flex items-center justify-center gap-2 rounded-md border px-8 py-4 text-sm font-semibold tracking-wide transition-colors duration-300 hover:border-gold"
              style={{ borderColor: "rgba(212,175,55,0.3)", color: "var(--text)", background: "rgba(212,175,55,0.05)" }}
            >
              Download Investor Brief
            </button>
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-[11px] font-mono-tab tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
            <span>● VARA · DUBAI</span>
            <span>● SC · MALAYSIA</span>
            <span>● FINMA · SWITZERLAND</span>
            <span>● SFC · HONG KONG</span>
            <span>● FCA · LONDON</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}