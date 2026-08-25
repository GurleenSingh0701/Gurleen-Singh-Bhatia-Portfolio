import { createFileRoute } from "@tanstack/react-router";
import { GradientBackdrop } from "@/components/motion/GradientBackdrop";
import { AnimatedHeadline } from "@/components/motion/Text";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "@/components/ProjectCard";
import { GithubStrip } from "@/components/GithubStrip";
import { MagneticLink } from "@/components/motion/MagneticButton";
import { caseStudies } from "@/content/case-studies";

const title = "Projects — AI Agents, RAG & Vision Systems | Gurleen Singh";
const description =
  "Deep dives into multi-agent support orchestration, a human-in-the-loop email agent and a multi-modal vision content suite — architecture, trade-offs and lessons learned.";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <>
      <section className="relative isolate overflow-hidden perspective-container">
        <GradientBackdrop />
        <div className="relative mx-auto max-w-6xl px-5 pb-16 pt-20 sm:pt-24 preserve-3d">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary translate-z-sm">
            Projects
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-6xl text-3d text-foreground translate-z-md transition-colors">
            <AnimatedHeadline text="Systems, not demos." />
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground translate-z-sm transition-colors duration-300">
            Each project below is a working system with a live deployment and a public repository.
            Open the details for the architecture diagram, or read the full case study for the
            problem, the trade-offs and what I&apos;d do next.
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 pt-12 pb-16 perspective-container">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 perspective-container">
          {caseStudies.map((project, i) => (
            <Reveal key={project.slug} delay={i * 100}>
              <ProjectCard project={project} index={i} />
            </Reveal>
          ))}
        </div>
      </section>

      <GithubStrip />

      <section className="mx-auto max-w-6xl px-5 pb-8 perspective-container">
        <Reveal className="card-isometric card-isometric-hover rounded-3xl border border-border bg-surface/75 p-10 text-center sm:p-14 preserve-3d backdrop-blur-md transition-colors duration-300">
          <div className="preserve-3d">
            <h2 className="font-display text-2xl font-bold tracking-tight sm:text-3xl text-3d text-foreground translate-z-md transition-colors">
              Want something like this for your product?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground translate-z-sm transition-colors duration-300">
              I take on fixed-scope agent and RAG builds, plus shorter consulting engagements.
            </p>
            <div className="mt-7 flex justify-center translate-z-lg">
              <MagneticLink to="/contact" variant="primary">
                Hire me
              </MagneticLink>
            </div>
          </div>
        </Reveal>
      </section>
    </>
  );
}
