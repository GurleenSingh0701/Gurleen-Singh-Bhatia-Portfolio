/**
 * Project + case-study content.
 *
 * MAINTENANCE: this is the single file to edit when a project changes.
 * Everything below is plain text / arrays — no route logic, no components.
 * Content is derived from the real repository READMEs.
 */

export type DiagramLayer = {
  label: string;
  nodes: { label: string; tone?: "primary" | "accent" | "coral" | "muted" }[];
};

export type Diagram = {
  caption: string;
  layers: DiagramLayer[];
  note?: string;
};

export type CaseStudy = {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  summary: string;
  year: string;
  tags: string[];
  demo?: string;
  repo?: string;
  featured: boolean;
  diagram: Diagram;
  sections: {
    problem: string[];
    architecture: string[];
    stack: { area: string; choice: string; why: string }[];
    challenges: { title: string; body: string }[];
    next: string[];
  };
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "autodesk-support-agent",
    title: "Autodesk AI Support & Multi-Agent Orchestration System",
    shortTitle: "AI Support Agent",
    tagline: "Autonomous customer support that knows when to stop guessing.",
    summary:
      "An enterprise-grade multi-agent customer support and ticketing system for Autodesk-style workflows. A LangGraph StateGraph router performs zero-shot intent classification, sentiment and urgency triage, then hands off to specialised domain agents — escalating to humans over Redis Pub/Sub the moment confidence drops below 0.70.",
    year: "2025",
    tags: [
      "Python",
      "FastAPI",
      "LangGraph",
      "Streamlit",
      "Multi-Agent Systems",
      "PostgreSQL",
      "Redis",
      "JWT Auth",
      "Docker",
      "NLP",
    ],
    demo: "https://autodesk-frontend-ibzm.onrender.com/",
    repo: "https://github.com/GurleenSingh0701/ai-support-agent",
    featured: true,
    diagram: {
      caption: "LangGraph StateGraph orchestration",
      layers: [
        { label: "Interface", nodes: [{ label: "Streamlit Support Dashboard", tone: "accent" }] },
        { label: "API", nodes: [{ label: "FastAPI Backend (JWT / OAuth2)", tone: "muted" }] },
        {
          label: "Orchestrator",
          nodes: [{ label: "LangGraph Router Agent — intent + urgency", tone: "primary" }],
        },
        {
          label: "Domain sub-agents",
          nodes: [
            { label: "OrderAgent" },
            { label: "PaymentAgent" },
            { label: "ReturnRefundAgent" },
            { label: "KB Policy Retriever" },
          ],
        },
        {
          label: "Fallback",
          nodes: [{ label: "Escalation Engine — Redis Pub/Sub → human queue", tone: "coral" }],
        },
      ],
      note: "Sentiment + confidence scoring runs across every hop. Confidence ≥ 0.70 resolves autonomously; frustration or < 0.70 escalates with full context.",
    },
    sections: {
      problem: [
        "Customer support queues drown in repetitive, high-volume tickets: order status, licence provisioning, billing questions, refund eligibility. Each one is individually trivial and collectively expensive.",
        "The naive fix — a single LLM answering everything — fails in exactly the place it matters most. It answers confidently when it shouldn't, has no notion of urgency, and gives human agents nothing useful when it finally gives up.",
        "The goal here was an autonomous support layer that resolves what it genuinely can, measures how sure it is, and escalates the rest with enough context that a human doesn't have to start over.",
      ],
      architecture: [
        "The system is modelled as a LangGraph StateGraph rather than a prompt chain. A RouterAgent performs zero-shot intent classification into ORDER_STATUS, REFUND_REQUEST, PAYMENT_ISSUE, TECHNICAL_SUPPORT or GENERAL_INQUIRY, each with an explicit confidence score, alongside sentiment and urgency analysis.",
        "Conditional edges then route to a specialised domain sub-agent: OrderAgent for tracking, licence provisioning and delivery; PaymentAgent for invoices, gateways and billing updates; ReturnRefundAgent for software return eligibility and refund processing; and a KBPolicyRetriever that queries a vector policy store for general questions.",
        "The escalation engine is the deliberate part of the design. When classifier confidence falls below 0.70, or the customer reads as frustrated / the ticket scores PRIORITY: HIGH or CRITICAL, a context-rich payload is broadcast over Redis Pub/Sub to a human support queue instead of being answered anyway.",
        "A Streamlit dashboard sits in front of a FastAPI service, with full JWT session management — access and refresh tokens, plus browser query-parameter restoration so a page refresh doesn't dump the agent out of session.",
      ],
      stack: [
        {
          area: "Orchestration",
          choice: "LangGraph + LangChain",
          why: "Stateful graph with conditional edges — routing and escalation are explicit topology, not prompt-engineered hope.",
        },
        {
          area: "Backend",
          choice: "FastAPI + Pydantic v2",
          why: "Async API service with strict schema validation at the boundary.",
        },
        {
          area: "LLM",
          choice: "Google Gemini (gemini-3.1-flash-lite)",
          why: "Fast, cheap classification and generation for a high-volume triage workload.",
        },
        {
          area: "Data",
          choice: "PostgreSQL (psycopg3) / SQLite",
          why: "Relational storage for users, tickets and message history.",
        },
        {
          area: "Events",
          choice: "Redis 7 Pub/Sub",
          why: "Decouples escalation broadcasting from request handling — human queues subscribe independently.",
        },
        {
          area: "Security",
          choice: "PyJWT, Bcrypt, OAuth2",
          why: "Password hashing plus role-based access control across the dashboard and API.",
        },
        {
          area: "Deployment",
          choice: "Docker Compose",
          why: "PostgreSQL, Redis, FastAPI, Streamlit and pgAdmin come up as one reproducible stack.",
        },
      ],
      challenges: [
        {
          title: "Knowing when the agent is wrong",
          body: "Confidence scoring is wired into the routing decision itself. Below 0.70 the graph does not attempt a resolution — it takes the escalation edge. That single threshold is what makes the system safe to point at real customers.",
        },
        {
          title: "Session survival in Streamlit",
          body: "Streamlit's rerun model repeatedly loses in-memory state. JWT access and refresh tokens are restored from browser query parameters so an authenticated session survives page refreshes.",
        },
        {
          title: "Escalations that are actually useful",
          body: "The escalation payload carries intent, sentiment, urgency and conversation context, so the human agent inherits the reasoning rather than a bare transcript.",
        },
        {
          title: "Reproducible multi-service local runs",
          body: "Five interdependent services made 'works on my machine' a real risk. A single docker-compose definition builds and launches the whole stack, with a Python-only path documented as a fallback.",
        },
      ],
      next: [
        "Add an offline evaluation suite that scores routing accuracy and escalation precision against a labelled ticket set, so threshold changes are measured rather than guessed.",
        "Introduce per-tenant knowledge bases so the policy retriever can serve multiple product lines from the same deployment.",
        "Surface live agent-performance telemetry — resolution rate, escalation rate and latency per intent — inside the dashboard.",
      ],
    },
  },
  {
    slug: "youtube-video-analyser",
    title: "VideoMind — AI YouTube Study Guide & Note Vault",
    shortTitle: "VideoMind",
    tagline: "Transforming passive YouTube watching into active, high-retention learning.",
    summary:
      "A self-hosted, AI-powered study system that transforms YouTube videos and playlists into highly structured study notes. Integrates Firebase Google Auth, Firestore DB, Firebase Cloud Functions, and TanStack Router/Query with a Gemini 3.5 Flash prompt orchestration pipeline to generate executive summaries, handwritten-style notes, flashcards, timelines, and Q&A grounded in transcript text.",
    year: "2025",
    tags: [
      "React 19",
      "TypeScript",
      "TanStack Router",
      "TanStack Query",
      "Firebase Functions",
      "Firestore DB",
      "Google Gemini API",
      "Tailwind CSS",
      "Zod",
      "Bun",
    ],
    demo: "https://video-analyser-123.web.app/",
    repo: "https://github.com/GurleenSingh0701/youtube-video-analyser-latest",
    featured: true,
    diagram: {
      caption: "Serverless prompt orchestration & DB sync flow",
      layers: [
        { label: "Client Layer", nodes: [{ label: "TanStack SPA Client", tone: "accent" }] },
        {
          label: "Auth & DB",
          nodes: [{ label: "Firebase Auth" }, { label: "Firestore (video-db)", tone: "primary" }],
        },
        {
          label: "Compute",
          nodes: [{ label: "Firebase Cloud Functions v2 (api)", tone: "coral" }],
        },
        {
          label: "Services",
          nodes: [
            { label: "YouTube Scraper (transcript)", tone: "muted" },
            { label: "Google Gemini REST API", tone: "primary" },
          ],
        },
      ],
      note: "Client-side queries reactively sync with Firestore while serverless functions perform dual-writes for generated study notes.",
    },
    sections: {
      problem: [
        "Passive learning from YouTube video tutorials is highly inefficient. Scrubbing for key details is tedious, manual note-taking is slow, and there is no direct way to test comprehension or query video content.",
        "Generic summarizers lack structural breakdowns, glossaries of key definitions, chronological timelines, or interactive Q&A grounded in transcript facts.",
        "The design goal was a learning assistant that acts as a searchable 'second brain', parsing and structuring video content into high-density pedagogical study notes.",
      ],
      architecture: [
        "The client is a static Single Page Application built on React 19 and TanStack Router/Query, syncing directly with a private Cloud Firestore library.",
        "On submission, a Firebase Cloud Function v2 orchestrates oEmbed scraping and transcript retrieval. The raw content is fed into a Gemini 3.5 Flash pipeline.",
        "The output conforms to a strict Zod JSON schema. A custom bracket-balancing stack (repairJson) repairs truncated JSON tokens on the fly before a server-side dual-write is executed to prevent client loss.",
      ],
      stack: [
        {
          area: "Frontend",
          choice: "React 19 + TanStack Router",
          why: "Type-safe client-side routing with high-performance React 19 component rendering.",
        },
        {
          area: "State & DB Sync",
          choice: "TanStack Query + Firestore SDK",
          why: "Real-time client synchronization with offline caching and reactive query updates.",
        },
        {
          area: "Compute Layer",
          choice: "Firebase Cloud Functions v2",
          why: "Serverless Node.js handlers that automatically scale down to zero when idle.",
        },
        {
          area: "LLM Processing",
          choice: "Google Gemini 3.5 Flash REST API",
          why: "Extremely cost-efficient, fast generation supporting strict JSON schema outputs.",
        },
        {
          area: "Build & Runtime",
          choice: "Bun + Vite",
          why: "Blazing fast bundling, package resolution, and reproducible script setups.",
        },
      ],
      challenges: [
        {
          title: "Handling Truncated JSON Output",
          body: "Long transcript summaries generated by LLMs often hit output token bounds, returning truncated JSON. I built a custom balancing-stack parser (repairJson) to repair incomplete brackets and save partial generations safely.",
        },
        {
          title: "Direct-to-Client Security",
          body: "Syncing Firestore collections directly from the client requires careful isolation. I implemented strict Firestore Security Rules that validate user UID mappings to prevent cross-user data leakage.",
        },
      ],
      next: [
        "Add vector-based semantic search using Firestore vector features to query across all saved video notes in the library.",
        "Implement an audio generation pipeline to export study notes as narrated audio files.",
      ],
    },
  },
  {
    slug: "inbox-agent",
    title: "Smart Inbox Agent",
    shortTitle: "Inbox Agent",
    tagline: "An email assistant with a human still holding the pen.",
    summary:
      "An AI-powered professional email assistant that classifies incoming mail, drafts replies, and schedules meetings against the visitor's own Google Calendar — with a persistent human-in-the-loop review pipeline built on LangGraph interrupts.",
    year: "2025",
    tags: [
      "Python",
      "LangGraph",
      "Streamlit",
      "Groq API",
      "Google Calendar",
      "OAuth 2.0",
      "AI Agents",
      "NLP",
    ],
    demo: "https://inbox-agent.streamlit.app/",
    repo: "https://github.com/GurleenSingh0701/inbox-agent",
    featured: true,
    diagram: {
      caption: "Compiled LangGraph state machine",
      layers: [
        { label: "Input", nodes: [{ label: "Incoming email (subject + body)", tone: "accent" }] },
        {
          label: "Classify",
          nodes: [{ label: "urgent / meeting_request / newsletter / other", tone: "primary" }],
        },
        {
          label: "Draft",
          nodes: [{ label: "Draft reply" }, { label: "Propose 3 calendar slots (FreeBusy)" }],
        },
        {
          label: "Human in the loop",
          nodes: [
            { label: "Approval node — LangGraph interrupt()", tone: "coral" },
            { label: "Refine (max 3 revisions)" },
          ],
        },
        { label: "Action", nodes: [{ label: "Send reply / book the slot", tone: "primary" }] },
      ],
      note: "The approval node loops back into refine until the human approves, discards, or the revision cap is hit.",
    },
    sections: {
      problem: [
        "Email automation usually fails in one of two directions: it's too dumb to be useful, or it's autonomous enough to send something embarrassing on your behalf.",
        "Meeting scheduling makes it worse — proposing times requires real calendar state, and getting that wrong wastes more time than doing it manually.",
        "The design goal was an assistant that does all the tedious work up front but never takes an irreversible action without an explicit human yes.",
      ],
      architecture: [
        "The agent's workspace is a compiled LangGraph state machine. A Classify node categorises the incoming subject and body into urgent, meeting_request, newsletter or other using a Groq-hosted LLM.",
        "The Draft node branches on that classification. For a meeting_request it queries the signed-in user's Google Calendar FreeBusy data and proposes exactly three available one-hour slots; otherwise it drafts a contextually appropriate reply.",
        "The Approval node pauses execution with LangGraph's interrupt() and waits for human review. Feedback routes into a Refine node that polishes the response or slot list, capped at three revisions so it can't loop forever.",
        "Only after approval — or discard, or hitting the revision cap — does the Action node execute: mock-sending the email or booking the chosen slot directly on the user's calendar.",
        "Authentication is genuinely multi-user. Any visitor signs in with their own Google account and meetings land on their calendar, not on a shared developer account.",
      ],
      stack: [
        {
          area: "Agent runtime",
          choice: "LangGraph (compiled StateGraph)",
          why: "interrupt() gives first-class human-in-the-loop pausing instead of ad-hoc flags.",
        },
        {
          area: "LLM",
          choice: "Groq API",
          why: "Low-latency inference keeps classification and drafting feeling interactive.",
        },
        {
          area: "Interface",
          choice: "Streamlit",
          why: "Fast path to a reviewable dashboard with a visible node execution log.",
        },
        {
          area: "Calendar",
          choice: "Google Calendar FreeBusy + Events API",
          why: "Slot proposals come from real availability, and booking writes back to the user's own calendar.",
        },
        {
          area: "Auth",
          choice: "Google OAuth 2.0, confidential web client",
          why: "Per-visitor authorisation with the client secret held server-side.",
        },
      ],
      challenges: [
        {
          title: "OAuth vs Streamlit's rerun model",
          body: "PKCE is deliberately disabled (autogenerate_code_verifier=False). Streamlit's stateless rerun execution would otherwise lose or overwrite the code_verifier in session state during the redirect round-trip to Google and back. As a confidential web client holding its secret server-side, the app doesn't need PKCE to be safe.",
        },
        {
          title: "Preventing infinite refinement",
          body: "Human feedback loops can cycle indefinitely. The revision counter caps refinement at three passes and then forces the graph forward to the action node.",
        },
        {
          title: "Multi-user calendar isolation",
          body: "The architecture stores per-visitor credentials in session state so bookings always target the signed-in user's calendar rather than a global developer account.",
        },
      ],
      next: [
        "Persist credentials and thread state in a database so a session survives a browser close, not just a rerun.",
        "Move from mock-sending to a real Gmail send integration behind the same approval gate.",
        "Add learned tone profiles so drafts match how the user actually writes.",
      ],
    },
  },
  {
    slug: "image-descriptor",
    title: "VisionAI Pro — Advanced Image & Content Suite",
    shortTitle: "Image Descriptor",
    tagline: "One image in, publish-ready content out.",
    summary:
      "A multi-modal vision application built on Streamlit and the official Google GenAI SDK that turns any uploaded image into structured, professional content — blog posts, per-platform social copy, accessibility ALT text and SEO metadata, e-commerce listings, and interactive visual Q&A.",
    year: "2025",
    tags: [
      "Python",
      "Streamlit",
      "Google GenAI SDK",
      "Gemini",
      "Computer Vision",
      "Prompt Engineering",
      "SEO",
      "Accessibility",
    ],
    demo: "https://imagedescriptor.streamlit.app/",
    repo: "https://github.com/GurleenSingh0701/Image-Descriptor",
    featured: true,
    diagram: {
      caption: "Modular prompt routing over one vision model",
      layers: [
        { label: "Input", nodes: [{ label: "Uploaded image + controls", tone: "accent" }] },
        {
          label: "Prompt router",
          nodes: [{ label: "prompts.py — modular templates per mode", tone: "primary" }],
        },
        {
          label: "Generation modes",
          nodes: [
            { label: "Blog & narrative" },
            { label: "Social copy" },
            { label: "ALT text & SEO" },
            { label: "E-commerce listing" },
            { label: "Visual Q&A" },
            { label: "Custom prompt studio" },
          ],
        },
        {
          label: "Model",
          nodes: [{ label: "Gemini 2.5 Flash / 3.1 Flash-Lite / 2.5 Pro", tone: "muted" }],
        },
        {
          label: "Output",
          nodes: [{ label: "Session history + Markdown / TXT export", tone: "coral" }],
        },
      ],
      note: "Model choice and temperature are user-selectable at runtime, so cost and creativity are tuned per task.",
    },
    sections: {
      problem: [
        "Describing an image well is the same task wearing six different hats: a blog intro, an Instagram caption, an ALT tag, a product title and a research answer are all 'describe this image' — and all of them need different structure, length and tone.",
        "Generic captioning tools give you one flat sentence and leave the rest to you.",
        "VisionAI Pro treats the output format as a first-class input, so the same upload produces genuinely usable content per channel.",
      ],
      architecture: [
        "The application is a Streamlit front end over the official google-genai SDK, with all prompt logic factored into a dedicated prompts.py module rather than inlined in the UI.",
        "Each generation mode is a template: blog posts with selectable tone (Engaging, Professional, Casual, Poetic) and target length (300w / 500w / 800w+); social copy tailored per platform for Instagram captions and hashtags, LinkedIn insights and CTA, Twitter/X thread starters, and Pinterest/Facebook; an accessibility and SEO engine producing sub-125-character ALT text, detailed accessible descriptions, optimised image filenames and keyword tags; and an e-commerce merchandiser generating titles, taglines, highlight bullets, persuasive descriptions and target audience profiles.",
        "Interactive Visual Q&A allows real-time interrogation of the image — objects, text, colours, specific details — while the Custom Prompt Studio exposes arbitrary prompts and system directives for anything the presets don't cover.",
        "Sidebar controls expose Gemini model selection, a temperature/creativity slider, and flexible API key configuration via .env or an in-app override. A session log tracks generations with one-click Markdown/TXT export.",
      ],
      stack: [
        {
          area: "Interface",
          choice: "Streamlit",
          why: "Immediate multi-modal upload UI with live controls and no separate front-end build.",
        },
        {
          area: "Model access",
          choice: "Official google-genai SDK",
          why: "First-party multi-modal support and clean model switching.",
        },
        {
          area: "Models",
          choice: "gemini-2.5-flash, gemini-3.1-flash-lite, gemini-2.5-pro",
          why: "Users trade cost against depth per task instead of being locked to one tier.",
        },
        {
          area: "Prompting",
          choice: "Modular templates in prompts.py",
          why: "Adding a generation mode is a template change, not a UI rewrite.",
        },
        {
          area: "Config",
          choice: ".env or in-app sidebar key override",
          why: "Runs locally or as a shared demo without hardcoding credentials.",
        },
      ],
      challenges: [
        {
          title: "Keeping six output formats coherent",
          body: "Separating prompt templates from application code kept each mode independently tunable — the SEO engine's length constraints don't leak into the blog generator.",
        },
        {
          title: "Cost vs quality at runtime",
          body: "Exposing model selection and a temperature slider lets a cheap Flash-Lite pass handle bulk ALT text while Pro handles long-form narrative.",
        },
        {
          title: "Accessibility output that's actually compliant",
          body: "ALT text generation is constrained to under 125 characters with a separate long-form accessible description, matching real accessibility guidance rather than dumping one paragraph.",
        },
      ],
      next: [
        "Batch mode for processing an entire image folder into a CSV of ALT text and SEO filenames.",
        "Brand voice profiles so social copy inherits a consistent tone across sessions.",
        "Optional caching layer to avoid re-billing identical image + mode combinations.",
      ],
    },
  },
  {
    slug: "invoicewise-ocr-sync",
    title: "InvoiceWise AI — Shop Bill OCR & Zoho Integration",
    shortTitle: "InvoiceWise OCR",
    tagline: "Extracting structured ledger data from physical purchase receipts with OCR and AI.",
    summary:
      "A billing data extraction utility that processes scanned images of shop purchase bills. Utilizes the Tesseract OCR engine to read raw receipt text, structures it into formatted records, compiles it into downloadable Excel spreadsheets, and automatically pushes the extracted details to Zoho Books via API. Synced items and processing histories are backed up securely using Firestore database events.",
    year: "2025",
    tags: [
      "TypeScript",
      "Tesseract OCR",
      "Excel Generation",
      "Zoho API",
      "Firebase Auth",
      "Firestore DB",
      "Node.js",
      "Image Processing",
    ],
    featured: true,
    diagram: {
      caption: "OCR Extraction & Multi-Destination Sync Pipeline",
      layers: [
        {
          label: "Input",
          nodes: [{ label: "Bill Image Upload (Receipt/Invoice JPG/PNG)", tone: "accent" }],
        },
        {
          label: "Extraction",
          nodes: [{ label: "Tesseract OCR Engine (local character recognition)", tone: "primary" }],
        },
        {
          label: "Storage & Backend",
          nodes: [
            { label: "Firebase Cloud Functions" },
            { label: "Firestore DB logs", tone: "coral" },
          ],
        },
        {
          label: "Sync & Export",
          nodes: [
            { label: "Excel JS Spreadsheet Compiler" },
            { label: "Zoho API Connector", tone: "primary" },
          ],
        },
      ],
      note: "Raw image text is segmented by OCR, structured via serverless handlers, then dispatched to Zoho and generated Excel sheets.",
    },
    sections: {
      problem: [
        "Retailers and shop owners spend hours manually keying purchase details from supplier papers into accounting systems like Zoho.",
        "Manual data entry is prone to typographical errors, mistyping line items, and missing expense records, which distorts accounting balances.",
        "The goal was an automated pipeline where a user uploads a photo of a bill, and structured rows are instantly created in Zoho and Excel.",
      ],
      architecture: [
        "The system ingests receipt photos, running them through Tesseract OCR to perform local optical character recognition and text extraction.",
        "A serverless parser sanitizes the OCR output, parsing items, quantities, and totals into unified objects matching Zoho's API schemas.",
        "Data is stored in Firestore for audits, synchronized directly with Zoho books, and converted into downloadable spreadsheet files.",
      ],
      stack: [
        {
          area: "OCR Processing",
          choice: "Tesseract OCR Engine",
          why: "Provides robust offline text extraction from receipt scans without proprietary cloud dependencies.",
        },
        {
          area: "External Sync",
          choice: "Zoho REST API integration",
          why: "Automatically populates inventory and expense ledgers directly from processed receipts.",
        },
        {
          area: "Spreadsheet Output",
          choice: "Excel JS Compiler",
          why: "Allows shop owners to download structured files for local backups and tax filings.",
        },
        {
          area: "Database & Events",
          choice: "Firebase & Firestore",
          why: "Ensures transaction logging, processing status tracking, and secure database syncing.",
        },
      ],
      challenges: [
        {
          title: "Parsing Tabular OCR Text",
          body: "Receipt scans often align poorly, causing OCR columns to shift. I designed regex pattern classifiers to group item names with corresponding price columns based on line heights.",
        },
        {
          title: "Rate-Limiting on External APIs",
          body: "Pushing bulk receipt items to Zoho can trigger rate limit errors. I built a queue handler in Firebase Cloud Functions that throttles API calls and handles retries gracefully.",
        },
      ],
      next: [
        "Integrate LLM-based receipt correction to fix character mistakes made by OCR on low-quality camera captures.",
        "Add automated email inbox scanning to process PDF bills directly as they arrive from vendors.",
      ],
    },
  },
  {
    slug: "ai-pos-billing-system",
    title: "AI-Powered POS System & Automated Billing",
    shortTitle: "AI POS System",
    tagline: "Point-of-Sale terminal automating item entry and ticket billing using AI.",
    summary:
      "A modern Point-of-Sale terminal designed to automate checkout billing for retail environments. Employs a TypeScript frontend for smooth terminal UI interactions, calling Firebase Cloud Functions as the serverless backend orchestration layer. Uses AI models to automatically categorize line items, predict billing totals, apply discounts, and store transactional records securely in the Firebase ecosystem.",
    year: "2025",
    tags: [
      "TypeScript",
      "React",
      "Firebase Functions",
      "Firestore DB",
      "Google Gemini API",
      "Tailwind CSS",
      "Serverless",
      "Automated Billing",
    ],
    featured: true,
    diagram: {
      caption: "AI POS checkout events & billing pipeline",
      layers: [
        {
          label: "Interface",
          nodes: [{ label: "TypeScript Frontend Terminal (Cart/Checkout UI)", tone: "accent" }],
        },
        {
          label: "Compute",
          nodes: [{ label: "Firebase Cloud Functions (serverless endpoint)", tone: "primary" }],
        },
        {
          label: "Intelligence",
          nodes: [
            { label: "AI Billing Engine (Gemini API)", tone: "coral" },
            { label: "Item categorization & discount triggers" },
          ],
        },
        {
          label: "Database",
          nodes: [{ label: "Firestore transactional ledger", tone: "primary" }],
        },
      ],
      note: "POS terminal triggers serverless cloud functions which query the AI engine to generate billing classifications and write to Firestore.",
    },
    sections: {
      problem: [
        "Checkout terminals in busy shops require cashier inputs for categorizing goods, entering bulk items, and applying complex discount conditions.",
        "Traditional POS setups are rigid, requiring manual database updates for new items, and fail to suggest optimal checkout billing shortcuts dynamically.",
        "The goal was to build a smart checkout terminal that classifies items, predicts pricing packages, and creates structured bills automatically.",
      ],
      architecture: [
        "The client is a responsive TypeScript web terminal that sends event streams to Firebase Cloud Functions on cart modifications.",
        "Backend functions invoke LLM prompts to analyze checkout context, predict applicable promotional rates, and categorize goods.",
        "Billing summaries, inventory balances, and receipt ledgers are written directly to Firestore, sync'd in real-time back to the screen.",
      ],
      stack: [
        {
          area: "Frontend client",
          choice: "React + TypeScript Terminal UI",
          why: "Ensures type safety, low latency button clicks, and real-time state synchronization.",
        },
        {
          area: "Serverless Backend",
          choice: "Firebase Cloud Functions (Node.js/TypeScript)",
          why: "Orchestrates API endpoints and handles secure backend logic without server maintenance.",
        },
        {
          area: "Database Layer",
          choice: "Cloud Firestore",
          why: "Stores transaction tickets and syncs checkout statuses instantly using real-time listeners.",
        },
        {
          area: "Billing Intelligence",
          choice: "Google Gemini API Integration",
          why: "Auto-categorizes products, parses freeform inputs, and generates itemized billing summaries.",
        },
      ],
      challenges: [
        {
          title: "Low Latency Terminal Responses",
          body: "Waiting for AI models during checkouts can slow down queues. I optimized this by pre-fetching item categories client-side and running AI tasks in parallel with payment processing.",
        },
        {
          title: "Offline Terminal Survival",
          body: "If connection drops, checkouts must not fail. I configured Firestore offline persistence to queue sales tickets locally and sync to the cloud upon restoration.",
        },
      ],
      next: [
        "Integrate hardware thermal printer SDKs to spit receipts automatically on database sync.",
        "Add camera-based bar-code/item recognition to scan goods directly into the cart via vision AI.",
      ],
    },
  },
];

export const caseStudyBySlug = (slug: string) => caseStudies.find((study) => study.slug === slug);

export const caseStudySlugs = caseStudies.map((study) => study.slug);
