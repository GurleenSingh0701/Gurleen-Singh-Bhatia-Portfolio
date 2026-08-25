import { useEffect, useRef } from "react";
import { config3D } from "@/config/3d-config";

interface ParallaxProps {
  children: React.ReactNode;
  speed?: number; // Positive values move down (slower scroll), negative move up (faster scroll)
  className?: string;
}

export function Parallax({ children, speed = 0.5, className }: ParallaxProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    // Detect mobile or touch capabilities
    const isMobileOrTouch =
      window.matchMedia("(max-width: 768px)").matches ||
      "ontouchstart" in window ||
      navigator.maxTouchPoints > 0;

    if (isMobileOrTouch && config3D.optimizeForMobile) {
      // Clear inline transform just in case
      element.style.transform = "none";
      return;
    }

    let rafId: number;
    const factor = speed * config3D.parallaxStrength;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = scrollY * factor;

      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        element.style.transform = `translate3d(0, ${offset}px, 0)`;
      });
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
      cancelAnimationFrame(rafId);
    };
  }, [speed]);

  return (
    <div ref={ref} className={className} style={{ willChange: "transform" }}>
      {children}
    </div>
  );
}
