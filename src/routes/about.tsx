import { createFileRoute } from "@tanstack/react-router";
import { BookOpen, Download, ExternalLink, GraduationCap, Mail } from "lucide-react";
import { GradientBackdrop } from "@/components/motion/GradientBackdrop";
import { AnimatedHeadline } from "@/components/motion/Text";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticAnchor, MagneticLink } from "@/components/motion/MagneticButton";
import { publication, site } from "@/content/site";

const education = [
  {
    degree: "MSc Data Science",
    school: "Chandigarh University",
    period: "Jul 2024 – Jun 2026",
    grade: "CGPA 7.35",
    coursework:
      "Data Structures & Algorithms, Statistics, Linear Algebra, Machine Learning — paired with a self-directed focus on LLM systems engineering.",
  },
  {
    degree: "BCA — Computer Applications",
    school: "Arka Jain University",
    period: "Aug 2021 – May 2024",
    grade: "CGPA 8.70",
    coursework: "Python Programming, Deep Learning, Neural Networks, Database Management Systems.",
  },
];

const credentials = [
  {
    label: "Virtual internships (Forage)",
    items: [
      "BCG X — Data Science Job Simulation (EDA, feature engineering, predictive modeling)",
      "Accenture North America — Data Analytics & Visualization",
      "Accenture North America — Product Design Virtual Experience",
      "Moreton Bay Regional Council — Web Development Virtual Experience",
    ],
  },
  {
    label: "Technical certifications & badges",
    items: [
      "Google Cloud — Generative AI Fundamentals",
      "Google Cloud — Responsible AI: Applying AI Principles",
      "Google Cloud — Introduction to Large Language Models",
      "Google Cloud — Generative AI Explorer: Agent Platform",
      "Google Cloud — Introduction to Vertex AI Studio",
      "Kaggle — Machine Learning · Pandas Data Analysis",
      "IBM — Python for Data Science",
    ],
  },
];

import { track } from "@/lib/analytics";

const title = "About Gurleen Singh — MSc Data Science & AI Engineer";
const description =
  "MSc Data Science (AI & ML) student building agentic AI systems: LangGraph orchestration, RAG pipelines, FastAPI backends and human-in-the-loop workflows.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: AboutPage,
});

const skillGroups = [
  {
    label: "Agentic AI",
    items: [
      "LangGraph",
      "LangChain",
      "Model Context Protocol (MCP)",
      "Multi-agent systems",
      "Semantic routing",
      "Human-in-the-loop (interrupt())",
    ],
  },
  {
    label: "LLMs & retrieval",
    items: [
      "RAG architectures",
      "Google Gemini 2.5 / 3.1",
      "Groq API",
      "Ollama / LM Studio (local)",
      "Google GenAI SDK",
    ],
  },
  {
    label: "Backend & data",
    items: [
      "Python (AsyncIO, Pydantic)",
      "FastAPI & REST",
      "PyJWT / OAuth sessions",
      "PostgreSQL, SQLite",
      "Redis Pub/Sub & caching",
    ],
  },
  {
    label: "DS & DevOps",
    items: [
      "Scikit-Learn, Pandas, NumPy",
      "NetworkX, Matplotlib",
      "Docker & Docker Compose",
      "Render, Streamlit Cloud",
      "uv, Git, Linux",
    ],
  },
];

const process = [
  {
    step: "Understand the failure mode",
    body: "Before any model choice, I work out where the current workflow actually breaks and what an unacceptable wrong answer looks like.",
  },
  {
    step: "Design the graph, not the prompt",
    body: "Routing, handoffs and fallbacks become explicit topology. If behaviour matters, it belongs in the architecture — not buried in a prompt.",
  },
  {
    step: "Gate on confidence",
    body: "Every autonomous path gets a threshold and an escape hatch. Systems that escalate well beat systems that guess confidently.",
  },
  {
    step: "Ship something usable",
    body: "A dashboard, an API and a Docker Compose file — so the work is reproducible and reviewable, not a notebook screenshot.",
  },
];

function AboutPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden perspective-container">
        <GradientBackdrop />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-5 pb-16 pt-20 sm:pt-24 lg:grid-cols-[1fr_20rem] lg:items-start preserve-3d">
          <div className="preserve-3d">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary translate-z-sm">
              About
            </p>
            <h1 className="mt-4 max-w-2xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl text-3d text-foreground translate-z-md transition-colors">
              <AnimatedHeadline text="Data science degree, engineering instincts." />
            </h1>
            <div className="mt-7 max-w-2xl space-y-4 text-lg leading-relaxed text-muted-foreground translate-z-sm transition-colors duration-300">
              <p>
                I&apos;m {site.name}, an AI engineer and MSc Data Science student at Chandigarh
                University, focused on agentic workflows, LangGraph orchestration, RAG architectures
                and Model Context Protocol integration.
              </p>
              <p>
                My work sits at the seam between research ideas and production reality: LangGraph
                state machines routing real support tickets, local-first RAG pipelines with no data
                egress, and FastAPI services with JWT auth, Redis, PostgreSQL and Docker Compose so
                someone other than me can actually run them.
              </p>
              <p>
                I&apos;m also a published researcher on sub-10B parameter autonomous agents — the
                same restraint runs through everything I build: an agent that resolves most cases
                and escalates the rest with full context beats one that answers everything and is
                quietly wrong.
              </p>
            </div>

            <div className="mt-9 flex flex-wrap gap-3 translate-z-lg">
              <MagneticAnchor
                href={site.resume}
                download
                variant="primary"
                onClick={() => track("resume_download", { location: "about" })}
              >
                <Download size={16} /> Download résumé
              </MagneticAnchor>
              <MagneticLink to="/contact" variant="outline">
                <Mail size={16} /> Get in touch
              </MagneticLink>
            </div>
          </div>

          <Reveal className="mx-auto w-full max-w-xs lg:sticky lg:top-24 perspective-container">
            <div className="relative rounded-3xl border border-border bg-surface/75 p-4 preserve-3d card-isometric card-isometric-hover backdrop-blur-md transition-colors duration-300">
              <div className="relative aspect-4/5 overflow-hidden rounded-2xl bg-linear-to-br from-primary/25 via-accent/15 to-coral/25 translate-z-md shadow-lg">
                <img
                  src={site.photo}
                  alt="Portrait of Gurleen Singh Bhatia, AI engineer"
                  loading="lazy"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <div className="px-2 py-4 translate-z-lg">
                <p className="font-display text-lg font-bold tracking-tight text-foreground transition-colors">
                  {site.name}
                </p>
                <p className="mt-1 font-mono text-xs uppercase tracking-[0.15em] text-primary transition-colors">
                  {site.role}
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16 perspective-container">
        <Reveal className="card-isometric card-isometric-hover rounded-2xl border border-border bg-surface/75 p-7 sm:p-9 preserve-3d backdrop-blur-md transition-colors duration-300">
          <div className="flex items-start gap-4 preserve-3d">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-accent/15 text-accent translate-z-sm transition-colors">
              <BookOpen size={20} />
            </span>
            <div className="preserve-3d">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground/70 translate-z-sm">
                Publication
              </p>
              <h2 className="mt-2 max-w-3xl font-display text-2xl font-bold tracking-tight translate-z-md text-foreground transition-colors">
                {publication.title}
              </h2>
              <p className="mt-2 text-sm text-muted-foreground translate-z-sm transition-colors">
                {publication.authors} — {publication.venue}
              </p>
              <ul className="mt-4 max-w-3xl space-y-2 translate-z-sm">
                {publication.highlights.map((h) => (
                  <li
                    key={h}
                    className="text-sm leading-relaxed text-muted-foreground transition-colors"
                  >
                    — {h}
                  </li>
                ))}
              </ul>
              <div className="mt-5 translate-z-lg">
                <a
                  href={publication.url}
                  target="_blank"
                  rel="noreferrer"
                  className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm font-medium transition-colors hover:border-accent/60 hover:text-accent cursor-pointer bg-surface/50"
                >
                  Read the paper <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 perspective-container">
        <Reveal className="card-isometric card-isometric-hover rounded-2xl border border-border bg-surface/75 p-7 sm:p-9 preserve-3d backdrop-blur-md transition-colors duration-300">
          <div className="flex items-start gap-4 preserve-3d">
            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/15 text-primary translate-z-sm transition-colors">
              <GraduationCap size={20} />
            </span>
            <div className="preserve-3d w-full">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground/70 translate-z-sm">
                Education
              </p>
              <div className="mt-4 grid gap-6 sm:grid-cols-2 translate-z-md">
                {education.map((item) => (
                  <div
                    key={item.degree}
                    className="preserve-3d hover:translate-z-sm transition-transform duration-300"
                  >
                    <h3 className="font-display text-lg font-bold tracking-tight text-foreground transition-colors">
                      {item.degree}
                    </h3>
                    <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-primary transition-colors">
                      {item.school} · {item.period} · {item.grade}
                    </p>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground transition-colors">
                      {item.coursework}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 perspective-container">
        <Reveal className="translate-z-sm">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">Skills</p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl text-foreground transition-colors">
            The toolkit
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 perspective-container">
          {skillGroups.map((group, i) => (
            <Reveal key={group.label} delay={i * 80}>
              <div className="card-isometric card-isometric-hover rounded-2xl border border-border bg-surface/75 p-6 preserve-3d backdrop-blur-md transition-colors duration-300 h-full">
                <p className="font-display text-base font-bold tracking-tight text-primary translate-z-md transition-colors">
                  {group.label}
                </p>
                <ul className="mt-4 space-y-2 translate-z-sm">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm text-muted-foreground transition-colors">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pb-16 perspective-container">
        <Reveal className="translate-z-sm">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
            Certifications &amp; internships
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl text-foreground transition-colors">
            Credentials
          </h2>
        </Reveal>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 perspective-container">
          {credentials.map((group, i) => (
            <Reveal key={group.label} delay={i * 80}>
              <div className="card-isometric card-isometric-hover rounded-2xl border border-border bg-surface/75 p-6 preserve-3d backdrop-blur-md transition-colors duration-300 h-full">
                <p className="font-display text-base font-bold tracking-tight text-primary translate-z-md transition-colors">
                  {group.label}
                </p>
                <ul className="mt-4 space-y-2 translate-z-sm">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="text-sm leading-relaxed text-muted-foreground transition-colors"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="border-y border-border/70 bg-surface/25 perspective-container">
        <div className="mx-auto max-w-6xl px-5 py-20 preserve-3d">
          <Reveal className="translate-z-sm">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">How I work</p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl text-foreground transition-colors">
              Four steps, in this order, every time.
            </h2>
          </Reveal>
          <ol className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 perspective-container">
            {process.map((item, i) => (
              <Reveal key={item.step} delay={i * 90}>
                <div className="card-isometric card-isometric-hover relative rounded-2xl border border-border bg-surface/75 p-6 preserve-3d backdrop-blur-md transition-colors duration-300 h-full">
                  <span className="font-display text-4xl font-bold text-primary/25 translate-z-sm transition-colors">
                    0{i + 1}
                  </span>
                  <p className="mt-3 font-display text-lg font-bold tracking-tight translate-z-md text-foreground transition-colors">
                    {item.step}
                  </p>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground translate-z-sm transition-colors">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-20 text-center perspective-container">
        <Reveal className="preserve-3d">
          <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl text-3d text-foreground translate-z-md transition-colors">
            Let&apos;s build something deliberate.
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-3 translate-z-lg">
            <MagneticLink to="/contact" variant="primary">
              Hire me
            </MagneticLink>
            <MagneticLink to="/projects" variant="outline">
              See the work
            </MagneticLink>
          </div>
        </Reveal>
      </section>
    </>
  );
}
