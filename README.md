# Kolink-Chat-Landing

Here is a complete overhaul plan and a production-ready prompt engineered for tools like Cursor, Claude (Artifacts/v0), or ChatGPT to rebuild your koLink Chat landing page into a cutting-edge, ultra-smooth glassmorphism SaaS experience.

Core Upgrades Over Your Current Design

ElementCurrent VersionUpgraded Glassmorphism VersionBackground & DepthFlat solid light-blueDeep multi-layered background with animated aurora mesh gradients, subtle noise texture, and radial ambient glows.Cards & ContainersFlat white rounded boxesbackdrop-blur-2xl translucent cards (bg-white/60 or deep dark/glass bg-white/[0.05]) with 1px frosted borders (border-white/20) and mouse-tracking spotlight reflections.Channel GridStatic 4×2 text boxesDual-row infinite marquee / 3D carousel with luminous brand icons (Instagram, WhatsApp, X, etc.), live status pings ("99.9% Sync"), and interactive tilt cards.Hero SectionPlain text & buttonsFloating glass pill badge ("v2.0 Beta Live"), luminous gradient typography, animated live-chat widget preview hovering with subtle physics.Micro-InteractionsStandard clicksFramer Motion spring physics, cursor spotlight glow, stagger entrance on scroll, and glass hover lifts.

Master Prompt for React Code Generation

Copy and paste this into Cursor, v0, Bolt, or Claude:

Markdown

Create a modern, ultra-detailed, highly polished landing page for "koLink Chat" in React with Tailwind CSS and Framer Motion. 

### 1. Visual Style & Aesthetic (High-End Glassmorphism)
- **Theme**: Premium modern dark-glass (or dynamic luminous light/dark switchable) aesthetic inspired by Linear, Raycast, and Apple UI.
- **Background**: Deep obsidian/slate canvas (`bg-[#0a0d14]`) layered with subtle animated radial gradient meshes (electric indigo, cyan, and violet blur orbs `blur-[120px]`) and an SVG grain/noise overlay for high-end texture.
- **Glass Token Recipe**:
  - Surface: `backdrop-blur-xl bg-white/[0.04] border border-white/[0.08]`
  - Highlights: `shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] inset-shadow-sm inset-ring-1 inset-ring-white/10`
  - Hover states: Mouse-tracking spotlight glow (`radial-gradient` following cursor position) and card lift (`translate-y-[-4px]`).
- **Typography**: Clean modern sans (Inter or Plus Jakarta Sans). High-contrast headlines with a subtle shimmer/gradient text fill (`bg-clip-text text-transparent bg-gradient-to-r from-white via-slate-200 to-slate-400`).

### 2. Layout & Sections

#### A. Glass Navbar
- Sticky top floating pill design (`backdrop-blur-md bg-white/[0.06] border border-white/10 rounded-full px-6 py-3`).
- Brand logo with glowing cyan accent, navigation links (Features, Channels, Automations, Pricing), and action buttons ("Log In" and a luminous "Get Started" button with shimmer animation).
- Mobile responsive hamburger menu with fluid animated glass drawer.

#### B. Hero Section
- **Announcement Tag**: Pill badge with a pulsing green status dot: "Seamless Multi-Channel DM Inbox 2.0".
- **Headline**: "Chat marketing, without the tab chaos." with fluid font sizing and subtle letter-spacing.
- **Sub-headline**: "koLink Chat brings every WhatsApp, Instagram, Messenger, and Email conversation into one single glass workspace. Automate routine questions, hand off to agents instantly."
- **Dual CTA**: 
  - Primary button with gradient glow, arrow icon with spring hover translation.
  - Secondary "Watch 1-min Demo" button with glass blur and subtle play icon.
- **Hero Graphic / Mockup Preview**:
  - A 3D-tilted glass workspace frame depicting a realistic multi-channel inbox.
  - Floating pill notifications (e.g., "⚡ WhatsApp lead converted", "💬 Instagram comment auto-replied") with subtle up-down float animations.

#### C. Infinite Social Channels Carousel / Marquee (Crucial Upgrade)
- Instead of static boxes, implement an **Infinite Auto-Scrolling Carousel / Double Marquee** showcasing all connected channels:
  - Row 1: Moves left to right (WhatsApp, Instagram, Messenger, X, Threads, LinkedIn, Gmail, Telegram).
  - Row 2: Moves right to left (Shopify, Webhooks, Discord, Slack, HubSpot, Zapier).
- Each item must be a glass card pill featuring:
  - Official high-res SVG brand logo with brand-colored glowing drop-shadow.
  - Channel name, badge ("Live API", "Zero-Latency Webhook"), and active message ticker.
  - Smooth pause on hover effect.

#### D. Bento Grid Feature Showcase (Interactive Glass Cards)
- 3 to 4 modular bento cards replacing the flat lower sections:
  1. **Comment to Conversation**: Visual representation of an Instagram comment automatically transitioning into a WhatsApp DM flow.
  2. **Unified Omnichannel Inbox**: Multi-avatar conversation list with channel indicator badges.
  3. **Visual Flow Builder**: A sleek mini node-based flow canvas showing trigger ➔ condition ➔ human handoff.
- Each card includes interactive hover states, inner glow, and smooth tilt effects using Framer Motion.

#### E. Call to Action & Minimalist Glass Footer
- Floating frosted glass CTA card: "Build the inbox first. Wire the APIs later." with interactive email capture or "Create Workspace" CTA.
- Footer with clean categorized links, status badge ("All systems operational"), and copyright.

### 3. Technical Requirements
- **Framework**: React (Vite / Next.js friendly) + Tailwind CSS + Framer Motion.
- **Icons**: Lucide-react (or simple clean inline SVGs).
- **Responsiveness**: Fully responsive from mobile (390px) up to ultra-wide displays (2560px).
- **Performance**: Use hardware-accelerated CSS transforms (`translate3d`, `will-change-transform`) for all animations to guarantee 60 FPS scrolling.
- Provide clean, modular code with reusable components (`GlassCard`, `MarqueeRow`, `FeatureBento`).


Core Glassmorphism & Marquee Code Snippet

To help you get the exact CSS and animation behavior, here is the reference implementation for the Spotlight Glass Card and the Infinite Marquee:

TypeScript

import React from "react";
import { motion } from "framer-motion";

// Reusable Glass Card with Mouse Hover Glow
export const GlassCard = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03] p-6 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 hover:border-white/25 hover:bg-white/[0.06] hover:shadow-[0_8px_30px_rgba(56,189,248,0.1)] ${className}`}
    >
      {/* Ambient Inner Gradient */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-48 w-48 rounded-full bg-cyan-500/10 blur-3xl" />
      {children}
    </div>
  );
};

// Seamless Social Channels Infinite Marquee
export const ChannelsMarquee = ({ items }: { items: { name: string; icon: React.ReactNode; desc: string }[] }) => {
  return (
    <div className="relative w-full overflow-hidden py-10">
      {/* Side Fade Mask for Smooth Glass Disappearance */}
      <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-24 bg-gradient-to-r from-[#0a0d14] to-transparent" />
      <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-24 bg-gradient-to-l from-[#0a0d14] to-transparent" />

      <motion.div
        className="flex gap-6 w-max"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ ease: "linear", duration: 25, repeat: Infinity }}
      >
        {[...items, ...items].map((channel, idx) => (
          <div
            key={idx}
            className="flex items-center gap-4 rounded-xl border border-white/10 bg-white/[0.04] px-5 py-3 backdrop-blur-lg hover:border-cyan-400/40 hover:bg-white/[0.08] transition-all cursor-pointer group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 group-hover:scale-110 transition-transform">
              {channel.icon}
            </div>
            <div>
              <div className="text-sm font-semibold text-white group-hover:text-cyan-400 transition-colors">
                {channel.name}
              </div>
              <div className="text-xs text-slate-400">{channel.desc}</div>
            </div>
          </div>
        ))}
      </motion.div>
    </div>
  );
};

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/6fba99a5-2306-4eb8-8a6c-4d4b70d1d745).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
