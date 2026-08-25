import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ArrowUpRight, Download, Sparkles } from "lucide-react";
import { GradientBackdrop } from "@/components/motion/GradientBackdrop";
import { AnimatedHeadline, CountUp, Marquee } from "@/components/motion/Text";
import { MagneticAnchor, MagneticLink } from "@/components/motion/MagneticButton";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { ProjectCard } from "@/components/ProjectCard";
import { GithubStrip } from "@/components/GithubStrip";
import { caseStudies } from "@/content/case-studies";
import { services } from "@/content/services";
import { site, stats, techRibbon } from "@/content/site";
import { track } from "@/lib/analytics";
import { Floating3DHeroElement } from "@/components/motion/Floating3DHeroElement";
import { Parallax } from "@/components/motion/Parallax";

const title = "Gurleen Singh — AI Engineer | Agentic Systems & RAG";
const description =
  "MSc Data Science student and AI engineer building multi-agent systems, RAG applications and production LLM tooling with LangGraph, FastAPI and Google Gemini.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: HomePage,
});

function HomePage() {
  const featured = caseStudies.filter((project) => project.featured);

  return (
    <>
      <section className="relative isolate overflow-hidden perspective-container">
        <GradientBackdrop />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 sm:pt-28 preserve-3d grid gap-10 lg:grid-cols-[1fr_auto] lg:items-center">
          <div className="preserve-3d max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-border bg-surface/60 px-4 py-1.5 font-mono text-xs uppercase tracking-[0.18em] text-primary translate-z-sm transition-colors duration-300">
              <Sparkles size={13} /> Available for freelance &amp; AI roles
            </p>

            <h1 className="mt-7 max-w-4xl font-display text-4xl font-bold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl text-3d text-foreground translate-z-md transition-colors">
              <AnimatedHeadline text="I build AI agents that" />{" "}
              <span className="text-primary block sm:inline">
                <AnimatedHeadline text="know when to ask a human." delay={640} />
              </span>
            </h1>

            <p className="mt-7 max-w-2xl text-lg leading-relaxed text-muted-foreground translate-z-sm transition-colors duration-300">
              I&apos;m {site.name} — an AI engineer and MSc Data Science student specialising in
              agentic workflows, LangGraph orchestration, RAG architectures and Model Context
              Protocol integration. Published researcher on sub-10B autonomous agents, shipping
              FastAPI services with confidence-gated escalation that keeps humans in the loop.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3 translate-z-lg">
              <MagneticLink to="/projects" variant="primary">
                View my work <ArrowRight size={16} />
              </MagneticLink>
              <MagneticLink to="/contact" variant="outline">
                Hire me
              </MagneticLink>
              <MagneticAnchor
                href={site.resume}
                download
                variant="ghost"
                onClick={() => track("resume_download", { location: "hero" })}
              >
                <Download size={16} /> Résumé
              </MagneticAnchor>
            </div>
          </div>

          <div className="hidden lg:block translate-z-md">
            <Floating3DHeroElement />
          </div>
        </div>

        <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-0 preserve-3d">
          <dl className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 perspective-container">
            {stats.map((stat, i) => (
              <Reveal key={stat.label} delay={i * 80}>
                <div className="card-isometric card-isometric-hover preserve-3d bg-surface/75 p-6 rounded-2xl border border-border flex flex-col justify-between h-full backdrop-blur-md transition-colors duration-300">
                  <dt className="font-display text-2xl font-bold tracking-tight text-primary sm:text-3xl translate-z-md transition-colors">
                    {/^\d+\+?$/.test(stat.value) ? (
                      <>
                        <CountUp value={parseInt(stat.value, 10)} />
                        {stat.value.includes("+") && "+"}
                      </>
                    ) : (
                      stat.value
                    )}
                  </dt>
                  <dd className="mt-2 text-sm leading-snug text-muted-foreground translate-z-sm transition-colors">
                    {stat.label}
                  </dd>
                </div>
              </Reveal>
            ))}
          </dl>
        </div>
      </section>

      <Marquee items={techRibbon} />

      <section className="mx-auto max-w-6xl px-5 py-24 perspective-container">
        <Reveal className="flex flex-wrap items-end justify-between gap-4 translate-z-sm">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
              Featured work
            </p>
            <h2 className="mt-3 max-w-xl font-display text-3xl font-bold tracking-tight sm:text-4xl text-foreground transition-colors">
              Three systems, one obsession: agents that behave predictably.
            </h2>
          </div>
          <Link
            to="/projects"
            className="focus-ring group inline-flex items-center gap-2 text-sm font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            All projects
            <ArrowUpRight
              size={16}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </Reveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 perspective-container">
          {featured.map((project, i) => (
            <Reveal key={project.slug} delay={i * 100}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <section className="relative isolate overflow-hidden border-y border-border/70 bg-surface/25 perspective-container">
        <div className="mx-auto max-w-6xl px-5 py-24 preserve-3d">
          <Reveal className="translate-z-sm">
            <p className="font-mono text-xs uppercase tracking-[0.22em] text-accent">
              What I can build for you
            </p>
            <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl text-foreground transition-colors">
              Freelance AI engineering, scoped around outcomes.
            </h2>
            <p className="mt-4 max-w-2xl text-muted-foreground transition-colors">
              Pick the closest fit and the contact form arrives pre-filled with the context — no
              awkward &ldquo;so what do you actually do&rdquo; first message.
            </p>
          </Reveal>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 perspective-container">
            {services.map((service, i) => (
              <Reveal key={service.slug} delay={i * 90}>
                <TiltCard
                  intensity={6}
                  className="preserve-3d card-isometric card-isometric-hover flex h-full flex-col rounded-2xl border border-border bg-surface/75 p-7 backdrop-blur-md transition-colors duration-300"
                >
                  <div className="relative z-10 flex h-full flex-col preserve-3d">
                    <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent translate-z-sm transition-colors">
                      {service.engagement}
                    </span>
                    <h3 className="mt-3 font-display text-xl font-bold tracking-tight translate-z-md text-foreground transition-colors">
                      {service.title}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-muted-foreground translate-z-sm transition-colors">
                      {service.description}
                    </p>
                    <ul className="mt-5 space-y-2 translate-z-sm">
                      {service.includes.map((item) => (
                        <li
                          key={item}
                          className="flex items-start gap-2 text-sm text-muted-foreground transition-colors"
                        >
                          <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="mt-auto pt-7 translate-z-lg">
                      <MagneticLink
                        to="/contact"
                        search={{ service: service.slug }}
                        variant="outline"
                        className="w-full sm:w-auto"
                        onClick={() => track("service_card_click", { service: service.slug })}
                      >
                        {service.cta} <ArrowRight size={15} />
                      </MagneticLink>
                    </div>
                  </div>
                </TiltCard>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <SidebarOpenHelper />

      <section className="mx-auto max-w-6xl px-5 pb-8 pt-8 perspective-container">
        <Reveal className="relative isolate overflow-hidden rounded-3xl border border-border bg-surface/60 p-10 text-center sm:p-16 card-isometric card-isometric-hover preserve-3d transition-colors duration-300">
          <GradientBackdrop className="opacity-70" />
          <div className="relative preserve-3d">
            <h2 className="mx-auto max-w-2xl font-display text-3xl font-bold tracking-tight sm:text-4xl text-3d text-foreground translate-z-md transition-colors">
              Got a workflow that should be running itself?
            </h2>
            <p className="mx-auto mt-4 max-w-xl text-muted-foreground translate-z-sm transition-colors duration-300">
              Tell me what&apos;s slow, repetitive or drowning your team. I&apos;ll tell you
              honestly whether AI is the right tool for it.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3 translate-z-lg">
              <MagneticLink to="/contact" variant="primary">
                Start a conversation <ArrowRight size={16} />
              </MagneticLink>
              <MagneticLink to="/about" variant="outline">
                More about me
              </MagneticLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}

function SidebarOpenHelper() {
  return <GithubStrip />;
}
