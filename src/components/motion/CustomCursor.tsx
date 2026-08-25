import { useEffect, useRef } from "react";
import { config3D } from "@/config/3d-config";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!config3D.enableCustomCursor) return;

    // Disable custom cursor on touch/mobile devices
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Update small dot instantly (avoiding React state re-renders)
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
    };

    const updateRing = () => {
      // Lerp (Linear Interpolation) to catch up slowly with easing factor
      ringX += (mouseX - ringX) * 0.15;
      ringY += (mouseY - ringY) * 0.15;

      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      rafId = requestAnimationFrame(updateRing);
    };

    // Event delegation to check if mouse is over interactive components
    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      const isInteractive =
        target.tagName === "A" ||
        target.tagName === "BUTTON" ||
        target.closest("a") !== null ||
        target.closest("button") !== null ||
        target.closest(".group\\/tilt") !== null ||
        target.closest(".card-isometric") !== null ||
        target.closest(".cursor-pointer") !== null ||
        target.classList.contains("cursor-pointer");

      if (isInteractive) {
        ring.classList.add(
          "h-14",
          "w-14",
          "border-primary",
          "bg-primary/10",
          "shadow-[0_0_20px_var(--primary)]",
        );
        ring.classList.remove("h-7", "w-7");
      } else {
        ring.classList.add("h-7", "w-7");
        ring.classList.remove(
          "h-14",
          "w-14",
          "border-primary",
          "bg-primary/10",
          "shadow-[0_0_20px_var(--primary)]",
        );
      }
    };

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mouseover", onMouseOver);
    rafId = requestAnimationFrame(updateRing);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseover", onMouseOver);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!config3D.enableCustomCursor) return null;

  return (
    <>
      {/* Hide default cursor only if hover supports custom cursor */}
      <style>{`
        @media (hover: hover) and (pointer: fine) {
          html, body, a, button, [role="button"], input, textarea, select {
            cursor: none !important;
          }
        }
      `}</style>

      {/* Central tiny cursor dot */}
      <div
        ref={dotRef}
        className="pointer-events-none fixed left-0 top-0 z-9999 h-2.5 w-2.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary transition-transform duration-100 hidden md:block"
        style={{ willChange: "transform" }}
      />

      {/* Trailing soft glowing cursor ring */}
      <div
        ref={ringRef}
        className="pointer-events-none fixed left-0 top-0 z-9998 -translate-x-1/2 -translate-y-1/2 rounded-full border border-primary/40 bg-transparent transition-[width,height,border-color,background-color] duration-300 ease-out hidden md:block h-7 w-7"
        style={{ willChange: "transform" }}
      />
    </>
  );
}
