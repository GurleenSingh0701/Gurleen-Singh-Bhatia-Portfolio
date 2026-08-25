import { useRef, useState, type ComponentProps, type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

type Variant = "primary" | "outline" | "ghost" | "accent";

const base =
  "focus-ring relative inline-flex items-center justify-center gap-2 overflow-hidden px-6 py-3 text-sm font-semibold tracking-tight transition-[transform,background-color,color,border-color] duration-200 will-change-transform disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary: "btn-3d-primary rounded-xl cursor-pointer",
  accent: "bg-accent text-accent-foreground hover:brightness-110 rounded-xl cursor-pointer",
  outline: "btn-3d-secondary rounded-xl cursor-pointer",
  ghost: "text-muted-foreground hover:text-foreground rounded-xl cursor-pointer",
};

type Ripple = { id: number; x: number; y: number };

function useRipples() {
  const [ripples, setRipples] = useState<Ripple[]>([]);
  const add = (event: React.MouseEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const id = Date.now() + Math.random();
    setRipples((prev) => [
      ...prev,
      { id, x: event.clientX - rect.left, y: event.clientY - rect.top },
    ]);
    setTimeout(() => setRipples((prev) => prev.filter((r) => r.id !== id)), 620);
  };
  const node = ripples.map((ripple) => (
    <span
      key={ripple.id}
      aria-hidden
      className="pointer-events-none absolute h-10 w-10 rounded-full bg-current"
      style={{
        left: ripple.x - 20,
        top: ripple.y - 20,
        animation: "ripple-out 0.6s ease-out forwards",
      }}
    />
  ));
  return { add, node };
}

function useMagnet(strength = 0.28) {
  const ref = useRef<HTMLElement>(null);
  const onMove = (event: React.MouseEvent<HTMLElement>) => {
    const node = ref.current;
    if (!node) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rect = node.getBoundingClientRect();
    const dx = (event.clientX - (rect.left + rect.width / 2)) * strength;
    const dy = (event.clientY - (rect.top + rect.height / 2)) * strength;
    node.style.transform = `translate3d(${dx}px, ${dy}px, 0)`;
  };
  const onLeave = () => {
    if (ref.current) ref.current.style.transform = "translate3d(0,0,0)";
  };
  return { ref, onMove, onLeave };
}

export function MagneticButton({
  children,
  variant = "primary",
  className,
  ...props
}: ComponentProps<"button"> & { variant?: Variant; children: ReactNode }) {
  const ripples = useRipples();
  const magnet = useMagnet();

  return (
    <button
      {...props}
      ref={magnet.ref as React.Ref<HTMLButtonElement>}
      onMouseMove={magnet.onMove}
      onMouseLeave={magnet.onLeave}
      onClick={(event) => {
        ripples.add(event);
        props.onClick?.(event);
      }}
      className={cn(base, variants[variant], className)}
    >
      {ripples.node}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}

export function MagneticLink({
  children,
  variant = "primary",
  className,
  to,
  search,
  onClick,
  ...rest
}: {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  to: string;
  search?: Record<string, unknown>;
  onClick?: () => void;
} & Omit<ComponentProps<typeof Link>, "to" | "search" | "className" | "children" | "onClick">) {
  const ripples = useRipples();
  const magnet = useMagnet();

  return (
    <Link
      {...(rest as object)}
      to={to}
      search={search as never}
      ref={magnet.ref as never}
      onMouseMove={magnet.onMove}
      onMouseLeave={magnet.onLeave}
      onClick={(event) => {
        ripples.add(event as unknown as React.MouseEvent<HTMLElement>);
        onClick?.();
      }}
      className={cn(base, variants[variant], className)}
    >
      {ripples.node}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </Link>
  );
}

export function MagneticAnchor({
  children,
  variant = "outline",
  className,
  ...props
}: ComponentProps<"a"> & { variant?: Variant; children: ReactNode }) {
  const ripples = useRipples();
  const magnet = useMagnet();

  return (
    <a
      {...props}
      ref={magnet.ref as React.Ref<HTMLAnchorElement>}
      onMouseMove={magnet.onMove}
      onMouseLeave={magnet.onLeave}
      onClick={(event) => {
        ripples.add(event);
        props.onClick?.(event);
      }}
      className={cn(base, variants[variant], className)}
    >
      {ripples.node}
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </a>
  );
}
