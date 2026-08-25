import type { Diagram } from "@/content/case-studies";
import { cn } from "@/lib/utils";

const toneClass: Record<string, string> = {
  primary: "border-primary/60 bg-primary/10 text-primary",
  accent: "border-accent/60 bg-accent/10 text-accent",
  coral: "border-coral/60 bg-coral/10 text-coral",
  muted: "border-border bg-surface-raised text-foreground",
};

function Connector({ count, delay }: { count: number; delay: number }) {
  const targets = Array.from({ length: count }, (_, i) => ((i + 0.5) / count) * 100);
  return (
    <svg
      aria-hidden
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      className="h-10 w-full text-border"
    >
      {targets.map((x, i) => (
        <path
          key={x}
          d={`M 50 0 C 50 55, ${x} 45, ${x} 100`}
          fill="none"
          stroke="currentColor"
          strokeWidth="0.8"
          vectorEffect="non-scaling-stroke"
          style={{
            // @ts-expect-error custom property
            "--dash": 200,
            strokeDasharray: 200,
            animation: `draw-line 0.9s ease-out ${delay + i * 80}ms forwards`,
            strokeDashoffset: 200,
          }}
        />
      ))}
    </svg>
  );
}

export function ArchitectureDiagram({ diagram }: { diagram: Diagram }) {
  let step = 0;

  return (
    <figure className="rounded-2xl border border-border bg-surface/80 p-5 sm:p-7 preserve-3d card-isometric transition-colors duration-300">
      <figcaption className="mb-6 font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground translate-z-sm">
        {diagram.caption}
      </figcaption>

      <div className="flex flex-col items-stretch preserve-3d translate-z-md">
        {diagram.layers.map((layer, layerIndex) => {
          const startDelay = step * 120;
          step += layer.nodes.length;
          return (
            <div key={layer.label} className="preserve-3d mb-2">
              <div className="mb-2 text-center font-mono text-[0.65rem] uppercase tracking-[0.18em] text-muted-foreground/70 translate-z-sm">
                {layer.label}
              </div>
              <ul
                className={cn(
                  "grid gap-3 preserve-3d",
                  layer.nodes.length === 1 && "grid-cols-1",
                  layer.nodes.length === 2 && "grid-cols-1 sm:grid-cols-2",
                  layer.nodes.length >= 3 && "grid-cols-2 lg:grid-cols-4",
                )}
              >
                {layer.nodes.map((node, nodeIndex) => (
                  <li
                    key={node.label}
                    style={{
                      animation: `node-pop 0.5s cubic-bezier(0.22,1,0.36,1) ${
                        startDelay + nodeIndex * 90
                      }ms both`,
                    }}
                    className={cn(
                      "min-w-0 rounded-xl border px-3 py-3 text-center text-xs font-semibold leading-snug sm:text-sm shadow-md translate-z-md transition-all duration-300 hover:scale-[1.05] hover:border-primary cursor-default",
                      toneClass[node.tone ?? "muted"],
                    )}
                  >
                    {node.label}
                  </li>
                ))}
              </ul>
              {layerIndex < diagram.layers.length - 1 && (
                <div className="translate-z-sm">
                  <Connector
                    count={diagram.layers[layerIndex + 1].nodes.length}
                    delay={startDelay + 120}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {diagram.note && (
        <p className="mt-6 rounded-xl border border-dashed border-border/80 bg-background/40 p-4 text-sm text-muted-foreground translate-z-sm transition-colors duration-300">
          {diagram.note}
        </p>
      )}
    </figure>
  );
}
