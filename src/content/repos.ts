/**
 * Curated fallback for the "More on GitHub" strip.
 * Used when the GitHub API rate-limits (60 req/hr per IP, unauthenticated)
 * or the fetch fails — the section is never blank and never shows an error.
 */
export type RepoCard = {
  name: string;
  description: string;
  language: string | null;
  stars: number;
  url: string;
};

export const fallbackRepos: RepoCard[] = [
  {
    name: "ai-support-agent",
    description:
      "Multi-agent customer support & ticketing system (FastAPI + LangGraph + Streamlit).",
    language: "Python",
    stars: 0,
    url: "https://github.com/GurleenSingh0701/ai-support-agent",
  },
  {
    name: "youtube-video-analyser-latest",
    description:
      "AI-powered study system transforming YouTube videos/playlists into structured notes, flashcards & Socratic Q&A (React 19 + TanStack + Firebase + Gemini).",
    language: "TypeScript",
    stars: 0,
    url: "https://github.com/GurleenSingh0701/youtube-video-analyser-latest",
  },
  {
    name: "multi_index_rag_system",
    description: "Retrieval-augmented generation across multiple indexes.",
    language: "Python",
    stars: 0,
    url: "https://github.com/GurleenSingh0701/multi_index_rag_system",
  },
  {
    name: "multi-modal-qa-agent",
    description: "Question answering agent over mixed text and image inputs.",
    language: "Python",
    stars: 0,
    url: "https://github.com/GurleenSingh0701/multi-modal-qa-agent",
  },
  {
    name: "mcp-data-analyst-Local_MCP_server",
    description: "Local MCP server exposing data-analyst tooling to AI clients.",
    language: "Python",
    stars: 0,
    url: "https://github.com/GurleenSingh0701/mcp-data-analyst-Local_MCP_server",
  },
  {
    name: "ai_ops_manager",
    description: "Operations tooling and automation experiments for AI workflows.",
    language: "Python",
    stars: 0,
    url: "https://github.com/GurleenSingh0701/ai_ops_manager",
  },
  {
    name: "MSFT-Stock-Price-Prediction",
    description:
      "Stock price prediction using technical indicators and Linear, Ridge and Lasso regression.",
    language: "Jupyter Notebook",
    stars: 0,
    url: "https://github.com/GurleenSingh0701/MSFT-Stock-Price-Prediction",
  },
];
