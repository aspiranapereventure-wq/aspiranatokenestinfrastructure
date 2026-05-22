import { motion } from "framer-motion";
import CountUp from "react-countup";
import { ArrowRight, FileText } from "lucide-react";
import HeroOrbital from "../three/HeroOrbital";

const metrics = [
  { label: "Tokenized Assets", value: 2.4, suffix: "B", prefix: "RM " },
  { label: "Jurisdictions", value: 5, suffix: "", prefix: "" },
  { label: "Institutional Participants", value: 142, suffix: "", prefix: "" },
  { label: "Liquidity Routed", value: 184, suffix: "M", prefix: "RM " },
];

const fadeUp = { initial: { opacity: 0, y: 30 }, animate: { opacity: 1, y: 0 } };
const stagger = { animate: { transition: { staggerChildren: 0.12 } } };

export default function Hero() {
  return (
    <section
      className="relative min-h-screen overflow-hidden pt-36"
      style={{
        background:
          "radial-gradient(circle at 80% 20%, rgba(212,175,55,0.16) 0%, transparent 55%), radial-gradient(circle at 10% 80%, rgba(59,130,246,0.08) 0%, transparent 50%), #07111F",
      }}
    >
      {/* grid */}
      <div className="absolute inset-0 institutional-grid opacity-50" />
      {/* glows */}
      <div className="absolute right-0 top-0 h-[28rem] w-[28rem] rounded-full blur-3xl animate-pulse-glow" style={{ background: "rgba(212,175,55,0.18)" }} />
      <div className="absolute bottom-10 left-0 h-80 w-80 rounded-full blur-3xl animate-pulse-glow" style={{ background: "rgba(59,130,246,0.08)", animationDelay: "2s" }} />

      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 px-4 pb-24 sm:px-6 lg:grid-cols-[1.1fr_1fr] lg:px-8">
        {/* LEFT — content */}
        <motion.div variants={stagger} initial="initial" animate="animate" className="flex flex-col">
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.7 }}
            className="mb-6 inline-flex w-fit items-center gap-2 rounded-full border px-3 py-1.5"
            style={{ borderColor: "rgba(212,175,55,0.3)", background: "rgba(212,175,55,0.08)" }}
          >
            <span className="h-1.5 w-1.5 rounded-full animate-pulse-dot" style={{ background: "var(--gold)" }} />
            <span className="text-[10px] font-mono-tab tracking-[0.22em]" style={{ color: "var(--gold)" }}>
              BORN IN MALAYSIA · OPERATED GLOBALLY
            </span>
          </motion.div>

          <motion.h1
            variants={fadeUp}
            transition={{ duration: 0.9 }}
            className="text-[2.6rem] font-bold leading-[1.05] tracking-tight sm:text-5xl lg:text-[3.6rem]"
            style={{ color: "var(--text)" }}
          >
            The Sovereign Infrastructure Layer
            <br />
            <span style={{ color: "var(--gold)" }}>for Tokenized Real-World Asset Markets.</span>
          </motion.h1>

          <motion.p
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mt-6 max-w-xl text-base leading-relaxed sm:text-lg"
            style={{ color: "var(--text-muted)" }}
          >
            Aspirana Tokenest routes capital, compliance, and settlement for institutional-grade RWA markets — operating today across five jurisdictions as a unified sovereign infrastructure stack.
          </motion.p>

          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-9 flex flex-col gap-3 sm:flex-row"
          >
            <button
              className="group inline-flex items-center justify-center gap-2 rounded-md px-7 py-3.5 text-sm font-semibold tracking-wide transition-transform duration-300 hover:scale-[1.02] glow-gold-strong"
              style={{ background: "var(--gold)", color: "#07111F" }}
            >
              Access Institutional Gateway
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </button>
            <button
              className="group inline-flex items-center justify-center gap-2 rounded-md border px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-300 hover:border-gold"
              style={{ borderColor: "rgba(212,175,55,0.3)", color: "var(--text)", background: "rgba(212,175,55,0.05)" }}
            >
              <FileText className="h-4 w-4" />
              Infrastructure Overview
            </button>
          </motion.div>

          {/* metrics */}
          <motion.div
            variants={fadeUp}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="mt-12 grid grid-cols-2 gap-3 lg:grid-cols-4"
          >
            {metrics.map((m, i) => (
              <div
                key={m.label}
                className="group relative rounded-lg border p-4 backdrop-blur-sm transition-colors hover:border-gold"
                style={{ background: "rgba(19,34,56,0.55)", borderColor: "rgba(212,175,55,0.12)" }}
              >
                <p className="text-[10px] tracking-[0.18em] uppercase" style={{ color: "var(--text-muted)" }}>
                  {m.label}
                </p>
                <p className="mt-2 text-2xl font-bold font-mono-tab" style={{ color: "var(--text)" }}>
                  <CountUp
                    end={m.value}
                    duration={2.4}
                    delay={0.4 + i * 0.15}
                    decimals={m.value < 10 ? 1 : 0}
                    prefix={m.prefix}
                    suffix={m.suffix}
                    separator=","
                  />
                </p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT — orbital scene */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.4, delay: 0.4 }}
          className="relative hidden h-[560px] w-full lg:block"
        >
          <div className="scanline relative h-full w-full overflow-hidden rounded-2xl border"
            style={{ borderColor: "rgba(212,175,55,0.15)", background: "radial-gradient(circle at 50% 50%, rgba(212,175,55,0.08), transparent 65%)" }}
          >
            <HeroOrbital />
            {/* corner markers */}
            {[
              ["top-3 left-3", "border-t border-l"],
              ["top-3 right-3", "border-t border-r"],
              ["bottom-3 left-3", "border-b border-l"],
              ["bottom-3 right-3", "border-b border-r"],
            ].map(([pos, brd], i) => (
              <span key={i} className={`pointer-events-none absolute h-4 w-4 ${pos} ${brd}`} style={{ borderColor: "var(--gold)" }} />
            ))}
            <div className="pointer-events-none absolute bottom-4 left-4 right-4 flex items-center justify-between text-[10px] font-mono-tab tracking-[0.2em]" style={{ color: "var(--text-muted)" }}>
              <span>SOVEREIGN NODE · MY-01</span>
              <span style={{ color: "var(--gold)" }}>● LIVE MESH</span>
            </div>
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-32" style={{ background: "linear-gradient(to top, #07111F, transparent)" }} />
    </section>
  );
}