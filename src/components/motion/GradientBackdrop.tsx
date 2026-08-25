import { cn } from "@/lib/utils";

/** Animated mesh-gradient blobs + scrolling 3D perspective wireframe grid + grain. Purely decorative. */
export function GradientBackdrop({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn(
        "grain pointer-events-none absolute inset-0 overflow-hidden perspective-container",
        className,
      )}
    >
      {/* 3D wireframe scrolling grid */}
      <div className="theme-grid-3d opacity-[0.85] dark:opacity-[0.7] transition-all duration-300">
        <div className="theme-grid-inner" />
      </div>

      {/* Decorative floating 3D neon spheres/blobs */}
      <span
        className="blob left-[-10%] top-[-15%] h-184 w-184 opacity-[0.8]"
        style={{ background: "color-mix(in oklab, var(--primary) 30%, transparent)" }}
      />
      <span
        className="blob right-[-14%] top-[-8%] h-152 w-152 opacity-[0.8]"
        style={{
          background: "color-mix(in oklab, var(--accent) 30%, transparent)",
          animationDelay: "-6s",
        }}
      />
      <span
        className="blob bottom-[-24%] left-[28%] h-136 w-136 opacity-[0.7]"
        style={{
          background: "color-mix(in oklab, var(--coral) 25%, transparent)",
          animationDelay: "-12s",
        }}
      />

      {/* Subtle overlay to fade the background into the distance */}
      <div className="absolute inset-0 bg-background/60 dark:bg-background/70 transition-colors duration-300" />
    </div>
  );
}
