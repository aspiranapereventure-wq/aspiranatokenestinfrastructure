import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import Navbar from "@/components/sections/Navbar";
import CapitalTicker from "@/components/sections/CapitalTicker";
import Hero from "@/components/sections/Hero";
import LiveMetrics from "@/components/sections/LiveMetrics";
import InfrastructureNodes from "@/components/sections/InfrastructureNodes";
import LiquidityEngine from "@/components/sections/LiquidityEngine";
import ComplianceInfrastructure from "@/components/sections/ComplianceInfrastructure";
import AssetEcosystem from "@/components/sections/AssetEcosystem";
import AIIntelligenceLayer from "@/components/sections/AIIntelligenceLayer";
import StressTesting from "@/components/sections/StressTesting";
import SovereignExpansion from "@/components/sections/SovereignExpansion";
import CTAGateway from "@/components/sections/CTAGateway";
import Footer from "@/components/sections/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Aspirana Tokenest — Sovereign Infrastructure for Tokenized RWA Markets" },
      { name: "description", content: "Aspirana Tokenest is the sovereign infrastructure layer routing capital, compliance, and settlement for institutional tokenized real-world asset markets across five jurisdictions." },
      { property: "og:title", content: "Aspirana Tokenest — Sovereign Infrastructure for Tokenized RWA Markets" },
      { property: "og:description", content: "Routing capital, compliance, and settlement for institutional RWA markets." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  const navigate = useNavigate();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    let mounted = true;
    supabase.auth.getSession().then(({ data }) => {
      if (!mounted) return;
      if (!data.session) {
        navigate({ to: "/auth", replace: true });
      } else {
        setChecked(true);
      }
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_e, session) => {
      if (!session) navigate({ to: "/auth", replace: true });
    });
    return () => { mounted = false; subscription.unsubscribe(); };
  }, [navigate]);

  if (!checked) {
    return (
      <main className="flex min-h-screen items-center justify-center" style={{ background: "#07111F" }}>
        <div className="flex items-center gap-3 text-[var(--text-muted)]">
          <span className="h-2 w-2 rounded-full bg-[var(--gold)] animate-pulse-dot" />
          <span className="font-mono-tab text-[11px] uppercase tracking-[0.22em]">
            Verifying institutional access…
          </span>
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen" style={{ background: "#07111F" }}>
      <Navbar />
      <CapitalTicker />
      <div className="pt-[44px]">
        <Hero />
        <LiveMetrics />
        <InfrastructureNodes />
        <AssetEcosystem />
        <ComplianceInfrastructure />
        <LiquidityEngine />
        <AIIntelligenceLayer />
        <StressTesting />
        <SovereignExpansion />
        <CTAGateway />
        <Footer />
      </div>
    </main>
  );
}
