import { Link } from "@tanstack/react-router";
import { ArrowUpRight, ExternalLink, Github } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { TiltCard } from "@/components/motion/TiltCard";
import { ArchitectureDiagram } from "@/components/ArchitectureDiagram";
import { MagneticButton } from "@/components/motion/MagneticButton";
import type { CaseStudy } from "@/content/case-studies";
import { track } from "@/lib/analytics";

export function ProjectCard({ project, index }: { project: CaseStudy; index: number }) {
  return (
    <TiltCard className="preserve-3d card-isometric card-isometric-hover flex h-full flex-col rounded-2xl border border-border bg-surface/75 p-6 backdrop-blur-md transition-colors duration-300">
      <div className="relative z-10 flex h-full flex-col preserve-3d">
        <div className="flex items-start justify-between gap-4 translate-z-sm">
          <span className="font-mono text-xs text-muted-foreground/70">
            {String(index + 1).padStart(2, "0")} — {project.year}
          </span>
          <div className="flex gap-2">
            {project.repo && (
              <a
                href={project.repo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.shortTitle} source on GitHub`}
                onClick={() => track("project_repo_click", { project: project.slug })}
                className="focus-ring text-muted-foreground transition-colors hover:text-primary"
              >
                <Github size={18} />
              </a>
            )}
            {project.demo && (
              <a
                href={project.demo}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={`${project.shortTitle} live demo`}
                onClick={() => track("project_demo_click", { project: project.slug })}
                className="focus-ring text-muted-foreground transition-colors hover:text-accent"
              >
                <ExternalLink size={18} />
              </a>
            )}
          </div>
        </div>

        <h3 className="mt-4 font-display text-xl font-bold leading-tight tracking-tight translate-z-md text-foreground transition-colors">
          {project.shortTitle}
        </h3>
        <p className="mt-1 text-sm font-medium text-primary translate-z-md transition-colors">
          {project.tagline}
        </p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground translate-z-sm transition-colors">
          {project.summary}
        </p>

        <ul className="mt-5 flex flex-wrap gap-1.5 translate-z-md">
          {project.tags.slice(0, 5).map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-border/80 bg-background/50 px-2.5 py-1 font-mono text-[0.65rem] uppercase tracking-wider text-muted-foreground transition-colors duration-300"
            >
              {tag}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2 translate-z-lg">
          <Dialog>
            <DialogTrigger asChild>
              <MagneticButton
                variant="outline"
                className="px-5 py-2.5 text-xs btn-3d-secondary cursor-pointer"
                onClick={() => track("project_details_open", { project: project.slug })}
              >
                View details
              </MagneticButton>
            </DialogTrigger>
            <DialogContent className="max-h-[88vh] max-w-2xl overflow-y-auto border-border bg-surface text-foreground transition-colors duration-300">
              <DialogHeader>
                <DialogTitle className="font-display text-2xl tracking-tight text-foreground transition-colors">
                  {project.title}
                </DialogTitle>
                <DialogDescription className="text-muted-foreground transition-colors">
                  {project.tagline}
                </DialogDescription>
              </DialogHeader>

              <p className="text-sm leading-relaxed text-muted-foreground transition-colors">
                {project.summary}
              </p>
              <ArchitectureDiagram diagram={project.diagram} />

              <div className="flex flex-wrap gap-2 pt-2">
                <Link
                  to="/projects/$slug"
                  params={{ slug: project.slug }}
                  onClick={() => track("case_study_open", { project: project.slug })}
                  className="focus-ring inline-flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-xs font-semibold text-primary-foreground transition-all hover:scale-[1.03]"
                >
                  Read full case study <ArrowUpRight size={14} />
                </Link>
                {project.demo && (
                  <a
                    href={project.demo}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-xs font-semibold transition-colors hover:border-accent hover:text-accent"
                  >
                    Live demo <ExternalLink size={14} />
                  </a>
                )}
              </div>
            </DialogContent>
          </Dialog>

          <Link
            to="/projects/$slug"
            params={{ slug: project.slug }}
            onClick={() => track("case_study_open", { project: project.slug })}
            className="focus-ring group inline-flex items-center gap-1.5 rounded-full px-4 py-2.5 text-xs font-semibold text-muted-foreground transition-colors hover:text-foreground"
          >
            Case study
            <ArrowUpRight
              size={14}
              className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
            />
          </Link>
        </div>
      </div>
    </TiltCard>
  );
}
