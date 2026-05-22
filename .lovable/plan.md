
## Goal

Naiktaraf website Aspirana Tokenest dari "good institutional prototype" kepada "9/10 institutional simulation experience" — sambil port struktur dari folder Vite yang di-upload ke dalam project TanStack Start yang sedang live.

## Phase 0 — Port asas (uploaded → current project)

Project semasa adalah TanStack Start (bukan Vite + React Router macam zip). Untuk avoid dual-stack, kita port content/sections/styles ke dalam routes TanStack:

- `src/routes/index.tsx` jadi homepage (replace placeholder) yang compose semua section.
- Salin tokens & utilities institutional (`--gold`, `--bg`, glow-gold, pulse-dot, dll.) ke `src/styles.css` sebagai design tokens proper (oklch + raw hex untuk gold #D4AF37 / bg #07111F).
- Salin sections ke `src/components/sections/` (Navbar, Hero, Footer, InfrastructureNodes, AssetEcosystem) dan kemudian upgrade ikut V2 di bawah.
- Install dependencies: `framer-motion`, `react-countup`, `three`, `@react-three/fiber`, `@react-three/drei`, `lucide-react`.
- Tambah head metadata institutional (title, description, og:*) di `__root.tsx` dan leaf route.

## Phase 1 — Cinematic Hero (right-side infra visual)

- Add `<HeroOrbital />` — React Three Fiber scene di right column hero:
  - Central sovereign node (gold glow).
  - 3 rotating orbital rings dengan satellite nodes (Malaysia / Dubai / Switzerland / HK / London).
  - Particle infra grid background (instanced points, low cost).
  - Liquidity streams: animated bezier lines flowing between nodes (shader emissive gold).
  - DPR clamp + `frameloop="demand"` fallback + reduced-motion guard untuk perf.
- Hero layout dari center-stacked → split: kiri = headline + CTA + metrics, kanan = canvas.
- Tetap kekal: headline copy, gold accent, CountUp metrics.

## Phase 2 — Command-Center Navbar

Restructure jadi 3-column command bar:

- LEFT: Logo + "INFRA STATUS" micro chip (green pulse dot).
- CENTER: nav items (Infrastructure / Assets / Governance / Compliance / Intelligence).
- RIGHT: social icons (LinkedIn, X, GitHub) + `SYSTEM STATUS: OPERATIONAL` dengan green pulse.
- Sticky, glass blur, gold underline on hover, active route indicator.
- Remove standalone floating `SystemStatusBar` (merged into navbar to avoid noise).

## Phase 3 — Live Capital-Flow Ticker

Add `<CapitalTicker />` directly under navbar, above hero:

- Horizontal marquee: `RM 184M ROUTED TODAY • 12 SETTLEMENTS / MIN • MYR↔USD 4.71 • COMPLIANCE CHECKS: 2,847 • ...`
- Continuous CSS keyframe scroll (pure CSS, no JS cost).
- Gold dot separators, monospace numerals, top + bottom hairline border.

## Phase 4 — Section Depth (new sections)

Tambah 4 section baru, setiap satu ada signature animation:

1. `LiquidityEngine` — animated order-routing visual (SVG lines bercabang dari source ke 5 jurisdictions, packets bergerak ikut path, throughput counter).
2. `ComplianceInfrastructure` — compliance node graph (KYC / AML / MiCA / VARA / ERC-3643 nodes pulse + connection lines).
3. `AIIntelligenceLayer` — AI analysis panel mock: streaming text, risk heatmap, signal cards.
4. `StressTesting` — Monte Carlo visual: 1000 simulated price paths (canvas), confidence band fan chart.

Section order final:

```
Navbar
CapitalTicker
Hero (with HeroOrbital)
InfrastructureNodes
LiquidityEngine
ComplianceInfrastructure
AssetEcosystem
AIIntelligenceLayer
StressTesting
Footer (V2)
```

## Phase 5 — Infrastructure-Terminal Footer V2

Rebuild footer:

- TOP STRIP: `LIVE NODES` row — Malaysia • Dubai • Switzerland • Hong Kong • London, each dengan green pulse dot + latency.
- COMPLIANCE STATUS row: MiCA Ready / VARA Pathway / ERC-3643 / ISO 27001 sebagai badge dengan check icon.
- LINK GRID: Platform / Governance / Institutional (kekal).
- SOCIAL GRID: LinkedIn / X / GitHub / Telegram (placeholder URLs — user boleh tukar).
- BOTTOM TERMINAL: monospace `> system.status = OPERATIONAL  uptime: 99.998%  build: v2.0.1` + copyright.

## Phase 6 — Investor Psychology Polish

Sweep across semua section untuk shift dari "explain product" → "inevitability":

- Headline micro-copy: tukar verbs kepada present-tense infrastructure language ("Routing", "Settling", "Operating").
- Tambah animated counters yang naik perlahan (compliance checks/sec, settlements/min) — bukan static numbers.
- Tambah subtle scanning-line overlay (1px gold, 8s linear) on hero canvas — memberi rasa system aktif.
- Reduced-motion respected via `prefers-reduced-motion` guard di setiap animasi heavy.

## Technical Section

- **Framework**: TanStack Start v1 (current). Routes in `src/routes/`. Bukan re-introduce React Router DOM.
- **Tokens**: tambah dalam `src/styles.css`:
  - `--bg: #07111F`, `--bg-deep: #060E1A`, `--surface: rgba(19,34,56,0.6)`
  - `--gold: #D4AF37`, `--gold-soft: rgba(212,175,55,0.15)`, `--gold-line: rgba(212,175,55,0.1)`
  - `--text: #E8EEF7`, `--text-muted: #94A3B8`
  - `--status-green: #22c55e`, `--status-blue: #3b82f6`
  - Glow utilities: `.glow-gold`, `.glow-gold-strong`, keyframes `pulse-glow`, `pulse-dot`, `ticker-scroll`, `scan-line`.
- **R3F perf**: `<Canvas dpr={[1, 1.5]} gl={{ antialias: true, powerPreference: 'high-performance' }}>`, instanced meshes for particles, lazy-load via dynamic import + client-only guard (no SSR for canvas).
- **Bundles**: three + fiber + drei kira ~250KB gzip — acceptable untuk landing institutional. Code-split orbital scene supaya hero text paint dulu.
- **SEO/Head**: title `Aspirana Tokenest — Sovereign Infrastructure for Tokenized RWA Markets`, description institutional, og:title/description, single H1 in hero.
- **Files to add** (high level):
  - `src/components/sections/Navbar.tsx`
  - `src/components/sections/CapitalTicker.tsx`
  - `src/components/sections/Hero.tsx`
  - `src/components/three/HeroOrbital.tsx` (client-only)
  - `src/components/sections/InfrastructureNodes.tsx`
  - `src/components/sections/LiquidityEngine.tsx`
  - `src/components/sections/ComplianceInfrastructure.tsx`
  - `src/components/sections/AssetEcosystem.tsx`
  - `src/components/sections/AIIntelligenceLayer.tsx`
  - `src/components/sections/StressTesting.tsx`
  - `src/components/sections/Footer.tsx`
- **Files to edit**: `src/routes/__root.tsx` (head meta), `src/routes/index.tsx` (compose sections), `src/styles.css` (tokens + animations).
- **No backend changes** — semua presentation layer.

## Out of scope (boleh follow-up)

- Real live data feed (ticker pakai static rotation buat sekarang).
- Actual auth gateway behind "Access Institutional Gateway" CTA.
- Replace placeholder social URLs dengan official handles — kasi nanti.
- Three.js scene dengan real geo-accurate globe (current = stylized orbital — lebih cinematic).
