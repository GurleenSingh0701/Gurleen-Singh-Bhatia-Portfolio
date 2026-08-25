export type Service = {
  slug: string;
  title: string;
  engagement: string;
  description: string;
  includes: string[];
  cta: string;
};

/**
 * Services shown on the Home page. No invented pricing — each card states an
 * engagement format and an outcome-driven CTA so the next step is obvious.
 * Drop a `starting at` line into `engagement` later if you want price signals.
 */
export const services: Service[] = [
  {
    slug: "ai-agent-development",
    title: "Custom AI Agent Development",
    engagement: "Fixed-scope build",
    description:
      "Multi-agent systems that actually route, decide and act — not a single prompt in a loop. Built as a stateful graph with explicit intent classification, sub-agent handoff and confidence-gated fallbacks.",
    includes: ["Agent graph design", "Tool + API integration", "Eval harness & demo"],
    cta: "Get a free scope estimate",
  },
  {
    slug: "rag-chatbot",
    title: "RAG Chatbot Builds",
    engagement: "Fixed-scope build",
    description:
      "Retrieval-augmented assistants grounded in your own docs, policies or product data. Chunking, embedding and retrieval tuned so answers cite reality instead of hallucinating it.",
    includes: ["Ingestion pipeline", "Vector store + retrieval tuning", "Chat UI or API"],
    cta: "Get a free scope estimate",
  },
  {
    slug: "support-automation",
    title: "AI Support & Ticketing Automation",
    engagement: "Fixed-scope build + optional retainer",
    description:
      "The system I've already built end to end: intent triage, sentiment and urgency scoring, autonomous resolution for the easy 70%, and clean context-rich escalation to humans for the rest.",
    includes: ["Intent & priority triage", "Resolution + escalation engines", "Ops dashboard"],
    cta: "Request a quote",
  },
  {
    slug: "automation-consulting",
    title: "AI Automation Consulting",
    engagement: "Hourly / ongoing retainer",
    description:
      "Short, blunt engagements to figure out where AI genuinely pays off in your workflow — and where it's an expensive detour. Architecture review, model selection, cost and latency planning.",
    includes: ["Workflow audit", "Architecture & model review", "Build roadmap"],
    cta: "Book a consult",
  },
];

export const serviceBySlug = (slug?: string | null) =>
  services.find((service) => service.slug === slug);
