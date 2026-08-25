import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, ExternalLink, Github } from "lucide-react";
import { GradientBackdrop } from "@/components/motion/GradientBackdrop";
import { AnimatedHeadline } from "@/components/motion/Text";
import { Reveal } from "@/components/motion/Reveal";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { MagneticLink } from "@/components/motion/MagneticButton";
import { caseStudies, type CaseStudy } from "@/content/case-studies";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/projects/$slug")({
  loader: ({ params }) => {
    const study = caseStudies.find((item) => item.slug === params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Case study not found — Gurleen Singh" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const { study } = loaderData;
    const title = `${study.shortTitle} — Case Study | Gurleen Singh`;
    return {
      meta: [
        { title },
        { name: "description", content: study.summary.slice(0, 155) },
        { property: "og:title", content: title },
        { property: "og:description", content: study.summary.slice(0, 155) },
        { property: "og:type", content: "article" },
      ],
    };
  },
  notFoundComponent: CaseStudyNotFound,
  component: CaseStudyPage,
});

function CaseStudyNotFound() {
  return (
    <div className="mx-auto max-w-3xl px-5 py-32 text-center">
      <h1 className="font-display text-3xl font-bold tracking-tight">Case study not found</h1>
      <p className="mt-3 text-muted-foreground">
        That project doesn&apos;t exist — but the other three do.
      </p>
      <div className="mt-8 flex justify-center">
        <MagneticLink to="/projects" variant="primary">
          Back to projects
        </MagneticLink>
      </div>
    </div>
  );
}

function SectionHeading({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div className="mb-6">
      <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">{eyebrow}</p>
      <h2 className="mt-2 font-display text-2xl font-bold tracking-tight sm:text-3xl">{title}</h2>
    </div>
  );
}

function CaseStudyPage() {
  const { study } = Route.useLoaderData() as { study: CaseStudy };
  const index = caseStudies.findIndex((item) => item.slug === study.slug);
  const next = caseStudies[(index + 1) % caseStudies.length];

  return (
    <article className="perspective-container">
      <header className="relative isolate overflow-hidden preserve-3d">
        <GradientBackdrop />
        <div className="relative mx-auto max-w-4xl px-5 pb-14 pt-16 sm:pt-20 preserve-3d">
          <Link
            to="/projects"
            className="focus-ring group inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground translate-z-sm transition-colors duration-300"
          >
            <ArrowLeft
              size={15}
              className="transition-transform duration-300 group-hover:-translate-x-1"
            />
            All projects
          </Link>

          <p className="mt-8 font-mono text-xs uppercase tracking-[0.22em] text-accent translate-z-sm transition-colors">
            {study.year} · Case study
          </p>
          <h1 className="mt-4 font-display text-3xl font-bold leading-[1.1] tracking-tight sm:text-5xl text-3d text-foreground translate-z-md transition-colors">
            <AnimatedHeadline text={study.title} />
          </h1>
          <p className="mt-5 text-lg font-medium text-primary translate-z-md transition-colors">
            {study.tagline}
          </p>
          <p className="mt-5 max-w-2xl leading-relaxed text-muted-foreground translate-z-sm transition-colors duration-300">
            {study.summary}
          </p>

          <ul className="mt-7 flex flex-wrap gap-1.5 translate-z-md">
            {study.tags.map((tag) => (
              <li
                key={tag}
                className="rounded-full border border-border/80 bg-background/50 px-3 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground transition-colors duration-300"
              >
                {tag}
              </li>
            ))}
          </ul>

          <div className="mt-8 flex flex-wrap gap-3 translate-z-lg">
            {study.demo && (
              <a
                href={study.demo}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => track("project_demo_click", { project: study.slug })}
                className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition-all hover:scale-[1.03]"
              >
                Live demo <ExternalLink size={15} />
              </a>
            )}
            {study.repo && (
              <a
                href={study.repo}
                target="_blank"
                rel="noreferrer noopener"
                onClick={() => track("project_repo_click", { project: study.slug })}
                className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
              >
                <Github size={15} /> Source code
              </a>
            )}
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl space-y-20 px-5 py-12 preserve-3d">
        <Reveal as="section" className="preserve-3d">
          <SectionHeading eyebrow="01" title="The problem" />
          <div className="space-y-4 translate-z-sm">
            {study.sections.problem.map((paragraph) => (
              <p
                key={paragraph}
                className="leading-relaxed text-muted-foreground transition-colors"
              >
                {paragraph}
              </p>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="preserve-3d perspective-container">
          <SectionHeading eyebrow="02" title="Architecture" />
          <div className="space-y-4 translate-z-sm mb-8">
            {study.sections.architecture.map((paragraph) => (
              <p
                key={paragraph}
                className="leading-relaxed text-muted-foreground transition-colors"
              >
                {paragraph}
              </p>
            ))}
          </div>
          <div className="translate-z-md">
            <ArchitectureDiagram diagram={study.diagram} />
          </div>
        </Reveal>

        <Reveal as="section" className="preserve-3d">
          <SectionHeading eyebrow="03" title="Tech stack & why" />
          <ul className="grid gap-5 sm:grid-cols-2 perspective-container">
            {study.sections.stack.map((item) => (
              <li
                key={item.area}
                className="card-isometric card-isometric-hover rounded-2xl border border-border bg-surface/75 p-5 preserve-3d backdrop-blur-md transition-colors duration-300"
              >
                <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-accent translate-z-sm transition-colors">
                  {item.area}
                </p>
                <p className="mt-2 font-display text-base font-bold tracking-tight text-foreground translate-z-md transition-colors">
                  {item.choice}
                </p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground translate-z-sm transition-colors">
                  {item.why}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className="preserve-3d">
          <SectionHeading eyebrow="04" title="Challenges & solutions" />
          <ul className="space-y-5 perspective-container">
            {study.sections.challenges.map((item, i) => (
              <li
                key={item.title}
                className="card-isometric card-isometric-hover relative rounded-2xl border border-border bg-surface/75 p-6 pl-14 preserve-3d backdrop-blur-md transition-colors duration-300"
              >
                <span className="absolute left-5 top-6 grid h-6 w-6 place-items-center rounded-full bg-coral/15 font-mono text-[0.65rem] font-bold text-coral translate-z-sm transition-colors">
                  {i + 1}
                </span>
                <p className="font-display text-lg font-bold tracking-tight text-foreground translate-z-md transition-colors">
                  {item.title}
                </p>
                <p className="mt-2 leading-relaxed text-muted-foreground translate-z-sm transition-colors">
                  {item.body}
                </p>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className="preserve-3d">
          <SectionHeading eyebrow="05" title="What I'd build next" />
          <ul className="space-y-3 translate-z-sm">
            {study.sections.next.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-muted-foreground transition-colors"
              >
                <span className="mt-[0.55rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal
          as="section"
          className="card-isometric card-isometric-hover rounded-3xl border border-border bg-surface/75 p-8 sm:p-10 preserve-3d backdrop-blur-md transition-colors duration-300"
        >
          <div className="flex flex-wrap items-center justify-between gap-6 preserve-3d">
            <div className="preserve-3d">
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted-foreground/70 translate-z-sm transition-colors">
                Next case study
              </p>
              <p className="mt-2 font-display text-xl font-bold tracking-tight text-foreground translate-z-md transition-colors">
                {next.shortTitle}
              </p>
            </div>
            <div className="translate-z-lg">
              <Link
                to="/projects/$slug"
                params={{ slug: next.slug }}
                onClick={() => track("case_study_open", { project: next.slug })}
                className="focus-ring group inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-all hover:border-primary hover:text-primary cursor-pointer bg-surface/50"
              >
                Read it
                <ArrowUpRight
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </Link>
            </div>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
