/**
 * Provider-agnostic analytics.
 *
 * Page views are recorded automatically on every route change.
 * CTA / engagement events go through `track()`.
 *
 * Today this reports to Lovable's built-in analytics (via the standard
 * `dataLayer` / `gtag` bridge when present) and keeps a local debug ring
 * buffer. To add Google Analytics or PostHog later, wire the provider once
 * in `dispatch()` — no component needs to change.
 */

export type AnalyticsEvent =
  | "page_view"
  | "service_card_click"
  | "project_details_open"
  | "project_repo_click"
  | "project_demo_click"
  | "repo_click"
  | "case_study_open"
  | "resume_download"
  | "contact_submit"
  | "outbound_click";

type Props = Record<string, string | number | boolean | undefined>;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
    posthog?: { capture: (event: string, props?: Props) => void };
    __portfolioEvents?: Array<{ event: string; props: Props; at: number }>;
  }
}

function dispatch(event: string, props: Props) {
  if (typeof window === "undefined") return;

  // Debug ring buffer — inspect with `window.__portfolioEvents` in the console.
  window.__portfolioEvents = (window.__portfolioEvents ?? []).slice(-49);
  window.__portfolioEvents.push({ event, props, at: Date.now() });

  // Google Analytics (active only if gtag is loaded).
  window.gtag?.("event", event, props);

  // PostHog (active only if posthog is loaded).
  window.posthog?.capture(event, props);

  // Generic data layer — picked up by tag managers / built-in analytics.
  window.dataLayer = window.dataLayer ?? [];
  window.dataLayer.push({ event, ...props });
}

export function track(event: AnalyticsEvent, props: Props = {}) {
  dispatch(event, props);
}

export function trackPageView(path: string, title?: string) {
  dispatch("page_view", { page_path: path, page_title: title ?? path });
}
