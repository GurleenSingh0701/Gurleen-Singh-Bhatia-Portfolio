## Goal

A portfolio site (Home, Projects, 3 case-study pages, About, Contact) with a bold, motion-rich creative-developer aesthetic, built to win freelance clients and remote AI/ML roles.

## Design & motion direction

- Deep ink base with electric lime/cyan + warm coral accents, all as semantic tokens.
- Expressive display type, generous whitespace, mobile-first.
- **Advanced motion layer:**
  - Animated mesh-gradient blobs + subtle grain/noise overlay behind the hero
  - Scroll-triggered reveals with staggered children (IntersectionObserver-driven)
  - Hero headline with per-character entrance animation
  - 3D hover-tilt project cards with cursor-tracked glare and depth lift
  - Magnetic buttons with ripple press feedback
  - Animated SVG architecture diagrams — connector paths draw themselves in, nodes pulse in sequence
  - Marquee tech-stack ribbon, animated counters on the stats strip
  - Page-transition fades between routes; animated underline nav indicator
  - All gated behind `prefers-reduced-motion` and GPU-friendly (transform/opacity only)

## Shared shell

- Persistent navbar with animated active indicator + mobile sheet menu.
- Footer: GitHub, LinkedIn (linkedin.com/in/gurleen-singh-bhatia), Email (gurleensingh1608@gmail.com).
- Per-page SEO metadata, generated OG/social share image, matching favicon.

## Home

1. Hero — punchy agentic-AI/RAG tagline, animated headline, blob backdrop. CTAs: "View Projects", "Download Resume", secondary "Hire Me".
2. Animated stats strip — 3+ AI Agent Projects · FastAPI + Streamlit · RAG & Multi-Agent Systems · MSc Data Science.
3. **Services section (front and center)** — 4 cards, each with title, 2–3 line description of what's included, and an engagement-format label:
   - Custom AI Agent Development — fixed-scope build
   - RAG Chatbot Builds — fixed-scope build
   - AI Support / Ticketing Automation — fixed-scope build + optional retainer
   - AI Automation Consulting — hourly / ongoing retainer

   **No invented pricing.** Instead each card carries an engagement-format line plus outcome CTA copy — "Get a free scope estimate" / "Request a quote" — so it reads as an open door, not a black box. Real numbers drop into the same slot later if you want them.

   Each card links to `/contact?service=<slug>`.

4. Featured projects — top 3 cards → Projects.

## Projects (`/projects`)

- Three cards with description, tech tags, live demo + GitHub links (new tab), "View Details".
- Modal = quick visual preview with an **animated SVG architecture flow**. Autodesk: Router Agent → Intent Classifier → {Resolution Engine, Knowledge Base Agent, Payment Agent} → Escalation Engine, Sentiment Analysis cross-cutting. Inbox Agent and Image Descriptor get their equivalents.
- Modal ends with "Read Full Case Study" → deep-dive page.
- "More on GitHub": server-fetched repos, 1-hour cache, skeleton loaders, curated static fallback on rate-limit/failure.

## Case study pages

Routes: `/projects/autodesk-support-agent`, `/projects/inbox-agent`, `/projects/image-descriptor`.

- Content sourced from your real, publicly-fetchable READMEs — actual features, setup, and tech decisions, not invented filler. Anything the README doesn't state gets drafted from the real architecture and flagged for your review.
- Structure: Problem/Motivation → Architecture & How It Works (animated diagram) → Tech Stack & Key Decisions → Challenges Solved → What I'd Improve Next.
- **Maintenance:** all case-study copy lives in one plain content file (`src/content/case-studies.ts`) as simple text/array fields. Updating it later is editing prose in that one file — no route logic, no components, no rebuild of anything else.
- Each page: own SEO metadata, live demo + repo buttons, closing CTA to Contact.

## Contact

- **Visible service pre-fill:** arriving from a service card renders a prominent chip above the form — "Inquiring about: RAG Chatbot Builds" — with a dismiss ✕. The message box is also seeded with a matching opening line the visitor can edit. The service is submitted with the record. Never a hidden-only field.
- Form (Name, Email, Message) with Zod validation, playful submit/success micro-interaction.
- Lovable Cloud: submissions stored in `contact_messages` (public insert, no public read) — nothing lost.
- Email notification wired but pending a verified sender domain; until then the success state surfaces a `mailto:` fallback and I'll walk you through verification.
- Direct buttons: Email, LinkedIn, GitHub. Note: "Open to freelance projects & remote roles".

## Analytics

- Page views tracked automatically on every route change via Lovable's built-in analytics for the published site.
- A small `track(event, props)` util wired into the events that matter: service-card clicks (with which service), "View Details" opens, case-study opens, resume downloads, contact submits, outbound demo/GitHub clicks.
- The util is provider-agnostic — it reports to built-in analytics now and can be pointed at Google Analytics or PostHog for full funnels without touching any component.

## Technical notes

- TanStack Start routes: `index.tsx`, `projects.tsx`, three case-study routes, `about.tsx`, `contact.tsx`; shared chrome in `__root.tsx`.
- About page: framed avatar block (fixed aspect, `object-cover`) with stylized placeholder — real photo is a one-file swap, zero layout rework. Education (MSc Data Science AI-ML, Chandigarh University, dissertation under Dr. Rizwan Yousuf, ~June 2026), 7-skill animated grid, condensed services recap, and "How I Work" (Discovery → Architecture → Build → Deploy & Handover) in place of empty testimonial slots.
- GitHub repo strip via `createServerFn` + TanStack Query.
- **Resume:** a real, valid `public/resume.pdf` ships so the button never 404s — and it's a loud placeholder: large diagonal "PLACEHOLDER — REPLACE BEFORE SHARING" watermark, dummy lorem sections, and a header line telling any reader this isn't the real resume. Impossible to mistake for a broken real one.
