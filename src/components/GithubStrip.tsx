import { useQuery } from "@tanstack/react-query";
import { Github, Star } from "lucide-react";
import { getGithubRepos } from "@/lib/github.functions";
import { fallbackRepos } from "@/content/repos";
import { site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { track } from "@/lib/analytics";

export function GithubStrip() {
  const { data, isPending } = useQuery({
    queryKey: ["github-repos"],
    queryFn: () => getGithubRepos(),
    staleTime: 1000 * 60 * 30,
  });

  const repos = data?.repos ?? fallbackRepos;

  return (
    <section className="mx-auto max-w-6xl px-5 py-20">
      <Reveal className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary">
            Live from GitHub
          </p>
          <h2 className="mt-3 font-display text-3xl font-bold tracking-tight sm:text-4xl">
            More things I&apos;m building
          </h2>
        </div>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer noopener"
          onClick={() => track("outbound_click", { destination: "github", location: "repo_strip" })}
          className="focus-ring inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm font-semibold transition-colors hover:border-primary hover:text-primary"
        >
          <Github size={16} /> View all repositories
        </a>
      </Reveal>

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {isPending && !data
          ? Array.from({ length: 6 }).map((_, i) => (
              <li
                key={i}
                className="shimmer h-40 rounded-2xl border border-border bg-surface/50"
                aria-hidden
              />
            ))
          : repos.map((repo, i) => (
              <Reveal as="li" key={repo.name} delay={i * 60}>
                <a
                  href={repo.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  onClick={() => track("repo_click", { repo: repo.name })}
                  className="focus-ring group flex h-full flex-col rounded-2xl border border-border bg-surface/50 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-primary/60"
                >
                  <span className="font-mono text-sm font-semibold text-foreground group-hover:text-primary">
                    {repo.name}
                  </span>
                  <span className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {repo.description}
                  </span>
                  <span className="mt-4 flex items-center gap-4 text-xs text-muted-foreground/80">
                    {repo.language && (
                      <span className="inline-flex items-center gap-1.5">
                        <span className="h-2 w-2 rounded-full bg-accent" />
                        {repo.language}
                      </span>
                    )}
                    <span className="inline-flex items-center gap-1">
                      <Star size={12} /> {repo.stars}
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
      </ul>

      {data?.source === "fallback" && (
        <p className="mt-6 text-center text-xs text-muted-foreground/70">
          Showing a curated selection — GitHub&apos;s public API is rate-limited right now.
        </p>
      )}
    </section>
  );
}
