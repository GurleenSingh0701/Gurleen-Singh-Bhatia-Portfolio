import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail } from "lucide-react";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";

const socials = [
  { href: site.github, label: "GitHub", icon: Github, key: "github" },
  { href: site.linkedin, label: "LinkedIn", icon: Linkedin, key: "linkedin" },
  { href: `mailto:${site.email}`, label: "Email", icon: Mail, key: "email" },
];

export function SiteFooter() {
  return (
    <footer className="mt-24 border-t border-border/80 bg-surface/30">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-5 py-12 sm:flex-row sm:items-start sm:justify-between">
        <div className="max-w-sm">
          <p className="font-display text-lg font-bold tracking-tight">
            Building agentic AI that knows when to ask a human.
          </p>
          <p className="mt-2 text-sm text-muted-foreground">
            Open to freelance projects &amp; remote AI/ML engineering roles.
          </p>
          <a
            href={`mailto:${site.email}`}
            onClick={() => track("outbound_click", { destination: "email", location: "footer" })}
            className="focus-ring mt-4 inline-block font-mono text-sm text-primary underline-offset-4 hover:underline"
          >
            {site.email}
          </a>
        </div>

        <div className="flex flex-col gap-6 sm:items-end">
          <nav className="flex flex-wrap gap-x-5 gap-y-2 text-sm text-muted-foreground">
            <Link to="/" className="focus-ring hover:text-foreground">
              Home
            </Link>
            <Link to="/projects" className="focus-ring hover:text-foreground">
              Projects
            </Link>
            <Link to="/about" className="focus-ring hover:text-foreground">
              About
            </Link>
            <Link
              to="/contact"
              search={{ service: undefined }}
              className="focus-ring hover:text-foreground"
            >
              Contact
            </Link>
          </nav>

          <ul className="flex gap-3">
            {socials.map(({ href, label, icon: Icon, key }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  aria-label={label}
                  onClick={() => track("outbound_click", { destination: key, location: "footer" })}
                  className="focus-ring grid h-11 w-11 place-items-center rounded-xl border border-border text-muted-foreground transition-all duration-300 hover:-translate-y-1 hover:border-primary hover:text-primary"
                >
                  <Icon size={18} />
                </a>
              </li>
            ))}
          </ul>

          <p className="text-xs text-muted-foreground/70">
            © {new Date().getFullYear()} Gurleen Singh. Built with TanStack Start.
          </p>
        </div>
      </div>
    </footer>
  );
}
