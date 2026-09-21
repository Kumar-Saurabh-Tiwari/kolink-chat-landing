# koLink Chat

Marketing site for **koLink Chat** — one luminous inbox for comments, likes, DMs, and Gmail-speed replies.

The tab icon is the same brand mark as the navbar: a sky → indigo tile with a bold **k**. Source: `public/favicon.svg`. Raster copies live at `public/favicon.ico` and `public/apple-touch-icon.png`.

## Product scope

Native channels only (no Shopify, Discord, Slack, HubSpot, Zapier, or Sheets):

1. Instagram
2. Facebook
3. Messenger
4. WhatsApp
5. Threads
6. X / Twitter
7. LinkedIn
8. Email / Gmail

## What’s on the page

| Section | What it shows |
| --- | --- |
| Hero | Product promise, trial CTA, live inbox preview |
| Channels | Dual-track infinite marquee of the eight native channels |
| Inbox simulator | Gmail-style split inbox with triage, snippets, and channel toggle |
| Feature bento | Engagement engine, collision-guarded team inbox, 360° CRM, visual flow builder |
| Pricing | Plans and comparison |
| CTA | Email capture to create a workspace |
| Footer | Compact product links, channel marks, status |

Visual language is a **light porcelain canvas** (`#f8fafc`) with pastel aurora orbs, frosted glass panels, and GPU-only motion (`transform` / `opacity`).

## Stack

- React 19 + [TanStack Start](https://tanstack.com/start)
- Tailwind CSS v4
- [Motion](https://motion.dev) (`motion/react`)
- Lucide icons

## Local development

Node.js and npm are required — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating) if needed.

```sh
git clone <this-repository-url>
cd kolink-chat-landing
npm i
npm run dev
```

Then open the URL Vite prints (typically `http://localhost:8080` or `8081`).

| Script | Purpose |
| --- | --- |
| `npm run dev` | Local Vite server |
| `npm run build` | Production build |
| `npm run preview` | Serve the production build |
| `npm run lint` | ESLint |
| `npm run format` | Prettier |

## Brand assets

- **Wordmark:** `koLink Chat` in Plus Jakarta Sans
- **Mark:** rounded square, `#38bdf8 → #2563eb → #4f46e5`, white **k**
- **Favicon:** `public/favicon.svg` (preferred) + `public/favicon.ico` fallback
- **Touch icon:** `public/apple-touch-icon.png` (180×180)

## Lovable

This project is connected to [Lovable](https://lovable.dev). Continue in the [Lovable editor](https://lovable.dev/projects/6fba99a5-2306-4eb8-8a6c-4d4b70d1d745), or work locally — commits on the connected branch sync both ways. Do not force-push or rewrite published git history.
