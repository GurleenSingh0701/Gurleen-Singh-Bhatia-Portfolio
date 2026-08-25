import { useRef, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/** 3D hover tilt with a cursor-tracked glare highlight. */
export function TiltCard({
  children,
  className,
  intensity = 8,
}: {
  children: ReactNode;
  className?: string;
  intensity?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (event: React.MouseEvent<HTMLDivElement>) => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    node.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * intensity}deg) rotateY(${
      (px - 0.5) * intensity
    }deg) translateZ(0)`;
    node.style.setProperty("--glare-x", `${px * 100}%`);
    node.style.setProperty("--glare-y", `${py * 100}%`);
  };

  const reset = () => {
    const node = ref.current;
    if (!node) return;
    node.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      className={cn(
        "group/tilt relative overflow-hidden transition-[transform,box-shadow] duration-300 ease-out will-change-transform hover:shadow-(--shadow-lift)",
        className,
      )}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover/tilt:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--glare-x, 50%) var(--glare-y, 50%), color-mix(in oklab, var(--primary) 16%, transparent), transparent 60%)",
        }}
      />
      {children}
    </div>
  );
}
