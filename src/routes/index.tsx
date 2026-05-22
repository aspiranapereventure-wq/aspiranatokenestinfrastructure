import { createFileRoute } from "@tanstack/react-router";
import Navbar from "@/components/sections/Navbar";
import CapitalTicker from "@/components/sections/CapitalTicker";
import Hero from "@/components/sections/Hero";
import InfrastructureNodes from "@/components/sections/InfrastructureNodes";
import LiquidityEngine from "@/components/sections/LiquidityEngine";
import ComplianceInfrastructure from "@/components/sections/ComplianceInfrastructure";
import AssetEcosystem from "@/components/sections/AssetEcosystem";
import AIIntelligenceLayer from "@/components/sections/AIIntelligenceLayer";
import StressTesting from "@/components/sections/StressTesting";
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
  return (
    <main className="relative min-h-screen" style={{ background: "#07111F" }}>
      <Navbar />
      <CapitalTicker />
      <div className="pt-[44px]">
        <Hero />
        <InfrastructureNodes />
        <LiquidityEngine />
        <ComplianceInfrastructure />
        <AssetEcosystem />
        <AIIntelligenceLayer />
        <StressTesting />
        <Footer />
      </div>
    </main>
  );
}
