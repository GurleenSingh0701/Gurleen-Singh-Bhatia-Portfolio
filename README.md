# Gurleen's AI Studio

Build a multi-page, playful yet professional developer portfolio website for Gurleen Singh, an MSc Data Science (AI-ML specialization) student at Chandigarh University, specializing in AI engineering, agentic AI systems, and RAG applications. This site will be used to attract freelance clients and to apply for remote AI/ML engineering jobs.

GITHUB: https://github.com/GurleenSingh0701

PAGES / STRUCTURE (multi-page, not single-scroll):

1. Home

2. Projects

3. About

4. Contact

Include a persistent navbar (Home, Projects, About, Contact) and footer with GitHub/LinkedIn/Email icons.

--- HOME PAGE ---

- Hero section with a bold, punchy tagline written for me — something that captures "AI engineer who builds agentic systems and RAG apps," with personality (playful/creative tone, not corporate-stiff). Include a short 1-2 line subheading.

- Primary CTA buttons: "View Projects" and "Download Resume" (resume download button, PDF placeholder link)

- Secondary CTA: "Hire Me" / "Get in Touch" linking to Contact page

- A brief highlight strip showing 3-4 quick stats/badges (e.g. "3+ AI Agent Projects", "FastAPI + Streamlit", "RAG & Multi-Agent Systems", "MSc Data Science")

- Featured projects preview (top 2-3 cards) linking to full Projects page

--- PROJECTS PAGE ---

Showcase these projects as cards, in this priority order, each with: title, short description, tech stack tags, live demo link, GitHub repo link, and a "View Details" expand or modal:

1. **AI Support Agent ("Autodesk")** — An AI-powered customer support ticketing system with multi-agent orchestration (router agent, intent classifier, resolution engine, escalation engine, sentiment analysis, knowledge base agent, payment agent). Built with FastAPI backend + Streamlit frontend, Docker deployment, JWT auth.

   - Live demo: https://autodesk-frontend-ibzm.onrender.com/

   - GitHub: https://github.com/GurleenSingh0701/ai-support-agent

   - Tags: Python, FastAPI, Streamlit, Multi-Agent Systems, JWT Auth, Docker, NLP

2. **Inbox Agent** — An AI agent project for intelligent inbox/email handling.

   - Live demo: https://inbox-agent.streamlit.app/

   - Tags: Python, Streamlit, AI Agents, NLP

3. **Image Descriptor** — An AI tool that generates descriptions from images.

   - Live demo: https://imagedescriptor.streamlit.app/

   - Tags: Python, Streamlit, Computer Vision, AI

Pull additional repos dynamically/visually referencing my GitHub profile (github.com/GurleenSingh0701) for a "More on GitHub" section at the bottom of this page with a button linking out to my full profile.

--- ABOUT PAGE ---

- Photo placeholder + short bio

- Education: MSc Data Science (AI-ML specialization), Chandigarh University, dissertation supervised by Dr. Rizwan Yousuf, expected completion ~June 2026

- Skills/Services section (for freelance offerings) — list as skill cards or tags:

  - Agentic AI system design & multi-agent orchestration

  - RAG (Retrieval-Augmented Generation) applications

  - AI-powered support/ticketing automation

  - Backend APIs (FastAPI, Python)

  - Frontend dashboards (Streamlit)

  - NLP, sentiment analysis, intent classification

  - Docker deployment

- A "Services I Offer" mini-section framed for freelance clients (e.g. "Custom AI Agent Development", "RAG Chatbot Builds", "AI Automation Consulting")

- Testimonials/Social Proof section — placeholder cards with "Testimonial coming soon" style content, ready to be swapped in later

--- CONTACT PAGE ---

- Contact form (Name, Email, Message, Submit) — style it cleanly, playful micro-interactions on submit

- Also include direct contact links/buttons: Email, LinkedIn, GitHub

- Optional: simple availability note ("Open to freelance projects & remote roles")

--- DESIGN DIRECTION ---

- Playful, creative developer-portfolio aesthetic — think expressive typography, subtle animations/micro-interactions on hover, maybe a fun accent element (like a subtle particle background, animated gradient blobs, or hover-tilt project cards)

- No fixed color palette requested — use your judgment for a modern, vibrant-but-tasteful palette that still reads professional enough for client-facing use

- Fully responsive (mobile-first)

- Clean sans-serif typography, generous whitespace, smooth scroll/page transitions

- Include subtle loading/hover animations on project cards and buttons to reinforce the "creative developer" feel without hurting usability

--- FUNCTIONAL NOTES ---

- Resume download button should link to a placeholder PDF file I can swap in later

- Contact form should be functional (or easily connectable to an email service)

- All external project links (GitHub repo, live demos) should open in new tabs

This project was built with [Lovable](https://lovable.dev).

**Live app**: https://gurleen-portfolio.lovable.app

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/3fa2185f-c295-4a35-9331-c7d67194869f).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
