const ITEMS = [
  "RM 184M ROUTED TODAY",
  "SETTLEMENTS / MIN  12.4",
  "MYR ⇄ USD  4.71",
  "MYR ⇄ AED  1.28",
  "MYR ⇄ CHF  0.19",
  "COMPLIANCE CHECKS  2,847",
  "ACTIVE NODES  5/5",
  "TOKENIZED ASSETS  RM 2.4B",
  "INSTITUTIONAL DESK  ONLINE",
  "CROSS-BORDER LATENCY  ~18ms",
  "ERC-3643 ISSUANCES TODAY  37",
  "AI RISK SIGNALS  GREEN",
];

function Strip() {
  return (
    <div className="flex shrink-0 items-center gap-10 px-5">
      {ITEMS.map((t, i) => (
        <span key={i} className="flex items-center gap-10">
          <span className="text-[11px] font-mono-tab tracking-[0.18em]" style={{ color: "var(--text)" }}>
            {t}
          </span>
          <span className="h-1 w-1 rounded-full" style={{ background: "var(--gold)" }} />
        </span>
      ))}
    </div>
  );
}

export default function CapitalTicker() {
  return (
    <div
      className="fixed left-0 right-0 z-30 overflow-hidden border-y"
      style={{
        top: 60,
        background: "rgba(6, 14, 26, 0.92)",
        borderColor: "rgba(212, 175, 55, 0.12)",
        backdropFilter: "blur(12px)",
      }}
    >
      <div className="flex items-center">
        <span
          className="hidden shrink-0 border-r px-3 py-2 text-[10px] font-mono-tab tracking-[0.25em] sm:block"
          style={{ color: "var(--gold)", borderColor: "rgba(212,175,55,0.15)" }}
        >
          ● LIVE FLOW
        </span>
        <div className="relative flex-1 overflow-hidden">
          <div className="flex animate-ticker py-2 will-change-transform">
            <Strip />
            <Strip />
          </div>
          {/* fades */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16" style={{ background: "linear-gradient(90deg, rgba(6,14,26,1), rgba(6,14,26,0))" }} />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16" style={{ background: "linear-gradient(270deg, rgba(6,14,26,1), rgba(6,14,26,0))" }} />
        </div>
      </div>
    </div>
  );
}