import { createFileRoute } from "@tanstack/react-router";
import { AmbientCanvas } from "@/components/landing/AmbientCanvas";
import { CTASection } from "@/components/landing/CTASection";
import { FeatureBento } from "@/components/landing/FeatureBento";
import { Footer } from "@/components/landing/Footer";
import { GmailInboxShowcase } from "@/components/landing/GmailInboxShowcase";
import { Hero } from "@/components/landing/Hero";
import { InfiniteCarousel } from "@/components/landing/InfiniteCarousel";
import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "koLink Chat — Every customer conversation. One calm workspace." },
      {
        name: "description",
        content:
          "Bring social DMs, comments, likes, and Instagram & Facebook insights into one workspace — across every channel.",
      },
      {
        property: "og:title",
        content: "koLink Chat — Every customer conversation. One calm workspace.",
      },
      {
        property: "og:description",
        content:
          "One luminous inbox for every channel — Instagram, Facebook, Messenger, WhatsApp, and more.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/apple-touch-icon.png" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#f8fafc] text-slate-900 selection:bg-blue-200/70">
      <AmbientCanvas />
      <Navbar />
      <main id="top" className="relative z-10 pt-28 sm:pt-32">
        <Hero />
        <InfiniteCarousel />
        <GmailInboxShowcase />
        <FeatureBento />
        <Pricing />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
