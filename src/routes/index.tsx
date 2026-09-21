import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";
import { AmbientCanvas } from "@/components/landing/AmbientCanvas";
import { CTASection } from "@/components/landing/CTASection";
import { FeatureBento } from "@/components/landing/FeatureBento";
import { Footer } from "@/components/landing/Footer";
import { GmailInboxShowcase } from "@/components/landing/GmailInboxShowcase";
import { Hero } from "@/components/landing/Hero";
import { InfiniteCarousel } from "@/components/landing/InfiniteCarousel";
import { Navbar } from "@/components/landing/Navbar";
import { Pricing } from "@/components/landing/Pricing";
import { cn } from "@/lib/utils";

type IndexSearch = {
  embed?: 1;
};

export const Route = createFileRoute("/")({
  validateSearch: (search: Record<string, unknown>): IndexSearch => {
    if (search.embed === "1" || search.embed === 1) return { embed: 1 };
    return {};
  },
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
  const { embed } = Route.useSearch();
  const isEmbed = embed === 1;

  useEffect(() => {
    if (!isEmbed) return;
    document.documentElement.dataset.embed = "1";
    return () => {
      delete document.documentElement.dataset.embed;
    };
  }, [isEmbed]);

  return (
    <div
      className={cn(
        "relative min-h-screen overflow-x-clip bg-[#f8fafc] text-slate-900 selection:bg-blue-200/70",
        isEmbed && "overscroll-none",
      )}
    >
      {isEmbed ? null : <AmbientCanvas />}
      <Navbar compact={isEmbed} />
      <main id="top" className={cn("relative z-10", isEmbed ? "pt-2" : "pt-28 sm:pt-32")}>
        <Hero embed={isEmbed} />
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
