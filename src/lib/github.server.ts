import type { RepoCard } from "@/content/repos";
import { fallbackRepos } from "@/content/repos";

const GITHUB_USER = "GurleenSingh0701";
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

type GitHubRepo = {
  name: string;
  description: string | null;
  language: string | null;
  stargazers_count: number;
  html_url: string;
  fork: boolean;
  archived: boolean;
  pushed_at: string;
};

export type RepoResult = { repos: RepoCard[]; source: "github" | "fallback" };

let cache: { at: number; value: RepoResult } | undefined;

export async function loadRepos(): Promise<RepoResult> {
  if (cache && Date.now() - cache.at < CACHE_TTL_MS) return cache.value;

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USER}/repos?per_page=100&sort=pushed`,
      {
        headers: {
          Accept: "application/vnd.github+json",
          "User-Agent": "gurleen-portfolio",
        },
      },
    );

    if (!response.ok) {
      console.error(`[github] repo fetch failed (${response.status}): ${await response.text()}`);
      return withFallback();
    }

    const raw = (await response.json()) as GitHubRepo[];
    const repos: RepoCard[] = raw
      .filter((repo) => !repo.fork && !repo.archived)
      .sort((a, b) => Date.parse(b.pushed_at) - Date.parse(a.pushed_at))
      .slice(0, 6)
      .map((repo) => ({
        name: repo.name,
        description: repo.description ?? "No description provided yet.",
        language: repo.language,
        stars: repo.stargazers_count,
        url: repo.html_url,
      }));

    if (repos.length === 0) return withFallback();

    const value: RepoResult = { repos, source: "github" };
    cache = { at: Date.now(), value };
    return value;
  } catch (error) {
    console.error("[github] repo fetch threw", error);
    return withFallback();
  }
}

function withFallback(): RepoResult {
  const value: RepoResult = { repos: fallbackRepos, source: "fallback" };
  // Short-cache the fallback too so a rate-limited window doesn't hammer GitHub.
  cache = { at: Date.now() - CACHE_TTL_MS / 2, value };
  return value;
}
