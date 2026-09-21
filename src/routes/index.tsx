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
      { title: "koLink Chat — Chat marketing & engagement, without the tab chaos." },
      {
        name: "description",
        content:
          "Unify conversations, automate comments and likes, empower your support team, and manage complete customer profiles across every social platform.",
      },
      {
        property: "og:title",
        content: "koLink Chat — Chat marketing & engagement, without the tab chaos.",
      },
      {
        property: "og:description",
        content:
          "One luminous inbox for Instagram, Facebook, Messenger, WhatsApp, Threads, X, LinkedIn, and Email.",
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
