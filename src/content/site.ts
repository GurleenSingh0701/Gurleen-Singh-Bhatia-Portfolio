import resumeAsset from "@/assets/resume.pdf.asset.json";
import profileAsset from "@/assets/profile.jpg.asset.json";

export const site = {
  name: "Gurleen Singh Bhatia",
  role: "AI Engineer — Agentic Systems, LLMs & RAG",
  location: "India (Remote Ready)",
  phone: "+91 7070926757",
  email: "gurleensingh1608@gmail.com",
  github: "https://github.com/GurleenSingh0701",
  linkedin: "https://www.linkedin.com/in/gurleen-singh-bhatia/",
  googleDev: "https://me.developers.google.com/u/gurleen-singh-bhatia",
  googleSkills: "https://www.skills.google/public_profiles/65a1bfa9-aac1-4b24-bf9f-e5a6f735b811",
  resume: resumeAsset.url,
  photo: profileAsset.url,
} as const;

export const publication = {
  title:
    "Unlocking the Potential of Small-to-Medium LLMs in Autonomous Agent Architectures: A Comparative Analysis of Gemini, Llama, and Qwen",
  venue:
    "GRENZE International Journal of Engineering and Technology (GIJET), Vol. 12 (2026), Issue 2, pp. 5666–5672",
  authors: "Gurleen Singh, Rizwan Yousuf",
  url: "https://thegrenze.com/abstract/journal/7854",
  highlights: [
    "Evaluated sub-10B models (Llama 3.1 8B, Qwen 2.5 7B, Gemini 3.1 Flash Lite) inside the Model Context Protocol framework.",
    "Co-developed “Complete-MCP”, an evaluation pipeline for single-step, sequential and multi-hop reasoning in simulated enterprise environments.",
    "Showed >80% task completion for local sub-10B models with adaptive parsing and heuristic rate-limiting.",
  ],
} as const;

export const stats = [
  { value: "6", label: "AI agent systems shipped" },
  { value: ">80%", label: "Task completion, sub-10B agents (published)" },
  { value: "MCP", label: "+ LangGraph orchestration" },
  { value: "MSc", label: "Data Science — Chandigarh University" },
] as const;

export const techRibbon = [
  "Python",
  "FastAPI",
  "LangGraph",
  "LangChain",
  "Model Context Protocol",
  "RAG Architectures",
  "Semantic Routing",
  "Human-in-the-Loop",
  "Google Gemini",
  "Groq",
  "Ollama / LM Studio",
  "PostgreSQL",
  "Redis Pub/Sub",
  "Docker Compose",
  "Streamlit",
  "Pydantic",
  "Scikit-Learn",
  "NetworkX",
] as const;
