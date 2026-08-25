import { useEffect, useRef } from "react";
import { config3D } from "@/config/3d-config";

export function Floating3DHeroElement() {
  const cubeRef = useRef<HTMLDivElement>(null);
  const octaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!config3D.enableFloatingHeroShape) return;
    const handleMouseMove = (event: MouseEvent) => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const cube = cubeRef.current;
      const octa = octaRef.current;
      if (!cube || !octa) return;

      const x = (event.clientX / window.innerWidth - 0.5) * 30; // Rotation range -15 to +15 deg
      const y = (event.clientY / window.innerHeight - 0.5) * -30; // Inverted Y rotation

      cube.style.transform = `rotateX(${y}deg) rotateY(${x}deg) rotateZ(0deg)`;
      octa.style.transform = `rotateX(${-y * 1.5}deg) rotateY(${-x * 1.5}deg)`;
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  if (!config3D.enableFloatingHeroShape) return null;

  return (
    <div
      className="relative hidden lg:flex h-80 w-80 items-center justify-center perspective-container pointer-events-none select-none shrink-0"
      style={{ perspective: "1000px" }}
    >
      {/* Outer spinning wireframe cube with glass translucent faces */}
      <div
        ref={cubeRef}
        className="w-44 h-44 preserve-3d"
        style={{
          transform: "rotateX(0deg) rotateY(0deg) rotateZ(0deg)",
          transformStyle: "preserve-3d",
          transition: "transform 0.3s cubic-bezier(0.25, 1, 0.5, 1)",
          willChange: "transform",
        }}
      >
        <div className="absolute w-full h-full preserve-3d animate-[spin-slow_20s_linear_infinite]">
          {/* Face 1 */}
          <div
            className="absolute inset-0 border-2 border-primary/30 bg-surface/15 rounded-2xl backdrop-blur-[1px]"
            style={{ transform: "rotateY(0deg) translateZ(88px)" }}
          />
          {/* Face 2 */}
          <div
            className="absolute inset-0 border-2 border-accent/30 bg-surface/15 rounded-2xl backdrop-blur-[1px]"
            style={{ transform: "rotateY(90deg) translateZ(88px)" }}
          />
          {/* Face 3 */}
          <div
            className="absolute inset-0 border-2 border-primary/30 bg-surface/15 rounded-2xl backdrop-blur-[1px]"
            style={{ transform: "rotateY(180deg) translateZ(88px)" }}
          />
          {/* Face 4 */}
          <div
            className="absolute inset-0 border-2 border-accent/30 bg-surface/15 rounded-2xl backdrop-blur-[1px]"
            style={{ transform: "rotateY(270deg) translateZ(88px)" }}
          />
          {/* Face 5 */}
          <div
            className="absolute inset-0 border-2 border-coral/30 bg-surface/15 rounded-2xl backdrop-blur-[1px]"
            style={{ transform: "rotateX(90deg) translateZ(88px)" }}
          />
          {/* Face 6 */}
          <div
            className="absolute inset-0 border-2 border-coral/30 bg-surface/15 rounded-2xl backdrop-blur-[1px]"
            style={{ transform: "rotateX(-90deg) translateZ(88px)" }}
          />
        </div>
      </div>

      {/* Inner floating octahedron (moving in opposition to give double-depth feel) */}
      <div
        ref={octaRef}
        className="absolute w-24 h-24 preserve-3d"
        style={{
          transform: "rotateX(0deg) rotateY(0deg)",
          transformStyle: "preserve-3d",
          transition: "transform 0.4s cubic-bezier(0.25, 1, 0.5, 1)",
          willChange: "transform",
        }}
      >
        <div className="absolute w-full h-full preserve-3d animate-[spin-slow_12s_linear_infinite_reverse]">
          <div
            className="absolute inset-0 border border-primary/60 bg-primary/20 shadow-[0_0_15px_var(--primary)]"
            style={{ transform: "rotateY(45deg) rotateX(45deg)" }}
          />
          <div
            className="absolute inset-0 border border-accent/60 bg-accent/20 shadow-[0_0_15px_var(--accent)]"
            style={{ transform: "rotateY(-45deg) rotateX(45deg)" }}
          />
          <div
            className="absolute inset-0 border border-coral/60 bg-coral/20 shadow-[0_0_15px_var(--coral)]"
            style={{ transform: "rotateY(45deg) rotateX(-45deg)" }}
          />
          <div
            className="absolute inset-0 border border-primary/60 bg-primary/20 shadow-[0_0_15px_var(--primary)]"
            style={{ transform: "rotateY(-45deg) rotateX(-45deg)" }}
          />
        </div>
      </div>

      {/* Neon glowing center node */}
      <div className="absolute w-5 h-5 rounded-full bg-primary shadow-[0_0_30px_var(--primary)] animate-ping" />
      <div className="absolute w-3 h-3 rounded-full bg-foreground shadow-[0_0_15px_var(--foreground)]" />
    </div>
  );
}
