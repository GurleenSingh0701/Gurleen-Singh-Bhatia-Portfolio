import { useState } from "react";
import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { CheckCircle2, Github, Linkedin, Mail, Send, X } from "lucide-react";
import { toast } from "sonner";
import { GradientBackdrop } from "@/components/motion/GradientBackdrop";
import { AnimatedHeadline } from "@/components/motion/Text";
import { Reveal } from "@/components/motion/Reveal";
import { MagneticButton } from "@/components/motion/MagneticButton";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { submitContactMessage } from "@/lib/contact.functions";
import { contactSchema } from "@/lib/contact-schema";
import { serviceBySlug } from "@/content/services";
import { site } from "@/content/site";
import { track } from "@/lib/analytics";

const title = "Contact Gurleen Singh — AI Engineering & Agent Builds";
const description =
  "Start a conversation about custom AI agents, RAG chatbots, support automation or AI consulting. Usually replies within a day.";

export const Route = createFileRoute("/contact")({
  validateSearch: (search: Record<string, unknown>) => ({
    service: typeof search.service === "string" ? search.service : undefined,
  }),
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
    ],
  }),
  component: ContactPage,
});

const channels = [
  { label: "Email", value: site.email, href: `mailto:${site.email}`, icon: Mail, key: "email" },
  {
    label: "LinkedIn",
    value: "gurleen-singh-bhatia",
    href: site.linkedin,
    icon: Linkedin,
    key: "linkedin",
  },
  { label: "GitHub", value: "GurleenSingh0701", href: site.github, icon: Github, key: "github" },
];

function ContactPage() {
  const { service: serviceSlug } = Route.useSearch();
  const navigate = useNavigate();
  const service = serviceBySlug(serviceSlug);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sent, setSent] = useState(false);

  const submit = useServerFn(submitContactMessage);
  const mutation = useMutation({
    mutationFn: (values: typeof form) =>
      submit({ data: { ...values, service: service?.title ?? null } }),
    onSuccess: () => {
      setSent(true);
      setForm({ name: "", email: "", message: "" });
      track("contact_submit", { service: service?.slug ?? "none" });
      toast.success("Message sent — I'll get back to you shortly.");
    },
    onError: (error: Error) => {
      toast.error(error.message || "Couldn't send that. Please email me directly.");
    },
  });

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const parsed = contactSchema.safeParse({ ...form, service: service?.title ?? null });
    if (!parsed.success) {
      const fieldErrors: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0]);
        if (!fieldErrors[key]) fieldErrors[key] = issue.message;
      }
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    mutation.mutate(form);
  };

  const field = (key: "name" | "email" | "message") => ({
    value: form[key],
    onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: event.target.value })),
    "aria-invalid": Boolean(errors[key]),
    "aria-describedby": errors[key] ? `${key}-error` : undefined,
  });

  return (
    <section className="relative isolate overflow-hidden perspective-container">
      <GradientBackdrop />
      <div className="relative mx-auto grid max-w-6xl gap-14 px-5 pb-24 pt-20 sm:pt-24 lg:grid-cols-[1fr_22rem] lg:gap-20 preserve-3d">
        <div className="preserve-3d">
          <p className="font-mono text-xs uppercase tracking-[0.22em] text-primary translate-z-sm">
            Contact
          </p>
          <h1 className="mt-4 max-w-xl font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl text-3d text-foreground translate-z-md transition-colors">
            <AnimatedHeadline text="Tell me what you're building." />
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground translate-z-sm transition-colors duration-300">
            Freelance builds, consulting engagements or full-time AI/ML roles — all welcome. A
            couple of sentences about the problem is plenty to start.
          </p>

          {service && (
            <div className="mt-8 inline-flex max-w-full items-center gap-3 rounded-full border border-accent/50 bg-accent/10 py-2 pl-4 pr-2 text-sm translate-z-sm">
              <span className="truncate">
                <span className="text-muted-foreground">Enquiry about </span>
                <span className="font-semibold text-accent">{service.title}</span>
              </span>
              <button
                type="button"
                aria-label="Clear service context"
                onClick={() => navigate({ to: "/contact", search: {} })}
                className="focus-ring grid h-6 w-6 shrink-0 place-items-center rounded-full text-muted-foreground transition-colors hover:bg-background/60 hover:text-foreground cursor-pointer"
              >
                <X size={13} />
              </button>
            </div>
          )}

          {sent ? (
            <Reveal className="mt-10 rounded-2xl border border-primary/40 bg-primary/5 p-8 card-isometric preserve-3d">
              <CheckCircle2 className="text-primary translate-z-sm" size={28} />
              <h2 className="mt-4 font-display text-2xl font-bold tracking-tight translate-z-md text-foreground transition-colors">
                Message received.
              </h2>
              <p className="mt-2 text-muted-foreground translate-z-sm transition-colors">
                Thanks for reaching out — I read everything and usually reply within a day.
              </p>
              <div className="translate-z-lg">
                <MagneticButton variant="outline" className="mt-6" onClick={() => setSent(false)}>
                  Send another
                </MagneticButton>
              </div>
            </Reveal>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="mt-10 max-w-xl space-y-5 preserve-3d translate-z-md"
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-foreground transition-colors">
                    Name
                  </Label>
                  <Input
                    id="name"
                    autoComplete="name"
                    placeholder="Your name"
                    className="input-3d"
                    {...field("name")}
                  />
                  {errors.name && (
                    <p id="name-error" className="text-xs text-destructive">
                      {errors.name}
                    </p>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email" className="text-foreground transition-colors">
                    Email
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    placeholder="you@company.com"
                    className="input-3d"
                    {...field("email")}
                  />
                  {errors.email && (
                    <p id="email-error" className="text-xs text-destructive">
                      {errors.email}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message" className="text-foreground transition-colors">
                  Message
                </Label>
                <Textarea
                  id="message"
                  rows={6}
                  className="input-3d"
                  placeholder={
                    service
                      ? `Hi Gurleen — I'm interested in ${service.title.toLowerCase()}. Here's what we're dealing with...`
                      : "What's the workflow, and where does it break today?"
                  }
                  {...field("message")}
                />
                {errors.message && (
                  <p id="message-error" className="text-xs text-destructive">
                    {errors.message}
                  </p>
                )}
              </div>

              <div className="flex flex-wrap items-center gap-6 pt-1">
                <MagneticButton type="submit" disabled={mutation.isPending}>
                  {mutation.isPending ? "Sending…" : "Send message"} <Send size={15} />
                </MagneticButton>
                <a
                  href={`mailto:${site.email}`}
                  onClick={() =>
                    track("outbound_click", { destination: "email", location: "contact_form" })
                  }
                  className="focus-ring text-sm text-muted-foreground underline-offset-4 hover:text-foreground hover:underline transition-colors"
                >
                  or email me directly
                </a>
              </div>
            </form>
          )}
        </div>

        <Reveal className="lg:pt-24 perspective-container">
          <ul className="space-y-4">
            {channels.map(({ label, value, href, icon: Icon, key }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto:") ? undefined : "_blank"}
                  rel="noreferrer noopener"
                  onClick={() =>
                    track("outbound_click", { destination: key, location: "contact_page" })
                  }
                  className="focus-ring group flex items-center gap-4 rounded-2xl border border-border bg-surface/75 p-5 preserve-3d card-isometric card-isometric-hover transition-colors duration-300"
                >
                  <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-primary/12 text-primary translate-z-sm transition-colors">
                    <Icon size={18} />
                  </span>
                  <span className="min-w-0 translate-z-md">
                    <span className="block font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70 transition-colors">
                      {label}
                    </span>
                    <span className="block truncate text-sm font-medium group-hover:text-primary transition-colors text-foreground">
                      {value}
                    </span>
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div className="mt-6 rounded-2xl border border-dashed border-border bg-surface/40 p-5 text-sm leading-relaxed text-muted-foreground transition-colors duration-300 card-isometric preserve-3d">
            <p className="translate-z-sm">
              Based in India, working remotely. Currently open to freelance AI engineering projects
              and graduate AI/ML roles.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
