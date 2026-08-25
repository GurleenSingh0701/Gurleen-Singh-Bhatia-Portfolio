import { createServerFn } from "@tanstack/react-start";
import { loadRepos } from "./github.server";

export const getGithubRepos = createServerFn({ method: "GET" }).handler(async () => loadRepos());
